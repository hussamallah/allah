'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import questions from '../../../../../../../data/quizQuestions.json'

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

export default function FreeWalkQuizPage() {
  const params = useParams()
  const archetype = params.archetype as string
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showRitualTransition, setShowRitualTransition] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  // Only show for valid archetypes
  const validArchetypes = ['seeker', 'guardian', 'partner', 'spotlight', 'rebel', 'equalizer', 'visionary', 'servant', 'mask', 'wanderer', 'provider', 'sovereign']
  if (!validArchetypes.includes(archetype.toLowerCase())) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Archetype</h1>
          <p className="text-gray-400">This quiz is only for valid archetypes.</p>
          <Link href="/chambers" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
            ← Back to Chambers
          </Link>
        </div>
      </div>
    )
  }

  // Check if this is a milestone question (every 5, 10, 15)
  const isMilestoneQuestion = (current + 1) === 5 || (current + 1) === 10 || (current + 1) === 15;
  const ritualVisual = getRitualVisual(current);

  const handleAnswer = async (optionIdx: number) => {
    setSelectedAnswer(optionIdx)
    
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
    } else {
      calculateResult(newAnswers)
    }
  }

  const calculateResult = async (allAnswers: number[]) => {
    setLoading(true)
    
    // Calculate archetype scores based on weights
    const scores: { [key: string]: number } = {}
    allArchetypes.forEach(archetype => scores[archetype] = 0)
    
    allAnswers.forEach((answerIdx, questionIdx) => {
      const question = quizQuestions[questionIdx]
      const selectedOption = question.options[answerIdx]
      
      Object.entries(selectedOption.weights).forEach(([archetype, weight]) => {
        scores[archetype] += weight
      })
    })
    
    // Find the archetype with the highest score
    const dominantArchetype = Object.entries(scores).reduce((a, b) => scores[a[0]] > scores[b[0]] ? a : b)[0]
    
    setResult(dominantArchetype)
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
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Calculating your archetype...</p>
        </div>
      </div>
    )
  }

  if (result) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Your Archetype</h1>
          <p className="text-2xl text-purple-400 mb-8">{result}</p>
          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    )
  }

  if (showRitualTransition && ritualVisual) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <img src={ritualVisual.img} alt={ritualVisual.title} className="w-32 h-32 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">{ritualVisual.title}</h2>
          <p className="text-gray-400">{ritualVisual.desc}</p>
        </div>
      </div>
    )
  }

  const currentQuestion = quizQuestions[current]

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">🏛️ Chambers</h1>
          <h2 className="text-2xl font-bold mb-2"># {archetype.toUpperCase()} NODE</h2>
          <p className="text-gray-400">Stage/Masks Diagnostic Quiz</p>
          <p className="text-sm text-gray-500 mt-2">
            This quiz detects your exact position—Questioner, Edge Flincher, Edge Walker, Loop Burner, or Breaker—and exposes the mask you're hiding behind.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span>Question {current + 1} of {TOTAL_QUESTIONS}</span>
            <span>{Math.round(((current + 1) / TOTAL_QUESTIONS) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((current + 1) / TOTAL_QUESTIONS) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-gray-900 rounded-lg p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
          
          <div className="space-y-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  selectedAnswer === idx 
                    ? 'bg-purple-600 border-purple-400 text-white' 
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

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link
            href={`/chamber/${archetype}/breaker/the-path/field-proof/choose-path`}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Choose Path
          </Link>
        </div>
      </div>
    </div>
  )
} 