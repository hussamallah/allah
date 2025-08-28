// Phase 3 Engine - GroundZero v3 Lines Assessment
// Implements the scored scheduler and token management for Phase 3

import { Line, Verdict, BehaviorSample } from '../../types/quiz-v2';
import { V3_FLOW, V3_EVIDENCE, V3_SPECIAL_OVERRIDE, V3_CONFIDENCE } from './v3Config';

export interface Phase3Token {
  verdict: Verdict;      // C, O, or F
  weight: number;         // Decay-weighted token weight
  is_seed: boolean;       // false for P3 tokens (vs FH seeds)
  behavior: BehaviorSample; // Behavior data for this token
  timestamp: number;      // When token was emitted
}

export interface LineAssessment {
  line: Line;
  tokens: Phase3Token[];
  currentWinner: Verdict;
  currentMargin: number;
  itemsAsked: number;
  confidence: string;
  baselineMet: boolean;
  instabilityFlag: boolean;
  fhExpo: number;
  fhFRisk: boolean;
}

export interface InvestigationScore {
  line: Line;
  severity: number;
  ambiguity: number;
  instability: number;
  exposurePenalty: number;
  fRiskBonus: number;
  totalScore: number;
}

export class Phase3Engine {
  private lineAssessments: Record<Line, LineAssessment> = {};
  private budgetUsed: number = 0;
  private lockedFamily: Line | null = null;

  constructor() {
    // Initialize empty assessments for all lines
    const lines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    lines.forEach(line => {
      this.lineAssessments[line] = {
        line,
        tokens: [],
        currentWinner: 'C',
        currentMargin: 0,
        itemsAsked: 0,
        confidence: V3_CONFIDENCE.LOW,
        baselineMet: false,
        instabilityFlag: false,
        fhExpo: 0,
        fhFRisk: false
      };
    });
  }

  /**
   * Initialize Phase 3 with FH seeds and locked family
   */
  initializePhase3(fhSeeds: Record<Line, Array<{verdict: Verdict, weight: number}>>, lockedFamily: Line): void {
    this.lockedFamily = lockedFamily;
    
    // Set FH seeds for all non-locked lines
    Object.entries(fhSeeds).forEach(([line, seeds]) => {
      if (line === lockedFamily) return; // Skip locked family
      
      const assessment = this.lineAssessments[line as Line];
      assessment.fhExpo = seeds.length;
      
      // Convert FH seeds to Phase 3 tokens with decay
      seeds.forEach((seed, index) => {
        const decayWeight = V3_EVIDENCE.DECAY_LAMBDA ** (seeds.length - index);
        const effectiveWeight = seed.weight * decayWeight;
        
        const token: Phase3Token = {
          verdict: seed.verdict,
          weight: effectiveWeight,
          is_seed: true,
          behavior: { latency_ms: 0, switches: 0, deliberation_ms: 0 }, // Placeholder for seeds
          timestamp: Date.now()
        };
        
        assessment.tokens.push(token);
      });
      
      // Update assessment state
      this.updateLineAssessment(line as Line);
    });
    
    console.log(`🚀 Phase 3 initialized with ${Object.keys(fhSeeds).length} lines, locked family: ${lockedFamily}`);
  }

  /**
   * Get next line to assess using GroundZero v3 scored scheduler
   */
  getNextLineToAssess(): Line | null {
    if (this.budgetUsed >= V3_FLOW.P3_BUDGET) {
      console.log(`💰 Phase 3 budget exhausted (${this.budgetUsed}/${V3_FLOW.P3_BUDGET})`);
      return null;
    }

    const eligibleLines = this.getEligibleLines();
    if (eligibleLines.length === 0) {
      console.log(`✅ All lines have final verdicts`);
      return null;
    }

    // Calculate investigation scores for all eligible lines
    const scores = eligibleLines.map(line => this.calculateInvestigationScore(line));
    
    // Sort by total score (descending) and apply tiebreaks
    scores.sort((a, b) => {
      if (a.totalScore !== b.totalScore) return b.totalScore - a.totalScore;
      
      // Tiebreak 1: Higher Severity
      if (a.severity !== b.severity) return b.severity - a.severity;
      
      // Tiebreak 2: Higher Ambiguity
      if (a.ambiguity !== b.ambiguity) return b.ambiguity - a.ambiguity;
      
      // Tiebreak 3: Instability
      if (a.instability !== b.instability) return b.instability - a.instability;
      
      // Tiebreak 4: Lower items asked
      if (a.line !== b.line) {
        const aItems = this.lineAssessments[a.line].itemsAsked;
        const bItems = this.lineAssessments[b.line].itemsAsked;
        if (aItems !== bItems) return aItems - bItems;
      }
      
      // Tiebreak 5: Fixed line order
      const lineOrder = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
      const aIndex = lineOrder.indexOf(a.line);
      const bIndex = lineOrder.indexOf(b.line);
      return aIndex - bIndex;
    });

    const nextLine = scores[0].line;
    console.log(`🎯 Next line to assess: ${nextLine} (score: ${scores[0].totalScore})`);
    console.log(`📊 Score breakdown: Severity=${scores[0].severity}, Ambiguity=${scores[0].ambiguity}, Instability=${scores[0].instability}, ExposurePenalty=${scores[0].exposurePenalty}, FRiskBonus=${scores[0].fRiskBonus}`);
    
    return nextLine;
  }

