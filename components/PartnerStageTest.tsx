'use client'

import { useState, useEffect } from 'react'
import partnerStageTestData from '../data/partnerStageTest.json'

interface Question {
  id: string
  question: string
  options: Array<{
    text: string
    value: number
  }>
}

interface Stage {
  name: string
  key: string
  questions: Question[]
}

interface StageTestData {
  archetype: string
  stages: Stage[]
  scoring: {
    maxPerStage: number
    progressLevels: {
      stuck: { min: number; max: number }
      progressing: { min: number; max: number }
      passed: { min: number; max: number }
    }
  }
  diagnosis: Record<string, Record<string, {
    title: string
    diagnosis: string
  }>>
}

export default function PartnerStageTest() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [stageScores, setStageScores] = useState<Record<string, number>>({})
  const [mainStage, setMainStage] = useState<string>('')
  const [mask, setMask] = useState<string>('')
  const [diagnosis, setDiagnosis] = useState<string>('')

  const data = partnerStageTestData as StageTestData

  // Flatten all questions into a single array
  const allQuestions = data.stages.flatMap(stage => 
    stage.questions.map(q => ({ ...q, stageKey: stage.key, stageName: stage.name }))
  )

  const currentQuestion = allQuestions[currentQuestionIndex]

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }))

    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      calculateResults()
    }
  }

  const calculateResults = () => {
    // Calculate scores for each stage
    const scores: Record<string, number> = {}
    
    data.stages.forEach(stage => {
      const stageScore = stage.questions.reduce((total, question) => {
        return total + (answers[question.id] || 0)
      }, 0)
      scores[stage.key] = stageScore
    })

    setStageScores(scores)

    // Find main stage (highest score)
    const mainStageKey = Object.keys(scores).reduce((a, b) => 
      scores[a] > scores[b] ? a : b
    )
    setMainStage(mainStageKey)

    // Find mask (lowest score)
    const maskKey = Object.keys(scores).reduce((a, b) => 
      scores[a] < scores[b] ? a : b
    )
    setMask(maskKey)

    // Get diagnosis
    const diagnosisText = data.diagnosis[mainStageKey]?.[maskKey]?.diagnosis || 
      "You are progressing on your Partner path. Continue to develop your connection abilities."
    setDiagnosis(diagnosisText)

    setShowResults(true)
  }

  const getProgressLevel = (score: number) => {
    const { progressLevels } = data.scoring
    if (score <= progressLevels.stuck.max) return 'stuck'
    if (score <= progressLevels.progressing.max) return 'progressing'
    return 'passed'
  }

  const getProgressColor = (level: string) => {
    switch (level) {
      case 'stuck': return 'text-red-400'
      case 'progressing': return 'text-yellow-400'
      case 'passed': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  const getProgressText = (level: string) => {
    switch (level) {
      case 'stuck': return 'stuck'
      case 'progressing': return 'progressing'
      case 'passed': return 'passed'
      default: return 'unknown'
    }
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-red-400">Partner Node Stage Test Results</h1>
            <p className="text-xl text-gray-300">Your journey from outsider to Unifier</p>
          </div>

          {/* Main Stage and Mask */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="backdrop-blur-md border-2 border-red-500/30 rounded-2xl p-8 bg-gradient-to-r from-red-900/20 to-pink-900/20"
                 style={{ boxShadow: '0 0 40px rgba(225, 29, 72, 0.2)' }}>
              <h2 className="text-2xl font-bold mb-4 text-red-400">Main Stage</h2>
              <p className="text-3xl font-bold text-pink-400 mb-2">
                {data.stages.find(s => s.key === mainStage)?.name}
              </p>
              <p className="text-gray-300">
                This is your current "walk" - where you're strongest in your Partner journey.
              </p>
            </div>

            <div className="backdrop-blur-md border-2 border-pink-500/30 rounded-2xl p-8 bg-gradient-to-r from-pink-900/20 to-red-900/20"
                 style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.2)' }}>
              <h2 className="text-2xl font-bold mb-4 text-pink-400">Mask</h2>
              <p className="text-3xl font-bold text-red-400 mb-2">
                {data.stages.find(s => s.key === mask)?.name}
              </p>
              <p className="text-gray-300">
                This is where you're weakest or hiding - your growth edge.
              </p>
            </div>
          </div>

          {/* Diagnosis */}
          <div className="backdrop-blur-md border-2 border-red-500/30 rounded-2xl p-8 bg-gradient-to-r from-red-900/20 to-pink-900/20 mb-12"
               style={{ boxShadow: '0 0 40px rgba(225, 29, 72, 0.2)' }}>
            <h2 className="text-2xl font-bold mb-4 text-red-400">Diagnosis</h2>
            <p className="text-xl text-gray-200 leading-relaxed">{diagnosis}</p>
          </div>

          {/* Stage Progress */}
          <div className="backdrop-blur-md border-2 border-pink-500/30 rounded-2xl p-8 bg-gradient-to-r from-pink-900/20 to-red-900/20 mb-12"
               style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.2)' }}>
            <h2 className="text-2xl font-bold mb-6 text-pink-400">Stage Progress</h2>
            <div className="space-y-4">
              {data.stages.map(stage => {
                const score = stageScores[stage.key] || 0
                const progressLevel = getProgressLevel(score)
                const progressColor = getProgressColor(progressLevel)
                const progressText = getProgressText(progressLevel)
                
                return (
                  <div key={stage.key} className="flex justify-between items-center p-4 bg-black/20 rounded-lg">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-200">{stage.name}</h3>
                      <p className="text-sm text-gray-400">{score}/{data.scoring.maxPerStage}</p>
                    </div>
                    <span className={`font-bold ${progressColor}`}>{progressText}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Restart Button */}
          <div className="text-center">
            <button
              onClick={() => {
                setCurrentQuestionIndex(0)
                setAnswers({})
                setShowResults(false)
                setStageScores({})
                setMainStage('')
                setMask('')
                setDiagnosis('')
              }}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300"
            >
              Take Test Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-red-400">Partner Node Stage Test</h1>
          <p className="text-xl text-gray-300 mb-4">Discover where you really are in your journey from outsider to Unifier</p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-red-600 to-pink-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / allQuestions.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Question {currentQuestionIndex + 1} of {allQuestions.length}
          </p>
        </div>

        {/* Current Stage Indicator */}
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 bg-red-900/30 border border-red-500/50 rounded-lg">
            <span className="text-red-400 font-semibold">{currentQuestion.stageName}</span>
          </div>
        </div>

        {/* Question */}
        <div className="backdrop-blur-md border-2 border-red-500/30 rounded-2xl p-8 bg-gradient-to-r from-red-900/20 to-pink-900/20 mb-8"
             style={{ boxShadow: '0 0 40px rgba(225, 29, 72, 0.2)' }}>
          <h2 className="text-2xl font-bold mb-6 text-red-400">{currentQuestion.question}</h2>
          
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.value)}
                className="w-full text-left p-4 bg-black/20 border border-red-500/30 rounded-lg hover:bg-red-900/20 hover:border-red-400/50 transition-all duration-300"
              >
                <span className="text-gray-200">{option.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center text-gray-400">
          <p>Choose the answer that most accurately describes your current behavior and feelings.</p>
        </div>
      </div>
    </div>
  )
} 