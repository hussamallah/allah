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

export default function FieldProofPage() {
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
              FIELD PROOF
            </span>
          </h1>
          
          <p className="text-2xl text-gray-300 mb-4 animate-fade-in">
            WHY THIS IS REAL, WHY IT WORKS
          </p>
          
          <div className="w-32 h-1 mx-auto mb-8 animate-pulse" 
               style={{ 
                 background: `linear-gradient(to right, ${config.color}, ${config.accentColor})`,
                 animationDuration: '4s' 
               }}></div>
        </div>

        {/* Section 1: You Already Know */}
        <div className="mb-16">
          <div className="backdrop-blur-md border-2 rounded-2xl p-8"
               style={{ 
                 background: `linear-gradient(to right, ${config.color}20, ${config.accentColor}20)`,
                 borderColor: `${config.color}80`,
                 boxShadow: `0 0 40px ${config.glowColor}`
               }}>
            <h2 className="text-3xl font-bold mb-6 flex items-center"
                style={{ color: config.color }}>
              <span className="mr-3">1</span>
              You Already Know the Field Exists
            </h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>You felt the test "read" you.</p>
              <p>You saw your pattern, your shadow, your possible future.</p>
              <p>You're here because something in you recognized a truth that never had words—until now.</p>
              <div className="bg-black/40 rounded-lg p-4 mt-4">
                <p className="italic">The field is not a belief system.</p>
                <p>It's what you sense when a room shifts as someone enters, when an animal responds to your mood, when timing and reality line up before your mind catches up.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: The Laws You Can't Fake */}
        <div className="mb-16">
          <div className="backdrop-blur-md border-2 rounded-2xl p-8"
               style={{ 
                 background: `linear-gradient(to right, ${config.color}20, ${config.accentColor}20)`,
                 borderColor: `${config.color}80`,
                 boxShadow: `0 0 40px ${config.glowColor}`
               }}>
            <h2 className="text-3xl font-bold mb-6 flex items-center"
                style={{ color: config.color }}>
              <span className="mr-3">2</span>
              The Laws You Can't Fake
            </h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>Ever noticed how some people end chaos just by standing there?</p>
              <p>How conflict dissolves when one presence arrives?</p>
              <p>Why the "lucky" keep winning, the "unlucky" keep looping, and every group quietly orbits its real center?</p>
              <div className="bg-black/40 rounded-lg p-4 mt-4">
                <p className="font-bold text-purple-300">This is field law, not personality or luck.</p>
                <p>This system is the map of what's already running the world—consciously or not.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: You've Felt the Proof */}
        <div className="mb-16">
          <div className="backdrop-blur-md border-2 rounded-2xl p-8"
               style={{ 
                 background: `linear-gradient(to right, ${config.color}20, ${config.accentColor}20)`,
                 borderColor: `${config.color}80`,
                 boxShadow: `0 0 40px ${config.glowColor}`
               }}>
            <h2 className="text-3xl font-bold mb-6 flex items-center"
                style={{ color: config.color }}>
              <span className="mr-3">3</span>
              You've Felt the Proof in Your Own Life
            </h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>Remember:</p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-purple-400"></div>
                  <span>When a bird or animal responded to your inner world, not your words?</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-purple-400"></div>
                  <span>When someone's energy infected a room instantly?</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-purple-400"></div>
                  <span>When you sensed an outcome before it happened?</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-purple-400"></div>
                  <span>When the right sign, call, or event hit at the perfect moment?</span>
                </li>
              </ul>
              <div className="bg-black/40 rounded-lg p-4 mt-4">
                <p className="font-bold text-purple-300">That is the field in action.</p>
                <p>The only difference between you and those who seem "legendary" is who walks this ON PURPOSE.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Field Effects Are Everywhere */}
        <div className="mb-16">
          <div className="backdrop-blur-md border-2 rounded-2xl p-8"
               style={{ 
                 background: `linear-gradient(to right, ${config.color}20, ${config.accentColor}20)`,
                 borderColor: `${config.color}80`,
                 boxShadow: `0 0 40px ${config.glowColor}`
               }}>
            <h2 className="text-3xl font-bold mb-6 flex items-center"
                style={{ color: config.color }}>
              <span className="mr-3">4</span>
              Field Effects Are Everywhere—If You Dare to Notice
            </h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>Doors open when you're aligned.</p>
              <p>Accidents and "bad luck" spike when you're off-pattern.</p>
              <p>Strangers approach or avoid, money arrives or dries up, timing snaps into place or slips—before any "positive thinking" or belief.</p>
              <div className="bg-black/40 rounded-lg p-4 mt-4">
                <p className="font-bold text-purple-300">Nothing in this system is theory.</p>
                <p>Every ritual, question, and path was built from what actually moves the world.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Real People. Real Results */}
        <div className="mb-16">
          <div className="backdrop-blur-md border-2 rounded-2xl p-8"
               style={{ 
                 background: `linear-gradient(to right, ${config.color}20, ${config.accentColor}20)`,
                 borderColor: `${config.color}80`,
                 boxShadow: `0 0 40px ${config.glowColor}`
               }}>
            <h2 className="text-3xl font-bold mb-6 flex items-center"
                style={{ color: config.color }}>
              <span className="mr-3">5</span>
              Real People. Real Results.
            </h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p className="font-bold text-purple-300">Field Walkers who finished the path say:</p>
              <div className="space-y-4">
                <div className="bg-black/40 rounded-lg p-4 border-l-4 border-purple-400">
                  <p className="italic">"I stopped being invisible. My boss, my family, even strangers feel me now. Reality bends softer, clearer, real."</p>
                </div>
                <div className="bg-black/40 rounded-lg p-4 border-l-4 border-purple-400">
                  <p className="italic">"I called for wind and it answered—three times in one day. Then, money came in out of nowhere."</p>
                </div>
                <div className="bg-black/40 rounded-lg p-4 border-l-4 border-purple-400">
                  <p className="italic">"My panic attacks stopped. Spaces that used to drain me now recharge me. I haven't had a real fight in months."</p>
                </div>
                <div className="bg-black/40 rounded-lg p-4 border-l-4 border-purple-400">
                  <p className="italic">"I took the rituals seriously. Now birds come to my window every morning. Luck follows me. Reality listens."</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Direct Challenge */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 backdrop-blur-md border-2 border-orange-500/50 rounded-2xl p-8"
               style={{ boxShadow: '0 0 40px rgba(251, 146, 60, 0.3)' }}>
            <h2 className="text-3xl font-bold mb-6 text-orange-400 flex items-center">
              <span className="mr-3">6</span>
              Direct Challenge: Try to Prove It Wrong
            </h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>For one week, do just ONE ritual.</p>
              <p>Log what changes—birds, wind, tech, money, moods, accidents, random events.</p>
              <div className="bg-black/40 rounded-lg p-4 mt-4">
                <p className="font-bold text-orange-300">If nothing shifts, walk away.</p>
                <p>If even ONE thing answers, you'll know this is not faith—it's law.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: The Final Hook */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 backdrop-blur-md border-2 border-pink-500/50 rounded-2xl p-8"
               style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.3)' }}>
            <h2 className="text-3xl font-bold mb-6 text-pink-400 flex items-center">
              <span className="mr-3">7</span>
              The Final Hook: Why Wait for Proof?
            </h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>You've already felt the field.</p>
              <p>The world is responding.</p>
              <p>Your next move, your upgrade, is ready.</p>
              <div className="bg-black/40 rounded-lg p-4 mt-4">
                <p className="font-bold text-pink-300">The field doesn't wait for doubters.</p>
                <p>Those who move, win.</p>
              </div>
            </div>
          </div>
        </div>

        {/* NEW: Transitional Insight Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-md border-2 border-purple-500/50 rounded-2xl p-8"
               style={{ boxShadow: '0 0 40px rgba(157, 78, 221, 0.3)' }}>
            <h2 className="text-3xl font-bold mb-6 text-purple-400 flex items-center">
              <span className="mr-3">8</span>
              Field Effects Aren't Isolated
            </h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>As you see these laws work for you, notice:</p>
              <p><strong>Patterns aren't private.</strong></p>
              <p>Every field you touch—family, love, business, conflict—mirrors your archetype and calls out the patterns of others.</p>
              <div className="bg-black/40 rounded-lg p-4 mt-4">
                <p className="font-bold text-purple-300">Field effects aren't isolated.</p>
                <p>The same law that turns your emptiness to truth can reveal the hidden needs of others. You're not just a Seeker for yourself—the world is your field.</p>
              </div>
            </div>
          </div>
        </div>

        {/* NEW: Sneak Preview Block */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-gray-900/30 to-slate-900/30 backdrop-blur-md border-2 border-gray-700/50 rounded-2xl p-8"
               style={{ boxShadow: '0 0 40px rgba(156, 163, 175, 0.3)' }}>
            <h2 className="text-2xl font-bold mb-6 text-gray-300 flex items-center">
              <span className="mr-3">🔮</span>
              Curious what pattern your partner, boss, or enemy walks?
            </h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>Field decoding lets you see <em>their</em> chamber, too.</p>
              <p>Understand their loop, their edge, their true desire—and how your fields interact.</p>
              <div className="bg-black/40 rounded-lg p-4 mt-4 border-l-4 border-purple-400">
                <p className="font-bold text-purple-300">Coming Soon:</p>
                <p>Decode any person's archetype and see your fields interact live.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-16">
          <div className="border rounded-2xl p-8 backdrop-blur-sm mb-8"
               style={{
                 background: `linear-gradient(to right, ${config.color}10, ${config.accentColor}10)`,
                 borderColor: `${config.color}40`
               }}>
            <p className="text-2xl font-bold mb-4"
               style={{ color: config.color }}>
              → Ready to claim your field?
            </p>
            <p className="text-gray-300 text-lg mb-6">
              Walk forward. Prove it yourself. Become law.
            </p>
          </div>
          
          <Link
            href={`/chamber/${archetype}/field-proof/choose-path`}
            className="group relative inline-block px-16 py-8 rounded-3xl font-bold text-white transition-all duration-700 hover:scale-110 transform"
            style={{
              background: `linear-gradient(135deg, ${config.color} 0%, ${config.accentColor} 50%, ${config.color} 100%)`,
              boxShadow: `0 0 60px ${config.glowColor}`
            }}
          >
            <span className="relative z-10 flex items-center justify-center text-2xl">
              <span className="mr-4 text-3xl animate-pulse">⚡</span>
              START NOW
            </span>
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                 style={{ background: `linear-gradient(to right, ${config.color}, ${config.accentColor})` }}></div>
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 animate-pulse"
                 style={{ background: `linear-gradient(to right, ${config.color}, ${config.accentColor})` }}></div>
          </Link>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link
            href={`/chamber/${archetype}`}
            className="inline-block transition-colors duration-300 text-lg hover:opacity-80"
            style={{ color: config.color }}
          >
            ← Back to Chamber
          </Link>
        </div>
      </div>
    </div>
  )
} 