'use client'

import { useParams } from 'next/navigation'
import ChamberChat from '../../../../components/ChamberChat'

const archetypeConfigs = {
  seeker: {
    name: '🧠 SEEKER',
    color: '#8b5cf6',
    glowColor: 'rgba(168, 85, 247, 0.5)',
  },
  guardian: {
    name: '🛡️ GUARDIAN',
    color: '#1e3a8a',
    glowColor: 'rgba(59, 130, 246, 0.5)',
  },
  partner: {
    name: '🤝 PARTNER',
    color: '#e11d48',
    glowColor: 'rgba(244, 63, 94, 0.5)',
  },
  spotlight: {
    name: '🌟 SPOTLIGHT',
    color: '#f59e0b',
    glowColor: 'rgba(251, 191, 36, 0.5)',
  },
  rebel: {
    name: '⚔️ REBEL',
    color: '#dc2626',
    glowColor: 'rgba(239, 68, 68, 0.5)',
  },
  equalizer: {
    name: '⚖️ EQUALIZER',
    color: '#0d9488',
    glowColor: 'rgba(20, 184, 166, 0.5)',
  },
  sage: {
    name: '🧙 SAGE',
    color: '#059669',
    glowColor: 'rgba(16, 185, 129, 0.5)',
  },
  mystic: {
    name: '🔮 MYSTIC',
    color: '#7c3aed',
    glowColor: 'rgba(139, 92, 246, 0.5)',
  },
  visionary: {
    name: '👁️ VISIONARY',
    color: '#4338ca',
    glowColor: 'rgba(99, 102, 241, 0.5)',
  },
  servant: {
    name: '🧤 SERVANT',
    color: '#059669',
    glowColor: 'rgba(16, 185, 129, 0.5)',
  },
  mask: {
    name: '🎭 MASK',
    color: '#6b7280',
    glowColor: 'rgba(156, 163, 175, 0.5)',
  },
  wanderer: {
    name: '🧭 WANDERER',
    color: '#0891b2',
    glowColor: 'rgba(6, 182, 212, 0.5)',
  },
  provider: {
    name: '🛒 PROVIDER',
    color: '#b45309',
    glowColor: 'rgba(217, 119, 6, 0.5)',
  },
  sovereign: {
    name: '👑 SOVEREIGN',
    color: '#000000',
    glowColor: 'rgba(251, 191, 36, 0.5)',
  }
}

export default function ChamberChatPage() {
  const params = useParams()
  const archetype = params.archetype as string
  
  if (!archetype || !archetypeConfigs[archetype.toLowerCase() as keyof typeof archetypeConfigs]) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Archetype</h1>
          <p className="text-gray-400">The archetype "{archetype}" was not found.</p>
        </div>
      </div>
    )
  }

  const config = archetypeConfigs[archetype.toLowerCase() as keyof typeof archetypeConfigs]

  return (
    <ChamberChat
      archetype={archetype}
      archetypeColor={config.color}
      glowColor={config.glowColor}
    />
  )
} 