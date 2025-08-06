'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { guardianArchetype } from '@/lib/archetypes/guardian'
import { DiagnosisBlock } from '@/components/quiz/DiagnosisBlock'
import { ProgressBar } from '@/components/quiz/ProgressBar'
import { scoreQuiz } from '@/lib/quizScoring'
import { getEnhancedGuardianResult } from '@/lib/guardianStageTestUtils'
import GuardianTestResults from '@/components/GuardianTestResults'

const TOTAL_QUESTIONS = 25

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function GuardianQuizContent() {
  const searchParams = useSearchParams()
  const dominantParam = searchParams.get('dominant')
  const maskParam = searchParams.get('mask')
  
  // Flatten all questions and attach stage info
  const allQuestions = useMemo(() =>
    guardianArchetype.stages.flatMap(stage =>
      stage.questions.map(q => ({
        ...q,
        stageKey: stage.key,
        stageName: stage.label
      }))
    ), []
  )

  // Shuffle questions and options once per session
  const [shuffledQuestions] = useState(() =>
    shuffleArray(allQuestions).map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }))
  )

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<{ [id: string]: number }>({})
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  // Check if we should show a specific result from URL params
  useEffect(() => {
    if (dominantParam && maskParam) {
      setShowResult(true)
    }
  }, [dominantParam, maskParam])

  const handleAnswer = (questionId: string, optionIdx: number) => {
    const selectedValue = q.options[optionIdx].value
    setSelectedAnswer(optionIdx)
    setAnswers(prev => ({ ...prev, [questionId]: selectedValue }))
    
    // Move to next question after a short delay to show the selection
    setTimeout(() => {
      if (current < TOTAL_QUESTIONS - 1) {
        setCurrent(current + 1)
        setSelectedAnswer(null) // Reset selection for next question
      } else {
        setShowResult(true)
      }
    }, 500)
  }

  if (showResult) {
    let result;
    
    // If URL params are provided, use those instead of calculating from answers
    if (dominantParam && maskParam) {
      // Create a mock result with the specified stages
      result = {
        dominantStage: dominantParam,
        maskStage: maskParam,
        stageScores: {
          shielded: dominantParam === 'shielded' ? 20 : 10,
          holder: dominantParam === 'holder' ? 20 : 10,
          wall: dominantParam === 'wall' ? 20 : 10,
          gate: dominantParam === 'gate' ? 20 : 10,
          anchor: dominantParam === 'anchor' ? 20 : 10
        }
      }
    } else {
      // Calculate result using your scoring logic
      result = scoreQuiz(answers, guardianArchetype)
    }
    
    return (
      <GuardianTestResults
        dominantStage={result.dominantStage}
        maskStage={result.maskStage}
        stageScores={result.stageScores}
        onRetakeTest={() => {
          setCurrent(0)
          setAnswers({})
          setShowResult(false)
        }}
      />
    )
  }

  const q = shuffledQuestions[current]
  const currentStage = guardianArchetype.stages.find(s => s.key === q.stageKey)

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">🏛️ Chambers</h1>
          <h2 className="text-2xl font-bold mb-2"># GUARDIAN NODE</h2>
          <p className="text-gray-400">Stage/Masks Diagnostic Quiz</p>
          <p className="text-sm text-gray-500 mt-2">
            This quiz detects your exact position—Shielded, Holder, Wall, Gate, or Anchor—and exposes the mask you're hiding behind.
          </p>
        </div>

        {/* Stage Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center bg-gray-900 rounded-lg p-4 border border-gray-700">
            {guardianArchetype.stages.map((stage, idx) => (
              <div key={stage.key} className="flex flex-col items-center">
                <div 
                  className={`w-3 h-3 rounded-full mb-2 transition-all duration-300 ${
                    q.stageKey === stage.key ? 'scale-125' : 'opacity-40'
                  }`}
                  style={{ 
                    backgroundColor: q.stageKey === stage.key ? stage.color : '#6b7280'
                  }}
                />
                <span className={`text-xs text-center transition-all duration-300 ${
                  q.stageKey === stage.key ? 'text-white font-semibold' : 'text-gray-400'
                }`}>
                  {stage.label.replace('The ', '')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span>Question {current + 1} of {TOTAL_QUESTIONS}</span>
            <span>{Math.round(((current + 1) / TOTAL_QUESTIONS) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((current + 1) / TOTAL_QUESTIONS) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Current Stage */}
        <div className="mb-6 text-center">
          <div className="inline-block bg-gray-900 rounded-lg px-4 py-2 border border-gray-700">
            <span className="text-sm text-gray-400">Current Stage:</span>
            <span className="ml-2 text-white font-semibold" style={{ color: currentStage?.color }}>
              {currentStage?.label}
            </span>
          </div>
        </div>

        {/* Question */}
        <div className="bg-gray-900 rounded-lg p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6">{q.text}</h2>
          
          <div className="space-y-4">
            {q.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(q.id, idx)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  selectedAnswer === idx 
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg' 
                    : 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 hover:border-gray-500'
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center text-gray-400 text-sm">
          <p>Select your answer to continue automatically</p>
        </div>
      </div>
    </div>
  )
}

export default function GuardianQuizPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading quiz...</div>}>
      <GuardianQuizContent />
    </Suspense>
  )
} 