// GroundZero v3 Configuration Constants
// Centralized configuration for all v3 features

import { Line, Face, Verdict } from '../../types/quiz-v2';

// ==================== FLOW CONSTANTS ====================
export const V3_FLOW = {
  // FH limits
  FH_MAX_SCREENS: 9,
  FH_MAX: 9,  // Alias used in validations
  FH_MIN_LOCK: 2, // Q2 minimum to lock
  FH_LOCK_MIN_SCREEN: 2, // Back-compat alias

  // Phase 3 limits and budget
  P3_MIN: 2,
  P3_MAX: 4,
  P3_BUDGET: 18,

  // Under-clock items total window (used by R-Index)
  UNDERCLOCK_TOTAL: 5,

  // Fixed line order for tie-breaking
  LINE_ORDER: ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'] as Line[],

  // Face selection weights (heavy front-loading)
  FACE_WEIGHTS: {
    LAMBDA_PRIOR: 2.0,    // prior influence from FH
    W_TRIAD: 3.0,         // Q1 (Triad) evidence
    W_DUEL1: 4.0,         // Q2 (First Duel) evidence
    W_DUEL2: 1.0,         // Q3 (Final Duel) evidence (only if needed)
    THETA_EARLY: 3.0      // margin to commit after Q2
  },
  
  // Early commit threshold (kept for back-compat)
  FACE_EARLY_COMMIT_MARGIN: 3.0
};

// ==================== EVIDENCE CONSTANTS ====================
export const V3_EVIDENCE = {
  // Global decay factor used for seed/token effective weights
  DECAY_LAMBDA: 0.92,

  // FH exposure weights used when emitting FH tokens
  // expo=0 → 0.00, 1-2 → 0.50, 3-5 → 0.80, ≥6 → 1.00
  FH_EXPOSURE_WEIGHTS: {
    0: 0.0,
    1: 0.5,
    2: 0.5,
    3: 0.8,
    4: 0.8,
    5: 0.8,
    6: 1.0,
    7: 1.0,
    8: 1.0,
    9: 1.0
  } as Record<number, number>,

  // FH attraction calculation weights
  FH_ATTRACTION_WEIGHTS: {
    HITS_RATE_WEIGHT: 0.65,
    EXPO_NORM_WEIGHT: 0.25,
    CONVICTION_WEIGHT: 0.10
  },
  
  // FH conviction thresholds
  FH_CONVICTION: {
    HIGH_THRESHOLD: 0.6,    // hits_rate ≥ 0.6 and expo ≥ 2
    MEDIUM_THRESHOLD: 0.5,  // hits_rate ≥ 0.5
    MIN_EXPOSURE: 2
  }
};

// High-level config aggregator for tests/back-compat
export const V3_CONFIG = {
  DECAY_LAMBDA: V3_EVIDENCE.DECAY_LAMBDA,
  INSTABILITY: {
    LATENCY_THRESHOLD: 6000,
    SWITCHES_THRESHOLD: 2,
    DELIBERATION_THRESHOLD: 2500
  },
  R_INDEX: {
    WEIGHTS: {
      CHOICES: 0.60,
      BEHAVIOR: 0.25,
      UNDER_CLOCK: 0.15
    }
  }
};

// ==================== BEHAVIOR CONSTANTS ====================
export const V3_BEHAVIOR = {
  // Clean vs Hesitant thresholds
  CLEAN_STRIKE: { LATENCY_MS: 2000, SWITCHES: 0 },
  HESITATION: { LATENCY_MS: 6000, SWITCHES: 2 },
  HOVER_READ_GAP: { DELIBERATION_MS: 2500 },
  
  isHesitantBehavior(behavior: {
    latency_ms: number;
    switches: number;
    deliberation_ms: number;
  }): boolean {
    return (
      behavior.latency_ms >= V3_BEHAVIOR.HESITATION.LATENCY_MS ||
      behavior.switches >= V3_BEHAVIOR.HESITATION.SWITCHES ||
      behavior.deliberation_ms >= V3_BEHAVIOR.HOVER_READ_GAP.DELIBERATION_MS
    );
  },
  
  isCleanBehavior(behavior: {
    latency_ms: number;
    switches: number;
    deliberation_ms: number;
  }): boolean {
    return (
      behavior.latency_ms <= V3_BEHAVIOR.CLEAN_STRIKE.LATENCY_MS &&
      behavior.switches <= V3_BEHAVIOR.CLEAN_STRIKE.SWITCHES
    );
  }
};

