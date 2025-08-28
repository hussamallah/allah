// Ground Zero — Shadow Scorer (Oracle)
// Independently recomputes results from event log to verify engine correctness

import { QUIZ_CONFIG, type Archetype, type Trigger } from "../quizConfig";
import type { Frame } from "./simulator";
import { countFlipsFromFrames } from "../shared/flipOracle";

export interface OracleResult {
  finalArchetype: string;
  altArchetype: string;
  scores: Record<string, number>;
  triggers: Record<string, number>;
  rChoiceSum: number;
  validTriggers: string[];
  margins: number[];
  flips: number;
  state: string;
}

export function oracleReplay(frames: Frame[]): OracleResult {
  const λ = QUIZ_CONFIG.scoring.decayLambda;
  const archetypes = QUIZ_CONFIG.archetypes;
  const scores: Record<string, number> = Object.fromEntries(archetypes.map(a => [a, 0])) as any;
  const triggers: Record<string, number> = Object.fromEntries(QUIZ_CONFIG.triggers.map(t => [t, 0])) as any;
  let rChoiceSum = 0;
  const margins: number[] = [];

  frames.forEach((frame, idx) => {
    // Decay all scores first (same as engine: decay-before-add)
    for (const a of archetypes) scores[a] *= λ;

    // Apply the chosen option's weights
    const { primary, secondary, p, s, pureA1, trigger, rWeight } = frame.resolvedWeights;

    scores[primary] += p;
    if (secondary) scores[secondary] += s;

    // Track triggers and R-weights for pure A1 choices
    if (pureA1 && trigger) {
      triggers[trigger] = (triggers[trigger] ?? 0) + 1;
      if (typeof rWeight === "number") rChoiceSum += rWeight;
    }

    // Compute current leaders and margin
    const entries = Object.entries(scores) as [string, number][];
    entries.sort((a, b) => b[1] - a[1]);
    const [currentA1, currentA2] = entries.slice(0, 2).map(e => e[0]);
    const top = entries[0][1], second = entries[1][1];
    const total = entries.reduce((acc, [, v]) => acc + v, 0) || 1;
    const margin = top - second;
    const marginPct = (margin / total) * 100;
    margins.push(+marginPct.toFixed(4)); // Match engine precision
  });

  // Final leaders
  const entries = Object.entries(scores) as [string, number][];
  entries.sort((a, b) => b[1] - a[1]);
  const [finalArchetype] = entries[0] as [string, number];
  const [altArchetype] = entries[1] as [string, number];

  // Compute flips using shared logic
  const gates = {
    overtake2Q: QUIZ_CONFIG.scoring.flipOvertake2Q,
    singleAfterQ: QUIZ_CONFIG.scoring.flipSingleAfterQ,
    maxFlips: QUIZ_CONFIG.scoring.maxFlips
  };

  const flips = countFlipsFromFrames(
    frames.map(f => ({
      q: f.q,
      a1: f.leaders.a1,
      a2: f.leaders.a2,
      scores: f.scores
    })),
    gates
  );

  // Valid triggers (≥3 hits)
  const validTriggers = Object.entries(triggers)
    .filter(([, c]) => (c ?? 0) >= 3)
    .map(([t]) => t as Trigger);

  // Determine final state (stable if last 2 margins ≥ 6%)
  const stableNeeded = QUIZ_CONFIG.scoring.stableNeededConsecutive;
  const corridor = QUIZ_CONFIG.scoring.stableMarginPct;
  const last = margins.slice(-stableNeeded);
  const allStable = last.length === stableNeeded && last.every(m => m >= corridor);
  const state = allStable ? "stable" : "volatile";

  return {
    finalArchetype,
    altArchetype,
    scores,
    triggers,
    rChoiceSum,
    validTriggers,
    margins,
    flips,
    state
  };
}

// Cross-check engine result with oracle
export function crossCheckResult(engineResult: any, oracleResult: OracleResult): boolean {
  const mismatches: string[] = [];

  if (engineResult.finalArchetype !== oracleResult.finalArchetype) {
    mismatches.push(`Final archetype: engine=${engineResult.finalArchetype}, oracle=${oracleResult.finalArchetype}`);
  }

  if (engineResult.altArchetype !== oracleResult.altArchetype) {
    mismatches.push(`Alt archetype: engine=${engineResult.altArchetype}, oracle=${oracleResult.altArchetype}`);
  }

  if (engineResult.flips !== oracleResult.flips) {
    mismatches.push(`Flips: engine=${engineResult.flips}, oracle=${oracleResult.flips}`);
  }

  // Check trigger counts
  for (const [trigger, count] of Object.entries(oracleResult.triggers)) {
    const engineCount = engineResult.triggerCounts[trigger] || 0;
    if (engineCount !== count) {
      mismatches.push(`Trigger ${trigger}: engine=${engineCount}, oracle=${count}`);
    }
  }

  if (mismatches.length > 0) {
    console.error("❌ Oracle cross-check failed:");
    mismatches.forEach(m => console.error(`  ${m}`));
    return false;
  }

  console.log("✅ Oracle cross-check passed");
  return true;
}
