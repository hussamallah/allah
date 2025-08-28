// QA & Instrumentation - Implements comprehensive logging, assertions, and validation
// This is the V3 component for quality assurance and debugging

import { Line, Verdict, BehaviorSample } from '../../types/quiz-v2';
import { V3_FLOW, V3_AMBIGUITY, V3_UTILS } from './v3Config';

export interface QALogEntry {
  timestamp: number;
  phase: 'FH' | 'FACE' | 'P3' | 'COMPLETE';
  line?: Line;
  screenIndex?: number;
  option?: 'A' | 'B' | 'C';
  token?: Verdict;
  isSeed?: boolean;
  fhExpoAtAnswer?: number;
  fhHitsAtAnswer?: number;
  behavior?: BehaviorSample;
  instabilityFlagAfter?: boolean;
  tallies?: { T_C: number; T_O: number; T_F: number; margin: number; winner: Verdict };
  scheduler?: { Severity: number; Ambiguity: number; Instability: number; ExposurePenalty: number; FRiskBonus: number; TotalScore: number };
  p3ItemsAsked?: Record<Line, number>;
  p3BudgetUsed?: number;
  [key: string]: any; // Allow additional fields
}

export interface ValidationResult {
  isValid: boolean;
  violations: string[];
  warnings: string[];
  recommendations: string[];
}

export interface QASummary {
  totalLogEntries: number;
  phases: Record<string, number>;
  violations: string[];
  warnings: string[];
  recommendations: string[];
  reliabilityScore: number;
  confidenceLevel: 'high' | 'medium' | 'low';
}

export class QAInstrumentation {
  private logEntries: QALogEntry[] = [];
  private assertions: string[] = [];
  private violations: string[] = [];
  private warnings: string[] = [];

  /**
   * Log a quiz item with comprehensive data
   */
  logQuizItem(
    phase: QALogEntry['phase'],
    data: {
      line?: Line;
      screenIndex?: number;
      option?: 'A' | 'B' | 'C';
      token?: Verdict;
      isSeed?: boolean;
      fhExpoAtAnswer?: number;
      fhHitsAtAnswer?: number;
      behavior?: BehaviorSample;
      instabilityFlagAfter?: boolean;
      tallies?: { T_C: number; T_O: number; T_F: number; margin: number; winner: Verdict };
      scheduler?: { Severity: number; Ambiguity: number; Instability: number; ExposurePenalty: number; FRiskBonus: number; TotalScore: number };
      p3ItemsAsked?: Record<Line, number>;
      p3BudgetUsed?: number;
    }
  ): void {
    const logEntry: QALogEntry = {
      timestamp: Date.now(),
      phase,
      ...data
    };
    
    this.logEntries.push(logEntry);
    
    // Log to console for debugging
    console.log(`📊 QA Log: ${phase}`, logEntry);
  }

  /**
   * Assert a V3 invariant
   */
  assert(condition: boolean, message: string, context?: any): void {
    if (!condition) {
      const assertion = `❌ V3 Assertion Failed: ${message}`;
      this.assertions.push(assertion);
      this.violations.push(assertion);
      
      if (context) {
        console.error(assertion, context);
      } else {
        console.error(assertion);
      }
    }
  }

  /**
   * Warn about potential issues
   */
  warn(message: string, context?: any): void {
    const warning = `⚠️ V3 Warning: ${message}`;
    this.warnings.push(warning);
    
    if (context) {
      console.warn(warning, context);
    } else {
      console.warn(warning);
    }
  }

  /**
   * Validate FH phase invariants
   */
  validateFHPhase(
    screen: number,
    lockScreen: number,
    fhTokens: Record<Line, Array<{verdict: Verdict, weight: number}>>,
    fhExpo: Record<Line, number>
  ): ValidationResult {
    const violations: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];
    
    // Assert no lock on Q1
    this.assert(lockScreen >= 2, `Lock attempted on Q${lockScreen}, minimum is Q2`);
    if (lockScreen < 2) {
      violations.push(`Lock attempted on Q${lockScreen}, minimum is Q2`);
    }
    