// ==================== AMBIGUITY CONSTANTS ====================
export const V3_AMBIGUITY = {
  BANDS: {
    HIGHLY_AMBIGUOUS: 0.12,
    CLEAR: 0.22,
    VERY_CLEAR: 0.25
  },
  // < 0.12 → +2, 0.12–0.22 → +1, ≥ 0.22 → +0
  getAmbiguityScore(margin: number): number {
    if (margin < V3_AMBIGUITY.BANDS.HIGHLY_AMBIGUOUS) return 2;
    if (margin < V3_AMBIGUITY.BANDS.CLEAR) return 1;
    return 0;
  }
};

// ==================== LINE ORDER CONSTANTS ====================
export const V3_LINE_ORDER = [
  'Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'
];

// ==================== FACE MAPPING CONSTANTS ====================
export const V3_FACE_MAPPING = {
  // Face to Line mapping
  CONTROL: ['sovereign', 'rebel', 'catalyst'],
  PACE: ['strategist', 'navigator', 'visionary'],
  BOUNDARY: ['guardian', 'equalizer', 'sentinel'],
  TRUTH: ['seeker', 'architect', 'alchemist'],
  RECOGNITION: ['spotlight', 'mask', 'artisan'],
  BONDING: ['provider', 'partner', 'servant'],
  STRESS: ['wanderer', 'diplomat'],

  // Also provide line-name keys for convenience/tests
  Control: ['sovereign', 'rebel', 'catalyst'],
  Pace: ['strategist', 'navigator', 'visionary'],
  Boundary: ['guardian', 'equalizer', 'sentinel'],
  Truth: ['seeker', 'architect', 'alchemist'],
  Recognition: ['spotlight', 'mask', 'artisan'],
  Bonding: ['provider', 'partner', 'servant'],
  Stress: ['wanderer', 'diplomat']
};

// ==================== FH→FACE ANCHOR LINE MAPPING ====================
// Each face gets two anchor lines (lightweight, editable) for computing face priors
export const V3_FACE_ANCHOR_LINES = {
  // Control Family
  sovereign: ['Recognition', 'Truth'] as [Line, Line],
  rebel: ['Stress', 'Pace'] as [Line, Line],
  catalyst: ['Boundary', 'Truth'] as [Line, Line],
  
  // Pace Family
  strategist: ['Boundary', 'Truth'] as [Line, Line],
  navigator: ['Recognition', 'Stress'] as [Line, Line],
  visionary: ['Control', 'Truth'] as [Line, Line],
  
  // Boundary Family
  guardian: ['Stress', 'Bonding'] as [Line, Line],
  equalizer: ['Truth', 'Recognition'] as [Line, Line],
  sentinel: ['Control', 'Pace'] as [Line, Line],
  
  // Truth Family
  seeker: ['Pace', 'Recognition'] as [Line, Line],
  architect: ['Boundary', 'Control'] as [Line, Line],
  alchemist: ['Stress', 'Pace'] as [Line, Line],
  
  // Recognition Family
  spotlight: ['Control', 'Pace'] as [Line, Line],
  mask: ['Bonding', 'Truth'] as [Line, Line],
  artisan: ['Boundary', 'Truth'] as [Line, Line],
  
  // Bonding Family
  provider: ['Boundary', 'Recognition'] as [Line, Line],
  partner: ['Pace', 'Truth'] as [Line, Line],
  servant: ['Control', 'Boundary'] as [Line, Line],
  
  // Stress Family
  wanderer: ['Pace', 'Recognition'] as [Line, Line],
  diplomat: ['Bonding', 'Recognition'] as [Line, Line]
};

// ==================== ANSWER MAPPING CONSTANTS ====================
export const V3_ANSWER_MAPPING = {
  // FH answers to verdicts
  FH: {
    'A': 'C' as const,
    'B': 'O' as const,
    'C': 'F' as const
  },
  
  // Face answers to verdicts
  FACE: {
    'A': 'C' as const,
    'B': 'O' as const,
    'C': 'F' as const
  },
  
  // Lines answers to verdicts
  LINES: {
    'A': 'C' as const,
    'B': 'O' as const,
    'C': 'F' as const
  }
};

