'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  generateAIAnalysis, 
  generateRitual, 
  generateFieldWhisper, 
  generatePDFContent, 
  generateBadgeData, 
  saveFractureReport, 
  downloadPDF, 
  downloadBadge,
  type FractureAnswer,
  type FractureReport
} from '@/lib/fractureUtils'

// Seeker-specific fracture questions
const seekerFractureQuestions = [
  {
    id: 1,
    question: "What truth have you stopped looking for because it hurt too much?",
    prompt: "Sometimes the most important truths are the ones we dodge. Name the one you buried."
  },
  {
    id: 2,
    question: "What loop do you keep reliving, even when you know it's a trap?",
    prompt: "Describe the pattern you can't seem to break—no matter how aware you are."
  },
  {
    id: 3,
    question: "What place or person do you keep moving away from without real closure?",
    prompt: "Where have you left things undone, hoping distance would solve it?"
  },
  {
    id: 4,
    question: "What is the most honest thing you've never said out loud—even to yourself?",
    prompt: "Say it now. No filter."
  },
  {
    id: 5,
    question: "What future version of you scares you too much to build?",
    prompt: "Who could you become if you stopped running?"
  },
  {
    id: 6,
    question: "When did you last give from emptiness—hoping it would make you feel full?",
    prompt: "Describe the moment. What did you hope would happen?"
  },
  {
    id: 7,
    question: "What role have you played so well that it became your identity?",
    prompt: "Which mask is now your real face?"
  }
]

