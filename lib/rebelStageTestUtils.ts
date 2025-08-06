import rebelResults from '../data/rebelStageTestResults.json';

export interface RebelTestResult {
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

export function getRebelTestResult(dominantStage: string, maskStage: string): RebelTestResult | null {
  try {
    const result = (rebelResults.rebelResults as any)[dominantStage]?.[maskStage];
    
    if (!result) {
      console.warn(`No result found for dominant stage: ${dominantStage}, mask stage: ${maskStage}`);
      return null;
    }
    
    return result as RebelTestResult;
  } catch (error) {
    console.error('Error getting Rebel test result:', error);
    return null;
  }
}

export function getEnhancedRebelResult(dominantStage: string, maskStage: string): RebelTestResult | null {
  const result = getRebelTestResult(dominantStage, maskStage);
  
  if (!result) {
    return null;
  }
  
  // Add any additional processing here if needed
  return result;
}

export function getAllRebelResults(): { [key: string]: { [key: string]: RebelTestResult } } {
  return rebelResults.rebelResults as any;
} 