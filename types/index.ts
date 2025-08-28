export interface Session {
  id: string
  user_id: string
  archetype: string
  history: any[]
  depth_score: number
  ritual_completed: boolean
  created_at: string
  updated_at: string
}

export interface QuizOption {
  text: string
  weights: Record<string, number>
  trigger: string
}

export interface QuizQuestion {
  question: string
  options: QuizOption[]
}

export interface Archetype {
  id: string
  name: string
  description: string
  missing_truth: string
  ritual_instructions: string
  indirect_questions: string[]
}

// Updated QuizResult to match the new Elastic Archetype Engine
export interface QuizResult {
  finalArchetype: string
  altArchetype?: string
  triggers: string[] // valid (≥3)
  triggerCounts: Record<string, number>
  rIndex: number // 0–100

  flips: number
  dual?: boolean // true if tie-breaker resulted in dual result
  audit?: {
    a1History: string[]
    margins: number[]
    top3History: Array<{ a1: string; a2: string; a3: string; marginPct: number }>
  }
  // Legacy fields for backward compatibility
  archetype: string
  score: number
  answers: Array<{
    questionId: number
    selectedOption: number
    responseTime: number
    trigger: string
  }>
}

// New types for the Elastic Archetype Engine
export type ArchetypeType = 
  | "Sovereign" | "Visionary" | "Rebel" | "Equalizer" 
  | "Provider" | "Wanderer" | "Seeker" | "Mask" 
  | "Partner" | "Guardian" | "Servant" | "Spotlight";

export type TriggerType = 
  | "Control" | "Rejection" | "Shame" | "Overwhelm" 
  | "Neglect" | "Uncertainty" | "Invisibility";

export type RWeight = 0 | 1 | 2 | 3;

export interface AWeight {
  primary: ArchetypeType;
  secondary: ArchetypeType;
  p: number;
  s: number;
}

export interface PhaseAOption {
  id: string;
  label: string;
  weights: AWeight;
  triggerHint?: TriggerType;
  rWeight?: RWeight;
}

export interface PhaseAItem {
  id: string;
  prompt: string;
  options: PhaseAOption[];
}

export interface PureA1Option {
  id: string;
  labelTemplate: string;
  trigger: TriggerType;
  rWeight: RWeight;
}

export interface MixedOption {
  id: string;
  labelTemplate: string;
  weights: AWeight;
}

export interface PhaseBTemplate {
  id: string;
  promptTemplate: string;
  pureA1: PureA1Option[];
  mixed: MixedOption[];
  underClock?: boolean;
}

export interface ScoringKnobs {
  decayLambda: number;
  stableMarginPct: number;
  stableNeededConsecutive: number;
  flipOvertake2Q: number;
  flipSingleAfterQ: { qMin: number; marginPct: number };
  maxFlips: number;
  lateOverride: { qStart: number; qEnd: number; multiplier: number };
  rIndexWeights: { choices: number; behavior: number; underClock: number };
  routeThreshold: number;
}

export interface TelemetryRules {
  cleanStrikeMs: number;
  hesitationMs: number;
  maxSwitchesClean: number;
  hesitationSwitches: number;
  hoverRefsMs: number;
  behaviorScoring: { clean: number; hesitation: number; hoverPenalty: number };
}

export interface QuizConfig {
  archetypes: ArchetypeType[];
  triggers: TriggerType[];
  scoring: ScoringKnobs;
  telemetry: TelemetryRules;
  phaseA: PhaseAItem[];
  phaseB: PhaseBTemplate[];
}

// Quiz engine types
export type QuizStep =
  | { phase: "A"; item: PhaseAItem }
  | { phase: "B"; itemId: string; prompt: string; options: RenderedOption[]; underClock?: boolean };

export type RenderedOption = {
  id: string;
  label: string;
  // Archetype weights; for Phase B pure A1 we resolve at runtime
  weights: { primary: ArchetypeType; secondary: ArchetypeType | null; p: number; s: number };
  // Only for PURE A1 options (choices that contribute to trigger + RIndex)
  trigger?: TriggerType;
  rWeight?: RWeight;
  // For UI/telemetry
  meta?: { pureA1?: boolean; pureA2?: boolean; mixed?: boolean };
};

export interface ChamberResponse {
  questionId: string
  answer: string
  responseTime: number
  emotionalKeywords: string[]
}

export interface RitualCompletion {
  ritualId: string
  completed: boolean
  reflection: string
  completedAt?: string
} 