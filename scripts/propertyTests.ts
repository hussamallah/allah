#!/usr/bin/env ts-node

// Property-Based Testing for Quiz Engine Invariants
// Tests critical properties with randomized inputs to catch edge cases

import { runGoldenScript } from "../lib/sim/simulator";
import { checkFullInvariants } from "../lib/sim/invariants";
import { QUIZ_CONFIG } from "../lib/quizConfig";
import goldenRuns from "../tests/fixtures/golden-runs.json";

// simple CLI arg: --iterations N
const itArg = process.argv.find(a => a.startsWith("--iterations"));
const ITERATIONS = itArg ? Number(itArg.split("=")[1] ?? process.argv[process.argv.indexOf(itArg) + 1]) : undefined;

// fallback to existing default if not provided
const RUNS = Number.isFinite(ITERATIONS) ? Number(ITERATIONS) : 100; // your previous default

interface PropertyTestResult {
  property: string;
  passed: boolean;
  iterations: number;
  failures: Array<{
    seed: number;
    script: string;
    error: string;
    context: any;
  }>;
  executionTime: number;
}

class PropertyTester {
  private results: PropertyTestResult[] = [];
  private totalTests = 0;
  private totalPassed = 0;

  async testProperty(
    name: string,
    testFn: (seed: number, script: string) => Promise<boolean>,
    iterations: number = 100
  ): Promise<PropertyTestResult> {
    console.log(`🧪 Testing property: ${name}`);
    const startTime = Date.now();
    const result: PropertyTestResult = {
      property: name,
      passed: true,
      iterations,
      failures: [],
      executionTime: 0
    };

    const scripts = Object.keys(goldenRuns);
    
    for (let i = 0; i < iterations; i++) {
      const seed = Math.floor(Math.random() * 1000000);
      const script = scripts[Math.floor(Math.random() * scripts.length)];
      
      try {
        const passed = await testFn(seed, script);
        if (!passed) {
          result.passed = false;
          result.failures.push({
            seed,
            script,
            error: "Property violation",
            context: { iteration: i }
          });
        }
      } catch (error) {
        result.passed = false;
        result.failures.push({
          seed,
          script,
          error: error instanceof Error ? error.message : String(error),
          context: { iteration: i }
        });
      }
    }

    result.executionTime = Date.now() - startTime;
    this.results.push(result);
    
    if (result.passed) {
      console.log(`  ✅ ${name}: PASSED (${iterations} iterations, ${result.executionTime}ms)`);
      this.totalPassed++;
    } else {
      console.log(`  ❌ ${name}: FAILED (${result.failures.length} failures, ${result.executionTime}ms)`);
    }
    
    this.totalTests++;
    return result;
  }

  async testScoreMonotonicity(): Promise<void> {
    await this.testProperty(
      "Score Monotonicity with Decay",
      async (seed, script) => {
        const { frames } = runGoldenScript(script, seed);
        
        // Small epsilon for floating point precision
        const EPS = 1e-12;
        
        for (let i = 1; i < frames.length; i++) {
          const prevFrame = frames[i - 1];
          const currentFrame = frames[i];
          
          // Check that scores respect decay baseline
          for (const archetype of Object.keys(currentFrame.scores)) {
            const prevScore = prevFrame.scores[archetype] || 0;
            const currentScore = currentFrame.scores[archetype] || 0;
            
            // Get decay rate from quiz config
            const decayRate = QUIZ_CONFIG.scoring.decayLambda;
            
            // Calculate the retained baseline: what the score would be after retention
            const retainedBaseline = prevScore * decayRate;
            
            // Assert that current score is at least the retained baseline (allowing for float noise)
            if (currentScore + EPS < retainedBaseline) {
              console.log(`  🚨 Score retention violation: ${archetype} ${prevScore} -> ${currentScore} at frame ${i}`);
              console.log(`      Retained baseline: ${retainedBaseline}, EPS: ${EPS}`);
              console.log(`      Violation: ${currentScore} < ${retainedBaseline} - ${EPS}`);
              return false;
            }
            
            // Optional: Check that the score increment is reasonable
            // This helps catch cases where scores jump too much
            const actualIncrement = currentScore - retainedBaseline;
            if (actualIncrement > 1.0) { // Adjust threshold as needed
              console.log(`  ⚠️  Large score increment: ${archetype} +${actualIncrement.toFixed(3)} at frame ${i}`);
              // Don't fail the test for this, just warn
            }
          }
        }
        return true;
      },
      50
    );
  }

  async testLeadersConsistency(): Promise<void> {
    await this.testProperty(
      "Leaders Consistency",
      async (seed, script) => {
        const { frames } = runGoldenScript(script, seed);
        
        for (let i = 1; i < frames.length; i++) {
          const prevFrame = frames[i - 1];
          const currentFrame = frames[i];
          
          // Check that leader changes are reasonable
          const prevLeader = prevFrame.leaders[0];
          const currentLeader = currentFrame.leaders[0];
          
          if (prevLeader && currentLeader && prevLeader !== currentLeader) {
            // Leader change should be justified by score changes
            const prevScore = prevFrame.scores[prevLeader] || 0;
            const currentScore = currentFrame.scores[currentLeader] || 0;
            
            if (currentScore < prevScore - 0.05) {
              console.log(`  🚨 Unjustified leader change: ${prevLeader} (${prevScore}) -> ${currentLeader} (${currentScore}) at frame ${i}`);
              return false;
            }
          }
        }
        return true;
      },
      50
    );
  }

