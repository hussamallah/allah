// Ground Zero — Quiz Engine Database Integration 2.1
// Database utilities for the Elastic Archetype Engine

import { createClient } from '@supabase/supabase-js';
import type { QuizResult, BehaviorSample, QuizStep } from './quizEngine';
import type { Archetype, Trigger } from './quizTypes';

// =============== DATABASE INTERFACES ===============

export interface DatabaseQuizResult {
  id?: number;
  user_id?: string;
  final_archetype: Archetype;
  alt_archetype?: Archetype;
  triggers: Trigger[];
  trigger_counts: Record<Trigger, number>;
  r_index: number;
  // delivery_version removed - reverting to single chamber system
  flips: number;
  dual_result: boolean;
  final_margin_pct: number;
  stability_state: 'stable' | 'volatile';
  a1_history: Archetype[];
  margin_history: number[];
  top3_history: Array<{
    a1: Archetype;
    a2: Archetype;
    a3: Archetype;
    margin_pct: number;
  }>;
  engine_version: string;
  created_at?: string;
  updated_at?: string;
}

export interface DatabaseBehavioralTelemetry {
  id?: number;
  quiz_result_id: number;
  question_index: number;
  question_phase: 'A' | 'B';
  question_id: string;
  selected_option_id: string;
  latency_ms: number;
  switches: number;
  hover_refs: number;
  under_clock_hit: boolean;
  behavior_score: number;
  normalized_latency_zscore: number;
  normalized_switches_zscore: number;
  normalized_hover_zscore: number;
  normalized_underclock_zscore: number;
  created_at?: string;
}

export interface DatabaseFlipDetectionLog {
  id?: number;
  quiz_result_id: number;
  question_index: number;
  question_phase: 'A' | 'B';
  a1_before: Archetype;
  a2_before: Archetype;
  a3_before: Archetype;
  margin_before: number;
  a1_after: Archetype;
  a2_after: Archetype;
  a3_after: Archetype;
  margin_after: number;
  flip_triggered: boolean;
  flip_reason: string;
  gate_1_triggered: boolean;
  gate_2_triggered: boolean;
  consecutive_count: number;
  created_at?: string;
}

export interface DatabaseStabilityTransition {
  id?: number;
  quiz_result_id: number;
  question_index: number;
  previous_state: 'stable' | 'volatile';
  current_state: 'stable' | 'volatile';
  margin_pct: number;
  consecutive_stable_count: number;
  transition_reason: string;
  created_at?: string;
}

export interface DatabaseLateOverrideEvent {
  id?: number;
  quiz_result_id: number;
  question_index: number;
  override_active: boolean;
  multiplier_applied: number;
  a1_score_before: number;
  a1_score_after: number;
  override_reason: string;
  created_at?: string;
}

export interface DatabaseTriggerAnalysis {
  id?: number;
  quiz_result_id: number;
  trigger_name: Trigger;
  selection_count: number;
  r_weight_sum: number;
  average_r_weight: number;
  pure_a1_selections: number;
  mixed_selections: number;
  created_at?: string;
}

// =============== DATABASE CLIENT ===============

export class QuizEngineDatabase {
  private supabase;

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  // =============== QUIZ RESULTS ===============

  async saveQuizResult(result: QuizResult, userId?: string): Promise<number> {
    const dbResult: DatabaseQuizResult = {
      user_id: userId,
      final_archetype: result.finalArchetype,
      alt_archetype: result.altArchetype,
      triggers: result.triggers,
      trigger_counts: result.triggerCounts,
      r_index: result.rIndex,
      // delivery_version removed - reverting to single chamber system
      flips: result.flips,
      dual_result: result.dual,
      final_margin_pct: result.audit?.finalMarginPct || 0,
      stability_state: result.audit?.stabilityState || 'stable',
      a1_history: result.audit?.a1History || [],
      margin_history: result.audit?.margins || [],
      top3_history: result.audit?.top3History || [],
      engine_version: '2.1.0'
    };

    const { data, error } = await this.supabase
      .from('quiz_results')
      .insert(dbResult)
      .select('id')
      .single();

    if (error) {
      throw new Error(`Failed to save quiz result: ${error.message}`);
    }

    return data.id;
  }

