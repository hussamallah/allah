import seekerResults from '../data/seekerStageTestResults.json';

export interface SeekerTestResult {
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

export function getSeekerTestResult(dominantStage: string, maskStage: string): SeekerTestResult | null {
  try {
    const result = (seekerResults.seekerResults as any)[dominantStage]?.[maskStage];
    
    if (!result) {
      console.warn(`No result found for dominant stage: ${dominantStage}, mask stage: ${maskStage}`);
      return null;
    }
    
    return result as SeekerTestResult;
  } catch (error) {
    console.error('Error getting Seeker test result:', error);
    return null;
  }
}

export function getEnhancedSeekerResult(dominantStage: string, maskStage: string): SeekerTestResult | null {
  const result = getSeekerTestResult(dominantStage, maskStage);
  
  if (!result) {
    return null;
  }
  
  // Add any additional processing here if needed
  return result;
}

export function getAllSeekerResults(): { [key: string]: { [key: string]: SeekerTestResult } } {
  return seekerResults.seekerResults as any;
} 