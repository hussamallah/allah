'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'


const archetypeConfigs = {
  seeker: {
    name: '🧠 SEEKER',
    color: '#4c1d95',
    primaryColor: '#4c1d95',
    secondaryColor: '#000000',
    accentColor: '#7c3aed',
    glowColor: 'rgba(124, 58, 237, 0.5)',
    powerColor: 'rgba(124, 58, 237, 0.3)',
    emoji: '🧠',
    youNow: `You are the edge-walker, the one who never stops questioning, breaking loops, or searching for the next signal.
You spot patterns that others miss, find the cracks in every story, and dissolve illusions—sometimes even your own.

You don't fear emptiness. You know how to vanish, to pause, to slip between the lines until truth appears.
But sometimes, you're exhausted. Sometimes, you wonder if the search is just another cage—if the endless seeking is what's keeping you from finally arriving.

You are sharp, restless, and ready to break any false comfort. But you ache for a moment when the answers stop running away.`,
    yourFuture: `You feel peace that isn't boring—a true end to restlessness.
Your mind finally stops spinning with unfinished questions.
Answers land, and you get to savor discovery without anxiety.
You feel content, not empty, in stillness.
You gain clarity and a sense of having arrived.
You trust yourself not to miss what matters.`
  },
  guardian: {
    name: '🛡️ GUARDIAN',
    color: '#1e3a8a',
    primaryColor: '#1e3a8a',
    secondaryColor: '#000000',
    accentColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    powerColor: 'rgba(59, 130, 246, 0.3)',
    emoji: '🛡️',
    youNow: `You are the wall—the one others lean on, consciously or not.
You hold chaos at bay. You protect, you contain, you keep the world from cracking when the storm hits.
You rarely get the credit, but you get the weight. You're the first to step in, the last to give up, and the one who remembers every broken promise or boundary.

But all that holding can harden you. Sometimes, you grip so tightly that nothing new can enter—not even the help or relief you need. You worry that if you ever stop guarding, everything will fall apart.
You know what it's like to feel alone, even surrounded by people you protect.`,
    yourFuture: `You finally feel safe—able to relax without fear the world will collapse.
You enjoy real rest, not just vigilance.
You trust your own boundaries, so you let yourself receive.
You gain relief from responsibility—your body and mind lighten.
Your strength turns into inner freedom, not just outer stability.
You get to feel protected, too.`
  },
  spotlight: {
    name: '🌟 SPOTLIGHT',
    color: '#f59e0b',
    primaryColor: '#f59e0b',
    secondaryColor: '#000000',
    accentColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.5)',
    powerColor: 'rgba(251, 191, 36, 0.3)',
    emoji: '🌟',
    youNow: `You're the one who lights up the room—even when you're not trying. People turn when you speak, shift when you enter, and adjust when you withdraw.
You're not performing, you're translating energy into action. You sense what others need to see or hear and know how to give it, almost without thinking.
You bounce back from setbacks and criticism—your field is built for endurance. You know how to draw attention, but also how to step out of the glare when it gets too much.

But there's a cost: sometimes, the applause becomes a need. Sometimes, you do things just to be seen. You don't always show the world the real ache behind your spotlight, and you wonder if you'd still be noticed if you stopped shining.`,
    yourFuture: `You become truly magnetic—attention finds you, but you never have to chase it.
You experience ease instead of pressure.
You feel at home in your own skin, whether eyes are on you or not.
Your self-worth stabilizes; you no longer need applause to feel solid.
You enjoy expressing yourself without anxiety, and your presence alone is enough.
Being "seen" feels like nourishment, not a test.`
  },
  rebel: {
    name: '⚔️ REBEL',
    color: '#dc2626',
    primaryColor: '#dc2626',
    secondaryColor: '#000000',
    accentColor: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    powerColor: 'rgba(239, 68, 68, 0.3)',
    emoji: '⚔️',
    youNow: `You are the disruptor, the fire-starter, the one who refuses to be caged by stale rules.
You spot what's broken, push against limits, and crave the spark that comes from shaking things up.
You hate fake order, and you'd rather risk chaos than sit in silence.
But sometimes, you burn bridges you need.
You can get lost in fighting everything, even when it costs you peace, belonging, or progress.`,
    yourFuture: `You feel total freedom—but with direction, not just friction.
You stop fighting for the sake of it; your energy fuels true change, not just endless rebellion.
You get the satisfaction of moving on your terms, building what you want, destroying only what no longer serves.
Rest comes easier; you feel powerful, not just defiant.
You trust your own rules and live them.`
  },
  provider: {
    name: '🛒 PROVIDER',
    color: '#059669',
    primaryColor: '#059669',
    secondaryColor: '#000000',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    powerColor: 'rgba(16, 185, 129, 0.3)',
    emoji: '🛒',
    youNow: `You are the giver, the sustainer, the one who feeds, supports, and holds everyone else together.
You sense what's needed before it's said, and you step up.
Your care is steady, often invisible, sometimes taken for granted.
But you keep giving, even when it costs you.
Your well can run dry; you can forget to care for yourself in the process.`,
    yourFuture: `You feel nourished while nourishing others.
Your giving becomes a source of strength, not depletion.
You know how to receive, refill, and set boundaries without guilt.
You take pleasure in your generosity and feel valued—even when you rest or say no.
You trust that you are enough, even when you're not needed.`
  },
  // Add other archetypes as needed - keeping this concise for now
  // The key is that spotlight is now included and the page will work
  equalizer: {
    name: '⚖️ EQUALIZER',
    color: '#7c3aed',
    primaryColor: '#7c3aed',
    secondaryColor: '#000000',
    accentColor: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.5)',
    powerColor: 'rgba(139, 92, 246, 0.3)',
    emoji: '⚖️',
    youNow: `You're the balance point in any room—the one who can sense tension, see all sides, and bring people or situations back into harmony.
You're driven to fix what's unfair, to smooth conflict, and to make things right.
But sometimes, you lose yourself in the effort to keep things even.
You avoid hard choices to keep the peace, and your own needs get sidelined in the process.`,
    yourFuture: `You finally experience inner balance—not just outer peace.
You trust your own sense of fairness and act on it, even when it's uncomfortable.
You gain courage to choose sides when it matters, without guilt or second-guessing.
You feel solid inside; your opinions and feelings count, too.
Life feels fair because you include yourself in the equation.`
  },
  visionary: {
    name: '🔮 VISIONARY',
    color: '#8b5cf6',
    primaryColor: '#8b5cf6',
    secondaryColor: '#000000',
    accentColor: '#a78bfa',
    glowColor: 'rgba(167, 139, 250, 0.5)',
    powerColor: 'rgba(167, 139, 250, 0.3)',
    emoji: '🔮',
    youNow: `You live a step ahead of everyone else—ideas arrive before events, and you see possibilities long before the world is ready.
You predict trends, notice shifts, and often feel like you're walking in a timeline no one else can see.
Your imagination is relentless; you can't help but connect dots, invent futures, or question the status quo.
But you struggle to stay grounded in the present.
Your vision sometimes feels like a burden—restless, misunderstood, or lonely when others don't keep up.`,
    yourFuture: `You get to feel settled in your genius.
Your ideas become real, not just dreams—you finish things, not just imagine them.
You experience flow instead of friction, trusting your foresight and acting on it with confidence.
You feel recognized, not isolated; your clarity is a gift you enjoy for yourself.
You relax into your own timeline, finally at peace with the pace of your mind.`
  },
  wanderer: {
    name: '🧭 WANDERER',
    color: '#0891b2',
    primaryColor: '#0891b2',
    secondaryColor: '#000000',
    accentColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.5)',
    powerColor: 'rgba(6, 182, 212, 0.3)',
    emoji: '🧭',
    youNow: `You're the one who never stands still.
Movement is your nature—physical, mental, or emotional.
You shift jobs, homes, identities, ideas, seeking the next experience, the next truth, the next place that feels right.
You're comfortable with change, unafraid to let go, and always ready for the unknown.
But sometimes, you wonder if you're running from something, not just running toward it.
Rootlessness can feel like freedom… or like something's missing.`,
    yourFuture: `You finally feel at home in yourself—wherever you go.
Your restlessness turns into a sense of adventure, not escape.
You enjoy landing, not just leaving.
You gain deep satisfaction from arriving, building, and staying when you choose.
You keep your sense of possibility, but you also feel anchored and whole, not scattered or lost.`
  },
  servant: {
    name: '🤲 SERVANT',
    color: '#065f46',
    primaryColor: '#065f46',
    secondaryColor: '#000000',
    accentColor: '#059669',
    glowColor: 'rgba(5, 150, 105, 0.5)',
    powerColor: 'rgba(5, 150, 105, 0.3)',
    emoji: '🤲',
    youNow: `You carry the weight no one else wants.
You see what needs fixing, what needs holding together, and you do it—often without being asked.
You're the helper, the supporter, the one who fills gaps and makes sure nothing falls apart.
But you give past your limit.
Your care can become invisible; your own needs often get ignored, even by you.`,
    yourFuture: `You experience fullness, not depletion.
Helping others feels energizing, not exhausting.
You know when to stop, set limits, and say no—without guilt.
You take pride in service but feel seen and valued, even when you rest.
You enjoy your own strength, not just what you provide for others.`
  },
  mask: {
    name: '🎭 MASK',
    color: '#6366f1',
    primaryColor: '#6366f1',
    secondaryColor: '#000000',
    accentColor: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.5)',
    powerColor: 'rgba(139, 92, 246, 0.3)',
    emoji: '🎭',
    youNow: `You're the shapeshifter, the social chameleon, the one who can read a room and become whatever's needed to thrive.
You blend in or stand out on command.
Your awareness is your armor, and you know how to survive by adapting.
But sometimes, you forget who you are behind the roles.
You worry you're only as real as your last performance; you wonder if anyone sees the true you.`,
    yourFuture: `You feel solid in your own identity, no matter what mask you wear.
You gain confidence to drop the act when you want—showing up as your real self without fear.
You use your adaptability as a tool, not a shield.
You stop losing yourself in the performance; you enjoy authenticity and intimacy on your terms.
You get the safety of being fully known, first to yourself.`
  },
  partner: {
    name: '🤝 PARTNER',
    color: '#e11d48',
    primaryColor: '#e11d48',
    secondaryColor: '#000000',
    accentColor: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.5)',
    powerColor: 'rgba(244, 63, 94, 0.3)',
    emoji: '🤝',
    youNow: `You're the one who always knows how to connect—sometimes so deeply, you lose track of where you end and others begin.
You read the emotional weather, reflect feelings back, and build harmony even in chaos.
You long for closeness, and you're a master at creating it, sensing every subtle shift in mood or distance.
But sometimes, your focus on others means you fade out.
You've adapted to be whatever's needed—sometimes at the cost of your own center.
You wonder: if you stopped mirroring, would you still feel loved?`,
    yourFuture: `You experience unshakeable belonging—not because you match others, but because you finally feel at home inside yourself.
Connection becomes a choice, not a need.
You maintain your identity, even while loving deeply.
Your boundaries become clear; relationships feel nourishing, not draining.
You get to feel loved for your real self, not just the version that adapts.`
  },
  sovereign: {
    name: '👑 SOVEREIGN',
    color: '#f59e0b',
    primaryColor: '#f59e0b',
    secondaryColor: '#000000',
    accentColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.5)',
    powerColor: 'rgba(251, 191, 36, 0.3)',
    emoji: '👑',
    youNow: `You carry the natural weight of authority—whether you want it or not.
You set the tone, draw boundaries, and hold power in ways others sense instinctively.
You are decisive, reliable, and often the backbone of your world.
But you can feel alone at the top, rigid in your rules, or afraid to reveal weakness.
Sometimes, the crown is heavy—leadership costs you more than it rewards.`,
    yourFuture: `You feel ease and confidence in your authority.
Leadership no longer feels lonely or exhausting; you enjoy the power you hold.
You trust yourself to be flexible, to listen, and to adapt without losing your center.
Your crown becomes a comfort, not a burden.
You experience both respect and real connection—being seen, valued, and supported as you are.`
  }
}

