'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

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
    color: '#0d9488',
    primaryColor: '#0d9488',
    secondaryColor: '#000000',
    accentColor: '#14b8a6',
    glowColor: 'rgba(20, 184, 166, 0.5)',
    powerColor: 'rgba(20, 184, 166, 0.3)',
    description: 'Arbiter Node - The Scale',
    loop: 'Over-mediating, fear of taking sides, attachment to neutrality.',
    needs: 'Become the arbiter, make final judgments, burn the need for endless mediation.',
    rituals: [
      'Judgment Call (make a final decision, no appeal)',
      'Authority Walk (speak with final authority)',
      'Death Ritual (kill the endless mediator)',
      'Silent Meal (practice decisive presence)',
      'Shadow Recording (confess your true judgments)',
      'Name Surrender (drop "mediator" identity)'
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

export default function ChooseFieldPathPage() {
  const params = useParams()
  const archetype = params.archetype as string
  
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
              CHOOSE YOUR FIELD PATH
            </span>
          </h1>
          
          <div className="w-32 h-1 mx-auto mb-8 animate-pulse" 
               style={{ 
                 background: `linear-gradient(to right, ${config.color}, ${config.accentColor})`,
                 animationDuration: '4s' 
               }}></div>
        </div>

        {/* Field Path Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Free Field Walk */}
          <div className="group relative transform hover:scale-105 transition-all duration-500">
            <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur-md border-2 border-green-500/50 rounded-2xl p-8 h-full"
                 style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.3)' }}>
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🟢</div>
                <h2 className="text-3xl font-bold text-green-400 mb-2">Free Field Walk</h2>
                <p className="text-green-300 text-lg">*(No cost. No tricks.)*</p>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-green-400"></div>
                  <span><strong>5 Core Rituals</strong> — foundational practices for shifting your reality.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-green-400"></div>
                  <span>Step-by-step guides, designed for a 7-day field reset.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-green-400"></div>
                  <span><strong>Field Log</strong> — track your results, record synchronicities, and log events (your data helps upgrade the field system for all).</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-green-400"></div>
                  <span>Progress tracker for your ritual journey.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-green-400"></div>
                  <span>No access to advanced tests, escape rituals, or AI feedback.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-green-400"></div>
                  <span>Upgrade anytime—your ritual progress is saved.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Field Mastery Subscription */}
          <div className="group relative transform hover:scale-105 transition-all duration-500">
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-md border-2 border-purple-500/50 rounded-2xl p-8 h-full"
                 style={{ boxShadow: '0 0 40px rgba(157, 78, 221, 0.4)' }}>
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🔒</div>
                <h2 className="text-3xl font-bold text-purple-400 mb-2">Field Mastery Subscription</h2>
                <p className="text-purple-300 text-lg">*(Paid Monthly—Cancel Anytime)*</p>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-purple-400"></div>
                  <span><strong>Full Ritual Library:</strong> Access 30+ advanced, stage-specific rituals tailored to your archetype and life context.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-purple-400"></div>
                  <span><strong>One-Time Advanced Stage Test:</strong> Get a deep, AI-powered diagnostic to pinpoint your exact field stage—not just type, but the edge you're stuck on.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-purple-400"></div>
                  <span><strong>Escape Plan:</strong> Receive targeted "Stage Escape" ritual sequences—specifically designed to move you from your current level toward your final stage, faster.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-purple-400"></div>
                  <span><strong>Field Journal Pro:</strong> Secure, AI-assisted journaling—log, tag, and analyze your field events, with pattern feedback and ritual reminders.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-purple-400"></div>
                  <span><strong>Priority Support:</strong> Fast-track answers and guidance on rituals, field logs, or personal blockages from our team.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-purple-400"></div>
                  <span><strong>Archetype Chamber:</strong> Unlock an exclusive, AI-guided private chamber experience for deeper self-extraction, challenge, and upgrade.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-purple-400"></div>
                  <span><strong>Offline/Printable Ritual Guides:</strong> Download or print advanced rituals for digital-free practice and fieldwork.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-purple-400"></div>
                  <span><strong>Confidentiality & Security:</strong> Your premium logs/journals are encrypted, 100% user-owned—no data is sold or exposed.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Which Path Moves You Section */}
        <div className="bg-gradient-to-r from-gray-900/30 to-slate-900/30 backdrop-blur-md border-2 border-gray-700/50 rounded-2xl p-8 mb-16"
             style={{ boxShadow: '0 0 40px rgba(156, 163, 175, 0.2)' }}>
          <h3 className="text-2xl font-bold mb-6 text-gray-300 text-center">Which Path Moves You?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
            <div className="text-center">
              <h4 className="text-xl font-bold text-green-400 mb-3">Start Free</h4>
              <p>Try the basics, walk the field, and log your first changes.</p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-bold text-purple-400 mb-3">Go Mastery</h4>
              <p>Unlock the advanced path—break through limits, see your true stage, and walk as your future self.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href={`/chamber/${archetype}/breaker/the-path/field-proof/free-walk`}
              className="group relative inline-block px-12 py-6 rounded-2xl font-bold text-white transition-all duration-500 hover:scale-105 transform"
              style={{
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                boxShadow: '0 0 40px rgba(34, 197, 94, 0.5)'
              }}
            >
              <span className="relative z-10 flex items-center justify-center text-xl">
                <span className="mr-3">🟢</span>
                Walk for Free
              </span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
            
            <Link
              href={`/chamber/${archetype}/breaker/the-path/field-proof/field-mastery`}
              className="group relative inline-block px-12 py-6 rounded-2xl font-bold text-white transition-all duration-500 hover:scale-105 transform"
              style={{
                background: 'linear-gradient(135deg, #9D4EDD 0%, #7C3AED 50%, #EC4899 100%)',
                boxShadow: '0 0 40px rgba(157, 78, 221, 0.6)'
              }}
            >
              <span className="relative z-10 flex items-center justify-center text-xl">
                <span className="mr-3">🔒</span>
                Unlock Field Mastery
              </span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link
            href={`/chamber/${archetype}/breaker/the-path/field-proof`}
            className="inline-block transition-colors duration-300 text-lg hover:opacity-80"
            style={{ color: config.color }}
          >
            ← Back to Field Proof
          </Link>
        </div>
      </div>
    </div>
  )
} 