'use client'

import { useParams } from 'next/navigation'
import { triggerRoutes, TriggerType } from '../../../lib/triggerRoutes'
import Link from 'next/link'

export default function TriggerPage() {
  const params = useParams()
  const trigger = params.trigger as string
  
  // Normalize trigger name
  const normalizeTriggerName = (name: string) => {
    const variations: { [key: string]: string } = {
      'control': 'Control',
      'rejection': 'Rejection',
      'shame': 'Shame',
      'overwhelm': 'Overwhelm',
      'neglect': 'Neglect',
      'responsibility': 'Responsibility',
      'uncertainty': 'Uncertainty',
      'invalidation': 'Invalidation',
      'invisibility': 'Invisibility',
      'guilt': 'Guilt',
      'isolation': 'Isolation',
      'injustice': 'Injustice'
    }
    
    const lowerName = name.toLowerCase()
    return variations[lowerName] || name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  }
  
  const normalizedTrigger = normalizeTriggerName(trigger)
  const triggerInfo = triggerRoutes[normalizedTrigger as TriggerType]
  
  if (!triggerInfo) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Trigger Not Found</h1>
          <p className="text-gray-400 mb-4">The trigger "{trigger}" could not be found.</p>
          <Link href="/quiz" className="text-blue-400 hover:text-blue-300">
            ← Back to Quiz
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-pulse opacity-20"
            style={{
              backgroundColor: triggerInfo.color,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto p-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 mb-8">
            <span className="text-white/80 text-sm font-medium">Psychological Trigger Analysis</span>
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <span className="text-6xl mr-4">{triggerInfo.icon}</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
              {triggerInfo.title}
            </h1>
          </div>
          
          <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
            {triggerInfo.description}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Understanding Your Trigger</h2>
          <p className="text-white/90 text-lg leading-relaxed mb-8">
            {triggerInfo.content.overview}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Symptoms */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <div className="w-2 h-6 rounded-full mr-3" style={{ backgroundColor: triggerInfo.color }}></div>
                Common Symptoms
              </h3>
              <ul className="space-y-3">
                {triggerInfo.content.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-center text-white/90">
                    <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: triggerInfo.color }}></div>
                    <span className="text-sm font-medium">{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Strategies */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <div className="w-2 h-6 rounded-full mr-3" style={{ backgroundColor: triggerInfo.color }}></div>
                Coping Strategies
              </h3>
              <ul className="space-y-3">
                {triggerInfo.content.strategies.map((strategy, index) => (
                  <li key={index} className="flex items-center text-white/90">
                    <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: triggerInfo.color }}></div>
                    <span className="text-sm font-medium">{strategy}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/quiz"
            className="text-white py-4 px-8 rounded-xl hover:scale-105 transition-all duration-300 transform shadow-xl font-semibold text-lg border-2 text-center"
            style={{ 
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderColor: triggerInfo.color,
              backdropFilter: 'blur(10px)'
            }}
          >
            Take the Full Quiz
          </Link>
          
          <Link
            href="/chambers"
            className="bg-white/10 text-white py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm font-semibold text-lg border border-white/20 text-center"
          >
            Explore All Archetypes
          </Link>
        </div>
      </div>
    </div>
  )
} 