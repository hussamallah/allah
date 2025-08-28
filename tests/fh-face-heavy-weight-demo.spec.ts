// FH→Face Heavy-Weight Demo Tests - GroundZero v3.1
// Demonstrates the new weighted scoring system with realistic scenarios

import { describe, it, expect, beforeEach } from 'vitest';
import FaceSelectionEngine from '../lib/quiz-v2/faceSelectionEngine';
import { FHData } from '../lib/quiz-v2/fhFaceBridge';
import { V3_FLOW } from '../lib/quiz-v2/v3Config';

describe('FH→Face Heavy-Weight System Demo', () => {
  let engine: FaceSelectionEngine;

  beforeEach(() => {
    engine = new FaceSelectionEngine();
  });

  describe('Scenario 1: Strong Control Family with Clear Winner', () => {
    it('should demonstrate early commit after first duel', () => {
      // FH data showing strong Control family with clear evidence
      const fhData: FHData = {
        hits: {
          'Control': 5,      // Strong hits
          'Pace': 2,
          'Boundary': 1,
          'Truth': 4,        // Good hits
          'Recognition': 3,  // Moderate hits
          'Bonding': 1,
          'Stress': 0
        },
        expo: {
          'Control': 7,      // High exposure
          'Pace': 4,
          'Boundary': 3,
          'Truth': 6,        // Good exposure
          'Recognition': 5,  // Moderate exposure
          'Bonding': 2,
          'Stress': 1
        },
        lockedFamily: 'Control'
      };

      // Start face selection
      const triad = engine.startFaceSelection(fhData);
      console.log('\n🎭 Starting Face Selection for Control Family');
      console.log('📊 Triad faces (ordered by prior):', triad.faces);

      // User selects sovereign (highest prior)
      const duel = engine.processTriadSelection('sovereign');
      console.log('🎯 Triad selection: sovereign');
      console.log('⚔️ Duel created:', duel?.face1, 'vs', duel?.face2);

      // User selects sovereign again in first duel
      const shouldCommit = engine.processDuelRound('sovereign');
      console.log('⚔️ First duel result: sovereign wins');
      console.log('🎯 Should commit early?', shouldCommit);

      if (shouldCommit) {
        // Early commit achieved!
        const result = engine.getFinalResult();
        console.log('🏆 EARLY COMMIT ACHIEVED!');
        console.log('🎯 Winner:', result.winner);
        console.log('📊 Commit stage:', result.commitStage);
        console.log('📈 Final scores:', result.faces.map((face, i) => 
          `${face}: ${result.finalScores[i].toFixed(2)}`
        ));

        expect(result.commitStage).toBe('after_duel');
        expect(result.winner).toBe('sovereign');
        expect(result.scoreHistory).toHaveLength(2); // Triad + Duel1 only
      } else {
        // Continue to second duel
        engine.processDuelRound('sovereign');
        const result = engine.getFinalResult();
        console.log('🏆 Final result after second duel');
        console.log('🎯 Winner:', result.winner);
        console.log('📊 Commit stage:', result.commitStage);
        console.log('📈 Final scores:', result.faces.map((face, i) => 
          `${face}: ${result.finalScores[i].toFixed(2)}`
        ));

        expect(result.commitStage).toBe('after_final');
        expect(result.scoreHistory).toHaveLength(3); // Triad + Duel1 + Duel2
      }
    });
  });

  describe('Scenario 2: Balanced Family with Close Competition', () => {
    it('should demonstrate full three-question process', () => {
      // FH data showing balanced Control family
      const fhData: FHData = {
        hits: {
          'Control': 3,      // Moderate hits
          'Pace': 2,
          'Boundary': 2,     // Similar hits
          'Truth': 3,        // Similar hits
          'Recognition': 2,  // Similar hits
          'Bonding': 1,
          'Stress': 1
        },
        expo: {
          'Control': 5,      // Moderate exposure
          'Pace': 4,
          'Boundary': 4,     // Similar exposure
          'Truth': 5,        // Similar exposure
          'Recognition': 4,  // Similar exposure
          'Bonding': 2,
          'Stress': 2
        },
        lockedFamily: 'Control'
      };

      // Start face selection
      const triad = engine.startFaceSelection(fhData);
      console.log('\n🎭 Starting Face Selection for Balanced Control Family');
      console.log('📊 Triad faces (ordered by prior):', triad.faces);

      // User selects catalyst (not necessarily highest prior)
      const duel = engine.processTriadSelection('catalyst');
      console.log('🎯 Triad selection: catalyst');
      console.log('⚔️ Duel created:', duel?.face1, 'vs', duel?.face2);

      // User selects rebel in first duel (different from triad)
      const shouldCommit = engine.processDuelRound('rebel');
      console.log('⚔️ First duel result: rebel wins');
      console.log('🎯 Should commit early?', shouldCommit);

      // With balanced evidence, early commit unlikely
      expect(shouldCommit).toBe(false);

      // Continue to second duel
      const finalCommit = engine.processDuelRound('catalyst');
      console.log('⚔️ Second duel result: catalyst wins');
      console.log('🎯 Final commit?', finalCommit);

      expect(finalCommit).toBe(true);

      // Get final result
      const result = engine.getFinalResult();
      console.log('🏆 Final result after full process');
      console.log('🎯 Winner:', result.winner);
      console.log('📊 Commit stage:', result.commitStage);
      console.log('📈 Final scores:', result.faces.map((face, i) => 
        `${face}: ${result.finalScores[i].toFixed(2)}`
      ));
      console.log('📋 Score history:', result.scoreHistory.map(record => 
        `${record.question}: ${record.picked_face} +${record.score_delta}`
      ));

      expect(result.commitStage).toBe('after_final');
      expect(result.scoreHistory).toHaveLength(3);
    });
  });

  describe('Scenario 3: Weight Analysis and Score Tracking', () => {
    it('should demonstrate weight application and score progression', () => {
      const fhData: FHData = {
        hits: { 'Control': 4, 'Pace': 2, 'Boundary': 1, 'Truth': 3, 'Recognition': 2, 'Bonding': 1, 'Stress': 0 },
        expo: { 'Control': 6, 'Pace': 4, 'Boundary': 3, 'Truth': 5, 'Recognition': 4, 'Bonding': 2, 'Stress': 1 },
        lockedFamily: 'Control'
      };

      engine.startFaceSelection(fhData);
      
      // Track initial scores
      const initialDebug = engine.getDebugInfo();
      console.log('\n📊 Initial Analysis:');
      console.log('🎯 Face priors:', initialDebug.faces.map((face, i) => 
        `${face}: ${(initialDebug.facePrior[i] * 100).toFixed(1)}%`
      ));
      console.log('📈 Initial scores:', initialDebug.faces.map((face, i) => 
        `${face}: ${initialDebug.faceScore[i].toFixed(2)}`
      ));

      // Triad selection
      engine.processTriadSelection('sovereign');
      const afterTriad = engine.getDebugInfo();
      console.log('\n🎭 After Triad Selection:');
      console.log('📈 Scores:', afterTriad.faces.map((face, i) => 
        `${face}: ${afterTriad.faceScore[i].toFixed(2)}`
      ));

      // First duel
      engine.processDuelRound('sovereign');
      const afterDuel1 = engine.getDebugInfo();
      console.log('\n⚔️ After First Duel:');
      console.log('📈 Scores:', afterDuel1.faces.map((face, i) => 
        `${face}: ${afterDuel1.faceScore[i].toFixed(2)}`
      ));

      // Check if early commit possible
      const margin = Math.max(...afterDuel1.faceScore) - 
                    afterDuel1.faceScore.sort((a, b) => b - a)[1];
      console.log('🎯 Margin after first duel:', margin.toFixed(2));
      console.log('🎯 Early commit threshold:', V3_FLOW.FACE_WEIGHTS.THETA_EARLY);
      console.log('🎯 Can commit early?', margin >= V3_FLOW.FACE_WEIGHTS.THETA_EARLY);

      // Continue to second duel if needed
      if (margin < V3_FLOW.FACE_WEIGHTS.THETA_EARLY) {
        engine.processDuelRound('rebel');
        const afterDuel2 = engine.getDebugInfo();
        console.log('\n⚔️ After Second Duel:');
        console.log('📈 Final scores:', afterDuel2.faces.map((face, i) => 
          `${face}: ${afterDuel2.faceScore[i].toFixed(2)}`
        ));
      }

      // Final result
      const result = engine.getFinalResult();
      console.log('\n🏆 Final Result:');
      console.log('🎯 Winner:', result.winner);
      console.log('📊 Commit stage:', result.commitStage);
      console.log('📋 Complete score history:');
      result.scoreHistory.forEach((record, index) => {
        console.log(`  ${index + 1}. ${record.question}: ${record.picked_face} +${record.score_delta} → ${record.score_after.join(', ')}`);
      });

      // Verify weight application
      const sovereignIndex = result.faces.indexOf('sovereign');
      const sovereignScore = result.finalScores[sovereignIndex];
      const sovereignPrior = result.facePrior[sovereignIndex];
      
      // Calculate expected score
      const expectedScore = 
        V3_FLOW.FACE_WEIGHTS.LAMBDA_PRIOR * sovereignPrior +
        result.scoreHistory.filter(r => r.picked_face === 'sovereign')
          .reduce((sum, r) => sum + r.score_delta, 0);
      
      console.log('\n🔍 Weight Verification:');
      console.log('🎯 Sovereign prior:', sovereignPrior.toFixed(3));
      console.log('📊 Expected score:', expectedScore.toFixed(2));
      console.log('📊 Actual score:', sovereignScore.toFixed(2));
      console.log('✅ Score match?', Math.abs(sovereignScore - expectedScore) < 0.01);

      expect(Math.abs(sovereignScore - expectedScore)).toBeLessThan(0.01);
    });
  });

  describe('Scenario 4: Different Family Types', () => {
    it('should demonstrate Pace family selection', () => {
      const paceFHData: FHData = {
        hits: { 'Control': 1, 'Pace': 5, 'Boundary': 2, 'Truth': 3, 'Recognition': 1, 'Bonding': 0, 'Stress': 2 },
        expo: { 'Control': 3, 'Pace': 7, 'Boundary': 4, 'Truth': 5, 'Recognition': 2, 'Bonding': 1, 'Stress': 3 },
        lockedFamily: 'Pace'
      };

      engine.startFaceSelection(paceFHData);
      const triad = engine.processTriadSelection('strategist');
      engine.processDuelRound('navigator');
      
      const result = engine.getFinalResult();
      console.log('\n🎭 Pace Family Result:');
      console.log('🎯 Winner:', result.winner);
      console.log('📊 Faces:', result.faces);
      console.log('📈 Final scores:', result.faces.map((face, i) => 
        `${face}: ${result.finalScores[i].toFixed(2)}`
      ));

      expect(result.faces).toContain('strategist');
      expect(result.faces).toContain('navigator');
      expect(result.faces).toContain('visionary');
    });

    it('should demonstrate Truth family selection', () => {
      const truthFHData: FHData = {
        hits: { 'Control': 2, 'Pace': 1, 'Boundary': 3, 'Truth': 6, 'Recognition': 2, 'Bonding': 1, 'Stress': 0 },
        expo: { 'Control': 4, 'Pace': 3, 'Boundary': 5, 'Truth': 8, 'Recognition': 3, 'Bonding': 2, 'Stress': 1 },
        lockedFamily: 'Truth'
      };

      engine.startFaceSelection(truthFHData);
      const triad = engine.processTriadSelection('seeker');
      engine.processDuelRound('architect');
      
      const result = engine.getFinalResult();
      console.log('\n🎭 Truth Family Result:');
      console.log('🎯 Winner:', result.winner);
      console.log('📊 Faces:', result.faces);
      console.log('📈 Final scores:', result.faces.map((face, i) => 
        `${face}: ${result.finalScores[i].toFixed(2)}`
      ));

      expect(result.faces).toContain('seeker');
      expect(result.faces).toContain('architect');
      expect(result.faces).toContain('alchemist');
    });
  });

  describe('Scenario 5: Edge Cases and Error Handling', () => {
    it('should handle zero exposure gracefully', () => {
      const zeroExpoData: FHData = {
        hits: { 'Control': 0, 'Pace': 0, 'Boundary': 0, 'Truth': 0, 'Recognition': 0, 'Bonding': 0, 'Stress': 0 },
        expo: { 'Control': 0, 'Pace': 0, 'Boundary': 0, 'Truth': 0, 'Recognition': 0, 'Bonding': 0, 'Stress': 0 },
        lockedFamily: 'Control'
      };

      engine.startFaceSelection(zeroExpoData);
      const triad = engine.processTriadSelection('sovereign');
      engine.processDuelRound('rebel');
      
      const result = engine.getFinalResult();
      console.log('\n🎭 Zero Exposure Result:');
      console.log('🎯 Winner:', result.winner);
      console.log('📊 Face priors:', result.facePrior.map(p => p.toFixed(3)));
      console.log('📈 Final scores:', result.finalScores.map(s => s.toFixed(2)));

      // With zero exposure, all faces should have equal priors
      expect(result.facePrior.every(p => Math.abs(p - 1/3) < 0.01)).toBe(true);
    });

    it('should handle single line exposure', () => {
      const singleExpoData: FHData = {
        hits: { 'Control': 1, 'Pace': 0, 'Boundary': 0, 'Truth': 0, 'Recognition': 0, 'Bonding': 0, 'Stress': 0 },
        expo: { 'Control': 1, 'Pace': 0, 'Boundary': 0, 'Truth': 0, 'Recognition': 0, 'Bonding': 0, 'Stress': 0 },
        lockedFamily: 'Control'
      };

      engine.startFaceSelection(singleExpoData);
      const triad = engine.processTriadSelection('sovereign');
      engine.processDuelRound('rebel');
      
      const result = engine.getFinalResult();
      console.log('\n🎭 Single Exposure Result:');
      console.log('🎯 Winner:', result.winner);
      console.log('📊 Face priors:', result.facePrior.map(p => p.toFixed(3)));
      console.log('📈 Final scores:', result.finalScores.map(s => s.toFixed(2)));

      // Should still produce valid results
      expect(result.winner).toBeDefined();
      expect(result.faces).toHaveLength(3);
    });
  });

  describe('Scenario 6: Performance and Determinism', () => {
    it('should produce identical results for identical inputs', () => {
      const fhData: FHData = {
        hits: { 'Control': 4, 'Pace': 2, 'Boundary': 1, 'Truth': 3, 'Recognition': 2, 'Bonding': 1, 'Stress': 0 },
        expo: { 'Control': 6, 'Pace': 4, 'Boundary': 3, 'Truth': 5, 'Recognition': 4, 'Bonding': 2, 'Stress': 1 },
        lockedFamily: 'Control'
      };

      // Run first time
      engine.startFaceSelection(fhData);
      engine.processTriadSelection('sovereign');
      engine.processDuelRound('rebel');
      const result1 = engine.getFinalResult();

      // Reset and run again
      engine.reset();
      engine.startFaceSelection(fhData);
      engine.processTriadSelection('sovereign');
      engine.processDuelRound('rebel');
      const result2 = engine.getFinalResult();

      console.log('\n🔄 Determinism Test:');
      console.log('🎯 Result 1 winner:', result1.winner);
      console.log('🎯 Result 2 winner:', result2.winner);
      console.log('📊 Result 1 scores:', result1.finalScores.map(s => s.toFixed(2)));
      console.log('📊 Result 2 scores:', result2.finalScores.map(s => s.toFixed(2)));

      // Results should be identical
      expect(result1.winner).toBe(result2.winner);
      expect(result1.finalScores).toEqual(result2.finalScores);
      expect(result1.facePrior).toEqual(result2.facePrior);
      expect(result1.commitStage).toBe(result2.commitStage);
    });
  });
});
