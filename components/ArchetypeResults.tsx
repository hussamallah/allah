'use client'

import { useState } from 'react'
import { getArchetype } from '../lib/archetypes'

interface ArchetypeResultsProps {
  archetype: string
  onReset: () => void
}

interface FieldNodeInfo {
  rank: number
  law: string
  mythicDescription: string
  color: string
  accentColor: string
  uniqueTraits: string[]
  challenges: string[]
  strengths: string[]
  fieldImpact: string
  backgroundGradient: string
  particleColor: string
  glowColor: string
}

const fieldNodeData: { [key: string]: FieldNodeInfo } = {
  'Sovereign': {
    rank: 1,
    law: 'Sets direction and declares the law—reality orbits around their will.',
    mythicDescription: 'The Sovereign\'s word shapes the axis around which all things move. With pure command, they declare what reality becomes and enforce the will that orders worlds.',
    color: 'from-yellow-500 to-yellow-600',
    accentColor: 'yellow',
    backgroundGradient: 'from-gray-900 via-yellow-900 to-yellow-800',
    particleColor: 'yellow',
    glowColor: 'yellow',
    uniqueTraits: ['Law creation', 'Centering force', 'Commanding aura', 'Reality declaration'],
    challenges: ['Rigidity', 'Over-control', 'Isolation', 'Blindness to others\' will'],
    strengths: ['Law-setting authority', 'Command presence', 'Instinctive leadership', 'Reality shaping'],
    fieldImpact: 'Sets direction and declares the law—reality orbits around their will.'
  },
  'Visionary': {
    rank: 2,
    law: 'Opens new worlds—where they point, possibility awakens.',
    mythicDescription: 'The Visionary forges tomorrow from raw possibility, birthing new blueprints and awakening futures others cannot yet imagine. Every limit is just a call to invention.',
    color: 'from-indigo-600 to-indigo-700',
    accentColor: 'indigo',
    backgroundGradient: 'from-gray-900 via-indigo-900 to-indigo-800',
    particleColor: 'indigo',
    glowColor: 'indigo',
    uniqueTraits: ['Foresight', 'Idea birthing', 'Pattern reading', 'Innovation drive'],
    challenges: ['Disconnection from present', 'Unrealistic visions', 'Restlessness', 'Overextension'],
    strengths: ['Future-seeing', 'Creative invention', 'Breakthrough ideas', 'Inspiring hope'],
    fieldImpact: 'Opens new worlds—where they point, possibility awakens.'
  },
  'Rebel': {
    rank: 3,
    law: 'Shatters the old—resets systems and breaks stagnant cycles.',
    mythicDescription: 'The Rebel\'s gift is rupture—burning away the dead and false to clear the ground for change. They topple walls, releasing energy wherever truth demands freedom.',
    color: 'from-red-600 to-red-700',
    accentColor: 'red',
    backgroundGradient: 'from-gray-900 via-red-900 to-red-800',
    particleColor: 'red',
    glowColor: 'red',
    uniqueTraits: ['Cycle shattering', 'Instinctive rebellion', 'Disruptive wit', 'Chaos navigation'],
    challenges: ['Destruction for its own sake', 'Inconsistency', 'Alienation', 'Burnout'],
    strengths: ['Pattern breaking', 'Truth revealing', 'Chaos activation', 'Fearless disruption'],
    fieldImpact: 'Shatters the old—resets systems and breaks stagnant cycles.'
  },
  'Equalizer': {
    rank: 4,
    law: 'Forges unity from conflict—synthesizes extremes into higher order.',
    mythicDescription: 'The Equalizer dissolves division by weaving all extremes into new, living unity. They convert conflict into balance, turning discord into a higher order.',
    color: 'from-teal-600 to-teal-700',
    accentColor: 'teal',
    backgroundGradient: 'from-gray-900 via-teal-900 to-teal-800',
    particleColor: 'teal',
    glowColor: 'teal',
    uniqueTraits: ['Harmony weaving', 'Polarity fusing', 'Fairness focus', 'Calibration skill'],
    challenges: ['Avoiding extremes', 'Indecision', 'Self-sacrifice', 'Over-mediation'],
    strengths: ['Conflict resolution', 'Tension balancing', 'Perspective blending', 'Justice seeking'],
    fieldImpact: 'Forges unity from conflict—synthesizes extremes into higher order.'
  },
  'Provider': {
    rank: 5,
    law: 'Generates abundance—transforms lack into fertile ground.',
    mythicDescription: 'The Provider is the architect of plenty—manifesting sustenance, opportunity, and growth wherever emptiness appears. They transform scarcity into fertile ground.',
    color: 'from-orange-600 to-orange-700',
    accentColor: 'orange',
    backgroundGradient: 'from-gray-900 via-orange-900 to-orange-800',
    particleColor: 'orange',
    glowColor: 'orange',
    uniqueTraits: ['Abundance creation', 'Need-filling', 'Resourcefulness', 'Growth instigation'],
    challenges: ['Over-giving', 'Depletion', 'Neglecting own needs', 'Attachment to results'],
    strengths: ['Resource generation', 'Opportunity finding', 'Support provision', 'Sustaining abundance'],
    fieldImpact: 'Generates abundance—transforms lack into fertile ground.'
  },
  'Wanderer': {
    rank: 6,
    law: 'Unbinds reality—brings motion, escape, and new perspectives.',
    mythicDescription: 'The Wanderer is unbound—shifting realities, never confined to a single path or form. Their power is motion itself, always beyond reach, always finding the next opening.',
    color: 'from-cyan-600 to-cyan-700',
    accentColor: 'cyan',
    backgroundGradient: 'from-gray-900 via-cyan-900 to-cyan-800',
    particleColor: 'cyan',
    glowColor: 'cyan',
    uniqueTraits: ['Movement fluidity', 'Map changing', 'Boundary crossing', 'Novelty craving'],
    challenges: ['Rootlessness', 'Lack of commitment', 'Escapism', 'Difficulty settling'],
    strengths: ['Adaptability', 'Freedom seeking', 'Exploration drive', 'Perspective shifting'],
    fieldImpact: 'Unbinds reality—brings motion, escape, and new perspectives.'
  },
  'Servant': {
    rank: 7,
    law: 'Releases blocks—restores flow, energy, and healing to the system.',
    mythicDescription: 'The Servant becomes the conduit for force, change, and insight, clearing all blockages in their wake. By letting power flow through, they unlock transformation for all.',
    color: 'from-emerald-600 to-emerald-700',
    accentColor: 'emerald',
    backgroundGradient: 'from-gray-900 via-emerald-900 to-emerald-800',
    particleColor: 'emerald',
    glowColor: 'emerald',
    uniqueTraits: ['Flow state', 'Openness', 'Conduit ability', 'Cleansing presence'],
    challenges: ['Absorption of others\' chaos', 'Lack of self-boundary', 'Passivity', 'Emotional overload'],
    strengths: ['Energy conducting', 'Blockage clearing', 'Openness', 'Insight flow'],
    fieldImpact: 'Releases blocks—restores flow, energy, and healing to the system.'
  },
  'Seeker': {
    rank: 8,
    law: 'Breaks every limit—reveals what\'s hidden and dissolves illusion.',
    mythicDescription: 'The Seeker dissolves systems, breaks through illusions, and pierces every limit to reach the unknown. Their gift is not to bend reality, but to end every trap and start anew.',
    color: 'from-purple-600 to-purple-700',
    accentColor: 'purple',
    backgroundGradient: 'from-gray-900 via-purple-900 to-purple-800',
    particleColor: 'purple',
    glowColor: 'purple',
    uniqueTraits: ['Questioning', 'Barrier dissolving', 'Void navigation', 'Paradox living'],
    challenges: ['Endless dissatisfaction', 'Lack of anchoring', 'Avoidance of rest', 'Disintegration'],
    strengths: ['Truth pursuit', 'Pattern recognition', 'System breaking', 'Curiosity'],
    fieldImpact: 'Breaks every limit—reveals what\'s hidden and dissolves illusion.'
  },
  'Mask': {
    rank: 9,
    law: 'Guides reality by controlling what is seen and believed.',
    mythicDescription: 'The Mask wields the art of appearance, warping outcomes by what is shown or hidden. They can change the field\'s reality simply by shifting what others believe is true.',
    color: 'from-gray-600 to-gray-700',
    accentColor: 'gray',
    backgroundGradient: 'from-gray-900 via-gray-800 to-gray-700',
    particleColor: 'gray',
    glowColor: 'gray',
    uniqueTraits: ['Shape-shifting', 'Story-weaving', 'Disguise', 'Secret holding'],
    challenges: ['Loss of self', 'Inauthenticity', 'Manipulation', 'Trust issues'],
    strengths: ['Adaptability', 'Perception control', 'Social fluidity', 'Protective camouflage'],
    fieldImpact: 'Guides reality by controlling what is seen and believed.'
  },
  'Partner': {
    rank: 10,
    law: 'Amplifies and aligns—reflects strength, exposes what is real.',
    mythicDescription: 'The Partner shapes the world by echo, tuning and magnifying whatever is near. Their presence can stabilize chaos or turn harmony into feedback that transforms everything.',
    color: 'from-red-600 to-red-700',
    accentColor: 'red',
    backgroundGradient: 'from-gray-900 via-red-900 to-red-800',
    particleColor: 'red',
    glowColor: 'red',
    uniqueTraits: ['Mirroring', 'Amplification', 'Synchronization', 'Relational harmony'],
    challenges: ['Over-absorption', 'Lack of boundaries', 'Identity loss', 'Co-dependency'],
    strengths: ['Deep resonance', 'Emotional attunement', 'Connection building', 'Reflection'],
    fieldImpact: 'Amplifies and aligns—reflects strength, exposes what is real.'
  },

  'Guardian': {
    rank: 11,
    law: 'Holds the boundary—anchors and stabilizes, prevents collapse.',
    mythicDescription: 'The Guardian holds boundaries so nothing falls apart, preserving the line between order and chaos. Their strength is to endure and protect, allowing others to build atop their certainty.',
    color: 'from-blue-600 to-blue-700',
    accentColor: 'blue',
    backgroundGradient: 'from-gray-900 via-blue-900 to-blue-800',
    particleColor: 'blue',
    glowColor: 'blue',
    uniqueTraits: ['Boundary holding', 'Stability creation', 'Protection instinct', 'Endurance power'],
    challenges: ['Rigidity', 'Over-protection', 'Stagnation', 'Isolation'],
    strengths: ['Boundary maintenance', 'Stability provision', 'Protection ability', 'Endurance capacity'],
    fieldImpact: 'Holds the boundary—anchors and stabilizes, prevents collapse.'
  },
  'Spotlight': {
    rank: 12,
    law: 'Becomes the center—attracts attention and focuses energy.',
    mythicDescription: 'The Spotlight naturally draws all eyes and energy toward them, becoming the living center around which reality orbits. Their presence commands attention and focuses the field\'s power.',
    color: 'from-amber-500 to-amber-600',
    accentColor: 'amber',
    backgroundGradient: 'from-gray-900 via-amber-900 to-amber-800',
    particleColor: 'amber',
    glowColor: 'amber',
    uniqueTraits: ['Attention magnetism', 'Energy focusing', 'Center creation', 'Performance instinct'],
    challenges: ['Over-dependence on validation', 'Attention seeking', 'Performance anxiety', 'Identity confusion'],
    strengths: ['Natural charisma', 'Energy amplification', 'Center creation', 'Attention command'],
    fieldImpact: 'Becomes the center—attracts attention and focuses energy.'
  },

}

