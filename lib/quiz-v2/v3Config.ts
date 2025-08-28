// GroundZero v3 Configuration Constants
// Centralized configuration for all v3 features

import { Line, Face } from '../../types/quiz-v2';

// ==================== FLOW CONSTANTS ====================
export const V3_FLOW = {
  // Phase progression
  FH_MAX_SCREENS: 9,
  FH_MAX: 9,  // Alias for compatibility
  FH_LOCK_MIN_SCREEN: 2,
  
  // Face selection weights (heavy front-loading)
  FACE_WEIGHTS: {
    LAMBDA_PRIOR: 2.0,    // prior influence from FH
    W_TRIAD: 3.0,         // Q1 (Triad) evidence
    W_DUEL1: 4.0,         // Q2 (First Duel) evidence
    W_DUEL2: 1.0,         // Q3 (Final Duel) evidence (only if needed)
    THETA_EARLY: 3.0      // margin to commit after Q2
  },
  
  // Early commit threshold
  FACE_EARLY_COMMIT_MARGIN: 3.0
};

// ==================== EVIDENCE CONSTANTS ====================
export const V3_EVIDENCE = {
  // FH exposure weights for token decay
  FH_EXPOSURE_WEIGHTS: {
    DECAY_LAMBDA: 0.92,
    MIN_EXPOSURE: 1,
    MAX_EXPOSURE: 9
  },
  
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
  STRESS: ['wanderer', 'diplomat']
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

// ==================== SPECIAL OVERRIDE CONSTANTS ====================
export const V3_SPECIAL_OVERRIDE = {
  // 2C+1F→O override (P3 tokens only)
  TWO_C_ONE_F_TO_O: {
    C_THRESHOLD: 2,
    F_THRESHOLD: 1,
    RESULT: 'O' as const
  }
};

// ==================== CONFIDENCE CONSTANTS ====================
export const V3_CONFIDENCE = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
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
  }
};
