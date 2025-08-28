// Reliability Engine - GroundZero v3 R-Index Calculation
// Implements global reliability scoring and style labeling

import { Line, Verdict } from '../../types/quiz-v2';
import { V3_FLOW, V3_CONFIDENCE } from './v3Config';

export interface ReliabilityMetrics {
  choicesNorm: number;      // 0..1 based on early stops and margins
  behaviorNorm: number;     // 0..1 balance of clean vs hesitant items
  underClockNorm: number;   // 0..1 under_clock_hits / under_clock_total
}

export interface RIndexResult {
  rIndex: number;           // 0-100 overall reliability score
  styleLabel: string;       // Decisive & Clean, Deliberate, Hesitant, Unsettled
  metrics: ReliabilityMetrics;
  breakdown: {
    choicesScore: number;   // Raw choices score before normalization
    behaviorScore: number;  // Raw behavior score before normalization
    underClockScore: number; // Raw under-clock score before normalization
  };
}

export interface LineCompletionData {
  line: Line;
  confidence: string;
  itemsAsked: number;
  finalMargin: number;
  isUnderClock: boolean;
}

export interface BehaviorSummary {
  totalItems: number;
  cleanItems: number;
  hesitantItems: number;
  underClockHits: number;
  underClockTotal: number;
}

export class ReliabilityEngine {
  private lineCompletions: LineCompletionData[] = [];
  private behaviorSummary: BehaviorSummary = {
    totalItems: 0,
    cleanItems: 0,
    hesitantItems: 0,
    underClockHits: 0,
    underClockTotal: 0
  };

  constructor() {
    // Initialize empty state
  }

  /**
   * Add line completion data for R-Index calculation
   */
  addLineCompletion(data: LineCompletionData): void {
    this.lineCompletions.push(data);
    console.log(`📊 Line completion added: ${data.line} - ${data.confidence} (${data.itemsAsked} items, margin: ${data.finalMargin.toFixed(3)})`);
  }

  /**
   * Update behavior summary for R-Index calculation
   */
  updateBehaviorSummary(clean: boolean, isUnderClock: boolean = false): void {
    this.behaviorSummary.totalItems++;
    
    if (clean) {
      this.behaviorSummary.cleanItems++;
    } else {
      this.behaviorSummary.hesitantItems++;
    }
    
    if (isUnderClock) {
      this.behaviorSummary.underClockTotal++;
      // Under-clock hits are determined by the actual outcome
    }
  }

  /**
   * Record under-clock hit (when user hits the under-clock timer)
   */
  recordUnderClockHit(): void {
    this.behaviorSummary.underClockHits++;
    console.log(`⏰ Under-clock hit recorded (${this.behaviorSummary.underClockHits}/${this.behaviorSummary.underClockTotal})`);
  }

  /**
   * Calculate R-Index using GroundZero v3 formula
   * R = 0.60 * ChoicesNorm + 0.25 * BehaviorNorm + 0.15 * UnderClockNorm
   */
  calculateRIndex(): RIndexResult {
    const metrics = this.calculateReliabilityMetrics();
    
    // Apply GroundZero v3 weights and scale to 0-100
    const rIndex = Math.round(
      (0.60 * metrics.choicesNorm + 0.25 * metrics.behaviorNorm + 0.15 * metrics.underClockNorm) * 100
    );
    
    const styleLabel = this.getStyleLabel(rIndex);
    
    console.log(`🎯 R-Index calculated: ${rIndex}/100 (${styleLabel})`);
    console.log(`📊 Breakdown: Choices=${(metrics.choicesNorm * 100).toFixed(1)}%, Behavior=${(metrics.behaviorNorm * 100).toFixed(1)}%, UnderClock=${(metrics.underClockNorm * 100).toFixed(1)}%`);
    
    return {
      rIndex,
      styleLabel,
      metrics,
      breakdown: {
        choicesScore: metrics.choicesNorm * 100,
        behaviorScore: metrics.behaviorNorm * 100,
        underClockScore: metrics.underClockNorm * 100
      }
    };
  }

  /**
   * Get reliability metrics breakdown
   */
  getReliabilityMetrics(): ReliabilityMetrics {
    return this.calculateReliabilityMetrics();
  }

  /**
   * Get behavior summary
   */
  getBehaviorSummary(): BehaviorSummary {
    return { ...this.behaviorSummary };
  }

  /**
   * Get line completion data
   */
  getLineCompletions(): LineCompletionData[] {
    return [...this.lineCompletions];
  }

