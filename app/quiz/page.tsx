'use client'

import { useState, useEffect } from 'react'
import { QuizEngineIntegration } from '../../lib/quizEngineIntegration'
import { QuizStep, QuizResult } from '../../types'
import ConversionTracker from '../../components/ConversionTracker'

// All possible archetypes (legacy names for backward compatibility)
const allArchetypes = [
  'Guardian', 'Partner', 'Spotlight', 'Rebel', 
  'Equalizer', 'Visionary', 'Vessel', 'Mask', 
  'Wanderer', 'Provider', 'Sovereign', 'Seeker'
]

// All possible emotional triggers (7 total)
const allTriggers = [
  'Control', 'Rejection', 'Shame', 'Overwhelm', 
  'Neglect', 'Uncertainty', 'Invisibility'
]

// Available images for random selection
const allImages = [
  'equalizer1.png', 'equalizer2.png', 'equalizer3.png',
  'guardian1.png', 'guardian2.png', 'guardian3.png',
  'mask1.png', 'mask2.png', 'mask3.png',
  'partner1.png', 'partner2.png', 'partner3.png',
  'provider1.png', 'provider2.png', 'provider3.png',
  'rebel1.png', 'rebel2.png', 'rebel3.png',
  'seeker1.png', 'seeker2.png', 'seeker3.png',
  'sovereign1.png', 'sovereign2.png', 'sovereign3.png',
  'visionary1.png', 'visionary2.png', 'visionary3.png',
  'wanderer1.png'
];

// Helper to get ritual image and title by milestone
function getRandomUnusedImage(usedImages: string[]): string {
  // Filter out already used images
  const availableImages = allImages.filter(img => !usedImages.includes(img));
  
  // If all images have been used, reset the used images list and start fresh
  if (availableImages.length === 0) {
    console.log('🔄 All images used, resetting image rotation');
    return allImages[0] || ''; // Return first image when resetting
  }
  
  // Get random image from available (unused) images
  const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
  console.log(`🎯 Selected image: ${randomImage} (${availableImages.length} images remaining)`);
  return randomImage;
}

function getRitualVisual(current: number, usedImages: string[]) {
  // Show image after every 3 questions (3, 6, 9, 12, 15)
  if ((current + 1) % 3 === 0) {
    const randomImage = getRandomUnusedImage(usedImages);
    
    // Safety check to ensure randomImage is defined
    if (!randomImage) {
      console.warn('No random image available for ritual visual');
      return null;
    }
    
    const archetype = randomImage.replace(/[0-9].png$/, ''); // Remove number and extension
    
    return {
      img: `/${randomImage}`,
      title: `${archetype.charAt(0).toUpperCase() + archetype.slice(1)} Vision`,
      desc: "A glimpse into your potential archetype.",
      imageKey: randomImage // Add this to help track which image was used
    }
  }
  return null;
}