  /**
   * Process answer for a line
   */
  processAnswer(line: Line, answer: 'A' | 'B' | 'C', behavior: BehaviorSample): Verdict {
    const assessment = this.lineAssessments[line];
    if (!assessment) {
      throw new Error(`No assessment found for line: ${line}`);
    }

    // Convert answer to verdict (A→C, B→O, C→F)
    const verdict = this.answerToVerdict(answer);
    
    // Create token
    const token: Phase3Token = {
      verdict,
      weight: 1.0, // P3 tokens have weight 1.0
      is_seed: false,
      behavior,
      timestamp: Date.now()
    };
    
    // Add token to line
    assessment.tokens.push(token);
    assessment.itemsAsked++;
    
    // Update instability flag if behavior is unstable
    if (this.isUnstableBehavior(behavior)) {
      assessment.instabilityFlag = true;
    }
    
    // Update assessment state
    this.updateLineAssessment(line);
    
    // Check for special override (2C+1F→O)
    this.checkSpecialOverride(line);
    
    // Increment budget
    this.budgetUsed++;
    
    console.log(`🎯 Line ${line} answer processed: ${answer} → ${verdict} (items: ${assessment.itemsAsked}/${V3_FLOW.P3_MAX})`);
    
    return verdict;
  }

  /**
   * Check if line should stop assessment
   */
  shouldStopAssessment(line: Line): boolean {
    const assessment = this.lineAssessments[line];
    if (!assessment) return false;
    
    // Must meet baseline first
    if (!assessment.baselineMet) return false;
    
    // Early stop @2 if: C winner, margin ≥ 0.25, stable, fh_expo ≥ 3
    if (assessment.itemsAsked === 2) {
      if (assessment.currentWinner === 'C' && 
          assessment.currentMargin >= 0.25 && 
          !assessment.instabilityFlag && 
          assessment.fhExpo >= 3) {
        assessment.confidence = V3_CONFIDENCE.HIGH;
        return true;
      }
    }
    
    // Standard stop @3 if: margin ≥ 0.22
    if (assessment.itemsAsked === 3 && assessment.currentMargin >= 0.22) {
      assessment.confidence = assessment.currentMargin >= 0.25 ? V3_CONFIDENCE.HIGH : V3_CONFIDENCE.MEDIUM;
      return true;
    }
    
    // Forced stop @4
    if (assessment.itemsAsked >= V3_FLOW.P3_MAX) {
      assessment.confidence = V3_CONFIDENCE.LOW;
      return true;
    }
    
    return false;
  }

  /**
   * Get Phase 3 summary
   */
  getPhase3Summary(): {
    budgetUsed: number;
    budgetRemaining: number;
    linesCompleted: number;
    linesInProgress: number;
    assessments: Record<Line, LineAssessment>;
  } {
    const lines = Object.values(this.lineAssessments);
    const linesCompleted = lines.filter(l => l.confidence !== V3_CONFIDENCE.LOW || l.itemsAsked >= V3_FLOW.P3_MAX).length;
    const linesInProgress = lines.length - linesCompleted;
    
    return {
      budgetUsed: this.budgetUsed,
      budgetRemaining: V3_FLOW.P3_BUDGET - this.budgetUsed,
      linesCompleted,
      linesInProgress,
      assessments: this.lineAssessments
    };
  }

  /**
   * Reset engine state (for testing)
   */
  reset(): void {
    this.lineAssessments = {};
    this.budgetUsed = 0;
    this.lockedFamily = null;
    
    // Reinitialize empty assessments
    const lines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    lines.forEach(line => {
      this.lineAssessments[line] = {
        line,
        tokens: [],
        currentWinner: 'C',
        currentMargin: 0,
        itemsAsked: 0,
        confidence: V3_CONFIDENCE.LOW,
        baselineMet: false,
        instabilityFlag: false,
        fhExpo: 0,
        fhFRisk: false
      };
    });
  }

  // ==================== PRIVATE METHODS ====================

