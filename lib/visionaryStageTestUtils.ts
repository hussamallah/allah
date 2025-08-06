import visionaryResults from '../data/visionaryStageTestResults.json';

export interface VisionaryTestResult {
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

export function getVisionaryTestResult(dominantStage: string, maskStage: string): VisionaryTestResult | null {
  try {
    const result = (visionaryResults.visionaryResults as any)[dominantStage]?.[maskStage];
    
    if (!result) {
      console.warn(`No result found for dominant stage: ${dominantStage}, mask stage: ${maskStage}`);
      return null;
    }
    
    return result as VisionaryTestResult;
  } catch (error) {
    console.error('Error getting Visionary test result:', error);
    return null;
  }
}

export function getEnhancedVisionaryResult(dominantStage: string, maskStage: string): VisionaryTestResult | null {
  const result = getVisionaryTestResult(dominantStage, maskStage);
  
  if (!result) {
    return null;
  }
  
  // Add any additional processing here if needed
  return result;
}

export function getAllVisionaryResults(): { [key: string]: { [key: string]: VisionaryTestResult } } {
  return visionaryResults.visionaryResults as any;
} 