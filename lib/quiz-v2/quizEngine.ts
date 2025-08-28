import { QuizPhase, Line, Face, Verdict, QuizSession, FamilyHoneData, FaceData, LinesData, QuizQuestion, QuizResult, BehaviorSample } from '../../types/quiz-v2';
import { V3_CONFIG, V3_FLOW, V3_UTILS } from './v3Config';
import { contentIDManager } from './contentMapping';
import { questionBankManager } from './questionBank';
import FHTokenEngine from './fhTokenEngine';
import FHBridge from './fhBridge';
import P3Scheduler from './p3Scheduler';
import BehaviorTracker from './behaviorTracker';
import AdvancedStopRules from './advancedStopRules';
import DrilldownEngine from './drilldownEngine';
import EdgeCaseHandler from './edgeCaseHandler';
import QAInstrumentation from './qaInstrumentation';

/**
 * QuizEngineV2 - Core engine implementing the 3-phase quiz logic
 * FH → FACE → LINES with exact algorithms from specification
 */
export class QuizEngineV2 {
  private session: QuizSession;
  private currentPhase: QuizPhase = 'FH';
  private fhData: FamilyHoneData;
  private faceData: FaceData;
  private linesData: LinesData;
  private questionBank: any; // Will be properly typed when questionBank is created

  constructor() {
    this.session = this.initializeSession();
    this.fhData = this.initializeFHData();
    this.faceData = this.initializeFaceData();
    this.linesData = this.initializeLinesData();
    
    // Initialize V3 components
    this.fhTokenEngine = new FHTokenEngine();
    this.fhBridge = new FHBridge();
    this.p3Scheduler = new P3Scheduler();
    this.behaviorTracker = new BehaviorTracker();
    this.advancedStopRules = new AdvancedStopRules();
    this.drilldownEngine = new DrilldownEngine();
    this.edgeCaseHandler = new EdgeCaseHandler();
    this.qaInstrumentation = new QAInstrumentation();
  }

