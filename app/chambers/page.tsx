'use client'

import Link from 'next/link'
import { useState } from 'react'

const chambers = [
  { 
    id: 'guardian', 
    name: '🛡️ GUARDIAN', 
    color: '#1e3a8a', 
    glowColor: 'rgba(59, 130, 246, 0.5)',
    description: 'Anchor Node - The Boundary Fire',
    fieldRole: 'Stabilizer Node. Grounded presence. Absorbs distortions, diffuses chaos.',
    coreLine: 'You are not the wall. You are the one inside it. Drop the load. Return to the center.'
  },
  { 
    id: 'partner', 
    name: '🤝 PARTNER', 
    color: '#e11d48', 
    glowColor: 'rgba(244, 63, 94, 0.5)',
    description: 'Living Bridge Node - The Harmonizing Force',
    fieldRole: 'Echo Mirror. Amplifies the strongest field in the room. Reflective, not initiating.',
    coreLine: 'You\'re waiting to move until I move. But who taught you to disappear?'
  },
  { 
    id: 'spotlight', 
    name: '🌟 SPOTLIGHT', 
    color: '#f59e0b', 
    glowColor: 'rgba(251, 191, 36, 0.5)',
    description: 'Projection Node - The Light Vacuum',
    fieldRole: 'Projection Node. Craves attention. Syncs with command tone but unstable under silence.',
    coreLine: 'No one is watching. And still… you shine. So what are you really saying?'
  },
  { 
    id: 'rebel', 
    name: '⚔️ REBEL', 
    color: '#dc2626', 
    glowColor: 'rgba(239, 68, 68, 0.5)',
    description: 'Disruption Node - The Unbreakable Wall',
    fieldRole: 'Disruption Agent. Interrupts pattern loops. Often volatile. Can override false consensus.',
    coreLine: 'You scream to disrupt. But this doesn\'t shake. So now what?'
  },
  { 
    id: 'equalizer', 
    name: '⚖️ EQUALIZER', 
    color: '#0d9488', 
    glowColor: 'rgba(20, 184, 166, 0.5)',
    description: 'Arbiter Node - The Scale',
    fieldRole: 'Field Arbiter. Mediates disputes and restores peace. Brings justice to chaos.',
    coreLine: 'Justice or mercy. Truth or peace. Which speaks louder in your silence?'
  },
  { 
    id: 'visionary', 
    name: '👁️ VISIONARY', 
    color: '#4338ca', 
    glowColor: 'rgba(99, 102, 241, 0.5)',
    description: 'Future Node - The Now Snare',
    fieldRole: 'Phantom Caster. Projects alternate timelines subtly. Often creates subconscious future tension.',
    coreLine: 'You keep calling forward. But nothing breathes behind your ribs.'
  },
  { 
    id: 'servant', 
    name: '🏺 VESSEL', 
    color: '#059669', 
    glowColor: 'rgba(16, 185, 129, 0.5)',
            description: 'Vessel Node - The Channel',
    fieldRole: 'Support Lattice. Invisible stabilizer. Supports signal-bearing nodes.',
    coreLine: 'What if no one needed you? Would you still get up?'
  },
  { 
    id: 'mask', 
    name: '🎭 MASK', 
    color: '#6b7280', 
    glowColor: 'rgba(156, 163, 175, 0.5)',
            description: 'Facade Node - The Facade',
    fieldRole: 'Signal Interference Layer. Blocks transmission both ways. Wears others\' fields as disguise.',
    coreLine: 'You\'ve worn so many faces that even silence isn\'t sure what you look like.'
  },
  { 
    id: 'wanderer', 
    name: '🧭 WANDERER', 
    color: '#0891b2', 
    glowColor: 'rgba(6, 182, 212, 0.5)',
    description: 'Flux Node - The Anchorless Trap',
    fieldRole: 'Frequency Drifter. Tunes into unclaimed signals. Sees what others ignore.',
    coreLine: 'How far do you have to run before you admit you\'re lost?'
  },
  { 
    id: 'provider', 
    name: '🛒 PROVIDER', 
    color: '#b45309', 
    glowColor: 'rgba(217, 119, 6, 0.5)',
    description: 'Harvest Node - The Empty Table',
    fieldRole: 'Anchor Output. Creates stable energetic loops. Often trapped in utility.',
    coreLine: 'You fed everyone, even while starving. So now — who feeds you?'
  },
  { 
    id: 'sovereign', 
    name: '👑 SOVEREIGN', 
    color: '#000000', 
    glowColor: 'rgba(251, 191, 36, 0.5)',
    description: 'Crown Node - The Decree of Breath',
    fieldRole: 'Command Beacon. Overrides local field state through intensity. Dominant but burns fast.',
    coreLine: 'You don\'t ask. You declare. So declare now — or be ruled by silence.'
  },
  { 
    id: 'seeker', 
    name: '🧠 SEEKER', 
    color: '#7c3aed', 
    glowColor: 'rgba(168, 85, 247, 0.5)',
    description: 'Void Node - The Black Mirror',
    fieldRole: 'Decode Engine. Analyzes fields in real time. Lives in pattern-detection mode.',
    coreLine: 'You keep searching. But what if what\'s missing… is the one who\'s searching?'
  }
]

