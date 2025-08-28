// FH→Face Bridge Engine Tests - GroundZero v3.1
// Tests the new FH→Face Heavy-Weight bridge system

import { describe, it, expect, beforeEach } from 'vitest';
import FHFaceBridge, { FHData, FacePriorResult } from '../lib/quiz-v2/fhFaceBridge';
import { V3_FACE_ANCHOR_LINES, V3_FACE_MAPPING, V3_EVIDENCE } from '../lib/quiz-v2/v3Config';

describe('FH→Face Bridge Engine', () => {
  let sampleFHData: FHData;

  beforeEach(() => {
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

  describe('Anchor Line Validation', () => {
    it('should validate all anchor lines are properly configured', () => {
      const validation = FHFaceBridge.validateAnchorLines();
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should have exactly 2 anchor lines per face', () => {
      const allFaces = Object.values(V3_FACE_MAPPING).flat();
      allFaces.forEach(face => {
        const anchorLines = V3_FACE_ANCHOR_LINES[face];
        expect(anchorLines).toBeDefined();
        expect(anchorLines).toHaveLength(2);
      });
    });

    it('should have valid line references in anchor lines', () => {
      const validLines = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
      const allFaces = Object.values(V3_FACE_MAPPING).flat();
      
      allFaces.forEach(face => {
        const anchorLines = V3_FACE_ANCHOR_LINES[face];
        anchorLines.forEach(line => {
          expect(validLines).toContain(line);
        });
      });
    });
  });

  describe('Line Attraction Computation', () => {
    it('should compute attractions for all lines', () => {
      const debugInfo = FHFaceBridge.getDebugInfo(sampleFHData);
      const { lineAttractions } = debugInfo;
      
      // Should have attractions for all 7 lines
      expect(Object.keys(lineAttractions)).toHaveLength(7);
      expect(lineAttractions['Control']).toBeDefined();
      expect(lineAttractions['Pace']).toBeDefined();
      expect(lineAttractions['Boundary']).toBeDefined();
      expect(lineAttractions['Truth']).toBeDefined();
      expect(lineAttractions['Recognition']).toBeDefined();
      expect(lineAttractions['Bonding']).toBeDefined();
      expect(lineAttractions['Stress']).toBeDefined();
    });

    it('should compute hits rate correctly', () => {
      const debugInfo = FHFaceBridge.getDebugInfo(sampleFHData);
      const { lineAttractions } = debugInfo;
      
      // Control: hits=3, expo=5 → hits_rate = 3/5 = 0.6
      // Truth: hits=4, expo=6 → hits_rate = 4/6 = 0.67
      // Stress: hits=0, expo=1 → hits_rate = 0/1 = 0
      
      expect(lineAttractions['Control']).toBeGreaterThan(0);
      expect(lineAttractions['Truth']).toBeGreaterThan(lineAttractions['Control']);
      expect(lineAttractions['Stress']).toBeLessThan(lineAttractions['Control']);
    });

    it('should normalize exposure correctly', () => {
      const debugInfo = FHFaceBridge.getDebugInfo(sampleFHData);
      const { lineAttractions } = debugInfo;
      
      // Max exposure is 6 (Truth)
      // Control: expo=5 → expo_norm = 5/6 = 0.83
      // Truth: expo=6 → expo_norm = 6/6 = 1.0
      // Stress: expo=1 → expo_norm = 1/6 = 0.17
      
      expect(lineAttractions['Truth']).toBeGreaterThan(lineAttractions['Control']);
      expect(lineAttractions['Control']).toBeGreaterThan(lineAttractions['Stress']);
    });

    it('should apply conviction weights correctly', () => {
      const debugInfo = FHFaceBridge.getDebugInfo(sampleFHData);
      const { lineAttractions } = debugInfo;
      
      // Control: hits_rate=0.6, expo=5 → conviction=1.0 (high threshold met)
      // Truth: hits_rate=0.67, expo=6 → conviction=1.0 (high threshold met)
      // Pace: hits_rate=0.5, expo=4 → conviction=0.5 (medium threshold met)
      // Stress: hits_rate=0, expo=1 → conviction=0 (no threshold met)
      
      expect(lineAttractions['Control']).toBeGreaterThan(0.5);
      expect(lineAttractions['Truth']).toBeGreaterThan(0.5);
      expect(lineAttractions['Pace']).toBeGreaterThan(0.2);
      expect(lineAttractions['Stress']).toBeLessThan(0.3);
    });
  });

  describe('Face Prior Computation', () => {
    it('should compute face priors for Control family', () => {
      const result = FHFaceBridge.computeFacePriors(sampleFHData);
      
      expect(result.locked_family).toBe('Control');
      expect(result.faces).toEqual(['sovereign', 'rebel', 'catalyst']);
      expect(result.face_prior).toHaveLength(3);
      expect(result.face_prior.reduce((sum, p) => sum + p, 0)).toBeCloseTo(1.0, 5);
    });

    it('should use correct anchor lines for Control faces', () => {
      const result = FHFaceBridge.computeFacePriors(sampleFHData);
      const { anchor_line_attractions } = result;
      
      // sovereign ← (Recognition, Truth)
      // rebel ← (Stress, Pace)
      // catalyst ← (Boundary, Truth)
      
      expect(result.faces).toContain('sovereign');
      expect(result.faces).toContain('rebel');
      expect(result.faces).toContain('catalyst');
      
      // Check that anchor line attractions are computed
      expect(anchor_line_attractions['Recognition']).toBeDefined();
      expect(anchor_line_attractions['Truth']).toBeDefined();
      expect(anchor_line_attractions['Stress']).toBeDefined();
      expect(anchor_line_attractions['Pace']).toBeDefined();
      expect(anchor_line_attractions['Boundary']).toBeDefined();
    });

    it('should compute face attractions as sum of anchor lines', () => {
      const result = FHFaceBridge.computeFacePriors(sampleFHData);
      const { face_attractions, anchor_line_attractions } = result;
      
      // sovereign = Recognition + Truth
      const expectedSovereign = 
        (anchor_line_attractions['Recognition'] || 0) + 
        (anchor_line_attractions['Truth'] || 0);
      
      expect(face_attractions['sovereign']).toBeCloseTo(expectedSovereign, 5);
    });

    it('should apply softmax to face attractions', () => {
      const result = FHFaceBridge.computeFacePriors(sampleFHData);
      const { face_prior } = result;
      
      // All probabilities should be between 0 and 1
      face_prior.forEach(p => {
        expect(p).toBeGreaterThanOrEqual(0);
        expect(p).toBeLessThanOrEqual(1);
      });
      
      // Sum should equal 1
      const sum = face_prior.reduce((s, p) => s + p, 0);
      expect(sum).toBeCloseTo(1.0, 5);
    });
  });

  describe('Different Family Scenarios', () => {
    it('should handle Pace family correctly', () => {
      const paceFHData: FHData = {
        hits: { 'Control': 1, 'Pace': 4, 'Boundary': 2, 'Truth': 3, 'Recognition': 1, 'Bonding': 0, 'Stress': 2 },
        expo: { 'Control': 3, 'Pace': 6, 'Boundary': 4, 'Truth': 5, 'Recognition': 2, 'Bonding': 1, 'Stress': 3 },
        lockedFamily: 'Pace'
      };
      
      const result = FHFaceBridge.computeFacePriors(paceFHData);
      
      expect(result.locked_family).toBe('Pace');
      expect(result.faces).toEqual(['strategist', 'navigator', 'visionary']);
      expect(result.face_prior).toHaveLength(3);
    });

    it('should handle Truth family correctly', () => {
      const truthFHData: FHData = {
        hits: { 'Control': 2, 'Pace': 1, 'Boundary': 3, 'Truth': 5, 'Recognition': 2, 'Bonding': 1, 'Stress': 0 },
        expo: { 'Control': 4, 'Pace': 3, 'Boundary': 5, 'Truth': 7, 'Recognition': 3, 'Bonding': 2, 'Stress': 1 },
        lockedFamily: 'Truth'
      };
      
      const result = FHFaceBridge.computeFacePriors(truthFHData);
      
      expect(result.locked_family).toBe('Truth');
      expect(result.faces).toEqual(['seeker', 'architect', 'alchemist']);
      expect(result.face_prior).toHaveLength(3);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero exposure gracefully', () => {
      const zeroExpoData: FHData = {
        hits: { 'Control': 0, 'Pace': 0, 'Boundary': 0, 'Truth': 0, 'Recognition': 0, 'Bonding': 0, 'Stress': 0 },
        expo: { 'Control': 0, 'Pace': 0, 'Boundary': 0, 'Truth': 0, 'Recognition': 0, 'Bonding': 0, 'Stress': 0 },
        lockedFamily: 'Control'
      };
      
      const result = FHFaceBridge.computeFacePriors(zeroExpoData);
      
      // Should still produce valid priors (equal distribution)
      expect(result.face_prior).toHaveLength(3);
      expect(result.face_prior.every(p => p === 1/3)).toBe(true);
    });

    it('should handle single line exposure', () => {
      const singleExpoData: FHData = {
        hits: { 'Control': 1, 'Pace': 0, 'Boundary': 0, 'Truth': 0, 'Recognition': 0, 'Bonding': 0, 'Stress': 0 },
        expo: { 'Control': 1, 'Pace': 0, 'Boundary': 0, 'Truth': 0, 'Recognition': 0, 'Bonding': 0, 'Stress': 0 },
        lockedFamily: 'Control'
      };
      
      const result = FHFaceBridge.computeFacePriors(singleExpoData);
      
      expect(result.face_prior).toHaveLength(3);
      expect(result.face_prior.reduce((sum, p) => sum + p, 0)).toBeCloseTo(1.0, 5);
    });
  });

  describe('Debug Information', () => {
    it('should provide comprehensive debug info', () => {
      const debugInfo = FHFaceBridge.getDebugInfo(sampleFHData);
      
      expect(debugInfo.lineAttractions).toBeDefined();
      expect(debugInfo.faceAttractions).toBeDefined();
      expect(debugInfo.facePrior).toBeDefined();
      expect(debugInfo.anchorLineMapping).toBeDefined();
      
      // Check anchor line mapping for Control faces
      expect(debugInfo.anchorLineMapping['sovereign']).toEqual(['Recognition', 'Truth']);
      expect(debugInfo.anchorLineMapping['rebel']).toEqual(['Stress', 'Pace']);
      expect(debugInfo.anchorLineMapping['catalyst']).toEqual(['Boundary', 'Truth']);
    });

    it('should show attraction scores in debug info', () => {
      const debugInfo = FHFaceBridge.getDebugInfo(sampleFHData);
      
      // Line attractions should be computed
      expect(debugInfo.lineAttractions['Control']).toBeGreaterThan(0);
      expect(debugInfo.lineAttractions['Truth']).toBeGreaterThan(0);
      
      // Face attractions should be computed
      expect(debugInfo.faceAttractions['sovereign']).toBeGreaterThan(0);
      expect(debugInfo.faceAttractions['rebel']).toBeGreaterThan(0);
      expect(debugInfo.faceAttractions['catalyst']).toBeGreaterThan(0);
    });
  });

  describe('Mathematical Properties', () => {
    it('should maintain probability distribution properties', () => {
      const result = FHFaceBridge.computeFacePriors(sampleFHData);
      const { face_prior } = result;
      
      // All probabilities should be non-negative
      face_prior.forEach(p => expect(p).toBeGreaterThanOrEqual(0));
      
      // Sum should equal 1
      const sum = face_prior.reduce((s, p) => s + p, 0);
      expect(sum).toBeCloseTo(1.0, 5);
      
      // Should have 3 faces
      expect(face_prior).toHaveLength(3);
    });

    it('should produce deterministic results for same input', () => {
      const result1 = FHFaceBridge.computeFacePriors(sampleFHData);
      const result2 = FHFaceBridge.computeFacePriors(sampleFHData);
      
      expect(result1.face_prior).toEqual(result2.face_prior);
      expect(result1.face_attractions).toEqual(result2.face_attractions);
    });
  });
});
