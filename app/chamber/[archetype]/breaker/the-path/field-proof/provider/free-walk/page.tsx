'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { getArchetype } from '@/lib/archetypes'

export default function ProviderFreeWalkPage() {
  const params = useParams()
  const router = useRouter()
  const archetype = params.archetype as string
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{[key: string]: number}>({})

  // Get the provider archetype data
  const archetypeData = getArchetype('provider')
  
  // Show error if not provider
  if (archetype.toLowerCase() !== 'provider') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Provider Path Only</h1>
          <p className="text-gray-400 mb-8">This path is only for Provider archetypes.</p>
          <Link
            href="/chamber"
            className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors duration-300"
          >
            Back to Chambers
          </Link>
        </div>
      </div>
    )
  }

  // Use Provider questions
  const allQuestions = archetypeData.stages.flatMap(stage => 
    stage.questions.map(q => ({ ...q, stageKey: stage.key, stageName: stage.label }))
  )

  const handleAnswer = (questionId: string, value: number) => {
    const newAnswers = {
      ...answers,
      [questionId]: value
    }
    setAnswers(newAnswers)
    
    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < allQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        // Redirect to provider results page with answers as URL parameter
        const answersParam = encodeURIComponent(JSON.stringify(newAnswers))
        router.push(`/chamber/provider/breaker/the-path/field-proof/provider/free-walk/results?answers=${answersParam}`)
      }
    }, 500)
  }

  const currentQ = allQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / allQuestions.length) * 100

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 animate-pulse opacity-10"
          style={{ 
            background: `radial-gradient(circle at center, #f59e0b 0%, transparent 70%)`,
            animationDuration: '4s'
          }}
        />
        {/* Glitch particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-30 animate-ping"
              style={{
                backgroundColor: '#f59e0b',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            className="text-5xl md:text-7xl font-bold mb-6 tracking-wider"
            style={{ 
              color: '#f59e0b',
              textShadow: '0 0 30px #f59e0b'
            }}
          >
            PROVIDER NODE
          </h1>
          <p className="text-2xl text-amber-400 mb-4">
            Stage/Abundance Diagnostic Quiz
          </p>
          <p className="text-lg text-gray-300">
            Discover your current stage of abundance mastery
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Question {currentQuestionIndex + 1} of {allQuestions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-amber-500 to-yellow-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="backdrop-blur-md border-2 border-amber-500/30 rounded-2xl p-12 bg-gradient-to-r from-amber-900/20 to-yellow-900/20 mb-12"
             style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.2)' }}>
          <h2 className="text-3xl font-bold mb-8 text-center text-amber-400">
            {currentQ.question}
          </h2>
          
          {/* Answer Options */}
          <div className="space-y-4">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQ.id, index + 1)}
                className="w-full text-left p-6 rounded-xl border-2 border-amber-500/30 bg-gradient-to-r from-amber-900/10 to-yellow-900/10 hover:from-amber-900/20 hover:to-yellow-900/20 transition-all duration-300 group"
                style={{ boxShadow: '0 0 20px rgba(245, 158, 11, 0.1)' }}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center mr-4 group-hover:bg-amber-500/40 transition-colors duration-300">
                    <span className="text-amber-400 font-bold">{index + 1}</span>
                  </div>
                  <span className="text-lg text-gray-200 group-hover:text-amber-300 transition-colors duration-300">
                    {option}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <Link
            href={`/chamber/${archetype}/breaker`}
            className="inline-block text-amber-400 hover:text-amber-300 transition-colors duration-300"
          >
            ← Back to Provider Breaker
          </Link>
        </div>
      </div>
    </div>
  )
} 