// ==================== SPECIAL OVERRIDES ====================
export const V3_OVERRIDES = {
  // Checks for 2C + 1F among the provided verdicts (first three P3 tokens)
  shouldApply2C1FOverride(verdicts: Verdict[]): boolean {
    const cCount = verdicts.filter(v => v === 'C').length;
    const fCount = verdicts.filter(v => v === 'F').length;
    return cCount >= 2 && fCount >= 1;
  }
};

// ==================== BASELINES ====================
export const V3_BASELINES = {
  // expo=0 → 4 items, 1-2 → 3 items, ≥3 → 2 items
  getBaseline(expo: number): number {
    if (expo === 0) return 4;
    if (expo <= 2) return 3;
    return 2;
  }
};

// ==================== P3 SCORING ====================
export const V3_SCORING = {
  SEVERITY: {
    C: 0,
    O: 1,
    F: 2
  } as Record<Verdict, number>,
  // expo=0→+2, expo=1-2→+1, else→+0
  getExposurePenalty(expo: number): number {
    if (expo === 0) return 2;
    if (expo <= 2) return 1;
    return 0;
  }
};

// ==================== CONFIDENCE CONSTANTS ====================
export const V3_CONFIDENCE = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
};

// ==================== INSTABILITY (utility wrapper) ====================
export const V3_INSTABILITY = {
  isUnstable(behavior: { latency_ms: number; switches: number; deliberation_ms: number }): boolean {
    return V3_BEHAVIOR.isHesitantBehavior(behavior);
  }
};

// ==================== R-INDEX CONFIG ====================
export const V3_R_INDEX = {
  WEIGHTS: {
    CHOICES: 0.60,
    BEHAVIOR: 0.25,
    UNDER_CLOCK: 0.15
  },
  getStyleLabel(rIndexPercent: number): string {
    if (rIndexPercent >= 85) return 'Decisive & Clean';
    if (rIndexPercent >= 70) return 'Deliberate';
    if (rIndexPercent >= 50) return 'Hesitant';
    return 'Unsettled';
  }
};

// ==================== DRILLDOWN TAGS ====================
export const V3_DRILLDOWN_TAGS: Record<Line, string[]> = {
  Control: ['RoomStatus', 'Delegation', 'SelfCheckLoop'],
  Pace: ['OpenStream', 'DeadlineElastic', 'MultitaskDrift'],
  Boundary: ['SoftNo', 'AfterYesRegret', 'CloseCostFear'],
  Truth: ['ReasonSwitch', 'ApprovalCheck', 'EdgeCaseSpiral'],
  Recognition: ['OpticsLead', 'ArtifactDelay', 'ChatterDrag'],
  Bonding: ['Merging', 'AppeaseThenDelay', 'Availability'],
  Stress: ['Scramble', 'NarrowOverNarrow', 'TimePressureLeak']
};

// ==================== UTILITY FUNCTIONS ====================
export const V3_UTILS = {
  // Compute softmax for face priors
  softmax(values: number[]): number[] {
    const maxVal = Math.max(...values);
    const expValues = values.map(v => Math.exp(v - maxVal));
    const sumExp = expValues.reduce((sum, val) => sum + val, 0);
    return expValues.map(val => val / sumExp);
  },
  
  // Get top 2 indices by score
  getTop2Indices(scores: number[]): [number, number] {
    const indexed = scores.map((score, index) => ({ score, index }));
    indexed.sort((a, b) => b.score - a.score);
    return [indexed[0].index, indexed[1].index];
  },
  
  // Check if early commit is possible
  canEarlyCommit(scores: number[], threshold: number): boolean {
    const [top, second] = V3_UTILS.getTop2Indices(scores);
    return scores[top] - scores[second] >= threshold;
  },

  // Calculate normalized margin between top two scores (0..1)
  calculateMargin(winnerScore: number, secondScore: number): number {
    const numerator = Math.max(0, winnerScore - secondScore);
    const denominator = Math.max(1e-9, winnerScore + secondScore);
    const margin = numerator / denominator;
    return Math.max(0, Math.min(1, margin));
  },

  // Early C stop eligibility helper
  isEarlyCStopEligible(
    winner: Verdict | null,
    margin: number,
    instabilityFlag: boolean,
    fhExpo: number
  ): boolean {
    return (
      winner === 'C' &&
      margin >= V3_AMBIGUITY.BANDS.VERY_CLEAR &&
      !instabilityFlag &&
      fhExpo >= 3
    );
  }
};
