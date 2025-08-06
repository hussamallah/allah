import equalizerResults from '../data/equalizerStageTestResults.json';

export interface EqualizerTestResult {
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

export function getEqualizerTestResult(dominantStage: string, maskStage: string): EqualizerTestResult | null {
  try {
    const result = (equalizerResults.equalizerResults as any)[dominantStage]?.[maskStage];
    
    if (!result) {
      console.warn(`No result found for dominant stage: ${dominantStage}, mask stage: ${maskStage}`);
      return null;
    }
    
    return result as EqualizerTestResult;
  } catch (error) {
    console.error('Error getting Equalizer test result:', error);
    return null;
  }
}

export function getEnhancedEqualizerResult(dominantStage: string, maskStage: string): EqualizerTestResult | null {
  const result = getEqualizerTestResult(dominantStage, maskStage);
  
  if (!result) {
    return null;
  }
  
  // Add any additional processing here if needed
  return result;
}

export function getAllEqualizerResults(): { [key: string]: { [key: string]: EqualizerTestResult } } {
  return equalizerResults.equalizerResults as any;
} 