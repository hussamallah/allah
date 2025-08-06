'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  SpotlightNodeQuiz as SpotlightNodeQuizType,
  SpotlightNodeResult,
  scoreSpotlightNodeQuiz,
  randomizeQuizQuestions
} from '../lib/spotlightNodeScoring';

interface SpotlightNodeQuizProps {
  quizData: SpotlightNodeQuizType;
  onComplete?: (result: SpotlightNodeResult) => void;
}

export default function SpotlightNodeQuiz({ quizData, onComplete }: SpotlightNodeQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<SpotlightNodeResult | null>(null);
  const [randomizedQuiz, setRandomizedQuiz] = useState<SpotlightNodeQuizType | null>(null);

  // Randomize questions on component mount
  useEffect(() => {
    setRandomizedQuiz(randomizeQuizQuestions(quizData));
  }, [quizData]);

  if (!randomizedQuiz) {
    return <div>Loading quiz...</div>;
  }

  const allQuestions = randomizedQuiz.stages.flatMap(stage => 
    stage.questions.map(q => ({ ...q, stageKey: stage.key, stageLabel: stage.label }))
  );

  const totalQuestions = allQuestions.length;
  const progress = (currentQuestionIndex / totalQuestions) * 100;

  const currentQuestion = allQuestions[currentQuestionIndex];
  const currentStage = randomizedQuiz.stages.find(s => s.key === currentQuestion.stageKey);

  const handleAnswerSelect = (questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz completed
      const quizResult = scoreSpotlightNodeQuiz(answers, randomizedQuiz);
      setResult(quizResult);
      setShowResults(true);
      onComplete?.(quizResult);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const canProceed = answers[currentQuestion.id] !== undefined;
  const answeredQuestions = Object.keys(answers).length;

  if (showResults && result) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-amber-800">
              Spotlight Node Diagnosis
            </CardTitle>
            <p className="text-amber-700">
              Your relationship to visibility and authenticity
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Dominant Stage */}
            <div className="bg-white rounded-lg p-6 border border-amber-200">
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-amber-500 text-white">Dominant Stage</Badge>
                <h3 className="text-xl font-semibold text-amber-800">
                  {result.stageDetails.dominant.label}
                </h3>
                                 <span className="text-sm text-gray-600">
                   Score: {result.stageDetails.dominant.score}/20
                 </span>
              </div>
              <p className="text-gray-700">{result.stageDetails.dominant.description}</p>
            </div>

            {/* Mask Stage */}
            <div className="bg-white rounded-lg p-6 border border-amber-200">
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-gray-500 text-white">Mask Stage</Badge>
                <h3 className="text-xl font-semibold text-gray-800">
                  {result.stageDetails.mask.label}
                </h3>
                                 <span className="text-sm text-gray-600">
                   Score: {result.stageDetails.mask.score}/20
                 </span>
              </div>
              <p className="text-gray-700">{result.stageDetails.mask.description}</p>
            </div>

            <Separator />

            {/* Diagnosis */}
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-6 border border-amber-300">
              <h3 className="text-xl font-semibold text-amber-800 mb-3">Your Diagnosis</h3>
              <p className="text-lg text-amber-900 leading-relaxed italic">
                "{result.diagnosis}"
              </p>
            </div>

            {/* Stage Scores */}
            <div className="bg-white rounded-lg p-6 border border-amber-200">
              <h3 className="text-xl font-semibold text-amber-800 mb-4">Stage Breakdown</h3>
              <div className="space-y-3">
                {randomizedQuiz.stages.map(stage => (
                  <div key={stage.key} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-700">{stage.label}</span>
                      {result.dominantStage === stage.key && (
                        <Badge className="bg-amber-500 text-white text-xs">Dominant</Badge>
                      )}
                      {result.maskStage === stage.key && (
                        <Badge className="bg-gray-500 text-white text-xs">Mask</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                                                 <div 
                           className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                           style={{ width: `${(result.stageScores[stage.key] / 20) * 100}%` }}
                         />
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {result.stageScores[stage.key]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={() => {
                setShowResults(false);
                setCurrentQuestionIndex(0);
                setAnswers({});
                setResult(null);
                setRandomizedQuiz(randomizeQuizQuestions(quizData));
              }}
              className="w-full bg-amber-600 hover:bg-amber-700"
            >
              Take Quiz Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-2xl font-bold text-amber-800">
              {randomizedQuiz.name}
            </CardTitle>
            <Badge className="bg-amber-500 text-white">
              {answeredQuestions}/{totalQuestions}
            </Badge>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-amber-700">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-amber-100" />
          </div>

          {/* Current Stage */}
          {currentStage && (
            <div className="mt-4 p-3 bg-amber-100 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge className="bg-amber-600 text-white">Current Stage</Badge>
                <span className="font-medium text-amber-800">{currentStage.label}</span>
              </div>
              <p className="text-sm text-amber-700 mt-1">{currentStage.description}</p>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Question */}
          <div className="bg-white rounded-lg p-6 border border-amber-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {currentQuestion.text}
            </h3>
            
            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion.id, option.value)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    answers[currentQuestion.id] === option.value
                      ? 'border-amber-500 bg-amber-50 text-amber-800'
                      : 'border-gray-200 bg-white hover:border-amber-300 hover:bg-amber-25'
                  }`}
                >
                  <span className="font-medium">{option.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-amber-600 hover:bg-amber-700"
            >
              {currentQuestionIndex === totalQuestions - 1 ? 'See Results' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 