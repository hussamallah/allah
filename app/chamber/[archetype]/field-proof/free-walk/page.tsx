'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

const archetypeConfigs = {
  seeker: {
    name: '🧠 SEEKER',
    color: '#4c1d95',
    primaryColor: '#4c1d95',
    secondaryColor: '#000000',
    accentColor: '#7c3aed',
    glowColor: 'rgba(124, 58, 237, 0.5)',
    powerColor: 'rgba(124, 58, 237, 0.3)',
    description: 'Void Node - The Black Mirror',
    loop: 'Endless seeking, never arriving, fear of emptiness.',
    needs: 'Stop seeking, face the void, surrender to silence, burn the hunger for answers.',
    rituals: [
      'Night Walk (face the emptiness you avoid)',
      'Death Ritual (kill the seeker within)',
      'Silent Meal (eat without seeking distraction)',
      'Shadow Recording (confess what you hide)',
      'Timed Burn (exhaust the seeking loop)',
      'Name Surrender (lose your identity)'
    ]
  },
  guardian: {
    name: '🛡️ GUARDIAN',
    color: '#1e3a8a',
    primaryColor: '#1e3a8a',
    secondaryColor: '#000000',
    accentColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    powerColor: 'rgba(59, 130, 246, 0.3)',
    description: 'Anchor Node - The Boundary Fire',
    loop: 'Overprotection, fear of loss, clinging to boundaries.',
    needs: 'Surrender control, expose vulnerability, trust the void, burn the need to "save."',
    rituals: [
      'Mirror Burn (face own limits, see the mask)',
      'Night Walk (alone, outside comfort, face fear)',
      'Name Surrender (release "protector" identity)',
      'Silent Meal (be with self, drop service)',
      'Death Ritual (ritualize the end of the overprotective self)',
      'Shadow Gift (integrate vulnerability as strength)'
    ]
  },
  partner: {
    name: '🤝 PARTNER',
    color: '#e11d48',
    primaryColor: '#e11d48',
    secondaryColor: '#000000',
    accentColor: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.5)',
    powerColor: 'rgba(244, 63, 94, 0.3)',
    description: 'Living Bridge Node - The Harmonizing Force',
    loop: 'Over-connecting, losing self in others, fear of disconnection.',
    needs: 'Tune your own frequency, become a source of harmony, burn the need to merge.',
    rituals: [
      'Resonance Scan (tune to emotional frequency without merging)',
      'Mirroring Pulse (intentional resonance and feedback loops)',
      'Sync Entry (active connection creation through breath)',
      'Group Breath (amplifying group resonance exponentially)',
      'Echo Exchange (true emotional mirroring and deep connection)'
    ]
  },
  spotlight: {
    name: '🌟 SPOTLIGHT',
    color: '#f59e0b',
    primaryColor: '#f59e0b',
    secondaryColor: '#000000',
    accentColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.5)',
    powerColor: 'rgba(251, 191, 36, 0.3)',
    description: 'Projection Node - The Light Vacuum',
    loop: 'Performing, craving validation, fear of invisibility.',
    needs: 'Endure stillness, embrace silence, survive rejection, burn the "show."',
    rituals: [
      'Public Freeze (be seen, then still, no performance)',
      'Voice Release (release unfiltered voice, break stage self)',
      'Timed Burn (overact, then stop—all masks fall)',
      'Silent Meal (be present without audience)',
      'Heat Stand (withstand attention/pressure physically)',
      'Name Surrender (drop "performer" identity)'
    ]
  },
  rebel: {
    name: '⚔️ REBEL',
    color: '#dc2626',
    primaryColor: '#dc2626',
    secondaryColor: '#000000',
    accentColor: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    powerColor: 'rgba(239, 68, 68, 0.3)',
    description: 'Disruption Node - The Unbreakable Wall',
    loop: 'Opposition for its own sake, attachment to chaos, fear of order.',
    needs: 'Choose disruption consciously, learn stillness, integrate discipline, own consequences.',
    rituals: [
      'Social Disruption (test true power of challenge)',
      'Opposite Day (practice obedience, calm)',
      'Death Ritual (bury the old chaos-loop)',
      'Silent Meal (practice stillness, not reaction)',
      'Shadow Recording (confess what you hide)',
      'Name Surrender (drop "rebel" identity)'
    ]
  },
  equalizer: {
    name: '⚖️ EQUALIZER',
    color: '#059669',
    primaryColor: '#059669',
    secondaryColor: '#000000',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    powerColor: 'rgba(16, 185, 129, 0.3)',
    description: 'Balance Node - The Harmonizing Force',
    loop: 'Over-balancing, fear of extremes, attachment to neutrality.',
    needs: 'Embrace extremes, choose sides, burn the need for perfect balance.',
    rituals: [
      'Polarity Test (choose a side, commit to it)',
      'Extreme Walk (embrace one extreme fully)',
      'Death Ritual (kill the neutral self)',
      'Silent Meal (practice imbalance, not balance)',
      'Shadow Recording (confess your true preferences)',
      'Name Surrender (drop "balanced" identity)'
    ]
  },
  sage: {
    name: '🧙‍♂️ SAGE',
    color: '#7c3aed',
    primaryColor: '#7c3aed',
    secondaryColor: '#000000',
    accentColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    powerColor: 'rgba(168, 85, 247, 0.3)',
    description: 'Wisdom Node - The Knowledge Seeker',
    loop: 'Over-thinking, analysis paralysis, fear of action.',
    needs: 'Act without thinking, trust intuition, burn the need to understand everything.',
    rituals: [
      'Action Surge (act without analysis)',
      'Intuition Walk (trust gut over mind)',
      'Death Ritual (kill the overthinker)',
      'Silent Meal (practice not knowing)',
      'Shadow Recording (confess what you don\'t know)',
      'Name Surrender (drop "wise" identity)'
    ]
  },
  mystic: {
    name: '🔮 MYSTIC',
    color: '#8b5cf6',
    primaryColor: '#8b5cf6',
    secondaryColor: '#000000',
    accentColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    powerColor: 'rgba(168, 85, 247, 0.3)',
    description: 'Transcendence Node - The Beyond Seeker',
    loop: 'Escaping reality, seeking transcendence, fear of the mundane.',
    needs: 'Embrace the mundane, find magic in reality, burn the need to escape.',
    rituals: [
      'Grounding Walk (find magic in the ordinary)',
      'Mundane Ritual (celebrate the everyday)',
      'Death Ritual (kill the escapist)',
      'Silent Meal (practice presence in reality)',
      'Shadow Recording (confess your mundane desires)',
      'Name Surrender (drop "mystic" identity)'
    ]
  },
  visionary: {
    name: '👁️ VISIONARY',
    color: '#0ea5e9',
    primaryColor: '#0ea5e9',
    secondaryColor: '#000000',
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.5)',
    powerColor: 'rgba(56, 189, 248, 0.3)',
    description: 'Future Node - The Pattern Seer',
    loop: 'Living in the future, ignoring the present, fear of now.',
    needs: 'Live in the present, trust the process, burn the need to control the future.',
    rituals: [
      'Present Walk (focus only on now)',
      'Process Trust (trust the unfolding)',
      'Death Ritual (kill the future dweller)',
      'Silent Meal (practice present awareness)',
      'Shadow Recording (confess your present fears)',
      'Name Surrender (drop "visionary" identity)'
    ]
  },
  servant: {
    name: '🤲 SERVANT',
    color: '#f97316',
    primaryColor: '#f97316',
    secondaryColor: '#000000',
    accentColor: '#fb923c',
    glowColor: 'rgba(251, 146, 60, 0.5)',
    powerColor: 'rgba(251, 146, 60, 0.3)',
    description: 'Service Node - The Helper Force',
    loop: 'Over-serving, losing self in service, fear of being served.',
    needs: 'Receive service, allow others to help, burn the need to always serve.',
    rituals: [
      'Receive Walk (allow others to serve you)',
      'Service Balance (serve and be served)',
      'Death Ritual (kill the over-servant)',
      'Silent Meal (practice receiving)',
      'Shadow Recording (confess your need for help)',
      'Name Surrender (drop "servant" identity)'
    ]
  },
  mask: {
    name: '🎭 MASK',
    color: '#6b7280',
    primaryColor: '#6b7280',
    secondaryColor: '#000000',
    accentColor: '#9ca3af',
    glowColor: 'rgba(156, 163, 175, 0.5)',
    powerColor: 'rgba(156, 163, 175, 0.3)',
    description: 'Adaptation Node - The Shape Shifter',
    loop: 'Over-adapting, losing true self, fear of authenticity.',
    needs: 'Show true self, stop adapting, burn the need to fit in.',
    rituals: [
      'Authenticity Walk (show your true self)',
      'Adaptation Stop (stop changing for others)',
      'Death Ritual (kill the mask wearer)',
      'Silent Meal (practice being yourself)',
      'Shadow Recording (confess your true nature)',
      'Name Surrender (drop "mask" identity)'
    ]
  },
  wanderer: {
    name: '🚶 WANDERER',
    color: '#84cc16',
    primaryColor: '#84cc16',
    secondaryColor: '#000000',
    accentColor: '#a3e635',
    glowColor: 'rgba(163, 230, 53, 0.5)',
    powerColor: 'rgba(163, 230, 53, 0.3)',
    description: 'Exploration Node - The Path Finder',
    loop: 'Endless wandering, never settling, fear of commitment.',
    needs: 'Choose a path, commit to it, burn the need to keep exploring.',
    rituals: [
      'Commitment Walk (choose and commit to one path)',
      'Settlement Ritual (find your place)',
      'Death Ritual (kill the wanderer)',
      'Silent Meal (practice staying put)',
      'Shadow Recording (confess your fear of commitment)',
      'Name Surrender (drop "wanderer" identity)'
    ]
  },
  provider: {
    name: '🏠 PROVIDER',
    color: '#0891b2',
    primaryColor: '#0891b2',
    secondaryColor: '#000000',
    accentColor: '#22d3ee',
    glowColor: 'rgba(34, 211, 238, 0.5)',
    powerColor: 'rgba(34, 211, 238, 0.3)',
    description: 'Nurture Node - The Care Giver',
    loop: 'Over-providing, neglecting self, fear of being provided for.',
    needs: 'Allow yourself to be provided for, balance giving and receiving.',
    rituals: [
      'Receive Walk (allow others to provide for you)',
      'Balance Ritual (give and receive equally)',
      'Death Ritual (kill the over-provider)',
      'Silent Meal (practice receiving nourishment)',
      'Shadow Recording (confess your need for care)',
      'Name Surrender (drop "provider" identity)'
    ]
  },
  sovereign: {
    name: '👑 SOVEREIGN',
    color: '#be185d',
    primaryColor: '#be185d',
    secondaryColor: '#000000',
    accentColor: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.5)',
    powerColor: 'rgba(236, 72, 153, 0.3)',
    description: 'Authority Node - The Natural Leader',
    loop: 'Over-leading, fear of following, attachment to control.',
    needs: 'Learn to follow, trust others, burn the need to always lead.',
    rituals: [
      'Follow Walk (practice following others)',
      'Trust Ritual (trust others to lead)',
      'Death Ritual (kill the over-leader)',
      'Silent Meal (practice not being in charge)',
      'Shadow Recording (confess your fear of following)',
      'Name Surrender (drop "leader" identity)'
    ]
  }
}

