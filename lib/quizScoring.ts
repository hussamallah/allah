export interface QuizResult {
  stageScores: { [key: string]: number };
  dominantStage: string;
  maskStage: string;
  progressLevels: { [key: string]: string };
  isBreaker?: boolean;
  stageDetails: {
    dominant: {
      key: string;
      label: string;
      score: number;
      description: string;
    };
    mask: {
      key: string;
      label: string;
      score: number;
      description: string;
    };
  };
}

import { Archetype } from './archetypes'

export function scoreQuiz(answers: { [key: string]: number }, archetype: Archetype): QuizResult {
  const stageScores: { [key: string]: number } = {};
  
  // Initialize scores for all stages
  archetype.stages.forEach((stage) => {
    stageScores[stage.key] = 0;
  });

  // Calculate scores for each stage
  archetype.stages.forEach((stage) => {
    stage.questions.forEach((question) => {
      const answer = answers[question.id];
      if (answer) {
        stageScores[stage.key] += answer;
      }
    });
  });

  // Determine the value scale used (1-4 or 1-5) by checking the first question
  const firstQuestion = archetype.stages[0]?.questions[0];
  const maxValuePerQuestion = firstQuestion ? Math.max(...firstQuestion.options.map(opt => opt.value)) : 4;
  const maxScorePerStage = archetype.stages[0]?.questions.length * maxValuePerQuestion || 16;

  // Determine progress level for each stage based on the value scale
  const stages = Object.keys(stageScores);
  const progressLevels: { [key: string]: string } = {};
  stages.forEach(stage => {
    const score = stageScores[stage];
    const maxScore = maxScorePerStage;
    
    if (maxValuePerQuestion === 5) {
      // 1-5 scale: max 20 points per stage
      if (score <= 8) {
        progressLevels[stage] = 'stuck';
      } else if (score >= 9 && score <= 14) {
        progressLevels[stage] = 'progressing';
      } else {
        progressLevels[stage] = 'passed';
      }
    } else {
      // 1-4 scale: max 16 points per stage (original logic)
      if (score <= 6) {
        progressLevels[stage] = 'stuck';
      } else if (score >= 7 && score <= 10) {
        progressLevels[stage] = 'progressing';
      } else {
        progressLevels[stage] = 'passed';
      }
    }
  });

  // Check if all scores are equal (edge case)
  const allScoresEqual = stages.every(stage => stageScores[stage] === stageScores[stages[0]]);
  
  let dominantStage: string;
  let maskStage: string;
  
  if (allScoresEqual) {
    // If all scores are equal, use stage order as tiebreaker
    // Dominant = latest stage, Mask = earliest stage
    dominantStage = archetype.stages[archetype.stages.length - 1].key;
    maskStage = archetype.stages[0].key;
  } else {
    // Universal Scoring Logic:
    // Dominant Stage: Highest total score (where user truly is)
    // Mask Stage: Lowest total score (where user hides/sabotages/regresses)
    
    // Find dominant stage (highest score) with tiebreaker logic
    dominantStage = findDominantStage(stageScores, archetype, answers);
    
    // Find mask stage (lowest score) with tiebreaker logic
    maskStage = findMaskStage(stageScores, archetype, answers);
  }

  // Get stage details for dominant and mask
  const dominantStageData = archetype.stages.find(s => s.key === dominantStage);
  const maskStageData = archetype.stages.find(s => s.key === maskStage);

  // Check if user is a true final stage (adjusted for value scale)
  const finalStage = archetype.stages[archetype.stages.length - 1].key;
  const nonFinalStages = stages.filter(s => s !== finalStage);
  
  let allNonFinalHigh: boolean;
  let finalStageHigh: boolean;
  
  if (maxValuePerQuestion === 5) {
    // 1-5 scale thresholds
    allNonFinalHigh = nonFinalStages.every(stage => stageScores[stage] > 12);
    finalStageHigh = stageScores[finalStage] > 15;
  } else {
    // 1-4 scale thresholds (original)
    allNonFinalHigh = nonFinalStages.every(stage => stageScores[stage] > 10);
    finalStageHigh = stageScores[finalStage] > 12;
  }
  
  const isBreaker = allNonFinalHigh && finalStageHigh;

  return {
    stageScores,
    dominantStage,
    maskStage,
    progressLevels,
    isBreaker,
    stageDetails: {
      dominant: {
        key: dominantStage,
        label: dominantStageData?.label || dominantStage,
        score: stageScores[dominantStage],
        description: dominantStageData?.description || ''
      },
      mask: {
        key: maskStage,
        label: maskStageData?.label || maskStage,
        score: stageScores[maskStage],
        description: maskStageData?.description || ''
      }
    }
  };
}

