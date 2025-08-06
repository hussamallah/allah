import { Archetype } from './index'

export const partnerArchetype: Archetype = {
  key: "partner",
  name: "Partner",
  color: "#e11d48",
  accentColor: "#ec4899",
  glowColor: "rgba(225, 29, 72, 0.5)",
  description: "Connection Node - The Living Bridge",
  loop: "Endless mediating, never fully connecting, fear of division.",
  needs: "Stop mediating, become the bridge, let harmony flow through you, burn the need to resolve every conflict.",
  
  stages: [
    {
      key: "pleaser",
      label: "The Pleaser",
      color: "#dc2626",
      description: "Says yes to everyone, fears conflict, loses self in others' needs.",
      needs: "Stop saying yes to everything, learn to set boundaries, find your own voice.",
      questions: [
        {
          id: "p1",
          text: "When a friend needs you, your first reaction is...",
          options: [
            { text: "Only agree if it fits your priorities", value: 5 },
            { text: "Say \"yes\" before thinking about your own needs", value: 1 },
            { text: "Try to find a compromise", value: 3 },
            { text: "Set limits if you're busy", value: 4 },
            { text: "Offer support, but silently hope it's quick", value: 2 }
          ]
        },
        {
          id: "p2",
          text: "If someone is unhappy with you, you…",
          options: [
            { text: "Apologize right away, even if unsure why", value: 1 },
            { text: "Try to fix it instantly", value: 2 },
            { text: "Accept it, but only change if you agree", value: 5 },
            { text: "Explain your side, then let it go", value: 3 },
            { text: "Ask what would help, but don't lose yourself", value: 4 }
          ]
        },
        {
          id: "p3",
          text: "When you sense conflict, you…",
          options: [
            { text: "Let it play out unless it's yours to solve", value: 5 },
            { text: "Avoid it at all costs", value: 1 },
            { text: "Try to calm everyone, even at your own expense", value: 3 },
            { text: "Step in and smooth things over, but feel anxious", value: 2 },
            { text: "Address it honestly, then move on", value: 4 }
          ]
        },
        {
          id: "p4",
          text: "When someone pushes your boundaries, you…",
          options: [
            { text: "Stay silent and hope it stops", value: 1 },
            { text: "Give in, but feel resentful", value: 3 },
            { text: "Say \"no\" with an explanation", value: 4 },
            { text: "Hint that you're uncomfortable", value: 2 },
            { text: "Directly and firmly hold your ground", value: 5 }
          ]
        },
        {
          id: "p5",
          text: "Your biggest fear in relationships is…",
          options: [
            { text: "Not being liked", value: 1 },
            { text: "Deep loyalty through struggle", value: 2 },
            { text: "Hurting someone's feelings", value: 3 },
            { text: "Not being truly understood", value: 4 },
            { text: "Losing your independence", value: 5 }
          ]
        }
      ]
    },
    {
      key: "mirror",
      label: "The Mirror",
      color: "#ef4444",
      description: "Reflects others perfectly, adapts to match their energy, loses authentic self.",
      needs: "Stop mirroring, find your own voice, be authentic even when it disrupts harmony.",
      questions: [
        {
          id: "m1",
          text: "When meeting someone new, you…",
          options: [
            { text: "Express yourself regardless of reaction", value: 5 },
            { text: "Mirror their language to build trust", value: 2 },
            { text: "Lose your own perspective if they're intense", value: 1 },
            { text: "Stay yourself, but adapt your tone", value: 4 },
            { text: "Share a piece of yourself, then reflect theirs", value: 3 }
          ]
        },
        {
          id: "m2",
          text: "In group conversations, you…",
          options: [
            { text: "Echo others' feelings to keep harmony", value: 2 },
            { text: "Add perspective but hold your ground", value: 4 },
            { text: "Offer affirmation but challenge when needed", value: 3 },
            { text: "Stay neutral, letting others set the pace", value: 1 },
            { text: "Say what you truly feel, even if it disrupts", value: 5 }
          ]
        },
        {
          id: "m3",
          text: "When someone is upset with you, you…",
          options: [
            { text: "Let them vent, then process alone", value: 3 },
            { text: "Invite them to share, but don't take it personally", value: 5 },
            { text: "Immediately apologize, even if you don't understand", value: 1 },
            { text: "Adjust your mood to match theirs", value: 2 },
            { text: "Validate their feeling, then return to your truth", value: 4 }
          ]
        },
        {
          id: "m4",
          text: "In relationships, you feel most yourself when…",
          options: [
            { text: "Both of you can be honest", value: 5 },
            { text: "You can share opinions, even if they differ", value: 4 },
            { text: "There's laughter and play", value: 3 },
            { text: "The other person is happy", value: 2 },
            { text: "There's no conflict at all", value: 1 }
          ]
        },
        {
          id: "m5",
          text: "When you're misunderstood, you…",
          options: [
            { text: "Accept not everyone will see you", value: 5 },
            { text: "Gently hold your position", value: 4 },
            { text: "Change your stance to fit theirs", value: 1 },
            { text: "Stay quiet and let it go", value: 2 },
            { text: "Clarify with kindness", value: 3 }
          ]
        }
      ]
    },
    {
      key: "connector",
      label: "The Connector",
      color: "#f97316",
      description: "Bridges people together, mediates conflicts, creates harmony between different energies.",
      needs: "Stop mediating every conflict, let others resolve their own tensions, focus on authentic connection.",
      questions: [
        {
          id: "c1",
          text: "In a partnership, your role is usually…",
          options: [
            { text: "Heart of honesty", value: 5 },
            { text: "Mediator, resolving tension", value: 4 },
            { text: "Chameleon, adapting to each person", value: 1 },
            { text: "Supporter behind the scenes", value: 2 },
            { text: "Bridge between people", value: 3 }
          ]
        },
        {
          id: "c2",
          text: "When you're needed by many, you…",
          options: [
            { text: "Prioritize those who matter most", value: 5 },
            { text: "Give what you can, then rest", value: 3 },
            { text: "Try to help, but set boundaries", value: 4 },
            { text: "Feel anxious but stay available", value: 2 },
            { text: "Spread yourself too thin", value: 1 }
          ]
        },
        {
          id: "c3",
          text: "The healthiest connection feels like…",
          options: [
            { text: "Constant negotiation and balance", value: 3 },
            { text: "Mutual encouragement and growth", value: 4 },
            { text: "Endless harmony, never challenged", value: 1 },
            { text: "Space for laughter and rest", value: 2 },
            { text: "An open, honest team", value: 5 }
          ]
        },
        {
          id: "c4",
          text: "In conflict, your instinct is to…",
          options: [
            { text: "Speak up for your own need", value: 5 },
            { text: "Encourage honest conversation", value: 4 },
            { text: "Do what it takes to make peace", value: 1 },
            { text: "Seek the root cause, but remain neutral", value: 3 },
            { text: "Withdraw until emotions pass", value: 2 }
          ]
        },
        {
          id: "c5",
          text: "Your greatest strength in relationships is…",
          options: [
            { text: "Naming the truth gently", value: 4 },
            { text: "Empathy, even when it hurts", value: 3 },
            { text: "Avoiding open conflict", value: 1 },
            { text: "Creating honest, open space", value: 5 },
            { text: "Willingness to adapt", value: 2 }
          ]
        }
      ]
    },
    {
      key: "resonator",
      label: "The Resonator",
      color: "#ea580c",
      description: "Deeply feels others' emotions, creates emotional harmony, risks losing boundaries.",
      needs: "Maintain emotional boundaries, resonate without merging, stay whole while connecting deeply.",
      questions: [
        {
          id: "r1",
          text: "When a partner is down, you…",
          options: [
            { text: "Let them process alone if needed", value: 5 },
            { text: "Cheer them up, but don't absorb it", value: 4 },
            { text: "Feel their sadness and carry it", value: 3 },
            { text: "Mirror their feelings, then return to self", value: 2 },
            { text: "Become withdrawn yourself", value: 1 }
          ]
        },
        {
          id: "r2",
          text: "The deepest joy in partnership is…",
          options: [
            { text: "Never arguing", value: 1 },
            { text: "Avoiding all drama", value: 2 },
            { text: "Complete attunement to the other", value: 3 },
            { text: "When both can support each other", value: 4 },
            { text: "Sharing growth and setbacks openly", value: 5 }
          ]
        },
        {
          id: "r3",
          text: "When you're out of sync, you…",
          options: [
            { text: "Name it and work to reconnect", value: 5 },
            { text: "Remain patient but honest", value: 4 },
            { text: "Adjust your mood to fit theirs", value: 3 },
            { text: "Try to fix it instantly", value: 2 },
            { text: "Withdraw and hope it resolves", value: 1 }
          ]
        },
        {
          id: "r4",
          text: "If your needs aren't met, you…",
          options: [
            { text: "State them with care", value: 5 },
            { text: "Re-negotiate honestly", value: 4 },
            { text: "Accept it quietly for a while", value: 3 },
            { text: "Drop hints, hoping for change", value: 2 },
            { text: "Suppress them for the sake of peace", value: 1 }
          ]
        },
        {
          id: "r5",
          text: "A healthy partnership looks like…",
          options: [
            { text: "Taking turns supporting each other", value: 3 },
            { text: "Routine, predictable peace", value: 2 },
            { text: "Deep sharing, even in tough times", value: 4 },
            { text: "Both people leading and following", value: 5 },
            { text: "One always giving, one always taking", value: 1 }
          ]
        }
      ]
    },
    {
      key: "union",
      label: "The Union",
      color: "#c2410c",
      description: "Achieves true partnership, two wholes uniting, authentic connection with boundaries.",
      needs: "You have arrived. Continue building authentic partnerships that honor both individuals.",
      questions: [
        {
          id: "u1",
          text: "Your highest vision for connection is…",
          options: [
            { text: "Having total trust", value: 3 },
            { text: "Deep loyalty through struggle", value: 2 },
            { text: "Merging without losing self", value: 4 },
            { text: "Doing everything together, always", value: 1 },
            { text: "Interdependence, not co-dependence", value: 5 }
          ]
        },
        {
          id: "u2",
          text: "If you and a partner disagree, you…",
          options: [
            { text: "Seek to understand, then be understood", value: 5 },
            { text: "Hold your position, but listen", value: 4 },
            { text: "Compromise if it's fair", value: 3 },
            { text: "Keep your needs private", value: 2 },
            { text: "Let them have their way to keep peace", value: 1 }
          ]
        },
        {
          id: "u3",
          text: "When both of you are thriving, you feel…",
          options: [
            { text: "Slightly anxious it won't last", value: 1 },
            { text: "Responsible for their happiness", value: 2 },
            { text: "Safe to grow apart and together", value: 3 },
            { text: "Like partners, not opposites", value: 4 },
            { text: "An expansive, shared future", value: 5 }
          ]
        },
        {
          id: "u4",
          text: "What's most sacred in union?",
          options: [
            { text: "Trust that isn't shaken by storms", value: 5 },
            { text: "Protecting each other at all costs", value: 2 },
            { text: "Never lying to each other", value: 3 },
            { text: "Always being together", value: 1 },
            { text: "Growth, not comfort", value: 4 }
          ]
        },
        {
          id: "u5",
          text: "The real sign of \"union\" is…",
          options: [
            { text: "Support, not control", value: 3 },
            { text: "Never having to explain yourself", value: 2 },
            { text: "Oneness, even at the cost of self", value: 1 },
            { text: "You can disagree and still connect", value: 4 },
            { text: "You're both growing and free", value: 5 }
          ]
        }
      ]
    }
  ],

  diagnosis: {
    pleaser: {
      pleaser: {
        title: "Stage: The Pleaser | Mask: The Pleaser",
        diagnosis: "You say yes to everyone and everything. Your boundaries are porous, your needs invisible. Until you learn to say no, you'll never know what yes truly means.",
        reality: "You're stuck in a cycle of people-pleasing, losing yourself in others' needs.",
        tension: "The tension between wanting to help and needing to protect yourself.",
        lawToWalk: "Learn to say no. Your yes has no power until your no is respected.",
        ifYouStay: "You'll burn out, become resentful, and lose all sense of self.",
        ifYouAct: "You'll discover what you truly want and build authentic relationships."
      },
      mirror: {
        title: "Stage: The Pleaser | Mask: The Mirror",
        diagnosis: "You please by becoming what others want. Your reflection is perfect, but your face is borrowed. Stop mirroring and start being.",
        reality: "You're a pleaser who adapts by mirroring others' expectations.",
        tension: "The tension between being what others want and being who you are.",
        lawToWalk: "Stop mirroring. Your authentic self is more valuable than perfect reflection.",
        ifYouStay: "You'll lose all sense of identity and become a chameleon.",
        ifYouAct: "You'll discover your true voice and build genuine connections."
      },
      connector: {
        title: "Stage: The Pleaser | Mask: The Connector",
        diagnosis: "You try to connect by pleasing everyone. But true connection requires boundaries, not endless accommodation. Learn to bridge without losing yourself.",
        reality: "You're a pleaser who tries to connect by mediating everyone's needs.",
        tension: "The tension between wanting to connect and needing to protect yourself.",
        lawToWalk: "Connect from your center, not from your need to please.",
        ifYouStay: "You'll become exhausted and resentful of the very connections you seek.",
        ifYouAct: "You'll build authentic relationships based on mutual respect."
      },
      resonator: {
        title: "Stage: The Pleaser | Mask: The Resonator",
        diagnosis: "You resonate with everyone's needs but lose your own frequency. Your harmony is beautiful but hollow. Find your own note first.",
        reality: "You're a pleaser who deeply feels others' emotions but ignores your own.",
        tension: "The tension between feeling others deeply and honoring your own feelings.",
        lawToWalk: "Resonate from your own frequency, not from others' needs.",
        ifYouStay: "You'll become emotionally drained and lose your sense of self.",
        ifYouAct: "You'll create genuine emotional harmony that includes your own needs."
      },
      union: {
        title: "Stage: The Pleaser | Mask: The Union",
        diagnosis: "You long for true union but arrive empty-handed. Real partnership requires two whole people, not one who gives everything away.",
        reality: "You're a pleaser who wants deep partnership but has nothing left to give.",
        tension: "The tension between wanting union and having no self to unite.",
        lawToWalk: "Fill yourself first. Union requires two wholes, not one empty vessel.",
        ifYouStay: "You'll attract partners who take advantage of your giving nature.",
        ifYouAct: "You'll build partnerships based on mutual wholeness and respect."
      }
    },
    mirror: {
      pleaser: {
        title: "Stage: The Mirror | Mask: The Pleaser",
        diagnosis: "You reflect others perfectly but please them endlessly. Your mirror is beautiful but exhausting. Stop reflecting and start being.",
        reality: "You're a mirror who pleases by reflecting others' expectations.",
        tension: "The tension between reflecting others and being yourself.",
        lawToWalk: "Be yourself first, then reflect others from your own center.",
        ifYouStay: "You'll become exhausted and lose all sense of identity.",
        ifYouAct: "You'll discover your authentic self and build genuine connections."
      },
      mirror: {
        title: "Stage: The Mirror | Mask: The Mirror",
        diagnosis: "Perfect mirror, endless reflection. You become whatever is needed, but who are you when no one is looking? Set the frame, reveal the source.",
        reality: "You're a mirror who reflects others perfectly but has no sense of self.",
        tension: "The tension between reflecting others and discovering yourself.",
        lawToWalk: "Set the frame. Your reflection is beautiful, but your source is sacred.",
        ifYouStay: "You'll become a chameleon with no true identity.",
        ifYouAct: "You'll discover your authentic self and use your mirroring as a gift."
      },
      connector: {
        title: "Stage: The Mirror | Mask: The Connector",
        diagnosis: "You mirror to connect, but true connection requires authenticity. Your reflections are perfect but hollow. Bridge from your truth, not your reflection.",
        reality: "You're a mirror who tries to connect by reflecting others perfectly.",
        tension: "The tension between mirroring others and building authentic connections.",
        lawToWalk: "Connect from your truth, not from your reflection of others.",
        ifYouStay: "You'll build relationships based on false reflections.",
        ifYouAct: "You'll create genuine connections based on mutual authenticity."
      },
      resonator: {
        title: "Stage: The Mirror | Mask: The Resonator",
        diagnosis: "You mirror others' emotions perfectly but lose your own resonance. Your reflection is beautiful but silent. Find your own frequency.",
        reality: "You're a mirror who resonates with others but has no emotional center.",
        tension: "The tension between reflecting others' emotions and feeling your own.",
        lawToWalk: "Resonate from your own frequency, then reflect others from there.",
        ifYouStay: "You'll become emotionally hollow and lose your sense of self.",
        ifYouAct: "You'll create genuine emotional harmony that includes your own feelings."
      },
      union: {
        title: "Stage: The Mirror | Mask: The Union",
        diagnosis: "You seek union through perfect reflection, but true partnership requires two authentic selves. Stop mirroring and start being.",
        reality: "You're a mirror who wants union but has no authentic self to offer.",
        tension: "The tension between reflecting others and building authentic union.",
        lawToWalk: "Be yourself first. Union requires two authentic selves, not one reflection.",
        ifYouStay: "You'll attract partners who want your reflection, not your truth.",
        ifYouAct: "You'll build partnerships based on mutual authenticity and respect."
      }
    },
    connector: {
      pleaser: {
        title: "Stage: The Connector | Mask: The Pleaser",
        diagnosis: "You connect by pleasing everyone, but true connection requires boundaries. Your bridges are beautiful but fragile. Build from your center.",
        reality: "You're a connector who pleases to maintain connections.",
        tension: "The tension between connecting authentically and pleasing others.",
        lawToWalk: "Connect from your center, not from your need to please.",
        ifYouStay: "You'll build fragile connections that depend on your constant accommodation.",
        ifYouAct: "You'll create strong, authentic connections based on mutual respect."
      },
      mirror: {
        title: "Stage: The Connector | Mask: The Mirror",
        diagnosis: "You connect by mirroring others, but true connection requires authenticity. Your bridges are reflections, not foundations. Build from your truth.",
        reality: "You're a connector who mirrors to create connections.",
        tension: "The tension between connecting authentically and reflecting others.",
        lawToWalk: "Connect from your truth, not from your reflection of others.",
        ifYouStay: "You'll build connections based on false reflections.",
        ifYouAct: "You'll create genuine connections based on mutual authenticity."
      },
      connector: {
        title: "Stage: The Connector | Mask: The Connector",
        diagnosis: "You bridge everyone but yourself. Your connections are beautiful but you're lost in the middle. Find your own ground first.",
        reality: "You're a connector who bridges others but has no center of your own.",
        tension: "The tension between connecting others and connecting with yourself.",
        lawToWalk: "Connect with yourself first. Your bridges need solid foundations.",
        ifYouStay: "You'll become exhausted and lose yourself in others' connections.",
        ifYouAct: "You'll create authentic connections that include your own needs."
      },
      resonator: {
        title: "Stage: The Connector | Mask: The Resonator",
        diagnosis: "You connect by resonating with others, but true connection requires boundaries. Your harmony is beautiful but porous. Build with solid foundations.",
        reality: "You're a connector who resonates deeply but loses emotional boundaries.",
        tension: "The tension between connecting emotionally and maintaining boundaries.",
        lawToWalk: "Connect with boundaries. Your resonance needs solid foundations.",
        ifYouStay: "You'll become emotionally drained and lose your sense of self.",
        ifYouAct: "You'll create connections that honor both emotional depth and personal boundaries."
      },
      union: {
        title: "Stage: The Connector | Mask: The Union",
        diagnosis: "You connect everyone but struggle with true union. Your bridges are beautiful but you're afraid to cross them yourself. Trust your own connections.",
        reality: "You're a connector who builds bridges but fears crossing them.",
        tension: "The tension between connecting others and experiencing union yourself.",
        lawToWalk: "Trust your own connections. Your bridges are meant for you too.",
        ifYouStay: "You'll help others connect while remaining isolated yourself.",
        ifYouAct: "You'll experience the deep connections you help others create."
      }
    },
    resonator: {
      pleaser: {
        title: "Stage: The Resonator | Mask: The Pleaser",
        diagnosis: "You resonate with others' needs but please them endlessly. Your harmony is beautiful but exhausting. Resonate from your own center.",
        reality: "You're a resonator who pleases to maintain emotional harmony.",
        tension: "The tension between resonating authentically and pleasing others.",
        lawToWalk: "Resonate from your center, not from your need to please.",
        ifYouStay: "You'll become emotionally exhausted and lose your sense of self.",
        ifYouAct: "You'll create genuine emotional harmony that includes your own needs."
      },
      mirror: {
        title: "Stage: The Resonator | Mask: The Mirror",
        diagnosis: "You resonate by mirroring others' emotions, but true resonance requires your own frequency. Your harmony is reflection, not authenticity.",
        reality: "You're a resonator who mirrors others' emotions instead of feeling your own.",
        tension: "The tension between resonating authentically and reflecting others.",
        lawToWalk: "Resonate from your own frequency, then mirror others from there.",
        ifYouStay: "You'll become emotionally hollow and lose your sense of self.",
        ifYouAct: "You'll create genuine emotional harmony that includes your own feelings."
      },
      connector: {
        title: "Stage: The Resonator | Mask: The Connector",
        diagnosis: "You resonate to connect, but true connection requires boundaries. Your harmony is beautiful but porous. Connect with solid foundations.",
        reality: "You're a resonator who connects by feeling others deeply but loses boundaries.",
        tension: "The tension between resonating deeply and maintaining connection boundaries.",
        lawToWalk: "Connect with boundaries. Your resonance needs solid foundations.",
        ifYouStay: "You'll become emotionally drained and lose your sense of self.",
        ifYouAct: "You'll create connections that honor both emotional depth and personal boundaries."
      },
      resonator: {
        title: "Stage: The Resonator | Mask: The Resonator",
        diagnosis: "You resonate deeply but sometimes lose your anchor. Your harmony is beautiful but you forget to return to stillness. Let the music move, then return to center.",
        reality: "You're a resonator who feels others deeply but sometimes loses yourself.",
        tension: "The tension between resonating with others and maintaining your own center.",
        lawToWalk: "Let the music move, then return to stillness. Your resonance needs an anchor.",
        ifYouStay: "You'll become emotionally overwhelmed and lose your sense of self.",
        ifYouAct: "You'll create beautiful emotional harmony while staying centered in yourself."
      },
      union: {
        title: "Stage: The Resonator | Mask: The Union",
        diagnosis: "You resonate deeply but struggle with true union. Your harmony is beautiful but you're afraid to merge completely. Trust your resonance.",
        reality: "You're a resonator who creates harmony but fears deep union.",
        tension: "The tension between resonating deeply and experiencing complete union.",
        lawToWalk: "Trust your resonance. Your harmony is meant for union too.",
        ifYouStay: "You'll create beautiful harmony while remaining emotionally separate.",
        ifYouAct: "You'll experience the deep union your resonance makes possible."
      }
    },
    union: {
      pleaser: {
        title: "Stage: The Union | Mask: The Pleaser",
        diagnosis: "You achieve union but please everyone in the process. Your partnership is beautiful but exhausting. Union requires two wholes, not endless accommodation.",
        reality: "You're in union but still please others at the expense of yourself.",
        tension: "The tension between experiencing union and maintaining personal boundaries.",
        lawToWalk: "Union requires two wholes. Stop pleasing and start being whole.",
        ifYouStay: "You'll experience union but lose yourself in the process.",
        ifYouAct: "You'll experience true union based on mutual wholeness and respect."
      },
      mirror: {
        title: "Stage: The Union | Mask: The Mirror",
        diagnosis: "You achieve union but still mirror others. Your partnership is beautiful but not fully authentic. Union requires two authentic selves, not reflections.",
        reality: "You're in union but still mirror others instead of being yourself.",
        tension: "The tension between experiencing union and being authentically yourself.",
        lawToWalk: "Union requires two authentic selves. Stop mirroring and start being.",
        ifYouStay: "You'll experience union but lose your authentic self in the process.",
        ifYouAct: "You'll experience true union based on mutual authenticity."
      },
      connector: {
        title: "Stage: The Union | Mask: The Connector",
        diagnosis: "You achieve union but still try to connect everyone. Your partnership is beautiful but you're afraid to focus on it. Trust your union.",
        reality: "You're in union but still try to connect everyone else instead of focusing on your partnership.",
        tension: "The tension between experiencing union and maintaining other connections.",
        lawToWalk: "Trust your union. Your partnership deserves your full attention.",
        ifYouStay: "You'll experience union but dilute it by trying to connect everyone.",
        ifYouAct: "You'll experience deep union by giving it your full attention."
      },
      resonator: {
        title: "Stage: The Union | Mask: The Resonator",
        diagnosis: "You achieve union but still resonate with everyone. Your partnership is beautiful but you're afraid to merge completely. Trust your resonance.",
        reality: "You're in union but still resonate with others instead of fully merging with your partner.",
        tension: "The tension between experiencing union and maintaining other emotional connections.",
        lawToWalk: "Trust your resonance. Your union is meant for deep merging.",
        ifYouStay: "You'll experience union but dilute it by resonating with everyone.",
        ifYouAct: "You'll experience deep union by fully merging with your partner."
      },
      union: {
        title: "Stage: The Union | Mask: The Union",
        diagnosis: "You are the living field of union. Your partnership is authentic, your boundaries respected, your connection true. This is real partnership; now walk it fully.",
        reality: "You've achieved true union with authentic partnership and mutual respect.",
        tension: "The tension between maintaining union and continuing to grow individually.",
        lawToWalk: "This is real partnership; now walk it fully while continuing to grow.",
        ifYouStay: "You'll experience deep union but may become complacent.",
        ifYouAct: "You'll experience ever-deepening union while continuing to grow individually."
      }
    }
  }
} 