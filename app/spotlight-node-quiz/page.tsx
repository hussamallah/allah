'use client';

import React from 'react';
import SpotlightNodeQuiz from '../../components/SpotlightNodeQuiz';
import { SpotlightNodeQuiz as SpotlightNodeQuizType, SpotlightNodeResult } from '../../lib/spotlightNodeScoring';
import spotlightNodeData from '../../data/spotlightNodeQuiz.json';

export default function SpotlightNodeQuizPage() {
  const handleQuizComplete = (result: SpotlightNodeResult) => {
    console.log('Quiz completed:', result);
    // You can add additional logic here, such as saving results to a database
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-800 mb-4">
            Spotlight Node Diagnostic Quiz
          </h1>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Discover your relationship to visibility, authenticity, and leadership. 
            This modular diagnostic reveals where you truly shine and where you hide.
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