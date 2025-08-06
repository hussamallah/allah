import testStageSeekerResults from '../data/testStageSeekerStageTestResults.json';

export interface TestStageSeekerTestResult {
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

export function getTestStageSeekerTestResult(dominantStage: string, maskStage: string): TestStageSeekerTestResult | null {
  try {
    const result = (testStageSeekerResults.testStageSeekerResults as any)[dominantStage]?.[maskStage];
    
    if (!result) {
      console.warn(`No result found for dominant stage: ${dominantStage}, mask stage: ${maskStage}`);
      return null;
    }
    
    return result as TestStageSeekerTestResult;
  } catch (error) {
    console.error('Error getting Test Stage Seeker test result:', error);
    return null;
  }
}

export function getEnhancedTestStageSeekerResult(dominantStage: string, maskStage: string): TestStageSeekerTestResult | null {
  const result = getTestStageSeekerTestResult(dominantStage, maskStage);
  
  if (!result) {
    return null;
  }
  
  // Add any additional processing here if needed
  return result;
}

export function getAllTestStageSeekerResults(): { [key: string]: { [key: string]: TestStageSeekerTestResult } } {
  return testStageSeekerResults.testStageSeekerResults as any;
} 