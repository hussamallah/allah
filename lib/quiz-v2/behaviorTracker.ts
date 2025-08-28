// Behavior Tracker - Implements behavior analysis, instability detection, and R-Index calculation
// This is the core V3 component for behavior integration and reliability scoring

import { Line, Verdict, BehaviorSample } from '../../types/quiz-v2';
import { V3_INSTABILITY, V3_R_INDEX, V3_UTILS } from './v3Config';

export interface BehaviorMetrics {
  totalItems: number;
  cleanItems: number;
  hesitantItems: number;
  unstableItems: number;
  underClockHits: number;
  underClockTotal: number;
  averageLatency: number;
  averageSwitches: number;
  averageDeliberation: number;
}

export interface RIndexComponents {
  choicesNorm: number;      // 0.60 weight - based on early stops, margins, items needed
  behaviorNorm: number;     // 0.25 weight - balance of clean vs hesitant items
  underClockNorm: number;   // 0.15 weight - under_clock_hits / under_clock_total
  totalRIndex: number;      // Weighted sum
  styleLabel: string;       // Decisive & Clean, Deliberate, Hesitant, Unsettled
}

export interface LineBehaviorSummary {
  line: Line;
  itemsAsked: number;
  cleanItems: number;
  hesitantItems: number;
  unstableItems: number;
  averageLatency: number;
  averageSwitches: number;
  averageDeliberation: number;
}

export class BehaviorTracker {
  private behaviorSamples: BehaviorSample[] = [];
  private lineBehavior: Record<Line, BehaviorSample[]> = {};
  private underClockProbes: Set<string> = new Set();
  private underClockHits: Set<string> = new Set();

  constructor() {
    // Initialize empty behavior tracking for all lines
    const lines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    lines.forEach(line => {
      this.lineBehavior[line] = [];
    });
  }

  /**
   * Record behavior for a quiz item
   */
  recordBehavior(
    itemId: string,
    line: Line,
    verdict: Verdict,
    behavior: Omit<BehaviorSample, 'unstable_item'>
  ): BehaviorSample {
    // Detect if this item is unstable
    const unstableItem = V3_INSTABILITY.isUnstable(behavior);
    
    // Create complete behavior sample
    const behaviorSample: BehaviorSample = {
      ...behavior,
      unstable_item: unstableItem
    };
    
    // Store behavior sample
    this.behaviorSamples.push(behaviorSample);
    this.lineBehavior[line].push(behaviorSample);
    
    // Track under-clock probes
    if (behavior.under_clock_hit) {
      this.underClockProbes.add(itemId);
      if (unstableItem) {
        this.underClockHits.add(itemId);
      }
    }
    
    console.log(`📊 Behavior recorded: ${line} → ${verdict}, unstable: ${unstableItem}`);
    
    return behaviorSample;
  }

  /**
   * Detect instability in behavior sample
   */
  detectInstability(behavior: BehaviorSample): boolean {
    return V3_INSTABILITY.isUnstable(behavior);
  }

  /**
   * Get behavior metrics for all items
   */
  getBehaviorMetrics(): BehaviorMetrics {
    const totalItems = this.behaviorSamples.length;
    const cleanItems = this.behaviorSamples.filter(b => !b.unstable_item).length;
    const hesitantItems = this.behaviorSamples.filter(b => b.unstable_item).length;
    const unstableItems = hesitantItems;
    
    const underClockTotal = this.underClockProbes.size;
    const underClockHits = this.underClockHits.size;
    
    const averageLatency = totalItems > 0 
      ? this.behaviorSamples.reduce((sum, b) => sum + b.latency_ms, 0) / totalItems 
      : 0;
    
    const averageSwitches = totalItems > 0 
      ? this.behaviorSamples.reduce((sum, b) => sum + b.switches, 0) / totalItems 
      : 0;
    
    const averageDeliberation = totalItems > 0 
      ? this.behaviorSamples.reduce((sum, b) => sum + b.deliberation_ms, 0) / totalItems 
      : 0;
    
    return {
      totalItems,
      cleanItems,
      hesitantItems,
      unstableItems,
      underClockHits,
      underClockTotal,
      averageLatency,
      averageSwitches,
      averageDeliberation
    };
  }

