// Face Selection Engine - GroundZero v3.1
// Implements weighted scoring with FH→Face bridge and early commit logic

import { Line, Face, BehaviorSample } from '../../types/quiz-v2';
import { V3_FACE_MAPPING, V3_BEHAVIOR, V3_FLOW, V3_UTILS } from './v3Config';
import FHFaceBridge, { FHData, FacePriorResult } from './fhFaceBridge';

export interface FaceTriad {
  id: string;
  faces: [Face, Face, Face];
  order: 'prior_based' | 'alphabetical';
}

export interface FaceDuel {
  id: string;
  face1: Face;
  face2: Face;
  round: 1 | 2;
}

export interface FaceTiebreak {
  face1: Face;
  face2: Face;
  winner: Face;
  method: 'latency' | 'switches' | 'deliberation' | 'alphabetical';
}

export interface FaceSelectionResult {
  winner: Face;
  commitStage: 'after_duel' | 'after_final';
  finalScores: number[];
  facePrior: number[];
  faces: Face[];  // Add faces array to result
  weights: typeof V3_FLOW.FACE_WEIGHTS;
  scoreHistory: Array<{
    question: string;
    score_delta: number;
    score_after: number[];
    picked_face: Face;
  }>;
}

export class FaceSelectionEngine {
  private currentTriad: FaceTriad | null = null;
  private currentDuel: FaceDuel | null = null;
  private tiebreakResult: FaceTiebreak | null = null;
  
  // V3.1: FH→Face Heavy-Weight additions
  private facePrior: number[] = [];
  private faceScore: number[] = [];
  private faces: Face[] = [];
  private lockedFamily: Line | null = null;
  private scoreHistory: Array<{
    question: string;
    score_delta: number;
    score_after: number[];
    picked_face: Face;
  }> = [];

  constructor() {
    // Initialize empty state
  }

  /**
   * Start face selection with FH→Face bridge
   * Computes face priors and initializes weighted scoring
   */
  startFaceSelection(fhData: FHData): FaceTriad {
    this.lockedFamily = fhData.lockedFamily;
    
    // Compute face priors from FH data
    const priorResult = FHFaceBridge.computeFacePriors(fhData);
    this.facePrior = priorResult.face_prior;
    this.faces = priorResult.faces;
    
    // Initialize face scores with prior influence
    this.faceScore = this.facePrior.map(p => V3_FLOW.FACE_WEIGHTS.LAMBDA_PRIOR * p);
    
    // Create triad with faces ordered by prior (highest first)
    const orderedFaces = this.orderFacesByPrior();
    this.currentTriad = {
      id: `triad_${fhData.lockedFamily}`,
      faces: orderedFaces,
      order: 'prior_based'
    };
    
    console.log(`🎭 Face Selection started for ${fhData.lockedFamily}`);
    console.log(`📊 Face priors:`, this.faces.map((face, i) => `${face}: ${(this.facePrior[i] * 100).toFixed(1)}%`));
    console.log(`🎯 Initial scores:`, this.faces.map((face, i) => `${face}: ${this.faceScore[i].toFixed(2)}`));
    
    return this.currentTriad;
  }

  /**
   * Process triad selection (Q1)
   * Adds w_triad weight to selected face
   */
  processTriadSelection(selectedFace: Face): FaceDuel | null {
    if (!this.currentTriad) {
      throw new Error('Must start face selection before processing triad');
    }
    
    const faceIndex = this.faces.indexOf(selectedFace);
    if (faceIndex === -1) {
      throw new Error(`Invalid face selection: ${selectedFace}`);
    }
    
    // Add w_triad weight to selected face
    const scoreDelta = V3_FLOW.FACE_WEIGHTS.W_TRIAD;
    this.faceScore[faceIndex] += scoreDelta;
    
    // Record score change
    this.scoreHistory.push({
      question: 'Triad',
      score_delta: scoreDelta,
      score_after: [...this.faceScore],
      picked_face: selectedFace
    });
    
    console.log(`🎭 Triad selection: ${selectedFace} +${scoreDelta} → ${this.faceScore[faceIndex].toFixed(2)}`);
    console.log(`📊 Current scores:`, this.faces.map((face, i) => `${face}: ${this.faceScore[i].toFixed(2)}`));
    
    // Determine top 2 faces for duel
    const [topIndex, secondIndex] = V3_UTILS.getTop2Indices(this.faceScore);
    const topFace = this.faces[topIndex];
    const secondFace = this.faces[secondIndex];
    
    this.currentDuel = {
      id: `duel_${topFace}_${secondFace}`,
      face1: topFace,
      face2: secondFace,
      round: 1
    };
    
    return this.currentDuel;
  }

