import providerResults from '../data/providerStageTestResults.json';

export interface ProviderTestResult {
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

export function getProviderTestResult(dominantStage: string, maskStage: string): ProviderTestResult | null {
  try {
    const result = (providerResults.providerResults as any)[dominantStage]?.[maskStage];
    
    if (!result) {
      console.warn(`No result found for dominant stage: ${dominantStage}, mask stage: ${maskStage}`);
      return null;
    }
    
    return result as ProviderTestResult;
  } catch (error) {
    console.error('Error getting Provider test result:', error);
    return null;
  }
}

export function getEnhancedProviderResult(dominantStage: string, maskStage: string): ProviderTestResult | null {
  const result = getProviderTestResult(dominantStage, maskStage);
  
  if (!result) {
    return null;
  }
  
  // Add any additional processing here if needed
  return result;
}

export function getAllProviderResults(): { [key: string]: { [key: string]: ProviderTestResult } } {
  return providerResults.providerResults as any;
} 