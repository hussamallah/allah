// Phase 3 Scored Scheduler - Implements investigation scoring and adaptive question placement
// This is the core V3 innovation that drives Phase 3 question selection

import { Line, Verdict } from '../../types/quiz-v2';
import { V3_SCORING, V3_AMBIGUITY, V3_UTILS, V3_FLOW } from './v3Config';
import { P3LineData } from './fhBridge';

export interface InvestigationScore {
  severity: number;        // F→+2, O→+1, C→+0
  ambiguity: number;       // < 0.12→+2, 0.12–0.22→+1, ≥ 0.22→+0
  instability: number;     // if instability_flag == true → +1
  exposurePenalty: number; // expo=0→+2, expo=1-2→+1, else→+0
  fRiskBonus: number;      // if fh_f_risk == true → +1
  totalScore: number;      // Sum of all components
}

export interface SchedulerState {
  budgetUsed: number;           // Total P3 items asked so far
  budgetRemaining: number;      // P3_BUDGET - budgetUsed
  linesEligible: Line[];        // Lines that can still be asked
  linesMeetingBaseline: Line[]; // Lines that meet minimum baseline
  nextLine: Line | null;        // Next line to assess
}

export class P3Scheduler {
  private p3Data: Record<Line, P3LineData> = {};
  private lockedFamily: Line | null = null;
  private budgetUsed: number = 0;
  private budgetRemaining: number = V3_FLOW.P3_BUDGET;

  constructor() {
    // Initialize empty state
    const lines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    lines.forEach(line => {
      this.p3Data[line] = {
        seeds: [],
        baseline: 0,
        compensation_score: 0,
        current_winner: null,
        current_margin: 0,
        items_asked: 0,
        confidence: null
      };
    });
  }

  /**
   * Initialize scheduler with FH Bridge data
   */
  initialize(fhBridgeData: Record<Line, P3LineData>, lockedFamily: Line): void {
    this.p3Data = fhBridgeData;
    this.lockedFamily = lockedFamily;
    this.budgetUsed = 0;
    this.budgetRemaining = V3_FLOW.P3_BUDGET;
    
    // Calculate initial budget usage from existing items
    Object.values(this.p3Data).forEach(lineData => {
      this.budgetUsed += lineData.items_asked;
    });
    this.budgetRemaining = V3_FLOW.P3_BUDGET - this.budgetUsed;
    
    console.log(`🎯 P3 Scheduler initialized: budget ${this.budgetUsed}/${V3_FLOW.P3_BUDGET}`);
  }

  /**
   * Calculate investigation score for a line
   * Score = Severity + Ambiguity + Instability + ExposurePenalty + FRiskBonus
   */
  calculateInvestigationScore(line: Line): InvestigationScore {
    const lineData = this.p3Data[line];
    if (!lineData) {
      throw new Error(`Line ${line} not found in P3 data`);
    }

    // Get current winner and margin
    const currentWinner = lineData.current_winner || 'C';
    const currentMargin = lineData.current_margin || 0;
    
    // Calculate components
    const severity = V3_SCORING.SEVERITY[currentWinner];
    const ambiguity = V3_AMBIGUITY.getAmbiguityScore(currentMargin);
    const instability = lineData.confidence === 'face-lock' ? 0 : 1; // TODO: Use actual instability flag
    const exposurePenalty = V3_SCORING.getExposurePenalty(lineData.baseline);
    const fRiskBonus = 0; // TODO: Get from FH data
    
    const totalScore = severity + ambiguity + instability + exposurePenalty + fRiskBonus;
    
    const score: InvestigationScore = {
      severity,
      ambiguity,
      instability,
      exposurePenalty,
      fRiskBonus,
      totalScore
    };
    
    console.log(`📊 Investigation score for ${line}:`, score);
    
    return score;
  }

  /**
   * Select next line to assess based on investigation scores
   */
  selectNextLine(): Line | null {
    // Get eligible lines (not face-lock, under P3_MAX, budget remaining)
    const eligibleLines = this.getEligibleLines();
    
    if (eligibleLines.length === 0) {
      console.log(`🎯 No eligible lines for P3 assessment`);
      return null;
    }
    
    // Calculate scores for all eligible lines
    const lineScores: Array<{line: Line, score: InvestigationScore}> = [];
    
    eligibleLines.forEach(line => {
      try {
        const score = this.calculateInvestigationScore(line);
        lineScores.push({ line, score });
      } catch (error) {
        console.warn(`Failed to calculate score for ${line}:`, error);
      }
    });
    
    if (lineScores.length === 0) {
      return null;
    }
    
    // Sort by total score (highest first), then by tie-break criteria
    lineScores.sort((a, b) => {
      // Primary: total score
      if (b.score.totalScore !== a.score.totalScore) {
        return b.score.totalScore - a.score.totalScore;
      }
      
      // Secondary: severity
      if (b.score.severity !== a.score.severity) {
        return b.score.severity - a.score.severity;
      }
      
      // Tertiary: ambiguity
      if (b.score.ambiguity !== a.score.ambiguity) {
        return b.score.ambiguity - a.score.ambiguity;
      }
      
      // Quaternary: instability
      if (b.score.instability !== a.score.instability) {
        return b.score.instability - a.score.instability;
      }
      
      // Quinary: items asked (prefer lines with fewer items)
      const aItems = this.p3Data[a.line].items_asked;
      const bItems = this.p3Data[b.line].items_asked;
      if (aItems !== bItems) {
        return aItems - bItems;
      }
      
      // Final: fixed line order
      const lineOrder = V3_FLOW.LINE_ORDER;
      return lineOrder.indexOf(a.line) - lineOrder.indexOf(b.line);
    });
    
    const selectedLine = lineScores[0].line;
    console.log(`🎯 P3 Scheduler selected: ${selectedLine} (score: ${lineScores[0].score.totalScore})`);
    
    return selectedLine;
  }

