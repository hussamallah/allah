'use client'

import { useState, useEffect } from 'react'

export default function ControlTriggerExperience() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Auto-advance through the experience
    const timer = setTimeout(() => {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
      }
    }, 8000) // 8 seconds per step

    return () => clearTimeout(timer)
  }, [currentStep])

  useEffect(() => {
    // Show content after initial delay
    const timer = setTimeout(() => setShowContent(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const steps = [
    {
      title: "The Need for Control",
      content: "You've learned that the world is unpredictable. Every decision feels like a gamble, every outcome uncertain. You've built walls of control to protect yourself from chaos.",
      color: "from-red-900 to-red-700",
      icon: "🛡️"
    },
    {
      title: "The Cost of Control",
      content: "But control is exhausting. It isolates you. It prevents genuine connection. You're so busy managing everything that you've forgotten how to simply be.",
      color: "from-orange-900 to-orange-700", 
      icon: "⚖️"
    },
    {
      title: "The Truth About Control",
      content: "Real power doesn't come from controlling everything. It comes from trusting yourself to handle whatever happens. The strongest people are those who can let go.",
      color: "from-green-900 to-green-700",
      icon: "🌱"
    },
    {
      title: "Your New Path",
      content: "It's time to release the grip. Start small. Let one thing be uncertain today. Notice how you survive. Notice how you grow stronger.",
      color: "from-blue-900 to-blue-700",
      icon: "🕊️"
    }
  ]

  if (!showContent) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto mb-8"></div>
          <p className="text-red-400 text-xl">Preparing your personalized experience...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with current step color */}
      <div className={`absolute inset-0 bg-gradient-to-br ${steps[currentStep].color} transition-all duration-2000`} />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Progress indicator */}
          <div className="mb-12">
            <div className="flex justify-center space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    index <= currentStep ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Current step content */}
          <div className="animate-fade-in">
            <div className="text-8xl mb-8 animate-bounce">
              {steps[currentStep].icon}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
              {steps[currentStep].title}
            </h1>
            
            <p className="text-2xl md:text-3xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              {steps[currentStep].content}
            </p>
          </div>

          {/* Step counter */}
          <div className="mt-12 text-white/60 text-lg">
            {currentStep + 1} of {steps.length}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  )
} 