import vesselResults from '../data/vesselStageTestResults.json';

export interface VesselTestResult {
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

export function getVesselTestResult(dominantStage: string, maskStage: string): VesselTestResult | null {
  try {
    const result = (vesselResults.vesselResults as any)[dominantStage]?.[maskStage];
    
    if (!result) {
      console.warn(`No result found for dominant stage: ${dominantStage}, mask stage: ${maskStage}`);
      return null;
    }
    
    return result as VesselTestResult;
  } catch (error) {
    console.error('Error getting Vessel test result:', error);
    return null;
  }
}

export function getEnhancedVesselResult(dominantStage: string, maskStage: string): VesselTestResult | null {
  const result = getVesselTestResult(dominantStage, maskStage);
  
  if (!result) {
    return null;
  }
  
  // Add any additional processing here if needed
  return result;
}

export function getAllVesselResults(): { [key: string]: { [key: string]: VesselTestResult } } {
  return vesselResults.vesselResults as any;
} 