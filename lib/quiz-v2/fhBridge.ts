// FH Bridge - Converts FH tokens to Phase 3 seeds with decay and baselines
// Implements the core V3 innovation: FH seeds Phase 3 with exposure-weighted compensation

import { Line, Verdict } from '../../types/quiz-v2';
import { V3_EVIDENCE, V3_BASELINES, V3_UTILS } from './v3Config';
import { FHToken, FHSeedData } from './fhTokenEngine';

export interface P3Seed {
  verdict: Verdict;           // C, O, or F (F only from P3, not FH)
  effective_weight: number;    // After decay: f_expo * DECAY_LAMBDA^(N-k)
  is_seed: boolean;           // true for FH seeds, false for P3 tokens
  source: 'fh' | 'p3';        // Where this token came from
}

export interface P3LineData {
  seeds: P3Seed[];            // FH seeds + P3 tokens (in chronological order)
  baseline: number;            // Minimum items required for this line
  compensation_score: number;  // Exposure penalty + F-risk bonus
  current_winner: Verdict | null;
  current_margin: number;
  items_asked: number;
  confidence: 'high' | 'medium' | 'low' | 'face-lock' | null;
}

export class FHBridge {
  private p3Data: Record<Line, P3LineData> = {};
  private fhData: FHSeedData[] = [];
  private lockedFamily: Line | null = null;

