// GroundZero v3 Content ID Mapping System
// Centralized mapping for all quiz content IDs

import { Line, Face } from '../../types/quiz-v2';

// GroundZero content ID constants
export const GROUNDZERO_IDS = {
  // Family Hone (21 total)
  FH: {
    Q0: 'FH_Q0', // 7 options once
    A1: 'FH_A1', // 5 options each
    A2: 'FH_A2',
    A3: 'FH_A3',
    A4: 'FH_A4',
    A5: 'FH_A5',
    A6: 'FH_A6',
    A7: 'FH_A7',
    A8: 'FH_A8',
    A9: 'FH_A9',
    A10: 'FH_A10',
    A11: 'FH_A11',
    A12: 'FH_A12',
    A13: 'FH_A13',
    A14: 'FH_A14',
    A15: 'FH_A15',
    A16: 'FH_A16',
    A17: 'FH_A17',
    A18: 'FH_A18',
    A19: 'FH_A19',
    A20: 'FH_A20'
  },

  // Face Selection (28 total)
  FACE: {
    // Triads (7) - FC-<CODE>-1
    TRIAD: {
      CONTROL: 'FC-CTL-1',
      PACE: 'FC-PAC-1',
      BOUNDARY: 'FC-BND-1',
      TRUTH: 'FC-TRU-1',
      RECOGNITION: 'FC-REC-1',
      BONDING: 'FC-BON-1',
      STRESS: 'FC-STR-1'
    },
    // Duels (21) - FD-<CODE>-1..3
    DUEL: {
      CONTROL: ['FD-CTL-1', 'FD-CTL-2', 'FD-CTL-3'],
      PACE: ['FD-PAC-1', 'FD-PAC-2', 'FD-PAC-3'],
      BOUNDARY: ['FD-BND-1', 'FD-BND-2', 'FD-BND-3'],
      TRUTH: ['FD-TRU-1', 'FD-TRU-2', 'FD-TRU-3'],
      RECOGNITION: ['FD-REC-1', 'FD-REC-2', 'FD-REC-3'],
      BONDING: ['FD-BON-1', 'FD-BON-2', 'FD-BON-3'],
      STRESS: ['FD-STR-1', 'FD-STR-2', 'FD-STR-3']
    }
  },

  // Lines Assessment (42+ total)
  LINES: {
    // Base items (14) - L-<CODE>-1, L-<CODE>-2
    BASE: {
      CONTROL: ['L-CTL-1', 'L-CTL-2'],
      PACE: ['L-PAC-1', 'L-PAC-2'],
      BOUNDARY: ['L-BND-1', 'L-BND-2'],
      TRUTH: ['L-TRU-1', 'L-TRU-2'],
      RECOGNITION: ['L-REC-1', 'L-REC-2'],
      BONDING: ['L-BON-1', 'L-BON-2'],
      STRESS: ['L-STR-1', 'L-STR-2']
    },
    // Tiebreakers (14) - L_TB-<CODE>-1..2
    TIEBREAKER: {
      CONTROL: ['L_TB-CTL-1', 'L_TB-CTL-2'],
      PACE: ['L_TB-PAC-1', 'L_TB-PAC-2'],
      BOUNDARY: ['L_TB-BND-1', 'L_TB-BND-2'],
      TRUTH: ['L_TB-TRU-1', 'L_TB-TRU-2'],
      RECOGNITION: ['L_TB-REC-1', 'L_TB-REC-2'],
      BONDING: ['L_TB-BON-1', 'L_TB-BON-2'],
      STRESS: ['L_TB-STR-1', 'L_TB-STR-2']
    },
    // Optional Line Duels (21) - LD-<CODE>-1..3
    DUEL: {
      CONTROL: ['LD-CTL-1', 'LD-CTL-2', 'LD-CTL-3'],
      PACE: ['LD-PAC-1', 'LD-PAC-2', 'LD-PAC-3'],
      BOUNDARY: ['LD-BND-1', 'LD-BND-2', 'LD-BND-3'],
      TRUTH: ['LD-TRU-1', 'LD-TRU-2', 'LD-TRU-3'],
      RECOGNITION: ['LD-REC-1', 'LD-REC-2', 'LD-REC-3'],
      BONDING: ['LD-BON-1', 'LD-BON-2', 'LD-BON-3'],
      STRESS: ['LD-STR-1', 'LD-STR-2', 'LD-STR-3']
    }
  },

  // Miscellaneous (2 total)
  MISC: {
    REPUTATION_COST: 'MD-1',
    ROOM_RESISTANCE: 'MD-2'
  }
};

