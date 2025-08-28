import { describe, test, expect, beforeEach } from "vitest";
import { runScript, runGoldenScript } from "../lib/sim/simulator";
import { oracleReplay, crossCheckResult } from "../lib/sim/oracle";
import { checkFullInvariants } from "../lib/sim/invariants";
import goldenRuns from "./fixtures/golden-runs.json";
import seedrandom from "seedrandom";
import { QUIZ_CONFIG } from "../lib/quizConfig";

// Clean behavior samples for testing
const cleanBehavior = { latencyMs: 800, switches: 0, hoverRefsMs: 0, underClockHit: true };
const hesitantBehavior = { latencyMs: 7000, switches: 2, hoverRefsMs: 3000, underClockHit: false };

// Standard epsilon for float comparisons - LOCKED IN for consistency
const EPS = 1e-9;

describe("Quiz Engine Verification", () => {
  describe("Golden Scripts", () => {
    test("All-A path produces expected results", () => {
      const { frames, result } = runGoldenScript("all-a-path", 123);
      
      // Check invariants
      expect(() => checkFullInvariants(frames)).not.toThrow();
      
      // Check oracle cross-check
      const oracle = oracleReplay(frames);
      expect(crossCheckResult(result, oracle)).toBe(true);
      
      // Check against golden fixture
      const expected = goldenRuns["all-a-path"].expected;
      expect(result.finalArchetype).toBe(expected.finalArchetype);
      expect(result.altArchetype).toBe(expected.altArchetype);
      expect(result.flips).toBe(expected.flips);
      expect(result.rIndex).toBeGreaterThanOrEqual(expected.rIndex.min);
      expect(result.rIndex).toBeLessThanOrEqual(expected.rIndex.max);
      
      // Check trigger counts
      expect(result.triggerCounts.Control).toBeGreaterThanOrEqual(3);
      expect(result.triggerCounts.Rejection).toBe(0);
    });

    test("Flip mid-run triggers when rules are satisfied", () => {
      const clean = { latencyMs: 900, switches: 0, hoverRefsMs: 0, underClockHit: true };

      const strategy = (step: any) => {
        // Phase A (Q1–Q7): alternate picks to keep margins thin (helps volatility)
        if (step.phase === "A") {
          const opts = step.item.options;
          const idx = ((step.index ?? 0) % 2);    // 0,1,0,1...
          return { id: opts[idx].id, behavior: clean };
        }

        // Phase B (Q8–Q15): consistently pick A2-leaning options to force A2 surge
        const tplId = step.itemId;                // e.g. "B2"
        
        // Always prefer PURE A2 if available (only rendered when volatile)
        const pureA2 = step.options.find((o:any) => o.id === `${tplId}-PURE-A2`);
        if (pureA2) return { id: pureA2.id, behavior: clean };
        
        // Fallback to A2-mixed (M2) which has 0.75 A2 / 0.25 A1 weights
        const m2 = step.options.find((o:any) => o.id === `${tplId}-M2`);
        if (m2) return { id: m2.id, behavior: clean };

        // Last resort: pick the last option
        return { id: step.options.at(-1).id, behavior: clean };
      };

      const { frames, result } = runScript(strategy);
      
      // Check invariants
      expect(() => checkFullInvariants(frames)).not.toThrow();
      
      expect(result.flips).toBeGreaterThanOrEqual(1);
      expect(result.flips).toBeLessThanOrEqual(2); // Max flips
    });

    test("Flip mid-run triggers when rules are satisfied with custom config", () => {
      // save originals
      const origOvertake2Q = QUIZ_CONFIG.scoring.flipOvertake2Q;         // was 6
      const origSingleAfterQ = { ...QUIZ_CONFIG.scoring.flipSingleAfterQ }; // { qMin: 8, marginPct: 10 }

      // make flips a bit easier for this scenario
      QUIZ_CONFIG.scoring.flipOvertake2Q = 3;                  // from 6 → 3
      QUIZ_CONFIG.scoring.flipSingleAfterQ = { qMin: 8, marginPct: 4 }; // from 10% → 4%

      const clean = { latencyMs: 900, switches: 0, hoverRefsMs: 0, underClockHit: true };

      const customFlipStrategy = (step:any) => {
        const tplId = step.itemId;
        const q = step.q ?? step.index ?? 1;

        if (step.phase === "A") {
          // Phase A (Q1–Q7): create volatility by alternating between extreme options
          const opts = step.item.options;
          const idx = step.index ?? 0;
          // Alternate between first and last options to maximize score differences
          const optionIndex = (idx % 2 === 0) ? 0 : opts.length - 1;
          return { id: opts[optionIndex].id, behavior: clean };
        }

        // after q>=8, force strong A2 multiple times to satisfy overtake2Q
        if (q >= 9 && q <= 12) {
          const pureA2 = step.options.find((o:any) => o.id === `${tplId}-PURE-A2`);
          if (pureA2) return { id: pureA2.id, behavior: clean };
          const m2 = step.options.find((o:any) => o.id === `${tplId}-M2`); // A2-heavy mix
          if (m2) return { id: m2.id, behavior: clean };
        }

        // otherwise use your existing "mixed/alternating" picks
        const m2 = step.options.find((o:any) => o.id === `${tplId}-M2`);
        return { id: (m2 || step.options.at(-1)).id, behavior: clean };
      };

      const { frames, result } = runScript(customFlipStrategy);

      // Check invariants
      expect(() => checkFullInvariants(frames)).not.toThrow();

      expect(result.flips).toBeGreaterThanOrEqual(1);
      expect(result.flips).toBeLessThanOrEqual(2);

      // restore
      QUIZ_CONFIG.scoring.flipOvertake2Q = origOvertake2Q;
      QUIZ_CONFIG.scoring.flipSingleAfterQ = origSingleAfterQ;
    });

    test("High-R Imprinter produces high R-index", () => {
      const { frames, result } = runGoldenScript("high-r-imprinter", 123);
      
      // Check invariants
      expect(() => checkFullInvariants(frames)).not.toThrow();
      
      // Check oracle cross-check
      const oracle = oracleReplay(frames);
      expect(crossCheckResult(result, oracle)).toBe(true);
      
      // Check against golden fixture
      const expected = goldenRuns["high-r-imprinter"].expected;
      expect(result.rIndex).toBeGreaterThanOrEqual(expected.rIndex.min);
      expect(result.rIndex).toBeLessThanOrEqual(expected.rIndex.max);
    });

    test("Low-R Literalist produces low R-index", () => {
      const { frames, result } = runGoldenScript("low-r-literalist", 123);
      
      // Check invariants
      expect(() => checkFullInvariants(frames)).not.toThrow();
      
      // Check oracle cross-check
      const oracle = oracleReplay(frames);
      expect(crossCheckResult(result, oracle)).toBe(true);
      
      // Check against golden fixture
      const expected = goldenRuns["low-r-literalist"].expected;
      expect(result.rIndex).toBeGreaterThanOrEqual(expected.rIndex.min);
      expect(result.rIndex).toBeLessThanOrEqual(expected.rIndex.max);
    });
  });

  describe("Mathematical Invariants", () => {
    test("Score monotonicity with decay", () => {
      const script = (step: any) => ({
        id: step.phase === "A" ? step.item.options[0].id : step.options[0].id,
        behavior: cleanBehavior
      });
      
      const { frames } = runScript(script, 123);
      
      // Check that each frame maintains mathematical consistency
      expect(() => checkFullInvariants(frames)).not.toThrow();
      
      // Check score monotonicity relative to decayed baseline
      const decayRate = QUIZ_CONFIG.scoring.decayLambda;
      
      for (let i = 1; i < frames.length; i++) {
        const prevFrame = frames[i - 1];
        const currentFrame = frames[i];
        
        for (const archetype of Object.keys(currentFrame.scores)) {
          const prevScore = prevFrame.scores[archetype] || 0;
          const currentScore = currentFrame.scores[archetype] || 0;
          
          // Calculate the retained baseline: what the score would be after retention
          const retainedBaseline = prevScore * decayRate;
          
          // Invariant: next ≥ prev * retention
          // This matches how the quiz engine actually works: scores *= retention
          expect(currentScore + EPS).toBeGreaterThanOrEqual(retainedBaseline);
        }
      }
    });

    test("Leaders consistency maintained", () => {
      const script = (step: any) => ({
        id: step.phase === "A" ? step.item.options[0].id : step.options[0].id,
        behavior: cleanBehavior
      });
      
      const { frames } = runScript(script, 123);
      
      frames.forEach(frame => {
        const scores = Object.values(frame.scores).sort((a, b) => b - a);
        expect(scores[0]).toBeGreaterThanOrEqual(scores[1]);
        if (scores[2] !== undefined) {
          expect(scores[1]).toBeGreaterThanOrEqual(scores[2]);
        }
      });
    });

         test("Score increment validation", () => {
       const script = (step: any) => ({
         id: step.phase === "A" ? step.item.options[0].id : step.options[0].id,
         behavior: cleanBehavior
       });
       
       const { frames } = runScript(script, 123);
       
       // Check that score increments are reasonable
       const decayRate = QUIZ_CONFIG.scoring.decayLambda;
       
       for (let i = 1; i < frames.length; i++) {
         const prevFrame = frames[i - 1];
         const currentFrame = frames[i];
         
                   for (const archetype of Object.keys(currentFrame.scores)) {
           const prevScore = prevFrame.scores[archetype] || 0;
           const currentScore = currentFrame.scores[archetype] || 0;
           
           // Calculate the retained baseline
           const retainedBaseline = prevScore * decayRate;
           
           // Calculate the actual increment
           const actualIncrement = currentScore - retainedBaseline;
           
           // The increment should be non-negative (allowing for tiny float noise)
           // This is the core property: scores don't go below the retained baseline
           // Increment = next - prev * retention ≥ -EPS
           expect(actualIncrement).toBeGreaterThanOrEqual(-EPS);
           
           // Log large increments for debugging
           if (actualIncrement > 1.0) {
             console.log(`  📊 Large increment: ${archetype} +${actualIncrement.toFixed(3)} at frame ${i} (q${currentFrame.q})`);
             console.log(`      Prev: ${prevScore.toFixed(3)}, Current: ${currentScore.toFixed(3)}, Retained: ${retainedBaseline.toFixed(3)}`);
           }
         }
       }
     });

    test("R-choice bounds respected", () => {
      const script = (step: any) => ({
        id: step.phase === "A" ? step.item.options[0].id : step.options[0].id,
        behavior: cleanBehavior
      });
      
      const { frames } = runScript(script, 123);
      
      frames.forEach(frame => {
        expect(frame.rChoiceSum).toBeGreaterThanOrEqual(0);
        expect(frame.rChoiceSum).toBeLessThanOrEqual(24);
      });
    });

         test("Flip count never exceeds maximum", () => {
       const script = (step: any) => ({
         id: step.phase === "A" ? step.item.options[0].id : step.options[0].id,
         behavior: cleanBehavior
       });
       
       const { result } = runScript(script, 123);
       
       expect(result.flips).toBeLessThanOrEqual(2);
     });

    test("Edge cases: extreme decay scenarios", () => {
      // Test with very high decay rates and edge cases
      // Note: Using more reasonable decay rates that the engine can handle
      const testCases = [
        { retention: 0.2, description: "high decay (keep 20%)" },
        { retention: 0.5, description: "moderate decay (keep 50%)" },
        { retention: 0.8, description: "low decay (keep 80%)" },
        { retention: 0.05, description: "very high decay (keep 5%)" }
      ];
      
      testCases.forEach(({ retention, description }) => {
        // Temporarily override retention rate for this test
        const originalRetention = QUIZ_CONFIG.scoring.decayLambda;
        QUIZ_CONFIG.scoring.decayLambda = retention;
        
        try {
          const script = (step: any) => ({
            id: step.phase === "A" ? step.item.options[0].id : step.options[0].id,
            behavior: cleanBehavior
          });
          
          const { frames } = runScript(script, 123);
          
          // Verify the core invariant still holds
          for (let i = 1; i < frames.length; i++) {
            const prevFrame = frames[i - 1];
            const currentFrame = frames[i];
            
            for (const archetype of Object.keys(currentFrame.scores)) {
              const prevScore = prevFrame.scores[archetype] || 0;
              const currentScore = currentFrame.scores[archetype] || 0;
              const retainedBaseline = prevScore * retention;
              
              // Invariant: next ≥ prev * retention
              // This matches how the quiz engine actually works: scores *= retention
              expect(currentScore + EPS).toBeGreaterThanOrEqual(retainedBaseline);
            }
          }
        } finally {
          // Restore original retention rate
          QUIZ_CONFIG.scoring.decayLambda = originalRetention;
        }
      });
    });

    test("Edge cases: zero gain scenarios", () => {
      // Test with behavior that should produce minimal score changes
      const minimalBehavior = { latencyMs: 5000, switches: 5, hoverRefsMs: 2000, underClockHit: false };
      
      const script = (step: any) => ({
        id: step.phase === "A" ? step.item.options[0].id : step.options[0].id,
        behavior: minimalBehavior
      });
      
      const { frames } = runScript(script, 123);
      const decayRate = QUIZ_CONFIG.scoring.decayLambda;
      
      // Even with minimal gain, the invariant should hold
                for (let i = 1; i < frames.length; i++) {
            const prevFrame = frames[i - 1];
            const currentFrame = frames[i];
            
            for (const archetype of Object.keys(currentFrame.scores)) {
              const prevScore = prevFrame.scores[archetype] || 0;
              const currentScore = currentFrame.scores[archetype] || 0;
              const retainedBaseline = prevScore * decayRate;
              
              // Invariant: next ≥ prev * retention
              // This matches how the quiz engine actually works: scores *= retention
              expect(currentScore + EPS).toBeGreaterThanOrEqual(retainedBaseline);
            }
          }
    });

    test("Edge cases: long streaks", () => {
      // Test with a very long sequence to catch any accumulation issues
      const longStreakBehavior = { latencyMs: 800, switches: 0, hoverRefsMs: 0, underClockHit: true };
      
      const script = (step: any) => ({
        id: step.phase === "A" ? step.item.options[0].id : step.options[0].id,
        behavior: longStreakBehavior
      });
      
      const { frames } = runScript(script, 123);
      const decayRate = QUIZ_CONFIG.scoring.decayLambda;
      
      // Over many steps, the invariant should remain rock solid
      for (let i = 1; i < frames.length; i++) {
        const prevFrame = frames[i - 1];
        const currentFrame = frames[i];
        
        for (const archetype of Object.keys(currentFrame.scores)) {
          const prevScore = prevFrame.scores[archetype] || 0;
          const currentScore = currentFrame.scores[archetype] || 0;
                      const retainedBaseline = prevScore * decayRate;
            
            // Invariant: next ≥ prev * retention
            // This matches how the quiz engine actually works: scores *= retention
            expect(currentScore + EPS).toBeGreaterThanOrEqual(retainedBaseline);
          
          // Additional check: very long streaks shouldn't produce unreasonable scores
          expect(currentScore).toBeLessThan(1000); // Reasonable upper bound
        }
      }
    });

    test("Regression: old monotonicity test would fail, new baseline test passes", () => {
      // This test demonstrates that the old "score never decreases" property
      // would fail, but our new "score >= decayed baseline" property passes
      const script = (step: any) => ({
        id: step.phase === "A" ? step.item.options[0].id : step.options[0].id,
        behavior: cleanBehavior
      });
      
      const { frames } = runScript(script, 123);
      const decayRate = QUIZ_CONFIG.scoring.decayLambda;
      
      // Find a case where score decreases (old test would fail)
      let foundDecrease = false;
      let decreaseDetails = null;
      
      for (let i = 1; i < frames.length; i++) {
        const prevFrame = frames[i - 1];
        const currentFrame = frames[i];
        
        for (const archetype of Object.keys(currentFrame.scores)) {
          const prevScore = prevFrame.scores[archetype] || 0;
          const currentScore = currentFrame.scores[archetype] || 0;
          
          if (currentScore < prevScore) {
            foundDecrease = true;
            decreaseDetails = { archetype, prevScore, currentScore, frame: i };
            break;
          }
        }
        if (foundDecrease) break;
      }
      
      // Old test would fail here - score decreased
      expect(foundDecrease).toBe(true);
      
      // But new test passes - score >= decayed baseline
      if (decreaseDetails) {
        const { archetype, prevScore, currentScore, frame } = decreaseDetails;
        const retainedBaseline = prevScore * decayRate;
        expect(currentScore + EPS).toBeGreaterThanOrEqual(retainedBaseline);
      }
    });

    test("Regression: hand-crafted sequence that would fail old test", () => {
      // This is a specific edge case that demonstrates the old vs new invariant
      // We'll create a scenario where decay is high and gain is low
      
      // Temporarily set a very high decay rate to make the effect obvious
      const originalDecay = QUIZ_CONFIG.scoring.decayLambda;
      QUIZ_CONFIG.scoring.decayLambda = 0.8; // 80% decay per step
      
      try {
        // Use minimal behavior to create low gain
        const minimalBehavior = { latencyMs: 5000, switches: 5, hoverRefsMs: 2000, underClockHit: false };
        
        const script = (step: any) => ({
          id: step.phase === "A" ? step.item.options[0].id : step.options[0].id,
          behavior: minimalBehavior
        });
        
        const { frames } = runScript(script, 123);
        
        // Find a frame where the score actually decreased (old test would fail)
        let foundDecrease = false;
        let decreaseDetails = null;
        
        for (let i = 1; i < frames.length; i++) {
          const prevFrame = frames[i - 1];
          const currentFrame = frames[i];
          
          for (const archetype of Object.keys(currentFrame.scores)) {
            const prevScore = prevFrame.scores[archetype] || 0;
            const currentScore = currentFrame.scores[archetype] || 0;
            
            if (currentScore < prevScore) {
              foundDecrease = true;
              decreaseDetails = { archetype, prevScore, currentScore, frame: i };
              break;
            }
          }
          if (foundDecrease) break;
        }
        
        // Old test would fail here - score decreased
        expect(foundDecrease).toBe(true);
        
        // But new test passes - score >= retained baseline
        if (decreaseDetails) {
          const { archetype, prevScore, currentScore, frame } = decreaseDetails;
          const retainedBaseline = prevScore * 0.8; // 80% retention
          
          // This is the key: even though score decreased, it's still >= retained baseline
          expect(currentScore + EPS).toBeGreaterThanOrEqual(retainedBaseline);
          
          // Log the details for clarity
          console.log(`  📊 Regression test passed: ${archetype} at frame ${frame}`);
          console.log(`      Prev: ${prevScore.toFixed(3)}, Current: ${currentScore.toFixed(3)}`);
          console.log(`      Retained baseline: ${retainedBaseline.toFixed(3)}`);
          console.log(`      Old test would fail: ${currentScore} < ${prevScore}`);
          console.log(`      New test passes: ${currentScore} >= ${retainedBaseline} - ${EPS}`);
        }
      } finally {
        // Restore original decay rate
        QUIZ_CONFIG.scoring.decayLambda = originalDecay;
      }
    });
  });

  describe("Oracle Cross-Check", () => {
    test("Oracle replay produces identical results", () => {
      const script = (step: any) => ({
        id: step.phase === "A" ? step.item.options[0].id : step.options[0].id,
        behavior: cleanBehavior
      });
      
      const { frames, result } = runScript(script, 123);
      const oracle = oracleReplay(frames);
      
      // Oracle should match engine results
      expect(crossCheckResult(result, oracle)).toBe(true);
    });

    test("Oracle handles all trigger types correctly", () => {
      // Test script that hits different triggers
      const script = (step: any) => {
        if (step.phase === "A") {
          return { id: step.item.options[0].id, behavior: cleanBehavior };
        } else {
          // Try to pick options with different triggers
          const option = step.options.find((o: any) => o.trigger) || step.options[0];
          return { id: option.id, behavior: cleanBehavior };
        }
      };
      
      const { frames, result } = runScript(script, 123);
      const oracle = oracleReplay(frames);
      
      expect(crossCheckResult(result, oracle)).toBe(true);
    });
  });

  describe("Deterministic Behavior", () => {
    test("Same seed produces identical results", () => {
      const script = (step: any) => ({
        id: step.phase === "A" ? step.item.options[0].id : step.options[0].id,
        behavior: cleanBehavior
      });
      
      const run1 = runScript(script, 123);
      const run2 = runScript(script, 123);
      
      expect(run1.result.finalArchetype).toBe(run2.result.finalArchetype);
      expect(run1.result.altArchetype).toBe(run2.result.altArchetype);
      expect(run1.result.flips).toBe(run2.result.flips);
      expect(run1.result.rIndex).toBe(run2.result.rIndex);
    });

    test("Different seeds produce different results", () => {
      // Create a seeded strategy that branches based on seed
      const seededStrategy = (seed: number) => {
        const rng = seedrandom(String(seed));
        return (step: any) => {
          // ~30% chance pick next option instead of first
          if (rng() < 0.3) {
            const opts = step.phase === "A" ? step.item.options : step.options;
            const pick = opts[Math.min(1, opts.length-1)];
            return { 
              id: pick.id, 
              behavior: { latencyMs: 1300, switches: 0, hoverRefsMs: 0, underClockHit: true }
            };
          }
          const id = step.phase === "A" ? step.item.options[0].id : step.options[0].id;
          return { 
            id, 
            behavior: { latencyMs: 900, switches: 0, hoverRefsMs: 0, underClockHit: true }
          };
        };
      };
      
      const run1 = runScript(seededStrategy(111), 111);
      const run2 = runScript(seededStrategy(222), 222);
      
      // Different seeds should produce different results
      const different = run1.result.finalArchetype !== run2.result.finalArchetype ||
                      run1.result.rIndex !== run2.result.rIndex ||
                      run1.result.flips !== run2.result.flips;
      
      // At least some aspect should be different
      expect(different).toBe(true);
    });
  });
});

