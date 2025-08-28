'use client';

import { useState, useEffect } from 'react';
import { QuizEngineV2 } from '../../lib/quiz-v2/quizEngine';
import { QuestionBankManager } from '../../lib/quiz-v2/questionBank';
import { QuizQuestion, QuizPhase, QuizResult, Line } from '../../types/quiz-v2';
import quizBankData from '../../data/quiz-bank-v7.3.2 (1).json';

export default function QuizV2Page() {
  // State
  const [engine, setEngine] = useState<QuizEngineV2 | null>(null);
  const [questionBank, setQuestionBank] = useState<QuestionBankManager | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [currentPhase, setCurrentPhase] = useState<QuizPhase>('FH');
  const [isStarted, setIsStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [progressMessage, setProgressMessage] = useState<string>('');
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // ==================== ARCHETYPE MAPPING SYSTEM ====================
  // Complete mapping of all 20 archetypes with their chambers
  const archetypeChambers: Record<string, string> = {
    // Control Family
    'sovereign': 'sovereign',
    'rebel': 'rebel', 
    'catalyst': 'catalyst',
    
    // Pace Family
    'strategist': 'strategist',
    'navigator': 'navigator',
    'visionary': 'visionary',
    
    // Boundary Family
    'sentinel': 'sentinel',
    'equalizer': 'equalizer',
    'guardian': 'guardian',
    
    // Truth Family
    'seeker': 'seeker',
    'architect': 'architect',
    'alchemist': 'alchemist',
    
    // Recognition Family
    'spotlight': 'spotlight',
    'mask': 'mask',
    'artisan': 'artisan',
    
    // Bonding Family
    'provider': 'provider',
    'partner': 'partner',
    'servant': 'servant',
    
    // Stress Family
    'diplomat': 'diplomat',
    'wanderer': 'wanderer'
  };

  // TODO: IMPLEMENT THESE 8 MISSING ARCHETYPES
  // Missing archetypes that need chambers created:
  // 1. catalyst (Control family)
  // 2. strategist (Pace family) 
  // 3. navigator (Pace family)
  // 4. sentinel (Boundary family)
  // 5. architect (Truth family)
  // 6. alchemist (Truth family)
  // 7. artisan (Recognition family)
  // 8. diplomat (Stress family)

  // ==================== QUIZ COMPLETION LOGIC ====================
  const handleQuizCompletion = (result: QuizResult) => {
    console.log('🏆 Quiz Complete!', result);
    setQuizResult(result);
    
    // Save results to localStorage for chamber access
    if (typeof window !== 'undefined') {
      localStorage.setItem('quiz_v2_results', JSON.stringify({
        archetype: result.finalArchetype.name,
        line: result.finalArchetype.line,
        profileCode: result.profileCode,
        lineVerdicts: result.lineVerdicts,
        confidence: result.confidence,
        completionTime: result.completionTimeMs,
        timestamp: Date.now()
      }));
    }
  };

  const redirectToChamber = (archetype: string) => {
    const chamberPath = archetypeChambers[archetype.toLowerCase()];
    if (chamberPath) {
      console.log(`🚀 Redirecting to ${archetype} chamber: /chamber/${chamberPath}`);
      if (typeof window !== 'undefined') {
        window.location.href = `/chamber/${chamberPath}`;
      }
    } else {
      console.error(`❌ No chamber found for archetype: ${archetype}`);
      setError(`Chamber not found for ${archetype}. Please contact support.`);
    }
  };

  // Initialize question bank
  useEffect(() => {
    try {
      const bank = QuestionBankManager.getInstance();
      setQuestionBank(bank);
      console.log('✅ Question bank loaded:', bank.getDebugInfo());
    } catch (err) {
      console.error('Failed to load question bank:', err);
      setError(`Failed to load question bank: ${err}`);
    }
  }, []);

  // Start quiz
  const startQuiz = () => {
    try {
      const newEngine = new QuizEngineV2();
      setEngine(newEngine);
      setIsStarted(true);
      setCurrentPhase('FH');
      setError(null);
      setProgressMessage('Building your family profile...');
      
      // Load first question
      loadCurrentQuestion(newEngine, 'FH');
    } catch (err) {
      setError(`Failed to start quiz: ${err}`);
    }
  };

  // Load question for current phase
  const loadCurrentQuestion = (eng: QuizEngineV2, phase: QuizPhase) => {
    if (!questionBank) return;

    console.log('🔄 Loading question for phase:', phase);

    let question: QuizQuestion | null = null;

    try {
      switch (phase) {
        case 'FH':
          // Get FH question based on current screen
          const fhData = eng.getFHData();
          console.log('📊 FH Status:', { 
            screen: fhData.screen, 
            L1: fhData.L1, 
            L2: fhData.L2,
            L1Hits: fhData.hits[fhData.L1] || 0,
            L2Hits: fhData.hits[fhData.L2] || 0,
            L1Expo: fhData.expo[fhData.L1] || 0,
            L2Expo: fhData.expo[fhData.L2] || 0
          });
          
          // Check trigger conditions for console logging
          const l1MSF = eng.checkMSF ? eng.checkMSF(fhData.L1) : 'Unknown';
          const l2MSF = eng.checkMSF ? eng.checkMSF(fhData.L2) : 'Unknown';
          const exposureDiff = Math.abs((fhData.expo[fhData.L1] || 0) - (fhData.expo[fhData.L2] || 0));
          const hitsDiff = Math.abs((fhData.hits[fhData.L1] || 0) - (fhData.hits[fhData.L2] || 0));
          
          console.log('🎯 Trigger Conditions:', {
            L1_MSF: l1MSF,
            L2_MSF: l2MSF,
            exposure_parity: exposureDiff <= 1,
            closeness: hitsDiff <= 1,
            can_duel: l1MSF && l2MSF && exposureDiff <= 1 && hitsDiff <= 1,
            screen_cap: fhData.screen >= 9
          });
          
          // Update progress message
          if (fhData.screen >= 9) {
            setProgressMessage('Finalizing your family selection...');
          } else if (l1MSF && l2MSF && exposureDiff <= 1 && hitsDiff <= 1) {
            setProgressMessage('Preparing family duel...');
          } else {
            setProgressMessage(`Building your family profile... (Screen ${fhData.screen}/9)`);
          }
          
          question = questionBank.getFHQuestion(fhData.screen);
          break;
        
        case 'FH_DUEL':
          // Get FH duel question for the two top families
          const duelData = eng.getFHData();
          console.log('🔍 FH Duel phase - L1:', duelData.L1, 'L2:', duelData.L2);
          setProgressMessage('Family duel - choose the one that fits more');
          if (duelData.L1 && duelData.L2) {
            // Create a simple duel question with the two families
            question = {
              id: `FH_DUEL_${duelData.L1}-${duelData.L2}`,
              stage: 'FH_DUEL',
              prompt: `Which family fits you more: ${duelData.L1} or ${duelData.L2}?`,
              options: [
                { id: duelData.L1, label: duelData.L1, family: duelData.L1 },
                { id: duelData.L2, label: duelData.L2, family: duelData.L2 }
              ]
            };
          } else {
            console.error('❌ No L1/L2 data for FH Duel phase!');
            throw new Error('No L1/L2 data for FH Duel phase');
          }
          break;
        
        case 'F_TRIAD':
          // Get face triad question for the locked family
          const lockedFamily = eng.getLockedFamily();
          console.log('🔍 Face Triad phase - lockedFamily:', lockedFamily);
          setProgressMessage('Selecting your face...');
          if (lockedFamily) {
            question = questionBank.getFaceTriadQuestion(lockedFamily);
          } else {
            console.error('❌ No locked family found for Face Triad phase!');
            throw new Error('No locked family found for Face Triad phase');
          }
          break;
        
        case 'F_DUEL':
          // Get face duel question for the locked family
          const duelLockedFamily = eng.getLockedFamily();
          console.log('🔍 Face Duel phase - lockedFamily:', duelLockedFamily);
          setProgressMessage('Resolving face tie...');
          if (duelLockedFamily) {
            // Get the face trio for this family and use first two faces
            const faceTrio = eng.getFaceTrio(duelLockedFamily);
            if (faceTrio && faceTrio.length >= 2) {
              question = questionBank.getFaceDuelQuestion(duelLockedFamily, 1);
            } else {
              console.error('❌ No face trio available for Face Duel phase!');
              throw new Error('No face trio available for Face Duel phase');
            }
          } else {
            console.error('❌ Missing data for Face Duel phase!');
            throw new Error('Missing data for Face Duel phase');
          }
          break;
        

        
        case 'LINES':
          // Get lines question for the current line being assessed
          const currentLine = eng.getCurrentLine();
          console.log('🔍 Lines phase - currentLine:', currentLine);
          setProgressMessage('Assessing your lines...');
          if (currentLine) {
            // Get debug info to see the current state
            const debugInfo = eng.getDebugInfo();
            const linesData = debugInfo.linesData;
            
            console.log('🔍 Lines debug info:', {
              currentLine,
              tokens: linesData.tokens[currentLine],
              baseSeen: linesData.baseSeen[currentLine],
              needTB: linesData.needTB[currentLine],
              tbSeen: linesData.tbSeen[currentLine]
            });
            
            if (linesData.needTB[currentLine]) {
              // We need tiebreaker questions
              const tiebreakerQuestions = [questionBank.getLinesTiebreakerQuestion(currentLine, 1), questionBank.getLinesTiebreakerQuestion(currentLine, 2)];
              const tbIndex = linesData.tbSeen[currentLine];
              question = tiebreakerQuestions[tbIndex] || null;
              
              if (!question) {
                console.error('❌ No tiebreaker question available for line:', currentLine);
                throw new Error('No tiebreaker question available');
              }
            } else {
              // We need base questions
              const lineQuestions = [questionBank.getLinesBaseQuestion(currentLine, 1), questionBank.getLinesBaseQuestion(currentLine, 2)];
              const questionIndex = linesData.baseSeen[currentLine];
              question = lineQuestions[questionIndex] || null;
              
              if (!question) {
                console.error('❌ No base question available for line:', currentLine);
                throw new Error('No base question available');
              }
            }
          } else {
            console.error('❌ No current line found for Lines phase!');
            throw new Error('No current line found for Lines phase');
          }
          break;
          
        default:
          console.error('❌ Unknown phase:', phase);
          throw new Error(`Unknown phase: ${phase}`);
      }

      console.log('✅ Question loaded successfully:', question);
      setCurrentQuestion(question);
    } catch (err) {
      console.error('❌ Error loading question:', err);
      // Don't show MSF-related errors to user - they're not blocking
      if (err instanceof Error && err.message.includes('MSF')) {
        setError('Building your family profile... Please continue answering questions.');
      } else {
        setError(`Failed to load question: ${err}`);
      }
      setCurrentQuestion(null);
    }
  };

  // Handle answer submission
  const handleAnswer = async (answer: string) => {
    if (!engine || !currentQuestion) return;

    setLoading(true);
    setError(null);

    try {
      let nextPhase: QuizPhase | QuizResult;

      switch (currentPhase) {
        case 'FH':
          // Handle FH answer - map option ID to line
          const selectedOption = currentQuestion.options.find(opt => opt.id === answer);
          if (!selectedOption || !selectedOption.family) {
            throw new Error('Invalid option selected');
          }
          const line = selectedOption.family as Line;
          nextPhase = engine.handleFHAnswer(line);
          break;
        
        case 'FH_DUEL':
          // Handle FH duel answer - map option ID to line
          const duelOption = currentQuestion.options.find(opt => opt.id === answer);
          if (!duelOption || !duelOption.family) {
            throw new Error('Invalid option selected');
          }
          const duelLine = duelOption.family as Line;
          nextPhase = engine.handleFHDuel(duelLine);
          break;
        
        case 'F_TRIAD':
          // Handle face triad selection - map option ID to slot index
          const faceOptionIndex = currentQuestion.options.findIndex(opt => opt.id === answer);
          if (faceOptionIndex === -1) {
            throw new Error('Invalid face option selected');
          }
          const slot = faceOptionIndex as 0 | 1 | 2;
          nextPhase = engine.handleFaceTriad(slot);
          break;
        
        case 'F_DUEL':
          // Handle face duel selection
          const selectedFace = currentQuestion.options.find(opt => opt.id === answer)?.face;
          if (!selectedFace) {
            throw new Error('Invalid face option selected');
          }
          nextPhase = engine.handleFaceDuel(selectedFace);
          break;
        
        case 'LINES':
          // Handle lines answer - map option ID to A/B/C
          const lineOptionIndex = currentQuestion.options.findIndex(opt => opt.id === answer);
          if (lineOptionIndex === -1) {
            throw new Error('Invalid line option selected');
          }
          const option = String.fromCharCode(65 + lineOptionIndex) as 'A' | 'B' | 'C';
          const currentLine = engine.getCurrentLine();
          if (!currentLine) {
            throw new Error('No current line for assessment');
          }
          
          console.log('🎯 LINES Answer Debug:', {
            answer,
            lineOptionIndex,
            option,
            currentLine,
            questionId: currentQuestion.id
          });
          
          nextPhase = engine.handleLinesAnswer(currentLine, option);
          
          console.log('🔄 Engine returned nextPhase:', nextPhase);
          break;
        
        default:
          throw new Error(`Unknown phase: ${currentPhase}`);
      }

      console.log('🔄 Phase transition:', { from: currentPhase, to: nextPhase });

      // Check if quiz is complete
      if (typeof nextPhase === 'object' && 'finalArchetype' in nextPhase) {
        // Quiz complete - show results
        setCurrentPhase('DONE');
        setCurrentQuestion(null);
        setProgressMessage('Quiz complete!');
        console.log('🏆 Quiz complete!', nextPhase);
        handleQuizCompletion(nextPhase as QuizResult);
      } else {
        // Continue to next phase
        setCurrentPhase(nextPhase as QuizPhase);
        loadCurrentQuestion(engine, nextPhase as QuizPhase);
      }
    } catch (err) {
      console.error('❌ Error handling answer:', err);
      setError(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // Reset quiz
  const resetQuiz = () => {
    setEngine(null);
    setCurrentQuestion(null);
    setCurrentPhase('FH');
    setIsStarted(false);
    setLoading(false);
    setError(null);
    setProgressMessage('');

    setQuizResult(null);
  };

  // Auto-start quiz when component mounts AND question bank is ready
  useEffect(() => {
    if (!isStarted && !engine && questionBank) {
      startQuiz();
    }
  }, [questionBank]);

  // Show loading screen while quiz starts
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Starting Your Quiz...</h1>
            <p className="text-gray-600">Loading first question</p>
          </div>
        </div>
      </div>
    );
  }

  // Render quiz interface
  if (currentPhase === 'DONE') {
    if (quizResult) {
      return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Quiz Complete!</h1>
              
                             <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                 <button
                   onClick={() => redirectToChamber(quizResult.finalArchetype.name)}
                   className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl"
                 >
                   🏛️ Enter Your Chamber
                 </button>
                 <button
                   onClick={resetQuiz}
                   className="bg-gray-600 text-white py-3 px-6 rounded-xl hover:bg-gray-700 transition-colors"
                 >
                   🔄 Take Quiz Again
                 </button>
               </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading results...</p>
            </div>
          </div>
        </div>
      );
    }
  }

  // Render current question
  if (!currentQuestion || !currentQuestion.options || currentQuestion.options.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading question...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Quiz V2</h1>
            <button
              onClick={resetQuiz}
              className="text-gray-500 hover:text-gray-700 text-sm underline"
            >
              Reset Quiz
            </button>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${currentPhase === 'FH' || currentPhase === 'FH_DUEL' ? 'text-blue-600' : 'text-gray-400'}`}>
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-2">1</span>
              <span className="text-sm font-medium">Family Hone</span>
            </div>
            <div className={`flex items-center ${currentPhase === 'F_TRIAD' || currentPhase === 'F_DUEL' ? 'text-green-600' : 'text-gray-400'}`}>
              <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium mr-2">2</span>
              <span className="text-sm font-medium">Face Selection</span>
            </div>
            <div className={`flex items-center ${currentPhase === 'LINES' ? 'text-purple-600' : 'text-gray-400'}`}>
              <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium mr-2">3</span>
              <span className="text-sm font-medium">Lines Assessment</span>
            </div>
          </div>

          {/* Progress message */}
          {progressMessage && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded text-center">
              {progressMessage}
            </div>
          )}
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-2">
              Question ID: {currentQuestion.id}
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {currentQuestion.prompt}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options && currentQuestion.options.length > 0 ? (
              currentQuestion.options.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  disabled={loading}
                  className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="font-medium">{option.label}</span>
                  </div>
                  {option.family && (
                    <div className="text-sm text-gray-500 mt-1 ml-9">
                      Family: {option.family}
                    </div>
                  )}
                  {option.face && (
                    <div className="text-sm text-gray-500 mt-1 ml-9">
                      Face: {option.face}
                    </div>
                  )}
                </button>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No options available for this question.</p>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {loading && (
            <div className="mt-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Processing...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