// Line code mapping for content IDs
export const LINE_CODES: Record<Line, string> = {
  Control: 'CTL',
  Pace: 'PAC',
  Boundary: 'BND',
  Truth: 'TRU',
  Recognition: 'REC',
  Bonding: 'BON',
  Stress: 'STR'
};

// Face mapping within families
export const FACE_MAPPING: Record<Line, Face[]> = {
  Control: ['sovereign', 'rebel', 'catalyst'],
  Pace: ['strategist', 'navigator', 'visionary'],
  Boundary: ['sentinel', 'equalizer', 'guardian'],
  Truth: ['seeker', 'architect', 'alchemist'],
  Recognition: ['spotlight', 'mask', 'artisan'],
  Bonding: ['provider', 'partner', 'servant'],
  Stress: ['diplomat', 'wanderer', 'catalyst']
};

/**
 * Content ID Manager for GroundZero v3
 * Handles all content ID generation and mapping
 */
export class ContentIDManager {
  private static instance: ContentIDManager;
  private contentRegistry: Map<string, any> = new Map();

  private constructor() {}

  static getInstance(): ContentIDManager {
    if (!ContentIDManager.instance) {
      ContentIDManager.instance = new ContentIDManager();
    }
    return ContentIDManager.instance;
  }

  /**
   * Get Family Hone content ID for a specific screen
   */
  getFHContentID(screenNumber: number): string {
    if (screenNumber === 0) {
      return GROUNDZERO_IDS.FH.Q0;
    }
    if (screenNumber >= 1 && screenNumber <= 20) {
      return GROUNDZERO_IDS.FH[`A${screenNumber}` as keyof typeof GROUNDZERO_IDS.FH];
    }
    throw new Error(`Invalid FH screen number: ${screenNumber}`);
  }

  /**
   * Get Face Triad content ID for a family
   */
  getFaceTriadID(family: Line): string {
    return GROUNDZERO_IDS.FACE.TRIAD[family.toUpperCase() as keyof typeof GROUNDZERO_IDS.FACE.TRIAD];
  }

  /**
   * Get Face Duel content ID for a family and duel number
   */
  getFaceDuelID(family: Line, duelNumber: 1 | 2 | 3): string {
    const familyCode = LINE_CODES[family];
    return `FD-${familyCode}-${duelNumber}`;
  }

  /**
   * Get Lines Base content ID for a family and item number
   */
  getLinesBaseID(family: Line, itemNumber: 1 | 2): string {
    const familyCode = LINE_CODES[family];
    return `L-${familyCode}-${itemNumber}`;
  }

  /**
   * Get Lines Tiebreaker content ID for a family and TB number
   */
  getLinesTiebreakerID(family: Line, tbNumber: 1 | 2): string {
    const familyCode = LINE_CODES[family];
    return `L_TB-${familyCode}-${tbNumber}`;
  }

  /**
   * Get Lines Duel content ID for a family and duel number
   */
  getLinesDuelID(family: Line, duelNumber: 1 | 2 | 3): string {
    const familyCode = LINE_CODES[family];
    return `LD-${familyCode}-${duelNumber}`;
  }