function findDominantStage(stageScores: { [key: string]: number }, archetype: Archetype, answers: { [key: string]: number }): string {
  const stages = Object.keys(stageScores);
  
  // Find the highest score
  const maxScore = Math.max(...Object.values(stageScores));
  
  // Find all stages with the highest score
  const highestStages = stages.filter(stage => stageScores[stage] === maxScore);
  
  if (highestStages.length === 1) {
    return highestStages[0];
  }
  
  // Tiebreaker 1: Find the stage with the highest single answer
  let bestStage = highestStages[0];
  let bestSingleAnswer = 0;
  
  for (const stageKey of highestStages) {
    const stage = archetype.stages.find(s => s.key === stageKey);
    if (stage) {
      const stageAnswers = stage.questions.map(q => answers[q.id] || 0);
      const maxSingleAnswer = Math.max(...stageAnswers);
      
      if (maxSingleAnswer > bestSingleAnswer) {
        bestSingleAnswer = maxSingleAnswer;
        bestStage = stageKey;
      }
    }
  }
  
  // Tiebreaker 2: If still tied, pick the stage that comes latest in the journey (higher number)
  const stageIndices = highestStages.map(stageKey => 
    archetype.stages.findIndex(s => s.key === stageKey)
  );
  const latestIndex = Math.max(...stageIndices);
  
  return archetype.stages[latestIndex].key;
}

function findMaskStage(stageScores: { [key: string]: number }, archetype: Archetype, answers: { [key: string]: number }): string {
  const stages = Object.keys(stageScores);
  
  // Find the lowest score
  const minScore = Math.min(...Object.values(stageScores));
  
  // Find all stages with the lowest score
  const lowestStages = stages.filter(stage => stageScores[stage] === minScore);
  
  if (lowestStages.length === 1) {
    return lowestStages[0];
  }
  
  // Tiebreaker 1: Find the stage with the lowest single answer
  let worstStage = lowestStages[0];
  let worstSingleAnswer = 5; // Start with a high number
  
  for (const stageKey of lowestStages) {
    const stage = archetype.stages.find(s => s.key === stageKey);
    if (stage) {
      const stageAnswers = stage.questions.map(q => answers[q.id] || 0);
      const minSingleAnswer = Math.min(...stageAnswers);
      
      if (minSingleAnswer < worstSingleAnswer) {
        worstSingleAnswer = minSingleAnswer;
        worstStage = stageKey;
      }
    }
  }
  
  // Tiebreaker 2: If still tied, pick the stage that comes earliest in the journey (lower number)
  const stageIndices = lowestStages.map(stageKey => 
    archetype.stages.findIndex(s => s.key === stageKey)
  );
  const earliestIndex = Math.min(...stageIndices);
  
  return archetype.stages[earliestIndex].key;
}

export function getDiagnosis(archetype: Archetype, dominantStage: string, maskStage: string) {
  return archetype.diagnosis[dominantStage]?.[maskStage];
}

export function getAllQuestions(archetype: Archetype) {
  const allQuestions: any[] = [];
  archetype.stages.forEach((stage) => {
    stage.questions.forEach((question) => {
      allQuestions.push({
        ...question,
        stage: stage.key
      });
    });
  });
  return allQuestions;
}

export function getStageByKey(archetype: Archetype, stageKey: string) {
  return archetype.stages.find((stage) => stage.key === stageKey);
} 