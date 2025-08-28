// Ground Zero — Deterministic Quiz Simulator
// Produces frame-by-frame execution logs for verification

import { QuizEngine, simulateRun, type QuizStep, type BehaviorSample } from "../quizEngine";
import { QUIZ_CONFIG, type Archetype, type Trigger } from "../quizConfig";
import { countFlipsFromFrames } from "../shared/flipOracle";

export type Frame = {
  q: number;
  phase: "A" | "B";
  itemId: string;
  optionId: string;
  leaders: { a1: string; a2: string; a3: string; marginPct: number; state: string };
  scores: Record<string, number>;
  triggerCounts: Record<string, number>;
  rChoiceSum: number;
  behavior: BehaviorSample;
  resolvedWeights: {
    primary: Archetype;
    secondary: Archetype | null;
    p: number;
    s: number;
    pureA1: boolean;
    trigger?: Trigger;
    rWeight?: number;
  };
};

export function runScript(
  script: (s: QuizStep) => { id: string; behavior: BehaviorSample },
  seed: number = 123
) {
  const engine = new QuizEngine(seed);
  const frames: Frame[] = [];
  let step = engine.start();

  while (step !== "FINISHED") {
    const pick = script(step);
    
    // Get current state before advancing
    const leaders = engine.getLeaders();
    const currentIndex = engine.getIndex();
    
    // Advance to next step first
    const next = engine.nextStepAfterAnswer(pick.id, pick.behavior);
    
    // Snapshot state AFTER the answer is processed
    const updatedLeaders = engine.getLeaders();
    const resolvedWeights = (engine as any).__lastResolvedWeights;
    
    // take immutable snapshots so frames don't share references
    const scoresRaw = (engine as any)["scores"];
    const scores = Object.fromEntries(
      Object.entries(scoresRaw).map(([k, v]) => [k, Number(v)])
    );
    
    frames.push({
      q: currentIndex + 1,                      // post-answer index (1-based)
      phase: step.phase,
      itemId: step.phase === "A" ? step.item.id : step.itemId,
      optionId: pick.id,
      leaders: { ...updatedLeaders },
      scores,                              // << snapshot (not the live object)
      triggerCounts: { ...(engine as any)["triggerCounts"] },
      rChoiceSum: Number((engine as any)["rChoiceSum"] || 0),
      behavior: pick.behavior,
      resolvedWeights
    });
    
    if (next === "FINISHED") break;
    step = next;
  }

  const result = engine.finalize();
  // Override flip count to use frame-based counting (same as oracle)
  const gates = {
    overtake2Q: QUIZ_CONFIG.scoring.flipOvertake2Q,
    singleAfterQ: QUIZ_CONFIG.scoring.flipSingleAfterQ,
    maxFlips: QUIZ_CONFIG.scoring.maxFlips
  };

  // Debug: log frame data for flip counting
  const frameDataForFlips = frames.map(f => ({
    q: f.q,
    a1: f.leaders.a1,
    a2: f.leaders.a2,
    scores: f.scores
  }));
  
  console.log("🔍 FLIP COUNTING DEBUG:");
  console.log("Gates:", gates);
  console.log("Frames for flip counting:", frameDataForFlips);
  
  // Debug: check if we have enough frames
  if (frameDataForFlips.length < 2) {
    console.log("⚠️ WARNING: Not enough frames for flip counting!");
    console.log("Need at least 2 frames, got:", frameDataForFlips.length);
  }
  
  const flips = countFlipsFromFrames(frameDataForFlips, gates);
  
  console.log("🎯 Computed flips:", flips);

  result.flips = flips;
  return { frames, result };
}

