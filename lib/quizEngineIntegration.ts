// Ground Zero — Quiz Engine Integration 2.1
// Bridge between existing quiz system and new Elastic Archetype Engine

import { QuizEngine, type BehaviorSample, type QuizStep } from './quizEngine';
import { QUIZ_CONFIG } from './quizConfig';
import { getLegacyArchetypeName, getEngineArchetypeName } from './archetypeConfigs';
import type { QuizResult, ArchetypeType, TriggerType } from '../types';

// Legacy trigger mapping for backward compatibility
const legacyTriggerMapping: Record<string, string> = {
  'Control': 'Control',
  'Rejection': 'Rejection', 
  'Shame': 'Shame',
  'Overwhelm': 'Overwhelm',
  'Neglect': 'Neglect',
  'Uncertainty': 'Uncertainty',
  'Invisibility': 'Invisibility',
  // Legacy mappings
  'Freeze': 'Overwhelm',
  'Responsibility': 'Control',
  'Guilt': 'Shame'
};

export class QuizEngineIntegration {
  private engine: QuizEngine;
  private currentStep: QuizStep | "FINISHED" = "FINISHED";
  private questionStartTime: number = 0;
  private hoverStartTime: number = 0;
  private hoverRefs: number = 0;
  private switches: number = 0;
  private underClockHit: boolean = false;

  constructor(seed?: number) {
    this.engine = new QuizEngine(seed);
  }

  // Start the quiz with the new engine
  start(): QuizStep {
    this.currentStep = this.engine.start();
    this.questionStartTime = Date.now();
    this.resetBehaviorTracking();
    return this.currentStep;
  }

  // Get current question state
  getCurrentStep(): QuizStep | "FINISHED" {
    return this.currentStep;
  }

  // Get current progress info
  getProgress() {
    const currentIndex = this.engine.getIndex();
    const leaders = this.engine.getLeaders();
    return {
      currentQuestion: currentIndex + 1,
      totalQuestions: 15,
      progress: ((currentIndex + 1) / 15) * 100,
      isMilestone: (currentIndex + 1) % 3 === 0,
      leaders: {
        a1: getLegacyArchetypeName(leaders.a1),
        a2: getLegacyArchetypeName(leaders.a2),
        a3: getLegacyArchetypeName(leaders.a3),
        marginPct: leaders.marginPct,
        state: leaders.state
      }
    };
  }

  // Handle answer selection
  async handleAnswer(optionId: string): Promise<QuizStep | "FINISHED"> {
    // Calculate behavior metrics
    const behavior: BehaviorSample = this.calculateBehavior();
    
    // Apply answer to engine
    this.currentStep = this.engine.nextStepAfterAnswer(optionId, behavior);
    
    // Reset for next question
    if (this.currentStep !== "FINISHED") {
      this.questionStartTime = Date.now();
      this.resetBehaviorTracking();
    }
    
    return this.currentStep;
  }

  // Finalize and get results
  finalize(): QuizResult {
    const engineResult = this.engine.finalize();
    
    // Convert to legacy format for backward compatibility
    const legacyArchetype = getLegacyArchetypeName(engineResult.finalArchetype);
    const legacyAltArchetype = engineResult.altArchetype 
      ? getLegacyArchetypeName(engineResult.altArchetype) 
      : undefined;
    
    // Map triggers to legacy format
    const legacyTriggers = engineResult.triggers.map(t => 
      legacyTriggerMapping[t] || t
    );
    
    const legacyTriggerCounts: Record<string, number> = {};
    Object.entries(engineResult.triggerCounts).forEach(([trigger, count]) => {
      const legacyTrigger = legacyTriggerMapping[trigger] || trigger;
      legacyTriggerCounts[legacyTrigger] = count;
    });

    // Create comprehensive result
    const result: QuizResult = {
      // New engine fields
      finalArchetype: legacyArchetype,
      altArchetype: legacyAltArchetype,
      triggers: legacyTriggers,
      triggerCounts: legacyTriggerCounts,
      rIndex: engineResult.rIndex,
    
      flips: engineResult.flips,
      dual: engineResult.dual,
      audit: engineResult.audit ? {
        a1History: engineResult.audit.a1History.map(a => getLegacyArchetypeName(a)),
        margins: engineResult.audit.margins,
        top3History: engineResult.audit.top3History.map(t => ({
          a1: getLegacyArchetypeName(t.a1),
          a2: getLegacyArchetypeName(t.a2),
          a3: getLegacyArchetypeName(t.a3),
          marginPct: t.marginPct
        }))
      } : undefined,
      
      // Legacy fields for backward compatibility
      archetype: legacyArchetype,
      score: engineResult.rIndex, // Use R-Index as score
      answers: [], // Will be populated if needed
    };

    return result;
  }

  // Behavior tracking methods
  startHover() {
    this.hoverStartTime = Date.now();
  }

  endHover() {
    if (this.hoverStartTime > 0) {
      const hoverTime = Date.now() - this.hoverStartTime;
      if (hoverTime >= QUIZ_CONFIG.telemetry.hoverRefsMs) {
        this.hoverRefs++;
      }
      this.hoverStartTime = 0;
    }
  }

  recordSwitch() {
    this.switches++;
  }

  recordUnderClockHit() {
    this.underClockHit = true;
  }

  private resetBehaviorTracking() {
    this.hoverStartTime = 0;
    this.hoverRefs = 0;
    this.switches = 0;
    this.underClockHit = false;
  }

  private calculateBehavior(): BehaviorSample {
    const latencyMs = Date.now() - this.questionStartTime;
    
    return {
      latencyMs,
      switches: this.switches,
      hoverRefsMs: this.hoverRefs * QUIZ_CONFIG.telemetry.hoverRefsMs,
      underClockHit: this.underClockHit
    };
  }

  // Utility methods
  isUnderClockQuestion(): boolean {
    if (this.currentStep === "FINISHED" || this.currentStep.phase === "A") {
      return false;
    }
    return this.currentStep.underClock || false;
  }



  // Get trigger recommendations based on final results
  getTriggerRecommendations(triggerCounts: Record<string, number>): string[] {
    const triggerToCardMapping: Record<string, string> = {
      'Control': 'Face-to-Face',
      'Rejection': 'Romantic', 
      'Neglect': 'Group/Team',
      'Overwhelm': 'Mind Break',
      'Shame': 'Digital/Text',
      'Uncertainty': 'Mind Break',
      'Invisibility': 'Group/Team'
    };

    const validTriggers = Object.entries(triggerCounts)
      .filter(([, count]) => count >= 3)
      .sort(([, a], [, b]) => b - a)
      .map(([trigger]) => trigger);

    return validTriggers
      .map(trigger => triggerToCardMapping[trigger])
      .filter(Boolean);
  }
}
