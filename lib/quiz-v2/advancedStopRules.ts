// Advanced Stop Rules - Implements early stop @2, special override 2C+1F→O, and confidence bands
// This is the core V3 component for intelligent question stopping and confidence assessment

import { Line, Verdict } from '../../types/quiz-v2';
import { V3_AMBIGUITY, V3_OVERRIDES, V3_UTILS } from './v3Config';
import { P3LineData } from './fhBridge';

export interface StopDecision {
  shouldStop: boolean;
  reason: 'early_stop_2' | 'standard_stop_3' | 'forced_stop_4' | 'continue';
  confidence: 'high' | 'medium' | 'low' | 'face-lock';
  margin: number;
  winner: Verdict;
  itemsAsked: number;
}

export interface ConfidenceAssessment {
  confidence: 'high' | 'medium' | 'low' | 'face-lock';
  reason: string;
  margin: number;
  itemsAsked: number;
  earlyStopEligible: boolean;
  specialOverrideApplied: boolean;
}

export class AdvancedStopRules {
  /**
   * Check if line should stop after 2 items (early C stop)
   */
  shouldStopAfterTwo(
    line: Line,
    lineData: P3LineData,
    fhExpo: number,
    instabilityFlag: boolean
  ): boolean {
    if (lineData.items_asked < 2) return false;
    
    const winner = lineData.current_winner;
    const margin = lineData.current_margin;
    
    // Early stop @2 conditions:
    // 1. Winner is C
    // 2. Margin ≥ 0.25 (Very Clear)
    // 3. No instability flag
    // 4. FH exposure ≥ 3
    return V3_UTILS.isEarlyCStopEligible(winner, margin, instabilityFlag, fhExpo);
  }

  /**
   * Check if line should stop after 3 items (standard stop)
   */
  shouldStopAfterThree(
    line: Line,
    lineData: P3LineData,
    baseline: number
  ): boolean {
    if (lineData.items_asked < 3) return false;
    
    // Standard stop @3 conditions:
    // 1. At least 3 items asked
    // 2. Baseline met
    // 3. Margin ≥ 0.22 (Clear)
    const margin = lineData.current_margin;
    const baselineMet = lineData.items_asked >= baseline;
    const marginClear = margin >= V3_AMBIGUITY.BANDS.CLEAR;
    
    return baselineMet && marginClear;
  }

  /**
   * Check if line should stop after 4 items (forced stop)
   */
  shouldStopAfterFour(lineData: P3LineData): boolean {
    // Always stop at 4 items
    return lineData.items_asked >= 4;
  }

  /**
   * Determine if line should stop and why
   */
  evaluateStopDecision(
    line: Line,
    lineData: P3LineData,
    fhExpo: number,
    instabilityFlag: boolean,
    baseline: number
  ): StopDecision {
    const itemsAsked = lineData.items_asked;
    const winner = lineData.current_winner;
    const margin = lineData.current_margin;
    
    // Face-lock lines don't need Phase 3 assessment
    if (lineData.confidence === 'face-lock') {
      return {
        shouldStop: true,
        reason: 'continue',
        confidence: 'face-lock',
        margin,
        winner,
        itemsAsked
      };
    }
    
    // Check early stop @2
    if (itemsAsked === 2 && this.shouldStopAfterTwo(line, lineData, fhExpo, instabilityFlag)) {
      return {
        shouldStop: true,
        reason: 'early_stop_2',
        confidence: 'high',
        margin,
        winner,
        itemsAsked
      };
    }
    
    // Check standard stop @3
    if (itemsAsked === 3 && this.shouldStopAfterThree(line, lineData, baseline)) {
      return {
        shouldStop: true,
        reason: 'standard_stop_3',
        confidence: 'medium',
        margin,
        winner,
        itemsAsked
      };
    }
    
    // Check forced stop @4
    if (this.shouldStopAfterFour(lineData)) {
      return {
        shouldStop: true,
        reason: 'forced_stop_4',
        confidence: 'low',
        margin,
        winner,
        itemsAsked
      };
    }
    
    // Continue assessment
    return {
      shouldStop: false,
      reason: 'continue',
      confidence: this.assessConfidence(lineData, margin, itemsAsked).confidence,
      margin,
      winner,
      itemsAsked
    };
  }

