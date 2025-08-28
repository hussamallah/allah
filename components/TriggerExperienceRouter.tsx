'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

// Import all trigger experiences
import ControlTriggerExperience from '../app/chamber/[archetype]/who-you-are/trigger-experiences/Control'
// Import other trigger experiences as needed

interface TriggerExperienceRouterProps {
  trigger: string
  archetype: string
}

const triggerExperiences = {
  Control: ControlTriggerExperience,
  Rejection: () => <div>Rejection Experience</div>, // Placeholder
  Shame: () => <div>Shame Experience</div>, // Placeholder
  Overwhelm: () => <div>Overwhelm Experience</div>, // Placeholder
  Neglect: () => <div>Neglect Experience</div>, // Placeholder
  Responsibility: () => <div>Responsibility Experience</div>, // Placeholder
  Uncertainty: () => <div>Uncertainty Experience</div>, // Placeholder
  Invalidation: () => <div>Invalidation Experience</div>, // Placeholder
  Invisibility: () => <div>Invisibility Experience</div>, // Placeholder
  Guilt: () => <div>Guilt Experience</div>, // Placeholder
  Isolation: () => <div>Isolation Experience</div>, // Placeholder
  Injustice: () => <div>Injustice Experience</div> // Placeholder
}

export default function TriggerExperienceRouter({ trigger, archetype }: TriggerExperienceRouterProps) {
  const [showExperience, setShowExperience] = useState(false)
  
  useEffect(() => {
    // Delay showing the experience to build anticipation
    const timer = setTimeout(() => setShowExperience(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  const TriggerComponent = triggerExperiences[trigger as keyof typeof triggerExperiences] || triggerExperiences.Control

  if (!showExperience) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-6xl mb-8">��</div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Preparing Your {trigger} Experience
          </h1>
          <p className="text-white/70 text-lg">
            Analyzing your psychological patterns...
          </p>
        </div>
      </div>
    )
  }

  return <TriggerComponent />
} 