export default function QuizPage() {
  const [quizEngine, setQuizEngine] = useState<QuizEngineIntegration | null>(null)
  const [currentStep, setCurrentStep] = useState<QuizStep | "FINISHED" | null>(null)
  const [loading, setLoading] = useState(false)
  const [showRitualTransition, setShowRitualTransition] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [usedImages, setUsedImages] = useState<string[]>([])
  
  // Generate and store unique user ID when quiz page loads
  useEffect(() => {
    // Check if user already has an ID
    let userId = localStorage.getItem('quiz_user_id')
    
    if (!userId) {
      // Generate new unique ID
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('quiz_user_id', userId)
      console.log(' Generated new user ID:', userId)
    } else {
      console.log('🆔 Using existing user ID:', userId)
    }

    // Initialize the new quiz engine
    const engine = new QuizEngineIntegration()
    setQuizEngine(engine)
    const step = engine.start()
    setCurrentStep(step)
  }, [])

  // Basic tracking (no EAS scoring)
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentStep && currentStep !== "FINISHED") {
        console.log('⚠️ User leaving quiz early')
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [currentStep])

  // Get progress info from engine
  const progress = quizEngine?.getProgress()
  const isMilestoneQuestion = progress?.isMilestone || false
  const ritualVisual = progress ? getRitualVisual(progress.currentQuestion - 1, usedImages) : null

  // Update usedImages when a new ritual image is shown
  useEffect(() => {
    if (ritualVisual && ritualVisual.imageKey) {
      // If we've used all images, reset the list to start fresh
      if (usedImages.length >= allImages.length - 1) { // -1 because we're about to add the current image
        console.log('🔄 Resetting used images list - all images have been shown');
        setUsedImages([ritualVisual.imageKey]);
      } else {
        setUsedImages(prev => [...prev, ritualVisual.imageKey]);
      }
      console.log(`📸 Added image to used list: ${ritualVisual.imageKey}. Total used: ${usedImages.length + 1}`);
    }
  }, [progress?.currentQuestion]);

  // Track quiz start
  useEffect(() => {
    if ((window as any).trackConversion) {
      (window as any).trackConversion('quiz_start', {
        totalQuestions: 15,
        archetype: null // Will be determined during quiz
      })
    }
  }, [])

  const handleAnswer = async (optionId: string) => {
    if (!quizEngine || !currentStep || currentStep === "FINISHED") return
    
    setSelectedAnswer(optionId)
    
    // Show ritual transition for milestone questions (but not on the last question)
    if (isMilestoneQuestion && ritualVisual && progress && progress.currentQuestion < 15) {
      setShowRitualTransition(true)
      await new Promise(resolve => setTimeout(resolve, 3000))
      setShowRitualTransition(false)
    }
    
    // Process answer through the engine
    const nextStep = await quizEngine.handleAnswer(optionId)
    setCurrentStep(nextStep)
    setSelectedAnswer(null)
    
    if (nextStep === "FINISHED") {
      // Calculate final result
      calculateResult()
    }
  }

  const calculateResult = async () => {
    if (!quizEngine) return
    
    setLoading(true)
    
    try {
      // Get final result from the engine
      const result: QuizResult = quizEngine.finalize()
      
      // Get trigger recommendations
      const recommendedCards = quizEngine.getTriggerRecommendations(result.triggerCounts)
      
      console.log('🏆 Final Archetype:', result.finalArchetype)
      console.log('🔄 Alt Archetype:', result.altArchetype)
      console.log('🎯 Valid Triggers:', result.triggers)
      console.log('📊 Trigger Counts:', result.triggerCounts)
      console.log('📈 R-Index:', result.rIndex)
      // deliveryVersion removed - reverting to single chamber system
      console.log('🔄 Flips:', result.flips)
      console.log('⚖️ Dual Result:', result.dual)
      console.log('📋 Audit Log:', result.audit)
      console.log('🎴 Recommended Cards:', recommendedCards)
      
      // Save results to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('quiz_results', JSON.stringify({
          archetype: result.finalArchetype,
          altArchetype: result.altArchetype,
          triggerScores: result.triggerCounts,
          triggers: result.triggers,
          highestTrigger: result.triggers[0] || 'None',
          recommendedCards,
          rIndex: result.rIndex,
  
          flips: result.flips,
          dual: result.dual,
          audit: result.audit,
          timestamp: Date.now()
        }))
      }
      
      // Redirect to the main chamber page
      if (typeof window !== 'undefined') {
        window.location.href = `/chamber/${result.finalArchetype.toLowerCase()}`
      }
      
      // Optionally: Save to Supabase (client-side only)
      try {
        if (typeof window !== 'undefined') {
          const { createClient } = await import('../../lib/supabase/client')
          const supabase = createClient()
          await supabase.from('sessions').insert([
            {
              archetype: result.finalArchetype,
              history: [], // Engine doesn't track individual answers in this format
              depth_score: result.rIndex,
              ritual_completed: false,
              trigger_scores: result.triggerCounts,
              highest_trigger: result.triggers[0] || 'None',
              // New fields
              r_index: result.rIndex,
      
              flips: result.flips,
              dual_result: result.dual,
              audit_data: result.audit
            }
          ])
        }
      } catch (err) {
        console.error('Failed to save to Supabase:', err)
      }
    } catch (error) {
      console.error('Error calculating result:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetQuiz = () => {
    if (quizEngine) {
      const engine = new QuizEngineIntegration()
      setQuizEngine(engine)
      const step = engine.start()
      setCurrentStep(step)
    }
    setSelectedAnswer(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-6"></div>
          <p className="text-blue-200 text-lg">Calculating your archetype...</p>
          <p className="text-blue-300 text-sm mt-2">Redirecting to your chamber...</p>
        </div>
      </div>
    )
  }

  if (!currentStep || currentStep === "FINISHED") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl mb-4">Quiz Complete</h1>
          <button 
            onClick={resetQuiz}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    )
  }

  // Render current question based on engine step
  const renderQuestion = () => {
    if (currentStep.phase === "A") {
      // Phase A: Fixed questions (Q1-Q7)
      const item = currentStep.item
      return (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-8 mb-4 sm:mb-6 border border-white/20 animate-fade-in flex-1 flex flex-col">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-8 leading-relaxed flex-shrink-0">
            {item.prompt}
          </h1>
          
          <div className="space-y-3 sm:space-y-4 flex-1 flex flex-col justify-center">
            {item.options.map((option: any, idx: number) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-3 sm:p-5 rounded-xl transition-all duration-300 group relative overflow-hidden flex-shrink-0 ${
                  selectedAnswer === option.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white border border-white/20 hover:border-white/40'
                } ${selectedAnswer !== null && selectedAnswer !== option.id ? 'opacity-50' : ''}`}
              >
                {/* Answer glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl transition-opacity duration-300 ${
                  selectedAnswer === option.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                }`} />
                
                <div className="flex items-start relative z-10">
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 mr-3 sm:mr-4 flex-shrink-0 transition-all duration-300 mt-0.5 ${
                    selectedAnswer === option.id
                      ? 'border-white bg-white'
                      : 'border-blue-300 group-hover:border-blue-400 group-hover:scale-110'
                  }`}>
                    {selectedAnswer === option.id && (
                      <div className="w-full h-full rounded-full bg-blue-600 animate-pulse" />
                    )}
                  </div>
                  <span className="text-sm sm:text-lg leading-relaxed">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )
    } else {
      // Phase B: Dynamic questions (Q8-Q15)
      return (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-8 mb-4 sm:mb-6 border border-white/20 animate-fade-in flex-1 flex flex-col">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-8 leading-relaxed flex-shrink-0">
            {currentStep.prompt}
          </h1>
          
          <div className="space-y-3 sm:space-y-4 flex-1 flex flex-col justify-center">
            {currentStep.options.map((option: any, idx: number) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-3 sm:p-5 rounded-xl transition-all duration-300 group relative overflow-hidden flex-shrink-0 ${
                  selectedAnswer === option.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white border border-white/20 hover:border-white/40'
                } ${selectedAnswer !== null && selectedAnswer !== option.id ? 'opacity-50' : ''}`}
              >
                {/* Answer glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl transition-opacity duration-300 ${
                  selectedAnswer === option.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                }`} />
                
                <div className="flex items-start relative z-10">
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 mr-3 sm:mr-4 flex-shrink-0 transition-all duration-300 mt-0.5 ${
                    selectedAnswer === option.id
                      ? 'border-white bg-white'
                      : 'border-blue-300 group-hover:border-blue-400 group-hover:scale-110'
                  }`}>
                    {selectedAnswer === option.id && (
                      <div className="w-full h-full rounded-full bg-blue-600 animate-pulse" />
                    )}
                  </div>
                  <span className="text-sm sm:text-lg leading-relaxed">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
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

      {/* Ritual Transition Overlay */}
      {showRitualTransition && ritualVisual && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="text-center text-white flex flex-col items-center max-w-[90vw] max-h-[90vh]">
            <div className="relative w-full h-full flex items-center justify-center mb-6">
              <img 
                src={ritualVisual.img} 
                alt={ritualVisual.title} 
                className="max-w-full max-h-[70vh] w-auto h-auto object-contain animate-fade-in" 
              />
            </div>
            <div className="text-4xl font-bold mb-3 animate-fade-in">{ritualVisual.title}</div>
            <p className="text-blue-200 text-lg animate-fade-in">{ritualVisual.desc}</p>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto p-4 sm:p-6 relative z-10 min-h-screen flex flex-col">
        {/* Basic Progress Indicator */}
        <div className="text-center mb-3 sm:mb-4">
          <div className="inline-flex items-center px-3 py-1 bg-green-900/20 border border-green-500/50 rounded-lg text-sm">
            <span className="text-green-400 mr-2"></span>
            <span className="text-green-300">Quiz in progress</span>
          </div>
        </div>

        {/* Quiz V2 Redirect Button */}
        <div className="text-center mb-4 sm:mb-6">
          <button
            onClick={() => window.location.href = '/quiz-v2'}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-purple-500/50"
          >
            <span className="mr-2">🧠</span>
            Try New Quiz V2 (3-Phase System)
          </button>
          <p className="text-xs text-blue-200 mt-2 opacity-80">
            Experience the advanced 91-question archetype assessment
          </p>
        </div>

        {/* Enhanced Progress Bar */}
        {progress && (
          <div className="mb-4 sm:mb-8">
            <div className="flex justify-between text-sm text-blue-200 mb-2 sm:mb-3">
              <span className="font-medium text-xs sm:text-sm">
                Question {progress.currentQuestion} of {progress.totalQuestions}
                {progress.currentQuestion === progress.totalQuestions && (
                  <span className="text-purple-300 ml-1 sm:ml-2 text-xs">(Final)</span>
                )}
              </span>
              <span className="font-medium text-xs sm:text-sm">{Math.round(progress.progress)}%</span>
            </div>
            <div className="relative">
              <div className="w-full bg-white/20 rounded-full h-2 sm:h-3 backdrop-blur-sm">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 sm:h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                  style={{ width: `${progress.progress}%` }}
                >
                  {/* Progress milestone indicators */}
                  {[20, 40, 60, 80, 100].map((milestone) => (
                    <div
                      key={milestone}
                      className={`absolute top-0 w-1 h-2 sm:h-3 bg-white rounded-full transition-all duration-500 ${
                        progress.progress >= milestone ? 'opacity-100 scale-125' : 'opacity-50 scale-100'
                      }`}
                      style={{ left: `${milestone}%` }}
                    />
                  ))}
                </div>
              </div>
              {/* Milestone pulse effect */}
              {isMilestoneQuestion && (
                <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20"></div>
              )}
            </div>
          </div>
        )}

        {/* Question Card */}
        {renderQuestion()}

        {/* Enhanced Instructions */}
        <div className="text-center text-blue-200 text-xs sm:text-sm space-y-1 flex-shrink-0">
          <p className="font-medium">Choose the option that resonates most with you</p>
          <p className="opacity-80">There are no right or wrong answers</p>
          {isMilestoneQuestion && progress && progress.currentQuestion < 15 && (
            <p className="text-blue-300 font-semibold mt-1 sm:mt-2 text-xs">✨ Milestone Question - Special significance ✨</p>
          )}
          {progress && progress.currentQuestion === 15 && (
            <p className="text-purple-300 font-semibold mt-1 sm:mt-2 text-xs">🎯 Final Question - Last step to discover your archetype 🎯</p>
          )}
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
