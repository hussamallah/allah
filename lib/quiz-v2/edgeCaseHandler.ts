// Edge Case Handler - Implements early FH exit handling, contradiction resolution, and soft recommendations
// This is the V3 component for handling edge cases and ensuring robustness

import { Line, Verdict } from '../../types/quiz-v2';
import { V3_FLOW, V3_BASELINES, V3_UTILS } from './v3Config';
import { P3LineData } from './fhBridge';
import { BehaviorTracker } from './behaviorTracker';

export interface EarlyExitAnalysis {
  exitScreen: number;
  underExposedLines: Line[];
  compensationNeeded: boolean;
  baselineAdjustments: Record<Line, number>;
  recommendations: string[];
}

export interface ContradictionAnalysis {
  hasContradiction: boolean;
  contradictionType: 'face-lock-vs-phase3' | 'low-reliability' | 'none';
  severity: 'low' | 'medium' | 'high';
  affectedLines: Line[];
  recommendations: string[];
  softRecommendation: string | null;
}

export interface EdgeCaseRecommendations {
  earlyExit: EarlyExitAnalysis;
  contradictions: ContradictionAnalysis;
  overallRecommendations: string[];
  reliabilityWarning: boolean;
}

export class EdgeCaseHandler {
  /**
   * Analyze early FH exit and determine compensation needed
   */
  analyzeEarlyExit(
    exitScreen: number,
    fhExpo: Record<Line, number>,
    lockedFamily: Line
  ): EarlyExitAnalysis {
    const underExposedLines: Line[] = [];
    const baselineAdjustments: Record<Line, number> = {};
    
    // Determine which lines are under-exposed
    Object.entries(fhExpo).forEach(([line, expo]) => {
      if (line === lockedFamily) return; // Face-lock line
      
      if (expo < 3) {
        underExposedLines.push(line as Line);
        
        // Calculate baseline adjustment based on exposure
        if (expo === 0) {
          baselineAdjustments[line as Line] = 4; // Maximum compensation
        } else if (expo <= 2) {
          baselineAdjustments[line as Line] = 3; // Moderate compensation
        } else {
          baselineAdjustments[line as Line] = 2; // Standard baseline
        }
      } else {
        baselineAdjustments[line as Line] = 2; // Standard baseline
      }
    });
    
    const compensationNeeded = underExposedLines.length > 0;
    
    // Generate recommendations
    const recommendations: string[] = [];
    if (compensationNeeded) {
      recommendations.push(`Early exit at Q${exitScreen} detected - ${underExposedLines.length} lines under-exposed`);
      recommendations.push('Baseline adjustments applied to compensate for limited FH exposure');
      recommendations.push('Scheduler will prioritize under-exposed lines in Phase 3');
    }
    
    return {
      exitScreen,
      underExposedLines,
      compensationNeeded,
      baselineAdjustments,
      recommendations
    };
  }