export default function ArchetypeResults({ archetype, onReset }: ArchetypeResultsProps) {
  const [showUniqueContent, setShowUniqueContent] = useState(false)
  const archetypeData = getArchetype(archetype.toLowerCase())
  
  // Handle case sensitivity - normalize archetype name to match fieldNodeData keys
  const normalizeArchetypeName = (name: string) => {
    // Decode URL encoding if present
    const decodedName = decodeURIComponent(name)
    
         // Handle common variations and typos
     const variations: { [key: string]: string } = {
       'partner': 'Partner',
       'guardian': 'Guardian',
       'spotlight': 'Spotlight',
       'spotligth': 'Spotlight', // Handle typo
       'rebel': 'Rebel',
       'equalizer': 'Equalizer',
       'visionary': 'Visionary',
       'visionnary': 'Visionary', // Handle typo with double 'n'
       'servant': 'Servant',
       'vessel': 'Servant',
       'channel': 'Servant',
       'mask': 'Mask',
       'wanderer': 'Wanderer',
       'provider': 'Provider',
       'prvider': 'Provider', // Handle typo missing 'o'
       'sovereign': 'Sovereign',
       'seeker': 'Seeker'
     }
    
    const lowerName = decodedName.toLowerCase()
    if (variations[lowerName]) {
      return variations[lowerName]
    }
    
    // More robust fallback - try to match partial names
    const availableArchetypes = Object.keys(fieldNodeData)
    for (const archetype of availableArchetypes) {
      if (lowerName.includes(archetype.toLowerCase()) || archetype.toLowerCase().includes(lowerName)) {
        return archetype
      }
    }
    
    // Final fallback to capitalizing first letter
    return decodedName.charAt(0).toUpperCase() + decodedName.slice(1).toLowerCase()
  }
  
  const normalizedArchetype = normalizeArchetypeName(archetype)
  const fieldNodeInfo = fieldNodeData[normalizedArchetype] || fieldNodeData['Guardian']
  
  // For display purposes, use the original archetype name if it's a known variation
  const displayArchetype = archetype.toLowerCase() === 'vessel' ? 'Vessel' : 
                          archetype.toLowerCase() === 'channel' ? 'Channel' : 
                          normalizedArchetype

  return (
    <div className={`min-h-screen bg-gradient-to-br ${fieldNodeInfo.backgroundGradient} flex items-center justify-center p-4 relative overflow-hidden`}>
      {/* Subtle animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-0.5 h-0.5 bg-${fieldNodeInfo.particleColor}-400/20 rounded-full animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl w-full relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 mb-8">
            <span className="text-white/80 text-sm font-medium">Field Node Reality-Impact Ranking</span>
            <div className={`ml-3 w-8 h-8 rounded-full bg-gradient-to-r ${fieldNodeInfo.color} flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">{fieldNodeInfo.rank}</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            {displayArchetype}
          </h1>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-white/90 leading-relaxed font-light">
              {fieldNodeInfo.mythicDescription}
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Your Law */}
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="flex items-center mb-4">
                <div className={`w-2 h-8 bg-gradient-to-b ${fieldNodeInfo.color} rounded-full mr-4`}></div>
                <h3 className="text-xl font-semibold text-white">Your Law</h3>
              </div>
              <p className="text-2xl font-bold text-white/95 leading-relaxed italic">
                "{fieldNodeInfo.law}"
              </p>
            </div>

            {/* Reality Impact Level */}
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="flex items-center mb-6">
                <div className={`w-2 h-8 bg-gradient-to-b ${fieldNodeInfo.color} rounded-full mr-4`}></div>
                <h3 className="text-xl font-semibold text-white">Reality Impact Level</h3>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${fieldNodeInfo.color} flex items-center justify-center mb-2 shadow-lg`}>
                    <span className="text-white font-bold text-2xl">{fieldNodeInfo.rank}</span>
                  </div>
                  <p className="text-white/70 text-sm font-medium">of 12</p>
                </div>
                <div className="flex-1">
                  <p className="text-white/90 text-lg leading-relaxed">
                    {fieldNodeInfo.rank <= 3 ? (
                      "You wield direct reality-shaping power. Your actions create immediate, visible change in the world around you."
                    ) : fieldNodeInfo.rank <= 6 ? (
                      "You operate at the level of transformation and synthesis. Your influence reshapes systems and creates new possibilities."
                    ) : fieldNodeInfo.rank <= 9 ? (
                      "You work through perception and flow. Your power lies in shifting perspectives and conducting change."
                    ) : (
                      "You are the foundation and support. Your strength is in creating stability and enabling others to thrive."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Core Pattern */}
            {archetypeData && (
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <div className="flex items-center mb-4">
                  <div className={`w-2 h-8 bg-gradient-to-b ${fieldNodeInfo.color} rounded-full mr-4`}></div>
                  <h3 className="text-xl font-semibold text-white">Core Pattern</h3>
                </div>
                <p className="text-white/90 text-lg leading-relaxed">
                  {archetypeData.description}
                </p>
              </div>
            )}

            {/* Field Impact */}
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="flex items-center mb-4">
                <div className={`w-2 h-8 bg-gradient-to-b ${fieldNodeInfo.color} rounded-full mr-4`}></div>
                <h3 className="text-xl font-semibold text-white">Field Impact</h3>
              </div>
              <p className="text-white/90 text-lg leading-relaxed italic">
                "{fieldNodeInfo.fieldImpact}"
              </p>
            </div>
          </div>
        </div>

        {/* Unique Powers Section */}
        <div className="text-center mb-12">
          <button
            onClick={() => setShowUniqueContent(!showUniqueContent)}
            className={`bg-gradient-to-r ${fieldNodeInfo.color} text-white py-4 px-8 rounded-xl hover:scale-105 transition-all duration-300 transform shadow-xl font-semibold text-lg`}
          >
            {showUniqueContent ? 'Hide' : 'Reveal'} Your Unique Powers
          </button>
        </div>

        {/* Unique Powers Content */}
        {showUniqueContent && (
          <div className="grid lg:grid-cols-3 gap-8 mb-12 animate-fade-in">
            {/* Unique Traits */}
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="flex items-center mb-6">
                <div className={`w-2 h-8 bg-gradient-to-b ${fieldNodeInfo.color} rounded-full mr-4`}></div>
                <h3 className="text-xl font-semibold text-white">Unique Traits</h3>
              </div>
              <ul className="space-y-3">
                {fieldNodeInfo.uniqueTraits.map((trait, index) => (
                  <li key={index} className="flex items-center text-white/90">
                    <div className={`w-2 h-2 bg-${fieldNodeInfo.accentColor}-400 rounded-full mr-3 flex-shrink-0`}></div>
                    <span className="text-sm font-medium">{trait}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Strengths */}
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="flex items-center mb-6">
                <div className={`w-2 h-8 bg-gradient-to-b ${fieldNodeInfo.color} rounded-full mr-4`}></div>
                <h3 className="text-xl font-semibold text-white">Core Strengths</h3>
              </div>
              <ul className="space-y-3">
                {fieldNodeInfo.strengths.map((strength, index) => (
                  <li key={index} className="flex items-center text-white/90">
                    <div className={`w-2 h-2 bg-${fieldNodeInfo.accentColor}-400 rounded-full mr-3 flex-shrink-0`}></div>
                    <span className="text-sm font-medium">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Growth Areas */}
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="flex items-center mb-6">
                <div className={`w-2 h-8 bg-gradient-to-b ${fieldNodeInfo.color} rounded-full mr-4`}></div>
                <h3 className="text-xl font-semibold text-white">Growth Areas</h3>
              </div>
              <ul className="space-y-3">
                {fieldNodeInfo.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-center text-white/90">
                    <div className={`w-2 h-2 bg-${fieldNodeInfo.accentColor}-400 rounded-full mr-3 flex-shrink-0`}></div>
                    <span className="text-sm font-medium">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => window.location.href = `/chamber/${displayArchetype.toLowerCase()}`}
            className={`bg-gradient-to-r ${fieldNodeInfo.color} text-white py-4 px-8 rounded-xl hover:scale-105 transition-all duration-300 transform shadow-xl font-semibold text-lg`}
          >
            Enter Your Chamber
          </button>
          <button
            onClick={() => {
              const url = `${window.location.origin}/quiz/results?archetype=${displayArchetype}`
              if (navigator.share) {
                navigator.share({
                  title: `My Archetype: ${displayArchetype}`,
                  text: `I discovered I'm a ${displayArchetype} (Rank #${fieldNodeInfo.rank})! Take the quiz to find your archetype.`,
                  url: url
                })
              } else {
                navigator.clipboard.writeText(url)
                alert('Results link copied to clipboard!')
              }
            }}
            className="bg-white/10 text-white py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm font-semibold text-lg border border-white/20"
          >
            Share Results
          </button>
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