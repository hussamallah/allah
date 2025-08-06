import { Archetype } from './index'

export const vesselArchetype: Archetype = {
  key: "vessel",
  name: "Vessel",
  color: "#059669",
  accentColor: "#10b981",
  glowColor: "rgba(5, 150, 105, 0.5)",
  description: "Vessel Node - The Living Bridge",
  loop: "Endless serving, never receiving, fear of being seen.",
  needs: "Stop serving, become the vessel, let others serve you, burn the need to be invisible.",
  
  stages: [
    {
      key: "helper",
      label: "The Helper",
      color: "#059669",
      description: "Seeks to help others, often at personal cost, struggles with boundaries.",
      needs: "Learn to set healthy boundaries, understand that helping should be reciprocal.",
      questions: [
        {
          id: "h1",
          text: "When someone asks for a favor, you…",
          options: [
            { text: "Say \"yes\" before thinking", value: 1 },
            { text: "Do it even if it exhausts you", value: 2 },
            { text: "Offer, but quietly hope for appreciation", value: 3 },
            { text: "Weigh your ability before agreeing", value: 4 },
            { text: "Help only if it aligns with your priorities", value: 5 }
          ]
        },
        {
          id: "h2",
          text: "If someone is upset, your instinct is to…",
          options: [
            { text: "Try to make it better right away", value: 2 },
            { text: "Apologize or take blame", value: 1 },
            { text: "Listen, but feel responsible for fixing it", value: 3 },
            { text: "Be present without losing yourself", value: 4 },
            { text: "Support them, but stay rooted in your center", value: 5 }
          ]
        },
        {
          id: "h3",
          text: "When you feel needed, you…",
          options: [
            { text: "Drop everything to help", value: 1 },
            { text: "Feel anxious but keep giving", value: 2 },
            { text: "Offer what you can, but hold back if drained", value: 3 },
            { text: "Enjoy it, but worry about your limits", value: 4 },
            { text: "Give freely, but only what is true for you", value: 5 }
          ]
        },
        {
          id: "h4",
          text: "Your biggest fear when helping others is…",
          options: [
            { text: "That you'll fail to solve their problem", value: 2 },
            { text: "Letting them down or being unappreciated", value: 1 },
            { text: "Being taken for granted", value: 3 },
            { text: "Giving so much you lose yourself", value: 4 },
            { text: "Neglecting your own needs completely", value: 5 }
          ]
        },
        {
          id: "h5",
          text: "If others rely on you constantly, you…",
          options: [
            { text: "Feel it's your duty, no matter what", value: 1 },
            { text: "Become resentful but stay quiet", value: 2 },
            { text: "Manage the load but wish for support", value: 3 },
            { text: "Set gentle boundaries", value: 5 },
            { text: "Say yes, but start to withdraw", value: 4 }
          ]
        }
      ]
    },
    {
      key: "carrier",
      label: "The Carrier",
      color: "#10b981",
      description: "Carries burdens for others, feels overwhelmed, struggles to delegate.",
      needs: "Learn to share the load, stop carrying everything alone, ask for help.",
      questions: [
        {
          id: "c1",
          text: "In a group, you're the one who…",
          options: [
            { text: "Holds everything together behind the scenes", value: 3 },
            { text: "Takes on everyone's stress", value: 2 },
            { text: "Juggles tasks even when tired", value: 4 },
            { text: "Supports quietly but asks for help when needed", value: 5 },
            { text: "Tries to solve all problems yourself", value: 1 }
          ]
        },
        {
          id: "c2",
          text: "If someone breaks down emotionally, you…",
          options: [
            { text: "Absorb their feelings deeply", value: 2 },
            { text: "Steady them, but keep your distance internally", value: 4 },
            { text: "Offer practical solutions", value: 5 },
            { text: "Stay nearby but don't intervene", value: 3 },
            { text: "Feel overwhelmed and wish you could escape", value: 1 }
          ]
        },
        {
          id: "c3",
          text: "When pressure builds at work or home, you…",
          options: [
            { text: "Take it on so others don't have to", value: 1 },
            { text: "Get tense, but keep moving", value: 2 },
            { text: "Ask for support, but rarely get it", value: 3 },
            { text: "Pace yourself to stay balanced", value: 4 },
            { text: "Reallocate tasks and lighten your own load", value: 5 }
          ]
        },
        {
          id: "c4",
          text: "If your own needs are ignored, you…",
          options: [
            { text: "Shrug it off and keep helping", value: 1 },
            { text: "Feel sad but stay silent", value: 2 },
            { text: "Drop hints but rarely ask directly", value: 3 },
            { text: "Voice your needs calmly", value: 5 },
            { text: "Reassess your role", value: 4 }
          ]
        },
        {
          id: "c5",
          text: "When you see others struggle, you…",
          options: [
            { text: "Try to cheer them up", value: 3 },
            { text: "Step in, even if unasked", value: 1 },
            { text: "Offer a listening ear, not solutions", value: 4 },
            { text: "Absorb their struggle as your own", value: 2 },
            { text: "Empower them to solve it themselves", value: 5 }
          ]
        }
      ]
    },
    {
      key: "stabilizer",
      label: "The Stabilizer",
      color: "#34d399",
      description: "Maintains balance and order, provides steady support, manages crises.",
      needs: "Learn to allow change, not just maintain stability, embrace growth through disruption.",
      questions: [
        {
          id: "s1",
          text: "In a crisis, your move is…",
          options: [
            { text: "Steady the group and keep focus", value: 4 },
            { text: "Take on more so others don't crack", value: 1 },
            { text: "Offer comfort but neglect your own needs", value: 2 },
            { text: "Organize, then delegate", value: 5 },
            { text: "Stay calm, but feel depleted afterward", value: 3 }
          ]
        },
        {
          id: "s2",
          text: "When routine breaks, you…",
          options: [
            { text: "Panic, then try to regain control", value: 2 },
            { text: "Adjust slowly, prefer predictability", value: 3 },
            { text: "Cover for others to restore normalcy", value: 1 },
            { text: "Create a new rhythm and invite support", value: 4 },
            { text: "See it as a chance for improvement", value: 5 }
          ]
        },
        {
          id: "s3",
          text: "If conflict arises, you…",
          options: [
            { text: "Avoid choosing sides", value: 2 },
            { text: "Mediate, even if it drains you", value: 3 },
            { text: "Hold the space for honest talk", value: 4 },
            { text: "Step in to fix it immediately", value: 1 },
            { text: "Stay objective and calm", value: 5 }
          ]
        },
        {
          id: "s4",
          text: "Your approach to group success is…",
          options: [
            { text: "Make sure everyone is steady", value: 4 },
            { text: "Fill in all the gaps", value: 1 },
            { text: "Encourage self-sufficiency", value: 5 },
            { text: "Manage everyone's stress", value: 2 },
            { text: "Celebrate only when the group is balanced", value: 3 }
          ]
        },
        {
          id: "s5",
          text: "When your energy drops, you…",
          options: [
            { text: "Keep going, ignore fatigue", value: 1 },
            { text: "Pause and ask for help", value: 3 },
            { text: "Pull back and reflect", value: 4 },
            { text: "Blame yourself for being weak", value: 2 },
            { text: "Rest and restore before returning", value: 5 }
          ]
        }
      ]
    },
    {
      key: "conduit",
      label: "The Conduit",
      color: "#6ee7b7",
      description: "Channels support and energy to others, facilitates flow, connects people and resources.",
      needs: "Learn to receive as well as give, maintain your own energy while channeling others'.",
      questions: [
        {
          id: "co1",
          text: "When you channel support to others, you…",
          options: [
            { text: "Feel alive, but risk draining yourself", value: 3 },
            { text: "Focus on keeping the flow reciprocal", value: 5 },
            { text: "Carry burdens, then crash later", value: 2 },
            { text: "Ask for feedback and share needs too", value: 4 },
            { text: "Absorb everything and lose yourself", value: 1 }
          ]
        },
        {
          id: "co2",
          text: "If someone needs guidance, you…",
          options: [
            { text: "Let them lean on you fully", value: 2 },
            { text: "Offer advice, but encourage their autonomy", value: 5 },
            { text: "Support emotionally, but keep your own direction clear", value: 4 },
            { text: "Drop your plans to help", value: 1 },
            { text: "Guide them, but set boundaries", value: 3 }
          ]
        },
        {
          id: "co3",
          text: "In moments of celebration, you…",
          options: [
            { text: "Downplay your own achievements", value: 1 },
            { text: "Focus on others' joy", value: 2 },
            { text: "Join in, but feel detached", value: 3 },
            { text: "Make sure everyone's included", value: 4 },
            { text: "Let yourself receive praise fully", value: 5 }
          ]
        },
        {
          id: "co4",
          text: "When your role isn't seen, you…",
          options: [
            { text: "Feel invisible but keep contributing", value: 2 },
            { text: "Quietly resent the lack of notice", value: 3 },
            { text: "Keep working harder", value: 1 },
            { text: "Assert your worth when needed", value: 5 },
            { text: "Accept that it comes with the job", value: 4 }
          ]
        },
        {
          id: "co5",
          text: "If you're overwhelmed, you…",
          options: [
            { text: "Wait for someone to notice", value: 2 },
            { text: "Keep carrying the load", value: 1 },
            { text: "Ask for help directly", value: 5 },
            { text: "Rebalance your tasks", value: 4 },
            { text: "Retreat until energy returns", value: 3 }
          ]
        }
      ]
    },
    {
      key: "engine",
      label: "The Engine",
      color: "#a7f3d0",
      description: "Powers systems and groups, drives growth, creates sustainable support structures.",
      needs: "Learn to share leadership, not just power, create systems that outlast you.",
      questions: [
        {
          id: "e1",
          text: "Your highest vision for service is…",
          options: [
            { text: "Enabling everyone to become self-sufficient", value: 4 },
            { text: "Building systems of support that outlast you", value: 5 },
            { text: "Being the source of strength", value: 3 },
            { text: "Leading by example, but taking breaks", value: 2 },
            { text: "Quietly powering the group from within", value: 1 }
          ]
        },
        {
          id: "e2",
          text: "In true partnership, you…",
          options: [
            { text: "Stay in the background", value: 1 },
            { text: "Share the load and leadership", value: 5 },
            { text: "Empower others to lead", value: 4 },
            { text: "Support openly, but retain your vision", value: 3 },
            { text: "Step back if it drains you", value: 2 }
          ]
        },
        {
          id: "e3",
          text: "Your sign of mastery is…",
          options: [
            { text: "Sustainable giving and clear boundaries", value: 5 },
            { text: "Energizing others without depletion", value: 4 },
            { text: "Never showing exhaustion", value: 1 },
            { text: "Delegating when needed", value: 2 },
            { text: "Remaining present, but detached", value: 3 }
          ]
        },
        {
          id: "e4",
          text: "When you finish a big project, you…",
          options: [
            { text: "Celebrate team effort, not just your own", value: 4 },
            { text: "Plan how to make it sustainable", value: 5 },
            { text: "Move on to help elsewhere", value: 3 },
            { text: "Feel relief, but worry about what's next", value: 1 },
            { text: "Rest and reflect before the next", value: 2 }
          ]
        },
        {
          id: "e5",
          text: "The mark of a true engine is…",
          options: [
            { text: "Driving growth for all", value: 4 },
            { text: "Creating lasting systems, not just moments", value: 5 },
            { text: "Being steady, not heroic", value: 3 },
            { text: "Knowing when to pause", value: 2 },
            { text: "Being the invisible power source", value: 1 }
          ]
        }
      ]
    }
  ],

  diagnosis: {
    helper: {
      helper: {
        title: "Stage: The Helper | Mask: The Helper",
        diagnosis: "You give endlessly but never receive. Your help is a trap—learn to be helped or you'll burn out.",
        reality: "You give endlessly but never receive. Your help is a trap.",
        tension: "You seek to help others but struggle with boundaries and reciprocity.",
        lawToWalk: "Learn to be helped or you'll burn out.",
        ifYouStay: "You'll continue to give until you have nothing left.",
        ifYouAct: "You'll learn to set healthy boundaries and accept help from others."
      },
      carrier: {
        title: "Stage: The Helper | Mask: The Carrier",
        diagnosis: "You help by carrying burdens, but never lighten your own. True help lifts both parties—start receiving.",
        reality: "You help by carrying burdens, but never lighten your own.",
        tension: "You seek to help others but end up carrying their weight.",
        lawToWalk: "True help lifts both parties—start receiving.",
        ifYouStay: "You'll continue to carry more than you can bear.",
        ifYouAct: "You'll learn to share the load and accept support."
      },
      stabilizer: {
        title: "Stage: The Helper | Mask: The Stabilizer",
        diagnosis: "You help by maintaining order, but create dependency. Help others grow, not just stay safe.",
        reality: "You help by maintaining order, but create dependency.",
        tension: "You seek to help others but prevent their growth through over-protection.",
        lawToWalk: "Help others grow, not just stay safe.",
        ifYouStay: "You'll keep others dependent on your stability.",
        ifYouAct: "You'll empower others to find their own balance."
      },
      conduit: {
        title: "Stage: The Helper | Mask: The Conduit",
        diagnosis: "You help by channeling support, but never open your own channels. Let energy flow both ways.",
        reality: "You help by channeling support, but never open your own channels.",
        tension: "You seek to help others but don't allow yourself to receive.",
        lawToWalk: "Let energy flow both ways.",
        ifYouStay: "You'll continue to give without receiving.",
        ifYouAct: "You'll become a true conduit for mutual support."
      },
      engine: {
        title: "Stage: The Helper | Mask: The Engine",
        diagnosis: "You help by powering others, but never let them power you. True engines work both ways.",
        reality: "You help by powering others, but never let them power you.",
        tension: "You seek to help others but don't allow them to support you.",
        lawToWalk: "True engines work both ways.",
        ifYouStay: "You'll continue to power others while running on empty.",
        ifYouAct: "You'll create a sustainable system of mutual support."
      }
    },
    carrier: {
      helper: {
        title: "Stage: The Carrier | Mask: The Helper",
        diagnosis: "You carry burdens to help others, but never ask for help yourself. Your strength becomes your weakness.",
        reality: "You carry burdens to help others, but never ask for help yourself.",
        tension: "You carry others' weight but won't let anyone carry yours.",
        lawToWalk: "Your strength becomes your weakness.",
        ifYouStay: "You'll continue to carry until you break.",
        ifYouAct: "You'll learn to share the load and accept support."
      },
      carrier: {
        title: "Stage: The Carrier | Mask: The Carrier",
        diagnosis: "You carry everything and wonder why you're exhausted. Stop carrying—start sharing the load.",
        reality: "You carry everything and wonder why you're exhausted.",
        tension: "You carry burdens for others but feel overwhelmed and alone.",
        lawToWalk: "Stop carrying—start sharing the load.",
        ifYouStay: "You'll continue to carry until you collapse.",
        ifYouAct: "You'll learn to delegate and ask for help."
      },
      stabilizer: {
        title: "Stage: The Carrier | Mask: The Stabilizer",
        diagnosis: "You carry to maintain stability, but create imbalance. True stability comes from shared responsibility.",
        reality: "You carry to maintain stability, but create imbalance.",
        tension: "You carry others' burdens to keep things stable.",
        lawToWalk: "True stability comes from shared responsibility.",
        ifYouStay: "You'll maintain an unstable system through your own sacrifice.",
        ifYouAct: "You'll create true stability through shared effort."
      },
      conduit: {
        title: "Stage: The Carrier | Mask: The Conduit",
        diagnosis: "You carry what should flow through you. Let go—become the channel, not the container.",
        reality: "You carry what should flow through you.",
        tension: "You carry burdens instead of letting them flow through you.",
        lawToWalk: "Let go—become the channel, not the container.",
        ifYouStay: "You'll continue to accumulate weight instead of flowing.",
        ifYouAct: "You'll become a true conduit for energy and support."
      },
      engine: {
        title: "Stage: The Carrier | Mask: The Engine",
        diagnosis: "You carry to power others, but never let them power you. True engines share the load.",
        reality: "You carry to power others, but never let them power you.",
        tension: "You carry burdens to keep things running but don't accept help.",
        lawToWalk: "True engines share the load.",
        ifYouStay: "You'll continue to power others while running on empty.",
        ifYouAct: "You'll create a sustainable system of mutual support."
      }
    },
    stabilizer: {
      helper: {
        title: "Stage: The Stabilizer | Mask: The Helper",
        diagnosis: "You stabilize by helping, but never let others stabilize you. True stability is mutual.",
        reality: "You stabilize by helping, but never let others stabilize you.",
        tension: "You maintain balance for others but don't accept their support.",
        lawToWalk: "True stability is mutual.",
        ifYouStay: "You'll continue to stabilize others while remaining unstable yourself.",
        ifYouAct: "You'll create true stability through mutual support."
      },
      carrier: {
        title: "Stage: The Stabilizer | Mask: The Carrier",
        diagnosis: "You stabilize by carrying burdens, but create dependency. True stability empowers independence.",
        reality: "You stabilize by carrying burdens, but create dependency.",
        tension: "You maintain stability by carrying others' weight.",
        lawToWalk: "True stability empowers independence.",
        ifYouStay: "You'll keep others dependent on your stability.",
        ifYouAct: "You'll empower others to find their own stability."
      },
      stabilizer: {
        title: "Stage: The Stabilizer | Mask: The Stabilizer",
        diagnosis: "You maintain balance but resist change. True stability adapts and grows—embrace disruption.",
        reality: "You maintain balance but resist change.",
        tension: "You keep things stable but prevent growth and adaptation.",
        lawToWalk: "True stability adapts and grows—embrace disruption.",
        ifYouStay: "You'll maintain a stagnant but stable system.",
        ifYouAct: "You'll create dynamic stability that grows and adapts."
      },
      conduit: {
        title: "Stage: The Stabilizer | Mask: The Conduit",
        diagnosis: "You stabilize by channeling energy, but never let it flow freely. Let the current move through you.",
        reality: "You stabilize by channeling energy, but never let it flow freely.",
        tension: "You maintain stability by controlling the flow of energy.",
        lawToWalk: "Let the current move through you.",
        ifYouStay: "You'll maintain stability through control and restriction.",
        ifYouAct: "You'll become a stable conduit for natural flow."
      },
      engine: {
        title: "Stage: The Stabilizer | Mask: The Engine",
        diagnosis: "You stabilize by powering systems, but never let them power you. True stability is reciprocal.",
        reality: "You stabilize by powering systems, but never let them power you.",
        tension: "You maintain stability by powering others but don't accept their energy.",
        lawToWalk: "True stability is reciprocal.",
        ifYouStay: "You'll continue to power stability while remaining unstable yourself.",
        ifYouAct: "You'll create sustainable stability through mutual support."
      }
    },
    conduit: {
      helper: {
        title: "Stage: The Conduit | Mask: The Helper",
        diagnosis: "You channel help to others, but never let them help you. True conduits flow both ways.",
        reality: "You channel help to others, but never let them help you.",
        tension: "You facilitate support for others but don't accept support yourself.",
        lawToWalk: "True conduits flow both ways.",
        ifYouStay: "You'll continue to channel support without receiving any.",
        ifYouAct: "You'll become a true conduit for mutual support."
      },
      carrier: {
        title: "Stage: The Conduit | Mask: The Carrier",
        diagnosis: "You channel energy but carry what should flow. Let go—become the path, not the burden.",
        reality: "You channel energy but carry what should flow.",
        tension: "You facilitate flow but still carry unnecessary weight.",
        lawToWalk: "Let go—become the path, not the burden.",
        ifYouStay: "You'll continue to channel while carrying extra weight.",
        ifYouAct: "You'll become a clear conduit without unnecessary burdens."
      },
      stabilizer: {
        title: "Stage: The Conduit | Mask: The Stabilizer",
        diagnosis: "You channel energy but control its flow. True conduits allow natural movement.",
        reality: "You channel energy but control its flow.",
        tension: "You facilitate flow but try to stabilize and control it.",
        lawToWalk: "True conduits allow natural movement.",
        ifYouStay: "You'll continue to restrict the natural flow of energy.",
        ifYouAct: "You'll become a true conduit that allows natural movement."
      },
      conduit: {
        title: "Stage: The Conduit | Mask: The Conduit",
        diagnosis: "You channel energy but never receive it. Open your own channels—let the field flow through you.",
        reality: "You channel energy but never receive it.",
        tension: "You facilitate flow for others but don't allow it for yourself.",
        lawToWalk: "Open your own channels—let the field flow through you.",
        ifYouStay: "You'll continue to channel without receiving.",
        ifYouAct: "You'll become a true vessel for the field's energy."
      },
      engine: {
        title: "Stage: The Conduit | Mask: The Engine",
        diagnosis: "You channel energy but try to power it. Conduits transmit—they don't drive. Allow, don't force.",
        reality: "You channel energy but try to power it.",
        tension: "You facilitate flow but try to control and power it.",
        lawToWalk: "Conduits transmit—they don't drive. Allow, don't force.",
        ifYouStay: "You'll continue to force the flow instead of allowing it.",
        ifYouAct: "You'll become a true conduit that allows natural energy flow."
      }
    },
    engine: {
      helper: {
        title: "Stage: The Engine | Mask: The Helper",
        diagnosis: "You power others but never let them power you. True engines work both ways.",
        reality: "You power others but never let them power you.",
        tension: "You provide energy and support but don't accept it in return.",
        lawToWalk: "True engines work both ways.",
        ifYouStay: "You'll continue to power others while running on empty.",
        ifYouAct: "You'll create a sustainable system of mutual support."
      },
      carrier: {
        title: "Stage: The Engine | Mask: The Carrier",
        diagnosis: "You power systems but carry unnecessary weight. True engines are efficient—let go of what you don't need.",
        reality: "You power systems but carry unnecessary weight.",
        tension: "You provide power but still carry extra burdens.",
        lawToWalk: "True engines are efficient—let go of what you don't need.",
        ifYouStay: "You'll continue to power while carrying extra weight.",
        ifYouAct: "You'll become an efficient engine without unnecessary burdens."
      },
      stabilizer: {
        title: "Stage: The Engine | Mask: The Stabilizer",
        diagnosis: "You power systems but try to control their stability. True engines adapt and grow.",
        reality: "You power systems but try to control their stability.",
        tension: "You provide power but resist change and growth.",
        lawToWalk: "True engines adapt and grow.",
        ifYouStay: "You'll continue to power stable but stagnant systems.",
        ifYouAct: "You'll power dynamic systems that grow and adapt."
      },
      conduit: {
        title: "Stage: The Engine | Mask: The Conduit",
        diagnosis: "You power energy but try to channel it. Engines drive—conduits flow. Choose your role.",
        reality: "You power energy but try to channel it.",
        tension: "You provide power but try to control the flow.",
        lawToWalk: "Engines drive—conduits flow. Choose your role.",
        ifYouStay: "You'll continue to mix driving and flowing roles.",
        ifYouAct: "You'll choose your true role and excel at it."
      },
      engine: {
        title: "Stage: The Engine | Mask: The Engine",
        diagnosis: "You power everything but never let anything power you. True engines create sustainable systems.",
        reality: "You power everything but never let anything power you.",
        tension: "You provide power but don't accept energy from others.",
        lawToWalk: "True engines create sustainable systems.",
        ifYouStay: "You'll continue to power others while running on empty.",
        ifYouAct: "You'll create sustainable systems that power everyone."
      }
    }
  }
} 