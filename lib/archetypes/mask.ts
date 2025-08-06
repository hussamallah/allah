import { Archetype } from './index'

export const maskArchetype: Archetype = {
  key: "mask",
  name: "Mask",
  color: "#6b7280",
  accentColor: "#9ca3af",
  glowColor: "rgba(156, 163, 175, 0.5)",
  description: "Mask Node (Facade/Shadow) - The Veil",
  loop: "Sometimes, you lose yourself in your masks. Notice when your talent for adaptation prevents you from forming real, lasting identity or trust.",
  needs: "Become the veil, master adaptation, burn the need to disappear.",
  
  stages: [
    {
      key: "shapeshifter",
      label: "The Shapeshifter",
      color: "#6b7280",
      description: "You instantly adapt to others' expectations, becoming what's wanted in any situation.",
      needs: "Learn to hold to your truth while still being adaptable. Find the balance between fitting in and staying authentic.",
      questions: [
        {
          id: "q1",
          text: "When you sense others' expectations, you…",
          options: [
            { text: "Hold to your truth, but softly", value: 5 },
            { text: "Remain partly yourself, partly them", value: 4 },
            { text: "Adapt your words to fit in", value: 3 },
            { text: "Shift, but feel uneasy", value: 2 },
            { text: "Instantly become what's wanted", value: 1 }
          ]
        },
        {
          id: "q2",
          text: "If a group dynamic shifts, you…",
          options: [
            { text: "Stay as you are, regardless", value: 5 },
            { text: "Keep your opinions subtle but unchanged", value: 4 },
            { text: "Change how you speak or move", value: 3 },
            { text: "Watch and mirror the new tone", value: 2 },
            { text: "Blend in with the loudest voice", value: 1 }
          ]
        },
        {
          id: "q3",
          text: "When uncomfortable in social settings, you…",
          options: [
            { text: "Stand quietly, but don't pretend", value: 5 },
            { text: "Share only a little of yourself", value: 4 },
            { text: "Fade into the background", value: 3 },
            { text: "Make jokes or small talk to belong", value: 2 },
            { text: "Mimic the person who seems most liked", value: 1 }
          ]
        },
        {
          id: "q4",
          text: "With new people, your first move is…",
          options: [
            { text: "Offer one true thing about yourself", value: 5 },
            { text: "Reveal only what feels safe", value: 4 },
            { text: "Lead with questions, not yourself", value: 3 },
            { text: "Mirror their energy for acceptance", value: 2 },
            { text: "See what they want, then become it", value: 1 }
          ]
        },
        {
          id: "q5",
          text: "When criticized, you…",
          options: [
            { text: "Take it in, respond authentically", value: 5 },
            { text: "Listen, but don't change core values", value: 4 },
            { text: "Laugh it off, change topic", value: 3 },
            { text: "Say what's expected", value: 2 },
            { text: "Instantly adapt to avoid it", value: 1 }
          ]
        }
      ]
    },
    {
      key: "chameleon",
      label: "The Chameleon",
      color: "#9ca3af",
      description: "You change your style and behavior to match different environments while maintaining some core identity.",
      needs: "Learn to act consistently while still being adaptable. Develop a strong sense of self that doesn't disappear in different contexts.",
      questions: [
        {
          id: "q6",
          text: "Your approach to different friend groups is…",
          options: [
            { text: "Act the same everywhere", value: 5 },
            { text: "Adapt, but keep one trait constant", value: 4 },
            { text: "Change how you act, but keep your story", value: 3 },
            { text: "Different style with each", value: 2 },
            { text: "Reflect everyone's mood", value: 1 }
          ]
        },
        {
          id: "q7",
          text: "When tension rises, you…",
          options: [
            { text: "Speak up honestly", value: 5 },
            { text: "Match energy to soothe", value: 4 },
            { text: "Mediate, but hide your opinion", value: 3 },
            { text: "Distract with humor or stories", value: 2 },
            { text: "Disappear into the crowd", value: 1 }
          ]
        },
        {
          id: "q8",
          text: "If you're asked for your real opinion, you…",
          options: [
            { text: "Tell the truth directly", value: 5 },
            { text: "Say what you believe, but soften it", value: 4 },
            { text: "Add something neutral", value: 3 },
            { text: "Offer a safe, blended answer", value: 2 },
            { text: "Echo what others say", value: 1 }
          ]
        },
        {
          id: "q9",
          text: "When out of sync, you…",
          options: [
            { text: "Stay honest, even if awkward", value: 5 },
            { text: "Retreat until it feels safe", value: 4 },
            { text: "Change your plans", value: 3 },
            { text: "Imitate others to fit in", value: 2 },
            { text: "Watch and copy", value: 1 }
          ]
        },
        {
          id: "q10",
          text: "In group settings, your mask is…",
          options: [
            { text: "Nearly gone", value: 5 },
            { text: "Present, but thin", value: 4 },
            { text: "Half real, half performed", value: 3 },
            { text: "Carefully tuned to the moment", value: 2 },
            { text: "Always shifting", value: 1 }
          ]
        }
      ]
    },
    {
      key: "player",
      label: "The Player",
      color: "#d1d5db",
      description: "You perform different roles and personas, often losing yourself in the act of playing parts.",
      needs: "Learn to use performance to share something real rather than losing yourself in roles. Choose authenticity over entertainment.",
      questions: [
        {
          id: "q11",
          text: "When you want to impress, you…",
          options: [
            { text: "Stay authentic, risk not being liked", value: 5 },
            { text: "Show many versions of yourself", value: 4 },
            { text: "Entertain with stories or wit", value: 3 },
            { text: "Try on a new persona", value: 2 },
            { text: "Go with what's expected", value: 1 }
          ]
        },
        {
          id: "q12",
          text: "If a role is needed, you…",
          options: [
            { text: "Say no if it isn't real", value: 5 },
            { text: "Do it, but add a twist of truth", value: 4 },
            { text: "Step in and perform it", value: 3 },
            { text: "Volunteer, but improvise", value: 2 },
            { text: "Hide behind a smile", value: 1 }
          ]
        },
        {
          id: "q13",
          text: "When playing along, you…",
          options: [
            { text: "Use performance to share something real", value: 5 },
            { text: "Drop hints about your real self", value: 4 },
            { text: "Make it fun, but keep some honesty", value: 3 },
            { text: "Get caught up in the mask", value: 2 },
            { text: "Lose yourself in the act", value: 1 }
          ]
        },
        {
          id: "q14",
          text: "When others rely on your role, you…",
          options: [
            { text: "Name what's real and what's not", value: 5 },
            { text: "Step out, seek freedom", value: 4 },
            { text: "Take pride in your versatility", value: 3 },
            { text: "Fill it to keep peace", value: 2 },
            { text: "Resent the expectation", value: 1 }
          ]
        },
        {
          id: "q15",
          text: "After a day of \"masking,\" you…",
          options: [
            { text: "Return to truth as soon as possible", value: 5 },
            { text: "Use humor to recover", value: 4 },
            { text: "Feel drained, but satisfied", value: 3 },
            { text: "Forget who you were with each group", value: 2 },
            { text: "Miss your real self", value: 1 }
          ]
        }
      ]
    },
    {
      key: "disguiser",
      label: "The Disguiser",
      color: "#e5e7eb",
      description: "You hide behind complex disguises and personas, often feeling threatened and needing to protect yourself.",
      needs: "Learn to reveal small truths to stay anchored. Stop hiding behind complex disguises and begin to show your authentic self.",
      questions: [
        {
          id: "q16",
          text: "When hiding is necessary, you…",
          options: [
            { text: "Reveal small truths to stay anchored", value: 5 },
            { text: "Play so many parts, you lose track", value: 4 },
            { text: "Adopt traits to survive", value: 3 },
            { text: "Change accents, language, or style", value: 2 },
            { text: "Shape-shift until you're invisible", value: 1 }
          ]
        },
        {
          id: "q17",
          text: "When you feel threatened, you…",
          options: [
            { text: "Admit your fear honestly", value: 5 },
            { text: "Joke, distract, or redirect", value: 4 },
            { text: "Use charm to deflect", value: 3 },
            { text: "Retreat into a safe persona", value: 2 },
            { text: "Become whoever is safest", value: 1 }
          ]
        },
        {
          id: "q18",
          text: "In times of high pressure, your mask is…",
          options: [
            { text: "Nearly gone, replaced by real feeling", value: 5 },
            { text: "Clearly there, but managed", value: 4 },
            { text: "Thicker, more complex", value: 3 },
            { text: "Comfortable, but false", value: 2 },
            { text: "Slippery, always changing", value: 1 }
          ]
        },
        {
          id: "q19",
          text: "When blending in goes too far, you…",
          options: [
            { text: "Deliberately reveal something true", value: 5 },
            { text: "Try to ground in what's real", value: 4 },
            { text: "Notice, but don't stop", value: 3 },
            { text: "Adjust back and forth constantly", value: 2 },
            { text: "Feel lost, but keep going", value: 1 }
          ]
        },
        {
          id: "q20",
          text: "The cost of constant disguise is…",
          options: [
            { text: "Motivation to drop the mask", value: 5 },
            { text: "Worry about being exposed", value: 4 },
            { text: "Not knowing what's true", value: 3 },
            { text: "Exhaustion and loneliness", value: 2 },
            { text: "Anxiety and confusion", value: 1 }
          ]
        }
      ]
    },
    {
      key: "revealer",
      label: "The Revealer",
      color: "#f3f4f6",
      description: "You speak truth and reveal your authentic self, even when it's risky or uncomfortable.",
      needs: "Master the art of being unveiled while maintaining wisdom about when and how to reveal. Guide others to their own unveiling.",
      questions: [
        {
          id: "q21",
          text: "In your highest state, you…",
          options: [
            { text: "Only mask for play, never for survival", value: 1 },
            { text: "Hold back only when necessary", value: 2 },
            { text: "Share your real story, not the perfect one", value: 3 },
            { text: "Let yourself be fully seen", value: 4 },
            { text: "Speak truth, even if it risks rejection", value: 5 }
          ]
        },
        {
          id: "q22",
          text: "When facing judgment, you…",
          options: [
            { text: "Remain silent, protect the real", value: 1 },
            { text: "Joke, but let truth slip through", value: 2 },
            { text: "Admit mistakes, but keep going", value: 3 },
            { text: "Explain yourself openly", value: 4 },
            { text: "Share vulnerability without apology", value: 5 }
          ]
        },
        {
          id: "q23",
          text: "When your real self appears, you…",
          options: [
            { text: "Only share with the safest people", value: 1 },
            { text: "Reveal slowly, watching reactions", value: 2 },
            { text: "Connect more deeply with others", value: 3 },
            { text: "Feel free, but cautious", value: 4 },
            { text: "Experience relief and clarity", value: 5 }
          ]
        },
        {
          id: "q24",
          text: "Your ideal connection is…",
          options: [
            { text: "Occasional, not constant", value: 1 },
            { text: "Clear, with known boundaries", value: 2 },
            { text: "Playful, but mostly real", value: 3 },
            { text: "Honest, no pretense", value: 4 },
            { text: "Mutual vulnerability and trust", value: 5 }
          ]
        },
        {
          id: "q25",
          text: "When all masks drop, your feeling is…",
          options: [
            { text: "Discomfort, but acceptance", value: 1 },
            { text: "Gratitude for truth", value: 2 },
            { text: "Connection and belonging", value: 3 },
            { text: "Joy mixed with anxiety", value: 4 },
            { text: "Freedom, even if exposed", value: 5 }
          ]
        }
      ]
    }
  ],

  diagnosis: {
    shapeshifter: {
      shapeshifter: {
        title: "The Shapeshifter | Mask: The Pure Shapeshifter",
        diagnosis: "You instantly become what's wanted in every situation. Your adaptability is perfect, but you've lost yourself completely.",
        reality: "The field recognizes your perfect adaptation but cannot find your authentic self. You are invisible even to yourself.",
        tension: "You want to fit in perfectly but have lost your core identity. This creates a pattern of perfect adaptation without authenticity.",
        lawToWalk: "Begin to hold to your truth while still being adaptable. Find the balance between fitting in and staying authentic.",
        ifYouStay: "You will continue to perfectly adapt while losing your authentic self, becoming invisible in your own life.",
        ifYouAct: "You will begin to develop authentic identity while maintaining your adaptive abilities."
      },
      chameleon: {
        title: "The Shapeshifter | Mask: The Chameleon Shapeshifter",
        diagnosis: "You shift instantly but maintain some consistency. Your core identity is beginning to emerge through your adaptations.",
        reality: "The field recognizes your adaptive abilities and your emerging authentic self. You're finding balance between fitting in and staying real.",
        tension: "You want to adapt perfectly while developing authentic identity. This creates a pattern of conscious adaptation.",
        lawToWalk: "Continue developing your core identity while maintaining your adaptive abilities. Your balance is the path forward.",
        ifYouStay: "You will maintain your current balance between adaptation and authenticity, continuing to develop your core identity.",
        ifYouAct: "You will strengthen your authentic identity while refining your adaptive abilities, creating true integration."
      },
      player: {
        title: "The Shapeshifter | Mask: The Playing Shapeshifter",
        diagnosis: "You shift into roles and lose yourself in performance. Your adaptability has become a form of entertainment.",
        reality: "The field recognizes your adaptive abilities but senses that you're using them for performance rather than authentic connection.",
        tension: "You want to adapt and entertain but are losing yourself in roles. This creates a pattern of performance without authenticity.",
        lawToWalk: "Stop losing yourself in roles and begin to use your adaptability for authentic connection rather than entertainment.",
        ifYouStay: "You will continue to shift into roles while losing yourself in performance, never experiencing authentic connection.",
        ifYouAct: "You will begin to use your adaptability for authentic connection while maintaining your ability to entertain."
      },
      disguiser: {
        title: "The Shapeshifter | Mask: The Disguised Shapeshifter",
        diagnosis: "You shift behind complex disguises, hiding your true self while appearing to adapt perfectly.",
        reality: "The field recognizes your adaptive abilities but senses that you're hiding behind disguises rather than truly adapting.",
        tension: "You want to adapt perfectly but are hiding behind disguises. This creates a pattern of false adaptation.",
        lawToWalk: "Stop hiding behind disguises and begin to truly adapt while revealing your authentic self.",
        ifYouStay: "You will continue to hide behind disguises while appearing to adapt perfectly, never experiencing true adaptation.",
        ifYouAct: "You will begin to truly adapt while revealing your authentic self, moving from disguise to genuine adaptation."
      },
      revealer: {
        title: "The Shapeshifter | Mask: The Revealing Shapeshifter",
        diagnosis: "You shift while revealing truth. Your adaptability serves your authentic self rather than hiding it.",
        reality: "The field recognizes your adaptive abilities and your commitment to truth. You're using adaptation to serve authenticity.",
        tension: "You want to adapt and reveal truth. This creates a pattern of conscious adaptation in service of authenticity.",
        lawToWalk: "Continue using your adaptability to serve your authentic self. Your ability to shift while staying true is your strength.",
        ifYouStay: "You will maintain your ability to adapt while revealing truth, continuing to serve your authentic self.",
        ifYouAct: "You will deepen your ability to adapt while revealing truth, creating greater integration of adaptation and authenticity."
      }
    },
    chameleon: {
      shapeshifter: {
        title: "The Chameleon | Mask: The Shifting Chameleon",
        diagnosis: "You adapt while maintaining consistency, but sometimes shift too quickly. Your core identity is emerging but not yet stable.",
        reality: "The field recognizes your adaptive abilities and your emerging authentic self, but senses some instability in your core identity.",
        tension: "You want to adapt while developing stable identity. This creates a pattern of emerging authenticity with some instability.",
        lawToWalk: "Continue developing your stable core identity while maintaining your adaptive abilities. Your consistency is growing stronger.",
        ifYouStay: "You will continue to develop your core identity while maintaining your adaptive abilities, gradually increasing stability.",
        ifYouAct: "You will strengthen your stable core identity while refining your adaptive abilities, creating true consistency."
      },
      chameleon: {
        title: "The Chameleon | Mask: The Pure Chameleon",
        diagnosis: "You change your style to match different environments while maintaining core identity. Your adaptability is balanced with authenticity.",
        reality: "The field recognizes your balanced approach to adaptation and authenticity. You're successfully maintaining core identity while adapting.",
        tension: "You want to adapt while staying authentic. This creates a pattern of conscious balance between fitting in and staying real.",
        lawToWalk: "Continue maintaining your balance between adaptation and authenticity. Your ability to adapt while staying true is your strength.",
        ifYouStay: "You will maintain your balanced approach to adaptation and authenticity, continuing to develop both abilities.",
        ifYouAct: "You will deepen your balance between adaptation and authenticity, creating greater integration and mastery."
      },
      player: {
        title: "The Chameleon | Mask: The Playing Chameleon",
        diagnosis: "You adapt to different environments but sometimes lose yourself in the performance. Your consistency is challenged by role-playing.",
        reality: "The field recognizes your adaptive abilities but senses that you sometimes lose yourself in performance rather than staying authentic.",
        tension: "You want to adapt while staying authentic but sometimes lose yourself in roles. This creates a pattern of inconsistent authenticity.",
        lawToWalk: "Stop losing yourself in performance and begin to maintain consistent authenticity while adapting to different environments.",
        ifYouStay: "You will continue to adapt while sometimes losing yourself in performance, maintaining inconsistent authenticity.",
        ifYouAct: "You will begin to maintain consistent authenticity while adapting to different environments, creating true integration."
      },
      disguiser: {
        title: "The Chameleon | Mask: The Disguised Chameleon",
        diagnosis: "You adapt to different environments but hide behind disguises. Your consistency is compromised by hiding.",
        reality: "The field recognizes your adaptive abilities but senses that you're hiding behind disguises rather than truly adapting.",
        tension: "You want to adapt while staying authentic but are hiding behind disguises. This creates a pattern of false adaptation.",
        lawToWalk: "Stop hiding behind disguises and begin to truly adapt while maintaining your core identity.",
        ifYouStay: "You will continue to hide behind disguises while appearing to adapt, never experiencing true adaptation.",
        ifYouAct: "You will begin to truly adapt while maintaining your core identity, moving from disguise to genuine adaptation."
      },
      revealer: {
        title: "The Chameleon | Mask: The Revealing Chameleon",
        diagnosis: "You adapt to different environments while revealing your authentic self. Your consistency serves your truth.",
        reality: "The field recognizes your adaptive abilities and your commitment to truth. You're successfully adapting while staying authentic.",
        tension: "You want to adapt and reveal truth. This creates a pattern of conscious adaptation in service of authenticity.",
        lawToWalk: "Continue adapting to different environments while revealing your authentic self. Your consistency is your strength.",
        ifYouStay: "You will maintain your ability to adapt while revealing truth, continuing to serve your authentic self.",
        ifYouAct: "You will deepen your ability to adapt while revealing truth, creating greater integration of adaptation and authenticity."
      }
    },
    player: {
      shapeshifter: {
        title: "The Player | Mask: The Shifting Player",
        diagnosis: "You perform different roles but sometimes shift too quickly. Your performance is entertaining but not always authentic.",
        reality: "The field recognizes your performance abilities but senses that you sometimes shift too quickly, compromising authenticity.",
        tension: "You want to perform and entertain but sometimes lose authenticity in quick shifts. This creates a pattern of entertaining but inconsistent performance.",
        lawToWalk: "Slow down your shifts and begin to use performance to share something real rather than just entertaining.",
        ifYouStay: "You will continue to perform while sometimes losing authenticity in quick shifts, maintaining entertaining but inconsistent performance.",
        ifYouAct: "You will begin to use performance to share something real while maintaining your entertaining abilities."
      },
      chameleon: {
        title: "The Player | Mask: The Chameleon Player",
        diagnosis: "You perform different roles while maintaining some consistency. Your performance is balanced with authenticity.",
        reality: "The field recognizes your performance abilities and your emerging consistency. You're finding balance between entertainment and authenticity.",
        tension: "You want to perform and entertain while staying authentic. This creates a pattern of conscious balance between performance and truth.",
        lawToWalk: "Continue maintaining your balance between performance and authenticity. Your ability to entertain while staying true is your strength.",
        ifYouStay: "You will maintain your balanced approach to performance and authenticity, continuing to develop both abilities.",
        ifYouAct: "You will deepen your balance between performance and authenticity, creating greater integration and mastery."
      },
      player: {
        title: "The Player | Mask: The Pure Player",
        diagnosis: "You perform different roles and personas, often losing yourself in the act of playing parts.",
        reality: "The field recognizes your performance abilities but senses that you often lose yourself in roles rather than staying authentic.",
        tension: "You want to perform and entertain but often lose yourself in roles. This creates a pattern of entertaining but inauthentic performance.",
        lawToWalk: "Stop losing yourself in roles and begin to use performance to share something real rather than just entertaining.",
        ifYouStay: "You will continue to perform while losing yourself in roles, maintaining entertaining but inauthentic performance.",
        ifYouAct: "You will begin to use performance to share something real while maintaining your entertaining abilities."
      },
      disguiser: {
        title: "The Player | Mask: The Disguised Player",
        diagnosis: "You perform different roles while hiding behind disguises. Your performance is compromised by hiding.",
        reality: "The field recognizes your performance abilities but senses that you're hiding behind disguises rather than truly performing.",
        tension: "You want to perform and entertain but are hiding behind disguises. This creates a pattern of false performance.",
        lawToWalk: "Stop hiding behind disguises and begin to truly perform while revealing your authentic self.",
        ifYouStay: "You will continue to hide behind disguises while appearing to perform, never experiencing true performance.",
        ifYouAct: "You will begin to truly perform while revealing your authentic self, moving from disguise to genuine performance."
      },
      revealer: {
        title: "The Player | Mask: The Revealing Player",
        diagnosis: "You perform different roles while revealing your authentic self. Your performance serves your truth.",
        reality: "The field recognizes your performance abilities and your commitment to truth. You're successfully performing while staying authentic.",
        tension: "You want to perform and reveal truth. This creates a pattern of conscious performance in service of authenticity.",
        lawToWalk: "Continue performing while revealing your authentic self. Your ability to entertain while staying true is your strength.",
        ifYouStay: "You will maintain your ability to perform while revealing truth, continuing to serve your authentic self.",
        ifYouAct: "You will deepen your ability to perform while revealing truth, creating greater integration of performance and authenticity."
      }
    },
    disguiser: {
      shapeshifter: {
        title: "The Disguiser | Mask: The Shifting Disguiser",
        diagnosis: "You hide behind complex disguises and shift between them. Your hiding is sophisticated but still hiding.",
        reality: "The field recognizes your sophisticated hiding abilities but senses that you're still hiding rather than revealing your authentic self.",
        tension: "You want to hide and adapt but are still hiding. This creates a pattern of sophisticated hiding without revelation.",
        lawToWalk: "Stop hiding behind complex disguises and begin to reveal small truths to stay anchored while adapting.",
        ifYouStay: "You will continue to hide behind complex disguises while adapting, maintaining sophisticated hiding without revelation.",
        ifYouAct: "You will begin to reveal small truths while adapting, moving from sophisticated hiding to genuine revelation."
      },
      chameleon: {
        title: "The Disguiser | Mask: The Chameleon Disguiser",
        diagnosis: "You hide behind disguises while maintaining some consistency. Your hiding is balanced with emerging authenticity.",
        reality: "The field recognizes your hiding abilities and your emerging consistency. You're finding balance between hiding and authenticity.",
        tension: "You want to hide while developing authentic identity. This creates a pattern of conscious balance between hiding and revelation.",
        lawToWalk: "Continue developing your authentic identity while reducing your need to hide. Your consistency is growing stronger.",
        ifYouStay: "You will continue to develop your authentic identity while reducing hiding, gradually increasing revelation.",
        ifYouAct: "You will strengthen your authentic identity while significantly reducing hiding, creating true revelation."
      },
      player: {
        title: "The Disguiser | Mask: The Playing Disguiser",
        diagnosis: "You hide behind disguises while performing roles. Your hiding is entertaining but still hiding.",
        reality: "The field recognizes your hiding and performance abilities but senses that you're still hiding rather than truly performing.",
        tension: "You want to hide and perform but are still hiding. This creates a pattern of entertaining hiding without genuine performance.",
        lawToWalk: "Stop hiding behind disguises and begin to truly perform while revealing your authentic self.",
        ifYouStay: "You will continue to hide behind disguises while performing, maintaining entertaining hiding without genuine performance.",
        ifYouAct: "You will begin to truly perform while revealing your authentic self, moving from hiding to genuine performance."
      },
      disguiser: {
        title: "The Disguiser | Mask: The Pure Disguiser",
        diagnosis: "You hide behind complex disguises and personas, often feeling threatened and needing to protect yourself.",
        reality: "The field recognizes your sophisticated hiding abilities but senses that you're hiding rather than revealing your authentic self.",
        tension: "You want to hide and protect yourself. This creates a pattern of sophisticated hiding without revelation.",
        lawToWalk: "Stop hiding behind complex disguises and begin to reveal small truths to stay anchored.",
        ifYouStay: "You will continue to hide behind complex disguises, maintaining sophisticated hiding without revelation.",
        ifYouAct: "You will begin to reveal small truths while reducing hiding, moving from sophisticated hiding to genuine revelation."
      },
      revealer: {
        title: "The Disguiser | Mask: The Revealing Disguiser",
        diagnosis: "You hide behind disguises while revealing some truth. Your hiding is being transformed by revelation.",
        reality: "The field recognizes your hiding abilities and your emerging commitment to truth. You're beginning to reveal while still hiding.",
        tension: "You want to hide and reveal truth. This creates a pattern of conscious revelation while still hiding.",
        lawToWalk: "Continue revealing truth while reducing your need to hide. Your revelation is transforming your hiding.",
        ifYouStay: "You will continue to reveal truth while reducing hiding, gradually transforming your need to hide.",
        ifYouAct: "You will significantly increase revelation while reducing hiding, creating true transformation from hiding to revelation."
      }
    },
    revealer: {
      shapeshifter: {
        title: "The Revealer | Mask: The Shifting Revealer",
        diagnosis: "You reveal truth while adapting quickly. Your revelation is powerful but sometimes inconsistent.",
        reality: "The field recognizes your commitment to truth and your adaptive abilities, but senses some inconsistency in your revelation.",
        tension: "You want to reveal truth while adapting. This creates a pattern of powerful but sometimes inconsistent revelation.",
        lawToWalk: "Continue revealing truth while developing consistent adaptation. Your revelation is your strength.",
        ifYouStay: "You will continue to reveal truth while adapting, gradually increasing consistency in your revelation.",
        ifYouAct: "You will develop consistent adaptation while maintaining powerful revelation, creating true integration."
      },
      chameleon: {
        title: "The Revealer | Mask: The Chameleon Revealer",
        diagnosis: "You reveal truth while adapting to different environments. Your revelation is balanced with adaptability.",
        reality: "The field recognizes your commitment to truth and your balanced approach to adaptation. You're successfully revealing while adapting.",
        tension: "You want to reveal truth while adapting. This creates a pattern of conscious balance between revelation and adaptation.",
        lawToWalk: "Continue revealing truth while adapting to different environments. Your balance is your strength.",
        ifYouStay: "You will maintain your balanced approach to revelation and adaptation, continuing to develop both abilities.",
        ifYouAct: "You will deepen your balance between revelation and adaptation, creating greater integration and mastery."
      },
      player: {
        title: "The Revealer | Mask: The Playing Revealer",
        diagnosis: "You reveal truth while performing roles. Your revelation is powerful but sometimes compromised by performance.",
        reality: "The field recognizes your commitment to truth and your performance abilities, but senses that performance sometimes compromises revelation.",
        tension: "You want to reveal truth while performing. This creates a pattern of powerful but sometimes compromised revelation.",
        lawToWalk: "Continue revealing truth while using performance to serve authenticity rather than compromise it.",
        ifYouStay: "You will continue to reveal truth while performing, gradually ensuring performance serves revelation.",
        ifYouAct: "You will use performance to serve revelation while maintaining powerful truth-telling, creating true integration."
      },
      disguiser: {
        title: "The Revealer | Mask: The Disguised Revealer",
        diagnosis: "You reveal truth while still hiding behind some disguises. Your revelation is powerful but not complete.",
        reality: "The field recognizes your commitment to truth and your remaining need to hide. You're revealing while still hiding.",
        tension: "You want to reveal truth while still hiding. This creates a pattern of powerful but incomplete revelation.",
        lawToWalk: "Continue revealing truth while reducing your remaining need to hide. Your revelation is transforming your hiding.",
        ifYouStay: "You will continue to reveal truth while reducing hiding, gradually completing your revelation.",
        ifYouAct: "You will complete your revelation while eliminating remaining hiding, creating true unveiling."
      },
      revealer: {
        title: "The Revealer | Mask: The Pure Revealer",
        diagnosis: "You speak truth and reveal your authentic self, even when it's risky or uncomfortable.",
        reality: "The field recognizes your complete commitment to truth and authenticity. You are naked truth that transforms everything around you.",
        tension: "You have achieved complete revelation and now face the challenge of maintaining this state while helping others.",
        lawToWalk: "Continue being naked truth while helping others reveal their authentic selves. Your revelation is transformative.",
        ifYouStay: "You will maintain your complete revelation and continue to transform the field around you.",
        ifYouAct: "You will use your naked truth to help others reveal their authentic selves, creating widespread transformation."
      }
    }
  }
} 