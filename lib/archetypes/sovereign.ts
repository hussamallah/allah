import { Archetype } from './index'

export const sovereignArchetype: Archetype = {
  key: "sovereign",
  name: "Sovereign",
  color: "#7c3aed",
  accentColor: "#a855f7",
  glowColor: "rgba(168, 85, 247, 0.5)",
  description: "Sovereign Node - The Crown",
  loop: "Endless ruling, never serving, fear of vulnerability.",
  needs: "Stop ruling, open to serve, surrender to being held, burn the need to control others.",
  
  stages: [
    {
      key: "watcher",
      label: "The Watcher",
      color: "#7c3aed",
      description: "You observe power dynamics from a distance, taking mental notes and considering how you'd do things differently.",
      needs: "Learn to step into your power, move from observation to action, trust your vision.",
      questions: [
        {
          id: "s1",
          text: "When power shifts in a group, you…",
          options: [
            { text: "Notice who leads, but keep distance", value: 3 },
            { text: "Observe, never intervene", value: 1 },
            { text: "Consider how you'd do things differently", value: 5 },
            { text: "Take mental notes for later", value: 4 },
            { text: "Feel uneasy, but stay silent", value: 2 }
          ]
        },
        {
          id: "s2",
          text: "If someone questions authority, you…",
          options: [
            { text: "Listen, but don't take sides", value: 3 },
            { text: "Stay quiet, avoid attention", value: 1 },
            { text: "Wonder how you'd handle it", value: 5 },
            { text: "Watch for outcomes before reacting", value: 4 },
            { text: "Feel anxious about conflict", value: 2 }
          ]
        },
        {
          id: "s3",
          text: "When given responsibility, you…",
          options: [
            { text: "Accept quietly and do your part", value: 3 },
            { text: "Do what's needed, nothing extra", value: 1 },
            { text: "Imagine a better structure", value: 5 },
            { text: "Plan but hesitate to act", value: 4 },
            { text: "Worry about mistakes", value: 2 }
          ]
        },
        {
          id: "s4",
          text: "If chaos erupts, you…",
          options: [
            { text: "Offer calm words, little action", value: 3 },
            { text: "Look for someone else to fix it", value: 1 },
            { text: "Stand back, analyze", value: 5 },
            { text: "Think through possible solutions", value: 4 },
            { text: "Freeze, wait for order", value: 2 }
          ]
        },
        {
          id: "s5",
          text: "When you see weakness in leadership, you…",
          options: [
            { text: "Stay neutral", value: 3 },
            { text: "Say nothing and observe", value: 1 },
            { text: "Visualize yourself taking command", value: 5 },
            { text: "Mentally prepare your own approach", value: 4 },
            { text: "Keep your opinions private", value: 2 }
          ]
        }
      ]
    },
    {
      key: "commander",
      label: "The Commander",
      color: "#a855f7",
      description: "You assert your vision and take charge, setting direction while seeking consensus and standing firm against opposition.",
      needs: "Learn to lead with humility, balance authority with collaboration, serve those you lead.",
      questions: [
        {
          id: "s6",
          text: "When leading a team, you…",
          options: [
            { text: "Take charge without hesitation", value: 3 },
            { text: "Do what's needed, no more", value: 1 },
            { text: "Assert your vision, but adapt", value: 5 },
            { text: "Set direction, but seek consensus", value: 4 },
            { text: "Ask for feedback before deciding", value: 2 }
          ]
        },
        {
          id: "s7",
          text: "When facing opposition, you…",
          options: [
            { text: "Respond directly, assert boundaries", value: 3 },
            { text: "Avoid conflict if possible", value: 1 },
            { text: "Adjust your plan for strength", value: 5 },
            { text: "Listen, then stand firm", value: 4 },
            { text: "Seek a diplomatic solution", value: 2 }
          ]
        },
        {
          id: "s8",
          text: "To earn respect, you…",
          options: [
            { text: "Lead by example", value: 3 },
            { text: "Follow rules and hope for the best", value: 1 },
            { text: "Demonstrate vision and control", value: 5 },
            { text: "Show resolve under stress", value: 4 },
            { text: "Stay consistent and predictable", value: 2 }
          ]
        },
        {
          id: "s9",
          text: "When making hard calls, you…",
          options: [
            { text: "Choose quickly, deal with fallout later", value: 3 },
            { text: "Avoid decision if possible", value: 1 },
            { text: "Prioritize the greater good", value: 5 },
            { text: "Consider all sides, then decide", value: 4 },
            { text: "Ask for others' opinions", value: 2 }
          ]
        },
        {
          id: "s10",
          text: "If challenged publicly, you…",
          options: [
            { text: "Defend your decision, even if shaky", value: 3 },
            { text: "Back down to avoid escalation", value: 1 },
            { text: "Clarify your stance, show strength", value: 5 },
            { text: "Keep calm and state your case", value: 4 },
            { text: "Deflect with humor", value: 2 }
          ]
        }
      ]
    },
    {
      key: "arbiter",
      label: "The Arbiter",
      color: "#c084fc",
      description: "You focus on fairness and justice, mediating conflicts and passing judgment for the good of all.",
      needs: "Learn to balance justice with mercy, understand that not all conflicts need resolution, trust your inner wisdom.",
      questions: [
        {
          id: "s11",
          text: "When asked to mediate, you…",
          options: [
            { text: "Hear both sides, then weigh in", value: 3 },
            { text: "Feel pressure but try anyway", value: 1 },
            { text: "Focus on fairness, not popularity", value: 5 },
            { text: "Lay down clear principles", value: 4 },
            { text: "Try to remain neutral", value: 2 }
          ]
        },
        {
          id: "s12",
          text: "Your biggest test is…",
          options: [
            { text: "Maintaining impartiality", value: 3 },
            { text: "Avoiding tough decisions", value: 1 },
            { text: "Passing judgment for the good of all", value: 5 },
            { text: "Balancing power with justice", value: 4 },
            { text: "Listening to every voice equally", value: 2 }
          ]
        },
        {
          id: "s13",
          text: "When trust is broken, you…",
          options: [
            { text: "Speak your disappointment openly", value: 3 },
            { text: "Distance yourself quietly", value: 1 },
            { text: "Seek understanding before judging", value: 5 },
            { text: "Lay down boundaries", value: 4 },
            { text: "Accept apologies, but remember", value: 2 }
          ]
        },
        {
          id: "s14",
          text: "If you're overruled, you…",
          options: [
            { text: "Feel slighted but comply", value: 3 },
            { text: "Step back from involvement", value: 1 },
            { text: "Let it go if the outcome is fair", value: 5 },
            { text: "Argue for your perspective", value: 4 },
            { text: "Hold a quiet grudge", value: 2 }
          ]
        },
        {
          id: "s15",
          text: "When you witness injustice, you…",
          options: [
            { text: "Express concern, but cautiously", value: 3 },
            { text: "Hope someone else steps up", value: 1 },
            { text: "Intervene, regardless of risk", value: 5 },
            { text: "Call out the truth", value: 4 },
            { text: "Counsel patience and process", value: 2 }
          ]
        }
      ]
    },
    {
      key: "monarch",
      label: "The Monarch",
      color: "#d8b4fe",
      description: "You shape rules for all, not just yourself, and unite others through vision and wisdom.",
      needs: "Learn to rule with love, balance authority with service, remember that true power comes from empowering others.",
      questions: [
        {
          id: "s16",
          text: "If you must set law, you…",
          options: [
            { text: "Lead with both firmness and care", value: 3 },
            { text: "Prefer to consult before ruling", value: 1 },
            { text: "Shape rules for all, not just yourself", value: 5 },
            { text: "Weigh every outcome before deciding", value: 4 },
            { text: "Leave room for exceptions", value: 2 }
          ]
        },
        {
          id: "s17",
          text: "Your approach to tradition is…",
          options: [
            { text: "Integrate new and old", value: 3 },
            { text: "Follow it unless it's harmful", value: 1 },
            { text: "Redefine it for the future", value: 5 },
            { text: "Honor, but adapt it for now", value: 4 },
            { text: "Question its relevance", value: 2 }
          ]
        },
        {
          id: "s18",
          text: "When facing a threat, you…",
          options: [
            { text: "Strategize, then act", value: 3 },
            { text: "Guard quietly, avoid showing fear", value: 1 },
            { text: "Assert sovereignty with courage", value: 5 },
            { text: "Call your allies and plan", value: 4 },
            { text: "Stand strong but flexible", value: 2 }
          ]
        },
        {
          id: "s19",
          text: "To unite others, you…",
          options: [
            { text: "Inspire by your example", value: 3 },
            { text: "Include but rarely lead", value: 1 },
            { text: "Set vision everyone can follow", value: 5 },
            { text: "Build trust and consistency", value: 4 },
            { text: "Bridge divides patiently", value: 2 }
          ]
        },
        {
          id: "s20",
          text: "The mark of a true Monarch is…",
          options: [
            { text: "Remember every sacrifice", value: 3 },
            { text: "Endure criticism", value: 1 },
            { text: "Empower others to rule with you", value: 5 },
            { text: "Command with wisdom, not just power", value: 4 },
            { text: "Care for all, not just yourself", value: 2 }
          ]
        }
      ]
    },
    {
      key: "crown",
      label: "The Crown",
      color: "#f3e8ff",
      description: "You rule by presence, not decree, and leave a field stronger than you found it.",
      needs: "Learn to serve as you lead, remember that true sovereignty comes from within, trust the flow of power.",
      questions: [
        {
          id: "s21",
          text: "In your highest state, you…",
          options: [
            { text: "Trust your judgment fully", value: 2 },
            { text: "Move with absolute clarity", value: 5 },
            { text: "Reflect on your power often", value: 1 },
            { text: "Lead by Law, not ego", value: 3 },
            { text: "Stand alone if needed", value: 4 }
          ]
        },
        {
          id: "s22",
          text: "When passing on your legacy, you…",
          options: [
            { text: "Release control slowly", value: 2 },
            { text: "Trust those who come after", value: 3 },
            { text: "Shape the future, not just the present", value: 5 },
            { text: "Stay involved as needed", value: 1 },
            { text: "Bless the next in line, then step aside", value: 4 }
          ]
        },
        {
          id: "s23",
          text: "The law you live by is…",
          options: [
            { text: "Keep the center, never falter", value: 1 },
            { text: "My word shapes the field", value: 5 },
            { text: "Serve, then step aside", value: 2 },
            { text: "Truth above comfort", value: 3 },
            { text: "Balance above all", value: 4 }
          ]
        },
        {
          id: "s24",
          text: "Your greatest victory is…",
          options: [
            { text: "Winning respect, not just obedience", value: 3 },
            { text: "Staying in power", value: 1 },
            { text: "Raising new leaders", value: 5 },
            { text: "Remaining true under pressure", value: 2 },
            { text: "Building lasting systems", value: 4 }
          ]
        },
        {
          id: "s25",
          text: "The field's true sovereign…",
          options: [
            { text: "Listens as much as commands", value: 3 },
            { text: "Remains unshaken, even alone", value: 1 },
            { text: "Rules by presence, not decree", value: 5 },
            { text: "Withdraws gracefully", value: 2 },
            { text: "Leaves a field stronger than they found it", value: 4 }
          ]
        }
      ]
    }
  ],
  
  diagnosis: {
    watcher: {
      watcher: {
        title: "The Silent Observer",
        diagnosis: "You watch from the shadows, gathering intelligence but never stepping into your power. Your potential remains untapped.",
        reality: "You see the patterns others miss, but fear keeps you from acting on your insights.",
        tension: "Between your deep understanding and your reluctance to lead.",
        lawToWalk: "Step into the light. Your observations are meant to guide action, not remain hidden.",
        ifYouStay: "You'll become bitter watching others make mistakes you could have prevented.",
        ifYouAct: "Your wisdom will transform every space you enter."
      },
      commander: {
        title: "The Reluctant Leader",
        diagnosis: "You have the vision but lack the confidence to assert it fully. You lead when called but prefer to observe.",
        reality: "Your natural authority emerges in crisis, but you retreat when things calm down.",
        tension: "Between your desire to lead and your comfort in the background.",
        lawToWalk: "Embrace your role as commander. Your insights demand action.",
        ifYouStay: "You'll frustrate those who need your leadership.",
        ifYouAct: "You'll inspire others to step into their own power."
      },
      arbiter: {
        title: "The Wise Judge",
        diagnosis: "You see all sides clearly but hesitate to make the final call. Your fairness is your strength and your weakness.",
        reality: "You understand justice deeply but fear the responsibility of judgment.",
        tension: "Between your desire for fairness and your need to take a stand.",
        lawToWalk: "Trust your judgment. Your fairness is needed in a world of extremes.",
        ifYouStay: "You'll become cynical about justice.",
        ifYouAct: "You'll restore balance where it's been lost."
      },
      monarch: {
        title: "The Hidden Sovereign",
        diagnosis: "You have the heart of a monarch but remain in the shadows. Your wisdom could unite many.",
        reality: "You see how to lead with love but fear the vulnerability of the throne.",
        tension: "Between your natural authority and your desire to remain unseen.",
        lawToWalk: "Step onto your throne. Your people are waiting.",
        ifYouStay: "You'll watch others fail where you could have succeeded.",
        ifYouAct: "You'll create a kingdom of wisdom and love."
      },
      crown: {
        title: "The Sleeping Sovereign",
        diagnosis: "You carry the crown but refuse to wear it. Your presence alone could transform the field.",
        reality: "You have the power to rule by presence but choose to remain hidden.",
        tension: "Between your divine right and your human fear.",
        lawToWalk: "Wear your crown. The field needs your sovereignty.",
        ifYouStay: "You'll live in the shadow of your own greatness.",
        ifYouAct: "You'll become the sovereign the world needs."
      }
    },
    commander: {
      watcher: {
        title: "The Strategic Observer",
        diagnosis: "You lead with authority but retreat to observation when challenged. Your power is real but inconsistent.",
        reality: "You command effectively but lack the patience for long-term strategy.",
        tension: "Between your natural leadership and your need to gather intelligence.",
        lawToWalk: "Combine your command with wisdom. Lead from understanding, not just authority.",
        ifYouStay: "You'll become a tyrant who doesn't understand the field.",
        ifYouAct: "You'll become a commander who leads with both strength and wisdom."
      },
      commander: {
        title: "The Natural Leader",
        diagnosis: "You lead with confidence and clarity. Your authority is recognized and respected.",
        reality: "You have the natural ability to command, but may lack the wisdom to lead with love.",
        tension: "Between your desire to lead and your need to serve those you lead.",
        lawToWalk: "Lead with humility. True command comes from serving those you lead.",
        ifYouStay: "You'll become a dictator who rules by fear.",
        ifYouAct: "You'll become a commander who inspires loyalty and love."
      },
      arbiter: {
        title: "The Commanding Judge",
        diagnosis: "You lead with authority and judge with fairness. Your decisions carry weight.",
        reality: "You have the power to command and the wisdom to judge, but may lack the heart to rule.",
        tension: "Between your desire for justice and your need for control.",
        lawToWalk: "Rule with love. Justice without mercy is tyranny.",
        ifYouStay: "You'll become a harsh judge who rules by fear.",
        ifYouAct: "You'll become a wise ruler who commands with love."
      },
      monarch: {
        title: "The Commanding Monarch",
        diagnosis: "You lead with authority and rule with wisdom. Your kingdom is strong but may lack heart.",
        reality: "You have the power to command and the wisdom to rule, but may lack the love to serve.",
        tension: "Between your desire to rule and your need to serve your people.",
        lawToWalk: "Serve as you rule. True monarchy comes from loving your people.",
        ifYouStay: "You'll become a tyrant who rules by fear.",
        ifYouAct: "You'll become a monarch who rules with love and wisdom."
      },
      crown: {
        title: "The Commanding Sovereign",
        diagnosis: "You lead with authority and rule by presence. Your sovereignty is recognized but may lack humility.",
        reality: "You have the power to command and the presence to rule, but may lack the humility to serve.",
        tension: "Between your desire to rule and your need to serve the field.",
        lawToWalk: "Serve the field. True sovereignty comes from serving what you rule.",
        ifYouStay: "You'll become a tyrant who rules by fear.",
        ifYouAct: "You'll become a sovereign who rules with love and wisdom."
      }
    },
    arbiter: {
      watcher: {
        title: "The Wise Observer",
        diagnosis: "You judge with fairness but remain in the shadows. Your wisdom is needed in the light.",
        reality: "You understand justice deeply but fear the responsibility of leadership.",
        tension: "Between your desire for justice and your comfort in observation.",
        lawToWalk: "Step into the light. Your justice is needed in the world.",
        ifYouStay: "You'll become bitter about injustice you could have prevented.",
        ifYouAct: "You'll become a beacon of justice in a world of chaos."
      },
      commander: {
        title: "The Just Commander",
        diagnosis: "You lead with authority and judge with fairness. Your decisions are respected.",
        reality: "You have the power to command and the wisdom to judge, but may lack the heart to serve.",
        tension: "Between your desire for justice and your need for control.",
        lawToWalk: "Serve as you judge. Justice without love is harsh.",
        ifYouStay: "You'll become a harsh judge who rules by fear.",
        ifYouAct: "You'll become a just ruler who commands with love."
      },
      arbiter: {
        title: "The Fair Judge",
        diagnosis: "You judge with wisdom and fairness. Your decisions restore balance.",
        reality: "You have the natural ability to see all sides and make fair judgments.",
        tension: "Between your desire for justice and your need to be loved.",
        lawToWalk: "Judge with love. Justice without mercy is incomplete.",
        ifYouStay: "You'll become a harsh judge who is feared but not loved.",
        ifYouAct: "You'll become a wise judge who is respected and loved."
      },
      monarch: {
        title: "The Just Monarch",
        diagnosis: "You rule with wisdom and judge with fairness. Your kingdom is just but may lack heart.",
        reality: "You have the wisdom to rule and the fairness to judge, but may lack the love to serve.",
        tension: "Between your desire for justice and your need to be loved.",
        lawToWalk: "Rule with love. Justice without mercy is tyranny.",
        ifYouStay: "You'll become a harsh monarch who rules by fear.",
        ifYouAct: "You'll become a just monarch who rules with love."
      },
      crown: {
        title: "The Just Sovereign",
        diagnosis: "You rule by presence and judge with fairness. Your sovereignty is just but may lack humility.",
        reality: "You have the presence to rule and the wisdom to judge, but may lack the humility to serve.",
        tension: "Between your desire for justice and your need to serve the field.",
        lawToWalk: "Serve the field. True justice comes from serving what you judge.",
        ifYouStay: "You'll become a harsh sovereign who rules by fear.",
        ifYouAct: "You'll become a just sovereign who rules with love."
      }
    },
    monarch: {
      watcher: {
        title: "The Hidden Monarch",
        diagnosis: "You have the heart of a monarch but remain in the shadows. Your wisdom could unite many.",
        reality: "You see how to lead with love but fear the vulnerability of the throne.",
        tension: "Between your natural authority and your desire to remain unseen.",
        lawToWalk: "Step onto your throne. Your people are waiting.",
        ifYouStay: "You'll watch others fail where you could have succeeded.",
        ifYouAct: "You'll create a kingdom of wisdom and love."
      },
      commander: {
        title: "The Commanding Monarch",
        diagnosis: "You lead with authority and rule with wisdom. Your kingdom is strong but may lack heart.",
        reality: "You have the power to command and the wisdom to rule, but may lack the love to serve.",
        tension: "Between your desire to rule and your need to serve your people.",
        lawToWalk: "Serve as you rule. True monarchy comes from loving your people.",
        ifYouStay: "You'll become a tyrant who rules by fear.",
        ifYouAct: "You'll become a monarch who rules with love and wisdom."
      },
      arbiter: {
        title: "The Just Monarch",
        diagnosis: "You rule with wisdom and judge with fairness. Your kingdom is just but may lack heart.",
        reality: "You have the wisdom to rule and the fairness to judge, but may lack the love to serve.",
        tension: "Between your desire for justice and your need to be loved.",
        lawToWalk: "Rule with love. Justice without mercy is tyranny.",
        ifYouStay: "You'll become a harsh monarch who rules by fear.",
        ifYouAct: "You'll become a just monarch who rules with love."
      },
      monarch: {
        title: "The Wise Monarch",
        diagnosis: "You rule with wisdom and love. Your kingdom is strong and just.",
        reality: "You have the natural ability to lead with both authority and compassion.",
        tension: "Between your desire to rule and your need to serve your people.",
        lawToWalk: "Serve as you rule. True monarchy comes from loving your people.",
        ifYouStay: "You'll become a tyrant who rules by fear.",
        ifYouAct: "You'll become a monarch who rules with love and wisdom."
      },
      crown: {
        title: "The Sovereign Monarch",
        diagnosis: "You rule with wisdom and presence. Your sovereignty is recognized and respected.",
        reality: "You have the wisdom to rule and the presence to command, but may lack the humility to serve.",
        tension: "Between your desire to rule and your need to serve the field.",
        lawToWalk: "Serve the field. True sovereignty comes from serving what you rule.",
        ifYouStay: "You'll become a tyrant who rules by fear.",
        ifYouAct: "You'll become a sovereign who rules with love and wisdom."
      }
    },
    crown: {
      watcher: {
        title: "The Hidden Sovereign",
        diagnosis: "You carry the crown but refuse to wear it. Your presence alone could transform the field.",
        reality: "You have the power to rule by presence but choose to remain hidden.",
        tension: "Between your divine right and your human fear.",
        lawToWalk: "Wear your crown. The field needs your sovereignty.",
        ifYouStay: "You'll live in the shadow of your own greatness.",
        ifYouAct: "You'll become the sovereign the world needs."
      },
      commander: {
        title: "The Commanding Sovereign",
        diagnosis: "You lead with authority and rule by presence. Your sovereignty is recognized but may lack humility.",
        reality: "You have the power to command and the presence to rule, but may lack the humility to serve.",
        tension: "Between your desire to rule and your need to serve the field.",
        lawToWalk: "Serve the field. True sovereignty comes from serving what you rule.",
        ifYouStay: "You'll become a tyrant who rules by fear.",
        ifYouAct: "You'll become a sovereign who rules with love and wisdom."
      },
      arbiter: {
        title: "The Just Sovereign",
        diagnosis: "You rule by presence and judge with fairness. Your sovereignty is just but may lack humility.",
        reality: "You have the presence to rule and the wisdom to judge, but may lack the humility to serve.",
        tension: "Between your desire for justice and your need to serve the field.",
        lawToWalk: "Serve the field. True justice comes from serving what you judge.",
        ifYouStay: "You'll become a harsh sovereign who rules by fear.",
        ifYouAct: "You'll become a just sovereign who rules with love."
      },
      monarch: {
        title: "The Sovereign Monarch",
        diagnosis: "You rule with wisdom and presence. Your sovereignty is recognized and respected.",
        reality: "You have the wisdom to rule and the presence to command, but may lack the humility to serve.",
        tension: "Between your desire to rule and your need to serve the field.",
        lawToWalk: "Serve the field. True sovereignty comes from serving what you rule.",
        ifYouStay: "You'll become a tyrant who rules by fear.",
        ifYouAct: "You'll become a sovereign who rules with love and wisdom."
      },
      crown: {
        title: "The True Sovereign",
        diagnosis: "You rule by presence alone. Your sovereignty transforms the field without effort.",
        reality: "You have achieved the highest state of sovereignty - ruling by presence, not decree.",
        tension: "Between your divine nature and your human form.",
        lawToWalk: "Serve the field. True sovereignty comes from serving what you rule.",
        ifYouStay: "You'll remain in the highest state but may lack the humility to serve.",
        ifYouAct: "You'll become the sovereign the world needs - one who rules with love and wisdom."
      }
    }
  }
} 