    // Assert no F tokens in FH
    let hasFViolation = false;
    Object.entries(fhTokens).forEach(([line, tokens]) => {
      tokens.forEach(token => {
        if (token.verdict === 'F') {
          hasFViolation = true;
          violations.push(`F token emitted in FH for ${line}`);
        }
      });
    });
    
    if (hasFViolation) {
      this.assert(false, 'F tokens emitted in FH phase');
    }
    
    // Validate exposure patterns
    Object.entries(fhExpo).forEach(([line, expo]) => {
      if (expo > V3_FLOW.FH_MAX) {
        warnings.push(`${line} exposure ${expo} exceeds FH_MAX ${V3_FLOW.FH_MAX}`);
      }
    });
    
    // Generate recommendations
    if (screen < 3) {
      recommendations.push('Consider extending FH for better line exposure');
    }
    
    return {
      isValid: violations.length === 0,
      violations,
      warnings,
      recommendations
    };
  }

  /**
   * Validate Phase 3 invariants
   */
  validatePhase3(
    phase3Results: Record<Line, P3LineData>,
    lockedFamily: Line,
    budgetUsed: number,
    totalBudget: number
  ): ValidationResult {
    const violations: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];
    
    // Validate budget constraints
    this.assert(budgetUsed <= totalBudget, `Budget exceeded: ${budgetUsed}/${totalBudget}`);
    if (budgetUsed > totalBudget) {
      violations.push(`Budget exceeded: ${budgetUsed}/${totalBudget}`);
    }
    
    // Validate baselines are met
    Object.entries(phase3Results).forEach(([line, data]) => {
      if (line === lockedFamily) return; // Face-lock line
      
      const baseline = data.baseline;
      const itemsAsked = data.items_asked;
      
      this.assert(itemsAsked >= baseline, `${line} below baseline: ${itemsAsked}/${baseline}`);
      if (itemsAsked < baseline) {
        violations.push(`${line} below baseline: ${itemsAsked}/${baseline}`);
      }
      
      // Check P3_MAX constraint
      if (itemsAsked > V3_FLOW.P3_MAX) {
        violations.push(`${line} exceeded P3_MAX: ${itemsAsked}/${V3_FLOW.P3_MAX}`);
      }
    });
    
    // Validate confidence levels
    Object.entries(phase3Results).forEach(([line, data]) => {
      if (line === lockedFamily) return;
      
      const confidence = data.confidence;
      if (confidence && !['high', 'medium', 'low', 'face-lock'].includes(confidence)) {
        warnings.push(`${line} has invalid confidence level: ${confidence}`);
      }
    });
    
    // Generate recommendations
    if (budgetUsed === totalBudget) {
      recommendations.push('Budget fully utilized - consider if all lines have adequate confidence');
    }
    
    return {
      isValid: violations.length === 0,
      violations,
      warnings,
      recommendations
    };
  }

  /**
   * Validate behavior data consistency
   */
  validateBehaviorData(
    behaviorSamples: BehaviorSample[],
    lineBehavior: Record<Line, BehaviorSample[]>
  ): ValidationResult {
    const violations: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];
    
    // Validate behavior sample integrity
    behaviorSamples.forEach((sample, index) => {
      // Check for reasonable latency values
      if (sample.latency_ms < 0) {
        violations.push(`Sample ${index} has negative latency: ${sample.latency_ms}`);
      }
      if (sample.latency_ms > 60000) { // 1 minute max
        warnings.push(`Sample ${index} has unusually high latency: ${sample.latency_ms}ms`);
      }
      
      // Check for reasonable switch counts
      if (sample.switches < 0) {
        violations.push(`Sample ${index} has negative switches: ${sample.switches}`);
      }
      if (sample.switches > 10) { // 10 max switches
        warnings.push(`Sample ${index} has unusually high switches: ${sample.switches}`);
      }
      
      // Check for reasonable deliberation times
      if (sample.deliberation_ms < 0) {
        violations.push(`Sample ${index} has negative deliberation: ${sample.deliberation_ms}`);
      }
      if (sample.deliberation_ms > 30000) { // 30 seconds max
        warnings.push(`Sample ${index} has unusually high deliberation: ${sample.deliberation_ms}ms`);
      }
    });
    
    // Validate line behavior consistency
    Object.entries(lineBehavior).forEach(([line, samples]) => {
      const totalSamples = samples.length;
      if (totalSamples > V3_FLOW.P3_MAX) {
        warnings.push(`${line} has more behavior samples than P3_MAX: ${totalSamples}`);
      }
    });
    
    return {
      isValid: violations.length === 0,
      violations,
      warnings,
      recommendations
    };
  }

  /**
   * Validate margin calculations
   */
  validateMargins(
    margins: Record<Line, number>
  ): ValidationResult {
    const violations: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];
    
    Object.entries(margins).forEach(([line, margin]) => {
      // Margin should be between 0 and 1
      if (margin < 0 || margin > 1) {
        violations.push(`${line} margin out of range [0,1]: ${margin}`);
      }
      
      // Check for ambiguity bands
      if (margin < V3_AMBIGUITY.BANDS.HIGHLY_AMBIGUOUS) {
        warnings.push(`${line} has highly ambiguous margin: ${margin}`);
      }
    });
    
    return {
      isValid: violations.length === 0,
      violations,
      warnings,
      recommendations
    };
  }

  /**
   * Get comprehensive QA summary
   */
  getQASummary(): QASummary {
    // Count entries by phase
    const phases: Record<string, number> = {};
    this.logEntries.forEach(entry => {
      phases[entry.phase] = (phases[entry.phase] || 0) + 1;
    });
    
    // Calculate reliability score based on violations vs total checks
    const totalChecks = this.assertions.length + this.warnings.length;
    const reliabilityScore = totalChecks > 0 ? (totalChecks - this.violations.length) / totalChecks : 1.0;
    
    // Determine confidence level
    let confidenceLevel: 'high' | 'medium' | 'low';
    if (reliabilityScore >= 0.9) {
      confidenceLevel = 'high';
    } else if (reliabilityScore >= 0.7) {
      confidenceLevel = 'medium';
    } else {
      confidenceLevel = 'low';
    }
    
    return {
      totalLogEntries: this.logEntries.length,
      phases,
      violations: this.violations,
      warnings: this.warnings,
      recommendations: this.generateRecommendations(),
      reliabilityScore,
      confidenceLevel
    };
  }

  /**
   * Generate recommendations based on violations and warnings
   */
  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    
    if (this.violations.length > 0) {
      recommendations.push('Critical violations detected - review V3 implementation');
      recommendations.push('Check FH token emission logic');
      recommendations.push('Validate Phase 3 baseline enforcement');
    }
    
    if (this.warnings.length > 0) {
      recommendations.push('Warnings detected - monitor for potential issues');
      recommendations.push('Review behavior data collection');
      recommendations.push('Check margin calculation accuracy');
    }
    
    if (this.violations.length === 0 && this.warnings.length === 0) {
      recommendations.push('No issues detected - V3 implementation appears correct');
    }
    
    return recommendations;
  }

  /**
   * Export log data for analysis
   */
  exportLogData(): {
    logEntries: QALogEntry[];
    assertions: string[];
    violations: string[];
    warnings: string[];
    summary: QASummary;
  } {
    return {
      logEntries: this.logEntries,
      assertions: this.assertions,
      violations: this.violations,
      warnings: this.warnings,
      summary: this.getQASummary()
    };
  }

  /**
   * Clear all logged data (for testing)
   */
  reset(): void {
    this.logEntries = [];
    this.assertions = [];
    this.violations = [];
    this.warnings = [];
  }

  /**
   * Get debug information
   */
  getDebugInfo(): {
    version: string;
    description: string;
    totalEntries: number;
    totalAssertions: number;
    totalViolations: number;
    totalWarnings: number;
  } {
    return {
      version: 'V3.0',
      description: 'QA & Instrumentation for comprehensive logging and validation',
      totalEntries: this.logEntries.length,
      totalAssertions: this.assertions.length,
      totalViolations: this.violations.length,
      totalWarnings: this.warnings.length
    };
  }
}

export default QAInstrumentation;
