// Quiz V2 Type Definitions

// ==================== CORE TYPES ====================
export type QuizPhase = 'FH' | 'FH_DUEL' | 'F_TRIAD' | 'F_DUEL' | 'LINES' | 'DONE';

export type Line = 'Control' | 'Pace' | 'Boundary' | 'Truth' | 'Recognition' | 'Bonding' | 'Stress';

export type Face = 
  | 'sovereign' | 'rebel' | 'catalyst'      // Control
  | 'strategist' | 'navigator' | 'visionary' // Pace
  | 'sentinel' | 'equalizer' | 'guardian'    // Boundary
  | 'seeker' | 'architect' | 'alchemist'     // Truth
  | 'spotlight' | 'mask' | 'artisan'         // Recognition
  | 'provider' | 'partner' | 'servant'       // Bonding
  | 'diplomat' | 'wanderer' | 'catalyst';   // Stress

export type Verdict = 'C' | 'O' | 'F';

// ==================== DATA STRUCTURES ====================
export interface QuizSession {
  id: string;
  sessionSecret?: string;
  currentPhase: QuizPhase;
  phaseData: Record<string, any>;
  startedAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface FamilyHoneData {
  hits: Record<Line, number>;
  expo: Record<Line, number>;
  L1: Line;
  L2: Line;
  prevL1?: Line;
  prevL2?: Line;
  screen: number;
  seenIds: string[];
  lock?: Line;
  duelPair?: { a: Line; b: Line };
  lastFillers?: Line[]; // Track the last filler trio to avoid repetition
  
  // V3: FH Token Engine
  fh_tokens: Record<Line, Array<{verdict: Verdict, weight: number, is_seed: boolean}>>;
  fh_f_risk: Record<Line, boolean>;     // F-risk detection for lines with expo≥2 and hits=0
  fh_instability: Record<Line, boolean>; // Instability tracking for unstable FH picks
  fh_lock_screen?: number;              // Which screen family was locked (must be ≥2)
  fh_runnerUp?: Line;                   // Runner-up from FH phase
  
  // V3: Telemetry tracking
  telemetry: FHTelemetryData;
  lineOrder: Line[];                     // Track the order lines were presented
  hoverData: Record<Line, number>;       // Track hover/dwell time per line
  switchData: Record<Line, number>;      // Track switching/revisits per line
}

export interface FaceData {
  line: Line | null;
  trio: [Face, Face, Face] | null;
  triadPick: Face | null;
  challenger: Face | null;
  winner?: Face;
  score: { pick1: number; challenger: number };
  tiebreak: boolean;
  
  // V3.1: FH→Face Heavy-Weight additions
  face_prior?: number[];           // [3] probabilities across the 3 faces
  face_score?: number[];           // [3] running tally used only inside Face
  face_weights?: {                 // weights used for scoring
    lambda_prior: number;
    w_triad: number;
    w_duel1: number;
    w_duel2: number;
    theta_early: number;
  };
  face_commit_stage?: 'after_duel' | 'after_final';  // when decision was made
  face_score_history?: Array<{     // per-question score tracking
    question: string;
    score_delta: number;
    score_after: number[];
    picked_face: Face;
  }>;
}

export interface LinesData {
  tokens: Record<Line, Verdict[]>;
  verdicts: Record<Line, Verdict | null>;
  confidence: Record<Line, 'high' | 'low' | 'face-lock' | null>;
  baseSeen: Record<Line, number>;
  needTB: Record<Line, boolean>;
  tbSeen: Record<Line, number>;
  
