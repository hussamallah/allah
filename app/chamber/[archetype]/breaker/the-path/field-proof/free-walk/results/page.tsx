'use client'

import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getArchetype } from '@/lib/archetypes'
import { scoreQuiz } from '@/lib/quizScoring'

export default function FreeWalkResultsPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const archetype = params.archetype as string
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get answers from URL parameters
    const answersParam = searchParams.get('answers')
    
    if (answersParam) {
      try {
        const answers = JSON.parse(decodeURIComponent(answersParam))
        const archetypeData = getArchetype(archetype)
        
        if (archetypeData) {
          // Use the scoreQuiz function
          const quizResult = scoreQuiz(answers, archetypeData)
          
          // Get diagnosis for all archetypes
          let diagnosis
          if (archetypeData.diagnosis && archetypeData.diagnosis[quizResult.dominantStage] && archetypeData.diagnosis[quizResult.dominantStage][quizResult.maskStage]) {
            diagnosis = archetypeData.diagnosis[quizResult.dominantStage][quizResult.maskStage]
          } else {
            // Fallback for archetypes without full diagnosis mapping
            const dominantStageLabel = archetypeData.stages.find(s => s.key === quizResult.dominantStage)?.label || quizResult.dominantStage
            const maskStageLabel = archetypeData.stages.find(s => s.key === quizResult.maskStage)?.label || quizResult.maskStage
            diagnosis = {
              title: `${dominantStageLabel} | Mask: ${maskStageLabel}`,
              diagnosis: `You are a ${dominantStageLabel} with a ${maskStageLabel} mask. You are progressing on your ${archetypeData.name} path. Continue to develop your abilities.`,
              reality: "Your field is evolving. Patterns shift as you grow.",
              tension: "Growth requires both your strengths and your challenges.",
              lawToWalk: "Embrace both your stage and your mask. Each serves your evolution.",
              ifYouStay: "You will continue to develop at your current pace.",
              ifYouAct: "You will accelerate your growth and transformation."
            }
          }

          setResults({
            scores: quizResult.stageScores,
            dominantStage: quizResult.dominantStage,
            maskStage: quizResult.maskStage,
            diagnosis,
            stageDetails: quizResult.stageDetails,
            progressLevels: quizResult.progressLevels,
            isBreaker: quizResult.isBreaker
          })
        }
      } catch (error) {
        console.error('Error parsing answers:', error)
      }
    }
    setLoading(false)
  }, [searchParams, archetype])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your results...</p>
        </div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Results Found</h1>
          <p className="text-gray-400 mb-8">Please take the quiz first.</p>
          <Link
            href={`/chamber/${archetype}/breaker/the-path/field-proof/free-walk`}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300"
          >
            Take Quiz
          </Link>
        </div>
      </div>
    )
  }

  const archetypeData = getArchetype(archetype)
  if (!archetypeData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Archetype Not Found</h1>
          <p className="text-gray-400 mb-8">The archetype "{archetype}" is not available.</p>
          <Link
            href="/chamber"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300"
          >
            Back to Chambers
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 animate-pulse opacity-10"
          style={{ 
            background: `radial-gradient(circle at center, ${archetypeData.color} 0%, transparent 70%)`,
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
                backgroundColor: archetypeData.color,
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
              color: archetypeData.color,
              textShadow: `0 0 30px ${archetypeData.color}`
            }}
          >
            {archetypeData.name.toUpperCase()} DIAGNOSIS
          </h1>
          
          <div className="w-32 h-1 mx-auto mb-8 animate-pulse" 
               style={{ 
                 background: `linear-gradient(to right, ${archetypeData.color}, ${archetypeData.accentColor})`,
                 animationDuration: '4s' 
               }}></div>
        </div>

        {/* Main Diagnosis */}
        <div 
          className="backdrop-blur-md border-2 rounded-2xl p-8 mb-12"
          style={{ 
            background: `linear-gradient(to right, ${archetypeData.color}20, ${archetypeData.accentColor}20)`,
            borderColor: `${archetypeData.color}50`,
            boxShadow: `0 0 40px ${archetypeData.glowColor}`
          }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center"
              style={{ color: archetypeData.color }}>
            {results.diagnosis.title}
          </h2>
          
          <div className="space-y-6 text-lg">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">Diagnosis</h3>
              <p className="text-gray-300 leading-relaxed">{results.diagnosis.diagnosis}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">Reality</h3>
              <p className="text-gray-300 leading-relaxed">{results.diagnosis.reality}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">Tension</h3>
              <p className="text-gray-300 leading-relaxed">{results.diagnosis.tension}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">Law to Walk</h3>
              <p className="text-gray-300 leading-relaxed">{results.diagnosis.lawToWalk}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-red-400">If You Stay</h3>
                <p className="text-gray-300 leading-relaxed">{results.diagnosis.ifYouStay}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-green-400">If You Act</h3>
                <p className="text-gray-300 leading-relaxed">{results.diagnosis.ifYouAct}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stage Scores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Dominant Stage */}
          <div 
            className="backdrop-blur-md border-2 rounded-2xl p-6"
            style={{ 
              background: `linear-gradient(to right, ${archetypeData.color}15, ${archetypeData.accentColor}15)`,
              borderColor: `${archetypeData.color}40`,
              boxShadow: `0 0 30px ${archetypeData.glowColor}`
            }}
          >
            <h3 className="text-2xl font-bold mb-4 text-center"
                style={{ color: archetypeData.color }}>
              Your Dominant Stage
            </h3>
            <div className="text-center">
              <h4 className="text-xl font-semibold text-white mb-2">{results.stageDetails.dominant.label}</h4>
              <p className="text-gray-300 mb-4">{results.stageDetails.dominant.description}</p>
              <div className="text-3xl font-bold mb-2"
                   style={{ color: archetypeData.color }}>
                {results.stageDetails.dominant.score}
              </div>
              <div className="text-sm text-gray-400">
                {results.progressLevels[results.dominantStage] === 'passed' && '✓ Passed'}
                {results.progressLevels[results.dominantStage] === 'progressing' && '→ Progressing'}
                {results.progressLevels[results.dominantStage] === 'stuck' && '⚠ Stuck'}
              </div>
            </div>
          </div>

          {/* Mask Stage */}
          <div 
            className="backdrop-blur-md border-2 rounded-2xl p-6"
            style={{ 
              background: `linear-gradient(to right, #6b728020, #9ca3af20)`,
              borderColor: '#6b728040',
              boxShadow: '0 0 30px rgba(156, 163, 175, 0.3)'
            }}
          >
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-300">
              Your Mask Stage
            </h3>
            <div className="text-center">
              <h4 className="text-xl font-semibold text-white mb-2">{results.stageDetails.mask.label}</h4>
              <p className="text-gray-300 mb-4">{results.stageDetails.mask.description}</p>
              <div className="text-3xl font-bold mb-2 text-gray-400">
                {results.stageDetails.mask.score}
              </div>
              <div className="text-sm text-gray-400">
                {results.progressLevels[results.maskStage] === 'passed' && '✓ Passed'}
                {results.progressLevels[results.maskStage] === 'progressing' && '→ Progressing'}
                {results.progressLevels[results.maskStage] === 'stuck' && '⚠ Stuck'}
              </div>
            </div>
          </div>
        </div>

        {/* All Stage Progress */}
        <div 
          className="backdrop-blur-md border-2 rounded-2xl p-8 mb-12"
          style={{ 
            background: `linear-gradient(to right, ${archetypeData.color}10, ${archetypeData.accentColor}10)`,
            borderColor: `${archetypeData.color}30`,
            boxShadow: `0 0 30px ${archetypeData.glowColor}`
          }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-white">All Stage Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archetypeData.stages.map((stage: any) => {
              const score = results.scores[stage.key]
              const progress = results.progressLevels[stage.key]
              const isDominant = results.dominantStage === stage.key
              const isMask = results.maskStage === stage.key
              
              return (
                <div 
                  key={stage.key}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    isDominant ? 'border-green-500 bg-green-500/10' :
                    isMask ? 'border-red-500 bg-red-500/10' :
                    'border-gray-600 bg-gray-500/10'
                  }`}
                >
                  <div className="text-center">
                    <h4 className="font-semibold text-white mb-2">{stage.label}</h4>
                    <div className="text-2xl font-bold mb-2"
                         style={{ color: isDominant ? archetypeData.color : isMask ? '#ef4444' : '#6b7280' }}>
                      {score}
                    </div>
                    <div className="text-sm">
                      {progress === 'passed' && <span className="text-green-400">✓ Passed</span>}
                      {progress === 'progressing' && <span className="text-yellow-400">→ Progressing</span>}
                      {progress === 'stuck' && <span className="text-red-400">⚠ Stuck</span>}
                    </div>
                    {isDominant && <div className="text-xs text-green-400 mt-1">Dominant</div>}
                    {isMask && <div className="text-xs text-red-400 mt-1">Mask</div>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Breaker Status */}
        {results.isBreaker && (
          <div 
            className="backdrop-blur-md border-2 rounded-2xl p-8 mb-12 text-center"
            style={{ 
              background: 'linear-gradient(to right, #10b98120, #34d39920)',
              borderColor: '#10b98150',
              boxShadow: '0 0 40px rgba(16, 185, 129, 0.3)'
            }}
          >
            <h3 className="text-3xl font-bold mb-4 text-green-400">BREAKER STATUS ACHIEVED</h3>
            <p className="text-lg text-gray-300">
              You have transcended the normal progression and achieved true mastery across all stages.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Link
            href={`/chamber/${archetype}/rituals`}
            className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300 text-lg font-semibold"
          >
            View {archetypeData.name} Rituals
          </Link>
          
          <div className="block">
            <Link
              href={`/chamber/${archetype}/breaker/the-path/field-proof/free-walk`}
              className="inline-block px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
            >
              Retake Quiz
            </Link>
          </div>
          
          <div className="block">
            <Link
              href={`/chamber/${archetype}/the-path`}
              className="inline-block px-6 py-3 text-gray-400 hover:text-white transition-colors duration-300"
            >
              ← Back to Your Path
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 