  /**
   * Detect and analyze contradictions between face-lock and Phase 3 results
   */
  analyzeContradictions(
    lockedFamily: Line,
    phase3Results: Record<Line, P3LineData>,
    behaviorTracker: BehaviorTracker
  ): ContradictionAnalysis {
    let hasContradiction = false;
    let contradictionType: ContradictionAnalysis['contradictionType'] = 'none';
    let severity: ContradictionAnalysis['severity'] = 'low';
    const affectedLines: Line[] = [];
    const recommendations: string[] = [];
    
    // Check for face-lock vs Phase 3 contradictions
    const nonFamilyLines = Object.entries(phase3Results).filter(([line]) => line !== lockedFamily);
    const fractureLines = nonFamilyLines.filter(([, data]) => data.current_winner === 'F');
    
    if (fractureLines.length > 0) {
      // Get behavior analysis for reliability assessment
      const behaviorAnalysis = behaviorTracker.getBehaviorAnalysis();
      const rIndex = behaviorTracker.calculateRIndex({
        earlyStops: 0, // TODO: Calculate from actual data
        totalLines: nonFamilyLines.length,
        averageMargin: 0.5, // TODO: Calculate from actual data
        itemsNeeded: [2, 3, 4] // TODO: Calculate from actual data
      });
      
      // Check if reliability is very low
      if (rIndex.totalRIndex < 0.4) {
        hasContradiction = true;
        contradictionType = 'low-reliability';
        severity = 'high';
        affectedLines.push(...fractureLines.map(([line]) => line as Line));
        
        recommendations.push('Low reliability detected - consider retest recommendation');
        recommendations.push('Multiple F verdicts in non-family lines with low confidence');
      } else if (fractureLines.length >= 3) {
        hasContradiction = true;
        contradictionType = 'face-lock-vs-phase3';
        severity = 'medium';
        affectedLines.push(...fractureLines.map(([line]) => line as Line));
        
        recommendations.push('Multiple F verdicts suggest potential face-lock reconsideration');
        recommendations.push('Review locked family decision against Phase 3 evidence');
      }
    }
    
    // Generate soft recommendation if needed
    let softRecommendation: string | null = null;
    if (hasContradiction && severity === 'high') {
      softRecommendation = 'Your session showed low reliability; consider a retest';
    } else if (hasContradiction && severity === 'medium') {
      softRecommendation = 'Consider reviewing results with additional context';
    }
    
    return {
      hasContradiction,
      contradictionType,
      severity,
      affectedLines,
      recommendations,
      softRecommendation
    };
  }

  /**
   * Handle edge case: FH ends at Q2 with minimal exposure
   */
  handleQ2Exit(
    fhExpo: Record<Line, number>,
    lockedFamily: Line
  ): EarlyExitAnalysis {
    console.log(`⚠️ Edge case: FH exit at Q2 detected`);
    
    // Q2 exit means most lines have very limited exposure
    const analysis = this.analyzeEarlyExit(2, fhExpo, lockedFamily);
    
    // Add Q2-specific recommendations
    analysis.recommendations.push('Q2 exit: Most lines have minimal exposure (0-1 items)');
    analysis.recommendations.push('Phase 3 will spend more time on baseline establishment');
    analysis.recommendations.push('Consider extending FH if user engagement allows');
    
    return analysis;
  }

  /**
   * Handle edge case: FH ends at Q4/Q6 with moderate exposure
   */
  handleQ4Q6Exit(
    exitScreen: number,
    fhExpo: Record<Line, number>,
    lockedFamily: Line
  ): EarlyExitAnalysis {
    console.log(`⚠️ Edge case: FH exit at Q${exitScreen} detected`);
    
    const analysis = this.analyzeEarlyExit(exitScreen, fhExpo, lockedFamily);
    
    // Add Q4/Q6-specific recommendations
    analysis.recommendations.push(`Q${exitScreen} exit: Some lines have adequate exposure (≥3 items)`);
    analysis.recommendations.push('Phase 3 can use early stop rules for well-exposed lines');
    analysis.recommendations.push('Focus remaining budget on under-exposed lines');
    
    return analysis;
  }

  /**
   * Validate that no lock occurred on Q1
   */
  validateNoQ1Lock(lockScreen: number): boolean {
    if (lockScreen < 2) {
      console.error(`❌ V3 Violation: Lock attempted on Q${lockScreen}, minimum is Q2`);
      return false;
    }
    return true;
  }

  /**
   * Validate that F tokens are never emitted in FH
   */
  validateNoFInFH(fhTokens: Record<Line, Array<{verdict: Verdict, weight: number}>>): boolean {
    let hasFViolation = false;
    
    Object.entries(fhTokens).forEach(([line, tokens]) => {
      tokens.forEach(token => {
        if (token.verdict === 'F') {
          console.error(`❌ V3 Violation: F token emitted in FH for ${line}`);
          hasFViolation = true;
        }
      });
    });
    
    return !hasFViolation;
  }

