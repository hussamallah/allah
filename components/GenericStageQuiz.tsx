'use client'

import { useState, useMemo } from 'react'
import { Archetype } from '@/lib/archetypes'
import { DiagnosisBlock } from '@/components/quiz/DiagnosisBlock'
import { ProgressBar } from '@/components/quiz/ProgressBar'
import { scoreQuiz } from '@/lib/quizScoring'

const TOTAL_QUESTIONS = 25

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

interface GenericStageQuizProps {
  archetype: Archetype
}

export default function GenericStageQuiz({ archetype }: GenericStageQuizProps) {
  // Flatten all questions and attach stage info
  const allQuestions = useMemo(() =>
    archetype.stages.flatMap(stage =>
      stage.questions.map(q => ({
        ...q,
        stageKey: stage.key,
        stageName: stage.label
      }))
    ), [archetype]
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
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    if (current < TOTAL_QUESTIONS - 1) {
      setCurrent(current + 1)
    } else {
      setShowResult(true)
    }
  }

  if (showResult) {
    // Calculate result using your scoring logic
    const result = scoreQuiz(answers, archetype)
    const diagnosis = archetype.diagnosis[result.dominantStage][result.maskStage]
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        <div className="max-w-4xl mx-auto p-6 relative z-10">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Your {archetype.name} Diagnosis</h1>
          <ProgressBar
            stageScores={result.stageScores}
            progressLevels={result.progressLevels}
            archetype={archetype}
          />
          <DiagnosisBlock
            diagnosis={diagnosis}
            archetype={archetype}
            dominantStage={result.dominantStage}
            maskStage={result.maskStage}
          />
          <div className="text-center">
            <button
              className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => {
                setCurrent(0)
                setAnswers({})
                setShowResult(false)
              }}
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  const q = shuffledQuestions[current]
  const currentStage = archetype.stages.find(s => s.key === q.stageKey)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      <div className="max-w-2xl mx-auto p-6 relative z-10">
        {/* Stage Indicator */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 text-center">{archetype.name} Stages</h2>
          <div className="flex justify-between items-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            {archetype.stages.map((stage, idx) => (
              <div key={stage.key} className="flex flex-col items-center">
                <div 
                  className={`w-4 h-4 rounded-full mb-2 transition-all duration-500 ${
                    q.stageKey === stage.key ? 'animate-pulse scale-125' : 'opacity-40'
                  }`}
                  style={{ 
                    backgroundColor: q.stageKey === stage.key ? stage.color : '#6b7280',
                    boxShadow: q.stageKey === stage.key ? `0 0 20px ${stage.color}` : 'none'
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

        {/* Current Stage Indicator */}
        <div className="mb-6 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
            <span className="text-sm text-blue-200">Current Stage:</span>
            <span className="ml-2 text-white font-semibold" style={{ color: currentStage?.color }}>
              {currentStage?.label}
            </span>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-blue-200 mb-3">
            <span className="font-medium">
              Question {current + 1} of {TOTAL_QUESTIONS}
              {current === TOTAL_QUESTIONS - 1 && (
                <span className="text-purple-300 ml-2">(Final Question)</span>
              )}
            </span>
            <span className="font-medium">{Math.round(((current + 1) / TOTAL_QUESTIONS) * 100)}%</span>
          </div>
          <div className="relative">
            <div className="w-full bg-white/20 rounded-full h-3 backdrop-blur-sm">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                style={{ width: `${((current + 1) / TOTAL_QUESTIONS) * 100}%` }}
              >
                {/* Progress milestone indicators */}
                {[20, 40, 60, 80, 100].map((milestone) => (
                  <div
                    key={milestone}
                    className={`absolute top-0 w-1 h-3 bg-white rounded-full transition-all duration-500 ${
                      ((current + 1) / TOTAL_QUESTIONS) * 100 >= milestone ? 'opacity-100 scale-125' : 'opacity-50 scale-100'
                    }`}
                    style={{ left: `${milestone}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Question Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-6 border border-white/20 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed">
            {q.text}
          </h1>
          
          <div className="space-y-4">
            {q.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(q.id, option.value)}
                className="w-full text-left p-5 rounded-xl transition-all duration-300 group relative overflow-hidden bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white border border-white/20 hover:border-white/40"
              >
                {/* Answer glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-50" />
                
                <div className="flex items-center relative z-10">
                  <div className="w-6 h-6 rounded-full border-2 mr-4 flex-shrink-0 transition-all duration-300 border-blue-300 group-hover:border-blue-400 group-hover:scale-110" />
                  <span className="text-lg leading-relaxed">{option.text}</span>
                  {/* Social Score Indicator */}
                  <span className="ml-auto text-xs text-blue-300 opacity-60">[{option.value}]</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Social Scoring Instructions */}
        <div className="text-center text-blue-200 text-sm space-y-1 mb-4">
          <p className="font-medium">Choose the option that resonates most with you</p>
          <p className="opacity-80">There are no right or wrong answers</p>
          <p className="text-xs opacity-60">Values [1-5] indicate social maturity level</p>
          {current === TOTAL_QUESTIONS - 1 && (
            <p className="text-purple-300 font-semibold mt-2">🎯 Final Question - Last step to discover your {archetype.name} stage 🎯</p>
          )}
        </div>

        {/* Stage Description */}
        <div className="bg-white/5 backdrop-blur-md rounded-lg p-4 border border-white/10">
          <h3 className="text-sm font-semibold text-white mb-2" style={{ color: currentStage?.color }}>
            {currentStage?.label}
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            {currentStage?.description}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  )
} 