  async getQuizResult(id: number): Promise<DatabaseQuizResult | null> {
    const { data, error } = await this.supabase
      .from('quiz_results')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw new Error(`Failed to get quiz result: ${error.message}`);
    }

    return data;
  }

  async getUserQuizResults(userId: string): Promise<DatabaseQuizResult[]> {
    const { data, error } = await this.supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to get user quiz results: ${error.message}`);
    }

    return data || [];
  }

  // =============== BEHAVIORAL TELEMETRY ===============

  async saveBehavioralTelemetry(
    quizResultId: number,
    questionIndex: number,
    questionPhase: 'A' | 'B',
    questionId: string,
    selectedOptionId: string,
    behavior: BehaviorSample
  ): Promise<number> {
    // Calculate behavior score
    const behaviorScore = this.calculateBehaviorScore(behavior);
    
    // Calculate normalized scores
    const normalizedScores = this.normalizeBehaviorScores(behavior);

    const telemetry: DatabaseBehavioralTelemetry = {
      quiz_result_id: quizResultId,
      question_index: questionIndex,
      question_phase: questionPhase,
      question_id: questionId,
      selected_option_id: selectedOptionId,
      latency_ms: behavior.latencyMs,
      switches: behavior.switches,
      hover_refs: behavior.hoverRefs,
      under_clock_hit: behavior.underClockHit,
      behavior_score: behaviorScore,
      normalized_latency_zscore: normalizedScores.latencyZScore,
      normalized_switches_zscore: normalizedScores.switchesZScore,
      normalized_hover_zscore: normalizedScores.hoverZScore,
      normalized_underclock_zscore: normalizedScores.underClockZScore
    };

    const { data, error } = await this.supabase
      .from('behavioral_telemetry')
      .insert(telemetry)
      .select('id')
      .single();

    if (error) {
      throw new Error(`Failed to save behavioral telemetry: ${error.message}`);
    }

    return data.id;
  }

  async getQuizTelemetry(quizResultId: number): Promise<DatabaseBehavioralTelemetry[]> {
    const { data, error } = await this.supabase
      .from('behavioral_telemetry')
      .select('*')
      .eq('quiz_result_id', quizResultId)
      .order('question_index', { ascending: true });

    if (error) {
      throw new Error(`Failed to get quiz telemetry: ${error.message}`);
    }

    return data || [];
  }

  // =============== FLIP DETECTION LOGS ===============

  async saveFlipDetectionLog(
    quizResultId: number,
    questionIndex: number,
    questionPhase: 'A' | 'B',
    before: { a1: Archetype; a2: Archetype; a3: Archetype; margin: number },
    after: { a1: Archetype; a2: Archetype; a3: Archetype; margin: number },
    flipTriggered: boolean,
    flipReason: string,
    gate1Triggered: boolean,
    gate2Triggered: boolean,
    consecutiveCount: number
  ): Promise<number> {
    const log: DatabaseFlipDetectionLog = {
      quiz_result_id: quizResultId,
      question_index: questionIndex,
      question_phase: questionPhase,
      a1_before: before.a1,
      a2_before: before.a2,
      a3_before: before.a3,
      margin_before: before.margin,
      a1_after: after.a1,
      a2_after: after.a2,
      a3_after: after.a3,
      margin_after: after.margin,
      flip_triggered: flipTriggered,
      flip_reason: flipReason,
      gate_1_triggered: gate1Triggered,
      gate_2_triggered: gate2Triggered,
      consecutive_count: consecutiveCount
    };

    const { data, error } = await this.supabase
      .from('flip_detection_logs')
      .insert(log)
      .select('id')
      .single();

    if (error) {
      throw new Error(`Failed to save flip detection log: ${error.message}`);
    }

    return data.id;
  }

  // =============== STABILITY TRANSITIONS ===============

  async saveStabilityTransition(
    quizResultId: number,
    questionIndex: number,
    previousState: 'stable' | 'volatile',
    currentState: 'stable' | 'volatile',
    marginPct: number,
    consecutiveStableCount: number,
    transitionReason: string
  ): Promise<number> {
    const transition: DatabaseStabilityTransition = {
      quiz_result_id: quizResultId,
      question_index: questionIndex,
      previous_state: previousState,
      current_state: currentState,
      margin_pct: marginPct,
      consecutive_stable_count: consecutiveStableCount,
      transition_reason: transitionReason
    };

    const { data, error } = await this.supabase
      .from('stability_transitions')
      .insert(transition)
      .select('id')
      .single();

    if (error) {
      throw new Error(`Failed to save stability transition: ${error.message}`);
    }

    return data.id;
  }

  // =============== LATE OVERRIDE EVENTS ===============

  async saveLateOverrideEvent(
    quizResultId: number,
    questionIndex: number,
    overrideActive: boolean,
    multiplierApplied: number,
    a1ScoreBefore: number,
    a1ScoreAfter: number,
    overrideReason: string
  ): Promise<number> {
    const event: DatabaseLateOverrideEvent = {
      quiz_result_id: quizResultId,
      question_index: questionIndex,
      override_active: overrideActive,
      multiplier_applied: multiplierApplied,
      a1_score_before: a1ScoreBefore,
      a1_score_after: a1ScoreAfter,
      override_reason: overrideReason
    };

    const { data, error } = await this.supabase
      .from('late_override_events')
      .insert(event)
      .select('id')
      .single();

    if (error) {
      throw new Error(`Failed to save late override event: ${error.message}`);
    }

    return data.id;
  }

  // =============== TRIGGER ANALYSIS ===============

  async saveTriggerAnalysis(
    quizResultId: number,
    triggerName: Trigger,
    selectionCount: number,
    rWeightSum: number,
    averageRWeight: number,
    pureA1Selections: number,
    mixedSelections: number
  ): Promise<number> {
    const analysis: DatabaseTriggerAnalysis = {
      quiz_result_id: quizResultId,
      trigger_name: triggerName,
      selection_count: selectionCount,
      r_weight_sum: rWeightSum,
      average_r_weight: averageRWeight,
      pure_a1_selections: pureA1Selections,
      mixed_selections: mixedSelections
    };

    const { data, error } = await this.supabase
      .from('trigger_analysis')
      .insert(analysis)
      .select('id')
      .single();

    if (error) {
      throw new Error(`Failed to save trigger analysis: ${error.message}`);
    }

    return data.id;
  }

  // =============== ANALYTICS QUERIES ===============

  async getQuizEngineStatistics(days: number = 30): Promise<any> {
    const { data, error } = await this.supabase
      .from('quiz_engine_statistics')
      .select('*')
      .gte('date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
      .order('date', { ascending: false });

    if (error) {
      throw new Error(`Failed to get quiz engine statistics: ${error.message}`);
    }

    return data || [];
  }

  async getArchetypeDistribution(days: number = 30): Promise<Record<Archetype, number>> {
    const { data, error } = await this.supabase
      .from('quiz_results')
      .select('final_archetype')
      .gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString());

    if (error) {
      throw new Error(`Failed to get archetype distribution: ${error.message}`);
    }

    const distribution: Record<Archetype, number> = {};
    data?.forEach(result => {
      distribution[result.final_archetype] = (distribution[result.final_archetype] || 0) + 1;
    });

    return distribution;
  }

  async getRIndexDistribution(days: number = 30): Promise<{
    averageRIndex: number;
  }> {
    const { data, error } = await this.supabase
      .from('quiz_results')
      .select('r_index')
      .gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString());

    if (error) {
      throw new Error(`Failed to get R-Index distribution: ${error.message}`);
    }

    let totalRIndex = 0;

    data?.forEach(result => {
      totalRIndex += result.r_index;
    });

    return {
      averageRIndex: data?.length ? totalRIndex / data.length : 0
    };
  }

  // =============== UTILITY FUNCTIONS ===============

  private calculateBehaviorScore(behavior: BehaviorSample): number {
    let score = 0;
    
    // Latency scoring (0-1)
    if (behavior.latencyMs <= 2000) score += 0.4; // Clean strike
    else if (behavior.latencyMs <= 4000) score += 0.3; // Good
    else if (behavior.latencyMs <= 6000) score += 0.2; // Acceptable
    else score += 0.1; // Hesitation
    
    // Switch scoring (0-1)
    if (behavior.switches === 0) score += 0.3; // Clean
    else if (behavior.switches === 1) score += 0.2; // Minor
    else score += 0.1; // Multiple switches
    
    // Hover scoring (0-1)
    if (behavior.hoverRefs <= 2) score += 0.2; // Focused
    else if (behavior.hoverRefs <= 4) score += 0.15; // Some exploration
    else score += 0.1; // Heavy exploration
    
    // Under-clock scoring (0-1)
    if (behavior.underClockHit) score += 0.1; // Bonus for timing
    
    return Math.min(1, score);
  }

  private normalizeBehaviorScores(behavior: BehaviorSample): {
    latencyZScore: number;
    switchesZScore: number;
    hoverZScore: number;
    underClockZScore: number;
  } {
    // Z-score normalization constants
    const LATENCY_MEAN = 3000;
    const LATENCY_STD = 2000;
    const SWITCHES_MEAN = 1;
    const SWITCHES_STD = 2;
    const HOVER_MEAN = 2;
    const HOVER_STD = 3;
    const UNDERCLOCK_MEAN = 0.3;
    const UNDERCLOCK_STD = 0.2;

    return {
      latencyZScore: (behavior.latencyMs - LATENCY_MEAN) / LATENCY_STD,
      switchesZScore: (behavior.switches - SWITCHES_MEAN) / SWITCHES_STD,
      hoverZScore: (behavior.hoverRefs - HOVER_MEAN) / HOVER_STD,
      underClockZScore: (behavior.underClockHit ? 1 : 0 - UNDERCLOCK_MEAN) / UNDERCLOCK_STD
    };
  }

  // =============== BULK OPERATIONS ===============

  async saveCompleteQuizSession(
    result: QuizResult,
    behaviorSamples: BehaviorSample[],
    userId?: string
  ): Promise<number> {
    // Start a transaction
    const { data: quizResult, error: quizError } = await this.supabase
      .from('quiz_results')
      .insert({
        user_id: userId,
        final_archetype: result.finalArchetype,
        alt_archetype: result.altArchetype,
        triggers: result.triggers,
        trigger_counts: result.triggerCounts,
        r_index: result.rIndex,
        // delivery_version removed - reverting to single chamber system
        flips: result.flips,
        dual_result: result.dual,
        final_margin_pct: result.audit?.finalMarginPct || 0,
        stability_state: result.audit?.stabilityState || 'stable',
        a1_history: result.audit?.a1History || [],
        margin_history: result.audit?.margins || [],
        top3_history: result.audit?.top3History || [],
        engine_version: '2.1.0'
      })
      .select('id')
      .single();

    if (quizError) {
      throw new Error(`Failed to save quiz result: ${quizError.message}`);
    }

    const quizResultId = quizResult.id;

    // Save all behavioral telemetry
    const telemetryPromises = behaviorSamples.map((behavior, index) => {
      const questionPhase = index < 7 ? 'A' : 'B';
      const questionId = `q${index + 1}`;
      const selectedOptionId = `option_${index + 1}`; // This should come from actual selection
      
      return this.saveBehavioralTelemetry(
        quizResultId,
        index + 1,
        questionPhase,
        questionId,
        selectedOptionId,
        behavior
      );
    });

    await Promise.all(telemetryPromises);

    return quizResultId;
  }
}

// =============== EXPORT ===============
export default QuizEngineDatabase;
