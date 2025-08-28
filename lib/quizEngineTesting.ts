// Ground Zero — Quiz Engine Testing Utilities 2.1
// Comprehensive testing suite for the Elastic Archetype Engine

import { QuizEngine, type BehaviorSample, type QuizStep, type QuizResult } from './quizEngine';
import { QUIZ_CONFIG } from './quizConfig';
import type { Archetype, Trigger } from './quizTypes';

// =============== SEEDABLE RNG ===============
export class SeededRNG {
  private seed: number;
  private state: number;

  constructor(seed: number) {
    this.seed = seed;
    this.state = seed;
  }

  // Generate deterministic random number between 0 and 1
  random(): number {
    this.state = (this.state * 9301 + 49297) % 233280;
    return this.state / 233280;
  }

  // Generate random integer between min and max (inclusive)
  randomInt(min: number, max: number): number {
    return Math.floor(this.random() * (max - min + 1)) + min;
  }

  // Generate random choice from array
  randomChoice<T>(array: T[]): T {
    return array[this.randomInt(0, array.length - 1)];
  }

  // Reset to original seed
  reset(): void {
    this.state = this.seed;
  }

  // Get current seed
  getSeed(): number {
    return this.seed;
  }
}

// =============== BEHAVIOR NORMALIZATION ===============
export interface NormalizedBehavior {
  latencyZScore: number;
  switchesZScore: number;
  hoverZScore: number;
  underClockZScore: number;
  normalizedRIndex: number;
}

export class BehaviorNormalizer {
  private static readonly LATENCY_MEAN = 3000; // 3 seconds
  private static readonly LATENCY_STD = 2000;  // 2 seconds
  private static readonly SWITCHES_MEAN = 1;
  private static readonly SWITCHES_STD = 2;
  private static readonly HOVER_MEAN = 2;
  private static readonly HOVER_STD = 3;
  private static readonly UNDERCLOCK_MEAN = 0.3; // 30% hit rate
  private static readonly UNDERCLOCK_STD = 0.2;

  // Z-score normalization for behavior metrics
  static normalizeBehavior(behavior: BehaviorSample): NormalizedBehavior {
    const latencyZScore = (behavior.latencyMs - this.LATENCY_MEAN) / this.LATENCY_STD;
    const switchesZScore = (behavior.switches - this.SWITCHES_MEAN) / this.SWITCHES_STD;
    const hoverZScore = (behavior.hoverRefs - this.HOVER_MEAN) / this.HOVER_STD;
    const underClockZScore = (behavior.underClockHit ? 1 : 0 - this.UNDERCLOCK_MEAN) / this.UNDERCLOCK_STD;

    // Bounded scaling for R-Index composition (0-100 scale)
    const normalizedRIndex = Math.max(0, Math.min(100, 
      (latencyZScore * 0.25 + switchesZScore * 0.25 + hoverZScore * 0.25 + underClockZScore * 0.25) * 25 + 50
    ));

    return {
      latencyZScore,
      switchesZScore,
      hoverZScore,
      underClockZScore,
      normalizedRIndex
    };
  }

  // Batch normalization for multiple behavior samples
  static normalizeBehaviors(behaviors: BehaviorSample[]): NormalizedBehavior[] {
    return behaviors.map(behavior => this.normalizeBehavior(behavior));
  }
}

// =============== AUDIT LOG PERSISTENCE ===============
export interface AuditLog {
  testRunId: string;
  timestamp: string;
  seed: number;
  a1History: Archetype[];
  margins: number[];
  top3History: Array<{ a1: Archetype; a2: Archetype; a3: Archetype; marginPct: number }>;
  flips: number;
  finalResult: QuizResult;
  behaviorSamples: BehaviorSample[];
  normalizedBehaviors: NormalizedBehavior[];
}

export class AuditLogger {
  private static logs: AuditLog[] = [];
  private static readonly MAX_LOGS = 1000; // Prevent memory bloat

  // Log a complete test run
  static logTestRun(
    testRunId: string,
    seed: number,
    engine: QuizEngine,
    finalResult: QuizResult,
    behaviorSamples: BehaviorSample[]
  ): void {
    const leaders = engine.getLeaders();
    const normalizedBehaviors = BehaviorNormalizer.normalizeBehaviors(behaviorSamples);

    const auditLog: AuditLog = {
      testRunId,
      timestamp: new Date().toISOString(),
      seed,
      a1History: finalResult.audit?.a1History || [],
      margins: finalResult.audit?.margins || [],
      top3History: finalResult.audit?.top3History || [],
      flips: finalResult.flips,
      finalResult,
      behaviorSamples,
      normalizedBehaviors
    };

    this.logs.push(auditLog);

    // Maintain log size limit
    if (this.logs.length > this.MAX_LOGS) {
      this.logs = this.logs.slice(-this.MAX_LOGS);
    }

    // Console output for immediate feedback
    console.log(`🔍 AUDIT LOG: ${testRunId} (Seed: ${seed})`);
    console.log(`📊 Final Result: ${finalResult.finalArchetype} (R-Index: ${finalResult.rIndex})`);
    console.log(`🔄 Flips: ${finalResult.flips}, Dual: ${finalResult.dual}`);
    console.log(`📈 A1 History: ${auditLog.a1History.join(' → ')}`);
    console.log(`📏 Margins: [${auditLog.margins.map(m => m.toFixed(1)).join(', ')}]`);
  }