  /**
   * Validate Phase 3 baselines are met
   */
  validatePhase3Baselines(
    phase3Results: Record<Line, P3LineData>,
    lockedFamily: Line
  ): boolean {
    let allBaselinesMet = true;
    
    Object.entries(phase3Results).forEach(([line, data]) => {
      if (line === lockedFamily) return; // Face-lock line
      
      const baseline = data.baseline;
      const itemsAsked = data.items_asked;
      
      if (itemsAsked < baseline) {
        console.error(`❌ V3 Violation: ${line} below baseline: ${itemsAsked}/${baseline}`);
        allBaselinesMet = false;
      }
    });
    
    return allBaselinesMet;
  }

  /**
   * Validate budget constraints
   */
  validateBudget(
    budgetUsed: number,
    maxBudget: number
  ): boolean {
    if (budgetUsed > maxBudget) {
      console.error(`❌ V3 Violation: Budget exceeded: ${budgetUsed}/${maxBudget}`);
      return false;
    }
    
    if (budgetUsed < 0) {
      console.error(`❌ V3 Violation: Negative budget: ${budgetUsed}`);
      return false;
    }
    
    return true;
  }

  /**
   * Get comprehensive edge case analysis
   */
  getEdgeCaseAnalysis(
    fhExitScreen: number,
    fhExpo: Record<Line, number>,
    lockedFamily: Line,
    phase3Results: Record<Line, P3LineData>,
    behaviorTracker: BehaviorTracker,
    budgetUsed: number
  ): EdgeCaseRecommendations {
    // Analyze early exit
    let earlyExit: EarlyExitAnalysis;
    if (fhExitScreen === 2) {
      earlyExit = this.handleQ2Exit(fhExpo, lockedFamily);
    } else if (fhExitScreen === 4 || fhExitScreen === 6) {
      earlyExit = this.handleQ4Q6Exit(fhExitScreen, fhExpo, lockedFamily);
    } else {
      earlyExit = this.analyzeEarlyExit(fhExitScreen, fhExpo, lockedFamily);
    }
    
    // Analyze contradictions
    const contradictions = this.analyzeContradictions(lockedFamily, phase3Results, behaviorTracker);
    
    // Validate V3 invariants
    const validations = {
      noQ1Lock: this.validateNoQ1Lock(fhExitScreen),
      noFInFH: true, // TODO: Validate actual FH tokens
      baselinesMet: this.validatePhase3Baselines(phase3Results, lockedFamily),
      budgetValid: this.validateBudget(budgetUsed, V3_FLOW.P3_BUDGET)
    };
    
    // Generate overall recommendations
    const overallRecommendations: string[] = [];
    
    if (!validations.noQ1Lock) {
      overallRecommendations.push('CRITICAL: V3 violation - lock attempted before Q2');
    }
    
    if (!validations.baselinesMet) {
      overallRecommendations.push('WARNING: Some lines below Phase 3 baseline');
    }
    
    if (!validations.budgetValid) {
      overallRecommendations.push('WARNING: Budget validation failed');
    }
    
    if (earlyExit.compensationNeeded) {
      overallRecommendations.push('INFO: Early exit compensation applied');
    }
    
    if (contradictions.hasContradiction) {
      overallRecommendations.push(`WARNING: ${contradictions.contradictionType} detected`);
    }
    
    const reliabilityWarning = contradictions.severity === 'high';
    
    return {
      earlyExit,
      contradictions,
      overallRecommendations,
      reliabilityWarning
    };
  }

  /**
   * Get debug information
   */
  getDebugInfo(): {
    version: string;
    description: string;
    edgeCases: string[];
    validations: string[];
  } {
    return {
      version: 'V3.0',
      description: 'Edge Case Handler for early exits, contradictions, and V3 validation',
      edgeCases: [
        'Q2 exit with minimal exposure',
        'Q4/Q6 exit with moderate exposure',
        'Face-lock vs Phase 3 contradictions',
        'Low reliability scenarios'
      ],
      validations: [
        'No lock on Q1',
        'No F tokens in FH',
        'Phase 3 baselines met',
        'Budget constraints respected'
      ]
    };
  }
}

export default EdgeCaseHandler;
