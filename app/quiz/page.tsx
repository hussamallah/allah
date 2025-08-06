'use client'

import { useState, useEffect } from 'react'
import questions from '../../data/quizQuestions.json'
import { QuizQuestion } from '../../types'
import ArchetypeResults from '../../components/ArchetypeResults'
import EnhancedPageTracker from '../../components/EnhancedPageTracker'
import ConversionTracker from '../../components/ConversionTracker'


// All possible archetypes
const allArchetypes = [
  'Guardian', 'Partner', 'Spotlight', 'Rebel', 
  'Equalizer', 'Visionary', 'Servant', 'Mask', 
  'Wanderer', 'Provider', 'Sovereign', 'Seeker'
]

// Fallback questions if import fails
const fallbackQuestions = [
  {
    question: "When you walk into a room of strangers, you…",
    options: [
      { text: "Scan who holds power and decide when to speak.", weights: { "Sovereign": 0.75, "Wanderer": 0.25 } },
      { text: "Feel the emotional temperature, then bring balance.", weights: { "Equalizer": 0.75, "Seeker": 0.25 } },
      { text: "Say something sharp just to watch reactions.", weights: { "Rebel": 0.75, "Spotlight": 0.25 } },
      { text: "Blend in and quietly support whomever needs it.", weights: { "Servant": 0.75, "Mask": 0.25 } },
      { text: "Note the possibilities and imagine new futures.", weights: { "Visionary": 0.75, "Partner": 0.25 } },
      { text: "Find the safest corner and observe everything first.", weights: { "Guardian": 0.75, "Provider": 0.25 } }
    ]
  }
]

// Use questions if available, otherwise use fallback
const quizQuestions = Array.isArray(questions) && questions.length > 0 ? questions : fallbackQuestions

// Force the correct number of questions (we know there are 15)
const TOTAL_QUESTIONS = 15

// Helper to get ritual image and title by milestone
function getRitualVisual(current: number) {
  if ((current + 1) === 5) {
    return {
      img: "/owl-freedom.png",
      title: "Freedom Unbound",
      desc: "A symbol of total liberation and bold expansion."
    }
  }
  if ((current + 1) === 10) {
    return {
      img: "/owl-mystery.png",
      title: "Mist of Mystery",
      desc: "A mysterious, enigmatic, almost spectral presence."
    }
  }
  if ((current + 1) === 15) {
    return {
      img: "/owl-radiance..png",
      title: "Bold Radiance",
      desc: "Confidence, authority, and standing out."
    }
  }
  return null;
}

