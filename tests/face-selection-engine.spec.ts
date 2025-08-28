// Face Selection Engine Tests
// Validates the GroundZero v3 face resolution implementation

import { describe, it, expect, beforeEach } from 'vitest';
import FaceSelectionEngine from '../lib/quiz-v2/faceSelectionEngine';
import { V3_FACE_MAPPING } from '../lib/quiz-v2/v3Config';

describe('Face Selection Engine Tests', () => {
  let faceEngine: FaceSelectionEngine;

  beforeEach(() => {
    faceEngine = new FaceSelectionEngine();
  });

  describe('GroundZero v3 Face Selection Flow', () => {
    it('should start face selection with correct triad', () => {
      const triad = faceEngine.startFaceSelection('Control');
      
      expect(triad.line).toBe('Control');
      expect(triad.faces).toEqual(['sovereign', 'rebel', 'catalyst']);
      expect(triad.challenger).toBeDefined();
      expect(triad.challenger).not.toBe(triad.selectedFace);
    });

    it('should process triad selection correctly', () => {
      faceEngine.startFaceSelection('Pace');
      const duel = faceEngine.processTriadSelection('strategist');
      
      expect(duel).toBeDefined();
      expect(duel.triadPick).toBe('strategist');
      expect(duel.challenger).toBeDefined();
      expect(duel.tiebreakNeeded).toBe(false);
    });

    it('should handle duel rounds correctly', () => {
      faceEngine.startFaceSelection('Boundary');
      faceEngine.processTriadSelection('sentinel');
      
      const round1Complete = faceEngine.processDuelRound('sentinel');
      expect(round1Complete).toBe(true);
      
      const finalResult = faceEngine.getFinalResult();
      expect(finalResult.selectedFace).toBe('sentinel');
      expect(finalResult.usedTiebreak).toBe(false);
    });

    it('should execute tiebreak when challenger wins first', () => {
      faceEngine.startFaceSelection('Truth');
      faceEngine.processTriadSelection('seeker');
      
      // Challenger wins first round
      faceEngine.processDuelRound('architect');
      
      // Execute tiebreak
      const tiebreakWinner = faceEngine.executeTiebreak({
        latency_ms: 1500,
        switches: 0,
        deliberation_ms: 1000
      });
      
      expect(tiebreakWinner).toBe('seeker'); // Should win on clean latency
      
      const finalResult = faceEngine.getFinalResult();
      expect(finalResult.usedTiebreak).toBe(true);
      expect(finalResult.tiebreakData).toBeDefined();
    });
  });

  describe('Face Mapping Validation', () => {
    it('should have correct face mappings for all lines', () => {
      const lines: Array<keyof typeof V3_FACE_MAPPING> = [
        'Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'
      ];
      
      lines.forEach(line => {
        const faces = V3_FACE_MAPPING[line];
        expect(faces).toBeDefined();
        expect(faces.length).toBe(3);
        expect(faces.every(face => typeof face === 'string')).toBe(true);
      });
    });

    it('should handle invalid line gracefully', () => {
      expect(() => {
        faceEngine.startFaceSelection('InvalidLine' as any);
      }).toThrow('Invalid face mapping for line: InvalidLine');
    });
  });

  describe('Tiebreak Logic', () => {
    it('should prioritize clean latency (≤2000ms)', () => {
      faceEngine.startFaceSelection('Control');
      faceEngine.processTriadSelection('sovereign');
      faceEngine.processDuelRound('rebel'); // Challenger wins
      
      const winner = faceEngine.executeTiebreak({
        latency_ms: 1500, // Clean latency
        switches: 1,
        deliberation_ms: 3000
      });
      
      expect(winner).toBe('sovereign'); // Should win on clean latency
    });

    it('should prioritize zero switches', () => {
      faceEngine.startFaceSelection('Pace');
      faceEngine.processTriadSelection('strategist');
      faceEngine.processDuelRound('navigator'); // Challenger wins
      
      const winner = faceEngine.executeTiebreak({
        latency_ms: 3000, // Not clean
        switches: 0, // Zero switches
        deliberation_ms: 3000
      });
      
      expect(winner).toBe('strategist'); // Should win on zero switches
    });

    it('should prioritize lower deliberation', () => {
      faceEngine.startFaceSelection('Boundary');
      faceEngine.processTriadSelection('sentinel');
      faceEngine.processDuelRound('equalizer'); // Challenger wins
      
      const winner = faceEngine.executeTiebreak({
        latency_ms: 3000, // Not clean
        switches: 1, // Not zero
        deliberation_ms: 1000 // Lower deliberation
      });
      
      expect(winner).toBe('sentinel'); // Should win on lower deliberation
    });

    it('should use fixed face order fallback', () => {
      faceEngine.startFaceSelection('Truth');
      faceEngine.processTriadSelection('seeker');
      faceEngine.processDuelRound('architect'); // Challenger wins
      
      const winner = faceEngine.executeTiebreak({
        latency_ms: 3000, // Not clean
        switches: 1, // Not zero
        deliberation_ms: 3000 // Not lower
      });
      
      // Should use alphabetical fallback
      expect(winner).toBe('architect'); // 'architect' < 'seeker' alphabetically
    });
  });

  describe('Deterministic Behavior', () => {
    it('should produce consistent results for same inputs', () => {
      const testCases = [
        { line: 'Control', selectedFace: 'sovereign', behavior: { latency_ms: 1500, switches: 0, deliberation_ms: 1000 } },
        { line: 'Pace', selectedFace: 'strategist', behavior: { latency_ms: 3000, switches: 0, deliberation_ms: 2000 } },
        { line: 'Boundary', selectedFace: 'sentinel', behavior: { latency_ms: 4000, switches: 1, deliberation_ms: 1000 } }
      ];
      
      testCases.forEach(testCase => {
        faceEngine.reset();
        
        faceEngine.startFaceSelection(testCase.line);
        faceEngine.processTriadSelection(testCase.selectedFace);
        faceEngine.processDuelRound(testCase.selectedFace); // Triad wins
        
        const result1 = faceEngine.getFinalResult();
        
        faceEngine.reset();
        
        faceEngine.startFaceSelection(testCase.line);
        faceEngine.processTriadSelection(testCase.selectedFace);
        faceEngine.processDuelRound(testCase.selectedFace); // Triad wins
        
        const result2 = faceEngine.getFinalResult();
        
        expect(result1.selectedFace).toBe(result2.selectedFace);
        expect(result1.usedTiebreak).toBe(result2.usedTiebreak);
      });
    });

    it('should handle edge cases gracefully', () => {
      // Test with edge case behavior values
      faceEngine.startFaceSelection('Recognition');
      faceEngine.processTriadSelection('spotlight');
      faceEngine.processDuelRound('mask'); // Challenger wins
      
      const winner = faceEngine.executeTiebreak({
        latency_ms: 0, // Edge case: 0ms
        switches: 0, // Edge case: 0 switches
        deliberation_ms: 0 // Edge case: 0ms deliberation
      });
      
      expect(winner).toBeDefined();
      expect(typeof winner).toBe('string');
    });
  });

  describe('State Management', () => {
    it('should reset state correctly', () => {
      faceEngine.startFaceSelection('Bonding');
      faceEngine.processTriadSelection('provider');
      
      const debugBefore = faceEngine.getDebugInfo();
      expect(debugBefore.currentTriad).toBeDefined();
      
      faceEngine.reset();
      
      const debugAfter = faceEngine.getDebugInfo();
      expect(debugAfter.currentTriad).toBeNull();
      expect(debugAfter.currentDuel).toBeNull();
      expect(debugAfter.tiebreakResult).toBeNull();
    });

    it('should provide debug information', () => {
      faceEngine.startFaceSelection('Stress');
      const debugInfo = faceEngine.getDebugInfo();
      
      expect(debugInfo.currentTriad).toBeDefined();
      expect(debugInfo.currentDuel).toBeNull();
      expect(debugInfo.tiebreakResult).toBeNull();
    });
  });

  describe('Error Handling', () => {
    it('should throw error when processing triad without starting', () => {
      expect(() => {
        faceEngine.processTriadSelection('sovereign');
      }).toThrow('No active triad. Call startFaceSelection first.');
    });

    it('should throw error when processing duel without triad', () => {
      expect(() => {
        faceEngine.processDuelRound('sovereign');
      }).toThrow('No active duel. Call processTriadSelection first.');
    });

    it('should throw error when executing tiebreak without duel', () => {
      expect(() => {
        faceEngine.executeTiebreak({ latency_ms: 1000, switches: 0, deliberation_ms: 500 });
      }).toThrow('No active duel. Cannot execute tiebreak.');
    });

    it('should throw error when getting result without completion', () => {
      expect(() => {
        faceEngine.getFinalResult();
      }).toThrow('No face selection completed.');
    });
  });
});