  /**
   * Get all content IDs for a specific family
   */
  getFamilyContentIDs(family: Line): {
    fh: string[];
    face: { triad: string; duels: string[] };
    lines: { base: string[]; tiebreakers: string[]; duels: string[] };
  } {
    const familyCode = LINE_CODES[family];
    
    return {
      fh: Array.from({ length: 21 }, (_, i) => 
        i === 0 ? `FH_Q0` : `FH_A${i}`
      ),
      face: {
        triad: `FC-${familyCode}-1`,
        duels: [`FD-${familyCode}-1`, `FD-${familyCode}-2`, `FD-${familyCode}-3`]
      },
      lines: {
        base: [`L-${familyCode}-1`, `L-${familyCode}-2`],
        tiebreakers: [`L_TB-${familyCode}-1`, `L_TB-${familyCode}-2`],
        duels: [`LD-${familyCode}-1`, `LD-${familyCode}-2`, `LD-${familyCode}-3`]
      }
    };
  }

  /**
   * Register content for a specific ID
   */
  registerContent(contentID: string, content: any): void {
    this.contentRegistry.set(contentID, content);
  }

  /**
   * Get content for a specific ID
   */
  getContent(contentID: string): any {
    return this.contentRegistry.get(contentID);
  }

  /**
   * Check if content exists for an ID
   */
  hasContent(contentID: string): boolean {
    return this.contentRegistry.has(contentID);
  }

  /**
   * Get all registered content IDs
   */
  getAllContentIDs(): string[] {
    // Return all GroundZero content IDs, not just registered ones
    const allIDs: string[] = [];
    
    // Add FH IDs
    Object.values(GROUNDZERO_IDS.FH).forEach(id => allIDs.push(id));
    
    // Add Face IDs
    Object.values(GROUNDZERO_IDS.FACE.TRIAD).forEach(id => allIDs.push(id));
    Object.values(GROUNDZERO_IDS.FACE.DUEL).forEach(duelArray => 
      duelArray.forEach(id => allIDs.push(id))
    );
    
    // Add Lines IDs
    Object.values(GROUNDZERO_IDS.LINES.BASE).forEach(baseArray => 
      baseArray.forEach(id => allIDs.push(id))
    );
    Object.values(GROUNDZERO_IDS.LINES.TIEBREAKER).forEach(tbArray => 
      tbArray.forEach(id => allIDs.push(id))
    );
    Object.values(GROUNDZERO_IDS.LINES.DUEL).forEach(duelArray => 
      duelArray.forEach(id => allIDs.push(id))
    );
    
    // Add Misc IDs
    Object.values(GROUNDZERO_IDS.MISC).forEach(id => allIDs.push(id));
    
    return allIDs;
  }

  /**
   * Clear all registered content
   */
  clearContent(): void {
    this.contentRegistry.clear();
  }

  /**
   * Get debug information
   */
  getDebugInfo(): {
    totalContentIDs: number;
    registeredIDs: string[];
    groundZeroIDs: typeof GROUNDZERO_IDS;
  } {
    return {
      totalContentIDs: this.contentRegistry.size,
      registeredIDs: this.getAllContentIDs(),
      groundZeroIDs: GROUNDZERO_IDS
    };
  }
}

// Export singleton instance
export const contentIDManager = ContentIDManager.getInstance();

// Export utility functions
export const getFHContentID = (screenNumber: number) => contentIDManager.getFHContentID(screenNumber);
export const getFaceTriadID = (family: Line) => contentIDManager.getFaceTriadID(family);
export const getFaceDuelID = (family: Line, duelNumber: 1 | 2 | 3) => contentIDManager.getFaceDuelID(family, duelNumber);
export const getLinesBaseID = (family: Line, itemNumber: 1 | 2) => contentIDManager.getLinesBaseID(family, itemNumber);
export const getLinesTiebreakerID = (family: Line, tbNumber: 1 | 2) => contentIDManager.getLinesTiebreakerID(family, tbNumber);
export const getLinesDuelID = (family: Line, duelNumber: 1 | 2 | 3) => contentIDManager.getLinesDuelID(family, duelNumber);
export const getFamilyContentIDs = (family: Line) => contentIDManager.getFamilyContentIDs(family);

export default ContentIDManager;