  /**
   * Enforce baselines - ensure all lines meet minimum requirements
   */
  enforceBaselines(): void {
    const lines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    
    lines.forEach(line => {
      if (line === this.lockedFamily) return; // Face-lock line
      
      const lineData = this.p3Data[line];
      const baseline = lineData.baseline;
      const itemsAsked = lineData.items_asked;
      
      if (itemsAsked < baseline) {
        console.log(`⚠️ ${line} below baseline: ${itemsAsked}/${baseline}`);
      }
    });
  }

  /**
   * Manage budget - check if we can ask more questions
   */
  manageBudget(): boolean {
    if (this.budgetRemaining <= 0) {
      console.log(`💰 P3 Budget exhausted: ${this.budgetUsed}/${V3_FLOW.P3_BUDGET}`);
      return false;
    }
    
    return true;
  }

  /**
   * Get lines eligible for Phase 3 assessment
   */
  getEligibleLines(): Line[] {
    const lines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    
    return lines.filter(line => {
      if (line === this.lockedFamily) return false; // Face-lock line
      
      const lineData = this.p3Data[line];
      if (!lineData) return false;
      
      // Check P3_MAX limit
      if (lineData.items_asked >= V3_FLOW.P3_MAX) return false;
      
      // Check budget
      if (this.budgetRemaining <= 0) return false;
      
      return true;
    });
  }

  /**
   * Get lines that meet baseline requirements
   */
  getLinesMeetingBaseline(): Line[] {
    const lines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    
    return lines.filter(line => {
      if (line === this.lockedFamily) return true; // Face-lock always meets baseline
      
      const lineData = this.p3Data[line];
      if (!lineData) return false;
      
      return lineData.items_asked >= lineData.baseline;
    });
  }

  /**
   * Add P3 token to a line and update budget
   */
  addP3Token(line: Line, verdict: Verdict): void {
    if (line === this.lockedFamily) return; // Face-lock line
    
    const lineData = this.p3Data[line];
    if (!lineData) return;
    
    // Add token
    lineData.seeds.push({
      verdict,
      effective_weight: 1.0,
      is_seed: false,
      source: 'p3'
    });
    
    lineData.items_asked++;
    this.budgetUsed++;
    this.budgetRemaining--;
    
    // Recalculate current winner and margin
    this.updateLineStatus(line);
    
    console.log(`📊 P3 Token added: ${line} → ${verdict}, budget: ${this.budgetUsed}/${V3_FLOW.P3_BUDGET}`);
  }

  /**
   * Update line status after adding tokens
   */
  private updateLineStatus(line: Line): void {
    const lineData = this.p3Data[line];
    const seeds = lineData.seeds;
    
    if (seeds.length === 0) return;
    
    // Calculate tallies with effective weights
    let T_C = 0, T_O = 0, T_F = 0;
    
    seeds.forEach(seed => {
      switch (seed.verdict) {
        case 'C': T_C += seed.effective_weight; break;
        case 'O': T_O += seed.effective_weight; break;
        case 'F': T_F += seed.effective_weight; break;
      }
    });
    
    // Determine winner
    const maxScore = Math.max(T_C, T_O, T_F);
    let winner: Verdict;
    if (T_F >= T_O && T_F >= T_C) winner = 'F';
    else if (T_O >= T_C && T_O >= T_F) winner = 'O';
    else winner = 'C';
    
    // Calculate margin
    const scores = [T_C, T_O, T_F].sort((a, b) => b - a);
    const margin = V3_UTILS.calculateMargin(scores[0], scores[1]);
    
    // Update line data
    lineData.current_winner = winner;
    lineData.current_margin = margin;
    
    console.log(`📊 ${line} status updated: winner=${winner}, margin=${margin.toFixed(3)}, items=${lineData.items_asked}/${lineData.baseline}`);
  }

  /**
   * Get current scheduler state
   */
  getSchedulerState(): SchedulerState {
    return {
      budgetUsed: this.budgetUsed,
      budgetRemaining: this.budgetRemaining,
      linesEligible: this.getEligibleLines(),
      linesMeetingBaseline: this.getLinesMeetingBaseline(),
      nextLine: this.selectNextLine()
    };
  }

  /**
   * Get debug information
   */
  getDebugInfo(): {
    p3Data: Record<Line, P3LineData>;
    lockedFamily: Line | null;
    budgetUsed: number;
    budgetRemaining: number;
    eligibleLines: Line[];
    baselineLines: Line[];
    nextLine: Line | null;
  } {
    return {
      p3Data: this.p3Data,
      lockedFamily: this.lockedFamily,
      budgetUsed: this.budgetUsed,
      budgetRemaining: this.budgetRemaining,
      eligibleLines: this.getEligibleLines(),
      baselineLines: this.getLinesMeetingBaseline(),
      nextLine: this.selectNextLine()
    };
  }

  /**
   * Reset scheduler state (for testing)
   */
  reset(): void {
    const lines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    lines.forEach(line => {
      this.p3Data[line] = {
        seeds: [],
        baseline: 0,
        compensation_score: 0,
        current_winner: null,
        current_margin: 0,
        items_asked: 0,
        confidence: null
      };
    });
    
    this.lockedFamily = null;
    this.budgetUsed = 0;
    this.budgetRemaining = V3_FLOW.P3_BUDGET;
  }
}

export default P3Scheduler;
