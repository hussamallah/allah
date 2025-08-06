'use client'

import { useState, useMemo, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { DiagnosisBlock } from '@/components/quiz/DiagnosisBlock'
import { ProgressBar } from '@/components/quiz/ProgressBar'
import { scoreQuiz } from '@/lib/quizScoring'
import { getArchetype } from '@/lib/archetypes'
import { getGuardianTestResult } from '@/lib/guardianStageTestUtils'
import GuardianTestResults from '@/components/GuardianTestResults'

const TOTAL_QUESTIONS = 25

// Archetype-specific feedback phrases
const ARCHETYPE_FEEDBACK = {
  guardian: [
    "Your field is steadier.",
    "Another stone added.",
    "The wall grows stronger.",
    "Your shield holds true.",
    "Law takes root.",
    "The gate stands firm.",
    "Your anchor deepens.",
    "The fortress rises.",
    "Guardian truth revealed.",
    "Your circle expands."
  ],
  spotlight: [
    "Your light grows brighter.",
    "The stage awaits your truth.",
    "Your voice carries further.",
    "The spotlight finds you.",
    "Your presence expands.",
    "The audience sees you.",
    "Your radiance increases.",
    "The beacon grows stronger.",
    "Spotlight truth revealed.",
    "Your projection deepens."
  ],
  partner: [
    "Your bridge grows stronger.",
    "Connection deepens.",
    "Your harmony expands.",
    "The bond strengthens.",
    "Your mediation improves.",
    "The bridge holds true.",
    "Your connection deepens.",
    "The living bridge grows.",
    "Partner truth revealed.",
    "Your circle expands."
  ],
  equalizer: [
    "Your balance improves.",
    "The scale finds equilibrium.",
    "Your justice deepens.",
    "The balance holds true.",
    "Your harmony expands.",
    "The scale grows stronger.",
    "Your equilibrium deepens.",
    "The balance strengthens.",
    "Equalizer truth revealed.",
    "Your justice expands."
  ],
  rebel: [
    "Your rebellion grows stronger.",
    "The disruption deepens.",
    "Your resistance expands.",
    "The revolution holds true.",
    "Your liberation grows.",
    "The defiance strengthens.",
    "Your rebellion deepens.",
    "The disruption expands.",
    "Rebel truth revealed.",
    "Your resistance grows."
  ],
  visionary: [
    "Your vision grows clearer.",
    "The future becomes present.",
    "Your creation expands.",
    "The manifestation holds true.",
    "Your imagination grows.",
    "The dream strengthens.",
    "Your vision deepens.",
    "The future expands.",
    "Visionary truth revealed.",
    "Your creation grows."
  ],
  wanderer: [
    "Your journey deepens.",
    "The path becomes clear.",
    "Your exploration expands.",
    "The adventure holds true.",
    "Your discovery grows.",
    "The wandering strengthens.",
    "Your journey expands.",
    "The path deepens.",
    "Wanderer truth revealed.",
    "Your exploration grows."
  ],
  vessel: [
    "Your vessel grows stronger.",
    "The bridge deepens.",
    "Your service expands.",
    "The channel holds true.",
    "Your connection grows.",
    "The vessel strengthens.",
    "Your service deepens.",
    "The bridge expands.",
    "Vessel truth revealed.",
    "Your connection grows."
  ],
  mask: [
    "Your mask grows clearer.",
    "The veil becomes transparent.",
    "Your adaptation expands.",
    "The mirror holds true.",
    "Your authenticity grows.",
    "The mask strengthens.",
    "Your adaptation deepens.",
    "The veil expands.",
    "Mask truth revealed.",
    "Your authenticity grows."
  ],
  provider: [
    "Your source grows stronger.",
    "The fountain deepens.",
    "Your giving expands.",
    "The provider holds true.",
    "Your abundance grows.",
    "The source strengthens.",
    "Your giving deepens.",
    "The fountain expands.",
    "Provider truth revealed.",
    "Your abundance grows."
  ],
  sovereign: [
    "Your crown grows stronger.",
    "The throne deepens.",
    "Your authority expands.",
    "The sovereign holds true.",
    "Your power grows.",
    "The crown strengthens.",
    "Your authority deepens.",
    "The throne expands.",
    "Sovereign truth revealed.",
    "Your power grows."
  ],
  testStageSeeker: [
    "Your seeking grows clearer.",
    "The finding deepens.",
    "Your discovery expands.",
    "The test stage seeker holds true.",
    "Your answers grow.",
    "The seeking strengthens.",
    "Your discovery deepens.",
    "The finding expands.",
    "Test Stage Seeker truth revealed.",
    "Your answers grow."
  ]
}

// Archetype-specific whispers
const ARCHETYPE_WHISPERS = {
  guardian: [
    "Every answer reveals your fortress.",
    "Each choice builds your wall.",
    "Your shield grows with truth.",
    "The gate opens to the honest.",
    "Law demands real answers.",
    "Your field tests your strength.",
    "The guardian within speaks.",
    "Truth fortifies your position.",
    "Your circle knows your heart.",
    "The anchor holds what you choose."
  ],
  spotlight: [
    "Every answer reveals your light.",
    "Each choice amplifies your voice.",
    "Your spotlight grows with truth.",
    "The stage opens to the authentic.",
    "Projection demands real answers.",
    "Your beacon tests your strength.",
    "The spotlight within speaks.",
    "Truth illuminates your position.",
    "Your audience knows your heart.",
    "The beacon holds what you choose."
  ],
  partner: [
    "Every answer reveals your bridge.",
    "Each choice strengthens your connection.",
    "Your harmony grows with truth.",
    "The bridge opens to the authentic.",
    "Connection demands real answers.",
    "Your bond tests your strength.",
    "The partner within speaks.",
    "Truth strengthens your position.",
    "Your circle knows your heart.",
    "The bridge holds what you choose."
  ],
  equalizer: [
    "Every answer reveals your scale.",
    "Each choice balances your justice.",
    "Your equilibrium grows with truth.",
    "The scale opens to the authentic.",
    "Balance demands real answers.",
    "Your justice tests your strength.",
    "The equalizer within speaks.",
    "Truth balances your position.",
    "Your scale knows your heart.",
    "The balance holds what you choose."
  ],
  rebel: [
    "Every answer reveals your rebellion.",
    "Each choice strengthens your resistance.",
    "Your disruption grows with truth.",
    "The revolution opens to the authentic.",
    "Rebellion demands real answers.",
    "Your defiance tests your strength.",
    "The rebel within speaks.",
    "Truth fuels your position.",
    "Your resistance knows your heart.",
    "The rebellion holds what you choose."
  ],
  visionary: [
    "Every answer reveals your vision.",
    "Each choice manifests your future.",
    "Your creation grows with truth.",
    "The dream opens to the authentic.",
    "Vision demands real answers.",
    "Your imagination tests your strength.",
    "The visionary within speaks.",
    "Truth illuminates your position.",
    "Your future knows your heart.",
    "The vision holds what you choose."
  ],
  wanderer: [
    "Every answer reveals your journey.",
    "Each choice deepens your path.",
    "Your exploration grows with truth.",
    "The adventure opens to the authentic.",
    "Wandering demands real answers.",
    "Your discovery tests your strength.",
    "The wanderer within speaks.",
    "Truth guides your position.",
    "Your path knows your heart.",
    "The journey holds what you choose."
  ],
  vessel: [
    "Every answer reveals your vessel.",
    "Each choice strengthens your bridge.",
    "Your service grows with truth.",
    "The channel opens to the authentic.",
    "Vessel demands real answers.",
    "Your connection tests your strength.",
    "The vessel within speaks.",
    "Truth flows through your position.",
    "Your bridge knows your heart.",
    "The vessel holds what you choose."
  ],
  mask: [
    "Every answer reveals your mask.",
    "Each choice clarifies your veil.",
    "Your adaptation grows with truth.",
    "The mirror opens to the authentic.",
    "Mask demands real answers.",
    "Your authenticity tests your strength.",
    "The mask within speaks.",
    "Truth reflects your position.",
    "Your veil knows your heart.",
    "The mask holds what you choose."
  ],
  provider: [
    "Every answer reveals your source.",
    "Each choice deepens your fountain.",
    "Your giving grows with truth.",
    "The provider opens to the authentic.",
    "Provider demands real answers.",
    "Your abundance tests your strength.",
    "The provider within speaks.",
    "Truth flows from your position.",
    "Your source knows your heart.",
    "The provider holds what you choose."
  ],
  sovereign: [
    "Every answer reveals your crown.",
    "Each choice strengthens your throne.",
    "Your authority grows with truth.",
    "The sovereign opens to the authentic.",
    "Sovereign demands real answers.",
    "Your power tests your strength.",
    "The sovereign within speaks.",
    "Truth rules from your position.",
    "Your crown knows your heart.",
    "The sovereign holds what you choose."
  ],
  testStageSeeker: [
    "Every answer reveals your seeking.",
    "Each choice deepens your finding.",
    "Your discovery grows with truth.",
    "The test stage seeker opens to the authentic.",
    "Test Stage Seeker demands real answers.",
    "Your answers test your strength.",
    "The test stage seeker within speaks.",
    "Truth finds from your position.",
    "Your seeking knows your heart.",
    "The test stage seeker holds what you choose."
  ]
}

// Archetype-specific colors and themes
const ARCHETYPE_THEMES = {
  guardian: {
    primary: "yellow",
    primaryColor: "#f59e0b",
    accentColor: "#fbbf24",
    bgGradient: "from-gray-900 via-yellow-900/20 to-yellow-600/10",
    borderColor: "border-yellow-500/20",
    textColor: "text-yellow-400",
    buttonColor: "bg-yellow-600 hover:bg-yellow-500",
    icon: "🛡️"
  },
  spotlight: {
    primary: "amber",
    primaryColor: "#f59e0b",
    accentColor: "#fbbf24",
    bgGradient: "from-gray-900 via-amber-900/30 to-amber-600/20",
    borderColor: "border-amber-500/20",
    textColor: "text-amber-400",
    buttonColor: "bg-amber-600 hover:bg-amber-500",
    icon: "✨"
  },
  partner: {
    primary: "rose",
    primaryColor: "#e11d48",
    accentColor: "#ec4899",
    bgGradient: "from-gray-900 via-rose-900/30 to-rose-600/20",
    borderColor: "border-rose-500/20",
    textColor: "text-rose-400",
    buttonColor: "bg-rose-600 hover:bg-rose-500",
    icon: "💝"
  },
  equalizer: {
    primary: "emerald",
    primaryColor: "#059669",
    accentColor: "#10b981",
    bgGradient: "from-gray-900 via-emerald-900/30 to-emerald-600/20",
    borderColor: "border-emerald-500/20",
    textColor: "text-emerald-400",
    buttonColor: "bg-emerald-600 hover:bg-emerald-500",
    icon: "⚖️"
  },
  rebel: {
    primary: "red",
    primaryColor: "#dc2626",
    accentColor: "#ef4444",
    bgGradient: "from-gray-900 via-red-900/30 to-red-600/20",
    borderColor: "border-red-500/20",
    textColor: "text-red-400",
    buttonColor: "bg-red-600 hover:bg-red-500",
    icon: "🔥"
  },
  visionary: {
    primary: "indigo",
    primaryColor: "#4338ca",
    accentColor: "#6366f1",
    bgGradient: "from-gray-900 via-indigo-900/30 to-indigo-600/20",
    borderColor: "border-indigo-500/20",
    textColor: "text-indigo-400",
    buttonColor: "bg-indigo-600 hover:bg-indigo-500",
    icon: "🔮"
  },
  wanderer: {
    primary: "cyan",
    primaryColor: "#0891b2",
    accentColor: "#06b6d4",
    bgGradient: "from-gray-900 via-cyan-900/30 to-cyan-600/20",
    borderColor: "border-cyan-500/20",
    textColor: "text-cyan-400",
    buttonColor: "bg-cyan-600 hover:bg-cyan-500",
    icon: "🧭"
  },
  vessel: {
    primary: "emerald",
    primaryColor: "#059669",
    accentColor: "#10b981",
    bgGradient: "from-gray-900 via-emerald-900/30 to-emerald-600/20",
    borderColor: "border-emerald-500/20",
    textColor: "text-emerald-400",
    buttonColor: "bg-emerald-600 hover:bg-emerald-500",
    icon: "🌉"
  },
  mask: {
    primary: "gray",
    primaryColor: "#6b7280",
    accentColor: "#9ca3af",
    bgGradient: "from-gray-900 via-gray-800/30 to-gray-600/20",
    borderColor: "border-gray-500/20",
    textColor: "text-gray-400",
    buttonColor: "bg-gray-600 hover:bg-gray-500",
    icon: "🎭"
  },
  provider: {
    primary: "emerald",
    primaryColor: "#059669",
    accentColor: "#10b981",
    bgGradient: "from-gray-900 via-emerald-900/30 to-emerald-600/20",
    borderColor: "border-emerald-500/20",
    textColor: "text-emerald-400",
    buttonColor: "bg-emerald-600 hover:bg-emerald-500",
    icon: "💧"
  },
  sovereign: {
    primary: "purple",
    primaryColor: "#7c3aed",
    accentColor: "#a855f7",
    bgGradient: "from-gray-900 via-purple-900/30 to-purple-600/20",
    borderColor: "border-purple-500/20",
    textColor: "text-purple-400",
    buttonColor: "bg-purple-600 hover:bg-purple-500",
    icon: "👑"
  },
  testStageSeeker: {
    primary: "blue",
    primaryColor: "#1e40af",
    accentColor: "#3b82f6",
    bgGradient: "from-gray-900 via-blue-900/30 to-blue-600/20",
    borderColor: "border-blue-500/20",
    textColor: "text-blue-400",
    buttonColor: "bg-blue-600 hover:bg-blue-500",
    icon: "🔍"
  }
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function ArchetypeStageTestPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const archetypeKey = params.archetype as string
  const archetype = getArchetype(archetypeKey)
  const dominantParam = searchParams.get('dominant')
  const maskParam = searchParams.get('mask')

  // Get archetype-specific theme
  const theme = ARCHETYPE_THEMES[archetypeKey as keyof typeof ARCHETYPE_THEMES] || ARCHETYPE_THEMES.guardian
  const feedback = ARCHETYPE_FEEDBACK[archetypeKey as keyof typeof ARCHETYPE_FEEDBACK] || ARCHETYPE_FEEDBACK.guardian
  const whispers = ARCHETYPE_WHISPERS[archetypeKey as keyof typeof ARCHETYPE_WHISPERS] || ARCHETYPE_WHISPERS.guardian

  // Archetype-specific states
  const [showEntryOverlay, setShowEntryOverlay] = useState(true)
  const [showMilestoneRitual, setShowMilestoneRitual] = useState(false)
  const [showProgressRitual, setShowProgressRitual] = useState(false)
  const [showFatigueOverlay, setShowFatigueOverlay] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [feedbackText, setFeedbackText] = useState<string>('')
  const [lastActivity, setLastActivity] = useState(Date.now())

  if (!archetype) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Archetype Not Found</h1>
          <p className="text-gray-300">The archetype "{archetypeKey}" does not exist.</p>
        </div>
      </div>
    )
  }

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

  // Check if we should show a specific result from URL params
  useEffect(() => {
    if (dominantParam && maskParam && archetypeKey === 'guardian') {
      setShowResult(true)
    }
  }, [dominantParam, maskParam, archetypeKey])

  // Activity tracking for fatigue overlay
  useEffect(() => {
    const checkActivity = setInterval(() => {
      if (Date.now() - lastActivity > 60000 && !showEntryOverlay && !showResult) {
        setShowFatigueOverlay(true)
      }
    }, 1000)

    return () => clearInterval(checkActivity)
  }, [lastActivity, showEntryOverlay, showResult])

  const updateActivity = () => {
    setLastActivity(Date.now())
  }

  const handleAnswer = (questionId: string, optionIdx: number) => {
    updateActivity()
    setSelectedAnswer(optionIdx)
    
    // Show feedback
    const randomFeedback = feedback[Math.floor(Math.random() * feedback.length)]
    setFeedbackText(randomFeedback)
    
    // Check for milestone rituals
    const nextQuestion = current + 1
    if (nextQuestion === 5 || nextQuestion === 15 || nextQuestion === 20) {
      setShowMilestoneRitual(true)
      return
    }
    
    // Check for progress ritual
    if (nextQuestion === 12) {
      setShowProgressRitual(true)
      return
    }
    
    // Normal progression
    setTimeout(() => {
      const selectedValue = shuffledQuestions[current].options[optionIdx].value
      setAnswers(prev => ({ ...prev, [questionId]: selectedValue }))
      setSelectedAnswer(null)
      setFeedbackText('')
      
      if (current < TOTAL_QUESTIONS - 1) {
        setCurrent(current + 1)
      } else {
        setShowResult(true)
      }
    }, 2000)
  }

  const advanceQuestion = () => {
    if (selectedAnswer !== null) {
      const q = shuffledQuestions[current]
      const selectedValue = q.options[selectedAnswer].value
      setAnswers(prev => ({ ...prev, [q.id]: selectedValue }))
      setSelectedAnswer(null)
      setFeedbackText('')
      setShowMilestoneRitual(false)
      setShowProgressRitual(false)
      
      if (current < TOTAL_QUESTIONS - 1) {
        setCurrent(current + 1)
      } else {
        setShowResult(true)
      }
    }
  }

  if (showResult) {
    let result;
    
    // If URL params are provided for Guardian, use those instead of calculating from answers
    if (dominantParam && maskParam && archetype.key === 'guardian') {
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
      result = scoreQuiz(answers, archetype)
    }
    
    // Use improved GuardianTestResults component for Guardian archetype
    if (archetype.key === 'guardian') {
      return (
        <GuardianTestResults
          dominantStage={result.dominantStage}
          maskStage={result.maskStage}
          stageScores={result.stageScores}
          onRetakeTest={() => {
            setCurrent(0)
            setAnswers({})
            setShowResult(false)
            setShowEntryOverlay(true)
          }}
        />
      )
    }
    
    // Handle other archetypes with original structure
    let diagnosis;
    if (archetype.key === 'guardian') {
      // Get the guardian test result
      const guardianResult = getGuardianTestResult(result.dominantStage, result.maskStage);
      
      if (guardianResult) {
        // Transform guardian result to match DiagnosisBlock expected format
        diagnosis = {
          title: guardianResult.title,
          diagnosis: guardianResult.diagnosis,
          detailedContent: guardianResult.detailedContent,
          explanation: {
            currentState: guardianResult.currentState,
            mask: guardianResult.mask,
            directive: guardianResult.coreIssue,
            translation: guardianResult.trueNeed
          }
        };
      } else {
        // Fallback if no result found - use capitalized stage names
        const dominantDisplay = result.dominantStage.toUpperCase();
        const maskDisplay = result.maskStage.toUpperCase();
        diagnosis = {
          title: `${dominantDisplay} | ${maskDisplay}`,
          diagnosis: "Diagnosis not found.",
          detailedContent: "No detailed content available for this combination.",
          explanation: {
            currentState: "Unknown",
            mask: "Unknown",
            directive: "Unknown",
            translation: "Unknown"
          }
        };
      }
    } else {
      // Use original structure for other archetypes
      diagnosis = archetype.diagnosis[result.dominantStage][result.maskStage]
    }
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <div className="max-w-4xl mx-auto p-6 relative z-10">
          <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">Your {archetype.name} Node Diagnosis</h1>
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
        </div>
      </div>
    )
  }

  // Entry Overlay
  if (showEntryOverlay) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgGradient}`}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className={`w-32 h-32 border-2 ${theme.borderColor} rounded-full animate-pulse`}></div>
            <div className={`w-24 h-24 border-2 ${theme.borderColor} rounded-full animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`} style={{animationDelay: '0.5s'}}></div>
            <div className={`w-16 h-16 border-2 ${theme.borderColor} rounded-full animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`} style={{animationDelay: '1s'}}></div>
          </div>
        </div>
        
        <div className="text-center text-white relative z-10 max-w-2xl mx-auto p-8">
          <div className="mb-8">
            <div className="text-6xl mb-4">{theme.icon}</div>
            <h1 className="text-4xl font-bold mb-4 text-yellow-400">{archetype.name.toUpperCase()} NODE Stage/Masks Diagnostic Quiz</h1>
          </div>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {archetype.description}
          </p>
          
          <div className="mb-8 text-left bg-gray-900/50 p-6 rounded-lg border border-yellow-500/20">
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">IN CLEAR LANGUAGE EACH STAGE IS:</h3>
            <div className="space-y-2 text-sm text-gray-300">
              {archetype.stages.map((stage, index) => (
                <p key={stage.key}>
                  <strong>{stage.label.toUpperCase()}:</strong> {stage.description}
                </p>
              ))}
            </div>
          </div>
          
          <button
            onClick={() => setShowEntryOverlay(false)}
            className={`px-8 py-4 ${theme.buttonColor} text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg relative overflow-hidden`}
            style={{
              boxShadow: `0 0 30px ${theme.primaryColor}50`
            }}
          >
            <span className="relative z-10">Step Inside the {archetype.name} Path</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    )
  }

  // Milestone Ritual Overlay
  if (showMilestoneRitual) {
    const milestoneText = current + 1 === 5 ? `The ${archetype.name} Grows Stronger` : 
                         current + 1 === 15 ? `The ${archetype.name} Stands Firm` : 
                         `The ${archetype.name} Deepens`
    
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgGradient}`}></div>
        
        <div className="text-center text-white relative z-10 max-w-2xl mx-auto p-8">
          <div className="mb-8">
            <div className="text-6xl mb-4 animate-pulse">{theme.icon}</div>
            <h1 className="text-3xl font-bold mb-4 text-yellow-400">{milestoneText}</h1>
          </div>
          
          <p className="text-lg text-gray-300 mb-8">
            Do not retreat. Your {archetype.name.toLowerCase()} is only as true as your answer.
          </p>
          
          <button
            onClick={advanceQuestion}
            className={`px-6 py-3 ${theme.buttonColor} text-black font-bold rounded-lg transition-all duration-300`}
          >
            Continue
          </button>
        </div>
      </div>
    )
  }

  // Progress Ritual Overlay
  if (showProgressRitual) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgGradient}`}></div>
        
        <div className="text-center text-white relative z-10 max-w-2xl mx-auto p-8">
          <div className="mb-8">
            <div className="text-6xl mb-4 animate-pulse">{theme.icon}</div>
            <h1 className="text-3xl font-bold mb-4 text-yellow-400">Halfway</h1>
          </div>
          
          <p className="text-lg text-gray-300 mb-8">
            The real {archetype.name} faces their own shadow. Finish to unlock your hidden truth.
          </p>
          
          <button
            onClick={advanceQuestion}
            className={`px-6 py-3 ${theme.buttonColor} text-black font-bold rounded-lg transition-all duration-300`}
          >
            Continue the {archetype.name} Path
          </button>
        </div>
      </div>
    )
  }

  // Fatigue Overlay
  if (showFatigueOverlay) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-900/20 to-red-600/10"></div>
        
        <div className="text-center text-white relative z-10 max-w-2xl mx-auto p-8">
          <div className="mb-8">
            <div className="text-6xl mb-4">⏰</div>
            <h1 className="text-3xl font-bold mb-4 text-red-400">The World Waits</h1>
          </div>
          
          <p className="text-lg text-gray-300 mb-8">
            The world waits for no {archetype.name}. Finish your path.
          </p>
          
          <button
            onClick={() => {
              setShowFatigueOverlay(false)
              updateActivity()
            }}
            className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 transition-all duration-300"
          >
            Return to Test
          </button>
        </div>
      </div>
    )
  }

  const q = shuffledQuestions[current]
  const currentStage = archetype.stages.find(s => s.key === q.stageKey)

  return (
    <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden">
      {/* Background with subtle archetype theme */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgGradient}`}></div>
      </div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Archetype Glyph and Progress Circle */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="text-4xl mb-2">{theme.icon}</div>
            <div className={`w-24 h-24 border-2 ${theme.borderColor} rounded-full relative`}>
              <div 
                className={`absolute inset-2 border-2 ${theme.borderColor} rounded-full transition-all duration-1000`}
                style={{ 
                  clipPath: `polygon(0 0, ${((current + 1) / TOTAL_QUESTIONS) * 100}% 0, ${((current + 1) / TOTAL_QUESTIONS) * 100}% 100%, 0 100%)`
                }}
              ></div>
              <div className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${theme.textColor}`}>
                {current + 1}/{TOTAL_QUESTIONS}
              </div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className={`bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 mb-8 border ${theme.borderColor} shadow-2xl`}>
          <h2 className="text-2xl font-bold mb-8 text-center text-yellow-400 leading-relaxed">
            {q.text}
          </h2>
          
          <div className="space-y-4">
            {q.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(q.id, idx)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-6 rounded-full border-2 transition-all duration-300 text-lg ${
                  selectedAnswer === idx
                    ? `${theme.buttonColor} border-yellow-400 text-black shadow-lg scale-105`
                    : selectedAnswer !== null
                    ? 'bg-gray-800 border-gray-600 text-gray-500 opacity-50'
                    : 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700 hover:border-yellow-500/50 hover:scale-105'
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        {/* Archetype Whisper */}
        <div className="text-center mb-6">
          <p className={`${theme.textColor}/80 text-sm italic`}>
            {whispers[current % whispers.length]}
          </p>
        </div>

        {/* Feedback */}
        {feedbackText && (
          <div className="text-center mb-6">
            <p className={`${theme.textColor} font-semibold animate-pulse`}>
              {feedbackText}
            </p>
          </div>
        )}

        {/* Advance Button */}
        {selectedAnswer !== null && (
          <div className="text-center">
            <button
              onClick={advanceQuestion}
              className={`px-8 py-4 ${theme.buttonColor} text-black font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg`}
              style={{
                boxShadow: `0 0 20px ${theme.primaryColor}50`
              }}
            >
              Advance the {archetype.name} Path
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 