export default function FractureFlowPage() {
  const params = useParams()
  const router = useRouter()
  const archetype = params.archetype as string
  
  const [currentStep, setCurrentStep] = useState(0) // 0 = welcome, 1-7 = questions, 8 = review
  const [answers, setAnswers] = useState<string[]>(Array(7).fill(''))
  const [showFeedback, setShowFeedback] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [fractureReport, setFractureReport] = useState<FractureReport | null>(null)

  // Seeker-specific configuration
  const config = {
    primaryColor: '#4c1d95',
    secondaryColor: '#7c3aed',
    accentColor: '#a855f7',
    glowColor: 'rgba(124, 58, 237, 0.5)',
    powerColor: 'rgba(124, 58, 237, 0.3)'
  }

  const handleAnswerSubmit = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentStep - 1] = answer
    setAnswers(newAnswers)
    
    // Show feedback
    setShowFeedback(true)
    
    setTimeout(() => {
      setShowFeedback(false)
      if (currentStep < 7) {
        setCurrentStep(currentStep + 1)
      } else {
        // Generate fracture report when completing all questions
        generateFractureReport(newAnswers)
        setCurrentStep(8) // Move to review
      }
    }, 2000)
  }

  const generateFractureReport = async (finalAnswers: string[]) => {
    setIsLoading(true)
    
    try {
      // Create fracture answers
      const fractureAnswers: FractureAnswer[] = seekerFractureQuestions.map((q, index) => ({
        id: q.id,
        question: q.question,
        answer: finalAnswers[index],
        prompt: q.prompt
      }))
      
      // Generate report components
      const aiAnalysis = generateAIAnalysis(fractureAnswers)
      const ritual = generateRitual(fractureAnswers)
      const fieldWhisper = generateFieldWhisper()
      
      // Create complete report
      const report: FractureReport = {
        answers: fractureAnswers,
        aiAnalysis,
        ritual,
        fieldWhisper,
        timestamp: new Date().toISOString(),
        archetype
      }
      
      // Save report
      await saveFractureReport(report)
      setFractureReport(report)
    } catch (error) {
      console.error('Error generating fracture report:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNext = () => {
    if (answers[currentStep - 1].trim()) {
      handleAnswerSubmit(answers[currentStep - 1])
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Welcome overlay
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Lock cracking animation */}
          <div className="mb-8">
            <div className="text-6xl mb-4 animate-pulse">🔓</div>
            <div className="text-2xl font-bold mb-2" style={{ color: config.primaryColor }}>
              Payment received. You're now inside the Fracture Zone.
            </div>
          </div>
          
          <button
            onClick={() => setCurrentStep(1)}
            className="group relative inline-block px-12 py-6 rounded-2xl font-bold text-white transition-all duration-500 hover:scale-105 transform"
            style={{
              background: `linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%)`,
              boxShadow: `0 0 40px ${config.glowColor}`
            }}
          >
            <span className="relative z-10 text-xl">Begin My 7 Fractures</span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 from-purple-600 to-violet-600"></div>
          </button>
        </div>
      </div>
    )
  }

  // Question flow (steps 1-7)
  if (currentStep >= 1 && currentStep <= 7) {
    const question = seekerFractureQuestions[currentStep - 1]
    
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto w-full">
          {/* Progress indicator */}
          <div className="text-center mb-8">
            <div className="text-sm text-gray-400 mb-2">Card {currentStep} of 7</div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${(currentStep / 7) * 100}%`,
                  background: `linear-gradient(90deg, ${config.primaryColor}, ${config.secondaryColor})`
                }}
              ></div>
            </div>
          </div>

          {/* Question card */}
          <div className="backdrop-blur-md border-2 rounded-2xl p-8 mb-8"
               style={{ 
                 background: `linear-gradient(135deg, ${config.primaryColor}20, ${config.secondaryColor}20)`,
                 borderColor: `${config.primaryColor}50`,
                 boxShadow: `0 0 30px ${config.primaryColor}30`
               }}>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold" style={{ color: config.primaryColor }}>
                {question.question}
              </h2>
              <p className="text-gray-300 text-lg">
                {question.prompt}
              </p>
              
              <textarea
                value={answers[currentStep - 1]}
                onChange={(e) => {
                  const newAnswers = [...answers]
                  newAnswers[currentStep - 1] = e.target.value
                  setAnswers(newAnswers)
                }}
                placeholder="Type your answer here..."
                className="w-full h-32 p-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                style={{ borderColor: `${config.primaryColor}50` }}
              />
              
              <div className="flex justify-between items-center">
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    ← Previous
                  </button>
                )}
                
                <button
                  onClick={handleNext}
                  disabled={!answers[currentStep - 1].trim()}
                  className="group relative inline-block px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: `linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%)`,
                    boxShadow: `0 0 20px ${config.glowColor}`
                  }}
                >
                  {currentStep === 7 ? 'Complete Fractures' : 'Next Fracture'}
                </button>
              </div>
            </div>
          </div>

          {/* Feedback banner */}
          {showFeedback && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
              <div className="backdrop-blur-md border rounded-xl p-4 animate-slide-up"
                   style={{ 
                     background: `${config.primaryColor}20`,
                     borderColor: `${config.primaryColor}50`
                   }}>
                <p className="text-white font-semibold">Fracture seen. The Field remembers.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Review screen (step 8)
  if (currentStep === 8) {
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4" style={{ color: config.primaryColor }}>
              Review Your Fracture Journey
            </h1>
            <p className="text-xl text-gray-300">
              Your answers reveal the patterns that have been running your life.
            </p>
          </div>

          {isLoading && (
            <div className="text-center mb-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-4"></div>
              <p className="text-gray-300">Generating your fracture report...</p>
            </div>
          )}

          {/* Section 2: AI Loop Scan */}
          <div className="backdrop-blur-md border-2 rounded-2xl p-8 mb-8"
               style={{ 
                 background: `linear-gradient(135deg, ${config.secondaryColor}20, ${config.primaryColor}20)`,
                 borderColor: `${config.secondaryColor}50`,
                 boxShadow: `0 0 30px ${config.secondaryColor}30`
               }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: config.secondaryColor }}>
              AI Loop Scan (Diagnosis)
            </h2>
            <div className="text-lg text-gray-200 italic">
              {fractureReport ? `"${fractureReport.aiAnalysis}"` : "Generating your analysis..."}
            </div>
          </div>

          {/* Section 4: Ritual Card */}
          <div className="backdrop-blur-md border-2 rounded-2xl p-8 mb-8"
               style={{ 
                 background: `linear-gradient(135deg, ${config.secondaryColor}20, ${config.primaryColor}20)`,
                 borderColor: `${config.secondaryColor}50`,
                 boxShadow: `0 0 30px ${config.secondaryColor}30`
               }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: config.secondaryColor }}>
              Edge Ritual
            </h2>
            <div className="text-lg text-gray-200">
              {fractureReport ? `"${fractureReport.ritual}"` : "Generating your ritual..."}
            </div>
          </div>

          {/* Section 5: Badge Unlock */}
          <div className="backdrop-blur-md border-2 rounded-2xl p-8 mb-8"
               style={{ 
                 background: `linear-gradient(135deg, ${config.primaryColor}20, ${config.secondaryColor}20)`,
                 borderColor: `${config.primaryColor}50`,
                 boxShadow: `0 0 30px ${config.primaryColor}30`
               }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: config.primaryColor }}>
              Badge Unlock
            </h2>
            <button
              onClick={() => {
                const badgeData = generateBadgeData(archetype)
                downloadBadge(badgeData)
              }}
              className="group relative inline-block px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%)`,
                boxShadow: `0 0 20px ${config.glowColor}`
              }}
            >
              Download Seeker Badge
            </button>
            <p className="text-sm text-gray-400 mt-2">
              Visual badge with "Fracture Gate: Completed" – unique to you.
            </p>
          </div>

          {/* Section 6: Field Whisper */}
          <div className="backdrop-blur-md border-2 rounded-2xl p-8 mb-8"
               style={{ 
                 background: `linear-gradient(135deg, ${config.secondaryColor}20, ${config.primaryColor}20)`,
                 borderColor: `${config.secondaryColor}50`,
                 boxShadow: `0 0 30px ${config.secondaryColor}30`
               }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: config.secondaryColor }}>
              Field Whisper
            </h2>
            <div className="text-lg text-gray-200 italic">
              {fractureReport ? `"${fractureReport.fieldWhisper}"` : "Generating your whisper..."}
            </div>
          </div>

          {/* Section 7: What's Next */}
          <div className="backdrop-blur-md border-2 rounded-2xl p-8 mb-8"
               style={{ 
                 background: `linear-gradient(135deg, ${config.primaryColor}20, ${config.secondaryColor}20)`,
                 borderColor: `${config.primaryColor}50`,
                 boxShadow: `0 0 30px ${config.primaryColor}30`
               }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: config.primaryColor }}>
              What's Next?
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-200">
                Want to break the cycle for good? Unlock the Breaker's Rite for exclusive access in the next 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    // Upgrade logic would go here
                    alert('Upgrade to Breaker\'s Rite would be processed here')
                  }}
                  className="group relative inline-block px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%)`,
                    boxShadow: `0 0 20px ${config.glowColor}`
                  }}
                >
                  Upgrade to Breaker's Rite
                </button>
                <Link
                  href={`/chamber/${archetype}`}
                  className="group relative inline-block px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 text-center"
                  style={{
                    background: `linear-gradient(135deg, ${config.secondaryColor} 0%, ${config.primaryColor} 100%)`,
                    boxShadow: `0 0 20px ${config.secondaryColor}50`
                  }}
                >
                  Return to My Chamber
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
} 