  // ==================== SESSION MANAGEMENT ====================
  private initializeSession(): QuizSession {
    return {
      id: `sess_${Math.random().toString(36).slice(2)}`,
      sessionSecret: `sess_${Math.random().toString(36).slice(2)}_${Date.now()}`,
      currentPhase: 'FH',
      phaseData: {},
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  private initializeFHData(): FamilyHoneData {
    return {
      hits: { Control: 0, Pace: 0, Boundary: 0, Truth: 0, Recognition: 0, Bonding: 0, Stress: 0 },
      expo: { Control: 0, Pace: 0, Boundary: 0, Truth: 0, Recognition: 0, Bonding: 0, Stress: 0 },
      L1: 'Control',
      L2: 'Pace',
      prevL1: 'Control',
      prevL2: 'Pace',
      screen: 0,
      seenIds: [],
      lock: undefined,
      lastFillers: [], // Initialize empty for Q0
      
      // V3: FH Token Engine
      fh_tokens: { Control: [], Pace: [], Boundary: [], Truth: [], Recognition: [], Bonding: [], Stress: [] },
      fh_f_risk: { Control: false, Pace: false, Boundary: false, Truth: false, Recognition: false, Bonding: false, Stress: false },
      fh_instability: { Control: false, Pace: false, Boundary: false, Truth: false, Recognition: false, Bonding: false, Stress: false },
      fh_lock_screen: undefined,
      fh_runnerUp: undefined,
      
      // V3: Telemetry tracking
      telemetry: {
        attraction: { Control: 0, Pace: 0, Boundary: 0, Truth: 0, Recognition: 0, Bonding: 0, Stress: 0 },
        conviction: { Control: 0, Pace: 0, Boundary: 0, Truth: 0, Recognition: 0, Bonding: 0, Stress: 0 },
        stability: { Control: 0, Pace: 0, Boundary: 0, Truth: 0, Recognition: 0, Bonding: 0, Stress: 0 },
        leaderRank: { Control: 0, Pace: 0, Boundary: 0, Truth: 0, Recognition: 0, Bonding: 0, Stress: 0 },
        msfContext: { Control: false, Pace: false, Boundary: false, Truth: false, Recognition: false, Bonding: false, Stress: false }
      },
      lineOrder: [],
      hoverData: { Control: 0, Pace: 0, Boundary: 0, Truth: 0, Recognition: 0, Bonding: 0, Stress: 0 },
      switchData: { Control: 0, Pace: 0, Boundary: 0, Truth: 0, Recognition: 0, Bonding: 0, Stress: 0 }
    };
  }

  private initializeFaceData(): FaceData {
    return {
      line: null,
      trio: null,
      triadPick: null,
      challenger: null,
      score: { pick1: 0, challenger: 0 },
      tiebreak: false
    };
  }

  private initializeLinesData(): LinesData {
    return {
      tokens: { Control: [], Pace: [], Boundary: [], Truth: [], Recognition: [], Bonding: [], Stress: [] },
      verdicts: { Control: null, Pace: null, Boundary: null, Truth: null, Recognition: null, Bonding: null, Stress: null },
      confidence: { Control: null, Pace: null, Boundary: null, Truth: null, Recognition: null, Bonding: null, Stress: null },
      baseSeen: { Control: 0, Pace: 0, Boundary: 0, Truth: 0, Recognition: 0, Bonding: 0, Stress: 0 },
      needTB: { Control: false, Pace: false, Boundary: false, Truth: false, Recognition: false, Bonding: false, Stress: false },
      tbSeen: { Control: 0, Pace: 0, Boundary: 0, Truth: 0, Recognition: 0, Bonding: 0, Stress: 0 },
      
      // V3: Adaptive logic
      adaptiveOrder: [] as Line[],
      allocatedSlots: { Control: 0, Pace: 0, Boundary: 0, Truth: 0, Recognition: 0, Bonding: 0, Stress: 0 },
      remainingSlots: 0,
      fhBridge: null as any, // Will be initialized by FHBridge
      config: {
        mode: 'strict' as const,
        totalBaseSlots: 12,
        minBasePerLine: 2,
        maxBasePerLine: 2,
        enableLineDuels: true,
        globalCap: 20
      }
    };
  }

  // ==================== PHASE STATE MACHINE ====================
  getCurrentPhase(): QuizPhase {
    return this.currentPhase;
  }

  getSession(): QuizSession {
    return this.session;
  }

  // ==================== FAMILY HONE LOGIC ====================
  
  /**
   * Check if a line meets strong threshold criteria
   * GroundZero v3: 2/2, 3/4, 4/5-7, 5/8-10
   * Note: 3/3 cannot occur due to 2/2 instant lock
   */
  private isLineStrong(line: Line): boolean {
    const hits = this.fhData.hits[line];
    const expo = this.fhData.expo[line];
    
    // GroundZero v3 strong ladder implementation
    if (expo === 2 && hits >= 2) return true;  // 2/2 - Clean Direct
    if (expo === 4 && hits >= 3) return true;  // 3/4 - Strong rung
    if (expo >= 5 && expo <= 7 && hits >= 4) return true;  // 4/5-7
    if (expo >= 8 && expo <= 10 && hits >= 5) return true; // 5/8-10
    
    return false;
  }

  /**
   * Check if any line is strong
   */
  private hasStrongLine(): boolean {
    const lines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    return lines.some(line => this.isLineStrong(line));
  }

  /**
   * Check if duel should be triggered
   * MSF + exposure parity + closeness + no clean direct
   */
  private shouldTriggerDuel(): boolean {
    const { L1, L2 } = this.fhData;
    const e1 = this.fhData.expo[L1];
    const h1 = this.fhData.hits[L1];
    const e2 = this.fhData.expo[L2];
    const h2 = this.fhData.hits[L2];

    console.log(`⚔️ Checking duel trigger: L1(${L1}): ${h1}/${e1}, L2(${L2}): ${h2}/${e2}`);

    // Check Mutual Support Floor (MSF)
    if (!this.meetsMSF(e1, h1) || !this.meetsMSF(e2, h2)) {
      console.log(`📊 Duel conditions: L1(${this.fhData.L1}): ${h1}/${e1} MSF=${this.meetsMSF(e1, h1)}, L2(${this.fhData.L2}): ${h2}/${e2} MSF=${this.meetsMSF(e2, h2)}`);
      console.log(`⏳ Continuing Family Hone - building signal for accurate assessment`);
      return false;
    }
    
    // Exposure parity (≤1 gap)
    if (Math.abs(e1 - e2) > 1) {
      console.log(`📊 Exposure gap: ${Math.abs(e1 - e2)} (need ≤1) - rebalancing exposure`);
      return false;
    }
    
    // Closeness (≤1 gap in hits)
    if (Math.abs(h1 - h2) > 1) {
      console.log(`📊 Hits gap: ${Math.abs(h1 - h2)} (need ≤1) - building closer competition`);
      return false;
    }
    
    console.log(`✅ Duel trigger conditions met!`);
    return true;
  }

  /**
   * Check if line meets MSF requirements
   */
  private meetsMSF(expo: number, hits: number): boolean {
    if (expo <= 3) return hits >= 2;
    if (expo <= 5) return hits >= 3;
    if (expo <= 7) return hits >= 4;
    if (expo <= 10) return hits >= 5;
    return false;
  }

  /**
   * Public method to check MSF status for a line (for UI logging)
   */
  public checkMSF(line: Line): boolean {
    const expo = this.fhData.expo[line] || 0;
    const hits = this.fhData.hits[line] || 0;
    return this.meetsMSF(expo, hits);
  }

  /**
   * Update L1/L2 rankings with stickiness
   */
  private updateL1L2(newPick: Line): void {
    const { hits, prevL1, prevL2 } = this.fhData;
    const newHits = { ...hits };
    newHits[newPick] = (newHits[newPick] || 0) + 1;
    
    // Sort by hits, then by stickiness
    const sorted = Object.entries(newHits).sort(([, a], [, b]) => {
      if (b !== a) return b - a;
      // Stickiness: keep previous L1/L2 if tied
      if (a === prevL1) return -1;
      if (b === prevL1) return 1;
      if (a === prevL2) return -1;
      if (b === prevL2) return 1;
      // Most recent pick breaks final ties
      if (a === newPick) return -1;
      if (b === newPick) return 1;
      return 0;
    });
    
    this.fhData.L1 = sorted[0][0] as Line;
    this.fhData.L2 = sorted[1][0] as Line;
    this.fhData.prevL1 = prevL1;
    this.fhData.prevL2 = prevL2;
  }

  /**
   * Handle Family Hone answer
   */
  handleFHAnswer(line: Line): QuizPhase | QuizResult {
    // Update exposure for all shown options
    const currentOptions = this.getCurrentFHOptions();
    currentOptions.forEach(opt => {
      this.fhData.expo[opt] = (this.fhData.expo[opt] || 0) + 1;
    });
    
    // Update hits for selected line
    this.fhData.hits[line] = (this.fhData.hits[line] || 0) + 1;
    
    // V3: Emit FH token using behavior analysis
    const behavior: BehaviorSample = {
      latency_ms: 0, // TODO: Capture actual behavior
      switches: 0,   // TODO: Capture actual behavior
      deliberation_ms: 0, // TODO: Capture actual behavior
      under_clock_hit: false,
      unstable_item: false
    };
    
    const verdict = this.fhTokenEngine.emitToken(line, behavior);
    
    // Store token in FH data
    if (!this.fhData.fh_tokens[line]) {
      this.fhData.fh_tokens[line] = [];
    }
    
    const token = {
      verdict,
      weight: this.fhTokenEngine.calculateFExpoWeight(this.fhData.expo[line]),
      is_seed: true
    };
    
    this.fhData.fh_tokens[line].push(token);
    
    // Update L1/L2 rankings
    this.updateL1L2(line);
    
    // Debug logging
    console.log(`🎯 FH Answer - Line: ${line}, Screen: ${this.fhData.screen + 1}`);
    console.log(`📊 Hits:`, this.fhData.hits);
    console.log(`📊 Expo:`, this.fhData.expo);
    console.log(`🏆 L1: ${this.fhData.L1}, L2: ${this.fhData.L2}`);
    console.log(`🎯 V3 Token: ${verdict} (weight: ${token.weight})`);
    
    // Check for strong threshold
    if (this.isLineStrong(line)) {
      console.log(`💪 Line ${line} is STRONG - locking family`);
      return this.lockFamily(line);
    }
    
    // Check for duel trigger
    if (this.shouldTriggerDuel()) {
      console.log(`⚔️ Duel triggered between ${this.fhData.L1} and ${this.fhData.L2}`);
      this.currentPhase = 'FH_DUEL';
      this.fhData.duelPair = { a: this.fhData.L1, b: this.fhData.L2 };
      return 'FH_DUEL';
    }
    
    // Check if we should cap (any strong or max screens)
    // Require at least 3 screens before allowing family lock
    if ((this.hasStrongLine() || this.fhData.screen >= 8) && this.fhData.screen >= 3) {
      console.log(`🔒 Capping FH phase - locking ${this.fhData.L1}`);
      return this.lockFamily(this.fhData.L1);
    }
    
    // Track the last fillers shown for the deterministic cycle
    const currentFillers = this.getCurrentFHOptions().filter(line => line !== this.fhData.L1 && line !== this.fhData.L2);
    this.fhData.lastFillers = currentFillers;
    
    // Continue FH phase
    this.fhData.screen++;
    this.currentPhase = 'FH';
    console.log(`🔄 Continuing FH phase - next screen: ${this.fhData.screen}`);
    console.log(`📊 Last fillers tracked: [${currentFillers.join(', ')}]`);
    return 'FH';
  }

  /**
   * Handle Family Hone Duel result
   */
  handleFHDuel(selectedLine: Line): QuizPhase {
    if (!this.fhData.duelPair) {
      throw new Error('FH Duel not properly initialized');
    }
    
    console.log(`⚔️ FH Duel Result - Selected: ${selectedLine}`);
    
    // Lock the selected family and move to Face phase
    return this.lockFamily(selectedLine);
  }

  /**
   * Lock family and move to Face phase
   */
  private lockFamily(line: Line): QuizPhase {
    // V3: Set lock screen and runner-up
    this.fhData.fh_lock_screen = this.fhData.screen + 1;
    this.fhData.fh_runnerUp = this.fhData.L2;
    
    // V3: Calculate F-risk and instability flags for all lines
    const fRiskFlags = this.fhTokenEngine.getFRiskFlags();
    const instabilityFlags = this.fhTokenEngine.getInstabilityFlags();
    
    // Update FH data with flags
    Object.entries(fRiskFlags).forEach(([line, flag]) => {
      this.fhData.fh_f_risk[line as Line] = flag;
    });
    
    Object.entries(instabilityFlags).forEach(([line, flag]) => {
      this.fhData.fh_instability[line as Line] = flag;
    });
    
    this.fhData.lock = line;
    this.currentPhase = 'F_TRIAD';
    this.faceData.line = line;
    this.faceData.trio = this.getFaceTrio(line);
    
    // Ensure we have valid face data before proceeding
    if (!this.faceData.trio) {
      throw new Error(`Failed to get face trio for line: ${line}`);
    }
    
    console.log(`🔒 V3 Family Lock: ${line} at screen ${this.fhData.fh_lock_screen}`);
    console.log(`📊 F-risk flags:`, fRiskFlags);
    console.log(`📊 Instability flags:`, instabilityFlags);
    
    return 'F_TRIAD';
  }

  /**
   * Get face trio for a family (private implementation)
   */
  private getFaceTrioPrivate(line: Line): [Face, Face, Face] {
    const faceMap: Record<Line, [Face, Face, Face]> = {
      Control: ['sovereign', 'rebel', 'catalyst'],
      Pace: ['strategist', 'navigator', 'visionary'],
      Boundary: ['sentinel', 'equalizer', 'guardian'],
      Truth: ['seeker', 'architect', 'alchemist'],
      Recognition: ['spotlight', 'mask', 'artisan'],
      Bonding: ['provider', 'partner', 'servant'],
      Stress: ['diplomat', 'wanderer', 'catalyst']
    };
    return faceMap[line];
  }

  // ==================== FACE SELECTION LOGIC ====================
  
  /**
   * Handle Face Triad selection
   */
  handleFaceTriad(slot: 0 | 1 | 2): QuizPhase {
    if (!this.faceData.trio) throw new Error('No face trio available');
    
    const f1 = this.faceData.trio[slot];
    const challenger = slot === 0 ? this.faceData.trio[1] : slot === 1 ? this.faceData.trio[0] : this.faceData.trio[1];
    
    this.faceData.triadPick = f1;
    this.faceData.challenger = challenger;
    this.currentPhase = 'F_DUEL';
    
    return 'F_DUEL';
  }

  /**
   * Handle Face Duel selection
   */
  handleFaceDuel(selectedFace: Face): QuizPhase | QuizResult {
    if (!this.faceData.triadPick || !this.faceData.challenger) {
      throw new Error('Face duel not properly initialized');
    }
    
    if (selectedFace === this.faceData.triadPick && !this.faceData.tiebreak) {
      // Winner on first pick
      return this.finishFace(selectedFace);
    } else if (!this.faceData.tiebreak) {
      // First pick for challenger, need tiebreak
      this.faceData.tiebreak = true;
      this.currentPhase = 'F_DUEL'; // Stay in duel phase for tiebreak
      return 'F_DUEL';
    } else {
      // Final pick decides
      return this.finishFace(selectedFace);
    }
  }

  /**
   * Handle Face Tiebreak selection (handled within duel phase)
   */
  handleFaceTiebreak(selectedFace: Face): QuizPhase | QuizResult {
    if (!this.faceData.triadPick || !this.faceData.challenger) {
      throw new Error('Face tiebreak not properly initialized');
    }
    
    // Final pick decides the winner
    return this.finishFace(selectedFace);
  }

  /**
   * Complete face selection and move to Lines
   */
  private finishFace(winner: Face): QuizPhase {
    this.faceData.winner = winner;
    this.currentPhase = 'LINES';
    
    // Set locked family as C with face-lock confidence
    if (this.fhData.lock) {
      this.linesData.verdicts[this.fhData.lock] = 'C';
      this.linesData.confidence[this.fhData.lock] = 'face-lock';
    }
    
    return 'LINES';
  }

  // ==================== LINES ASSESSMENT LOGIC ====================
  
  /**
   * Handle Lines answer
   */
  handleLinesAnswer(line: Line, option: 'A' | 'B' | 'C'): QuizPhase | QuizResult {
    const verdict = this.mapOptionToVerdict(option);
    
    // Add token
    this.linesData.tokens[line].push(verdict);
    
    // Check if we need more questions
    if (this.linesData.tokens[line].length < 2) {
      // Still need base questions
      this.linesData.baseSeen[line]++;
      return 'LINES';
    }
    
    // Check if clear after 2 questions
    if (this.isClearAfterTwo(line)) {
      this.setLineVerdict(line, 'high');
      return this.advanceToNextLine();
    }
    
    // Need tiebreaker
    if (this.linesData.tokens[line].length < 4) {
      this.linesData.needTB[line] = true;
      this.linesData.tbSeen[line]++;
      return 'LINES';
    }
    
    // Final verdict after tiebreaker
    this.setLineVerdict(line, 'low');
    return this.advanceToNextLine();
  }

  /**
   * Map option to verdict (A→C, B→O, C→F)
   */
  private mapOptionToVerdict(option: 'A' | 'B' | 'C'): Verdict {
    const legend: Record<'A' | 'B' | 'C', Verdict> = { A: 'C', B: 'O', C: 'F' };
    return legend[option];
  }

  /**
   * Check if line is clear after 2 questions
   */
  private isClearAfterTwo(line: Line): boolean {
    const tokens = this.linesData.tokens[line];
    if (tokens.length !== 2) return false;
    
    const C = tokens.filter(t => t === 'C').length;
    const O = tokens.filter(t => t === 'O').length;
    const F = tokens.filter(t => t === 'F').length;
    
    return C === 2 || O === 2 || F === 2;
  }

  /**
   * Calculate final verdict for a line
   */
  private calculateLineVerdict(line: Line): Verdict {
    const tokens = this.linesData.tokens[line];
    const C = tokens.filter(t => t === 'C').length;
    const O = tokens.filter(t => t === 'O').length;
    const F = tokens.filter(t => t === 'F').length;
    
    // Special override: 2C + 1F → O
    if (C === 2 && F === 1 && O === 0) return 'O';
    
    // Primary rule: majority wins
    if (F >= O && F >= C) return 'F';
    if (O >= C && O >= F) return 'O';
    return 'C';
  }

  /**
   * Set verdict for a line
   */
  private setLineVerdict(line: Line, confidence: 'high' | 'low'): void {
    this.linesData.verdicts[line] = this.calculateLineVerdict(line);
    this.linesData.confidence[line] = confidence;
  }

  /**
   * Advance to next line or finish
   */
  private advanceToNextLine(): QuizPhase | QuizResult {
    const remainingLines = Object.entries(this.linesData.verdicts)
      .filter(([, verdict]) => verdict === null)
      .map(([line]) => line as Line);
    
    if (remainingLines.length === 0) {
      // All lines assessed
      return this.finalize();
    }
    
    // Continue with next line
    return 'LINES';
  }

  // ==================== FINALIZATION ====================
  
  /**
   * Finalize quiz and return results
   */
  private finalize(): QuizResult {
    const profileCode = this.generateProfileCode();
    
    return {
      finalArchetype: {
        line: this.fhData.lock!,
        name: this.faceData.winner!
      },
      profileCode,
      lineVerdicts: this.linesData.verdicts,
      confidence: this.linesData.confidence,
      familyHoneData: this.fhData,
      faceSelectionData: this.faceData,
      linesAssessmentData: this.linesData,
      totalQuestions: this.calculateTotalQuestions(),
      completionTimeMs: Date.now() - new Date(this.session.startedAt).getTime()
    };
  }

  /**
   * Generate 7-character profile code
   */
  private generateProfileCode(): string {
    const order: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    return order.map(line => this.linesData.verdicts[line] || 'C').join('');
  }

  /**
   * Calculate total questions answered
   */
  private calculateTotalQuestions(): number {
    let total = 0;
    
    // FH questions
    total += this.fhData.screen + 1;
    
    // Face questions
    if (this.faceData.triadPick) total += 1;
    if (this.faceData.challenger) total += 1;
    if (this.faceData.tiebreak) total += 1;
    
    // Lines questions
    Object.values(this.linesData.tokens).forEach(tokens => {
      total += tokens.length;
    });
    
    return total;
  }

  // ==================== UTILITY METHODS ====================
  
  /**
   * Get current screen's GroundZero content ID
   */
  public getCurrentScreenContentID(): string {
    return contentIDManager.getFHContentID(this.fhData.screen);
  }

  /**
   * Get current question from question bank
   */
  public async getCurrentQuestion(): Promise<QuizQuestion> {
    return await questionBankManager.getFHQuestion(this.fhData.screen);
  }

  /**
   * Get current screen number
   */
  public getCurrentScreen(): number {
    return this.fhData.screen;
  }

  /**
   * Get current FH options for question loading
   * Implements GroundZero v3 spec: deterministic filler cycle with smart L3 tiebreaking
   */
  private getCurrentFHOptions(): Line[] {
    if (this.fhData.screen === 0) {
      // Q0: 7 options (all lines once)
      return ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    }
    
    const { L1, L2, expo, screen } = this.fhData;
    
    // Always include current L1 & L2 (2 slots)
    const options: Line[] = [L1, L2];
    
    // Get the two lines that were omitted on the previous screen
    const lastOmitted = this.getLastOmittedLines();
    
    // Get remaining non-leaders not in lastOmitted
    const allLines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    const remainingLines = allLines.filter(line => 
      line !== L1 && line !== L2 && !lastOmitted.includes(line)
    );
    
    // Fillers (3 slots): lastOmitted + 1 smart filler
    const fillers: Line[] = [];
    
    // 1. Include both lines from lastOmitted (prevents double-omission)
    fillers.push(...lastOmitted);
    
    // 2. 5th slot = smart filler using GroundZero v3 algorithm
    if (remainingLines.length > 0) {
      const smartFiller = this.getSmartFiller(remainingLines, lastOmitted);
      fillers.push(smartFiller);
    }
    
    // Ensure we have exactly 5 options (L1 + L2 + 3 fillers)
    const result = [...options, ...fillers];
    
    // Validate exposure gap ≤ 1 among fillers (GroundZero v3 requirement)
    const fillerExpos = fillers.map(line => expo[line] || 0);
    const maxExpo = Math.max(...fillerExpos);
    const minExpo = Math.min(...fillerExpos);
    
    if (maxExpo - minExpo > 1) {
      console.warn(`⚠️ GroundZero v3 violation: Exposure gap > 1: ${maxExpo} - ${minExpo} = ${maxExpo - minExpo}`);
      // Attempt to fix by adjusting smart filler
      this.adjustFillerForExposureGap(fillers, remainingLines);
    }
    
    console.log(`🎯 GroundZero v3 FH Options Screen ${screen}: L1(${L1}) + L2(${L2}) + Fillers(${fillers.join(', ')} = [${result.join(', ')}]`);
    console.log(`📊 Last omitted: [${lastOmitted.join(', ')}], Remaining pool: [${remainingLines.join(', ')}]`);
    console.log(`📈 Exposure gap: ${maxExpo - minExpo} (target: ≤1)`);
    
    return result;
  }

  /**
   * Get the two lines that were omitted on the previous screen
   * Implements the deterministic filler cycle: no one gets dropped twice in a row
   */
  private getLastOmittedLines(): Line[] {
    const { screen, expo } = this.fhData;
    
    if (screen === 1) {
      // Q1: Q0 showed all 7, so no one was omitted
      return [];
    }
    
    // For Q2+: find the two lines with lowest exposure that weren't shown last screen
    const allLines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    
    // Get the options that were shown on the previous screen
    const prevScreenOptions = this.getCurrentFHOptionsForScreen(screen - 1);
    
    // Find lines that weren't shown (omitted)
    const omitted = allLines.filter(line => !prevScreenOptions.includes(line));
    
    // Should always be exactly 2 omitted lines
    if (omitted.length !== 2) {
      console.warn(`⚠️ Expected 2 omitted lines, got ${omitted.length}: [${omitted.join(', ')}]`);
    }
    
    return omitted;
  }

  /**
   * Get smart filler using GroundZero v3 algorithm
   * Prioritizes: lowest exposure → L3 tiebreak → recency → alphabetical
   */
  private getSmartFiller(candidateLines: Line[], currentFillers: Line[]): Line {
    const { expo, hits } = this.fhData;
    
    // Sort by GroundZero v3 priority
    const sortedCandidates = candidateLines.sort((a, b) => {
      const expoA = expo[a] || 0;
      const expoB = expo[b] || 0;
      
      // 1. Primary: Lower exposure first
      if (expoA !== expoB) return expoA - expoB;
      
      // 2. Tiebreak: Prefer L3 (3rd most hits)
      const hitsA = hits[a] || 0;
      const hitsB = hits[b] || 0;
      if (hitsA !== hitsB) return hitsB - hitsA; // Higher hits first (L3 priority)
      
      // 3. Tiebreak: Least recently used (avoid repeated trio)
      const recencyA = this.getLineRecency(a, currentFillers);
      const recencyB = this.getLineRecency(b, currentFillers);
      if (recencyA !== recencyB) return recencyA - recencyB; // Lower recency first
      
      // 4. Final tiebreak: alphabetical
      return a.localeCompare(b);
    });
    
    return sortedCandidates[0];
  }

  /**
   * Get line recency score (lower = more recent)
   */
  private getLineRecency(line: Line, currentFillers: Line[]): number {
    const { screen, seenIds } = this.fhData;
    
    // Check if line was used in current fillers
    if (currentFillers.includes(line)) return 0; // Currently in use
    
    // Check last screen usage
    if (screen > 0) {
      const prevScreenOptions = this.getCurrentFHOptionsForScreen(screen - 1);
      if (prevScreenOptions.includes(line)) return 1; // Used last screen
    }
    
    // Check if line was omitted last screen
    const lastOmitted = this.getLastOmittedLines();
    if (lastOmitted.includes(line)) return 2; // Omitted last screen
    
    // Higher number = less recent
    return 3;
  }

  /**
   * Adjust filler to maintain exposure gap ≤ 1
   */
  private adjustFillerForExposureGap(fillers: Line[], remainingLines: Line[]): void {
    const { expo } = this.fhData;
    
    // Calculate current exposure gap
    const fillerExpos = fillers.map(line => expo[line] || 0);
    const maxExpo = Math.max(...fillerExpos);
    const minExpo = Math.min(...fillerExpos);
    
    if (maxExpo - minExpo <= 1) return; // Already compliant
    
    // Find the filler with highest exposure
    const highExpoFiller = fillers.find(line => (expo[line] || 0) === maxExpo);
    if (!highExpoFiller) return;
    
    // Find alternative with lower exposure
    const alternative = remainingLines.find(line => {
      const lineExpo = expo[line] || 0;
      return lineExpo <= minExpo + 1; // Within gap limit
    });
    
    if (alternative) {
      // Replace high-expo filler with alternative
      const index = fillers.indexOf(highExpoFiller);
      fillers[index] = alternative;
      console.log(`🔄 Adjusted filler: ${highExpoFiller} → ${alternative} to maintain exposure gap ≤ 1`);
    }
  }

  /**
   * Validate exposure gap compliance (GroundZero v3 requirement)
   */
  public validateExposureGapCompliance(): {
    compliant: boolean;
    gap: number;
    violations: Line[];
    recommendations: string[];
  } {
    const { expo, screen } = this.fhData;
    
    if (screen === 0) {
      return { compliant: true, gap: 0, violations: [], recommendations: [] };
    }
    
    const currentOptions = this.getCurrentFHOptions();
    const fillers = currentOptions.filter(line => 
      line !== this.fhData.L1 && line !== this.fhData.L2
    );
    
    if (fillers.length === 0) {
      return { compliant: true, gap: 0, violations: [], recommendations: [] };
    }
    
    const fillerExpos = fillers.map(line => expo[line] || 0);
    const maxExpo = Math.max(...fillerExpos);
    const minExpo = Math.min(...fillerExpos);
    const gap = maxExpo - minExpo;
    
    const compliant = gap <= 1;
    const violations = compliant ? [] : fillers.filter(line => (expo[line] || 0) === maxExpo);
    
    const recommendations: string[] = [];
    if (!compliant) {
      recommendations.push(`Exposure gap ${gap} exceeds GroundZero v3 limit of 1`);
      recommendations.push(`Consider adjusting fillers to reduce gap`);
      recommendations.push(`Current fillers: [${fillers.join(', ')}] with exposures: [${fillerExpos.join(', ')}]`);
    }
    
    return { compliant, gap, violations, recommendations };
  }

  /**
   * Get exposure gap statistics for monitoring
   */
  public getExposureGapStats(): {
    currentGap: number;
    averageGap: number;
    maxGap: number;
    complianceRate: number;
  } {
    const { expo, screen } = this.fhData;
    
    if (screen === 0) {
      return { currentGap: 0, averageGap: 0, maxGap: 0, complianceRate: 1.0 };
    }
    
    const currentOptions = this.getCurrentFHOptions();
    const fillers = currentOptions.filter(line => 
      line !== this.fhData.L1 && line !== this.fhData.L2
    );
    
    if (fillers.length === 0) {
      return { currentGap: 0, averageGap: 0, maxGap: 0, complianceRate: 1.0 };
    }
    
    const fillerExpos = fillers.map(line => expo[line] || 0);
    const currentGap = Math.max(...fillerExpos) - Math.min(...fillerExpos);
    
    // For now, return current gap stats
    // In a full implementation, we'd track historical gaps
    return {
      currentGap,
      averageGap: currentGap, // Placeholder
      maxGap: currentGap,     // Placeholder
      complianceRate: currentGap <= 1 ? 1.0 : 0.0
    };
  }

  /**
   * Get FH options for a specific screen (for calculating omissions)
   */
  private getCurrentFHOptionsForScreen(targetScreen: number): Line[] {
    if (targetScreen === 0) {
      return ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    }
    
    // This is a simplified version for calculating omissions
    // In practice, we'd need to reconstruct the state for that screen
    const { L1, L2, expo } = this.fhData;
    
    const options: Line[] = [L1, L2];
    const remainingLines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress']
      .filter((line): line is Line => line !== L1 && line !== L2)
      .sort((a, b) => (expo[a] || 0) - (expo[b] || 0))
      .slice(0, 3);
    
    return [...options, ...remainingLines];
  }

  /**
   * Get the locked family from FH phase
   */
  getLockedFamily(): Line | null {
    return this.fhData.lock || null;
  }

  /**
   * Get the face trio for a specific family
   */
  getFaceTrio(family: Line): [Face, Face, Face] | null {
    const faceMap: Record<Line, [Face, Face, Face]> = {
      Control: ['sovereign', 'rebel', 'catalyst'],
      Pace: ['strategist', 'navigator', 'visionary'],
      Boundary: ['sentinel', 'equalizer', 'guardian'],
      Truth: ['seeker', 'architect', 'alchemist'],
      Recognition: ['spotlight', 'mask', 'artisan'],
      Bonding: ['provider', 'partner', 'servant'],
      Stress: ['diplomat', 'wanderer', 'catalyst']
    };
    return faceMap[family] || null;
  }

  /**
   * Get the last fillers shown (for question bank integration)
   */
  getLastFillers(): Line[] {
    return this.fhData.lastFillers || [];
  }

  /**
   * Get the current line being assessed in LINES phase
   */
  getCurrentLine(): Line | null {
    const remainingLines = Object.entries(this.linesData.verdicts)
      .filter(([, verdict]) => verdict === null)
      .map(([line]) => line as Line);
    
    return remainingLines[0] || null;
  }

  /**
   * Get current FH data for question loading
   */
  getFHData() {
    return {
      screen: this.fhData.screen,
      L1: this.fhData.L1,
      L2: this.fhData.L2,
      expo: this.fhData.expo,
      hits: this.fhData.hits,
      lock: this.fhData.lock
    };
  }

  /**
   * Get debug information for troubleshooting
   */
  getDebugInfo() {
    return {
      currentPhase: this.currentPhase,
      fhData: this.fhData,
      faceData: this.faceData,
      linesData: this.linesData
    };
  }



  /**
   * Check if quiz is complete
   */
  isComplete(): boolean {
    return this.currentPhase === 'DONE';
  }

  // ==================== V3 COMPONENTS ====================
  private fhTokenEngine: FHTokenEngine;
  private fhBridge: FHBridge;
  private p3Scheduler: P3Scheduler;
  private behaviorTracker: BehaviorTracker;
  private advancedStopRules: AdvancedStopRules;
  private drilldownEngine: DrilldownEngine;
  private edgeCaseHandler: EdgeCaseHandler;
  private qaInstrumentation: QAInstrumentation;

  /**
   * Initialize adaptive Lines phase using FH Bridge
   */
  private initializeAdaptiveLines(): void {
    if (!this.linesData.fhBridge) {
      throw new Error('FH Bridge not available for adaptive Lines');
    }
    
    const { uncertainty } = this.linesData.fhBridge;
    const allLines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    
    // Filter out locked line
    const assessableLines = allLines.filter(line => line !== this.fhData.lock);
    
    // Sort by uncertainty (highest first)
    this.linesData.adaptiveOrder = assessableLines.sort((a, b) => 
      uncertainty[b] - uncertainty[a]
    );
    
    // Initialize configuration
    this.linesData.config = {
      mode: 'strict', // Start with Mode A for compatibility
      totalBaseSlots: 12, // Same as v2
      minBasePerLine: 2,  // Mode A: ≥2 base per line
      maxBasePerLine: 2,  // Mode A: max 2 base per line
      enableLineDuels: true,
      globalCap: 20 // Reasonable cap for total questions
    };
    
    // Allocate base slots (Mode A: 2 per line)
    this.linesData.allocatedSlots = { Control: 0, Pace: 0, Boundary: 0, Truth: 0, Recognition: 0, Bonding: 0, Stress: 0 };
    assessableLines.forEach(line => {
      this.linesData.allocatedSlots[line] = 2;
    });
    
    this.linesData.remainingSlots = assessableLines.length * 2;
  }

  /**
   * Get next line to assess (adaptive order)
   */
  getNextLineToAssess(): Line | null {
    if (!this.linesData.adaptiveOrder) {
      this.initializeAdaptiveLines();
    }
    
    // Find next line that needs assessment
    for (const line of this.linesData.adaptiveOrder) {
      if (this.linesData.verdicts[line] === null) {
        return line;
      }
    }
    
    return null; // All lines assessed
  }

  /**
   * Check if we should ask more questions for a line
   */
  shouldAskMoreQuestions(line: Line): boolean {
    const allocated = this.linesData.allocatedSlots[line];
    const asked = this.linesData.baseSeen[line];
    const verdict = this.linesData.verdicts[line];
    
    // Don't ask if we have a verdict
    if (verdict !== null) return false;
    
    // Don't ask if we've used all allocated slots
    if (asked >= allocated) return false;
    
    // Don't ask if we've exceeded global cap
    if (this.calculateTotalQuestions() >= this.linesData.config.globalCap) return false;
    
    return true;
  }

  /**
   * Check if we should use tiebreaker for a line
   */
  shouldUseTiebreaker(line: Line): boolean {
    if (!this.linesData.fhBridge) return false;
    
    const uncertainty = this.linesData.fhBridge.uncertainty[line];
    const conviction = this.linesData.fhBridge.conviction[line];
    
    // Use tiebreaker if:
    // 1. Line has high uncertainty
    // 2. User showed low conviction on base questions
    // 3. We haven't exceeded tiebreaker limit
    
    return uncertainty > 0.6 && conviction < 0.5 && this.linesData.tbSeen[line] < 2;
  }

  /**
   * Calculate FH Bridge - the core v3 innovation
   * Converts FH data into uncertainty scores for adaptive Lines phase
   */
  private calculateFHBridge(): FHBridge {
    const allLines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    const uncertainty: Record<Line, number> = {} as Record<Line, number>;
    
    allLines.forEach(line => {
      const expo = this.fhData.expo[line];
      const hits = this.fhData.hits[line];
      const attraction = this.calculateAttraction(line);
      const conviction = this.calculateConviction(line);
      const stability = this.calculateStability(line);
      const leaderRank = this.calculateLeaderRank(line);
      const msfContext = this.calculateMSFContext(line);
      
      // Uncertainty Score calculation
      let u = 0;
      
      // High uncertainty if:
      // 1. Low exposure (haven't seen enough)
      if (expo < 2) u += 0.3;
      
      // 2. High attraction but low conviction (user is interested but unsure)
      if (attraction > 0.6 && conviction < 0.4) u += 0.25;
      
      // 3. Low stability (opinions wobbled)
      if (stability < 0.5) u += 0.2;
      
      // 4. Close to leadership but didn't lock (near miss)
      if (leaderRank <= 3 && !this.fhData.lock) u += 0.15;
      
      // 5. MSF context matters for leaders
      if (leaderRank <= 2 && !msfContext) u += 0.1;
      
      // Normalize to [0,1]
      uncertainty[line] = Math.min(1, Math.max(0, u));
    });
    
    return {
      uncertainty,
      attraction: this.fhData.telemetry.attraction,
      conviction: this.fhData.telemetry.conviction,
      expo: this.fhData.expo,
      leaderRank: this.fhData.telemetry.leaderRank,
      telemetry: this.fhData.telemetry
    };
  }

  /**
   * Calculate attraction score for a line
   */
  private calculateAttraction(line: Line): number {
    const expo = this.fhData.expo[line];
    const hits = this.fhData.hits[line];
    const hover = this.fhData.hoverData[line] || 0;
    
    if (expo === 0) return 0;
    
    // Base attraction from hit ratio
    let attraction = hits / expo;
    
    // Boost from hover/dwell (near-miss signals)
    if (hover > 0) {
      attraction += Math.min(0.3, hover / 1000); // Cap the boost
    }
    
    return Math.min(1, attraction);
  }

  /**
   * Calculate conviction score for a line
   */
  private calculateConviction(line: Line): number {
    const expo = this.fhData.expo[line];
    const switches = this.fhData.switchData[line] || 0;
    
    if (expo === 0) return 0;
    
    // High conviction if low switching
    let conviction = 1 - (switches / (expo * 2));
    
    // Boost conviction for lines that were picked decisively
    if (this.fhData.hits[line] >= 2) {
      conviction += 0.2;
    }
    
    return Math.min(1, Math.max(0, conviction));
  }

  /**
   * Calculate stability score for a line
   */
  private calculateStability(line: Line): number {
    const switches = this.fhData.switchData[line] || 0;
    const expo = this.fhData.expo[line];
    
    if (expo === 0) return 1;
    
    // Stability decreases with more switching
    return Math.max(0, 1 - (switches / expo));
  }

  /**
   * Calculate leader rank for a line
   */
  private calculateLeaderRank(line: Line): number {
    const allLines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    
    // Sort by hits (descending) then by exposure
    const sorted = allLines.sort((a, b) => {
      const aScore = this.fhData.hits[a] * 10 + this.fhData.expo[a];
      const bScore = this.fhData.hits[b] * 10 + this.fhData.expo[b];
      return bScore - aScore;
    });
    
    return sorted.indexOf(line) + 1;
  }

  /**
   * Calculate MSF context for a line
   */
  private calculateMSFContext(line: Line): boolean {
    if (line !== this.fhData.L1 && line !== this.fhData.L2) return false;
    
    // Check if this line met MSF floor during FH
    const expo = this.fhData.expo[line];
    const hits = this.fhData.hits[line];
    
    return expo >= 2 && hits >= 2;
  }

  /**
   * Finish FH phase and transition to Face selection
   */
  private finishFH(): QuizPhase {
    // Set locked family
    if (this.fhData.L1 && this.isLineStrong(this.fhData.L1)) {
      this.fhData.lock = this.fhData.L1;
    } else if (this.fhData.L2 && this.isLineStrong(this.fhData.L2)) {
      this.fhData.lock = this.fhData.L2;
    }
    
    // V3: Generate FH Bridge for adaptive Lines phase
    const fhBridge = this.calculateFHBridge();
    this.linesData.fhBridge = fhBridge;
    
    // Set locked family as C with face-lock confidence
    if (this.fhData.lock) {
      this.linesData.verdicts[this.fhData.lock] = 'C';
      this.linesData.confidence[this.fhData.lock] = 'face-lock';
    }
    
    return 'LINES';
  }

  // Add these methods for real-time telemetry collection

  /**
   * Record hover/dwell time for a line during FH
   */
  public recordHover(line: Line, durationMs: number): void {
    if (this.currentPhase === 'FH') {
      this.fhData.hoverData[line] = (this.fhData.hoverData[line] || 0) + durationMs;
      console.log(`🖱️ Hover recorded: ${line} +${durationMs}ms (total: ${this.fhData.hoverData[line]}ms)`);
    }
  }

  /**
   * Record option switching/revisits for a line during FH
   */
  public recordSwitch(line: Line): void {
    if (this.currentPhase === 'FH') {
      this.fhData.switchData[line] = (this.fhData.switchData[line] || 0) + 1;
      console.log(`🔄 Switch recorded: ${line} (total: ${this.fhData.switchData[line]})`);
    }
  }

  /**
   * Record line presentation order during FH
   */
  public recordLinePresentation(line: Line, screenIndex: number): void {
    if (this.currentPhase === 'FH') {
      if (!this.fhData.lineOrder.includes(line)) {
        this.fhData.lineOrder.push(line);
      }
      console.log(`🎯 Line presentation: ${line} on screen ${screenIndex}`);
    }
  }

  /**
   * Get real-time telemetry summary for a line
   */
  public getLineTelemetry(line: Line): {
    hover: number;
    switches: number;
    order: number;
    attraction: number;
    conviction: number;
    stability: number;
  } {
    const hover = this.fhData.hoverData[line] || 0;
    const switches = this.fhData.switchData[line] || 0;
    const order = this.fhData.lineOrder.indexOf(line) + 1;
    const attraction = this.calculateAttraction(line);
    const conviction = this.calculateConviction(line);
    const stability = this.calculateStability(line);
    
    return { hover, switches, order, attraction, conviction, stability };
  }

  /**
   * Get live uncertainty calculation for a line
   */
  public getLiveUncertainty(line: Line): {
    score: number;
    breakdown: string[];
    factors: Record<string, number>;
  } {
    const expo = this.fhData.expo[line];
    const hits = this.fhData.hits[line];
    const attraction = this.calculateAttraction(line);
    const conviction = this.calculateConviction(line);
    const stability = this.calculateStability(line);
    const leaderRank = this.calculateLeaderRank(line);
    const msfContext = this.calculateMSFContext(line);
    
    let u = 0;
    const breakdown: string[] = [];
    const factors: Record<string, number> = {};
    
    // Factor 1: Low exposure
    if (expo < 2) {
      const factor = 0.3;
      u += factor;
      factors.exposure = factor;
      breakdown.push(`Low exposure (${expo}/2): +${factor}`);
    }
    
    // Factor 2: High attraction but low conviction
    if (attraction > 0.6 && conviction < 0.4) {
      const factor = 0.25;
      u += factor;
      factors.attractionConviction = factor;
      breakdown.push(`High attraction (${attraction.toFixed(2)}) but low conviction (${conviction.toFixed(2)}): +${factor}`);
    }
    
    // Factor 3: Low stability
    if (stability < 0.5) {
      const factor = 0.2;
      u += factor;
      factors.stability = factor;
      breakdown.push(`Low stability (${stability.toFixed(2)}): +${factor}`);
    }
    
    // Factor 4: Near miss
    if (leaderRank <= 3 && !this.fhData.lock) {
      const factor = 0.15;
      u += factor;
      factors.nearMiss = factor;
      breakdown.push(`Near miss (rank ${leaderRank}): +${factor}`);
    }
    
    // Factor 5: Leader without MSF
    if (leaderRank <= 2 && !msfContext) {
      const factor = 0.1;
      u += factor;
      factors.msfContext = factor;
      breakdown.push(`Leader without MSF: +${factor}`);
    }
    
    const score = Math.min(1, Math.max(0, u));
    
    return { score, breakdown, factors };
  }

  /**
   * Get adaptive decision explanation for Lines phase
   */
  public getAdaptiveDecision(line: Line): {
    shouldAskMore: boolean;
    shouldUseTB: boolean;
    reasoning: string[];
    factors: Record<string, any>;
  } {
    const allocated = this.linesData.allocatedSlots[line] || 0;
    const asked = this.linesData.baseSeen[line];
    const verdict = this.linesData.verdicts[line];
    const uncertainty = this.linesData.fhBridge?.uncertainty[line] || 0;
    const conviction = this.linesData.fhBridge?.conviction[line] || 0;
    
    const reasoning: string[] = [];
    const factors: Record<string, any> = {};
    
    // Check if we should ask more questions
    let shouldAskMore = false;
    if (verdict !== null) {
      reasoning.push(`Line ${line} already has verdict: ${verdict}`);
    } else if (asked >= allocated) {
      reasoning.push(`Line ${line} has used all allocated slots (${asked}/${allocated})`);
    } else if (this.calculateTotalQuestions() >= this.linesData.config.globalCap) {
      reasoning.push(`Global cap reached: ${this.calculateTotalQuestions()}/${this.linesData.config.globalCap}`);
    } else {
      shouldAskMore = true;
      reasoning.push(`Line ${line} needs more questions (${asked}/${allocated} used)`);
    }
    
    // Check if we should use tiebreaker
    let shouldUseTB = false;
    if (this.linesData.needTB[line] && uncertainty > 0.6 && conviction < 0.5 && this.linesData.tbSeen[line] < 2) {
      shouldUseTB = true;
      reasoning.push(`Tiebreaker recommended: high uncertainty (${uncertainty.toFixed(3)}) + low conviction (${conviction.toFixed(3)})`);
    } else if (this.linesData.needTB[line]) {
      reasoning.push(`Tiebreaker not recommended: uncertainty ${uncertainty.toFixed(3)}, conviction ${conviction.toFixed(3)}`);
    }
    
    factors.allocated = allocated;
    factors.asked = asked;
    factors.verdict = verdict;
    factors.uncertainty = uncertainty;
    factors.conviction = conviction;
    factors.needTB = this.linesData.needTB[line];
    factors.tbSeen = this.linesData.tbSeen[line];
    
    return { shouldAskMore, shouldUseTB, reasoning, factors };
  }
}

export default QuizEngineV2;