export default function QuizPage() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showRitualTransition, setShowRitualTransition] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now())
  
  // Basic tracking (no EAS scoring)
  const [questionTimes, setQuestionTimes] = useState<number[]>([])

  // Generate and store unique user ID when quiz page loads
  useEffect(() => {
    // Check if user already has an ID
    let userId = localStorage.getItem('quiz_user_id')
    
    if (!userId) {
      // Generate new unique ID
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('quiz_user_id', userId)
      console.log('🆔 Generated new user ID:', userId)
    } else {
      console.log('🆔 Using existing user ID:', userId)
    }
  }, [])

  // Basic tracking (no EAS scoring)
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (current < TOTAL_QUESTIONS - 1) {
        console.log('⚠️ User leaving quiz early')
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [current])

  // Check if this is a milestone question (every 5, 10, 15)
  const isMilestoneQuestion = (current + 1) === 5 || (current + 1) === 10 || (current + 1) === 15;
  const ritualVisual = getRitualVisual(current);

  // Track quiz start
  useEffect(() => {
    if ((window as any).trackConversion) {
      (window as any).trackConversion('quiz_start', {
        totalQuestions: TOTAL_QUESTIONS,
        archetype: null // Will be determined during quiz
      })
    }
  }, [])

  const handleAnswer = async (optionIdx: number) => {
    setSelectedAnswer(optionIdx)
    
    // Calculate time spent on this question (no EAS scoring)
    const questionTime = Math.floor((Date.now() - questionStartTime) / 1000)
    console.log(`⏱️ Question ${current + 1} time: ${questionTime}s`)
    
    // Store question time for calculating average
    const newQuestionTimes = [...questionTimes, questionTime]
    setQuestionTimes(newQuestionTimes)
    
    const newAnswers = [...answers, optionIdx]
    setAnswers(newAnswers)
    
    // Show ritual transition for milestone questions (but not on the last question)
    if (isMilestoneQuestion && ritualVisual && current < TOTAL_QUESTIONS - 1) {
      setShowRitualTransition(true)
      await new Promise(resolve => setTimeout(resolve, 5000))
      setShowRitualTransition(false)
    }
    
    if (current < TOTAL_QUESTIONS - 1) {
      setCurrent(current + 1)
      setSelectedAnswer(null)
      // Reset timer for next question
      setQuestionStartTime(Date.now())
    } else {
      // Track quiz completion
      if ((window as any).trackConversion) {
        (window as any).trackConversion('quiz_completion', {
          totalQuestions: TOTAL_QUESTIONS,
          averageTimePerQuestion: averageTime,
          archetype: null // Will be determined in results
        })
      }
      
      calculateResult(newAnswers)
    }
  }

  const calculateResult = async (allAnswers: number[]) => {
    setLoading(true)
    // Initialize all archetype scores
    const scores: Record<string, number> = {}
    allArchetypes.forEach(a => { scores[a] = 0 })
    
    // Calculate weighted scores
    allAnswers.forEach((optionIdx, questionIdx) => {
      const question = quizQuestions[questionIdx] as unknown as QuizQuestion
      const selectedOption = question.options[optionIdx]
      
      // Add weighted scores for each archetype
      Object.entries(selectedOption.weights).forEach(([archetype, weight]) => {
        if (scores.hasOwnProperty(archetype)) {
          scores[archetype] += weight
        }
      })
    })
    
    // Find the archetype with the highest score
    const topArchetype = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
    setResult(topArchetype)
    
    // Update URL to allow sharing results
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.pathname = '/quiz/results'
      url.searchParams.set('archetype', topArchetype)
      window.history.replaceState({}, '', url.toString())
    }
    
    // Optionally: Save to Supabase (client-side only)
    try {
      if (typeof window !== 'undefined') {
        const { supabase } = await import('../../lib/supabase')
        await supabase.from('sessions').insert([
          {
            archetype: topArchetype,
            history: allAnswers,
            depth_score: 0,
            ritual_completed: false
          }
        ])
      }
    } catch (err) {
      // ignore
    }
    setLoading(false)
  }

  const resetQuiz = () => {
    setCurrent(0)
    setAnswers([])
    setResult(null)
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
        </div>
      </div>
    )
  }

  if (result) {
    return <ArchetypeResults archetype={result} onReset={resetQuiz} />
  }



  const q = quizQuestions[current] as unknown as QuizQuestion
  // Progress calculation: show completion percentage based on current question
  const progress = ((current + 1) / TOTAL_QUESTIONS) * 100

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

      {/* Ritual Transition Overlay */}
      {showRitualTransition && ritualVisual && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-pulse">
          <div className="text-center text-white flex flex-col items-center">
            <img src={ritualVisual.img} alt={ritualVisual.title} className="w-48 h-48 mb-6 animate-bounce" />
            <div className="text-4xl font-bold mb-3">{ritualVisual.title}</div>
            <p className="text-blue-200 text-lg">{ritualVisual.desc}</p>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto p-6 relative z-10">
        {/* Basic Progress Indicator */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center px-3 py-1 bg-green-900/20 border border-green-500/50 rounded-lg text-sm">
            <span className="text-green-400 mr-2">📊</span>
            <span className="text-green-300">Quiz in progress</span>
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
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="relative">
            <div className="w-full bg-white/20 rounded-full h-3 backdrop-blur-sm">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                style={{ width: `${progress}%` }}
              >
                {/* Progress milestone indicators */}
                {[20, 40, 60, 80, 100].map((milestone) => (
                  <div
                    key={milestone}
                    className={`absolute top-0 w-1 h-3 bg-white rounded-full transition-all duration-500 ${
                      progress >= milestone ? 'opacity-100 scale-125' : 'opacity-50 scale-100'
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

        {/* Enhanced Question Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-6 border border-white/20 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed">
            {q.question}
          </h1>
          
          <div className="space-y-4">
            {q.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  selectedAnswer === idx
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white border border-white/20 hover:border-white/40'
                } ${selectedAnswer !== null && selectedAnswer !== idx ? 'opacity-50' : ''}`}
              >
                {/* Answer glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl transition-opacity duration-300 ${
                  selectedAnswer === idx ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                }`} />
                
                <div className="flex items-center relative z-10">
                  <div className={`w-6 h-6 rounded-full border-2 mr-4 flex-shrink-0 transition-all duration-300 ${
                    selectedAnswer === idx
                      ? 'border-white bg-white'
                      : 'border-blue-300 group-hover:border-blue-400 group-hover:scale-110'
                  }`}>
                    {selectedAnswer === idx && (
                      <div className="w-full h-full rounded-full bg-blue-600 animate-pulse" />
                    )}
                  </div>
                  <span className="text-lg leading-relaxed">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Instructions */}
        <div className="text-center text-blue-200 text-sm space-y-1">
          <p className="font-medium">Choose the option that resonates most with you</p>
          <p className="opacity-80">There are no right or wrong answers</p>
          {isMilestoneQuestion && current < TOTAL_QUESTIONS - 1 && (
            <p className="text-blue-300 font-semibold mt-2">✨ Milestone Question - Special significance ✨</p>
          )}
          {current === TOTAL_QUESTIONS - 1 && (
            <p className="text-purple-300 font-semibold mt-2">🎯 Final Question - Last step to discover your archetype 🎯</p>
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
