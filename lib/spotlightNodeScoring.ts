export interface SpotlightNodeResult {
  stageScores: { [key: string]: number };
  dominantStage: string;
  maskStage: string;
  diagnosis: string;
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

export interface SpotlightNodeQuiz {
  name: string;
  description: string;
  stages: SpotlightNodeStage[];
  diagnosis: { [key: string]: { [key: string]: string } };
}

export interface SpotlightNodeStage {
  key: string;
  label: string;
  description: string;
  questions: SpotlightNodeQuestion[];
}

export interface SpotlightNodeQuestion {
  id: string;
  text: string;
  options: SpotlightNodeOption[];
}

export interface SpotlightNodeOption {
  text: string;
  value: number;
}

export function scoreSpotlightNodeQuiz(
  answers: { [key: string]: number }, 
  quizData: SpotlightNodeQuiz
): SpotlightNodeResult {
  const stageScores: { [key: string]: number } = {};
  
  // Initialize scores for all stages
  quizData.stages.forEach((stage) => {
    stageScores[stage.key] = 0;
  });

  // Calculate scores for each stage (4 questions per stage)
  quizData.stages.forEach((stage) => {
    stage.questions.forEach((question) => {
      const answer = answers[question.id];
      if (answer) {
        stageScores[stage.key] += answer;
      }
    });
  });

  // Determine dominant and mask stages
  const stages = Object.keys(stageScores);
  
  // Find dominant stage (highest total score)
  const dominantStage = findDominantStage(stageScores, quizData, answers);
  
  // Find mask stage (lowest total score)
  const maskStage = findMaskStage(stageScores, quizData, answers);

  // Get diagnosis
  const diagnosis = quizData.diagnosis[dominantStage]?.[maskStage] || "No diagnosis available.";

  // Get stage details
  const dominantStageData = quizData.stages.find(s => s.key === dominantStage);
  const maskStageData = quizData.stages.find(s => s.key === maskStage);

  return {
    stageScores,
    dominantStage,
    maskStage,
    diagnosis,
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

function findDominantStage(
  stageScores: { [key: string]: number }, 
  quizData: SpotlightNodeQuiz, 
  answers: { [key: string]: number }
): string {
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
    const stage = quizData.stages.find(s => s.key === stageKey);
    if (stage) {
      const stageAnswers = stage.questions.map(q => answers[q.id] || 0);
      const maxSingleAnswer = Math.max(...stageAnswers);
      
      if (maxSingleAnswer > bestSingleAnswer) {
        bestSingleAnswer = maxSingleAnswer;
        bestStage = stageKey;
      }
    }
  }
  
  // Tiebreaker 2: If still tied, pick the stage that comes latest in the journey (higher index)
  const stageIndices = highestStages.map(stageKey => 
    quizData.stages.findIndex(s => s.key === stageKey)
  );
  const latestIndex = Math.max(...stageIndices);
  
  return quizData.stages[latestIndex].key;
}

function findMaskStage(
  stageScores: { [key: string]: number }, 
  quizData: SpotlightNodeQuiz, 
  answers: { [key: string]: number }
): string {
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
    const stage = quizData.stages.find(s => s.key === stageKey);
    if (stage) {
      const stageAnswers = stage.questions.map(q => answers[q.id] || 0);
      const minSingleAnswer = Math.min(...stageAnswers);
      
      if (minSingleAnswer < worstSingleAnswer) {
        worstSingleAnswer = minSingleAnswer;
        worstStage = stageKey;
      }
    }
  }
  
  // Tiebreaker 2: If still tied, pick the stage that comes earliest in the journey (lower index)
  const stageIndices = lowestStages.map(stageKey => 
    quizData.stages.findIndex(s => s.key === stageKey)
  );
  const earliestIndex = Math.min(...stageIndices);
  
  return quizData.stages[earliestIndex].key;
}

export function getAllSpotlightNodeQuestions(quizData: SpotlightNodeQuiz) {
  const allQuestions: any[] = [];
  quizData.stages.forEach((stage) => {
    stage.questions.forEach((question) => {
      allQuestions.push({
        ...question,
        stage: stage.key
      });
    });
  });
  return allQuestions;
}

export function getSpotlightNodeStageByKey(quizData: SpotlightNodeQuiz, stageKey: string) {
  return quizData.stages.find((stage) => stage.key === stageKey);
}

// Helper function to randomize answer order for each question
export function randomizeQuestionOptions(question: SpotlightNodeQuestion): SpotlightNodeQuestion {
  const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
  return {
    ...question,
    options: shuffledOptions
  };
}

// Helper function to randomize all questions in the quiz
export function randomizeQuizQuestions(quizData: SpotlightNodeQuiz): SpotlightNodeQuiz {
  return {
    ...quizData,
    stages: quizData.stages.map(stage => ({
      ...stage,
      questions: stage.questions.map(question => randomizeQuestionOptions(question))
    }))
  };
} 