  // V3: Adaptive logic
  adaptiveOrder: Line[];                 // Order to assess lines (by uncertainty)
  allocatedSlots: Record<Line, number>;  // How many base slots allocated to each line
  remainingSlots: number;                // Total remaining base slots
  fhBridge: FHBridge | null;            // Bridge data from FH phase
  config: AdaptiveLinesConfig;           // Configuration for adaptive behavior
}

// ==================== QUESTION TYPES ====================
export interface QuizQuestion {
  id: string;
  stage: string;
  prompt: string;
  options: QuizOption[];
  meta?: Record<string, any>;
}

export interface QuizOption {
  id: string;
  label: string;
  family?: string; // Changed from Line to string to match actual data
  face?: string;   // Changed from Face to string to match actual data
  verdict?: string; // Changed from Verdict to string to match actual data
}

// ==================== RESULT TYPES ====================
export interface QuizResult {
  finalArchetype: {
    line: Line;
    name: Face;
  };
  profileCode: string; // 7-character C/O/F string
  lineVerdicts: Record<Line, Verdict | null>;
  confidence: Record<Line, 'high' | 'low' | 'face-lock' | null>;
  familyHoneData: FamilyHoneData;
  faceSelectionData: FaceData;
  linesAssessmentData: LinesData;
  totalQuestions: number;
  completionTimeMs: number;
}

// ==================== QUESTION BANK TYPES ====================
export interface QuizBankItem {
  id: string;
  prompt: string;
  options: QuizBankOption[];
}

export interface QuizBankOption {
  id: string;
  label: string;
  family?: string; // Changed from Line to string to match actual data
  face?: string;   // Changed from Face to string to match actual data
  verdict?: string; // Changed from Verdict to string to match actual data
}

export interface QuizBank {
  version: string;
  families: string[];
  items: QuizBankItem[];
}

// ==================== API TYPES ====================
export interface StartQuizRequest {
  sessionSecret?: string;
}

export interface StartQuizResponse {
  success: boolean;
  sessionId: string;
  currentPhase: QuizPhase;
  question: QuizQuestion | null;
  error?: string;
}

export interface AnswerRequest {
  sessionId: string;
  answer: string;
  metadata?: Record<string, any>;
}

export interface AnswerResponse {
  success: boolean;
  completed: boolean;
  nextPhase?: QuizPhase;
  nextQuestion?: QuizQuestion;
  results?: QuizResult;
  error?: string;
}

export interface SessionStatusResponse {
  success: boolean;
  sessionId: string;
  currentPhase: QuizPhase;
  progress: {
    fhScreen: number;
    lockedFamily?: Line;
    lockedFace?: Face;
    linesCompleted: number;
    totalLines: number;
  };
  error?: string;
}

// ==================== DIAGNOSTICS TYPES ====================
export interface DiagnosticsRequest {
  line: Line;
  face?: Face;
  profileCode?: string;
}

export interface DiagnosticsResponse {
  success: boolean;
  content: {
    title: string;
    description: string;
    insights: string[];
    recommendations: string[];
  };
  fallbackLevel: 'exact' | 'face' | 'line' | 'global';
  error?: string;
}

// ==================== TELEMETRY TYPES ====================
export interface TelemetryEvent {
  sessionId: string;
  questionId: string;
  phase: QuizPhase;
  answer: string;
  responseTimeMs: number;
  metadata?: Record<string, any>;
  timestamp: string;
}

// ==================== UTILITY TYPES ====================
export type LineCode = 'CTL' | 'PAC' | 'BND' | 'TRU' | 'REC' | 'BON' | 'STR';

export interface QuestionMapping {
  fh: string[];
  faceTriads: Record<Line, string>;
  faceDuels: Record<Line, Record<string, string>>;
  lines: Record<Line, { base: string[]; tiebreakers: string[] }>;
}

// ==================== V3 BEHAVIOR TRACKING TYPES ====================
export interface BehaviorSample {
  latency_ms: number;                    // Display → commit latency
  switches: number;                      // Option changes before final selection
  deliberation_ms: number;               // Hover dwell on desktop; read→submit gap on mobile
  under_clock_hit: boolean;              // Whether this was an under-clock probe
  unstable_item: boolean;                // Whether this item meets instability thresholds
}

export interface InstabilityFlags {
  latency_unstable: boolean;             // Latency ≥ 6000ms
  switches_unstable: boolean;            // Switches ≥ 2
  deliberation_unstable: boolean;        // Deliberation ≥ 2500ms
}

export interface FHTelemetryData {
  attraction: Record<Line, number>;      // Relative interest from FH (hits ratio + near-miss signals)
  conviction: Record<Line, number>;      // Average conviction when line was involved
  stability: Record<Line, number>;       // Opinion stability (switching, revisits)
  leaderRank: Record<Line, number>;      // How close line got to L1/L2 (rank + hit gap)
  msfContext: Record<Line, boolean>;     // Whether line met MSF floor during FH (if L1/L2)
}

export interface FHBridge {
  uncertainty: Record<Line, number>;     // U(line) ∈ [0,1] - uncertainty score per line
  attraction: Record<Line, number>;      // Attraction signals
  conviction: Record<Line, number>;      // Conviction signals  
  expo: Record<Line, number>;            // Exposure count
  leaderRank: Record<Line, number>;      // Leader proximity
  telemetry: FHTelemetryData;           // Raw telemetry data
}

export interface AdaptiveLinesConfig {
  mode: 'strict' | 'flexible';           // Mode A or Mode B
  totalBaseSlots: number;                // Total base questions available (12 for v2 compatibility)
  minBasePerLine: number;                // Minimum base questions per line
  maxBasePerLine: number;                // Maximum base questions per line
  enableLineDuels: boolean;              // Whether to use LD-* questions as TBs
  globalCap: number;                     // Maximum total questions in Lines phase
}
