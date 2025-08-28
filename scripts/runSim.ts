#!/usr/bin/env ts-node

// Ground Zero — Quiz Simulation Runner
// Executes all golden scripts and generates verification reports
//
// Usage:
//   npm run quiz:sim              # Run simulations and verify against golden baselines
//   npm run quiz:sim -- --update  # Run simulations and update golden baselines with actual results
//   npm run quiz:sim 456          # Run with specific seed
//   npm run quiz:sim 456 --update # Run with specific seed and update baselines
//   npm run quiz:sim --seeds 1..50 # Run with multiple seeds
//   npm run quiz:sim --seeds 1..100 --failOnMismatch # Stress test with failure on mismatch

import { runGoldenScript } from "../lib/sim/simulator";
import { oracleReplay, crossCheckResult } from "../lib/sim/oracle";
import { checkFullInvariants } from "../lib/sim/invariants";
import { QUIZ_CONFIG } from "../lib/quizConfig";
import goldenRuns from "../tests/fixtures/golden-runs.json";
import fs from "fs";
import path from "path";

interface SimulationReport {
  timestamp: string;
  seed: number;
  results: Record<string, {
    success: boolean;
    engineResult: any;
    oracleResult: any;
    oracleMatch: boolean;
    invariantsPassed: boolean;
    goldenMatch: boolean;
    errors: string[];
    executionTime: number;
  }>;
  summary: {
    total: number;
    passed: number;
    failed: number;
    errors: string[];
  };
}

async function updateGoldenBaselines(results: Record<string, any>): Promise<void> {
  console.log("\n🔄 Updating golden baselines...");
  
  const updatedGoldenRuns = { ...goldenRuns };
  
  for (const [scriptName, result] of Object.entries(results)) {
    if (result.success && result.engineResult) {
      const engineResult = result.engineResult;
      
      // Update the expected values with actual results
      updatedGoldenRuns[scriptName as keyof typeof goldenRuns].expected = {
        ...updatedGoldenRuns[scriptName as keyof typeof goldenRuns].expected,
        finalArchetype: engineResult.finalArchetype,
        altArchetype: engineResult.altArchetype,
        flips: engineResult.flips,
        triggerCounts: engineResult.triggerCounts
      };
      
      console.log(`  ✅ Updated ${scriptName} baseline`);
    }
  }
  
  // Write the updated golden-runs.json file
  const goldenRunsPath = path.join(__dirname, "../tests/fixtures/golden-runs.json");
  fs.writeFileSync(goldenRunsPath, JSON.stringify(updatedGoldenRuns, null, 2));
  console.log(`  📄 Updated ${goldenRunsPath}`);
}

