export const rebelArchetype: Archetype = {
  key: "rebel",
  name: "Rebel",
  color: "#dc2626",
  accentColor: "#ef4444",
  glowColor: "rgba(239, 68, 68, 0.5)",
  description: "Disruption Node - The Unbreakable Wall",
  loop: "Opposition for its own sake, attachment to chaos, fear of order.",
  needs: "Choose disruption consciously, learn stillness, integrate discipline, own consequences.",
  
  stages: [
    {
      key: "instigator",
      label: "The Instigator",
      color: "#dc2626",
      description: "You notice unfairness and begin to question authority. You're learning to recognize when systems need to be challenged.",
      needs: "Develop your voice, build confidence in questioning, learn to channel your sense of injustice into constructive action.",
      questions: [
        {
          id: "q1",
          text: "When you notice an unfair rule, you…",
          options: [
            { text: "Quietly find a loophole", value: 4 },
            { text: "Ask others if they agree it's wrong", value: 3 },
            { text: "Call it out immediately", value: 5 },
            { text: "Ignore it, don't want trouble", value: 1 },
            { text: "Joke about it to loosen tension", value: 2 }
          ]
        },
        {
          id: "q2",
          text: "When you disagree with a group, you…",
          options: [
            { text: "Stay silent and keep the peace", value: 1 },
            { text: "Suggest a new way, but gently", value: 3 },
            { text: "Nudge the group in your direction", value: 4 },
            { text: "Debate until your view is heard", value: 5 },
            { text: "Make a sarcastic comment", value: 2 }
          ]
        },
        {
          id: "q3",
          text: "Your first instinct in a broken system is…",
          options: [
            { text: "Directly challenge those in charge", value: 5 },
            { text: "Try to subtly change things", value: 3 },
            { text: "Find small ways to test the system", value: 4 },
            { text: "Watch, but don't interfere", value: 1 },
            { text: "Vent frustration to friends", value: 2 }
          ]
        },
        {
          id: "q4",
          text: "When something feels unjust, you…",
          options: [
            { text: "Organize others to push back", value: 5 },
            { text: "Share your feelings with allies", value: 3 },
            { text: "Break the rule quietly", value: 4 },
            { text: "Feel angry but do nothing", value: 1 },
            { text: "Drop hints something isn't right", value: 2 }
          ]
        },
        {
          id: "q5",
          text: "The main reason you question authority is…",
          options: [
            { text: "To change the system for the better", value: 5 },
            { text: "To understand, not to fight", value: 2 },
            { text: "To reveal the cracks", value: 4 },
            { text: "You don't—authority is fine if it works", value: 1 },
            { text: "Because you want attention", value: 3 }
          ]
        }
      ]
    },
    {
      key: "provoker",
      label: "The Provoker",
      color: "#ef4444",
      description: "You actively provoke thought and challenge others to think differently. You're comfortable stirring things up to get to the truth.",
      needs: "Learn to provoke constructively, develop strategic thinking, avoid provoking just for the sake of it.",
      questions: [
        {
          id: "q6",
          text: "In an argument, you…",
          options: [
            { text: "Provoke on purpose to get real answers", value: 5 },
            { text: "Drop bold questions to stir thought", value: 3 },
            { text: "Press until the truth surfaces", value: 4 },
            { text: "Stay silent and walk away", value: 1 },
            { text: "Tease or mock to break the ice", value: 2 }
          ]
        },
        {
          id: "q7",
          text: "When others play it safe, you…",
          options: [
            { text: "Openly dare them to take risks", value: 5 },
            { text: "Ask why they're afraid to push", value: 3 },
            { text: "Hint at alternatives", value: 4 },
            { text: "Keep your opinion to yourself", value: 1 },
            { text: "Try a mild challenge", value: 2 }
          ]
        },
        {
          id: "q8",
          text: "If someone challenges you, you…",
          options: [
            { text: "Instantly argue back", value: 5 },
            { text: "Defend your view but stay civil", value: 4 },
            { text: "Respond honestly but sharply", value: 3 },
            { text: "Withdraw, not worth the fight", value: 1 },
            { text: "Deflect with humor", value: 2 }
          ]
        },
        {
          id: "q9",
          text: "When you sense tension in the air, you…",
          options: [
            { text: "Push until truth comes out", value: 5 },
            { text: "Ask direct, uncomfortable questions", value: 3 },
            { text: "Make a provocative comment", value: 4 },
            { text: "Say nothing, wait it out", value: 1 },
            { text: "Try to break the tension with a joke", value: 2 }
          ]
        },
        {
          id: "q10",
          text: "The phrase that describes your style is…",
          options: [
            { text: "I challenge to wake people up", value: 5 },
            { text: "I poke at what's false", value: 4 },
            { text: "I hint, then withdraw", value: 3 },
            { text: "I only fight if cornered", value: 1 },
            { text: "I question, but rarely push", value: 2 }
          ]
        }
      ]
    },
    {
      key: "disruptor",
      label: "The Disruptor",
      color: "#f87171",
      description: "You actively disrupt systems and create chaos for positive change. You're comfortable breaking patterns and shaking things up.",
      needs: "Learn to build after disruption, develop strategic vision, avoid becoming addicted to chaos.",
      questions: [
        {
          id: "q11",
          text: "When you see a problem, you…",
          options: [
            { text: "Disrupt the flow to force a fix", value: 5 },
            { text: "Draw attention to it", value: 3 },
            { text: "Quietly change things from behind the scenes", value: 4 },
            { text: "Let someone else handle it", value: 1 },
            { text: "Test if it's really a problem", value: 2 }
          ]
        },
        {
          id: "q12",
          text: "Your idea of \"disruption\" is…",
          options: [
            { text: "Burning down old patterns", value: 5 },
            { text: "Breaking things so something new can emerge", value: 3 },
            { text: "Shaking up routines to see what happens", value: 4 },
            { text: "Making small changes", value: 1 },
            { text: "Causing chaos for fun", value: 2 }
          ]
        },
        {
          id: "q13",
          text: "If someone tells you \"don't do that,\" you…",
          options: [
            { text: "Ask \"why not?\" and do it", value: 5 },
            { text: "Wait until they're gone and do it anyway", value: 3 },
            { text: "Consider the risk, then test it", value: 4 },
            { text: "Ignore and change topic", value: 1 },
            { text: "Comply, but feel resentment", value: 2 }
          ]
        },
        {
          id: "q14",
          text: "When rules make no sense, you…",
          options: [
            { text: "Ignore them completely", value: 5 },
            { text: "Provoke a discussion", value: 3 },
            { text: "Bend them where you can", value: 4 },
            { text: "Go along to avoid conflict", value: 1 },
            { text: "Obey for now, but question later", value: 2 }
          ]
        },
        {
          id: "q15",
          text: "When people expect you to conform, you…",
          options: [
            { text: "Refuse, even if it costs you", value: 5 },
            { text: "Laugh it off, do your own thing later", value: 4 },
            { text: "Push back lightly, test boundaries", value: 3 },
            { text: "Play along for safety", value: 2 },
            { text: "Complain, but obey", value: 1 }
          ]
        }
      ]
    },
    {
      key: "boundary-breaker",
      label: "The Boundary-Breaker",
      color: "#fca5a5",
      description: "You break through limitations and push beyond what others think is possible. You're comfortable crossing lines and exploring the unknown.",
      needs: "Learn to break boundaries consciously, develop wisdom about which boundaries to respect, avoid breaking things just for the sake of it.",
      questions: [
        {
          id: "q16",
          text: "The real reason you cross lines is…",
          options: [
            { text: "To see what's possible", value: 5 },
            { text: "To wake up the group", value: 3 },
            { text: "It feels alive to break barriers", value: 4 },
            { text: "You're unaware there was a line", value: 1 },
            { text: "You're bored by predictability", value: 2 }
          ]
        },
        {
          id: "q17",
          text: "If someone says \"that's impossible,\" you…",
          options: [
            { text: "Attempt it yourself, no hesitation", value: 5 },
            { text: "Try to prove them wrong", value: 3 },
            { text: "Joke about the challenge", value: 4 },
            { text: "Don't care, not your fight", value: 1 },
            { text: "Encourage someone else to try", value: 2 }
          ]
        },
        {
          id: "q18",
          text: "When the group resists change, you…",
          options: [
            { text: "Push for revolution", value: 5 },
            { text: "Propose a wild new idea", value: 4 },
            { text: "Shrug and do your own thing", value: 3 },
            { text: "Nudge gently", value: 2 },
            { text: "Stay silent, they'll never change", value: 1 }
          ]
        },
        {
          id: "q19",
          text: "What excites you most?",
          options: [
            { text: "Making the impossible real", value: 5 },
            { text: "Breaking patterns", value: 4 },
            { text: "Bending rules just to see", value: 3 },
            { text: "Flirting with danger", value: 2 },
            { text: "Not having to think about it", value: 1 }
          ]
        },
        {
          id: "q20",
          text: "In chaos, your move is…",
          options: [
            { text: "Step into the center", value: 5 },
            { text: "Stir things up for clarity", value: 4 },
            { text: "Redirect the energy", value: 3 },
            { text: "Go silent, wait it out", value: 2 },
            { text: "Retreat, let others lead", value: 1 }
          ]
        }
      ]
    },
    {
      key: "renewer",
      label: "The Renewer",
      color: "#fecaca",
      description: "You create new systems and build what comes after disruption. You're not just a breaker—you're a builder of new possibilities.",
      needs: "Maintain your vision while staying grounded, avoid burnout, continue to evolve your methods.",
      questions: [
        {
          id: "q21",
          text: "The future you want is…",
          options: [
            { text: "Built from radical new ideas", value: 5 },
            { text: "A blend of tradition and change", value: 4 },
            { text: "Stable, but open to evolution", value: 3 },
            { text: "Familiar, but less rigid", value: 2 },
            { text: "Same as it's always been", value: 1 }
          ]
        },
        {
          id: "q22",
          text: "When others look to you for change, you…",
          options: [
            { text: "Lead with vision", value: 5 },
            { text: "Join but don't take charge", value: 4 },
            { text: "Encourage from the sidelines", value: 3 },
            { text: "Give cautious advice", value: 2 },
            { text: "Question if it's needed", value: 1 }
          ]
        },
        {
          id: "q23",
          text: "In renewal, your guiding principle is…",
          options: [
            { text: "Burn away the old", value: 5 },
            { text: "Make sure change lasts", value: 4 },
            { text: "Empower others to lead", value: 3 },
            { text: "Honor what came before", value: 2 },
            { text: "Don't get involved", value: 1 }
          ]
        },
        {
          id: "q24",
          text: "After breaking something, you…",
          options: [
            { text: "Help design what's next", value: 5 },
            { text: "Celebrate, then rebuild", value: 4 },
            { text: "Apologize, but don't regret", value: 3 },
            { text: "Offer to repair, but on your terms", value: 2 },
            { text: "Walk away, let others fix it", value: 1 }
          ]
        },
        {
          id: "q25",
          text: "When you finish a revolution, your next urge is…",
          options: [
            { text: "Mentor those who will continue", value: 5 },
            { text: "Seed new ideas", value: 4 },
            { text: "Return to the edge for the next challenge", value: 3 },
            { text: "Stabilize, then start again", value: 2 },
            { text: "Withdraw, you're tired", value: 1 }
          ]
        }
      ]
    }
  ],

  diagnosis: {
    instigator: {
      instigator: {
        title: "The Instigator | Mask: The Questioning Beginner",
        diagnosis: "You are just beginning to question authority and recognize unfairness. Your inner instigator is awakening but still finding its voice.",
        reality: "The field senses your growing awareness of injustice but waits for you to develop confidence in your questioning.",
        tension: "You want to speak up but fear the consequences. This creates a constant state of wanting to act but holding back.",
        lawToWalk: "Begin with small questions. Find safe ways to express your doubts. Your voice will grow stronger with practice.",
        ifYouStay: "You will remain frustrated and feel increasingly disconnected from your authentic self.",
        ifYouAct: "You will develop confidence in your ability to question and challenge, becoming a powerful voice for change."
      },
      provoker: {
        title: "The Instigator | Mask: The Thought Provoker",
        diagnosis: "You question authority and want to provoke deeper thinking, but sometimes hesitate to push too hard. Your instigator nature is strong but learning to provoke.",
        reality: "The field recognizes your ability to question and senses your potential for provoking thought. Your questions have power.",
        tension: "You want to provoke deeper thinking but fear being too confrontational. This creates a gap between your potential and your impact.",
        lawToWalk: "Begin to provoke more boldly. Start with small provocations that align with your questions. Provocation will amplify your impact.",
        ifYouStay: "You will continue to question effectively but may not reach your full potential as a provoker.",
        ifYouAct: "You will develop the ability to provoke thought and become a powerful force for awakening others."
      },
      disruptor: {
        title: "The Instigator | Mask: The Chaos Dreamer",
        diagnosis: "You question authority and want to create disruption, but sometimes hesitate to act on your more radical impulses. Your instigator nature is strong but learning to disrupt.",
        reality: "The field recognizes your ability to question and senses your potential for disruption. Your questions have power, and disruption would amplify them.",
        tension: "You want to create disruption but fear the consequences and responsibility. This creates a gap between your potential and your impact.",
        lawToWalk: "Begin to act on your more radical questions. Start with small disruptions that align with your questioning. Disruption will amplify your impact.",
        ifYouStay: "You will continue to question effectively but may not create the disruption needed for change.",
        ifYouAct: "You will develop the ability to create disruption and become a powerful force for breaking the status quo."
      },
      "boundary-breaker": {
        title: "The Instigator | Mask: The Limit Pusher",
        diagnosis: "You question authority and want to break boundaries, but sometimes hesitate to cross lines. Your instigator nature is strong but learning to break limits.",
        reality: "The field recognizes your ability to question and senses your potential for breaking boundaries. Your questions have power, and boundary-breaking would amplify them.",
        tension: "You want to break boundaries but fear the consequences of crossing lines. This creates a gap between your potential and your impact.",
        lawToWalk: "Begin to break boundaries more boldly. Start with small boundary-crossing that aligns with your questions. Boundary-breaking will amplify your impact.",
        ifYouStay: "You will continue to question effectively but may not reach your full potential as a boundary-breaker.",
        ifYouAct: "You will develop the ability to break boundaries and become a powerful force for expanding possibilities."
      },
      renewer: {
        title: "The Instigator | Mask: The Renewal Dreamer",
        diagnosis: "You question authority and want to create renewal, but sometimes hesitate to take on the role of builder. Your instigator nature is strong but learning to renew.",
        reality: "The field recognizes your ability to question and senses your potential for renewal. Your questions have power, and renewal would amplify them.",
        tension: "You want to create renewal but fear the responsibility of building. This creates a gap between your potential and your impact.",
        lawToWalk: "Begin to take on renewal roles. Start with small building that aligns with your questions. Renewal will amplify your impact.",
        ifYouStay: "You will continue to question effectively but may not reach your full potential as a renewer.",
        ifYouAct: "You will develop the ability to create renewal and become a powerful force for building new systems."
      }
    },
    provoker: {
      instigator: {
        title: "The Provoker | Mask: The Questioning Provoker",
        diagnosis: "You actively provoke thought and challenge others, but sometimes fall back on simple questioning when provoking becomes difficult. Your provocation is effective but could be more powerful.",
        reality: "The field recognizes your ability to provoke and responds to your challenges. Your power is real and growing.",
        tension: "You want to provoke boldly but sometimes fall back on questioning when confrontation becomes difficult. This creates a gap between your potential and your impact.",
        lawToWalk: "Continue to provoke even when questioning would be easier. Your provocations have more power than your questions alone.",
        ifYouStay: "You will continue to provoke effectively but may not reach your full potential as a provoker.",
        ifYouAct: "You will develop complete confidence in your ability to provoke and become a powerful force for awakening others."
      },
      provoker: {
        title: "The Provoker | Mask: The Pure Provoker",
        diagnosis: "You actively provoke thought and challenge others to think differently. You're developing your ability to create sustained provocation and awaken others effectively.",
        reality: "The field recognizes your ability to provoke and responds to your challenges. Your power is real and growing stronger.",
        tension: "You want to provoke more effectively but are still learning the best strategies for creating lasting awakening.",
        lawToWalk: "Continue to provoke and learn from each challenge. Your ability to awaken others is growing with each provocation.",
        ifYouStay: "You will continue to provoke effectively and develop your skills as a provoker.",
        ifYouAct: "You will develop mastery in provoking thought and become a powerful force for awakening consciousness."
      },
      disruptor: {
        title: "The Provoker | Mask: The Chaos Provoker",
        diagnosis: "You actively provoke thought and want to create disruption, but sometimes focus on provoking rather than disrupting. Your provocation is effective but could be more disruptive.",
        reality: "The field recognizes your ability to provoke and senses your potential for disruption. Your power is real and could be amplified.",
        tension: "You want to create disruption but sometimes focus on provoking rather than acting. This creates a gap between your potential and your impact.",
        lawToWalk: "Begin to act on your provocations. Start with small disruptions that align with your challenges. Disruption will amplify your impact.",
        ifYouStay: "You will continue to provoke effectively but may not reach your full potential as a disruptor.",
        ifYouAct: "You will develop the ability to create disruption and become a powerful force for breaking the status quo."
      },
      "boundary-breaker": {
        title: "The Provoker | Mask: The Limit Provoker",
        diagnosis: "You actively provoke thought and want to break boundaries, but sometimes focus on provoking rather than breaking. Your provocation is effective but could be more boundary-breaking.",
        reality: "The field recognizes your ability to provoke and senses your potential for breaking boundaries. Your power is real and could be amplified.",
        tension: "You want to break boundaries but sometimes focus on provoking rather than acting. This creates a gap between your potential and your impact.",
        lawToWalk: "Begin to act on your provocations. Start with small boundary-breaking that aligns with your challenges. Boundary-breaking will amplify your impact.",
        ifYouStay: "You will continue to provoke effectively but may not reach your full potential as a boundary-breaker.",
        ifYouAct: "You will develop the ability to break boundaries and become a powerful force for expanding possibilities."
      },
      renewer: {
        title: "The Provoker | Mask: The Renewal Provoker",
        diagnosis: "You actively provoke thought and want to create renewal, but sometimes focus on provoking rather than building. Your provocation is effective but could be more renewing.",
        reality: "The field recognizes your ability to provoke and senses your potential for renewal. Your power is real and could be amplified.",
        tension: "You want to create renewal but sometimes focus on provoking rather than building. This creates a gap between your potential and your impact.",
        lawToWalk: "Begin to act on your provocations. Start with small renewal that aligns with your challenges. Renewal will amplify your impact.",
        ifYouStay: "You will continue to provoke effectively but may not reach your full potential as a renewer.",
        ifYouAct: "You will develop the ability to create renewal and become a powerful force for building new systems."
      }
    },
    disruptor: {
      instigator: {
        title: "The Disruptor | Mask: The Questioning Storm",
        diagnosis: "You actively disrupt systems but sometimes fall back on questioning when disruption becomes overwhelming. Your disruption is powerful but could be more consistent.",
        reality: "The field recognizes your ability to disrupt and responds to your actions. Your power is real and growing.",
        tension: "You want to disrupt consistently but sometimes fall back on questioning when chaos becomes difficult. This creates a gap between your potential and your impact.",
        lawToWalk: "Continue to disrupt even when questioning would be easier. Your disruptions have more power than your questions alone.",
        ifYouStay: "You will continue to disrupt effectively but may not reach your full potential as a disruptor.",
        ifYouAct: "You will develop complete confidence in your ability to disrupt and become a powerful force for breaking the status quo."
      },
      provoker: {
        title: "The Disruptor | Mask: The Provoking Storm",
        diagnosis: "You actively disrupt systems but sometimes focus on provoking rather than disrupting. Your disruption is effective but could be more powerful.",
        reality: "The field recognizes your ability to disrupt and senses your potential for provocation. Your power is real and could be amplified.",
        tension: "You want to create disruption but sometimes focus on provoking rather than acting. This creates a gap between your potential and your impact.",
        lawToWalk: "Begin to act on your provocations. Start with small disruptions that align with your challenges. Disruption will amplify your impact.",
        ifYouStay: "You will continue to disrupt effectively but may not reach your full potential as a disruptor.",
        ifYouAct: "You will develop the ability to create sustained disruption and become a powerful force for breaking the status quo."
      },
      disruptor: {
        title: "The Disruptor | Mask: The Pure Storm",
        diagnosis: "You actively disrupt systems and are comfortable with chaos. You're developing your ability to create sustained disruption and break major patterns effectively.",
        reality: "The field recognizes your ability to disrupt and responds to your actions. Your power is real and growing stronger.",
        tension: "You want to disrupt more effectively but are still learning the best strategies for creating lasting change.",
        lawToWalk: "Continue to disrupt and learn from each action. Your ability to create change is growing with each disruption.",
        ifYouStay: "You will continue to create disruption effectively and develop your skills as a disruptor.",
        ifYouAct: "You will develop mastery in disrupting systems and become a powerful force for breaking major patterns."
      },
      "boundary-breaker": {
        title: "The Disruptor | Mask: The Limit Storm",
        diagnosis: "You actively disrupt systems and want to break boundaries, but sometimes focus on disrupting rather than breaking limits. Your disruption is effective but could be more boundary-breaking.",
        reality: "The field recognizes your ability to disrupt and senses your potential for breaking boundaries. Your power is real and could be amplified.",
        tension: "You want to break boundaries but sometimes focus on disrupting rather than expanding. This creates a gap between your potential and your impact.",
        lawToWalk: "Begin to focus on breaking boundaries after disruption. Start with small boundary-breaking that aligns with your disruption. Boundary-breaking will amplify your impact.",
        ifYouStay: "You will continue to disrupt effectively but may not reach your full potential as a boundary-breaker.",
        ifYouAct: "You will develop the ability to break boundaries and become a powerful force for expanding possibilities."
      },
      renewer: {
        title: "The Disruptor | Mask: The Renewal Storm",
        diagnosis: "You actively disrupt systems and want to create renewal, but sometimes focus on breaking rather than building. Your disruption is effective but could be more renewing.",
        reality: "The field recognizes your ability to disrupt and senses your potential for renewal. Your power is real and could be amplified.",
        tension: "You want to create renewal but sometimes focus on disrupting rather than building. This creates a gap between your potential and your impact.",
        lawToWalk: "Begin to focus on building after disruption. Start with small renewal that aligns with your disruption. Renewal will amplify your impact.",
        ifYouStay: "You will continue to disrupt effectively but may not reach your full potential as a renewer.",
        ifYouAct: "You will develop the ability to create renewal and become a powerful force for building new systems."
      }
    },
    "boundary-breaker": {
      instigator: {
        title: "The Boundary-Breaker | Mask: The Questioning Explorer",
        diagnosis: "You actively break boundaries but sometimes fall back on questioning when boundary-breaking becomes overwhelming. Your boundary-breaking is powerful but could be more consistent.",
        reality: "The field recognizes your ability to break boundaries and responds to your actions. Your power is real and growing.",
        tension: "You want to break boundaries consistently but sometimes fall back on questioning when expansion becomes difficult. This creates a gap between your potential and your impact.",
        lawToWalk: "Continue to break boundaries even when questioning would be easier. Your boundary-breaking has more power than your questions alone.",
        ifYouStay: "You will continue to break boundaries effectively but may not reach your full potential as a boundary-breaker.",
        ifYouAct: "You will develop complete confidence in your ability to break boundaries and become a powerful force for expanding possibilities."
      },
      provoker: {
        title: "The Boundary-Breaker | Mask: The Provoking Explorer",
        diagnosis: "You actively break boundaries but sometimes focus on provoking rather than expanding. Your boundary-breaking is effective but could be more powerful.",
        reality: "The field recognizes your ability to break boundaries and senses your potential for provocation. Your power is real and could be amplified.",
        tension: "You want to expand boundaries but sometimes focus on provoking rather than acting. This creates a gap between your potential and your impact.",
        lawToWalk: "Begin to act on your provocations. Start with small boundary-breaking that aligns with your challenges. Boundary-breaking will amplify your impact.",
        ifYouStay: "You will continue to break boundaries effectively but may not reach your full potential as a boundary-breaker.",
        ifYouAct: "You will develop the ability to create sustained boundary-breaking and become a powerful force for expanding possibilities."
      },
      disruptor: {
        title: "The Boundary-Breaker | Mask: The Chaos Explorer",
        diagnosis: "You actively break boundaries and want to create disruption, but sometimes focus on expanding rather than breaking. Your boundary-breaking is effective but could be more disruptive.",
        reality: "The field recognizes your ability to break boundaries and senses your potential for disruption. Your power is real and could be amplified.",
        tension: "You want to create disruption but sometimes focus on expanding rather than breaking. This creates a gap between your potential and your impact.",
        lawToWalk: "Begin to focus on disruption after boundary-breaking. Start with small disruption that aligns with your expansion. Disruption will amplify your impact.",
        ifYouStay: "You will continue to break boundaries effectively but may not reach your full potential as a disruptor.",
        ifYouAct: "You will develop the ability to create disruption and become a powerful force for breaking the status quo."
      },
      "boundary-breaker": {
        title: "The Boundary-Breaker | Mask: The Pure Explorer",
        diagnosis: "You actively break boundaries and are comfortable with expansion. You're developing your ability to create sustained boundary-breaking and explore new possibilities effectively.",
        reality: "The field recognizes your ability to break boundaries and responds to your actions. Your power is real and growing stronger.",
        tension: "You want to break boundaries more effectively but are still learning the best strategies for creating lasting expansion.",
        lawToWalk: "Continue to break boundaries and learn from each action. Your ability to expand possibilities is growing with each boundary you cross.",
        ifYouStay: "You will continue to break boundaries effectively and develop your skills as a boundary-breaker.",
        ifYouAct: "You will develop mastery in breaking boundaries and become a powerful force for expanding what's possible."
      },
      renewer: {
        title: "The Boundary-Breaker | Mask: The Renewal Explorer",
        diagnosis: "You actively break boundaries and want to create renewal, but sometimes focus on expanding rather than building. Your boundary-breaking is effective but could be more renewing.",
        reality: "The field recognizes your ability to break boundaries and senses your potential for renewal. Your power is real and could be amplified.",
        tension: "You want to create renewal but sometimes focus on expanding rather than building. This creates a gap between your potential and your impact.",
        lawToWalk: "Begin to focus on building after boundary-breaking. Start with small renewal that aligns with your expansion. Renewal will amplify your impact.",
        ifYouStay: "You will continue to break boundaries effectively but may not reach your full potential as a renewer.",
        ifYouAct: "You will develop the ability to create renewal and become a powerful force for building new systems."
      }
    },
    renewer: {
      instigator: {
        title: "The Renewer | Mask: The Questioning Builder",
        diagnosis: "You actively create renewal but sometimes fall back on questioning when building becomes overwhelming. Your renewal is powerful but could be more consistent.",
        reality: "The field recognizes your ability to create renewal and responds to your actions. Your power is real and growing.",
        tension: "You want to create renewal consistently but sometimes fall back on questioning when building becomes difficult. This creates a gap between your potential and your impact.",
        lawToWalk: "Continue to create renewal even when questioning would be easier. Your renewal has more power than your questions alone.",
        ifYouStay: "You will continue to create renewal effectively but may not reach your full potential as a renewer.",
        ifYouAct: "You will develop complete confidence in your ability to create renewal and become a powerful force for building new systems."
      },
      provoker: {
        title: "The Renewer | Mask: The Provoking Builder",
        diagnosis: "You actively create renewal but sometimes focus on provoking rather than building. Your renewal is effective but could be more powerful.",
        reality: "The field recognizes your ability to create renewal and senses your potential for provocation. Your power is real and could be amplified.",
        tension: "You want to build new systems but sometimes focus on provoking rather than acting. This creates a gap between your potential and your impact.",
        lawToWalk: "Begin to act on your provocations. Start with small renewal that aligns with your challenges. Renewal will amplify your impact.",
        ifYouStay: "You will continue to create renewal effectively but may not reach your full potential as a renewer.",
        ifYouAct: "You will develop the ability to create sustained renewal and become a powerful force for building new systems."
      },
      disruptor: {
        title: "The Renewer | Mask: The Chaos Builder",
        diagnosis: "You actively create renewal and want to create disruption, but sometimes focus on building rather than breaking. Your renewal is effective but could be more disruptive.",
        reality: "The field recognizes your ability to create renewal and senses your potential for disruption. Your power is real and could be amplified.",
        tension: "You want to create disruption but sometimes focus on building rather than breaking. This creates a gap between your potential and your impact.",
        lawToWalk: "Begin to focus on disruption before renewal. Start with small disruption that aligns with your building. Disruption will amplify your impact.",
        ifYouStay: "You will continue to create renewal effectively but may not reach your full potential as a disruptor.",
        ifYouAct: "You will develop the ability to create disruption and become a powerful force for breaking the status quo."
      },
      "boundary-breaker": {
        title: "The Renewer | Mask: The Limit Builder",
        diagnosis: "You actively create renewal and want to break boundaries, but sometimes focus on building rather than expanding. Your renewal is effective but could be more boundary-breaking.",
        reality: "The field recognizes your ability to create renewal and senses your potential for breaking boundaries. Your power is real and could be amplified.",
        tension: "You want to break boundaries but sometimes focus on building rather than expanding. This creates a gap between your potential and your impact.",
        lawToWalk: "Begin to focus on boundary-breaking before renewal. Start with small boundary-breaking that aligns with your building. Boundary-breaking will amplify your impact.",
        ifYouStay: "You will continue to create renewal effectively but may not reach your full potential as a boundary-breaker.",
        ifYouAct: "You will develop the ability to break boundaries and become a powerful force for expanding possibilities."
      },
      renewer: {
        title: "The Renewer | Mask: The Pure Builder",
        diagnosis: "You actively create renewal and are comfortable with building. You're developing your ability to create sustained renewal and build new systems effectively.",
        reality: "The field recognizes your ability to create renewal and responds to your actions. Your power is real and growing stronger.",
        tension: "You want to create renewal more effectively but are still learning the best strategies for creating lasting systems.",
        lawToWalk: "Continue to create renewal and learn from each action. Your ability to build new systems is growing with each renewal.",
        ifYouStay: "You will continue to create renewal effectively and develop your skills as a renewer.",
        ifYouAct: "You will develop mastery in creating renewal and become a powerful force for building new systems."
      }
    }
  }
} 