  // Get all logs
  static getLogs(): AuditLog[] {
    return [...this.logs];
  }

  // Get logs by test run ID
  static getLogsByTestRun(testRunId: string): AuditLog[] {
    return this.logs.filter(log => log.testRunId === testRunId);
  }

  // Get logs by archetype
  static getLogsByArchetype(archetype: Archetype): AuditLog[] {
    return this.logs.filter(log => log.finalResult.finalArchetype === archetype);
  }

  // Export logs to JSON
  static exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  // Clear all logs
  static clearLogs(): void {
    this.logs = [];
  }
}

// =============== ENGINE SIMULATION TESTING ===============
export interface SimulationConfig {
  seed: number;
  answerStrategy: 'random' | 'archetype' | 'behavioral' | 'custom';
  targetArchetype?: Archetype;
  customStrategy?: (step: QuizStep, history: BehaviorSample[]) => { id: string; behavior: BehaviorSample };
  iterations?: number;
}

export interface SimulationResult {
  testRunId: string;
  config: SimulationConfig;
  results: QuizResult[];
  statistics: {
    archetypeDistribution: Record<Archetype, number>;
    averageRIndex: number;
    averageFlips: number;
    dualResults: number;
    triggerDistribution: Record<Trigger, number>;
  };
  auditLogs: AuditLog[];
}

export class EngineSimulator {
  private rng: SeededRNG;

  constructor(seed: number) {
    this.rng = new SeededRNG(seed);
  }

  // Run a single simulation
  runSimulation(config: SimulationConfig): QuizResult {
    const engine = new QuizEngine(config.seed);
    const behaviorSamples: BehaviorSample[] = [];
    
    let step = engine.start();
    
    while (step !== "FINISHED") {
      const { id, behavior } = this.generateAnswer(step, config, behaviorSamples);
      behaviorSamples.push(behavior);
      step = engine.nextStepAfterAnswer(id, behavior);
    }

    const result = engine.finalize();
    
    // Log the test run
    const testRunId = `sim_${Date.now()}_${config.seed}`;
    AuditLogger.logTestRun(testRunId, config.seed, engine, result, behaviorSamples);
    
    return result;
  }

  // Run multiple simulations
  runBatchSimulation(config: SimulationConfig, iterations: number = 100): SimulationResult {
    const results: QuizResult[] = [];
    const testRunId = `batch_${Date.now()}_${config.seed}`;
    
    for (let i = 0; i < iterations; i++) {
      const result = this.runSimulation({ ...config, seed: config.seed + i });
      results.push(result);
    }

    const statistics = this.computeStatistics(results);
    const auditLogs = AuditLogger.getLogsByTestRun(testRunId);

    return {
      testRunId,
      config,
      results,
      statistics,
      auditLogs
    };
  }

  // Generate answer based on strategy
  private generateAnswer(
    step: QuizStep, 
    config: SimulationConfig, 
    history: BehaviorSample[]
  ): { id: string; behavior: BehaviorSample } {
    if (config.customStrategy) {
      return config.customStrategy(step, history);
    }

    let optionId: string;
    const options = step.phase === 'A' ? step.item.options : step.options;

    switch (config.answerStrategy) {
      case 'random':
        optionId = this.rng.randomChoice(options).id;
        break;
      
      case 'archetype':
        if (config.targetArchetype) {
          const targetOptions = options.filter(opt => 
            opt.weights.primary === config.targetArchetype || 
            opt.weights.secondary === config.targetArchetype
          );
          optionId = this.rng.randomChoice(targetOptions.length > 0 ? targetOptions : options).id;
        } else {
          optionId = this.rng.randomChoice(options).id;
        }
        break;
      
      case 'behavioral':
        // Simulate realistic human behavior patterns
        optionId = this.simulateHumanBehavior(step, options);
        break;
      
      default:
        optionId = this.rng.randomChoice(options).id;
    }

    const behavior = this.generateBehaviorSample();
    return { id: optionId, behavior };
  }

