// lib/shared/flipOracle.ts
import type { Archetype } from "../quizConfig";

export type FrameForFlip = {
  q: number;                               // 1..15
  a1: Archetype;                           // leader after the answer
  a2: Archetype;                           // runner-up after the answer
  scores: Record<Archetype, number>;       // decayed totals after the answer
};

export type FlipGates = {
  overtake2Q: number;        // e.g. 6   (percent)
  singleAfterQ: { qMin: number; marginPct: number }; // { qMin: 8, marginPct: 10 }
  maxFlips: number;          // e.g. 2
};

// Count flips by spec: A2 becomes the new leader (A1) with sufficient margin
export function countFlipsFromFrames(frames: FrameForFlip[], gates: FlipGates): number {
  const { overtake2Q, singleAfterQ, maxFlips } = gates;
  let flips = 0;
  
  // Debug print if enabled
  const debug = process.env.QUIZ_DEBUG === "1";
  if (debug) {
    console.log("\n🔍 FLIP DEBUG TABLE:");
    console.log("Q\tA1\tA2\tA2Lead%\tGate Hit");
    console.log("--\t--\t--\t-------\t--------");
  }

  for (let i = 1; i < frames.length; i++) {
    if (flips >= maxFlips) break;

    const f = frames[i];
    const prev = frames[i - 1];

    // Check if A2 has become the new leader (flip occurred)
    const a2IsNowLeader = f.a1 === prev.a2 && f.a2 === prev.a1;
    
    if (a2IsNowLeader) {
      // A2 has become A1, this is a flip!
      // Check if it meets the margin requirements
      const total = Math.max(1e-9, Object.values(f.scores).reduce((a, b) => a + b, 0));
      const newLeaderMargin = ((f.scores[f.a1] - f.scores[f.a2]) / total) * 100;
      
      // Gate 1: Two consecutive frames with sufficient margin
      const prevTotal = Math.max(1e-9, Object.values(prev.scores).reduce((a, b) => a + b, 0));
      const prevMargin = ((prev.scores[prev.a1] - prev.scores[prev.a2]) / prevTotal) * 100;
      
      const twoQFlip = prevMargin > overtake2Q && newLeaderMargin > overtake2Q;
      
      // Gate 2: Single big lead after Qmin
      const singleFlip = (f.q >= singleAfterQ.qMin) && newLeaderMargin > singleAfterQ.marginPct;
      
      if (debug) {
        let gateHit = "";
        if (twoQFlip) gateHit = "2Q-flip";
        else if (singleFlip) gateHit = "single-flip";
        
        console.log(`${f.q}\t${f.a1}\t${f.a2}\t${newLeaderMargin.toFixed(1)}%\t${gateHit}`);
      }
      
      if (twoQFlip || singleFlip) {
        flips++;
      }
    } else if (debug) {
      console.log(`${f.q}\t${f.a1}\t${f.a2}\t--\tno-flip`);
    }
  }
  
  if (debug) {
    console.log(`\n🎯 Total flips: ${flips}`);
  }
  
  return flips;
}
