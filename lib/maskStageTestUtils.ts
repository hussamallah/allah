import maskResults from '../data/maskStageTestResults.json';

export interface MaskTestResult {
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

export function getMaskTestResult(dominantStage: string, maskStage: string): MaskTestResult | null {
  try {
    const result = (maskResults.maskResults as any)[dominantStage]?.[maskStage];
    
    if (!result) {
      console.warn(`No result found for dominant stage: ${dominantStage}, mask stage: ${maskStage}`);
      return null;
    }
    
    return result as MaskTestResult;
  } catch (error) {
    console.error('Error getting Mask test result:', error);
    return null;
  }
}

export function getEnhancedMaskResult(dominantStage: string, maskStage: string): MaskTestResult | null {
  const result = getMaskTestResult(dominantStage, maskStage);
  
  if (!result) {
    return null;
  }
  
  // Add any additional processing here if needed
  return result;
}

export function getAllMaskResults(): { [key: string]: { [key: string]: MaskTestResult } } {
  return maskResults.maskResults as any;
} 