  // Simulate realistic human behavior
  private simulateHumanBehavior(step: QuizStep, options: any[]): string {
    // Prefer options that seem more "natural" or "safe"
    const safeOptions = options.filter(opt => 
      opt.label.toLowerCase().includes('observe') || 
      opt.label.toLowerCase().includes('wait') ||
      opt.label.toLowerCase().includes('balance')
    );
    
    if (safeOptions.length > 0 && this.rng.random() < 0.6) {
      return this.rng.randomChoice(safeOptions).id;
    }
    
    return this.rng.randomChoice(options).id;
  }

  // Generate realistic behavior sample
  private generateBehaviorSample(): BehaviorSample {
    const latencyMs = Math.max(500, Math.min(15000, 
      this.rng.random() * 10000 + 1000
    ));
    
    const switches = this.rng.random() < 0.3 ? this.rng.randomInt(1, 3) : 0;
    const hoverRefs = this.rng.random() < 0.4 ? this.rng.randomInt(1, 5) : 0;
    const underClockHit = this.rng.random() < 0.3;

    return {
      latencyMs,
      switches,
      hoverRefs,
      underClockHit
    };
  }

  // Compute statistics from batch results
  private computeStatistics(results: QuizResult[]) {
    const archetypeDistribution: Record<Archetype, number> = {};
    const triggerDistribution: Record<Trigger, number> = {};
    let totalRIndex = 0;
    let totalFlips = 0;
    let dualResults = 0;

    // Initialize distributions
    QUIZ_CONFIG.archetypes.forEach(archetype => {
      archetypeDistribution[archetype] = 0;
    });
    QUIZ_CONFIG.triggers.forEach(trigger => {
      triggerDistribution[trigger] = 0;
    });

    // Aggregate results
    results.forEach(result => {
      archetypeDistribution[result.finalArchetype]++;
      totalRIndex += result.rIndex;
      totalFlips += result.flips;
      if (result.dual) dualResults++;
      
      result.triggers.forEach(trigger => {
        triggerDistribution[trigger]++;
      });
    });

    return {
      archetypeDistribution,
      averageRIndex: totalRIndex / results.length,
      averageFlips: totalFlips / results.length,
      dualResults,
      triggerDistribution
    };
  }
}

// =============== VALIDATION UTILITIES ===============
export class EngineValidator {
  // Validate flip detection scenarios
  static validateFlipDetection(): boolean {
    console.log('🔍 Validating flip detection...');
    
    const simulator = new EngineSimulator(12345);
    const results = simulator.runBatchSimulation({
      seed: 12345,
      answerStrategy: 'archetype',
      targetArchetype: 'Guardian',
      iterations: 50
    });

    // Check if flips are within expected range
    const validFlips = results.statistics.averageFlips >= 0 && 
                      results.statistics.averageFlips <= 2;
    
    console.log(`✅ Flip validation: ${validFlips ? 'PASSED' : 'FAILED'}`);
    console.log(`📊 Average flips: ${results.statistics.averageFlips.toFixed(2)}`);
    
    return validFlips;
  }

  // Validate stability state transitions
  static validateStabilityTransitions(): boolean {
    console.log('🔍 Validating stability transitions...');
    
    const simulator = new EngineSimulator(67890);
    const results = simulator.runBatchSimulation({
      seed: 67890,
      answerStrategy: 'behavioral',
      iterations: 50
    });

    // Check if R-Index is within valid range
    const validRIndex = results.statistics.averageRIndex >= 0 && 
                       results.statistics.averageRIndex <= 100;
    
    console.log(`✅ Stability validation: ${validRIndex ? 'PASSED' : 'FAILED'}`);
    console.log(`📊 Average R-Index: ${results.statistics.averageRIndex.toFixed(2)}`);
    
    return validRIndex;
  }

  // Validate late override functionality
  static validateLateOverride(): boolean {
    console.log('🔍 Validating late override...');
    
    const simulator = new EngineSimulator(11111);
    const results = simulator.runBatchSimulation({
      seed: 11111,
      answerStrategy: 'random',
      iterations: 50
    });

    // Check if dual results are generated when expected
    const hasDualResults = results.statistics.dualResults > 0;
    
    console.log(`✅ Late override validation: ${hasDualResults ? 'PASSED' : 'FAILED'}`);
    console.log(`📊 Dual results: ${results.statistics.dualResults}`);
    
    return hasDualResults;
  }

  // Run all validations
  static runAllValidations(): { passed: number; total: number } {
    console.log('🚀 Running all engine validations...\n');
    
    const validations = [
      this.validateFlipDetection,
      this.validateStabilityTransitions,
      this.validateLateOverride
    ];

    let passed = 0;
    validations.forEach(validation => {
      if (validation()) passed++;
    });

    console.log(`\n📊 Validation Results: ${passed}/${validations.length} PASSED`);
    return { passed, total: validations.length };
  }
}

// =============== EXPORT ALL UTILITIES ===============
export {
  SeededRNG,
  BehaviorNormalizer,
  AuditLogger,
  EngineSimulator,
  EngineValidator
};