// Convenience function for running predefined scripts
export function runGoldenScript(scriptName: string, seed: number = 123) {
  const scripts: Record<string, (s: QuizStep) => { id: string; behavior: BehaviorSample }> = {
    "all-a-path": (step: QuizStep) => {
      // Always pick Sovereign-leaning options to maintain A1 dominance
      if (step.phase === "A") {
        // For each Phase A question, pick the option that has Sovereign as primary
        const sovereignOption = step.item.options.find((o: any) => o.weights.primary === "Sovereign");
        if (sovereignOption) {
          return { 
            id: sovereignOption.id, 
            behavior: { latencyMs: 800, switches: 0, hoverRefsMs: 0, underClockHit: true }
          };
        } else {
          // Fallback to first option if no Sovereign option found
          return { 
            id: step.item.options[0].id, 
            behavior: { latencyMs: 800, switches: 0, hoverRefsMs: 0, underClockHit: true }
          };
        }
      } else {
        // In Phase B, pick the first pure A1 option (which is always A1-leaning)
        const pureA1Option = step.options.find((o: any) => o.meta?.pureA1);
        if (pureA1Option) {
          return { 
            id: pureA1Option.id, 
            behavior: { latencyMs: 800, switches: 0, hoverRefsMs: 0, underClockHit: true }
          };
        } else {
          // Fallback to first option if no pure A1 found
          return { 
            id: step.options[0].id, 
            behavior: { latencyMs: 800, switches: 0, hoverRefsMs: 0, underClockHit: true }
          };
        }
      }
    },
    
    "flip-mid-run": (step: QuizStep) => {
      const clean = { latencyMs: 900, switches: 0, hoverRefsMs: 0, underClockHit: true };

      if (step.phase === "A") {
        // Phase A (Q1–Q7): create volatility by alternating between extreme options
        const opts = step.item.options;
        const idx = step.index ?? 0;
        // Alternate between first and last options to maximize score differences
        const optionIndex = (idx % 2 === 0) ? 0 : opts.length - 1;
        return { id: opts[optionIndex].id, behavior: clean };
      }

      // Phase B (Q8–Q15): force A2 surge at Q9 & Q10
      const tplId = step.itemId;                // e.g. "B2"
      const q = step.q ?? step.index ?? 8;

      if (q === 9 || q === 10) {
        // Prefer PURE A2 if rendered; else A2-mixed (M2)
        const pureA2 = step.options.find((o:any) => o.id === `${tplId}-PURE-A2`);
        if (pureA2) return { id: pureA2.id, behavior: clean };
        const m2 = step.options.find((o:any) => o.id === `${tplId}-M2`);
        if (m2) return { id: m2.id, behavior: clean };
      }

      // For other Phase-B questions, keep nudging toward A2 using M2
      const m2 = step.options.find((o:any) => o.id === `${tplId}-M2`);
      if (m2) return { id: m2.id, behavior: clean };

      // Fallback: last option
      return { id: step.options.at(-1).id, behavior: clean };
    },
    
    "high-r-imprinter": (step: QuizStep) => {
      // super clean behavior
      const clean = { latencyMs: 700, switches: 0, hoverRefsMs: 0, underClockHit: !!step.underClock };

      if (step.phase === "A") {
        // Phase A (Q1–Q7): Target Equalizer to make it A1
        // For A1 question, pick option 6 (Equalizer primary)
        if (step.item.id === "A1") {
          return { id: "A1-6", behavior: clean }; // Equalizer primary
        }
        // For A3 question, pick option 4 (Equalizer primary)
        if (step.item.id === "A3") {
          return { id: "A3-4", behavior: clean }; // Equalizer primary
        }
        // For A4 question, pick option 4 (Equalizer primary)
        if (step.item.id === "A4") {
          return { id: "A4-4", behavior: clean }; // Equalizer primary
        }
        // For A7 question, pick option 4 (Equalizer primary)
        if (step.item.id === "A7") {
          return { id: "A7-4", behavior: clean }; // Equalizer primary
        }
        // For A2 question, pick option 1 (Provider primary, Guardian secondary)
        if (step.item.id === "A2") {
          return { id: "A2-1", behavior: clean }; // Provider primary, Guardian secondary
        }
        // For A5 question, pick option 4 (Equalizer primary)
        if (step.item.id === "A5") {
          return { id: "A5-4", behavior: clean }; // Equalizer primary
        }
        // For A6 question, pick option 4 (Partner primary, Equalizer secondary)
        if (step.item.id === "A6") {
          return { id: "A6-4", behavior: clean }; // Partner primary, Equalizer secondary
        }
        
        // Fallback: pick any option that has Equalizer as primary
        const equalizerPrimaryOption = step.item.options.find(o => 
          o.weights.primary === "Equalizer"
        );
        if (equalizerPrimaryOption) {
          return { id: equalizerPrimaryOption.id, behavior: clean };
        }
        
        // Last resort: pick option 1
        return { id: step.item.options[0].id, behavior: clean };
      }

      // Phase B: pick Control trigger options to get 3 Control triggers
      // Look for options with Control trigger
      const controlOption = step.options.find((o:any) => o.trigger === "Control");
      if (controlOption) {
        return { id: controlOption.id, behavior: clean };
      }

      // If no Control option, pick the highest rWeight option
      const highestRWeight = Math.max(...step.options.filter(o => o.rWeight).map(o => o.rWeight));
      const highestROption = step.options.find((o:any) => o.rWeight === highestRWeight);
      if (highestROption) {
        return { id: highestROption.id, behavior: clean };
      }

      // Fallback: pick the first pure A1 option
      const pureA1Option = step.options.find((o:any) => o.meta?.pureA1);
      if (pureA1Option) {
        return { id: pureA1Option.id, behavior: clean };
      }

      // Last resort: pick the first option
      return { id: step.options[0].id, behavior: clean };
    },
    
    "low-r-literalist": (step: QuizStep) => {
      // Pick options that favor Equalizer but with low R-index (hesitant behavior)
      if (step.phase === "A") {
        // In Phase A, pick options that lean toward Equalizer (same as high-r-imprinter)
        const equalizerOption = step.item.options.find(o => 
          o.weights.primary === "Equalizer" || o.weights.secondary === "Equalizer"
        );
        if (equalizerOption) {
          return { 
            id: equalizerOption.id, 
            behavior: { latencyMs: 7000, switches: 2, hoverRefsMs: 3000, underClockHit: false }
          };
        }
        // If no Equalizer option, pick options that favor Guardian/Provider (supportive archetypes)
        const supportiveOption = step.item.options.find(o => 
          o.weights.primary === "Guardian" || o.weights.primary === "Provider" ||
          o.weights.secondary === "Guardian" || o.weights.secondary === "Provider"
        );
        if (supportiveOption) {
          return { 
            id: supportiveOption.id, 
            behavior: { latencyMs: 7000, switches: 2, hoverRefsMs: 3000, underClockHit: false }
          };
        }
        // Fallback to first option
        return { 
          id: step.item.options[0].id, 
          behavior: { latencyMs: 7000, switches: 2, hoverRefsMs: 3000, underClockHit: false }
        };
      } else {
        // In Phase B, pick pure A1 options with Control triggers but with low R-index (hesitant behavior)
        // Look for options with Control trigger first
        const controlOption = step.options.find(o => o.meta?.pureA1 && o.trigger === "Control");
        if (controlOption) {
          return { 
            id: controlOption.id, 
            behavior: { latencyMs: 7000, switches: 2, hoverRefsMs: 3000, underClockHit: false }
          };
        }
        // If no Control option, pick any pure A1 option
        const pureA1 = step.options.find(o => o.meta?.pureA1);
        return { 
          id: pureA1?.id || step.options[0].id, 
          behavior: { latencyMs: 7000, switches: 2, hoverRefsMs: 3000, underClockHit: false }
        };
      }
    }
  };

  const script = scripts[scriptName];
  if (!script) {
    throw new Error(`Unknown golden script: ${scriptName}. Available: ${Object.keys(scripts).join(", ")}`);
  }

  return runScript(script, seed);
}
