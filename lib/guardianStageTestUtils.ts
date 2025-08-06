import guardianResults from '../data/guardianStageTestResults.json';
import wallContent from '../data/guardianNodeWallContent.json';

export interface GuardianTestResult {
  title: string;
  stage: string;
  mask: string;
  score: string;
  diagnosis: string;
  detailedContent: string;
  currentState: string;
  coreIssue: string;
  trueNeed: string;
  warning: string;
  transformation: string;
  ritualFocus: string;
  nextStage: string;
  progressPath: string;
}

export interface GuardianNodeWallResult {
  title: string;
  currentState: string;
  maskDescription: string;
  coreIssue: string;
  trueNeed: string;
  warning: string;
  transformation: string;
  ritualFocus: string;
  nextStage: string;
  progressPath: string;
}

export interface WallRitual {
  title: string;
  description: string;
  steps: string[];
}

// Function to extract stage names from detailed content
export function extractStageNamesFromContent(detailedContent: string): { dominantStage: string; maskStage: string } | null {
  try {
    // Look for pattern: "GUARDIAN NODE: STAGE1 | STAGE2"
    const match = detailedContent.match(/GUARDIAN NODE:\s*([A-Z]+)\s*\|\s*([A-Z]+)/);
    if (match) {
      return {
        dominantStage: match[1].toLowerCase(), // Convert to lowercase to match archetype keys
        maskStage: match[2].toLowerCase()
      };
    }
    return null;
  } catch (error) {
    console.error('Error extracting stage names from content:', error);
    return null;
  }
}

// Function to get display stage names (capitalized) from detailed content
export function getDisplayStageNames(detailedContent: string): { dominantStageDisplay: string; maskStageDisplay: string } | null {
  try {
    const match = detailedContent.match(/GUARDIAN NODE:\s*([A-Z]+)\s*\|\s*([A-Z]+)/);
    if (match) {
      return {
        dominantStageDisplay: match[1], // Keep as uppercase for display
        maskStageDisplay: match[2]
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting display stage names:', error);
    return null;
  }
}

export function getGuardianTestResult(dominantStage: string, maskStage: string): GuardianTestResult | null {
  try {
    const result = (guardianResults.guardianResults as any)[dominantStage]?.[maskStage];
    
    if (!result) {
      console.warn(`No result found for dominant stage: ${dominantStage}, mask stage: ${maskStage}`);
      return null;
    }
    
    // Extract display stage names from the detailed content
    const displayNames = getDisplayStageNames(result.detailedContent);
    if (displayNames) {
      // Update the result with the display stage names from the content
      return {
        ...result,
        stage: displayNames.dominantStageDisplay,
        mask: displayNames.maskStageDisplay
      } as GuardianTestResult;
    }
    
    return result as GuardianTestResult;
  } catch (error) {
    console.error('Error getting Guardian test result:', error);
    return null;
  }
}

export function getGuardianNodeWallResult(dominantStage: string, maskStage: string): GuardianNodeWallResult | null {
  try {
    // Map the stage names to the wall content format
    const stageMapping: { [key: string]: string } = {
      'shielded': 'defender',
      'holder': 'keeper', 
      'wall': 'wall',
      'gate': 'sentinel',
      'anchor': 'anchor'
    };
    
    const mappedDominant = stageMapping[dominantStage] || dominantStage;
    const mappedMask = stageMapping[maskStage] || maskStage;
    
    const key = `${mappedDominant}_${mappedMask}`;
    const result = (wallContent.guardianNodeWall as any)[key];
    
    if (!result) {
      console.warn(`No wall content found for: ${key}`);
      return null;
    }
    
    return result as GuardianNodeWallResult;
  } catch (error) {
    console.error('Error getting Guardian Node Wall result:', error);
    return null;
  }
}

export function getWallRituals(): { [key: string]: WallRitual } {
  return wallContent.wallRituals as { [key: string]: WallRitual };
}

export function getEnhancedGuardianResult(dominantStage: string, maskStage: string): GuardianTestResult & { wallContent?: GuardianNodeWallResult } | null {
  const baseResult = getGuardianTestResult(dominantStage, maskStage);
  const wallResult = getGuardianNodeWallResult(dominantStage, maskStage);
  
  if (!baseResult) {
    return null;
  }
  
  return {
    ...baseResult,
    wallContent: wallResult || undefined
  };
}

export function getAllGuardianResults(): { [key: string]: { [key: string]: GuardianTestResult } } {
  return guardianResults.guardianResults as any;
}

export function getGuardianStageNames(): string[] {
  return Object.keys(guardianResults.guardianResults as any);
}

export function getGuardianMaskNames(): string[] {
  const firstStage = Object.keys(guardianResults.guardianResults as any)[0];
  return firstStage ? Object.keys((guardianResults.guardianResults as any)[firstStage]) : [];
}

export function validateGuardianStages(dominantStage: string, maskStage: string): boolean {
  const validStages = getGuardianStageNames();
  const validMasks = getGuardianMaskNames();
  
  return validStages.includes(dominantStage) && validMasks.includes(maskStage);
}

export function getGuardianResultByScore(score: string): GuardianTestResult | null {
  try {
    const [dominantScore, maskScore] = score.split('-').map(Number);
    const stages = getGuardianStageNames();
    const masks = getGuardianMaskNames();
    
    if (dominantScore < 1 || dominantScore > stages.length || 
        maskScore < 1 || maskScore > masks.length) {
      return null;
    }
    
    const dominantStage = stages[dominantScore - 1];
    const maskStage = masks[maskScore - 1];
    
    return getGuardianTestResult(dominantStage, maskStage);
  } catch (error) {
    console.error('Error getting Guardian result by score:', error);
    return null;
  }
}

export function isWallStage(dominantStage: string): boolean {
  return dominantStage === 'wall';
}

export function getWallStageAnalysis(dominantStage: string, maskStage: string): GuardianNodeWallResult | null {
  if (!isWallStage(dominantStage)) {
    return null;
  }
  
  return getGuardianNodeWallResult(dominantStage, maskStage);
} 