export default function ExploreWhoYouArePage() {
  const params = useParams()
  const router = useRouter()
  const archetype = params.archetype as string
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(true)
  const [pageStartTime] = useState(Date.now())
  const [isClient, setIsClient] = useState(false)

  // Handle hydration issues caused by browser extensions
  useEffect(() => {
    setIsClient(true)
    console.log('Page loaded:', archetype)
    
    return () => {
      const timeSpent = Math.floor((Date.now() - pageStartTime) / 1000)
      console.log('Time spent on page:', timeSpent, 'seconds')
    }
  }, [archetype, pageStartTime])

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return

    setIsSubmitting(true)
    try {
      const userId = localStorage.getItem('user_tracking_id')
      // At this point, archetype and testResults are always completed
      await fetch('/api/war-room/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          archetype: archetype,
          testResults: { completed: true },
          userId: userId
        })
      })
      setIsSubmitted(true)
      setEmail('')
      setShowEmailModal(false)
    } catch (error) {}
    finally { setIsSubmitting(false) }
  }
  
  if (!archetype || !(archetype.toLowerCase() in archetypeConfigs)) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Archetype</h1>
          <p className="text-gray-400">The archetype "{archetype}" was not found.</p>
          <Link href="/chambers" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
            ← Back to Chambers
          </Link>
        </div>
      </div>
    )
  }

  const config = archetypeConfigs[archetype.toLowerCase() as keyof typeof archetypeConfigs]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 animate-pulse opacity-10"
          style={{ 
            background: `radial-gradient(circle at center, ${config.color} 0%, transparent 70%)`,
            animationDuration: '4s'
          }}
        />
      </div>
      
      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-8xl mb-6 animate-pulse" style={{ 
            animationDuration: '3s',
            filter: `drop-shadow(0 0 20px ${config.color})`
          }}>
            {config.emoji}
          </div>
          
          <h1 
            className="text-5xl md:text-7xl font-bold mb-6 tracking-wider relative group"
            style={{ 
              color: config.color,
              textShadow: `0 0 30px ${config.color}`
            }}
          >
            <span className="inline-block animate-pulse" style={{ animationDuration: '7s' }}>
              {config.name} — WHO YOU ARE
            </span>
          </h1>
          
          <p className="text-2xl text-gray-300 mb-4 animate-fade-in">
            Deep dive into your core identity and understand your true nature
          </p>
          
          <div className="w-32 h-1 mx-auto mb-8 animate-pulse" 
               style={{ 
                 background: `linear-gradient(to right, ${config.color}, ${config.accentColor})`,
                 animationDuration: '4s' 
               }}></div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* You Now Section */}
          <div className="bg-gradient-to-r from-gray-900/20 to-gray-800/20 border rounded-2xl p-8 backdrop-blur-sm mb-8"
               style={{ 
                 borderColor: `${config.color}30`,
                 boxShadow: `0 0 40px ${config.glowColor}`
               }}>
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: config.color }}>
              You Now
            </h2>
            <div className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
              {config.youNow}
            </div>
          </div>

          {/* Your Future Section */}
          <div className="bg-gradient-to-r from-gray-900/20 to-gray-800/20 border rounded-2xl p-8 backdrop-blur-sm mb-8"
               style={{ 
                 borderColor: `${config.accentColor}30`,
                 boxShadow: `0 0 40px ${config.powerColor}`
               }}>
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: config.accentColor }}>
              Your Future (What You Get)
            </h2>
            <div className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
              {config.yourFuture}
            </div>
          </div>

          {/* Future Self Card */}
          <Link href={`/chamber/${archetype}/who-you-are`} className="block mb-8" onClick={() => console.log('Future Self clicked!', archetype)}>
            <div className="group relative transform hover:scale-105 transition-all duration-500 cursor-pointer z-10">
              <div className="bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-md border-2 rounded-2xl p-8 hover:border-opacity-70 transition-all duration-300"
                   style={{ 
                     borderColor: `${config.color}50`,
                     boxShadow: `0 0 40px ${config.glowColor}`
                   }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold group-hover:text-opacity-80 transition-colors" style={{ color: config.color }}>
                    🔮 FUTURE SELF
                  </h3>
                  <div className="text-3xl animate-pulse">{config.emoji}</div>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  Click to unlock your complete future self transformation and discover what happens when you fully embody your archetype's power.
                </p>
                <div className="text-center">
                  <span className="text-lg font-medium group-hover:text-opacity-80 transition-colors inline-flex items-center" style={{ color: config.color }}>
                    <span className="mr-2">🚀</span>
                    Unlock Your Future Self →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Debug Test Button */}
        <div className="text-center mt-8 mb-4">
          <button 
            onClick={() => alert('React is working! Button clicked.')}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            🧪 Test Button (Click to verify React works)
          </button>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <Link
            href="/chambers"
            className="inline-block text-gray-400 hover:text-white transition-colors duration-300"
          >
            ← Back to All Chambers
          </Link>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <div className="relative z-10 bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md border-2 rounded-3xl p-8 mx-4 max-w-lg w-full"
               style={{ 
                 borderColor: `${config.color}40`,
                 boxShadow: `0 0 60px ${config.glowColor}`
               }}>
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="absolute top-4 left-4 text-gray-400 hover:text-white text-lg transition-colors flex items-center"
            >
              ← Back
            </button>
            
            {/* Modal Header */}
            <div className="text-center mb-6 mt-8">
              <div className="text-4xl mb-4" style={{ filter: `drop-shadow(0 0 20px ${config.color})` }}>
                {config.emoji}
              </div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: config.color }}>
                Enter your email to save your complete results and unlock access to:
              </h2>
            </div>
            
            {/* Benefits List */}
            <div className="text-gray-300 text-lg leading-relaxed mb-6 space-y-3">
              <div className="flex items-start">
                <span className="text-xl mr-3" style={{ color: config.color }}>–</span>
                <span>Your full "Who You Are Now" analysis</span>
              </div>
              <div className="flex items-start">
                <span className="text-xl mr-3" style={{ color: config.color }}>–</span>
                <span>Your possible future if you follow the system</span>
              </div>
            </div>
            
            <p className="text-gray-400 text-center mb-6">
              You've already done the work—save your results and see what's possible.
            </p>
            
            {/* Email Form */}
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-6 py-4 bg-gray-900/50 border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300"
                  style={{ 
                    borderColor: `${config.color}30`
                  }}
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="w-full px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ 
                  backgroundColor: config.color,
                  color: 'white',
                  boxShadow: `0 0 20px ${config.glowColor}`
                }}
              >
                {isSubmitting ? 'Saving Results...' : 'Save My Results'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}