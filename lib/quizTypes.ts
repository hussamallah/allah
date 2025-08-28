// Ground Zero — Quiz Types 2.1 (Elastic Archetype Engine)
// Shared type definitions for the quiz system

// ===================== CORE TYPES =====================
export type Archetype =
  | "Sovereign" | "Visionary" | "Rebel" | "Equalizer" | "Provider" | "Wanderer"
  | "Seeker" | "Mask" | "Partner" | "Guardian" | "Servant" | "Spotlight";

export type Trigger =
  | "Control" | "Rejection" | "Shame" | "Overwhelm" | "Neglect" | "Uncertainty" | "Invisibility";

export type RWeight = 0 | 1 | 2 | 3; // reception intensity for choices (not behavior)

// ===================== WEIGHTING & SCORING =====================
export interface AWeight { 
  primary: Archetype; 
  secondary: Archetype; 
  p: number; 
  s: number; 
} // p=0.75, s=0.25

export interface ScoringKnobs {
  decayLambda: number;             // 0.92
  stableMarginPct: number;         // 6
  stableNeededConsecutive: number; // 2
  flipOvertake2Q: number;          // 6
  flipSingleAfterQ: { qMin: number; marginPct: number }; // {qMin: 8, marginPct: 10}
  maxFlips: number;                // 2
  lateOverride: { qStart: number; qEnd: number; multiplier: number }; // {12,14,1.25}
  rIndexWeights: { choices: number; behavior: number; underClock: number }; // 0.60/0.25/0.15
  routeThreshold: number;          // 50 (threshold for advanced features)
}

export interface TelemetryRules {
  cleanStrikeMs: number;           // ≤2000ms
  hesitationMs: number;            // ≥6000ms
  maxSwitchesClean: number;        // 0
  hesitationSwitches: number;      // ≥2
  hoverRefsMs: number;             // ≥2500ms
  behaviorScoring: { clean: number; hesitation: number; hoverPenalty: number }; // +1/-1/-0.5
}

// ===================== QUESTION STRUCTURES =====================
export interface PhaseAOption {
  id: string;
  label: string;
  weights: AWeight;          // fixed 0.75/0.25 archetype scoring
  triggerHint?: Trigger;     // optional soft hint (does NOT count to trigger)
  rWeight?: RWeight;         // optional low-signal reception weight (0–1)
}

export interface PhaseAItem {
  id: string;
  prompt: string;
  options: PhaseAOption[];   // 6 options, each maps to 0.75/0.25 pair
}

export interface PureA1Option { // Phase B pure A1 option
  id: string;
  label: string;             // behavioral, no archetype names
  trigger: Trigger;
  rWeight: RWeight;          // 1,2,3
}

export interface MixedOption {  // Phase B mixed A1/A2 option
  id: string;
  label: string;             // behavioral
  weights: { primary: "__A1__" | "__A2__"; secondary: "__A1__" | "__A2__"; p: 0.75; s: 0.25 };
}

export interface PhaseBTemplate {
  id: string;
  prompt: string;            // situation-first, neutral copy
  pureA1: PureA1Option[];    // exactly 3
  mixed: MixedOption[];      // exactly 2
  underClock?: boolean;      // collect timed-closure probe data
}

// ===================== ENGINE STATE & RENDERING =====================
export type QuizStep =
  | { phase: "A"; item: PhaseAItem }
  | { phase: "B"; itemId: string; prompt: string; options: RenderedOption[]; underClock?: boolean };

export type RenderedOption = {
  id: string;
  label: string;
  // Archetype weights; for Phase B pure A1 we resolve at runtime
  weights: { primary: Archetype; secondary: Archetype | null; p: number; s: number };
  // Only for PURE A1 options (choices that contribute to trigger + RIndex)
  trigger?: Trigger;
  rWeight?: RWeight;
  // For UI/telemetry
  meta?: { pureA1?: boolean; pureA2?: boolean; mixed?: boolean };
};

export type BehaviorSample = {
  latencyMs: number;
  switches: number;
  hoverRefsMs: number;
  underClockHit: boolean;
};

// ===================== RESULTS & OUTPUT =====================
export interface QuizResult {
  finalArchetype: Archetype;
  altArchetype?: Archetype;
  triggers: Trigger[]; // valid (≥3)
  triggerCounts: Record<Trigger, number>;
  rIndex: number; // 0–100
  flips: number;
  dual?: boolean; // true if tie-breaker resulted in dual result
  audit?: {
    a1History: Archetype[];
    margins: number[];
    top3History: Array<{ a1: Archetype; a2: Archetype; a3: Archetype; marginPct: number }>;
  };
}

export interface QuizConfig {
  archetypes: Archetype[];
  triggers: Trigger[];
  scoring: ScoringKnobs;
  telemetry: TelemetryRules;
  phaseA: PhaseAItem[];            // Q1–Q7 fixed bank
  phaseB: PhaseBTemplate[];        // Q8–Q15 dynamic templates
}