  /**
   * Get behavior summary for a specific line
   */
  getLineBehaviorSummary(line: Line): LineBehaviorSummary {
    const lineSamples = this.lineBehavior[line] || [];
    const itemsAsked = lineSamples.length;
    const cleanItems = lineSamples.filter(b => !b.unstable_item).length;
    const hesitantItems = lineSamples.filter(b => b.unstable_item).length;
    const unstableItems = hesitantItems;
    
    const averageLatency = itemsAsked > 0 
      ? lineSamples.reduce((sum, b) => sum + b.latency_ms, 0) / itemsAsked 
      : 0;
    
    const averageSwitches = itemsAsked > 0 
      ? lineSamples.reduce((sum, b) => sum + b.switches, 0) / itemsAsked 
      : 0;
    
    const averageDeliberation = itemsAsked > 0 
      ? lineSamples.reduce((sum, b) => sum + b.deliberation_ms, 0) / itemsAsked 
      : 0;
    
    return {
      line,
      itemsAsked,
      cleanItems,
      hesitantItems,
      unstableItems,
      averageLatency,
      averageSwitches,
      averageDeliberation
    };
  }

  /**
   * Calculate R-Index (Global Reliability)
   * R = 0.60*ChoicesNorm + 0.25*BehaviorNorm + 0.15*UnderClockNorm
   */
  calculateRIndex(
    choicesData: {
      earlyStops: number;      // Lines that stopped at 2 items
      totalLines: number;      // Total lines assessed
      averageMargin: number;   // Average margin across all lines
      itemsNeeded: number[];   // Array of items needed per line
    }
  ): RIndexComponents {
    // Calculate ChoicesNorm (0..1)
    const choicesNorm = this.calculateChoicesNorm(choicesData);
    
    // Calculate BehaviorNorm (0..1)
    const behaviorNorm = this.calculateBehaviorNorm();
    
    // Calculate UnderClockNorm (0..1)
    const underClockNorm = this.calculateUnderClockNorm();
    
    // Calculate weighted R-Index
    const totalRIndex = 
      V3_R_INDEX.WEIGHTS.CHOICES * choicesNorm +
      V3_R_INDEX.WEIGHTS.BEHAVIOR * behaviorNorm +
      V3_R_INDEX.WEIGHTS.UNDER_CLOCK * underClockNorm;
    
    // Get style label
    const styleLabel = V3_R_INDEX.getStyleLabel(totalRIndex * 100);
    
    const rIndex: RIndexComponents = {
      choicesNorm,
      behaviorNorm,
      underClockNorm,
      totalRIndex,
      styleLabel
    };
    
    console.log(`📊 R-Index calculated: ${(totalRIndex * 100).toFixed(1)} (${styleLabel})`);
    console.log(`   Choices: ${(choicesNorm * 100).toFixed(1)}%, Behavior: ${(behaviorNorm * 100).toFixed(1)}%, UnderClock: ${(underClockNorm * 100).toFixed(1)}%`);
    
    return rIndex;
  }

  /**
   * Calculate ChoicesNorm based on choice patterns
   */
  private calculateChoicesNorm(choicesData: {
    earlyStops: number;
    totalLines: number;
    averageMargin: number;
    itemsNeeded: number[];
  }): number {
    const { earlyStops, totalLines, averageMargin, itemsNeeded } = choicesData;
    
    // Early stops bonus (0.4 weight)
    const earlyStopScore = earlyStops / totalLines;
    
    // Margin bonus (0.3 weight)
    const marginScore = Math.min(averageMargin / 0.5, 1.0); // Normalize to 0.5 max
    
    // Items efficiency bonus (0.3 weight)
    const avgItemsNeeded = itemsNeeded.reduce((sum, items) => sum + items, 0) / itemsNeeded.length;
    const efficiencyScore = Math.max(0, (4 - avgItemsNeeded) / 2); // 2 items = 1.0, 4 items = 0.0
    
    const choicesNorm = 0.4 * earlyStopScore + 0.3 * marginScore + 0.3 * efficiencyScore;
    
    return Math.max(0, Math.min(1, choicesNorm));
  }

