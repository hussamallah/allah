// V3 Components Test Suite - Comprehensive testing of all V3 components
// This validates our Quiz V3 implementation

import { describe, it, expect, beforeEach } from 'vitest';
import FHTokenEngine from '../lib/quiz-v2/fhTokenEngine';
import FHBridge from '../lib/quiz-v2/fhBridge';
import P3Scheduler from '../lib/quiz-v2/p3Scheduler';
import BehaviorTracker from '../lib/quiz-v2/behaviorTracker';
import AdvancedStopRules from '../lib/quiz-v2/advancedStopRules';
import DrilldownEngine from '../lib/quiz-v2/drilldownEngine';
import EdgeCaseHandler from '../lib/quiz-v2/edgeCaseHandler';
import QAInstrumentation from '../lib/quiz-v2/qaInstrumentation';
import { V3_CONFIG, V3_FLOW, V3_AMBIGUITY, V3_UTILS } from '../lib/quiz-v2/v3Config';

describe('Quiz V3 Components - Comprehensive Test Suite', () => {
  
  describe('Phase 1: V3 Configuration & Constants', () => {
    it('should have all required V3 constants', () => {
      expect(V3_FLOW.FH_MIN_LOCK).toBe(2);
      expect(V3_FLOW.FH_MAX).toBe(9);
      expect(V3_FLOW.P3_BUDGET).toBe(18);
      expect(V3_FLOW.P3_MIN).toBe(2);
      expect(V3_FLOW.P3_MAX).toBe(4);
      expect(V3_FLOW.UNDERCLOCK_TOTAL).toBeGreaterThanOrEqual(4);
      expect(V3_FLOW.UNDERCLOCK_TOTAL).toBeLessThanOrEqual(6);
    });

    it('should have evidence math constants', () => {
      expect(V3_CONFIG.DECAY_LAMBDA).toBe(0.92);
      expect(V3_AMBIGUITY.BANDS.HIGHLY_AMBIGUOUS).toBe(0.12);
      expect(V3_AMBIGUITY.BANDS.CLEAR).toBe(0.22);
      expect(V3_AMBIGUITY.BANDS.VERY_CLEAR).toBe(0.25);
    });

    it('should have instability thresholds', () => {
      expect(V3_CONFIG.INSTABILITY.LATENCY_THRESHOLD).toBe(6000);
      expect(V3_CONFIG.INSTABILITY.SWITCHES_THRESHOLD).toBe(2);
      expect(V3_CONFIG.INSTABILITY.DELIBERATION_THRESHOLD).toBe(2500);
    });

    it('should have R-Index weights', () => {
      expect(V3_CONFIG.R_INDEX.WEIGHTS.CHOICES).toBe(0.60);
      expect(V3_CONFIG.R_INDEX.WEIGHTS.BEHAVIOR).toBe(0.25);
      expect(V3_CONFIG.R_INDEX.WEIGHTS.UNDER_CLOCK).toBe(0.15);
    });
  });

  describe('Phase 2: FH Token Engine', () => {
    let fhTokenEngine: FHTokenEngine;

    beforeEach(() => {
      fhTokenEngine = new FHTokenEngine();
    });

    it('should emit C token for clean behavior', () => {
      const cleanBehavior = {
        latency_ms: 1500,
        switches: 0,
        deliberation_ms: 800,
        under_clock_hit: false
      };

      const token = fhTokenEngine.emitToken('Control', cleanBehavior);
      expect(token).toBe('C');
    });

    it('should emit O token for unstable behavior', () => {
      const unstableBehavior = {
        latency_ms: 7000,
        switches: 3,
        deliberation_ms: 3000,
        under_clock_hit: false
      };

      const token = fhTokenEngine.emitToken('Pace', unstableBehavior);
      expect(token).toBe('O');
    });

    it('should never emit F tokens in FH', () => {
      const extremeBehavior = {
        latency_ms: 10000,
        switches: 5,
        deliberation_ms: 5000,
        under_clock_hit: true
      };

      const token = fhTokenEngine.emitToken('Boundary', extremeBehavior);
      expect(token).not.toBe('F');
      expect(['C', 'O']).toContain(token);
    });

    it('should calculate exposure weights correctly', () => {
      expect(fhTokenEngine.calculateFExpoWeight(0)).toBe(0.00);
      expect(fhTokenEngine.calculateFExpoWeight(1)).toBe(0.50);
      expect(fhTokenEngine.calculateFExpoWeight(2)).toBe(0.50);
      expect(fhTokenEngine.calculateFExpoWeight(3)).toBe(0.80);
      expect(fhTokenEngine.calculateFExpoWeight(5)).toBe(0.80);
      expect(fhTokenEngine.calculateFExpoWeight(6)).toBe(1.00);
      expect(fhTokenEngine.calculateFExpoWeight(9)).toBe(1.00);
    });

    it('should detect F-risk correctly', () => {
      // Add some tokens first
      fhTokenEngine.emitToken('Control', { latency_ms: 1000, switches: 0, deliberation_ms: 500, under_clock_hit: false });
      fhTokenEngine.emitToken('Pace', { latency_ms: 1000, switches: 0, deliberation_ms: 500, under_clock_hit: false });
      
      const fRiskFlags = fhTokenEngine.getFRiskFlags();
      expect(fRiskFlags).toBeDefined();
    });
  });

  describe('Phase 3: FH Bridge & Seeding', () => {
    let fhBridge: FHBridge;

    beforeEach(() => {
      fhBridge = new FHBridge();
    });

    it('should convert FH tokens to Phase 3 seeds', () => {
      const fhData = {
        fh_tokens: {
          Control: [{ verdict: 'C', weight: 0.8, is_seed: true }],
          Pace: [{ verdict: 'O', weight: 0.5, is_seed: true }]
        },
        fh_expo: { Control: 3, Pace: 2, Boundary: 0, Truth: 1, Recognition: 0, Bonding: 0, Stress: 0 },
        fh_hits: { Control: 2, Pace: 1, Boundary: 0, Truth: 0, Recognition: 0, Bonding: 0, Stress: 0 }
      };

      const seeds = fhBridge.convertFHToP3Seeds(fhData);
      expect(seeds.Control).toBeDefined();
      expect(seeds.Pace).toBeDefined();
      expect(seeds.Control.seeds.length).toBeGreaterThan(0);
    });

    it('should apply recency decay correctly', () => {
      const seeds = fhBridge.convertFHToP3Seeds({
        fh_tokens: {
          Control: [
            { verdict: 'C', weight: 1.0, is_seed: true },
            { verdict: 'C', weight: 1.0, is_seed: true }
          ]
        },
        fh_expo: { Control: 4, Pace: 0, Boundary: 0, Truth: 0, Recognition: 0, Bonding: 0, Stress: 0 },
        fh_hits: { Control: 3, Pace: 0, Boundary: 0, Truth: 0, Recognition: 0, Bonding: 0, Stress: 0 }
      });

      const decayedSeeds = fhBridge.applyDecay(seeds.Control.seeds);
      expect(decayedSeeds.length).toBe(2);
      // First seed should have higher weight than second
      expect(decayedSeeds[0].effective_weight).toBeGreaterThan(decayedSeeds[1].effective_weight);
    });

    it('should calculate baselines based on exposure', () => {
      const baselines = fhBridge.calculateBaselines({
        fh_expo: { Control: 0, Pace: 1, Boundary: 2, Truth: 3, Recognition: 4, Bonding: 5, Stress: 6 }
      });

      expect(baselines.Control).toBe(4); // 0 exposure = 4 baseline
      expect(baselines.Pace).toBe(3);    // 1 exposure = 3 baseline
      expect(baselines.Boundary).toBe(3); // 2 exposure = 3 baseline
      expect(baselines.Truth).toBe(2);   // 3+ exposure = 2 baseline
    });
  });

  describe('Phase 4: Phase 3 Scored Scheduler', () => {
    let p3Scheduler: P3Scheduler;

    beforeEach(() => {
      p3Scheduler = new P3Scheduler();
    });

    it('should initialize correctly', () => {
      p3Scheduler.initialize();
      const state = p3Scheduler.getSchedulerState();
      expect(state.budget_remaining).toBe(V3_FLOW.P3_BUDGET);
      expect(state.lines_assessed).toBe(0);
    });

    it('should calculate investigation scores correctly', () => {
      const score = p3Scheduler.calculateInvestigationScore({
        line: 'Control',
        current_winner: 'F',
        current_margin: 0.15,
        instability_flag: true,
        fh_expo: 1,
        fh_f_risk: true,
        items_asked: 2
      });

      // F verdict = +2, ambiguous margin = +1, instability = +1, low expo = +1, F-risk = +1
      expect(score.totalScore).toBe(6);
    });

    it('should select next line based on scores', () => {
      p3Scheduler.initialize();
      
      // Add some line data
      p3Scheduler.addP3Token('Control', 'F', false);
      p3Scheduler.addP3Token('Pace', 'C', false);
      
      const nextLine = p3Scheduler.selectNextLine();
      expect(nextLine).toBeDefined();
      expect(['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress']).toContain(nextLine);
    });
  });

  describe('Phase 5: Advanced Stop Rules', () => {
    let advancedStopRules: AdvancedStopRules;

    beforeEach(() => {
      advancedStopRules = new AdvancedStopRules();
    });

    it('should allow early stop @2 for stable C with clear margin', () => {
      const lineData = {
        current_winner: 'C',
        current_margin: 0.26,
        items_asked: 2,
        confidence: 'medium',
        baseline: 2,
        seeds: []
      };

      const shouldStop = advancedStopRules.shouldStopAfterTwo('Control', lineData, 3, false);
      expect(shouldStop).toBe(true);
    });

    it('should not allow early stop @2 for unstable C', () => {
      const lineData = {
        current_winner: 'C',
        current_margin: 0.26,
        items_asked: 2,
        confidence: 'medium',
        baseline: 2,
        seeds: []
      };

      const shouldStop = advancedStopRules.shouldStopAfterTwo('Control', lineData, 3, true);
      expect(shouldStop).toBe(false);
    });

    it('should apply special override 2C+1F→O', () => {
      const lineData = {
        current_winner: 'C',
        current_margin: 0.3,
        items_asked: 3,
        confidence: 'medium',
        baseline: 2,
        seeds: [
          { verdict: 'C', is_seed: false },
          { verdict: 'C', is_seed: false },
          { verdict: 'F', is_seed: false }
        ]
      };

      const finalVerdict = advancedStopRules.getFinalVerdict(lineData);
      expect(finalVerdict).toBe('O');
    });
  });

  describe('Phase 6: Behavior Integration & R-Index', () => {
    let behaviorTracker: BehaviorTracker;

    beforeEach(() => {
      behaviorTracker = new BehaviorTracker();
    });

    it('should record behavior correctly', () => {
      const behavior = {
        latency_ms: 2000,
        switches: 1,
        deliberation_ms: 1500,
        under_clock_hit: false
      };

      const sample = behaviorTracker.recordBehavior('test-1', 'Control', 'C', behavior);
      expect(sample.unstable_item).toBe(false);
      expect(sample.latency_ms).toBe(2000);
    });

    it('should detect instability correctly', () => {
      const unstableBehavior = {
        latency_ms: 7000,
        switches: 3,
        deliberation_ms: 3000,
        under_clock_hit: false
      };

      const isUnstable = behaviorTracker.detectInstability({
        ...unstableBehavior,
        unstable_item: false
      });
      expect(isUnstable).toBe(true);
    });

    it('should calculate R-Index correctly', () => {
      // Add some behavior samples
      behaviorTracker.recordBehavior('test-1', 'Control', 'C', {
        latency_ms: 1500,
        switches: 0,
        deliberation_ms: 800,
        under_clock_hit: false
      });

      const rIndex = behaviorTracker.calculateRIndex({
        earlyStops: 2,
        totalLines: 6,
        averageMargin: 0.3,
        itemsNeeded: [2, 2, 3, 3, 4, 4]
      });

      expect(rIndex.totalRIndex).toBeGreaterThan(0);
      expect(rIndex.totalRIndex).toBeLessThanOrEqual(1);
      expect(rIndex.styleLabel).toBeDefined();
    });
  });

  describe('Phase 7: Drilldown System', () => {
    let drilldownEngine: DrilldownEngine;

    beforeEach(() => {
      drilldownEngine = new DrilldownEngine();
    });

    it('should generate tags for O/F lines', () => {
      const tags = drilldownEngine.generateTags('Control', 'O');
      expect(tags.length).toBeGreaterThan(0);
      expect(tags.every(tag => typeof tag === 'string')).toBe(true);
    });

    it('should not generate tags for C lines', () => {
      const tags = drilldownEngine.generateTags('Control', 'C');
      expect(tags.length).toBe(0);
    });

    it('should determine drilldown need correctly', () => {
      const shouldDrilldown = drilldownEngine.shouldDrilldown('Pace', 'F', 2, 0.3);
      expect(shouldDrilldown).toBe(true);
    });

    it('should generate drilldown questions', () => {
      const questions = drilldownEngine.getDrilldownQuestions('Control', 'O', ['RoomStatus']);
      expect(questions.length).toBeGreaterThan(0);
      expect(questions[0].line).toBe('Control');
      expect(questions[0].targetTags).toContain('RoomStatus');
    });
  });

  describe('Phase 8: Edge Cases & Contradiction Handling', () => {
    let edgeCaseHandler: EdgeCaseHandler;

    beforeEach(() => {
      edgeCaseHandler = new EdgeCaseHandler();
    });

    it('should handle Q2 exit correctly', () => {
      const fhExpo = {
        Control: 1,
        Pace: 1,
        Boundary: 0,
        Truth: 0,
        Recognition: 0,
        Bonding: 0,
        Stress: 0
      };

      const analysis = edgeCaseHandler.handleQ2Exit(fhExpo, 'Control');
      expect(analysis.compensationNeeded).toBe(true);
      expect(analysis.underExposedLines.length).toBeGreaterThan(0);
    });

    it('should validate no Q1 lock', () => {
      expect(edgeCaseHandler.validateNoQ1Lock(1)).toBe(false);
      expect(edgeCaseHandler.validateNoQ1Lock(2)).toBe(true);
      expect(edgeCaseHandler.validateNoQ1Lock(5)).toBe(true);
    });

    it('should validate no F tokens in FH', () => {
      const fhTokens = {
        Control: [{ verdict: 'C', weight: 0.8 }],
        Pace: [{ verdict: 'O', weight: 0.5 }]
      };

      expect(edgeCaseHandler.validateNoFInFH(fhTokens)).toBe(true);
    });
  });

  describe('Phase 9: QA & Instrumentation', () => {
    let qaInstrumentation: QAInstrumentation;

    beforeEach(() => {
      qaInstrumentation = new QAInstrumentation();
    });

    it('should log quiz items correctly', () => {
      qaInstrumentation.logQuizItem('FH', {
        line: 'Control',
        screenIndex: 1,
        option: 'A',
        token: 'C'
      });

      const summary = qaInstrumentation.getQASummary();
      expect(summary.totalLogEntries).toBe(1);
      expect(summary.phases.FH).toBe(1);
    });

    it('should assert V3 invariants', () => {
      qaInstrumentation.assert(true, 'This should not fail');
      qaInstrumentation.assert(false, 'This should fail');
      
      const summary = qaInstrumentation.getQASummary();
      expect(summary.violations.length).toBe(1);
      expect(summary.reliabilityScore).toBeLessThan(1.0);
    });

    it('should validate FH phase', () => {
      const result = qaInstrumentation.validateFHPhase(3, 3, {}, {});
      expect(result.isValid).toBe(true);
    });

    it('should validate Phase 3', () => {
      const result = qaInstrumentation.validatePhase3({}, 'Control', 10, 18);
      expect(result.isValid).toBe(true);
    });
  });

  describe('V3 Integration Tests', () => {
    it('should work together as a complete system', () => {
      // This test validates that all V3 components can work together
      const fhTokenEngine = new FHTokenEngine();
      const fhBridge = new FHBridge();
      const p3Scheduler = new P3Scheduler();
      const behaviorTracker = new BehaviorTracker();
      const advancedStopRules = new AdvancedStopRules();
      const drilldownEngine = new DrilldownEngine();
      const edgeCaseHandler = new EdgeCaseHandler();
      const qaInstrumentation = new QAInstrumentation();

      // All components should be instantiable
      expect(fhTokenEngine).toBeDefined();
      expect(fhBridge).toBeDefined();
      expect(p3Scheduler).toBeDefined();
      expect(behaviorTracker).toBeDefined();
      expect(advancedStopRules).toBeDefined();
      expect(drilldownEngine).toBeDefined();
      expect(edgeCaseHandler).toBeDefined();
      expect(qaInstrumentation).toBeDefined();

      // Test basic functionality
      const token = fhTokenEngine.emitToken('Control', {
        latency_ms: 1500,
        switches: 0,
        deliberation_ms: 800,
        under_clock_hit: false
      });
      expect(['C', 'O']).toContain(token);

      // Test behavior tracking
      behaviorTracker.recordBehavior('test-1', 'Control', 'C', {
        latency_ms: 1500,
        switches: 0,
        deliberation_ms: 800,
        under_clock_hit: false
      });

      // Test edge case handling
      const analysis = edgeCaseHandler.analyzeEarlyExit(2, {
        Control: 1,
        Pace: 1,
        Boundary: 0,
        Truth: 0,
        Recognition: 0,
        Bonding: 0,
        Stress: 0
      }, 'Control');
      expect(analysis.compensationNeeded).toBe(true);
    });
  });
});