  /**
   * Reset engine state (for testing)
   */
  reset(): void {
    this.lineCompletions = [];
    this.behaviorSummary = {
      totalItems: 0,
      cleanItems: 0,
      hesitantItems: 0,
      underClockHits: 0,
      underClockTotal: 0
    };
  }

  // ==================== PRIVATE METHODS ====================

  /**
   * Calculate reliability metrics for R-Index
   */
  private calculateReliabilityMetrics(): ReliabilityMetrics {
    const choicesNorm = this.calculateChoicesNorm();
    const behaviorNorm = this.calculateBehaviorNorm();
    const underClockNorm = this.calculateUnderClockNorm();
    
    return {
      choicesNorm,
      behaviorNorm,
      underClockNorm
    };
  }

  /**
   * Calculate ChoicesNorm (0..1)
   * Higher if more lines stopped early (2 items), fewer needed 4, and higher average margins
   */
  private calculateChoicesNorm(): number {
    if (this.lineCompletions.length === 0) return 0.5; // Neutral if no data
    
    let totalScore = 0;
    let maxPossibleScore = 0;
    
    this.lineCompletions.forEach(completion => {
      // Score based on items asked (fewer is better)
      let itemScore = 0;
      let maxItemScore = 0;
      
      if (completion.itemsAsked === 2) {
        itemScore = 3; // Best: stopped at 2
        maxItemScore = 3;
      } else if (completion.itemsAsked === 3) {
        itemScore = 2; // Good: stopped at 3
        maxItemScore = 3;
      } else if (completion.itemsAsked === 4) {
        itemScore = 1; // Acceptable: stopped at 4
        maxItemScore = 3;
      }
      
      // Bonus for high confidence
      if (completion.confidence === V3_CONFIDENCE.HIGH) {
        itemScore += 1;
        maxItemScore += 1;
      } else if (completion.confidence === V3_CONFIDENCE.MEDIUM) {
        itemScore += 0.5;
        maxItemScore += 1;
      }
      
      // Bonus for good margins
      if (completion.finalMargin >= 0.25) {
        itemScore += 1;
        maxItemScore += 1;
      } else if (completion.finalMargin >= 0.22) {
        itemScore += 0.5;
        maxItemScore += 1;
      }
      
      totalScore += itemScore;
      maxPossibleScore += maxItemScore;
    });
    
    // Ensure we return a proper normalized score
    const normalizedScore = maxPossibleScore > 0 ? totalScore / maxPossibleScore : 0.5;
    console.log(`🔍 ChoicesNorm calculation: totalScore=${totalScore}, maxPossibleScore=${maxPossibleScore}, normalized=${normalizedScore}`);
    return normalizedScore;
  }

  /**
   * Calculate BehaviorNorm (0..1)
   * Balance of clean vs hesitant items across all phases
   */
  private calculateBehaviorNorm(): number {
    if (this.behaviorSummary.totalItems === 0) return 0.5; // Neutral if no data
    
    const cleanRatio = this.behaviorSummary.cleanItems / this.behaviorSummary.totalItems;
    const hesitantRatio = this.behaviorSummary.hesitantItems / this.behaviorSummary.totalItems;
    
    // Cap extreme penalties to avoid outliers dominating
    const cappedCleanRatio = Math.max(0.1, Math.min(0.9, cleanRatio));
    const cappedHesitantRatio = Math.max(0.1, Math.min(0.9, hesitantRatio));
    
    // Prefer clean behavior, but don't penalize too harshly for some hesitation
    const behaviorScore = (cappedCleanRatio * 0.7) + (cappedHesitantRatio * 0.3);
    
    return behaviorScore;
  }

  /**
   * Calculate UnderClockNorm (0..1)
   * under_clock_hits / under_clock_total (only for probes asked)
   */
  private calculateUnderClockNorm(): number {
    if (this.behaviorSummary.underClockTotal === 0) return 0.5; // Neutral if no under-clock probes
    
    return this.behaviorSummary.underClockHits / this.behaviorSummary.underClockTotal;
  }

  /**
   * Get style label based on R-Index score
   */
  private getStyleLabel(rIndex: number): string {
    if (rIndex >= 80) return 'Decisive & Clean';
    if (rIndex >= 60) return 'Deliberate';
    if (rIndex >= 40) return 'Hesitant';
    return 'Unsettled';
  }

  /**
   * Get debug information
   */
  getDebugInfo(): {
    lineCompletions: LineCompletionData[];
    behaviorSummary: BehaviorSummary;
    metrics: ReliabilityMetrics;
  } {
    return {
      lineCompletions: this.lineCompletions,
      behaviorSummary: this.behaviorSummary,
      metrics: this.calculateReliabilityMetrics()
    };
  }
}

export default ReliabilityEngine;