  /**
   * Assess confidence level for a line
   */
  assessConfidence(
    lineData: P3LineData,
    margin: number,
    itemsAsked: number
  ): ConfidenceAssessment {
    // Face-lock confidence
    if (lineData.confidence === 'face-lock') {
      return {
        confidence: 'face-lock',
        reason: 'Face-lock line (no Phase 3 assessment)',
        margin,
        itemsAsked,
        earlyStopEligible: false,
        specialOverrideApplied: false
      };
    }
    
    // High confidence: stopped at 2 with margin ≥ 0.25, or unanimous
    if (itemsAsked === 2 && margin >= V3_AMBIGUITY.BANDS.VERY_CLEAR) {
      return {
        confidence: 'high',
        reason: 'Early stop at 2 with very clear margin',
        margin,
        itemsAsked,
        earlyStopEligible: true,
        specialOverrideApplied: false
      };
    }
    
    // Check for unanimous decision
    if (this.isUnanimous(lineData)) {
      return {
        confidence: 'high',
        reason: 'Unanimous decision across all tokens',
        margin,
        itemsAsked,
        earlyStopEligible: false,
        specialOverrideApplied: false
      };
    }
    
    // Medium confidence: stopped at 3 with margin ≥ 0.22
    if (itemsAsked === 3 && margin >= V3_AMBIGUITY.BANDS.CLEAR) {
      return {
        confidence: 'medium',
        reason: 'Standard stop at 3 with clear margin',
        margin,
        itemsAsked,
        earlyStopEligible: false,
        specialOverrideApplied: false
      };
    }
    
    // Low confidence: needed 4 items OR margin < 0.22
    return {
      confidence: 'low',
      reason: itemsAsked === 4 ? 'Forced stop at 4 items' : 'Margin below clear threshold',
      margin,
      itemsAsked,
      earlyStopEligible: false,
      specialOverrideApplied: false
    };
  }

  /**
   * Check if line has unanimous decision
   */
  private isUnanimous(lineData: P3LineData): boolean {
    const seeds = lineData.seeds;
    if (seeds.length === 0) return false;
    
    const firstVerdict = seeds[0].verdict;
    return seeds.every(seed => seed.verdict === firstVerdict);
  }

  /**
   * Apply special override: 2C+1F → O
   * Only applies to first 3 P3 tokens (ignores FH seeds)
   */
  applySpecialOverride(lineData: P3LineData): Verdict | null {
    // Get only P3 tokens (not FH seeds)
    const p3Tokens = lineData.seeds.filter(seed => !seed.is_seed);
    
    // Check if we have at least 3 P3 tokens
    if (p3Tokens.length < 3) return null;
    
    // Get first 3 P3 tokens
    const firstThree = p3Tokens.slice(0, 3);
    const verdicts = firstThree.map(token => token.verdict);
    
    // Check if special override should be applied
    if (V3_OVERRIDES.shouldApply2C1FOverride(verdicts)) {
      console.log(`🎯 Special override applied: 2C+1F → O for line`);
      return 'O';
    }
    
    return null;
  }

  /**
   * Get final verdict for a line (considering special override)
   */
  getFinalVerdict(lineData: P3LineData): Verdict {
    // Check for special override first
    const overrideVerdict = this.applySpecialOverride(lineData);
    if (overrideVerdict) {
      return overrideVerdict;
    }
    
    // Return current winner
    return lineData.current_winner || 'C';
  }

  /**
   * Get comprehensive stop analysis for a line
   */
  getStopAnalysis(
    line: Line,
    lineData: P3LineData,
    fhExpo: number,
    instabilityFlag: boolean,
    baseline: number
  ): {
    stopDecision: StopDecision;
    confidenceAssessment: ConfidenceAssessment;
    finalVerdict: Verdict;
    specialOverrideApplied: boolean;
    recommendations: string[];
  } {
    const stopDecision = this.evaluateStopDecision(line, lineData, fhExpo, instabilityFlag, baseline);
    const confidenceAssessment = this.assessConfidence(lineData, lineData.current_margin || 0, lineData.items_asked);
    const finalVerdict = this.getFinalVerdict(lineData);
    const specialOverrideApplied = this.applySpecialOverride(lineData) !== null;
    
    // Generate recommendations
    const recommendations: string[] = [];
    
    if (stopDecision.reason === 'early_stop_2') {
      recommendations.push('Early stop justified: stable C with very clear margin');
    } else if (stopDecision.reason === 'standard_stop_3') {
      recommendations.push('Standard stop: clear margin achieved at 3 items');
    } else if (stopDecision.reason === 'forced_stop_4') {
      recommendations.push('Forced stop: maximum items reached');
    } else if (stopDecision.reason === 'continue') {
      if (lineData.items_asked < baseline) {
        recommendations.push('Continue: baseline not yet met');
      } else if (lineData.current_margin < V3_AMBIGUITY.BANDS.CLEAR) {
        recommendations.push('Continue: margin below clear threshold');
      } else {
        recommendations.push('Continue: additional items may improve confidence');
      }
    }
    
    if (specialOverrideApplied) {
      recommendations.push('Special override 2C+1F→O applied');
    }
    
    return {
      stopDecision,
      confidenceAssessment,
      finalVerdict,
      specialOverrideApplied,
      recommendations
    };
  }

  /**
   * Get debug information
   */
  getDebugInfo(): {
    version: string;
    description: string;
    thresholds: {
      earlyStopMargin: number;
      standardStopMargin: number;
      veryClearMargin: number;
    };
  } {
    return {
      version: 'V3.0',
      description: 'Advanced Stop Rules with early stop @2, special override, and confidence bands',
      thresholds: {
        earlyStopMargin: V3_AMBIGUITY.BANDS.VERY_CLEAR,
        standardStopMargin: V3_AMBIGUITY.BANDS.CLEAR,
        veryClearMargin: V3_AMBIGUITY.BANDS.VERY_CLEAR
      }
    };
  }
}

export default AdvancedStopRules;
