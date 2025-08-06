import partnerResults from '../data/partnerStageTestResults.json';

export interface PartnerTestResult {
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

export function getPartnerTestResult(dominantStage: string, maskStage: string): PartnerTestResult | null {
  try {
    const result = (partnerResults.partnerResults as any)[dominantStage]?.[maskStage];
    
    if (!result) {
      console.warn(`No result found for dominant stage: ${dominantStage}, mask stage: ${maskStage}`);
      return null;
    }
    
    return result as PartnerTestResult;
  } catch (error) {
    console.error('Error getting Partner test result:', error);
    return null;
  }
}

export function getEnhancedPartnerResult(dominantStage: string, maskStage: string): PartnerTestResult | null {
  const result = getPartnerTestResult(dominantStage, maskStage);
  
  if (!result) {
    return null;
  }
  
  // Add any additional processing here if needed
  return result;
}

export function getAllPartnerResults(): { [key: string]: { [key: string]: PartnerTestResult } } {
  return partnerResults.partnerResults as any;
} 