  /**
   * Get lines eligible for assessment
   */
  private getEligibleLines(): Line[] {
    return Object.values(this.lineAssessments)
      .filter(assessment => 
        assessment.line !== this.lockedFamily &&
        assessment.itemsAsked < V3_FLOW.P3_MAX &&
        assessment.confidence === V3_CONFIDENCE.LOW
      )
      .map(assessment => assessment.line);
  }

  /**
   * Calculate investigation score for a line
   */
  private calculateInvestigationScore(line: Line): InvestigationScore {
    const assessment = this.lineAssessments[line];
    
    // Severity: F→+2, O→+1, C→+0
    const severity = assessment.currentWinner === 'F' ? 2 : assessment.currentWinner === 'O' ? 1 : 0;
    
    // Ambiguity: < 0.12 → +2, 0.12–0.22 → +1, ≥ 0.22 → +0
    let ambiguity = 0;
    if (assessment.currentMargin < 0.12) ambiguity = 2;
    else if (assessment.currentMargin < 0.22) ambiguity = 1;
    
    // Instability: if instability_flag == true → +1
    const instability = assessment.instabilityFlag ? 1 : 0;
    
    // ExposurePenalty: fh_expo=0 → +2, 1–2 → +1, else → +0
    let exposurePenalty = 0;
    if (assessment.fhExpo === 0) exposurePenalty = 2;
    else if (assessment.fhExpo <= 2) exposurePenalty = 1;
    
    // FRiskBonus: if fh_f_risk == true → +1
    const fRiskBonus = assessment.fhFRisk ? 1 : 0;
    
    const totalScore = severity + ambiguity + instability + exposurePenalty + fRiskBonus;
    
    return {
      line,
      severity,
      ambiguity,
      instability,
      exposurePenalty,
      fRiskBonus,
      totalScore
    };
  }

  /**
   * Update line assessment state
   */
  private updateLineAssessment(line: Line): void {
    const assessment = this.lineAssessments[line];
    
    // Calculate current winner and margin
    const tallies = { C: 0, O: 0, F: 0 };
    assessment.tokens.forEach(token => {
      tallies[token.verdict] += token.weight;
    });
    
    // Find winner
    const winner = Object.entries(tallies).reduce((a, b) => a[1] > b[1] ? a : b);
    assessment.currentWinner = winner[0] as Verdict;
    
    // Calculate margin
    const sorted = Object.values(tallies).sort((a, b) => b - a);
    if (sorted[0] + sorted[1] > 0) {
      assessment.currentMargin = (sorted[0] - sorted[1]) / (sorted[0] + sorted[1]);
    } else {
      assessment.currentMargin = 0;
    }
    
    // Check if baseline is met
    const baseline = this.getBaseline(assessment.fhExpo);
    assessment.baselineMet = assessment.itemsAsked >= baseline;
  }

  /**
   * Get baseline items for a line based on FH exposure
   */
  private getBaseline(fhExpo: number): number {
    if (fhExpo >= 3) return 2;
    if (fhExpo >= 1) return 3;
    return 4;
  }

  /**
   * Convert answer to verdict
   */
  private answerToVerdict(answer: 'A' | 'B' | 'C'): Verdict {
    switch (answer) {
      case 'A': return 'C';
      case 'B': return 'O';
      case 'C': return 'F';
      default: throw new Error(`Invalid answer: ${answer}`);
    }
  }

  /**
   * Check if behavior is unstable
   */
  private isUnstableBehavior(behavior: BehaviorSample): boolean {
    return (
      behavior.latency_ms >= 6000 ||
      behavior.switches >= 2 ||
      behavior.deliberation_ms >= 2500
    );
  }

  /**
   * Check for special override (2C+1F→O)
   */
  private checkSpecialOverride(line: Line): void {
    const assessment = this.lineAssessments[line];
    
    // Only apply to P3 tokens (ignore FH seeds)
    const p3Tokens = assessment.tokens.filter(t => !t.is_seed);
    
    if (p3Tokens.length >= 3) {
      const firstThree = p3Tokens.slice(0, 3);
      const cCount = firstThree.filter(t => t.verdict === 'C').length;
      const fCount = firstThree.filter(t => t.verdict === 'F').length;
      const oCount = firstThree.filter(t => t.verdict === 'O').length;
      
      if (cCount === 2 && fCount === 1 && oCount === 0) {
        // Force verdict to O
        assessment.currentWinner = 'O';
        console.log(`🔄 Special override applied to ${line}: 2C+1F → O`);
      }
    }
  }

  /**
   * Get debug information
   */
  getDebugInfo(): {
    lineAssessments: Record<Line, LineAssessment>;
    budgetUsed: number;
    lockedFamily: Line | null;
  } {
    return {
      lineAssessments: this.lineAssessments,
      budgetUsed: this.budgetUsed,
      lockedFamily: this.lockedFamily
    };
  }
}

export default Phase3Engine;