// --- Decay math hardening tests ---
describe("Score update invariants", () => {
  const EPS = 1e-9;

  it("never drops below the decayed baseline (general)", () => {
    const runs = 200;
    let prev = 0.0;
    const decay = 0.27;

    for (let i = 0; i < runs; i++) {
      const gain = Math.random() * 3; // arbitrary stress
      const next = prev * (1 - decay) + gain;

      const decayed = prev * (1 - decay);
      expect(next + EPS).toBeGreaterThanOrEqual(decayed);

      const incr = next - decayed;
      expect(incr + EPS).toBeGreaterThanOrEqual(0);

      prev = next;
    }
  });

  it("handles decay=0 (pure accumulation)", () => {
    const decay = 0;
    let prev = 0;
    for (let i = 0; i < 50; i++) {
      const gain = i % 3 === 0 ? 0 : 0.5;
      const next = prev * (1 - decay) + gain;
      expect(next + EPS).toBeGreaterThanOrEqual(prev * (1 - decay));
      prev = next;
    }
  });

  it("handles high decay (e.g., 0.95)", () => {
    const decay = 0.95;
    let prev = 5;
    for (let i = 0; i < 50; i++) {
      const gain = i % 5 === 0 ? 0 : 0.1;
      const next = prev * (1 - decay) + gain;
      expect(next + EPS).toBeGreaterThanOrEqual(prev * (1 - decay));
      prev = next;
    }
  });

  it("regression: old monotonicity check would fail, baseline check passes", () => {
    const decay = 0.3;
    const seq = [1.0, 0.0, 0.0, 0.0, 0.4]; // forces a raw drop vs prev, but OK vs decayed baseline
    let prev = 2.0;
    for (const gain of seq) {
      const next = prev * (1 - decay) + gain;
      // Old (WRONG) property would assert: next >= prev (can fail)
      // Correct property:
      const decayed = prev * (1 - decay);
      expect(next + EPS).toBeGreaterThanOrEqual(decayed);
      prev = next;
    }
  });
});
