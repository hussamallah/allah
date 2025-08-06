'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { getSeekerTestResult } from '@/lib/seekerStageTestUtils';

function SeekerQuizContent() {
  const searchParams = useSearchParams();
  const dominantStage = searchParams.get('dominant');
  const maskStage = searchParams.get('mask');

  if (dominantStage && maskStage) {
    const result = getSeekerTestResult(dominantStage, maskStage);
    
    if (result) {
      return (
        <div className="min-h-screen bg-black text-white p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-violet-400">
              {result.title}
            </h1>
            
            <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">Diagnosis</h2>
              <p className="text-gray-300 mb-4">{result.diagnosis}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-violet-400 mb-2">Current State</h3>
                  <p className="text-gray-300">{result.currentState}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-violet-400 mb-2">Core Issue</h3>
                  <p className="text-gray-300">{result.coreIssue}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-violet-400 mb-2">True Need</h3>
                  <p className="text-gray-300">{result.trueNeed}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-violet-400 mb-2">Next Stage</h3>
                  <p className="text-gray-300">{result.nextStage}</p>
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-yellow-400 mb-2">Warning</h3>
                <p className="text-gray-300">{result.warning}</p>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">Transformation</h3>
                <p className="text-gray-300">{result.transformation}</p>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">Ritual Focus</h3>
                <p className="text-gray-300">{result.ritualFocus}</p>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-400 mb-2">Progress Path</h3>
                <p className="text-gray-300">{result.progressPath}</p>
              </div>
            </div>
            
            <div className="text-center">
              <button
                onClick={() => window.history.back()}
                className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Back to All Diagnoses
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-violet-400 mb-8">Seeker Quiz</h1>
        <p className="text-gray-300 mb-6">Take the Seeker archetype quiz to discover your stage and mask.</p>
        <div className="space-y-4">
          <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg transition-colors block w-full">
            Start Seeker Quiz
          </button>
          <button
            onClick={() => window.location.href = '/chamber/seeker/all-diagnoses'}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors block w-full"
          >
            View All Diagnoses
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SeekerQuizPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-violet-400 mb-8">Loading...</h1>
        </div>
      </div>
    }>
      <SeekerQuizContent />
    </Suspense>
  );
} 