  constructor() {
    // Initialize empty data for all lines
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
   * Convert FH tokens to Phase 3 seeds with decay
   * This is the core V3 innovation: FH seeds Phase 3
   */
  convertFHToP3Seeds(fhData: Record<Line, FHSeedData>, lockedFamily: Line): Record<Line, P3Seed[]> {
    this.fhData = Object.values(fhData);
    this.lockedFamily = lockedFamily;
    
    const lines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    const seeds: Record<Line, P3Seed[]> = {};
    
    lines.forEach(line => {
      if (line === lockedFamily) {
        // Face-lock line: no Phase 3 items
        seeds[line] = [];
        this.p3Data[line].confidence = 'face-lock';
        return;
      }
      
      const lineFHData = fhData[line];
      const fhTokens = lineFHData.tokens;
      
      // Convert FH tokens to P3 seeds with decay
      const p3Seeds = this.applyDecay(fhTokens, 'fh');
      seeds[line] = p3Seeds;
      
      // Store in p3Data for ongoing management
      this.p3Data[line].seeds = p3Seeds;
      
      // Calculate baseline for this line
      this.p3Data[line].baseline = V3_BASELINES.getBaseline(fhTokens.length);
      
      // Calculate compensation score
      this.p3Data[line].compensation_score = this.calculateCompensationScore(line, lineFHData);
      
      console.log(`🌉 FH Bridge: ${line} → ${p3Seeds.length} seeds, baseline: ${this.p3Data[line].baseline}, compensation: ${this.p3Data[line].compensation_score}`);
    });
    
    return seeds;
  }

  /**
   * Apply decay to token sequence
   * FH seed effective weight = f_expo * DECAY_LAMBDA^(N-k)
   * P3 token effective weight = DECAY_LAMBDA^(N-k)
   */
  applyDecay(tokens: FHToken[], source: 'fh' | 'p3'): P3Seed[] {
    if (tokens.length === 0) return [];
    
    const N = tokens.length;
    const decayed: P3Seed[] = [];
    
    tokens.forEach((token, index) => {
      const k = index + 1; // 1-indexed position
      const decayFactor = Math.pow(V3_EVIDENCE.DECAY_LAMBDA, N - k);
      
      let effective_weight: number;
      if (source === 'fh') {
        // FH seeds: f_expo * decay
        effective_weight = token.weight * decayFactor;
      } else {
        // P3 tokens: just decay
        effective_weight = decayFactor;
      }
      
      const seed: P3Seed = {
        verdict: token.verdict,
        effective_weight,
        is_seed: source === 'fh',
        source
      };
      
      decayed.push(seed);
    });
    
    return decayed;
  }

  /**
   * Calculate exposure-based baselines per line
   * expo=0 → 4 items, expo=1-2 → 3 items, expo≥3 → 2 items
   */
  calculateBaselines(): Record<Line, number> {
    const baselines: Record<Line, number> = {};
    
    this.fhData.forEach(lineData => {
      const line = lineData.line;
      if (line === this.lockedFamily) {
        baselines[line] = 0; // Face-lock: no Phase 3 items
      } else {
        baselines[line] = V3_BASELINES.getBaseline(lineData.tokens.length);
      }
    });
    
    return baselines;
  }

  /**
   * Calculate compensation scores for early FH exit
   * ExposurePenalty + FRiskBonus to prioritize under-exposed lines
   */
  calculateCompensationScore(line: Line, lineFHData: FHSeedData): number {
    const expo = lineFHData.tokens.length;
    const fRisk = lineFHData.f_risk;
    
    // Exposure penalty: compensate for early FH exit
    let exposurePenalty = 0;
    if (expo === 0) exposurePenalty = 2;      // expo=0 → +2
    else if (expo <= 2) exposurePenalty = 1;  // expo=1-2 → +1
    // else expo≥3 → +0
    
    // F-risk bonus: boost lines that showed F-risk
    const fRiskBonus = fRisk ? 1 : 0;
    
    const totalScore = exposurePenalty + fRiskBonus;
    
    console.log(`📊 Compensation score for ${line}: exposure=${expo} (penalty: +${exposurePenalty}), F-risk: ${fRisk} (bonus: +${fRiskBonus}), total: ${totalScore}`);
    
    return totalScore;
  }

  /**
   * Get compensation scores for all lines
   */
  getCompensationScores(): Record<Line, number> {
    const scores: Record<Line, number> = {};
    
    this.fhData.forEach(lineData => {
      const line = lineData.line;
      if (line !== this.lockedFamily) {
        scores[line] = this.p3Data[line].compensation_score;
      }
    });
    
    return scores;
  }

  /**
   * Add P3 token to a line's data
   */
  addP3Token(line: Line, verdict: Verdict): void {
    if (line === this.lockedFamily) return; // Face-lock line
    
    const p3Token: P3Seed = {
      verdict,
      effective_weight: 1.0, // P3 tokens have full weight initially
      is_seed: false,
      source: 'p3'
    };
    
    this.p3Data[line].seeds.push(p3Token);
    this.p3Data[line].items_asked++;
    
    // Recalculate current winner and margin
    this.updateLineStatus(line);
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
    
    console.log(`📊 ${line} status: winner=${winner}, margin=${margin.toFixed(3)}, items=${lineData.items_asked}/${lineData.baseline}`);
  }

  /**
   * Check if line meets baseline requirement
   */
  meetsBaseline(line: Line): boolean {
    if (line === this.lockedFamily) return true; // Face-lock always meets baseline
    
    const lineData = this.p3Data[line];
    return lineData.items_asked >= lineData.baseline;
  }

  /**
   * Get all lines that meet baseline
   */
  getLinesMeetingBaseline(): Line[] {
    const lines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    return lines.filter(line => this.meetsBaseline(line));
  }

  /**
   * Get current status for all lines
   */
  getAllLineStatus(): Record<Line, P3LineData> {
    return this.p3Data;
  }

  /**
   * Get lines eligible for Phase 3 assessment
   */
  getEligibleLines(): Line[] {
    const lines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    return lines.filter(line => 
      line !== this.lockedFamily && 
      this.p3Data[line].items_asked < 4 // P3_MAX
    );
  }

  /**
   * Get debug information
   */
  getDebugInfo(): {
    fhData: FHSeedData[];
    p3Data: Record<Line, P3LineData>;
    lockedFamily: Line | null;
    baselines: Record<Line, number>;
    compensationScores: Record<Line, number>;
  } {
    return {
      fhData: this.fhData,
      p3Data: this.p3Data,
      lockedFamily: this.lockedFamily,
      baselines: this.calculateBaselines(),
      compensationScores: this.getCompensationScores()
    };
  }

  /**
   * Reset bridge state (for testing)
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
    
    this.fhData = [];
    this.lockedFamily = null;
  }
}

export default FHBridge;
