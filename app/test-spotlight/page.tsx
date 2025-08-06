'use client';

import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { 
  scoreSpotlightNodeQuiz, 
  SpotlightNodeQuiz as SpotlightNodeQuizType,
  SpotlightNodeResult 
} from '../../lib/spotlightNodeScoring';
import spotlightNodeData from '../../data/spotlightNodeQuiz.json';

export default function TestSpotlightPage() {
  const [result, setResult] = useState<SpotlightNodeResult | null>(null);
  const [testAnswers, setTestAnswers] = useState<{ [key: string]: number }>({});

  // Generate test answers (all 5s for maximum scores)
  const generateMaxAnswers = () => {
    const answers: { [key: string]: number } = {};
    const quizData = spotlightNodeData as SpotlightNodeQuizType;
    
    quizData.stages.forEach(stage => {
      stage.questions.forEach(question => {
        answers[question.id] = 5;
      });
    });
    
    setTestAnswers(answers);
    return answers;
  };

  // Generate test answers (all 1s for minimum scores)
  const generateMinAnswers = () => {
    const answers: { [key: string]: number } = {};
    const quizData = spotlightNodeData as SpotlightNodeQuizType;
    
    quizData.stages.forEach(stage => {
      stage.questions.forEach(question => {
        answers[question.id] = 1;
      });
    });
    
    setTestAnswers(answers);
    return answers;
  };

  // Generate mixed test answers
  const generateMixedAnswers = () => {
    const answers: { [key: string]: number } = {};
    const quizData = spotlightNodeData as SpotlightNodeQuizType;
    
    quizData.stages.forEach((stage, stageIndex) => {
      stage.questions.forEach((question, questionIndex) => {
        // Create a pattern: stage 0 gets 5s, stage 1 gets 4s, etc.
        answers[question.id] = 5 - stageIndex;
      });
    });
    
    setTestAnswers(answers);
    return answers;
  };

  const runTest = (answerGenerator: () => { [key: string]: number }) => {
    const answers = answerGenerator();
    const quizData = spotlightNodeData as SpotlightNodeQuizType;
    const testResult = scoreSpotlightNodeQuiz(answers, quizData);
    setResult(testResult);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Spotlight Node Quiz Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
                             <Button onClick={() => runTest(generateMaxAnswers)}>
                 Test Max Scores (All 5s)
               </Button>
              <Button onClick={() => runTest(generateMinAnswers)}>
                Test Min Scores (All 1s)
              </Button>
              <Button onClick={() => runTest(generateMixedAnswers)}>
                Test Mixed Scores
              </Button>
            </div>

            {result && (
              <div className="mt-6 p-4 bg-white rounded-lg border">
                <h3 className="font-semibold mb-2">Test Results:</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Dominant Stage:</strong> {result.stageDetails.dominant.label} (Score: {result.stageDetails.dominant.score})</p>
                  <p><strong>Mask Stage:</strong> {result.stageDetails.mask.label} (Score: {result.stageDetails.mask.score})</p>
                  <p><strong>Diagnosis:</strong> {result.diagnosis}</p>
                  
                  <div className="mt-4">
                    <strong>All Stage Scores:</strong>
                                         <ul className="list-disc list-inside mt-1">
                       {Object.entries(result.stageScores).map(([stage, score]) => (
                         <li key={stage}>{stage}: {score}/20</li>
                       ))}
                     </ul>
                  </div>
                </div>
              </div>
            )}

            {Object.keys(testAnswers).length > 0 && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h4 className="font-semibold mb-2">Generated Test Answers:</h4>
                <pre className="text-xs overflow-auto">
                  {JSON.stringify(testAnswers, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 