  /**
   * Process duel round (Q2 or Q3)
   * Adds w_duel1 or w_duel2 weight to selected face
   */
  processDuelRound(winner: Face): boolean {
    if (!this.currentDuel) {
      throw new Error('Must process triad before duel');
    }
    
    const faceIndex = this.faces.indexOf(winner);
    if (faceIndex === -1) {
      throw new Error(`Invalid face selection: ${winner}`);
    }
    
    // Determine weight based on round
    const isFirstDuel = this.currentDuel.round === 1;
    const scoreDelta = isFirstDuel ? V3_FLOW.FACE_WEIGHTS.W_DUEL1 : V3_FLOW.FACE_WEIGHTS.W_DUEL2;
    
    // Add weight to selected face
    this.faceScore[faceIndex] += scoreDelta;
    
    // Record score change
    this.scoreHistory.push({
      question: `Duel Round ${this.currentDuel.round}`,
      score_delta: scoreDelta,
      score_after: [...this.faceScore],
      picked_face: winner
    });
    
    console.log(`⚔️ Duel Round ${this.currentDuel.round}: ${winner} +${scoreDelta} → ${this.faceScore[faceIndex].toFixed(2)}`);
    console.log(`📊 Current scores:`, this.faces.map((face, i) => `${face}: ${this.faceScore[i].toFixed(2)}`));
    
    // Check if we can commit early after first duel
    if (isFirstDuel && this.canCommitEarly()) {
      console.log(`🎯 Early commit possible after first duel!`);
      return true; // Commit now
    }
    
    // If first duel, prepare for second duel
    if (isFirstDuel) {
      this.currentDuel.round = 2;
      return false; // Continue to second duel
    }
    
    // Second duel completed
    return true; // Commit now
  }

  /**
   * Execute tiebreak if needed (deterministic fallback)
   */
  executeTiebreak(behavior: BehaviorSample): Face {
    if (!this.currentDuel) {
      throw new Error('Must have active duel for tiebreak');
    }
    
    const { face1, face2 } = this.currentDuel;
    
    // Deterministic tiebreak using behavior metrics
    const winner = this.determineTiebreakWinner(behavior, face1, face2);
    
    this.tiebreakResult = {
      face1,
      face2,
      winner,
      method: this.getTiebreakMethod(behavior)
    };
    
    console.log(`🔀 Tiebreak executed: ${winner} wins via ${this.tiebreakResult.method}`);
    
    return winner;
  }

  /**
   * Get final face selection result
   */
  getFinalResult(): FaceSelectionResult {
    if (!this.lockedFamily || this.faces.length === 0) {
      throw new Error('Face selection not started');
    }
    
    // Determine winner by highest score
    const winnerIndex = this.faceScore.indexOf(Math.max(...this.faceScore));
    const winner = this.faces[winnerIndex];
    
    // Determine commit stage
    const commitStage = this.determineCommitStage();
    
    const result: FaceSelectionResult = {
      winner,
      commitStage,
      finalScores: [...this.faceScore],
      facePrior: [...this.facePrior],
      faces: [...this.faces],  // Add faces array to result
      weights: V3_FLOW.FACE_WEIGHTS,
      scoreHistory: [...this.scoreHistory]
    };
    
    console.log(`🏆 Face selection complete: ${winner} wins`);
    console.log(`📊 Final scores:`, this.faces.map((face, i) => `${face}: ${this.faceScore[i].toFixed(2)}`));
    console.log(`🎯 Commit stage: ${commitStage}`);
    
    return result;
  }