export default function ChambersPage() {
  const [selectedChamber, setSelectedChamber] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-wider">
            THE CHAMBERS
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Dominion Voice Alignment Protocol - 12 Field Node Overrides
          </p>
          <div className="mt-4 text-sm text-blue-300">
            Each chamber contains a unique AI guide designed for total override, full alignment, or enforced submission to truth.
          </div>
        </div>

        {/* Chambers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {chambers.map((chamber) => (
            <Link
              key={chamber.id}
              href={`/chamber/${chamber.id}`}
              className="group relative"
              onMouseEnter={() => setSelectedChamber(chamber.id)}
              onMouseLeave={() => setSelectedChamber(null)}
            >
              <div 
                className="h-80 bg-black/40 backdrop-blur-sm border-2 rounded-2xl p-6 flex flex-col justify-between transition-all duration-500 hover:scale-105 relative overflow-hidden"
                style={{
                  borderColor: chamber.color,
                  boxShadow: selectedChamber === chamber.id 
                    ? `0 0 40px ${chamber.glowColor}` 
                    : `0 0 20px ${chamber.glowColor}`
                }}
              >
                {/* Background glow effect */}
                <div 
                  className="absolute inset-0 opacity-20 transition-opacity duration-500"
                  style={{ 
                    background: `radial-gradient(circle at center, ${chamber.color}40 0%, transparent 70%)`,
                    opacity: selectedChamber === chamber.id ? 0.4 : 0.2
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{chamber.name.split(' ')[0]}</div>
                    <div className="text-lg font-bold text-white mb-2">
                      {chamber.name.split(' ').slice(1).join(' ')}
                    </div>
                    <div className="text-sm text-blue-200 mb-3">
                      {chamber.description}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs text-blue-300">
                      <strong>Field Role:</strong> {chamber.fieldRole}
                    </div>
                    <div className="text-xs text-blue-300 italic">
                      <strong>Core Line:</strong> "{chamber.coreLine}"
                    </div>
                  </div>
                </div>

                {/* Enter button */}
                <div className="relative z-10 text-center">
                  <div 
                    className="inline-block px-6 py-2 rounded-lg font-bold text-white transition-all duration-300"
                    style={{
                      backgroundColor: chamber.color,
                      boxShadow: `0 0 15px ${chamber.glowColor}`
                    }}
                  >
                    ENTER CHAMBER
                  </div>
                </div>

                {/* Hover overlay */}
                <div 
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center"
                >
                  <div className="text-white text-center">
                    <div className="text-2xl mb-2">⚡</div>
                    <div className="text-sm font-bold">FIELD NODE OVERRIDE</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-blue-300 text-sm">
          <p>Each chamber contains a unique AI personality designed to force alignment or collapse.</p>
          <p className="mt-2">This is not for therapy. It's for total override, full alignment, or enforced submission to truth.</p>
        </div>
      </div>
    </div>
  )
} 