async function runSimulation(seed: number = 123, shouldUpdate: boolean = false): Promise<SimulationReport> {
  console.log("🚀 Starting Quiz Engine Verification...");
  console.log(`🌱 Using seed: ${seed}`);
  console.log("");

  const report: SimulationReport = {
    timestamp: new Date().toISOString(),
    seed,
    results: {},
    summary: { total: 0, passed: 0, failed: 0, errors: [] }
  };

  const scripts = Object.keys(goldenRuns);
  report.summary.total = scripts.length;

  for (const scriptName of scripts) {
    console.log(`📋 Running: ${scriptName}`);
    const startTime = Date.now();
    
    try {
      // Run the script
      const { frames, result } = runGoldenScript(scriptName, seed);
      
      // Check invariants
      let invariantsPassed = false;
      try {
        checkFullInvariants(frames);
        invariantsPassed = true;
        console.log("  ✅ Invariants passed");
      } catch (error) {
        console.log(`  ❌ Invariants failed: ${error}`);
      }

      // Run oracle replay
      const oracle = oracleReplay(frames);
      const oracleMatch = crossCheckResult(result, oracle);
      console.log(`  ${oracleMatch ? "✅" : "❌"} Oracle cross-check: ${oracleMatch ? "PASSED" : "FAILED"}`);

      // Check against golden fixture
      const expected = goldenRuns[scriptName as keyof typeof goldenRuns].expected;
      let goldenMatch = true;
      const errors: string[] = [];

      if (result.finalArchetype !== expected.finalArchetype) {
        goldenMatch = false;
        errors.push(`Final archetype: expected ${expected.finalArchetype}, got ${result.finalArchetype}`);
      }

      if (result.altArchetype !== expected.altArchetype) {
        goldenMatch = false;
        errors.push(`Alt archetype: expected ${expected.altArchetype}, got ${result.altArchetype}`);
      }

      if (result.flips !== expected.flips) {
        goldenMatch = false;
        errors.push(`Flips: expected ${expected.flips}, got ${result.flips}`);
      }

      // Check R-index bounds
      if (result.rIndex < expected.rIndex.min || result.rIndex > expected.rIndex.max) {
        goldenMatch = false;
        errors.push(`R-index: expected ${expected.rIndex.min}-${expected.rIndex.max}, got ${result.rIndex}`);
      }

      // Check trigger counts
      for (const [trigger, expectedCount] of Object.entries(expected.triggerCounts)) {
        const actualCount = result.triggerCounts[trigger] || 0;
        if (actualCount !== expectedCount) {
          goldenMatch = false;
          errors.push(`Trigger ${trigger}: expected ${expectedCount}, got ${actualCount}`);
        }
      }

      console.log(`  ${goldenMatch ? "✅" : "❌"} Golden fixture: ${goldenMatch ? "MATCHED" : "MISMATCHED"}`);

      // Store results
      const executionTime = Date.now() - startTime;
      const success = invariantsPassed && oracleMatch && goldenMatch;
      
      report.results[scriptName] = {
        success,
        engineResult: result,
        oracleResult: oracle,
        oracleMatch,
        invariantsPassed,
        goldenMatch,
        errors,
        executionTime
      };

      if (success) {
        report.summary.passed++;
        console.log(`  🎯 ${scriptName}: PASSED (${executionTime}ms)`);
      } else {
        report.summary.failed++;
        report.summary.errors.push(...errors.map(e => `${scriptName}: ${e}`));
        console.log(`  💥 ${scriptName}: FAILED (${executionTime}ms)`);
      }

    } catch (error) {
      const executionTime = Date.now() - startTime;
      console.log(`  💥 ${scriptName}: ERROR - ${error}`);
      
      report.results[scriptName] = {
        success: false,
        engineResult: null,
        oracleResult: null,
        oracleMatch: false,
        invariantsPassed: false,
        goldenMatch: false,
        errors: [error instanceof Error ? error.message : String(error)],
        executionTime
      };
      
      report.summary.failed++;
      report.summary.errors.push(`${scriptName}: ${error}`);
    }

    console.log("");
  }

  // Print summary
  console.log("📊 SIMULATION SUMMARY");
  console.log("=====================");
  console.log(`Total scripts: ${report.summary.total}`);
  console.log(`✅ Passed: ${report.summary.passed}`);
  console.log(`❌ Failed: ${report.summary.failed}`);
  console.log(`Success rate: ${((report.summary.passed / report.summary.total) * 100).toFixed(1)}%`);
  
  if (report.summary.errors.length > 0) {
    console.log("\n🚨 ERRORS:");
    report.summary.errors.forEach(error => console.log(`  ${error}`));
  }

  // Save detailed report
  const reportDir = path.join(__dirname, "../logs");
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const reportPath = path.join(reportDir, `simulation-${Date.now()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);

  // Update golden baselines if requested
  if (shouldUpdate) {
    await updateGoldenBaselines(report.results);
  }

  return report;
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  let seed = 123;
  let shouldUpdate = false;
  let seedRange: string | null = null;
  let failOnMismatch = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--update') {
      shouldUpdate = true;
    } else if (arg === '--seeds') {
      seedRange = args[i + 1];
      i++;
    } else if (arg === '--failOnMismatch') {
      failOnMismatch = true;
    } else if (!isNaN(Number(arg))) {
      seed = Number(arg);
    }
  }
  
  if (seedRange) {
    // Multi-seed execution
    const [start, end] = seedRange.split('..').map(Number);
    if (isNaN(start) || isNaN(end) || start > end) {
      console.error("❌ Invalid seed range. Use format: --seeds 1..50");
      process.exit(1);
    }
    
    console.log(`🚀 Running multi-seed simulation from ${start} to ${end}`);
    console.log(`🔒 Fail on mismatch: ${failOnMismatch}`);
    
    let totalFailed = 0;
    let totalPassed = 0;
    
    // Use async IIFE to handle await
    (async () => {
      for (let currentSeed = start; currentSeed <= end; currentSeed++) {
        console.log(`\n🌱 Testing seed: ${currentSeed}`);
        try {
          const report = await runSimulation(currentSeed, shouldUpdate);
          if (report.summary.failed > 0) {
            totalFailed += report.summary.failed;
            if (failOnMismatch) {
              console.log(`💥 Seed ${currentSeed} failed with ${report.summary.failed} errors. Exiting due to --failOnMismatch`);
              process.exit(1);
            }
          } else {
            totalPassed += report.summary.passed;
          }
        } catch (error) {
          console.error(`💥 Seed ${currentSeed} crashed:`, error);
          if (failOnMismatch) {
            process.exit(1);
          }
          totalFailed++;
        }
      }
      
      console.log(`\n📊 MULTI-SEED SUMMARY`);
      console.log(`=====================`);
      console.log(`Total seeds tested: ${end - start + 1}`);
      console.log(`✅ Total passed: ${totalPassed}`);
      console.log(`❌ Total failed: ${totalFailed}`);
      console.log(`Success rate: ${((totalPassed / (totalPassed + totalFailed)) * 100).toFixed(1)}%`);
      
      if (totalFailed > 0 && failOnMismatch) {
        process.exit(1);
      }
    })().catch(error => {
      console.error("💥 Multi-seed execution failed:", error);
      process.exit(1);
    });
  } else {
    // Single seed execution
    if (shouldUpdate) {
      console.log("🔄 Update mode: Will regenerate golden baselines from actual results");
    }
    
    runSimulation(seed, shouldUpdate)
      .then(report => {
        if (shouldUpdate) {
          console.log("\n✅ Golden baselines updated successfully!");
        }
        
        if (failOnMismatch && report.summary.failed > 0) {
          console.log(`💥 Exiting with failure due to --failOnMismatch and ${report.summary.failed} errors`);
          process.exit(1);
        }
        
        process.exit(report.summary.failed > 0 ? 1 : 0);
      })
      .catch(error => {
        console.error("💥 Simulation failed:", error);
        process.exit(1);
      });
  }
}

export { runSimulation };
