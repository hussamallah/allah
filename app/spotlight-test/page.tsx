'use client';

import React from 'react';
import SpotlightNodeQuiz from '../../components/SpotlightNodeQuiz';
import { SpotlightNodeQuiz as SpotlightNodeQuizType, SpotlightNodeResult } from '../../lib/spotlightNodeScoring';
import spotlightNodeData from '../../data/spotlightNodeQuiz.json';

export default function SpotlightTestPage() {
  const handleQuizComplete = (result: SpotlightNodeResult) => {
    console.log('Quiz completed:', result);
    alert(`Quiz completed! Your dominant stage is: ${result.stageDetails.dominant.label}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-800 mb-4">
            Spotlight Node Test
          </h1>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Testing the updated 5-option quiz structure
          </p>
        </div>
        
        <SpotlightNodeQuiz 
          quizData={spotlightNodeData as SpotlightNodeQuizType}
          onComplete={handleQuizComplete}
        />
      </div>
    </div>
  );
} 