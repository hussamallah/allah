import spotlightResults from '../data/spotlightStageTestResults.json';

export interface SpotlightTestResult {
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

export function getSpotlightTestResult(dominantStage: string, maskStage: string): SpotlightTestResult | null {
  try {
    const result = (spotlightResults.spotlightResults as any)[dominantStage]?.[maskStage];
    
    if (!result) {
      console.warn(`No result found for dominant stage: ${dominantStage}, mask stage: ${maskStage}`);
      return null;
    }
    
    return result as SpotlightTestResult;
  } catch (error) {
    console.error('Error getting Spotlight test result:', error);
    return null;
  }
}

export function getEnhancedSpotlightResult(dominantStage: string, maskStage: string): SpotlightTestResult | null {
  const result = getSpotlightTestResult(dominantStage, maskStage);
  
  if (!result) {
    return null;
  }
  
  // Add any additional processing here if needed
  return result;
}

export function getAllSpotlightResults(): { [key: string]: { [key: string]: SpotlightTestResult } } {
  return spotlightResults.spotlightResults as any;
} 