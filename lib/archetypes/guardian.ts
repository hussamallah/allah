import { Archetype } from './index'

export const guardianArchetype: Archetype = {
  key: "guardian",
  name: "Guardian",
  color: "#1e3a8a",
  accentColor: "#3b82f6",
  glowColor: "rgba(59, 130, 246, 0.5)",
  description: "Guardian Node - The Law",
  loop: "Endless protecting, never receiving, fear of vulnerability.",
  needs: "Stop protecting, open to receive, surrender to being held, burn the need to save others.",
  
  stages: [
    {
      key: "shielded",
      label: "The Shielded",
      color: "#3b82f6",
      description: "You step in to mediate and protect others from fallout. You jump in to shield those at risk and take responsibility for helping others.",
      needs: "Learn to protect yourself as fiercely as you protect others, set limits, release what's not yours to carry.",
      questions: [
        {
          id: "g1",
          text: "When someone breaks a rule in your space, you…",
          options: [
            { text: "Step in to mediate and protect others from the fallout.", value: 5 },
            { text: "Make a note to address it later in a private, careful way.", value: 4 },
            { text: "Watch quietly, assessing if it's a pattern or a one-time thing.", value: 3 },
            { text: "Let it pass unless it threatens the core foundation.", value: 2 },
            { text: "Confront immediately and set a clear boundary.", value: 1 }
          ]
        },
        {
          id: "g2",
          text: "When a crisis erupts at work or home, your first instinct is to…",
          options: [
            { text: "Jump in to shield those at risk.", value: 5 },
            { text: "Take responsibility for helping others.", value: 4 },
            { text: "Secure important details or resources.", value: 3 },
            { text: "Observe, then advise on the safest route.", value: 2 },
            { text: "Hold your ground and wait for things to settle.", value: 1 }
          ]
        },
        {
          id: "g3",
          text: "When someone criticizes your way of doing things, you…",
          options: [
            { text: "Feel responsible and want to fix the problem for everyone.", value: 5 },
            { text: "Consider their feedback but keep what works for you.", value: 4 },
            { text: "Ask clarifying questions to see if the criticism is valid.", value: 3 },
            { text: "Stay calm—if it matters, you'll address it in time.", value: 2 },
            { text: "Defend your approach and push back.", value: 1 }
          ]
        },
        {
          id: "g4",
          text: "In a new environment, you tend to…",
          options: [
            { text: "Offer to help others get oriented.", value: 5 },
            { text: "Stick close to what you already know or trust.", value: 4 },
            { text: "Scan and assess the risks before acting.", value: 3 },
            { text: "Observe quietly and root yourself once you're comfortable.", value: 2 },
            { text: "Find your personal space and claim it.", value: 1 }
          ]
        },
        {
          id: "g5",
          text: "When a long-term plan fails, you…",
          options: [
            { text: "Take responsibility and help others recover.", value: 5 },
            { text: "Try to shield yourself and others from blame.", value: 4 },
            { text: "Salvage what you can and maintain the routine.", value: 3 },
            { text: "Analyze what signals you missed and adjust.", value: 2 },
            { text: "Accept the loss and look for a new point of stability.", value: 1 }
          ]
        }
      ]
    },
    {
      key: "holder",
      label: "The Holder",
      color: "#1d4ed8",
      description: "You make notes to address things later in a private, careful way. You secure important details and maintain routines for stability.",
      needs: "Learn to address issues directly when needed, don't always defer to later.",
      questions: [
        {
          id: "g6",
          text: "If you feel exhausted at the end of the week, you…",
          options: [
            { text: "Look for ways to help others recharge as well as yourself.", value: 5 },
            { text: "Block out all demands until you're restored.", value: 4 },
            { text: "Stick to your routines and comfort rituals for stability.", value: 3 },
            { text: "Scan for causes and plan to avoid a repeat.", value: 2 },
            { text: "Withdraw, needing total stillness to recover.", value: 1 }
          ]
        },
        {
          id: "g7",
          text: "If a friend is struggling but hasn't asked for help, you…",
          options: [
            { text: "Step in anyway—they shouldn't struggle alone.", value: 5 },
            { text: "Offer support but wait for them to ask.", value: 4 },
            { text: "Check in regularly without being pushy.", value: 3 },
            { text: "Give them space but let them know you're available.", value: 2 },
            { text: "Respect their boundaries and wait for a signal.", value: 1 }
          ]
        },
        {
          id: "g8",
          text: "When someone repeatedly asks for help, you…",
          options: [
            { text: "Keep helping, even at your own expense.", value: 5 },
            { text: "Offer structured support with boundaries.", value: 4 },
            { text: "Analyze if there's a hidden problem.", value: 3 },
            { text: "Offer guidance, but withdraw if there's no progress.", value: 2 },
            { text: "Directly address the dependency issue.", value: 1 }
          ]
        },
        {
          id: "g9",
          text: "When given a new responsibility, you…",
          options: [
            { text: "Take charge and support others to succeed.", value: 5 },
            { text: "Incorporate it into your routine carefully.", value: 4 },
            { text: "Define clear rules and boundaries up front.", value: 3 },
            { text: "Ask for details, anticipate obstacles.", value: 2 },
            { text: "Accept it, but only if it fits your core values.", value: 1 }
          ]
        },
        {
          id: "g10",
          text: "When someone in your group is disruptive, you…",
          options: [
            { text: "Step in to restore order.", value: 5 },
            { text: "Set immediate limits.", value: 4 },
            { text: "Pull them aside later for a private talk.", value: 3 },
            { text: "Watch to see if the pattern continues.", value: 2 },
            { text: "Only intervene if it threatens the group's foundation.", value: 1 }
          ]
        }
      ]
    },
    {
      key: "wall",
      label: "The Wall",
      color: "#1e3a8a",
      description: "You confront immediately and set clear boundaries. You build barriers to keep chaos contained and protect your space.",
      needs: "Learn when to flex and when to hold, balance strength with flexibility.",
      questions: [
        {
          id: "g11",
          text: "When your routine is broken, you…",
          options: [
            { text: "Get frustrated and try to repair it.", value: 5 },
            { text: "Help others adjust.", value: 4 },
            { text: "Adapt, but keep as much familiar as possible.", value: 3 },
            { text: "Look for lessons or warnings in the disruption.", value: 2 },
            { text: "Accept it and find a new rhythm.", value: 1 }
          ]
        },
        {
          id: "g12",
          text: "When someone new joins your circle, you…",
          options: [
            { text: "Introduce them to routines and systems.", value: 5 },
            { text: "Make them feel welcome and safe.", value: 4 },
            { text: "Assert your presence, test their respect for boundaries.", value: 3 },
            { text: "Observe them quietly, look for red flags.", value: 2 },
            { text: "Wait and let them find their own place.", value: 1 }
          ]
        },
        {
          id: "g13",
          text: "When facing a threat, you…",
          options: [
            { text: "Stand your ground and repel.", value: 5 },
            { text: "Put yourself between others and harm.", value: 4 },
            { text: "Protect key resources or traditions.", value: 3 },
            { text: "Plan several responses.", value: 2 },
            { text: "Endure, staying unmoved.", value: 1 }
          ]
        },
        {
          id: "g14",
          text: "If a tradition is challenged, you…",
          options: [
            { text: "Shut down the challenge outright.", value: 5 },
            { text: "Reflect on its core purpose; change only if necessary.", value: 4 },
            { text: "Defend it with evidence and reasoning.", value: 3 },
            { text: "Consider how the change might impact the future.", value: 2 },
            { text: "Mediate between both sides.", value: 1 }
          ]
        },
        {
          id: "g15",
          text: "When you need comfort, you…",
          options: [
            { text: "Retreat behind your defenses.", value: 5 },
            { text: "Indulge in familiar rituals or habits.", value: 4 },
            { text: "Ground yourself in stillness.", value: 3 },
            { text: "Distract your mind with observation or planning.", value: 2 },
            { text: "Reach out to care for others, using service as solace.", value: 1 }
          ]
        }
      ]
    },
    {
      key: "gate",
      label: "The Gate",
      color: "#2563eb",
      description: "You watch quietly, assessing if it's a pattern or a one-time thing. You observe and analyze before acting.",
      needs: "Learn to act decisively when needed, don't always stay in observation mode.",
      questions: [
        {
          id: "g16",
          text: "When someone repeatedly asks for help, you…",
          options: [
            { text: "Directly address the dependency issue.", value: 5 },
            { text: "Monitor them closely from then on.", value: 4 },
            { text: "Offer structured support with boundaries.", value: 3 },
            { text: "Keep helping, even at your own expense.", value: 2 },
            { text: "Offer guidance, but withdraw if there's no progress.", value: 1 }
          ]
        },
        {
          id: "g17",
          text: "If someone betrays your trust, you…",
          options: [
            { text: "Cut them off immediately.", value: 5 },
            { text: "Monitor them closely from then on.", value: 4 },
            { text: "Distance yourself but keep things civil.", value: 3 },
            { text: "Try to understand and help them change.", value: 2 },
            { text: "Withdraw your energy and move on quietly.", value: 1 }
          ]
        },
        {
          id: "g18",
          text: "When you're not in control, you…",
          options: [
            { text: "Get tense and push for authority.", value: 5 },
            { text: "Focus on what you can influence, observe all else.", value: 4 },
            { text: "Look for where you can help regardless.", value: 3 },
            { text: "Keep your own part in order, regardless of the rest.", value: 2 },
            { text: "Stay present, let things unfold.", value: 1 }
          ]
        },
        {
          id: "g19",
          text: "In moments of uncertainty, you…",
          options: [
            { text: "Analyze every detail for signals.", value: 5 },
            { text: "Double down on control.", value: 4 },
            { text: "Step up to provide direction for others.", value: 3 },
            { text: "Reaffirm your habits.", value: 2 },
            { text: "Stay rooted, let time reveal answers.", value: 1 }
          ]
        },
        {
          id: "g20",
          text: "If your advice is ignored, you…",
          options: [
            { text: "Withdraw and stop offering.", value: 5 },
            { text: "Watch the consequences unfold, ready to step in if needed.", value: 4 },
            { text: "Keep trying until you're heard.", value: 3 },
            { text: "Restate your point more gently.", value: 2 },
            { text: "Let go—people learn in their own time.", value: 1 }
          ]
        }
      ]
    },
    {
      key: "anchor",
      label: "The Anchor",
      color: "#1e40af",
      description: "You let things pass unless they threaten the core foundation. You stay rooted and let storms pass, then rebuild.",
      needs: "You have arrived. Your presence creates safety and healing for all who encounter you.",
      questions: [
        {
          id: "g21",
          text: "When you're recognized for your efforts, you…",
          options: [
            { text: "Stay reserved, not showing much.", value: 5 },
            { text: "Receive the recognition with calm gratitude.", value: 4 },
            { text: "Credit the team or others.", value: 3 },
            { text: "Thank the person, then move on.", value: 2 },
            { text: "Note who gives praise, wonder what it signals.", value: 1 }
          ]
        },
        {
          id: "g22",
          text: "If asked to take a big risk, you…",
          options: [
            { text: "Refuse unless every detail is secured.", value: 5 },
            { text: "Only proceed if it won't uproot your core.", value: 4 },
            { text: "Go for it if it helps someone.", value: 3 },
            { text: "Calculate the odds, proceed if safe.", value: 2 },
            { text: "Prefer to stay within established boundaries.", value: 1 }
          ]
        },
        {
          id: "g23",
          text: "When chaos surrounds you, you…",
          options: [
            { text: "Remain unmoved, creating a center of calm.", value: 5 },
            { text: "Act decisively to restore order.", value: 4 },
            { text: "Guide others to safety and stability.", value: 3 },
            { text: "Assess the situation before responding.", value: 2 },
            { text: "Let the storm pass, then rebuild what's needed.", value: 1 }
          ]
        },
        {
          id: "g24",
          text: "When others are in crisis, you…",
          options: [
            { text: "Provide unwavering support and guidance.", value: 5 },
            { text: "Help them find their own strength.", value: 4 },
            { text: "Create a safe space for them to process.", value: 3 },
            { text: "Offer practical solutions and resources.", value: 2 },
            { text: "Stand by them until they're stable again.", value: 1 }
          ]
        },
        {
          id: "g25",
          text: "In times of change, you…",
          options: [
            { text: "Maintain your core values and principles.", value: 5 },
            { text: "Adapt while preserving what's essential.", value: 4 },
            { text: "Guide others through the transition.", value: 3 },
            { text: "Assess what needs to change and what doesn't.", value: 2 },
            { text: "Provide stability for those who need it.", value: 1 }
          ]
        }
      ]
    }
  ],

  diagnosis: {
    shielded: {
      shielded: {
        title: "Shielded | Shielded",
        diagnosis: "You defend everyone but yourself—hiding from conflict, denying your needs. Your shield is a prison. Until you step forward, nothing will change.",
        stage: "Shielded",
        mask: "Shielded"
      },
      holder: {
        title: "Shielded | Holder",
        diagnosis: "You hold pain for others but never share your own. Martyrdom is not law. True guardianship requires boundaries, not silent sacrifice.",
        stage: "Shielded",
        mask: "Holder"
      },
      wall: {
        title: "Shielded | Wall",
        diagnosis: "You build walls to keep out pain, but you also block help. Your self-protection is now your main enemy. Lower your guard, just once.",
        stage: "Shielded",
        mask: "Wall"
      },
      gate: {
        title: "Shielded | Gate",
        diagnosis: "You let everyone in, hoping to be needed. But law means you must sometimes close the gate. Who enters your circle now—do you even know?",
        stage: "Shielded",
        mask: "Gate"
      },
      anchor: {
        title: "Shielded | Anchor",
        diagnosis: "You want to be the anchor, but you're still hiding. Until you show up fully, no one can rely on you—not even you.",
        stage: "Shielded",
        mask: "Anchor"
      }
    },
    holder: {
      shielded: {
        title: "Holder | Shielded",
        diagnosis: "You try to carry others, but abandon your own field at the first sign of pain. Strength without self-defense is self-erasure.",
        stage: "Holder",
        mask: "Shielded"
      },
      holder: {
        title: "Holder | Holder",
        diagnosis: "You're the group's secret support, always present, always tired. You can't anchor anyone if you're drowning. Support yourself as fiercely as you support them.",
        stage: "Holder",
        mask: "Holder"
      },
      wall: {
        title: "Holder | Wall",
        diagnosis: "You protect others with walls you don't let them see. Ask yourself: is this protection or just avoidance? Your honesty decides.",
        stage: "Holder",
        mask: "Wall"
      },
      gate: {
        title: "Holder | Gate",
        diagnosis: "You let people in, then quietly build walls after they enter. Be clear about your law from the start. The field demands transparency.",
        stage: "Holder",
        mask: "Gate"
      },
      anchor: {
        title: "Holder | Anchor",
        diagnosis: "You want to be an anchor, but your foundation is sand—constantly shifting for others. Make your law immovable and watch who rises to meet you.",
        stage: "Holder",
        mask: "Anchor"
      }
    },
    wall: {
      shielded: {
        title: "Wall | Shielded",
        diagnosis: "You enforce rules, but when threatened, you retreat to old shields. Real guardians stand even when tested. Do not fold now.",
        stage: "Wall",
        mask: "Shielded"
      },
      holder: {
        title: "Wall | Holder",
        diagnosis: "You hold boundaries well, but revert to carrying everyone's pain under pressure. The true wall stands for all, not just those who scream loudest.",
        stage: "Wall",
        mask: "Holder"
      },
      wall: {
        title: "Wall | Wall",
        diagnosis: "You're solid—perhaps too solid. Rigidity can become brittle. Learn when to flex and when to hold. This is your edge.",
        stage: "Wall",
        mask: "Wall"
      },
      gate: {
        title: "Wall | Gate",
        diagnosis: "You draw the line, but your gate is still open to the wrong people. Audit your circle. Law must be enforced—without guilt.",
        stage: "Wall",
        mask: "Gate"
      },
      anchor: {
        title: "Wall | Anchor",
        diagnosis: "You're nearly immovable, but still lack presence. The anchor is not just strong, it is felt. Are you present, or just unbreakable?",
        stage: "Wall",
        mask: "Anchor"
      }
    },
    gate: {
      shielded: {
        title: "Gate | Shielded",
        diagnosis: "You keep a gate, but run to your shield at the first attack. Law means standing exposed sometimes. Choose: gatekeeper or ghost?",
        stage: "Gate",
        mask: "Shielded"
      },
      holder: {
        title: "Gate | Holder",
        diagnosis: "You filter who enters, but revert to holding everyone's pain once they're inside. Law is not endless patience. Set time limits. Enforce them.",
        stage: "Gate",
        mask: "Holder"
      },
      wall: {
        title: "Gate | Wall",
        diagnosis: "You keep the wrong out, but also keep too much in. The perfect gate is not a fortress—it's a channel. Loosen, then direct.",
        stage: "Gate",
        mask: "Wall"
      },
      gate: {
        title: "Gate | Gate",
        diagnosis: "You are the selector—neither too open nor too closed. Beware stagnation: gates must open sometimes. Risk is the test of growth.",
        stage: "Gate",
        mask: "Gate"
      },
      anchor: {
        title: "Gate | Anchor",
        diagnosis: "You're selective, but don't yet offer real stability. The anchor must be visible. Who comes, stays, or leaves—do they know your law?",
        stage: "Gate",
        mask: "Anchor"
      }
    },
    anchor: {
      shielded: {
        title: "Anchor | Shielded",
        diagnosis: "You desire to be the anchor, but under attack you still run for cover. True anchors hold, even in storms. Stand now or forever chase peace.",
        stage: "Anchor",
        mask: "Shielded"
      },
      holder: {
        title: "Anchor | Holder",
        diagnosis: "Your presence calms, but when tested you go back to carrying everyone's burdens. The final law: carry only what you choose.",
        stage: "Anchor",
        mask: "Holder"
      },
      wall: {
        title: "Anchor | Wall",
        diagnosis: "You hold, you protect, but are you building a prison? Law can hold, but it must not cage. Set the law, then let life flow.",
        stage: "Anchor",
        mask: "Wall"
      },
      gate: {
        title: "Anchor | Gate",
        diagnosis: "You're the anchor who chooses their circle. Now your task is only this: refuse to drift. The world gathers around those who do not move.",
        stage: "Anchor",
        mask: "Gate"
      },
      anchor: {
        title: "Anchor | Anchor",
        diagnosis: "You are the unshakable anchor—law made real, refuge in the storm. Others orbit you, not out of need, but respect. The field is finally safe.",
        stage: "Anchor",
        mask: "Anchor"
      }
    }
  }
} 