  /**
   * Reset engine state
   */
  reset(): void {
    this.currentTriad = null;
    this.currentDuel = null;
    this.tiebreakResult = null;
    this.facePrior = [];
    this.faceScore = [];
    this.faces = [];
    this.lockedFamily = null;
    this.scoreHistory = [];
  }

  // ==================== PRIVATE METHODS ====================

  /**
   * Order faces by prior (highest first)
   */
  private orderFacesByPrior(): [Face, Face, Face] {
    const indexed = this.faces.map((face, index) => ({ face, prior: this.facePrior[index] }));
    indexed.sort((a, b) => b.prior - a.prior);
    return [indexed[0].face, indexed[1].face, indexed[2].face];
  }

  /**
   * Check if early commit is possible after first duel
   */
  private canCommitEarly(): boolean {
    return V3_UTILS.canEarlyCommit(this.faceScore, V3_FLOW.FACE_WEIGHTS.THETA_EARLY);
  }

  /**
   * Determine commit stage based on scoring history
   */
  private determineCommitStage(): 'after_duel' | 'after_final' {
    // If we have exactly 3 score changes (Triad + Duel1 + Duel2), we went to final
    // If we have exactly 2 score changes (Triad + Duel1), we committed early
    return this.scoreHistory.length === 2 ? 'after_duel' : 'after_final';
  }

  /**
   * Determine tiebreak winner using behavior metrics
   */
  private determineTiebreakWinner(behavior: BehaviorSample, face1: Face, face2: Face): Face {
    // Priority 1: Latency (≤2000ms considered "clean")
    if (behavior.latency_ms <= V3_BEHAVIOR.CLEAN_STRIKE.LATENCY_MS) {
      return face1; // First face wins on clean latency
    }
    
    // Priority 2: Switches (0 is best)
    if (behavior.switches === 0) {
      return face1; // First face wins on no switches
    }
    
    // Priority 3: Deliberation (lower is better)
    if (behavior.deliberation_ms < V3_BEHAVIOR.HOVER_READ_GAP.DELIBERATION_MS) {
      return face1; // First face wins on low deliberation
    }
    
    // Final fallback: alphabetical order
    return face1.localeCompare(face2) <= 0 ? face1 : face2;
  }

  /**
   * Get tiebreak method used
   */
  private getTiebreakMethod(behavior: BehaviorSample): 'latency' | 'switches' | 'deliberation' | 'alphabetical' {
    if (behavior.latency_ms <= V3_BEHAVIOR.CLEAN_STRIKE.LATENCY_MS) return 'latency';
    if (behavior.switches === 0) return 'switches';
    if (behavior.deliberation_ms < V3_BEHAVIOR.HOVER_READ_GAP.DELIBERATION_MS) return 'deliberation';
    return 'alphabetical';
  }

  /**
   * Get debug information
   */
  getDebugInfo(): {
    currentTriad: FaceTriad | null;
    currentDuel: FaceDuel | null;
    tiebreakResult: FaceTiebreak | null;
    facePrior: number[];
    faceScore: number[];
    faces: Face[];
    lockedFamily: Line | null;
    scoreHistory: typeof this.scoreHistory;
  } {
    return {
      currentTriad: this.currentTriad,
      currentDuel: this.currentDuel,
      tiebreakResult: this.tiebreakResult,
      facePrior: [...this.facePrior],
      faceScore: [...this.faceScore],
      faces: [...this.faces],
      lockedFamily: this.lockedFamily,
      scoreHistory: [...this.scoreHistory]
    };
  }
}

export default FaceSelectionEngine;
