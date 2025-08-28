// FH→Face Bridge Engine - GroundZero v3.1
// Computes face priors from FH data using anchor line mapping

import { Line, Face } from '../../types/quiz-v2';
import { V3_FACE_ANCHOR_LINES, V3_FACE_MAPPING, V3_EVIDENCE, V3_UTILS } from './v3Config';

export interface FHData {
  hits: Record<Line, number>;
  expo: Record<Line, number>;
  lockedFamily: Line;
}

export interface FacePriorResult {
  face_prior: number[];           // [3] probabilities across the 3 faces
  face_attractions: Record<Face, number>;  // raw attraction scores per face
  anchor_line_attractions: Record<Line, number>;  // attraction scores per anchor line
  locked_family: Line;
  faces: Face[];
}

/**
 * FH→Face Bridge Engine
 * Computes face priors from FH data using anchor line mapping
 */
export class FHFaceBridge {
  
  /**
   * Compute face priors from FH data
   * Uses anchor line mapping to bridge FH evidence to face selection
   */
  static computeFacePriors(fhData: FHData): FacePriorResult {
    const { hits, expo, lockedFamily } = fhData;
    
    // Get the three faces for the locked family
    const faces = this.getFacesForFamily(lockedFamily);
    if (faces.length !== 3) {
      throw new Error(`Expected 3 faces for family ${lockedFamily}, got ${faces.length}`);
    }
    
    // Compute attraction scores for all lines
    const lineAttractions = this.computeLineAttractions(hits, expo);
    
    // Compute raw face attractions using anchor lines
    const faceAttractions: Record<Face, number> = {};
    faces.forEach(face => {
      const anchorLines = V3_FACE_ANCHOR_LINES[face];
      if (!anchorLines || anchorLines.length !== 2) {
        throw new Error(`Missing or invalid anchor lines for face ${face}`);
      }
      
      // Sum attractions from both anchor lines
      const anchor1Attraction = lineAttractions[anchorLines[0]] || 0;
      const anchor2Attraction = lineAttractions[anchorLines[1]] || 0;
      faceAttractions[face] = anchor1Attraction + anchor2Attraction;
    });
    
    // Convert raw attractions to probabilities using softmax
    const rawAttractions = faces.map(face => faceAttractions[face]);
    const face_prior = V3_UTILS.softmax(rawAttractions);
    
    return {
      face_prior,
      face_attractions: faceAttractions,
      anchor_line_attractions: lineAttractions,
      locked_family: lockedFamily,
      faces
    };
  }
  
  /**
   * Compute attraction score for a single line
   * Aℓ = 0.65*hits_rateℓ + 0.25*expo_normℓ + 0.10*convictionℓ
   */
  private static computeLineAttractions(hits: Record<Line, number>, expo: Record<Line, number>): Record<Line, number> {
    const allLines: Line[] = ['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'];
    const maxExpo = Math.max(...allLines.map(line => expo[line] || 0));
    
    const attractions: Record<Line, number> = {};
    
    allLines.forEach(line => {
      const lineHits = hits[line] || 0;
      const lineExpo = expo[line] || 0;
      
      // 1. Hits rate: hits / max(1, expo)
      const hitsRate = lineExpo > 0 ? lineHits / lineExpo : 0;
      
      // 2. Exposure normalization: expo / max(1, max_expo_over_7)
      const expoNorm = maxExpo > 0 ? lineExpo / maxExpo : 0;
      
      // 3. Conviction: 1 if (hits_rate ≥ 0.6 and expo ≥ 2) else 0.5 if hits_rate ≥ 0.5 else 0
      let conviction = 0;
      if (hitsRate >= V3_EVIDENCE.FH_CONVICTION.HIGH_THRESHOLD && lineExpo >= V3_EVIDENCE.FH_CONVICTION.MIN_EXPOSURE) {
        conviction = 1.0;
      } else if (hitsRate >= V3_EVIDENCE.FH_CONVICTION.MEDIUM_THRESHOLD) {
        conviction = 0.5;
      }
      
      // 4. Weighted combination
      const attraction = 
        V3_EVIDENCE.FH_ATTRACTION_WEIGHTS.HITS_RATE_WEIGHT * hitsRate +
        V3_EVIDENCE.FH_ATTRACTION_WEIGHTS.EXPO_NORM_WEIGHT * expoNorm +
        V3_EVIDENCE.FH_ATTRACTION_WEIGHTS.CONVICTION_WEIGHT * conviction;
      
      attractions[line] = attraction;
    });
    
    return attractions;
  }
  
  /**
   * Get faces for a specific family
   */
  private static getFacesForFamily(family: Line): Face[] {
    const familyKey = family.toUpperCase() as keyof typeof V3_FACE_MAPPING;
    return V3_FACE_MAPPING[familyKey] || [];
  }
  
  /**
   * Get debug information for face prior computation
   */
  static getDebugInfo(fhData: FHData): {
    lineAttractions: Record<Line, number>;
    faceAttractions: Record<Face, number>;
    facePrior: number[];
    anchorLineMapping: Record<Face, [Line, Line]>;
  } {
    const { hits, expo, lockedFamily } = fhData;
    const faces = this.getFacesForFamily(lockedFamily);
    
    const lineAttractions = this.computeLineAttractions(hits, expo);
    const faceAttractions: Record<Face, number> = {};
    const anchorLineMapping: Record<Face, [Line, Line]> = {};
    
    faces.forEach(face => {
      const anchorLines = V3_FACE_ANCHOR_LINES[face];
      if (anchorLines && anchorLines.length === 2) {
        anchorLineMapping[face] = anchorLines;
        const anchor1Attraction = lineAttractions[anchorLines[0]] || 0;
        const anchor2Attraction = lineAttractions[anchorLines[1]] || 0;
        faceAttractions[face] = anchor1Attraction + anchor2Attraction;
      }
    });
    
    const rawAttractions = faces.map(face => faceAttractions[face]);
    const facePrior = V3_UTILS.softmax(rawAttractions);
    
    return {
      lineAttractions,
      faceAttractions,
      facePrior,
      anchorLineMapping
    };
  }
  
  /**
   * Validate anchor line mapping integrity
   */
  static validateAnchorLines(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const allFaces = Object.values(V3_FACE_MAPPING).flat();
    
    allFaces.forEach(face => {
      const anchorLines = V3_FACE_ANCHOR_LINES[face];
      if (!anchorLines) {
        errors.push(`Missing anchor lines for face: ${face}`);
      } else if (anchorLines.length !== 2) {
        errors.push(`Invalid anchor lines count for face ${face}: ${anchorLines.length}`);
      } else {
        anchorLines.forEach(line => {
          if (!['Control', 'Pace', 'Boundary', 'Truth', 'Recognition', 'Bonding', 'Stress'].includes(line)) {
            errors.push(`Invalid anchor line for face ${face}: ${line}`);
          }
        });
      }
    });
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}

export default FHFaceBridge;
