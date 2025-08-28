// FH Token Engine - Core V3 innovation that converts FH behavior into C/O tokens
// Implements the exact specification: no F tokens in FH, exposure-weighted C/O tokens

import { Line, Verdict, BehaviorSample } from '../../types/quiz-v2';
import { V3_EVIDENCE, V3_BEHAVIOR } from './v3Config';

export interface FHToken {
  verdict: Verdict;      // C or O (never F in FH)
  weight: number;         // f_expo weight (0.00, 0.50, 0.80, 1.00)
  is_seed: boolean;       // true for FH tokens (vs P3 tokens)
  behavior: BehaviorSample; // Behavior data for this token
  timestamp: number;      // When token was emitted
}

export interface FHSeedData {
  line: Line;
  tokens: FHToken[];
  f_risk: boolean;        // fh_f_risk: expo≥2 and hits=0
  instability: boolean;    // fh_instability: at least one unstable pick
}

export class FHTokenEngine {
  private tokens: Record<Line, FHToken[]> = {};
  private fRiskFlags: Record<Line, boolean> = {};
  private instabilityFlags: Record<Line, boolean> = {};

  constructor() {
    // Initialize empty token arrays for all lines
    const lines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    lines.forEach(line => {
      this.tokens[line] = [];
      this.fRiskFlags[line] = false;
      this.instabilityFlags[line] = false;
    });
  }

  /**
   * Emit a token for a line based on behavior analysis
   * FH produces C/O tokens only (never F tokens)
   */
  emitToken(line: Line, behavior: BehaviorSample): Verdict {
    // Determine verdict based on behavior stability
    const verdict = this.detectInstability(behavior) ? 'O' : 'C';
    
    // Calculate exposure weight for this line
    const currentTokens = this.tokens[line];
    const expo = currentTokens.length + 1; // +1 because we're about to add this token
    const weight = V3_EVIDENCE.FH_EXPOSURE_WEIGHTS[expo] || 1.0;
    
    // Create token
    const token: FHToken = {
      verdict,
      weight,
      is_seed: true, // All FH tokens are seeds
      behavior,
      timestamp: Date.now()
    };
    
    // Store token
    this.tokens[line].push(token);
    
    // Update instability flag if this token is unstable
    if (verdict === 'O') {
      this.instabilityFlags[line] = true;
    }
    
    console.log(`🎯 FH Token emitted: ${line} → ${verdict} (weight: ${weight}, unstable: ${verdict === 'O'})`);
    
    return verdict;
  }

  /**
   * Calculate f_expo weight for a given exposure count
   * fh_expo=0 → f_expo=0.00, 1-2→0.50, 3-5→0.80, ≥6→1.00
   */
  calculateFExpoWeight(expo: number): number {
    return V3_EVIDENCE.FH_EXPOSURE_WEIGHTS[expo] || 1.0;
  }

  /**
   * Detect F-risk: lines with expo≥2 and hits=0
   * This is calculated after FH exit, not during token emission
   */
  detectFRisk(line: Line): boolean {
    const lineTokens = this.tokens[line];
    const expo = lineTokens.length;
    const hits = lineTokens.filter(t => t.verdict === 'C').length;
    
    // F-risk: expo≥2 and hits=0
    const fRisk = expo >= 2 && hits === 0;
    
    if (fRisk) {
      console.log(`⚠️ F-risk detected for ${line}: expo=${expo}, hits=${hits}`);
    }
    
    return fRisk;
  }

  /**
   * Detect instability in behavior sample
   * Any threshold exceeded → unstable → O token
   */
  detectInstability(behavior: BehaviorSample): boolean {
    return V3_BEHAVIOR.isHesitantBehavior(behavior);
  }

  /**
   * Get all FH tokens for a line
   */
  getTokens(line: Line): FHToken[] {
    return this.tokens[line] || [];
  }

  /**
   * Get FH seeds for Phase 3 initialization
   * Returns tokens with their base weights (before decay)
   */
  getFHSeeds(): Record<Line, Array<{verdict: Verdict, weight: number}>> {
    const seeds: Record<Line, Array<{verdict: Verdict, weight: number}>> = {};
    
    Object.entries(this.tokens).forEach(([line, tokens]) => {
      seeds[line as Line] = tokens.map(token => ({
        verdict: token.verdict,
        weight: token.weight
      }));
    });
    
    return seeds;
  }

  /**
   * Get F-risk flags for all lines
   * Must be called after FH exit to calculate final F-risk
   */
  getFRiskFlags(): Record<Line, boolean> {
    const lines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    
    lines.forEach(line => {
      this.fRiskFlags[line] = this.detectFRisk(line);
    });
    
    return this.fRiskFlags;
  }

  /**
   * Get instability flags for all lines
   */
  getInstabilityFlags(): Record<Line, boolean> {
    return this.instabilityFlags;
  }

  /**
   * Get summary data for a line
   */
  getLineSummary(line: Line): {
    tokens: FHToken[];
    expo: number;
    hits: number;
    f_risk: boolean;
    instability: boolean;
    average_weight: number;
  } {
    const lineTokens = this.tokens[line];
    const expo = lineTokens.length;
    const hits = lineTokens.filter(t => t.verdict === 'C').length;
    const f_risk = this.fRiskFlags[line];
    const instability = this.instabilityFlags[line];
    const average_weight = expo > 0 ? lineTokens.reduce((sum, t) => sum + t.weight, 0) / expo : 0;
    
    return {
      tokens: lineTokens,
      expo,
      hits,
      f_risk,
      instability,
      average_weight
    };
  }

  /**
   * Get comprehensive FH data for Phase 3 bridge
   */
  getFHData(): Record<Line, FHSeedData> {
    const lines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    const data: Record<Line, FHSeedData> = {};
    
    lines.forEach(line => {
      data[line] = {
        line,
        tokens: this.tokens[line],
        f_risk: this.fRiskFlags[line],
        instability: this.instabilityFlags[line]
      };
    });
    
    return data;
  }

  /**
   * Reset engine state (for testing)
   */
  reset(): void {
    const lines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    lines.forEach(line => {
      this.tokens[line] = [];
      this.fRiskFlags[line] = false;
      this.instabilityFlags[line] = false;
    });
  }

  /**
   * Get debug information
   */
  getDebugInfo(): {
    tokens: Record<Line, FHToken[]>;
    fRiskFlags: Record<Line, boolean>;
    instabilityFlags: Record<Line, boolean>;
    summaries: Record<Line, ReturnType<typeof this.getLineSummary>>;
  } {
    const lines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    const summaries: Record<Line, ReturnType<typeof this.getLineSummary>> = {};
    
    lines.forEach(line => {
      summaries[line] = this.getLineSummary(line);
    });
    
    return {
      tokens: this.tokens,
      fRiskFlags: this.fRiskFlags,
      instabilityFlags: this.instabilityFlags,
      summaries
    };
  }
}

export default FHTokenEngine;
