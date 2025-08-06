export const visionaryArchetype: Archetype = {
  key: "visionary",
  name: "Visionary",
  color: "#4338ca",
  accentColor: "#6366f1",
  glowColor: "rgba(99, 102, 241, 0.5)",
  description: "Future Node - The Now Snare",
  loop: "Living in the future, avoiding present reality, fear of now.",
  needs: "Return to present, face current reality, burn the need to escape.",
  
  stages: [
    {
      key: "dreamer",
      label: "The Dreamer",
      color: "#4338ca",
      description: "Lives in futures, acts in none, loses track of reality.",
      needs: "Stop dreaming, start acting, bring vision to reality.",
      questions: [
        {
          id: "d1",
          text: "When inspiration strikes, you:",
          options: [
            { text: "Daydream and lose track of reality", value: 1 },
            { text: "Tell a few people, but keep most inside", value: 2 },
            { text: "Get excited but don't act", value: 3 },
            { text: "Make lists or sketches but don't follow through", value: 4 },
            { text: "Share your vision, see who listens", value: 5 }
          ]
        },
        {
          id: "d2",
          text: "When you feel misunderstood, you:",
          options: [
            { text: "Withdraw into your own world", value: 1 },
            { text: "Try to explain, but give up quickly", value: 2 },
            { text: "Joke about it, deflecting the truth", value: 3 },
            { text: "Use creativity to express what you mean", value: 4 },
            { text: "Stand your ground and clarify", value: 5 }
          ]
        },
        {
          id: "d3",
          text: "With new ideas, your habit is to:",
          options: [
            { text: "Fantasize, but act on nothing", value: 1 },
            { text: "Hope someone else will build them", value: 2 },
            { text: "Collect more and more, rarely complete them", value: 3 },
            { text: "Organize but rarely execute", value: 4 },
            { text: "Start, finish, and test the idea", value: 5 }
          ]
        },
        {
          id: "d4",
          text: "If your ideas are doubted, you:",
          options: [
            { text: "Dismiss your vision, lose faith", value: 1 },
            { text: "Hide them, waiting for a \"safer\" moment", value: 2 },
            { text: "Get defensive, then distracted", value: 3 },
            { text: "Keep dreaming, work quietly", value: 4 },
            { text: "Push forward, let results speak", value: 5 }
          ]
        }
      ]
    },
    {
      key: "escapist",
      label: "The Escapist",
      color: "#6366f1",
      description: "Runs from obstacles, escapes into fantasy, avoids challenges.",
      needs: "Stop escaping, face challenges, stay present.",
      questions: [
        {
          id: "e1",
          text: "When faced with obstacles, you:",
          options: [
            { text: "Give up and drift away", value: 1 },
            { text: "Wait for circumstances to change", value: 2 },
            { text: "Jump to a new idea to avoid challenge", value: 3 },
            { text: "Rethink your approach, adapt", value: 4 },
            { text: "Break through, solve creatively", value: 5 }
          ]
        },
        {
          id: "e2",
          text: "When overwhelmed, you:",
          options: [
            { text: "Disconnect, procrastinate", value: 1 },
            { text: "Hope things resolve on their own", value: 2 },
            { text: "Dive into fantasy or distractions", value: 3 },
            { text: "Try to organize, but get scattered", value: 4 },
            { text: "Focus on one project and finish", value: 5 }
          ]
        },
        {
          id: "e3",
          text: "With criticism, you:",
          options: [
            { text: "Take it as proof you should stop", value: 1 },
            { text: "Ignore and keep moving", value: 2 },
            { text: "Get defensive, change topics", value: 3 },
            { text: "Pause, adapt, and keep going", value: 4 },
            { text: "Integrate it and refine your vision", value: 5 }
          ]
        },
        {
          id: "e4",
          text: "In tough moments, you:",
          options: [
            { text: "Check out, daydream", value: 1 },
            { text: "Imagine a different life and wait", value: 2 },
            { text: "Lose yourself in new possibilities", value: 3 },
            { text: "Adjust and pivot", value: 4 },
            { text: "See opportunity in chaos", value: 5 }
          ]
        }
      ]
    },
    {
      key: "planner",
      label: "The Planner",
      color: "#4338ca",
      description: "Maps the journey, forgets to walk it, over-plans without action.",
      needs: "Stop planning, start moving, act while planning.",
      questions: [
        {
          id: "p1",
          text: "When it's time to act, you:",
          options: [
            { text: "Keep waiting for the \"perfect\" time", value: 1 },
            { text: "Do what's needed, but lose steam", value: 2 },
            { text: "Overthink details, stall out", value: 3 },
            { text: "Break things into tasks, make slow progress", value: 4 },
            { text: "Make a step-by-step plan and move", value: 5 }
          ]
        },
        {
          id: "p2",
          text: "With deadlines, you:",
          options: [
            { text: "Cram last minute", value: 1 },
            { text: "Get distracted, switch priorities", value: 2 },
            { text: "Organize but let perfection slow you down", value: 3 },
            { text: "Pace yourself, meet them steadily", value: 4 },
            { text: "Finish ahead, build momentum", value: 5 }
          ]
        },
        {
          id: "p3",
          text: "When others doubt your vision, you:",
          options: [
            { text: "Downplay your ideas to fit in", value: 1 },
            { text: "Defend quietly, then rework in private", value: 2 },
            { text: "Debate, but get lost in tangents", value: 3 },
            { text: "Refine your approach, find common ground", value: 4 },
            { text: "Hold steady, let outcomes prove you", value: 5 }
          ]
        },
        {
          id: "p4",
          text: "Organizing complex ideas, you:",
          options: [
            { text: "Procrastinate, then try to catch up", value: 1 },
            { text: "Let plans live in your head, not reality", value: 2 },
            { text: "Build frameworks, but over-complicate", value: 3 },
            { text: "Break things down clearly, then act", value: 4 },
            { text: "Delegate, coordinate, and launch", value: 5 }
          ]
        }
      ]
    },
    {
      key: "architect",
      label: "The Architect",
      color: "#6366f1",
      description: "Builds structures, designs systems, creates frameworks for vision.",
      needs: "Build and let go, trust the structure, allow evolution.",
      questions: [
        {
          id: "a1",
          text: "When a new possibility emerges, you:",
          options: [
            { text: "Get lost in the dream, lose details", value: 1 },
            { text: "Start planning, but get distracted", value: 2 },
            { text: "Try to predict every outcome", value: 3 },
            { text: "Connect it to what you've built so far", value: 4 },
            { text: "See how it fits the bigger picture", value: 5 }
          ]
        },
        {
          id: "a2",
          text: "With big visions, you:",
          options: [
            { text: "Doubt yourself, stay silent", value: 1 },
            { text: "Wait for \"right\" support before trying", value: 2 },
            { text: "Fear they're too much, hold back", value: 3 },
            { text: "Build teams, inspire collaboration", value: 4 },
            { text: "Share them, rally others to help", value: 5 }
          ]
        },
        {
          id: "a3",
          text: "Your approach to complexity is:",
          options: [
            { text: "Retreat and oversimplify", value: 1 },
            { text: "Delay decisions, wait for clarity", value: 2 },
            { text: "Try to manage all at once, get stuck", value: 3 },
            { text: "Ask for feedback, refine the design", value: 4 },
            { text: "Map systems, organize solutions", value: 5 }
          ]
        },
        {
          id: "a4",
          text: "When a project falls apart:",
          options: [
            { text: "Give up and close down", value: 1 },
            { text: "Walk away, start something new", value: 2 },
            { text: "Blame external factors", value: 3 },
            { text: "Gather lessons, rebuild", value: 4 },
            { text: "Start over, with better tools", value: 5 }
          ]
        }
      ]
    },
    {
      key: "seer",
      label: "The Seer",
      color: "#4338ca",
      description: "Sees the future clearly, articulates vision, leads the way forward.",
      needs: "You have arrived. Continue seeing and leading.",
      questions: [
        {
          id: "s1",
          text: "Your gift for others is:",
          options: [
            { text: "Dreaming, but keeping it private", value: 1 },
            { text: "Quietly planting ideas and waiting", value: 2 },
            { text: "Encouraging bold leaps of faith", value: 3 },
            { text: "Seeing patterns no one else can", value: 4 },
            { text: "Articulating the future, leading the way", value: 5 }
          ]
        },
        {
          id: "s2",
          text: "At your best, you:",
          options: [
            { text: "Share visions only with the trusted", value: 1 },
            { text: "Inspire with quiet confidence", value: 2 },
            { text: "Clarify chaos for others", value: 3 },
            { text: "Make the impossible possible", value: 4 },
            { text: "Set new directions, shape reality", value: 5 }
          ]
        },
        {
          id: "s3",
          text: "The field you want to build is:",
          options: [
            { text: "A personal haven to escape into", value: 1 },
            { text: "A safe place for all ideas", value: 2 },
            { text: "One where others dare to dream", value: 3 },
            { text: "One where every pattern is revealed", value: 4 },
            { text: "A world that moves by your vision", value: 5 }
          ]
        },
        {
          id: "s4",
          text: "When your prophecy is fulfilled, you:",
          options: [
            { text: "Retreat, fearing the spotlight", value: 1 },
            { text: "Fade into the background", value: 2 },
            { text: "Savor the moment, reflect", value: 3 },
            { text: "Encourage others to build, not just dream", value: 4 },
            { text: "See beyond to the next horizon", value: 5 }
          ]
        }
      ]
    }
  ],

  diagnosis: {
    dreamer: {
      dreamer: {
        title: "Stage: The Dreamer | Mask: The Dreamer",
        diagnosis: "You live in futures, act in none. Until you move, the world remains an empty page. Dreams mean nothing without steps.",
        explanation: {
          currentState: "You're a Dreamer - you live in futures and lose track of reality.",
          mask: "Your mask is also Dreamer - you use dreaming as your primary escape.",
          directive: "Stop dreaming, start acting. Dreams mean nothing without steps.",
          translation: "Until you move, the world remains an empty page."
        }
      },
      escapist: {
        title: "Stage: The Dreamer | Mask: The Escapist",
        diagnosis: "You run from now, then dream what you abandon. The cycle ends by walking into reality.",
        explanation: {
          currentState: "You're a Dreamer - you live in futures and lose track of reality.",
          mask: "Your mask is Escapist - you run from now, then dream what you abandon.",
          directive: "The cycle ends by walking into reality.",
          translation: "The cycle ends by walking into reality."
        }
      },
      planner: {
        title: "Stage: The Dreamer | Mask: The Planner",
        diagnosis: "You collect plans, but rarely ignite them. Vision is fuel, not shelter. Act, then plan again.",
        explanation: {
          currentState: "You're a Dreamer - you live in futures and lose track of reality.",
          mask: "Your mask is Planner - you collect plans but rarely ignite them.",
          directive: "Act, then plan again. Vision is fuel, not shelter.",
          translation: "Vision is fuel, not shelter. Act, then plan again."
        }
      },
      architect: {
        title: "Stage: The Dreamer | Mask: The Architect",
        diagnosis: "You see structures, but never build them. What is possible means nothing if you stay at the gate.",
        explanation: {
          currentState: "You're a Dreamer - you live in futures and lose track of reality.",
          mask: "Your mask is Architect - you see structures but never build them.",
          directive: "What is possible means nothing if you stay at the gate.",
          translation: "What is possible means nothing if you stay at the gate."
        }
      },
      seer: {
        title: "Stage: The Dreamer | Mask: The Seer",
        diagnosis: "You want to reveal what others can't, but you won't risk being seen. Sight is wasted without action.",
        explanation: {
          currentState: "You're a Dreamer - you live in futures and lose track of reality.",
          mask: "Your mask is Seer - you want to reveal what others can't but won't risk being seen.",
          directive: "Sight is wasted without action. Risk being seen.",
          translation: "Sight is wasted without action."
        }
      }
    },
    escapist: {
      dreamer: {
        title: "Stage: The Escapist | Mask: The Dreamer",
        diagnosis: "You run from now, then dream what you abandon. The cycle ends by walking into reality.",
        explanation: {
          currentState: "You're an Escapist - you run from obstacles and escape into fantasy.",
          mask: "Your mask is Dreamer - you run from now, then dream what you abandon.",
          directive: "The cycle ends by walking into reality.",
          translation: "The cycle ends by walking into reality."
        }
      },
      escapist: {
        title: "Stage: The Escapist | Mask: The Escapist",
        diagnosis: "You master escape, but lose your way home. Vision is worthless if you don't return to the field.",
        explanation: {
          currentState: "You're an Escapist - you run from obstacles and escape into fantasy.",
          mask: "Your mask is also Escapist - you master escape but lose your way home.",
          directive: "Vision is worthless if you don't return to the field.",
          translation: "Vision is worthless if you don't return to the field."
        }
      },
      planner: {
        title: "Stage: The Escapist | Mask: The Planner",
        diagnosis: "You organize escapes, but never commit. Clarity only comes through staying.",
        explanation: {
          currentState: "You're an Escapist - you run from obstacles and escape into fantasy.",
          mask: "Your mask is Planner - you organize escapes but never commit.",
          directive: "Clarity only comes through staying.",
          translation: "Clarity only comes through staying."
        }
      },
      architect: {
        title: "Stage: The Escapist | Mask: The Architect",
        diagnosis: "You see new worlds, but keep your hands clean. Build, or let someone else claim your prophecy.",
        explanation: {
          currentState: "You're an Escapist - you run from obstacles and escape into fantasy.",
          mask: "Your mask is Architect - you see new worlds but keep your hands clean.",
          directive: "Build, or let someone else claim your prophecy.",
          translation: "Build, or let someone else claim your prophecy."
        }
      },
      seer: {
        title: "Stage: The Escapist | Mask: The Seer",
        diagnosis: "You sense the future, but let fear decide your path. Vision means nothing if you hide at the edge.",
        explanation: {
          currentState: "You're an Escapist - you run from obstacles and escape into fantasy.",
          mask: "Your mask is Seer - you sense the future but let fear decide your path.",
          directive: "Vision means nothing if you hide at the edge.",
          translation: "Vision means nothing if you hide at the edge."
        }
      }
    },
    planner: {
      dreamer: {
        title: "Stage: The Planner | Mask: The Dreamer",
        diagnosis: "You plan what you never dare to dream. Without vision, organization is empty.",
        explanation: {
          currentState: "You're a Planner - you map the journey but forget to walk it.",
          mask: "Your mask is Dreamer - you plan what you never dare to dream.",
          directive: "Without vision, organization is empty.",
          translation: "Without vision, organization is empty."
        }
      },
      escapist: {
        title: "Stage: The Planner | Mask: The Escapist",
        diagnosis: "You escape through planning, never step in. The world will not be changed by maps alone.",
        explanation: {
          currentState: "You're a Planner - you map the journey but forget to walk it.",
          mask: "Your mask is Escapist - you escape through planning, never step in.",
          directive: "The world will not be changed by maps alone.",
          translation: "The world will not be changed by maps alone."
        }
      },
      planner: {
        title: "Stage: The Planner | Mask: The Planner",
        diagnosis: "You map the journey, forget to walk it. The true path is always built while moving.",
        explanation: {
          currentState: "You're a Planner - you map the journey but forget to walk it.",
          mask: "Your mask is also Planner - you map the journey but forget to walk it.",
          directive: "The true path is always built while moving.",
          translation: "The true path is always built while moving."
        }
      },
      architect: {
        title: "Stage: The Planner | Mask: The Architect",
        diagnosis: "You design, but hold back. The structure needs both frame and force.",
        explanation: {
          currentState: "You're a Planner - you map the journey but forget to walk it.",
          mask: "Your mask is Architect - you design but hold back.",
          directive: "The structure needs both frame and force.",
          translation: "The structure needs both frame and force."
        }
      },
      seer: {
        title: "Stage: The Planner | Mask: The Seer",
        diagnosis: "You see what could be, but wait for a sign. Build, risk, and reality will answer.",
        explanation: {
          currentState: "You're a Planner - you map the journey but forget to walk it.",
          mask: "Your mask is Seer - you see what could be but wait for a sign.",
          directive: "Build, risk, and reality will answer.",
          translation: "Build, risk, and reality will answer."
        }
      }
    },
    architect: {
      dreamer: {
        title: "Stage: The Architect | Mask: The Dreamer",
        diagnosis: "You sketch castles in the air, but foundations are missing. Root your dream, then rise.",
        explanation: {
          currentState: "You're an Architect - you build structures and design systems.",
          mask: "Your mask is Dreamer - you sketch castles in the air but foundations are missing.",
          directive: "Root your dream, then rise.",
          translation: "Root your dream, then rise."
        }
      },
      escapist: {
        title: "Stage: The Architect | Mask: The Escapist",
        diagnosis: "You build to run from now. Every escape becomes another wall. Tear down, then build again.",
        explanation: {
          currentState: "You're an Architect - you build structures and design systems.",
          mask: "Your mask is Escapist - you build to run from now.",
          directive: "Tear down, then build again. Every escape becomes another wall.",
          translation: "Every escape becomes another wall. Tear down, then build again."
        }
      },
      planner: {
        title: "Stage: The Architect | Mask: The Planner",
        diagnosis: "You plan every detail, never let go. The field wants movement, not mastery.",
        explanation: {
          currentState: "You're an Architect - you build structures and design systems.",
          mask: "Your mask is Planner - you plan every detail but never let go.",
          directive: "The field wants movement, not mastery.",
          translation: "The field wants movement, not mastery."
        }
      },
      architect: {
        title: "Stage: The Architect | Mask: The Architect",
        diagnosis: "Your design holds, but grows stale. Every architect must learn to risk collapse.",
        explanation: {
          currentState: "You're an Architect - you build structures and design systems.",
          mask: "Your mask is also Architect - your design holds but grows stale.",
          directive: "Every architect must learn to risk collapse.",
          translation: "Every architect must learn to risk collapse."
        }
      },
      seer: {
        title: "Stage: The Architect | Mask: The Seer",
        diagnosis: "You see, you build, but you doubt the outcome. Trust your vision—no one else can walk it.",
        explanation: {
          currentState: "You're an Architect - you build structures and design systems.",
          mask: "Your mask is Seer - you see and build but doubt the outcome.",
          directive: "Trust your vision—no one else can walk it.",
          translation: "Trust your vision—no one else can walk it."
        }
      }
    },
    seer: {
      dreamer: {
        title: "Stage: The Seer | Mask: The Dreamer",
        diagnosis: "You see what others cannot, but hesitate. Lead, or lose your prophecy to someone braver.",
        explanation: {
          currentState: "You're a Seer - you see the future clearly and articulate vision.",
          mask: "Your mask is Dreamer - you see what others cannot but hesitate.",
          directive: "Lead, or lose your prophecy to someone braver.",
          translation: "Lead, or lose your prophecy to someone braver."
        }
      },
      escapist: {
        title: "Stage: The Seer | Mask: The Escapist",
        diagnosis: "You slip out when called to rise. Sight is a burden—accept it, and the future bends.",
        explanation: {
          currentState: "You're a Seer - you see the future clearly and articulate vision.",
          mask: "Your mask is Escapist - you slip out when called to rise.",
          directive: "Sight is a burden—accept it, and the future bends.",
          translation: "Sight is a burden—accept it, and the future bends."
        }
      },
      planner: {
        title: "Stage: The Seer | Mask: The Planner",
        diagnosis: "You map, then step back. The Seer acts while others freeze.",
        explanation: {
          currentState: "You're a Seer - you see the future clearly and articulate vision.",
          mask: "Your mask is Planner - you map but then step back.",
          directive: "The Seer acts while others freeze.",
          translation: "The Seer acts while others freeze."
        }
      },
      architect: {
        title: "Stage: The Seer | Mask: The Architect",
        diagnosis: "You build, but wait for proof. Visionaries must walk before they are followed.",
        explanation: {
          currentState: "You're a Seer - you see the future clearly and articulate vision.",
          mask: "Your mask is Architect - you build but wait for proof.",
          directive: "Visionaries must walk before they are followed.",
          translation: "Visionaries must walk before they are followed."
        }
      },
      seer: {
        title: "Stage: The Seer | Mask: The Seer",
        diagnosis: "You are the future revealed. Others follow where you stand. Speak and the world reshapes itself.",
        explanation: {
          currentState: "You're a Seer - you see the future clearly and articulate vision.",
          mask: "Your mask is also Seer - you are the future revealed.",
          directive: "Speak and the world reshapes itself.",
          translation: "You are the future revealed. Speak and the world reshapes itself."
        }
      }
    }
  }
} 