  /**
   * Calculate BehaviorNorm based on clean vs hesitant balance
   */
  private calculateBehaviorNorm(): number {
    const metrics = this.getBehaviorMetrics();
    
    if (metrics.totalItems === 0) return 0.5; // Neutral if no data
    
    // Clean items get positive score, hesitant items get negative score
    const cleanRatio = metrics.cleanItems / metrics.totalItems;
    const hesitantRatio = metrics.hesitantItems / metrics.totalItems;
    
    // Balance score: clean items boost, hesitant items reduce
    let behaviorNorm = cleanRatio - (hesitantRatio * 0.5); // Hesitant items have less penalty
    
    // Cap extreme values to avoid outliers dominating
    behaviorNorm = Math.max(0, Math.min(1, behaviorNorm));
    
    return behaviorNorm;
  }

  /**
   * Calculate UnderClockNorm based on under-clock performance
   */
  private calculateUnderClockNorm(): number {
    const metrics = this.getBehaviorMetrics();
    
    if (metrics.underClockTotal === 0) return 0.5; // Neutral if no under-clock probes
    
    // Under-clock hits indicate instability, so we invert the ratio
    // Fewer hits = higher reliability
    const hitRatio = metrics.underClockHits / metrics.underClockTotal;
    const underClockNorm = 1 - hitRatio;
    
    return underClockNorm;
  }

  /**
   * Get style label for a given R-Index score
   */
  getStyleLabel(rIndex: number): string {
    return V3_R_INDEX.getStyleLabel(rIndex);
  }

  /**
   * Get comprehensive behavior analysis
   */
  getBehaviorAnalysis(): {
    metrics: BehaviorMetrics;
    lineSummaries: Record<Line, LineBehaviorSummary>;
    underClockAnalysis: {
      total: number;
      hits: number;
      missRate: number;
      reliability: number;
    };
  } {
    const metrics = this.getBehaviorMetrics();
    const lineSummaries: Record<Line, LineBehaviorSummary> = {};
    
    const lines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    lines.forEach(line => {
      lineSummaries[line] = this.getLineBehaviorSummary(line);
    });
    
    const underClockAnalysis = {
      total: metrics.underClockTotal,
      hits: metrics.underClockHits,
      missRate: metrics.underClockTotal > 0 ? metrics.underClockHits / metrics.underClockTotal : 0,
      reliability: metrics.underClockTotal > 0 ? (metrics.underClockTotal - metrics.underClockHits) / metrics.underClockTotal : 1
    };
    
    return {
      metrics,
      lineSummaries,
      underClockAnalysis
    };
  }

  /**
   * Reset behavior tracker state (for testing)
   */
  reset(): void {
    this.behaviorSamples = [];
    this.lineBehavior = {};
    this.underClockProbes.clear();
    this.underClockHits.clear();
    
    const lines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    lines.forEach(line => {
      this.lineBehavior[line] = [];
    });
  }

  /**
   * Get debug information
   */
  getDebugInfo(): {
    behaviorSamples: BehaviorSample[];
    lineBehavior: Record<Line, BehaviorSample[]>;
    underClockProbes: string[];
    underClockHits: string[];
    metrics: BehaviorMetrics;
  } {
    return {
      behaviorSamples: this.behaviorSamples,
      lineBehavior: this.lineBehavior,
      underClockProbes: Array.from(this.underClockProbes),
      underClockHits: Array.from(this.underClockHits),
      metrics: this.getBehaviorMetrics()
    };
  }
}

export default BehaviorTracker;