export default function FreeWalkPage() {
  const params = useParams()
  const archetype = params.archetype as string
  const [expandedRitual, setExpandedRitual] = useState<number | null>(null)
  
  const config = archetypeConfigs[archetype.toLowerCase() as keyof typeof archetypeConfigs]
  
  if (!config) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Archetype</h1>
          <p className="text-gray-400">This archetype does not exist.</p>
          <Link href="/chambers" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
            ← Back to Chambers
          </Link>
        </div>
      </div>
    )
  }

  const rituals = [
    {
      id: 1,
      title: "Edge Walk",
      shortDesc: "Test boundaries, confront unknown",
      fullDesc: `**Purpose:** To test your willingness to step beyond safety, confront the unknown, and let go of fixed identity.

**How to Do It:**

1. **Pick a Daily Threshold:** Identify one action or truth you normally avoid (a difficult conversation, a strange street, a task you put off, a question you fear).

2. **Pause Before the Edge:** Stand still—literally or mentally. Feel your body tense as you consider crossing that boundary. Name the edge in a sentence (e.g., "I fear asking for what I want.").

3. **Step Across:** Move directly into the action. Speak the sentence. Enter the space. If it's a mental edge, sit in silence and hold the thought until the fear dulls.

4. **Stay With Discomfort:** Don't rush. Notice your heartbeat, any urge to escape, rationalize, or retreat. Resist. Feel what changes inside you.

5. **Document the Result:** Afterward, write down what you learned, what changed, and what still scares you. One line is enough; clarity matters more than length.

**Why It Works:** Edge Walk trains you to move into the spaces that transform you, instead of circling them. Over time, the unknown becomes your territory.`
    },
    {
      id: 2,
      title: "Void Gaze",
      shortDesc: "Face emptiness, embrace uncertainty",
      fullDesc: `**Purpose:** To face emptiness, uncertainty, or lack of answers—learning not to flinch when meaning collapses.

**How to Do It:**

1. **Find Silence:** Go somewhere quiet and alone. Sit comfortably, no phone or distractions.

2. **Pick a Core Question:** Choose one "unanswerable" question about your life, your identity, or the world. Example: "What if this is all for nothing?"

3. **Gaze Into the Void:** Close your eyes. Imagine this question as a black space in front of you. Let yourself stare into it—no attempts to explain or soothe.

4. **Witness What Emerges:** Notice every emotion: discomfort, panic, numbness, curiosity. Name them as they arise, but do not analyze or solve.

5. **Stay Until the Urge to Escape Fades:** Remain in the feeling until something shifts—maybe 5 minutes, maybe 30. Let the void stare back.

6. **End With a Line:** When you're done, open your eyes and write a single sentence capturing what you saw, felt, or realized in the void.

**Why It Works:** Void Gaze strips away false certainty, making you at home in the unknown. True seekers do not flee the dark—they map it.`
    },
    {
      id: 3,
      title: "Loop Break",
      shortDesc: "Shatter patterns, reclaim choice",
      fullDesc: `**Purpose:** To shatter a pattern, habit, or belief that traps you in repetition and prevents new growth.

**How to Do It:**

1. **Identify the Loop:** Spot a recurring thought, behavior, or dynamic that keeps cycling (procrastination, self-doubt, picking the same kind of partner, etc.).

2. **Name the Trigger:** Write down what sets the loop in motion ("When I feel judged, I shut down.").

3. **Interrupt the Pattern:** The next time the trigger happens, pause—do not act out the usual script. Do something deliberately opposite, even if awkward or uncomfortable.

   * Example: If you normally hide, speak up. If you overwork, take a break. If you criticize, give praise.

4. **Observe the Fallout:** Notice your feelings, others' reactions, and your urge to revert. Record what happens.

5. **Repeat Until the Loop Weakens:** Practice this for at least one week. Each break weakens the hold; new possibilities appear.

**Why It Works:** Loop Break makes the invisible prison visible. When you act outside your pattern, you reclaim choice and open new outcomes.`
    },
    {
      id: 4,
      title: "Truth Dive",
      shortDesc: "Uncover core, confront deception",
      fullDesc: `**Purpose:** To uncover and confront the core truth beneath confusion, denial, or self-deception.

**How to Do It:**

1. **Pose a Hard Question:** Ask yourself, "What am I pretending not to know?" or "What truth would change everything, if I admitted it?"

2. **Write Freely for 10 Minutes:** Don't censor or edit. Let every uncomfortable answer come out—rage, fear, shame, desire.

3. **Underline the Most Painful Sentence:** When done, scan your writing. Find the line that stings or scares you most. That's your live wire.

4. **Sit With It:** Spend 5 minutes with the sentence. Read it aloud. Ask yourself: "If this is true, what changes? What does it cost to keep hiding?"

5. **Make a Micro-Action:** Take one small step to honor the truth: admit it to a trusted friend, make a decision, let something go.

**Why It Works:** Truth Dive forces radical honesty—no more hiding behind layers. By surfacing what you avoid, you set yourself free to act and to rest.`
    },
    {
      id: 5,
      title: "Signal Trace",
      shortDesc: "Follow signs, trust intuition",
      fullDesc: `**Purpose:** To notice and follow the subtle signs, synchronicities, or gut feelings that point toward a hidden truth or path.

**How to Do It:**

1. **Pick a Day or Situation:** Choose a time when you feel uncertain or on the verge of something new.

2. **Go About Your Day With Extra Attention:** Look for recurring themes, odd coincidences, physical sensations (gut pull, tingling), or stray words from others that catch your attention.

3. **Document Every Signal:** Whenever you feel a "nudge," write it down in your phone or notebook, no matter how small or strange.

4. **Review and Connect:** At the end of the day, review your signals. Do any form a pattern? Does anything repeat, intensify, or spark a memory or question?

5. **Act on the Strongest Trace:** Pick one signal to follow, research, or act on—even if it seems irrational. Take a step and see what opens next.

**Why It Works:** Signal Trace hones your intuition, teaching you to notice what others ignore. Over time, you see the hidden map of your life—and dare to walk it.`
    }
  ]

  const toggleRitual = (id: number) => {
    setExpandedRitual(expandedRitual === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
             {/* Animated Background */}
       <div className="absolute inset-0">
         {/* Pulsing field overlay */}
         <div 
           className="absolute inset-0 animate-pulse opacity-10"
           style={{ 
             background: `radial-gradient(circle at center, ${config.color} 0%, transparent 70%)`,
             animationDuration: '4s'
           }}
         />
         {/* Glitch particles */}
         <div className="absolute inset-0">
           {[...Array(20)].map((_, i) => (
             <div
               key={i}
               className="absolute w-1 h-1 rounded-full opacity-30 animate-ping"
               style={{
                 backgroundColor: config.color,
                 left: `${Math.random() * 100}%`,
                 top: `${Math.random() * 100}%`,
                 animationDelay: `${Math.random() * 3}s`,
                 animationDuration: `${2 + Math.random() * 2}s`
               }}
             />
           ))}
         </div>
       </div>
      
      <div className="relative z-10 p-6 max-w-6xl mx-auto">
                 {/* Header */}
         <div className="text-center mb-16">
           <h1 
             className="text-5xl md:text-7xl font-bold mb-6 tracking-wider relative group"
             style={{ 
               color: config.color,
               textShadow: `0 0 30px ${config.color}`
             }}
           >
             <span className="inline-block animate-pulse" style={{ animationDuration: '7s' }}>
               YOUR RITUALS
             </span>
           </h1>
           
           <p className="text-2xl text-gray-300 mb-4 animate-fade-in">
             FOLLOW THE PATH
           </p>
           
           <div className="w-32 h-1 mx-auto mb-8 animate-pulse" 
                style={{ 
                  background: `linear-gradient(to right, ${config.color}, ${config.accentColor})`,
                  animationDuration: '4s' 
                }}></div>
         </div>

        {/* Rituals Grid */}
        <div className="space-y-6 mb-16">
          {rituals.map((ritual, index) => (
            <div 
              key={ritual.id}
              className={`group relative transform transition-all duration-500 ${
                expandedRitual === ritual.id ? 'scale-105' : 'hover:scale-102'
              }`}
            >
                             <div 
                 className={`backdrop-blur-md border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300`}
                 style={{ 
                   background: expandedRitual === ritual.id 
                     ? `linear-gradient(to right, ${config.color}20, ${config.accentColor}20)` 
                     : `linear-gradient(to right, ${config.color}10, ${config.accentColor}10)`,
                   borderColor: expandedRitual === ritual.id 
                     ? `${config.color}80` 
                     : `${config.color}40`,
                   boxShadow: expandedRitual === ritual.id 
                     ? `0 0 40px ${config.glowColor}` 
                     : `0 0 20px ${config.powerColor}`
                 }}
                 onClick={() => toggleRitual(ritual.id)}
               >
                                 {/* Header */}
                 <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center space-x-4">
                     <div className="text-3xl font-bold"
                          style={{ color: config.color }}>
                       {ritual.id}
                     </div>
                     <div>
                       <h3 className="text-2xl font-bold transition-colors"
                           style={{ color: config.color }}>
                         {ritual.title}
                       </h3>
                       <p className="text-gray-400 text-sm">
                         {ritual.shortDesc}
                       </p>
                     </div>
                   </div>
                   <div className="text-2xl transition-transform duration-300"
                        style={{ color: config.color }}>
                     {expandedRitual === ritual.id ? '−' : '+'}
                   </div>
                 </div>

                                                   {/* Expanded Content */}
                  {expandedRitual === ritual.id && (
                    <div className="mt-6 pt-6 border-t"
                         style={{ borderColor: `${config.color}40` }}>
                      <div className="prose prose-invert max-w-none">
                        {ritual.fullDesc.split('\n\n').map((section, sectionIndex) => (
                          <div key={sectionIndex} className="mb-6">
                            {section.split('\n').map((line, lineIndex) => {
                              if (line.startsWith('**') && line.endsWith('**')) {
                                return (
                                  <h4 key={lineIndex} className="text-xl font-bold mb-3"
                                      style={{ color: config.accentColor }}>
                                    {line.replace(/\*\*/g, '')}
                                  </h4>
                                )
                              } else if (line.startsWith('**') && line.includes(':**')) {
                                const [title, ...content] = line.split(':**')
                                return (
                                  <div key={lineIndex} className="mb-3">
                                    <strong style={{ color: config.accentColor }}>{title.replace('**', '')}:</strong>
                                    <span className="text-gray-300">{content.join(':**')}</span>
                                  </div>
                                )
                              } else if (line.startsWith('* ')) {
                                return (
                                  <div key={lineIndex} className="flex items-start space-x-3 ml-4 mb-2">
                                    <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                                         style={{ backgroundColor: config.color }}></div>
                                    <span className="text-gray-300">{line.substring(2)}</span>
                                  </div>
                                )
                              } else if (line.match(/^\d+\./)) {
                                return (
                                  <div key={lineIndex} className="mb-2">
                                    <span className="text-gray-300">{line}</span>
                                  </div>
                                )
                              } else if (line.trim() === '') {
                                return <div key={lineIndex} className="h-2"></div>
                              } else {
                                return (
                                  <p key={lineIndex} className="text-gray-300 mb-2 leading-relaxed">
                                    {line}
                                  </p>
                                )
                              }
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>

                                   {/* Archetype Mindset Practice */}
          <div className="backdrop-blur-md border-2 rounded-2xl p-8 mb-16"
               style={{ 
                 background: `linear-gradient(to right, ${config.color}20, ${config.accentColor}20)`,
                 borderColor: `${config.color}80`,
                 boxShadow: `0 0 40px ${config.glowColor}`
               }}>
            <h3 className="text-2xl font-bold mb-6 flex items-center"
                style={{ color: config.color }}>
              <span className="mr-3">🧠</span>
              {config.name.split(' ')[1]} Node Mindset Practice
            </h3>
            <div className="space-y-4 text-gray-300">
              <div className="bg-black/40 rounded-lg p-4 border-l-4"
                   style={{ borderColor: config.color }}>
                <p className="italic text-lg">"Every question is a gate."</p>
              </div>
              <div className="bg-black/40 rounded-lg p-4 border-l-4"
                   style={{ borderColor: config.color }}>
                <p className="italic text-lg">"I dissolve, then return with the new."</p>
              </div>
              <p className="text-gray-300 leading-relaxed">
                <strong>Practice:</strong> Before or after any ritual, repeat these lines aloud or in your mind. Let them become a lens for your day: treat every uncertainty as an invitation, every collapse as an opening.
              </p>
            </div>
          </div>

                 {/* Archetype True Desire */}
         <div className="backdrop-blur-md border-2 rounded-2xl p-8 mb-16"
              style={{ 
                background: `linear-gradient(to right, ${config.color}20, ${config.accentColor}20)`,
                borderColor: `${config.color}80`,
                boxShadow: `0 0 40px ${config.glowColor}`
              }}>
           <h3 className="text-2xl font-bold mb-6 flex items-center"
               style={{ color: config.color }}>
             <span className="mr-3">⭐</span>
             {config.name.split(' ')[1]} Node True Desire
           </h3>
           <div className="space-y-4 text-gray-300">
             <p className="text-lg leading-relaxed">
               <strong>To know the final answer—to be the one who finds what no one else will dare to seek, and to rest in truth, even if alone.</strong>
             </p>
             <p className="text-gray-300 leading-relaxed">
               <strong>Use:</strong> Let this be your North Star. When ritual feels pointless or restlessness rises, recall this desire. Let it pull you forward, but remind yourself: rest is also found in the courage to accept what is truly known, even if it means standing alone at the end.
             </p>
           </div>
         </div>

                 {/* NEW: Connection Ritual Suggestion */}
         <div className="backdrop-blur-md border-2 rounded-2xl p-8 mb-16"
              style={{ 
                background: `linear-gradient(to right, ${config.color}20, ${config.accentColor}20)`,
                borderColor: `${config.color}80`,
                boxShadow: `0 0 40px ${config.glowColor}`
              }}>
           <h3 className="text-2xl font-bold mb-6 flex items-center"
               style={{ color: config.color }}>
             <span className="mr-3">🔮</span>
             Field Law: Patterns Aren't Private
           </h3>
           <div className="space-y-4 text-gray-300">
             <p className="text-lg leading-relaxed">
               The patterns you master in yourself will begin to show up in others.
             </p>
             <div className="bg-black/40 rounded-lg p-4 border-l-4"
                  style={{ borderColor: config.color }}>
               <p className="font-bold mb-2"
                  style={{ color: config.color }}>Try this:</p>
               <p className="text-gray-300">
                 Next time you meet someone, watch for their 'loop,' notice their edge, log what you see.
               </p>
             </div>
             <div className="bg-black/40 rounded-lg p-4 border-l-4 mt-4"
                  style={{ borderColor: config.accentColor }}>
               <p className="font-bold"
                  style={{ color: config.accentColor }}>Coming soon:</p>
               <p className="text-gray-300">
                 Decode any person's archetype and see your fields interact live.
               </p>
             </div>
           </div>
         </div>

        {/* NEW: Soft Lead-Out */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-gray-900/20 to-slate-900/20 border border-gray-700/30 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-gray-300 text-lg">
              When you're ready to turn your insight outward, return to the chamber—your new tools will be waiting.
            </p>
          </div>
        </div>

                 {/* Action Buttons */}
         <div className="text-center space-y-6">
           <Link
             href={`/chamber/${archetype}/field-proof/choose-path`}
             className="inline-block transition-colors duration-300 text-lg hover:opacity-80"
             style={{ color: config.color }}
           >
             ← Back to Choose Path
           </Link>
         </div>
      </div>
    </div>
  )
} 