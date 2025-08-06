import wandererResults from '../data/wandererStageTestResults.json';

export interface WandererTestResult {
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

export function getWandererTestResult(dominantStage: string, maskStage: string): WandererTestResult | null {
  try {
    const result = (wandererResults.wandererResults as any)[dominantStage]?.[maskStage];
    
    if (!result) {
      console.warn(`No result found for dominant stage: ${dominantStage}, mask stage: ${maskStage}`);
      return null;
    }
    
    return result as WandererTestResult;
  } catch (error) {
    console.error('Error getting Wanderer test result:', error);
    return null;
  }
}

export function getEnhancedWandererResult(dominantStage: string, maskStage: string): WandererTestResult | null {
  const result = getWandererTestResult(dominantStage, maskStage);
  
  if (!result) {
    return null;
  }
  
  // Add any additional processing here if needed
  return result;
}

export function getAllWandererResults(): { [key: string]: { [key: string]: WandererTestResult } } {
  return wandererResults.wandererResults as any;
} 