import sovereignResults from '../data/sovereignStageTestResults.json';

export interface SovereignTestResult {
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

export function getSovereignTestResult(dominantStage: string, maskStage: string): SovereignTestResult | null {
  try {
    const result = (sovereignResults.sovereignResults as any)[dominantStage]?.[maskStage];
    
    if (!result) {
      console.warn(`No result found for dominant stage: ${dominantStage}, mask stage: ${maskStage}`);
      return null;
    }
    
    return result as SovereignTestResult;
  } catch (error) {
    console.error('Error getting Sovereign test result:', error);
    return null;
  }
}

export function getEnhancedSovereignResult(dominantStage: string, maskStage: string): SovereignTestResult | null {
  const result = getSovereignTestResult(dominantStage, maskStage);
  
  if (!result) {
    return null;
  }
  
  // Add any additional processing here if needed
  return result;
}

export function getAllSovereignResults(): { [key: string]: { [key: string]: SovereignTestResult } } {
  return sovereignResults.sovereignResults as any;
} 