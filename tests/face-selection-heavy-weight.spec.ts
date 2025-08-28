// Face Selection Heavy-Weight Tests - GroundZero v3.1
// Tests the new weighted scoring system with FH→Face bridge

import { describe, it, expect, beforeEach } from 'vitest';
import FaceSelectionEngine from '../lib/quiz-v2/faceSelectionEngine';
import { FHData, FaceTriad, FaceDuel, FaceSelectionResult } from '../lib/quiz-v2/faceSelectionEngine';
import { V3_FLOW } from '../lib/quiz-v2/v3Config';

describe('Face Selection Heavy-Weight Engine', () => {
  let engine: FaceSelectionEngine;
  let sampleFHData: FHData;

  beforeEach(() => {
    engine = new FaceSelectionEngine();
    
    // Sample FH data with Control family locked
    sampleFHData = {
      hits: {
        'Control': 3,
        'Pace': 2,
        'Boundary': 1,
        'Truth': 4,
        'Recognition': 2,
        'Bonding': 1,
        'Stress': 0
      },
      expo: {
        'Control': 5,
        'Pace': 4,
        'Boundary': 3,
        'Truth': 6,
        'Recognition': 4,
        'Bonding': 2,
        'Stress': 1
      },
      lockedFamily: 'Control'
    };
  });

  describe('Initialization and FH→Face Bridge', () => {
    it('should start face selection with FH data', () => {
      const triad = engine.startFaceSelection(sampleFHData);
      
      expect(triad.id).toBe('triad_Control');
      expect(triad.faces).toHaveLength(3);
      expect(triad.order).toBe('prior_based');
      expect(triad.faces).toContain('sovereign');
      expect(triad.faces).toContain('rebel');
      expect(triad.faces).toContain('catalyst');
    });

    it('should compute face priors from FH data', () => {
      engine.startFaceSelection(sampleFHData);
      const debugInfo = engine.getDebugInfo();
      
      expect(debugInfo.facePrior).toHaveLength(3);
      expect(debugInfo.facePrior.reduce((sum, p) => sum + p, 0)).toBeCloseTo(1.0, 5);
      expect(debugInfo.lockedFamily).toBe('Control');
    });

    it('should initialize face scores with prior influence', () => {
      engine.startFaceSelection(sampleFHData);
      const debugInfo = engine.getDebugInfo();
      
      // Initial scores should be λ_prior * face_prior
      const expectedInitialScores = debugInfo.facePrior.map(p => V3_FLOW.FACE_WEIGHTS.LAMBDA_PRIOR * p);
      
      expect(debugInfo.faceScore).toHaveLength(3);
      debugInfo.faceScore.forEach((score, i) => {
        expect(score).toBeCloseTo(expectedInitialScores[i], 5);
      });
    });

    it('should order faces by prior (highest first)', () => {
      const triad = engine.startFaceSelection(sampleFHData);
      const debugInfo = engine.getDebugInfo();
      
      // First face should have highest prior
      const firstFaceIndex = debugInfo.faces.indexOf(triad.faces[0]);
      const firstPrior = debugInfo.facePrior[firstFaceIndex];
      
      debugInfo.facePrior.forEach(prior => {
        expect(prior).toBeLessThanOrEqual(firstPrior);
      });
    });
  });

  describe('Triad Selection (Q1)', () => {
    it('should process triad selection and add w_triad weight', () => {
      engine.startFaceSelection(sampleFHData);
      const debugInfo = engine.getDebugInfo();
      const initialScores = [...debugInfo.faceScore];
      
      const duel = engine.processTriadSelection('sovereign');
      
      // Should return duel with top 2 faces
      expect(duel).toBeDefined();
      expect(duel?.face1).toBeDefined();
      expect(duel?.face2).toBeDefined();
      expect(duel?.round).toBe(1);
      
      // Score should be updated
      const updatedDebugInfo = engine.getDebugInfo();
      const sovereignIndex = updatedDebugInfo.faces.indexOf('sovereign');
      const expectedScore = initialScores[sovereignIndex] + V3_FLOW.FACE_WEIGHTS.W_TRIAD;
      
      expect(updatedDebugInfo.faceScore[sovereignIndex]).toBeCloseTo(expectedScore, 5);
    });

    it('should record score history for triad selection', () => {
      engine.startFaceSelection(sampleFHData);
      engine.processTriadSelection('sovereign');
      
      const debugInfo = engine.getDebugInfo();
      expect(debugInfo.scoreHistory).toHaveLength(1);
      
      const triadRecord = debugInfo.scoreHistory[0];
      expect(triadRecord.question).toBe('Triad');
      expect(triadRecord.score_delta).toBe(V3_FLOW.FACE_WEIGHTS.W_TRIAD);
      expect(triadRecord.picked_face).toBe('sovereign');
      expect(triadRecord.score_after).toHaveLength(3);
    });

    it('should determine top 2 faces for duel based on current scores', () => {
      engine.startFaceSelection(sampleFHData);
      
      // Select a face that might not be the highest prior
      const duel = engine.processTriadSelection('rebel');
      
      // Duel should contain the two faces with highest scores after triad selection
      expect(duel?.face1).toBeDefined();
      expect(duel?.face2).toBeDefined();
      expect(duel?.face1).not.toBe(duel?.face2);
    });
  });

  describe('First Duel (Q2)', () => {
    it('should process first duel and add w_duel1 weight', () => {
      engine.startFaceSelection(sampleFHData);
      engine.processTriadSelection('sovereign');
      
      const debugInfo = engine.getDebugInfo();
      const scoresBeforeDuel = [...debugInfo.faceScore];
      
      const shouldCommit = engine.processDuelRound('sovereign');
      
      // Should not commit after first duel unless margin is sufficient
      expect(typeof shouldCommit).toBe('boolean');
      
      // Score should be updated
      const updatedDebugInfo = engine.getDebugInfo();
      const sovereignIndex = updatedDebugInfo.faces.indexOf('sovereign');
      const expectedScore = scoresBeforeDuel[sovereignIndex] + V3_FLOW.FACE_WEIGHTS.W_DUEL1;
      
      expect(updatedDebugInfo.faceScore[sovereignIndex]).toBeCloseTo(expectedScore, 5);
    });

    it('should record score history for first duel', () => {
      engine.startFaceSelection(sampleFHData);
      engine.processTriadSelection('sovereign');
      engine.processDuelRound('sovereign');
      
      const debugInfo = engine.getDebugInfo();
      expect(debugInfo.scoreHistory).toHaveLength(2);
      
      const duelRecord = debugInfo.scoreHistory[1];
      expect(duelRecord.question).toBe('Duel Round 1');
      expect(duelRecord.score_delta).toBe(V3_FLOW.FACE_WEIGHTS.W_DUEL1);
      expect(duelRecord.picked_face).toBe('sovereign');
    });

    it('should prepare for second duel if early commit not possible', () => {
      engine.startFaceSelection(sampleFHData);
      engine.processTriadSelection('sovereign');
      
      const shouldCommit = engine.processDuelRound('rebel');
      
      // If margin is not sufficient, should continue to second duel
      if (!shouldCommit) {
        const debugInfo = engine.getDebugInfo();
        expect(debugInfo.currentDuel?.round).toBe(2);
      }
    });
  });

  describe('Early Commit Logic', () => {
    it('should commit early if margin ≥ Θ_early after first duel', () => {
      engine.startFaceSelection(sampleFHData);
      engine.processTriadSelection('sovereign');
      
      // Select same face in duel to build up score
      const shouldCommit = engine.processDuelRound('sovereign');
      
      // Check if early commit is possible
      const debugInfo = engine.getDebugInfo();
      const [topScore, secondScore] = debugInfo.faceScore
        .map((score, index) => ({ score, index }))
        .sort((a, b) => b.score - a.score)
        .map(item => item.score);
      
      const margin = topScore - secondScore;
      const canEarlyCommit = margin >= V3_FLOW.FACE_WEIGHTS.THETA_EARLY;
      
      if (canEarlyCommit) {
        expect(shouldCommit).toBe(true);
      }
    });

    it('should track commit stage correctly', () => {
      engine.startFaceSelection(sampleFHData);
      engine.processTriadSelection('sovereign');
      
      const shouldCommit = engine.processDuelRound('sovereign');
      
      if (shouldCommit) {
        // Early commit after first duel
        const result = engine.getFinalResult();
        expect(result.commitStage).toBe('after_duel');
      } else {
        // Continue to second duel
        engine.processDuelRound('sovereign');
        const result = engine.getFinalResult();
        expect(result.commitStage).toBe('after_final');
      }
    });
  });

  describe('Second Duel (Q3)', () => {
    it('should process second duel and add w_duel2 weight', () => {
      engine.startFaceSelection(sampleFHData);
      engine.processTriadSelection('sovereign');
      
      // First duel
      const shouldCommit = engine.processDuelRound('rebel');
      
      if (!shouldCommit) {
        // Second duel
        const finalCommit = engine.processDuelRound('sovereign');
        expect(finalCommit).toBe(true);
        
        // Check that w_duel2 was added
        const debugInfo = engine.getDebugInfo();
        const sovereignIndex = debugInfo.faces.indexOf('sovereign');
        const sovereignScore = debugInfo.faceScore[sovereignIndex];
        
        // Should have received w_duel2 weight
        expect(debugInfo.scoreHistory).toHaveLength(3);
        const finalDuelRecord = debugInfo.scoreHistory[2];
        expect(finalDuelRecord.score_delta).toBe(V3_FLOW.FACE_WEIGHTS.W_DUEL2);
      }
    });

    it('should record score history for second duel', () => {
      engine.startFaceSelection(sampleFHData);
      engine.processTriadSelection('sovereign');
      engine.processDuelRound('rebel');
      engine.processDuelRound('sovereign');
      
      const debugInfo = engine.getDebugInfo();
      expect(debugInfo.scoreHistory).toHaveLength(3);
      
      const secondDuelRecord = debugInfo.scoreHistory[2];
      expect(secondDuelRecord.question).toBe('Duel Round 2');
      expect(secondDuelRecord.score_delta).toBe(V3_FLOW.FACE_WEIGHTS.W_DUEL2);
    });
  });

  describe('Final Result and Winner Determination', () => {
    it('should determine winner by highest final score', () => {
      engine.startFaceSelection(sampleFHData);
      engine.processTriadSelection('sovereign');
      engine.processDuelRound('sovereign');
      
      const result = engine.getFinalResult();
      
      expect(result.winner).toBeDefined();
      expect(result.faces).toContain(result.winner);
      
      // Winner should have highest score
      const winnerIndex = result.faces.indexOf(result.winner);
      const winnerScore = result.finalScores[winnerIndex];
      
      result.finalScores.forEach(score => {
        expect(score).toBeLessThanOrEqual(winnerScore);
      });
    });

    it('should provide complete result information', () => {
      engine.startFaceSelection(sampleFHData);
      engine.processTriadSelection('sovereign');
      engine.processDuelRound('sovereign');
      
      const result = engine.getFinalResult();
      
      expect(result.winner).toBeDefined();
      expect(result.commitStage).toBeDefined();
      expect(result.finalScores).toHaveLength(3);
      expect(result.facePrior).toHaveLength(3);
      expect(result.weights).toBeDefined();
      expect(result.scoreHistory).toBeDefined();
      
      // Check weights match configuration
      expect(result.weights.LAMBDA_PRIOR).toBe(V3_FLOW.FACE_WEIGHTS.LAMBDA_PRIOR);
      expect(result.weights.W_TRIAD).toBe(V3_FLOW.FACE_WEIGHTS.W_TRIAD);
      expect(result.weights.W_DUEL1).toBe(V3_FLOW.FACE_WEIGHTS.W_DUEL1);
      expect(result.weights.W_DUEL2).toBe(V3_FLOW.FACE_WEIGHTS.W_DUEL2);
      expect(result.weights.THETA_EARLY).toBe(V3_FLOW.FACE_WEIGHTS.THETA_EARLY);
    });

    it('should track complete score history', () => {
      engine.startFaceSelection(sampleFHData);
      engine.processTriadSelection('sovereign');
      engine.processDuelRound('rebel');
      engine.processDuelRound('sovereign');
      
      const result = engine.getFinalResult();
      
      expect(result.scoreHistory).toHaveLength(3);
      
      // Check triad record
      const triadRecord = result.scoreHistory[0];
      expect(triadRecord.question).toBe('Triad');
      expect(triadRecord.score_delta).toBe(V3_FLOW.FACE_WEIGHTS.W_TRIAD);
      
      // Check first duel record
      const duel1Record = result.scoreHistory[1];
      expect(duel1Record.question).toBe('Duel Round 1');
      expect(duel1Record.score_delta).toBe(V3_FLOW.FACE_WEIGHTS.W_DUEL1);
      
      // Check second duel record
      const duel2Record = result.scoreHistory[2];
      expect(duel2Record.question).toBe('Duel Round 2');
      expect(duel2Record.score_delta).toBe(V3_FLOW.FACE_WEIGHTS.W_DUEL2);
    });
  });

  describe('Reset and State Management', () => {
    it('should reset engine state completely', () => {
      engine.startFaceSelection(sampleFHData);
      engine.processTriadSelection('sovereign');
      
      engine.reset();
      
      const debugInfo = engine.getDebugInfo();
      expect(debugInfo.currentTriad).toBeNull();
      expect(debugInfo.currentDuel).toBeNull();
      expect(debugInfo.tiebreakResult).toBeNull();
      expect(debugInfo.facePrior).toHaveLength(0);
      expect(debugInfo.faceScore).toHaveLength(0);
      expect(debugInfo.faces).toHaveLength(0);
      expect(debugInfo.lockedFamily).toBeNull();
      expect(debugInfo.scoreHistory).toHaveLength(0);
    });

    it('should allow restarting after reset', () => {
      engine.startFaceSelection(sampleFHData);
      engine.reset();
      
      // Should be able to start again
      const newTriad = engine.startFaceSelection(sampleFHData);
      expect(newTriad).toBeDefined();
      expect(newTriad.faces).toHaveLength(3);
    });
  });

  describe('Error Handling', () => {
    it('should throw error for invalid face selection', () => {
      engine.startFaceSelection(sampleFHData);
      
      expect(() => {
        engine.processTriadSelection('invalid_face' as any);
      }).toThrow('Invalid face selection');
    });

    it('should throw error for processing triad before start', () => {
      expect(() => {
        engine.processTriadSelection('sovereign');
      }).toThrow('Must start face selection before processing triad');
    });

    it('should throw error for processing duel before triad', () => {
      engine.startFaceSelection(sampleFHData);
      
      expect(() => {
        engine.processDuelRound('sovereign');
      }).toThrow('Must process triad before duel');
    });

    it('should throw error for getting final result before completion', () => {
      expect(() => {
        engine.getFinalResult();
      }).toThrow('Face selection not started');
    });
  });

  describe('Weight Configuration', () => {
    it('should use correct weights from configuration', () => {
      expect(V3_FLOW.FACE_WEIGHTS.LAMBDA_PRIOR).toBe(2.0);
      expect(V3_FLOW.FACE_WEIGHTS.W_TRIAD).toBe(3.0);
      expect(V3_FLOW.FACE_WEIGHTS.W_DUEL1).toBe(4.0);
      expect(V3_FLOW.FACE_WEIGHTS.W_DUEL2).toBe(1.0);
      expect(V3_FLOW.FACE_WEIGHTS.THETA_EARLY).toBe(3.0);
    });

    it('should apply weights in correct order', () => {
      engine.startFaceSelection(sampleFHData);
      engine.processTriadSelection('sovereign');
      engine.processDuelRound('sovereign');
      
      const result = engine.getFinalResult();
      const sovereignIndex = result.faces.indexOf('sovereign');
      const sovereignScore = result.finalScores[sovereignIndex];
      
      // Score should be: λ_prior * prior + w_triad + w_duel1
      const expectedScore = 
        V3_FLOW.FACE_WEIGHTS.LAMBDA_PRIOR * result.facePrior[sovereignIndex] +
        V3_FLOW.FACE_WEIGHTS.W_TRIAD +
        V3_FLOW.FACE_WEIGHTS.W_DUEL1;
      
      expect(sovereignScore).toBeCloseTo(expectedScore, 5);
    });
  });
});
