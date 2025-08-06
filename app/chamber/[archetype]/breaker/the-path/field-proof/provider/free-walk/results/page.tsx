'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getArchetype } from '@/lib/archetypes'

export default function ProviderResultsPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const archetype = params.archetype as string
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const answersParam = searchParams.get('answers')
    if (answersParam) {
      try {
        const answers = JSON.parse(decodeURIComponent(answersParam))
        const archetypeData = getArchetype('provider')
        
        // Calculate results based on answers
        const stageScores: {[key: string]: number} = {}
        
        // Initialize scores
        archetypeData.stages.forEach(stage => {
          stageScores[stage.key] = 0
        })
        
        // Calculate scores for each stage
        Object.entries(answers).forEach(([questionId, answer]) => {
          const question = archetypeData.stages
            .flatMap(stage => stage.questions)
            .find(q => q.id === questionId)
          
          if (question) {
            const stageKey = archetypeData.stages
              .find(stage => stage.questions.some(q => q.id === questionId))?.key
            
            if (stageKey) {
              stageScores[stageKey] += answer as number
            }
          }
        })
        
        // Find the stage with highest score
        const currentStage = Object.entries(stageScores).reduce((a, b) => 
          stageScores[a[0]] > stageScores[b[0]] ? a : b
        )[0]
        
        const currentStageData = archetypeData.stages.find(s => s.key === currentStage)
        
        setResults({
          currentStage,
          currentStageData,
          stageScores,
          archetypeData
        })
      } catch (error) {
        console.error('Error parsing results:', error)
      }
    }
    setLoading(false)
  }, [searchParams])

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

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-pulse">🌟</div>
          <p className="text-xl text-amber-400">Analyzing your abundance patterns...</p>
        </div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Results Found</h1>
          <p className="text-gray-400 mb-8">Please complete the quiz first.</p>
          <Link
            href={`/chamber/provider/breaker/the-path/field-proof/provider/free-walk`}
            className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors duration-300"
          >
            Take the Quiz
          </Link>
        </div>
      </div>
    )
  }

  const { currentStageData, stageScores, archetypeData } = results

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
      
      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            className="text-5xl md:text-7xl font-bold mb-6 tracking-wider"
            style={{ 
              color: '#f59e0b',
              textShadow: '0 0 30px #f59e0b'
            }}
          >
            PROVIDER DIAGNOSIS
          </h1>
          <p className="text-2xl text-amber-400 mb-4">
            Your Abundance Stage Revealed
          </p>
        </div>

        {/* Current Stage */}
        <div className="backdrop-blur-md border-2 border-amber-500/30 rounded-2xl p-12 bg-gradient-to-r from-amber-900/20 to-yellow-900/20 mb-12"
             style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.2)' }}>
          <h2 className="text-4xl font-bold mb-8 text-center text-amber-400">
            You Are: {currentStageData?.label}
          </h2>
          <p className="text-xl text-gray-200 leading-relaxed text-center mb-8">
            {currentStageData?.description}
          </p>
          <div className="text-center">
            <div className="text-6xl mb-4">🌟</div>
            <p className="text-lg text-amber-300">
              {currentStageData?.diagnosis}
            </p>
          </div>
        </div>

        {/* Stage Progress */}
        <div className="backdrop-blur-md border-2 border-yellow-500/30 rounded-2xl p-12 bg-gradient-to-r from-yellow-900/20 to-amber-900/20 mb-12"
             style={{ boxShadow: '0 0 40px rgba(251, 191, 36, 0.2)' }}>
          <h3 className="text-3xl font-bold mb-8 text-center text-yellow-400">
            Your Abundance Journey
          </h3>
          <div className="space-y-6">
            {archetypeData.stages.map((stage, index) => {
              const score = stageScores[stage.key] || 0
              const maxScore = stage.questions.length * 5 // Assuming 5-point scale
              const percentage = (score / maxScore) * 100
              const isCurrentStage = stage.key === currentStageData?.key
              
              return (
                <div key={stage.key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-lg font-semibold ${isCurrentStage ? 'text-amber-400' : 'text-gray-300'}`}>
                      {index + 1}. {stage.label}
                    </span>
                    <span className={`text-sm ${isCurrentStage ? 'text-amber-400' : 'text-gray-400'}`}>
                      {Math.round(percentage)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 ${
                        isCurrentStage 
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-500' 
                          : 'bg-gradient-to-r from-gray-600 to-gray-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  {isCurrentStage && (
                    <p className="text-sm text-amber-300 italic">
                      ← You are here
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Your True Need */}
        <div className="backdrop-blur-md border-2 border-amber-500/30 rounded-2xl p-12 bg-gradient-to-r from-amber-900/20 to-yellow-900/20 mb-12"
             style={{ boxShadow: '0 0 40px rgba(245, 158, 11, 0.2)' }}>
          <h3 className="text-3xl font-bold mb-8 text-center text-amber-400">
            Your True Need
          </h3>
          <p className="text-xl text-gray-200 leading-relaxed text-center">
            {currentStageData?.needs}
          </p>
        </div>

        {/* Next Steps */}
        <div className="text-center mb-16">
          <Link
            href={`/chamber/provider/rituals`}
            className="group relative inline-block px-16 py-8 rounded-3xl font-bold text-white transition-all duration-700 hover:scale-110 transform"
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)',
              boxShadow: '0 0 60px rgba(245, 158, 11, 0.7)'
            }}
          >
            <span className="relative z-10 flex items-center justify-center text-2xl">
              <span className="mr-4 text-3xl animate-pulse">🌟</span>
              Recommended Provider Rituals
            </span>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 from-amber-600 to-yellow-600"></div>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-700 animate-pulse from-amber-400 to-yellow-400"></div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="text-center space-y-4">
          <Link
            href={`/chamber/provider/breaker/the-path/field-proof/provider/free-walk`}
            className="inline-block text-amber-400 hover:text-amber-300 transition-colors duration-300 mr-8"
          >
            Retake Quiz
          </Link>
          <Link
            href={`/chamber/provider/breaker`}
            className="inline-block text-amber-400 hover:text-amber-300 transition-colors duration-300"
          >
            ← Back to Provider Breaker
          </Link>
        </div>
      </div>
    </div>
  )
} 