import { runScript } from './lib/sim/simulator';
import { QUIZ_CONFIG } from './lib/quizConfig';

// save originals
const origOvertake2Q = QUIZ_CONFIG.scoring.flipOvertake2Q;         // was 6
const origSingleAfterQ = { ...QUIZ_CONFIG.scoring.flipSingleAfterQ }; // { qMin: 8, marginPct: 10 }

// make flips a bit easier for this scenario
QUIZ_CONFIG.scoring.flipOvertake2Q = 3;                  // from 6 → 3
QUIZ_CONFIG.scoring.flipSingleAfterQ = { qMin: 8, marginPct: 4 }; // from 10% → 4%

const clean = { latencyMs: 900, switches: 0, hoverRefsMs: 0, underClockHit: true };

const customFlipStrategy = (step: any) => {
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
          const pureA2 = step.options.find((o: any) => o.id === `${tplId}-PURE-A2`);
          if (pureA2) return { id: pureA2.id, behavior: clean };
          const m2 = step.options.find((o: any) => o.id === `${tplId}-M2`); // A2-heavy mix
          if (m2) return { id: m2.id, behavior: clean };
        }

  // otherwise use your existing "mixed/alternating" picks
  const m2 = step.options.find((o: any) => o.id === `${tplId}-M2`);
  return { id: (m2 || step.options.at(-1)).id, behavior: clean };
};

console.log('🔍 Running custom flip test with modified thresholds...');
console.log('Modified thresholds:');
console.log(`  flipOvertake2Q: ${QUIZ_CONFIG.scoring.flipOvertake2Q} (was ${origOvertake2Q})`);
console.log(`  flipSingleAfterQ: ${JSON.stringify(QUIZ_CONFIG.scoring.flipSingleAfterQ)} (was ${JSON.stringify(origSingleAfterQ)})`);

const { frames, result } = runScript(customFlipStrategy);

console.log('\n📊 Results:');
console.log(`  Flips: ${result.flips}`);
console.log(`  Final Archetype: ${result.finalArchetype}`);
console.log(`  Alt Archetype: ${result.altArchetype}`);
console.log(`  R-Index: ${result.rIndex}`);

// restore
QUIZ_CONFIG.scoring.flipOvertake2Q = origOvertake2Q;
QUIZ_CONFIG.scoring.flipSingleAfterQ = origSingleAfterQ;

console.log('\n✅ Restored original thresholds');