  async testFlipCountBounds(): Promise<void> {
    await this.testProperty(
      "Flip Count Bounds",
      async (seed, script) => {
        const { frames } = runGoldenScript(script, seed);
        
        let totalFlips = 0;
        for (const frame of frames) {
          if (frame.flip) totalFlips++;
        }
        
        // Maximum reasonable flip count (adjust based on your logic)
        const maxExpectedFlips = Math.ceil(frames.length * 0.3); // 30% max flip rate
        
        if (totalFlips > maxExpectedFlips) {
          console.log(`  🚨 Excessive flips: ${totalFlips} > ${maxExpectedFlips} max expected`);
          return false;
        }
        
        return true;
      },
      50
    );
  }

  async testTriggerInvariants(): Promise<void> {
    await this.testProperty(
      "Trigger Invariants",
      async (seed, script) => {
        const { frames } = runGoldenScript(script, seed);
        
        for (let i = 0; i < frames.length; i++) {
          const frame = frames[i];
          
          if (frame.trigger) {
            // Check that triggers only happen on specific conditions
            const questionIndex = frame.questionIndex;
            const pureA1 = frame.pureA1;
            
            // Example invariant: triggers should only happen in Phase B with pureA1
            if (questionIndex < QUIZ_CONFIG.PHASE_B_START && frame.trigger) {
              console.log(`  🚨 Early trigger violation: trigger at question ${questionIndex} < ${QUIZ_CONFIG.PHASE_B_START}`);
              return false;
            }
            
            // Add more trigger-specific invariants here
          }
        }
        return true;
      },
      50
    );
  }

  async testBoundaryConditions(): Promise<void> {
    await this.testProperty(
      "Boundary Conditions",
      async (seed, script) => {
        const { frames } = runGoldenScript(script, seed);
        
        for (let i = 0; i < frames.length; i++) {
          const frame = frames[i];
          
          // Test edge cases for overtake2Q
          if (frame.overtake2Q !== undefined) {
            if (frame.overtake2Q < 5 || frame.overtake2Q > 7) {
              console.log(`  🚨 overtake2Q out of bounds: ${frame.overtake2Q} not in [5,7]`);
              return false;
            }
          }
          
          // Test edge cases for singleAfterQ.qMin
          if (frame.singleAfterQ?.qMin !== undefined) {
            if (frame.singleAfterQ.qMin < 7 || frame.singleAfterQ.qMin > 9) {
              console.log(`  🚨 singleAfterQ.qMin out of bounds: ${frame.singleAfterQ.qMin} not in [7,9]`);
              return false;
            }
          }
          
          // Test margin percentage bounds
          if (frame.marginPct !== undefined) {
            if (frame.marginPct < -0.01 || frame.marginPct > 0.01) {
              console.log(`  🚨 marginPct out of bounds: ${frame.marginPct} not in [-0.01, 0.01]`);
              return false;
            }
          }
        }
        return true;
      },
      50
    );
  }

  async runAllTests(): Promise<void> {
    console.log("🚀 Starting Property-Based Tests");
    console.log("================================");
    
    await this.testScoreMonotonicity();
    await this.testLeadersConsistency();
    await this.testFlipCountBounds();
    await this.testTriggerInvariants();
    await this.testBoundaryConditions();
    
    this.printSummary();
  }

  private printSummary(): void {
    console.log("\n📊 PROPERTY TEST SUMMARY");
    console.log("=========================");
    console.log(`Total properties tested: ${this.totalTests}`);
    console.log(`✅ Passed: ${this.totalPassed}`);
    console.log(`❌ Failed: ${this.totalTests - this.totalPassed}`);
    console.log(`Success rate: ${((this.totalPassed / this.totalTests) * 100).toFixed(1)}%`);
    
    if (this.totalPassed < this.totalTests) {
      console.log("\n🚨 FAILED PROPERTIES:");
      this.results
        .filter(r => !r.passed)
        .forEach(result => {
          console.log(`  ${result.property}: ${result.failures.length} failures`);
          result.failures.slice(0, 3).forEach(failure => {
            console.log(`    - Seed ${failure.seed}, Script: ${failure.script}`);
          });
        });
    }
  }

  getResults(): PropertyTestResult[] {
    return this.results;
  }
}

// CLI execution
if (require.main === module) {
  const tester = new PropertyTester();
  
  console.log(`🎯 Running property tests with ${RUNS} iterations per property`);
  
  // Override default iterations for all tests
  const originalTestProperty = tester.testProperty.bind(tester);
  tester.testProperty = async function(name: string, testFn: (seed: number, script: string) => Promise<boolean>, defaultIterations: number = 100) {
    return originalTestProperty(name, testFn, RUNS);
  };
  
  tester.runAllTests()
    .then(() => {
      const results = tester.getResults();
      const hasFailures = results.some(r => !r.passed);
      process.exit(hasFailures ? 1 : 0);
    })
    .catch(error => {
      console.error("💥 Property tests failed:", error);
      process.exit(1);
    });
}

export { PropertyTester, PropertyTestResult };
