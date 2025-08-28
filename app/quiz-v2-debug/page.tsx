'use client';

import React, { useState, useEffect } from 'react';
import { QuizEngineV2 } from '../../lib/quiz-v2/quizEngine';
import { QuestionBankManager } from '../../lib/quiz-v2/questionBank';
import quizBankData from '../../data/quiz-bank-v7.3.2 (1).json';

export default function QuizV2DebugPage() {
  const [engine, setEngine] = useState<QuizEngineV2 | null>(null);
  const [questionBank, setQuestionBank] = useState<QuestionBankManager | null>(null);
  const [currentPhase, setCurrentPhase] = useState<string>('FH');
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [answerCount, setAnswerCount] = useState(0);

  useEffect(() => {
    try {
      // Initialize question bank
      const qb = QuestionBankManager.getInstance();
      setQuestionBank(qb);
      
      // Initialize engine
      const eng = new QuizEngineV2();
      setEngine(eng);
      
      // Test basic functionality
      testBasicFunctionality(qb, eng);
    } catch (err) {
      setDebugInfo(`Error initializing: ${err}`);
    }
  }, []);

  const testBasicFunctionality = (qb: QuestionBankV2, eng: QuizEngineV2) => {
    let info = '🧪 Testing Quiz V2 System...\n\n';
    
    try {
      // Test 1: Question Bank
      info += '✅ Question Bank loaded\n';
      const stats = qb.getQuestionStats();
      info += `📊 Stats: ${JSON.stringify(stats, null, 2)}\n\n`;
      
      // Test 2: Get first FH question
      const fhQuestion = qb.getNextFHQuestion(0, {
        L1: 'Control',
        L2: 'Pace',
        expo: { Control: 0, Pace: 0, Boundary: 0, Truth: 0, Recognition: 0, Bonding: 0, Stress: 0 },
        lastFillers: []
      });
      
      if (fhQuestion) {
        info += '✅ First FH question loaded\n';
        info += `📝 Question: ${fhQuestion.prompt.substring(0, 100)}...\n`;
        info += `🔢 Options: ${fhQuestion.options.length}\n`;
        info += `🏷️ First option: ${fhQuestion.options[0]?.label.substring(0, 50)}...\n`;
        info += `👨‍👩‍👧‍👦 Family: ${fhQuestion.options[0]?.family}\n\n`;
      } else {
        info += '❌ Failed to load first FH question\n\n';
      }
      
      // Test 3: Engine state
      info += '✅ Engine initialized\n';
      const fhData = eng.getFHData();
      info += `📊 FH Data: ${JSON.stringify(fhData, null, 2)}\n\n`;
      
      // Test 4: Try to handle an answer
      if (fhQuestion && fhQuestion.options[0]?.family) {
        try {
          const nextPhase = eng.handleFHAnswer(fhQuestion.options[0].family as any);
          info += `✅ Answer handled successfully\n`;
          info += `🔄 Next phase: ${nextPhase}\n\n`;
        } catch (err) {
          info += `❌ Error handling answer: ${err}\n\n`;
        }
      }
      
    } catch (err) {
      info += `❌ Test failed: ${err}`;
    }
    
    setDebugInfo(info);
  };

  const testAnswer = () => {
    if (!engine || !questionBank) return;
    
    try {
      // Get current engine state for dynamic question loading
      const currentFHData = engine.getFHData();
      const fhQuestion = questionBank.getNextFHQuestion(answerCount, {
        L1: currentFHData.L1,
        L2: currentFHData.L2,
        expo: currentFHData.expo,
        lastFillers: engine.getLastFillers ? engine.getLastFillers() : []
      });
      
      if (fhQuestion && fhQuestion.options[0]?.family) {
        // Get engine state before answer
        const beforeState = {
          phase: engine.getCurrentPhase(),
          fhData: engine.getFHData(),
          lockedFamily: engine.getLockedFamily()
        };
        
        setDebugInfo(prev => prev + `\n\n🎯 === ANSWER ${answerCount + 1} ===`);
        setDebugInfo(prev => prev + `\n📊 BEFORE: ${JSON.stringify(beforeState, null, 2)}`);
        
        // Test the new dynamic options logic
        const engineOptions = engine.getCurrentFHOptions();
        setDebugInfo(prev => prev + `\n🎯 Engine wants to show: [${engineOptions.join(', ')}]`);
        
        // Show what options the question actually has
        const questionOptions = fhQuestion.options.map(opt => opt.family).filter(Boolean);
        setDebugInfo(prev => prev + `\n📝 Question has options: [${questionOptions.join(', ')}]`);
        
        const nextPhase = engine.handleFHAnswer(fhQuestion.options[0].family as any);
        
        // Get engine state after answer
        const afterState = {
          phase: engine.getCurrentPhase(),
          fhData: engine.getFHData(),
          lockedFamily: engine.getLockedFamily()
        };
        
        setDebugInfo(prev => prev + `\n🔄 RESULT: ${nextPhase}`);
        setDebugInfo(prev => prev + `\n📊 AFTER: ${JSON.stringify(afterState, null, 2)}`);
        
        setAnswerCount(prev => prev + 1);
      }
    } catch (err) {
      setDebugInfo(prev => prev + `\n❌ Test answer error: ${err}`);
    }
  };

  const resetEngine = () => {
    if (questionBank) {
      const newEngine = new QuizEngineV2();
      setEngine(newEngine);
      setAnswerCount(0);
      setDebugInfo('🧪 Engine reset - ready for new test\n');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🧠 Quiz V2 Debug Page</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">System Status</h2>
            <div className="space-y-2">
              <div>Engine: {engine ? '✅ Loaded' : '❌ Not loaded'}</div>
              <div>Question Bank: {questionBank ? '✅ Loaded' : '❌ Not loaded'}</div>
              <div>Current Phase: {currentPhase}</div>
              <div>Answer Count: {answerCount}</div>
            </div>
            
            <div className="mt-4 space-y-2">
              <button
                onClick={testAnswer}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
              >
                Test Answer {answerCount + 1}
              </button>
              
              <button
                onClick={resetEngine}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
              >
                Reset Engine
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
            <pre className="bg-gray-800 p-4 rounded text-sm overflow-auto max-h-96">
              {debugInfo || 'No debug info yet...'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
