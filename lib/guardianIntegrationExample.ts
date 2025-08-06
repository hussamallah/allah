// Example integration for Guardian stage test results
// This shows how to use the Guardian test results in your existing quiz system

import { scoreQuiz } from './quizScoring';
import { guardianArchetype } from './archetypes/guardian';
import { getGuardianTestResult } from './guardianStageTestUtils';

// Example function to get Guardian test results
export function getGuardianResults(answers: { [key: string]: number }) {
  // Score the quiz using existing system
  const quizResult = scoreQuiz(answers, guardianArchetype);
  
  // Get the detailed result from our new system
  const detailedResult = getGuardianTestResult(
    quizResult.dominantStage, 
    quizResult.maskStage
  );
  
  return {
    // Original quiz result data
    ...quizResult,
    
    // New detailed Guardian-specific result
    guardianResult: detailedResult
  };
}

// Example usage in a results page component
export function exampleUsage() {
  // Simulate quiz answers
  const answers = {
    g1: 2, g2: 3, g3: 1, g4: 2,  // Shielded stage answers
    g5: 4, g6: 3, g7: 2, g8: 4,  // Holder stage answers
    g9: 3, g10: 4, g11: 3, g12: 2, // Wall stage answers
    g13: 4, g14: 3, g15: 4, g16: 3, // Gate stage answers
    g17: 4, g18: 4, g19: 4, g20: 4  // Anchor stage answers
  };
  
  const results = getGuardianResults(answers);
  
  console.log('Dominant Stage:', results.dominantStage);
  console.log('Mask Stage:', results.maskStage);
  console.log('Guardian Result Title:', results.guardianResult?.title);
  console.log('Diagnosis:', results.guardianResult?.diagnosis);
  
  return results;
}

// Example of how to use in a React component
export function exampleReactUsage() {
  /*
  import GuardianTestResults from '../components/GuardianTestResults';
  
  function QuizResultsPage({ answers }) {
    const results = getGuardianResults(answers);
    
    return (
      <GuardianTestResults
        dominantStage={results.dominantStage}
        maskStage={results.maskStage}
        stageScores={results.stageScores}
        onViewRituals={() => router.push('/guardian/rituals')}
        onRetakeTest={() => router.push('/guardian/quiz')}
      />
    );
  }
  */
}

// Example of how to get a specific result by stage combination
export function getSpecificGuardianResult(dominantStage: string, maskStage: string) {
  return getGuardianTestResult(dominantStage, maskStage);
}

// Example of how to validate stage combinations
export function validateGuardianCombination(dominantStage: string, maskStage: string) {
  const result = getGuardianTestResult(dominantStage, maskStage);
  return result !== null;
}

// Example of how to get all possible results
export function getAllGuardianResults() {
  const stages = ['shielded', 'holder', 'wall', 'gate', 'anchor'];
  const results: any = {};
  
  stages.forEach(dominantStage => {
    results[dominantStage] = {};
    stages.forEach(maskStage => {
      results[dominantStage][maskStage] = getGuardianTestResult(dominantStage, maskStage);
    });
  });
  
  return results;
} 