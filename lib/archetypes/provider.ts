import { Archetype } from './index'

export const providerArchetype: Archetype = {
  key: "provider",
  name: "Provider",
  color: "#059669",
  accentColor: "#10b981",
  glowColor: "rgba(16, 185, 129, 0.5)",
  description: "Provider Node - The Source",
  loop: "Endless giving, never receiving, fear of being empty.",
  needs: "Stop giving, open to receive, surrender to being provided for, burn the need to be the source.",
  
  stages: [
    {
      key: "giver",
      label: "The Giver",
      color: "#059669",
      description: "You say yes before thinking and give even when it's inconvenient. You feel good when giving and hope for appreciation.",
      needs: "Learn to receive, set boundaries, understand your own needs matter.",
      questions: [
        {
          id: "p1",
          text: "When someone asks for help, you…",
          options: [
            { text: "Say \"yes\" before thinking", value: 1 },
            { text: "Feel good when giving", value: 3 },
            { text: "Give even if it's inconvenient", value: 2 },
            { text: "Weigh if you have enough to share", value: 4 },
            { text: "Only give when you can sustain it", value: 5 }
          ]
        },
        {
          id: "p2",
          text: "Your main reason for helping is…",
          options: [
            { text: "You hope for appreciation", value: 1 },
            { text: "You want everyone to thrive, not just survive", value: 5 },
            { text: "You feel responsible for others", value: 2 },
            { text: "It gives you meaning", value: 3 },
            { text: "To create lasting connections", value: 4 }
          ]
        },
        {
          id: "p3",
          text: "When your own resources are low, you…",
          options: [
            { text: "Feel anxious, but keep giving", value: 3 },
            { text: "Give anyway, then suffer silently", value: 1 },
            { text: "Stretch to cover everyone", value: 2 },
            { text: "Ask for help if needed", value: 4 },
            { text: "Pause giving until you recover", value: 5 }
          ]
        },
        {
          id: "p4",
          text: "If people take advantage, you…",
          options: [
            { text: "Don't say anything, just give less next time", value: 1 },
            { text: "Withdraw and give to others", value: 3 },
            { text: "Set a clear boundary", value: 4 },
            { text: "Address it directly", value: 5 },
            { text: "Let it go, but feel sad", value: 2 }
          ]
        },
        {
          id: "p5",
          text: "Your greatest fear is…",
          options: [
            { text: "Being needed too much", value: 1 },
            { text: "Having nothing left to offer", value: 5 },
            { text: "Failing those who rely on you", value: 2 },
            { text: "Giving so much you lose yourself", value: 3 },
            { text: "Not being able to give", value: 4 }
          ]
        }
      ]
    },
    {
      key: "sustainer",
      label: "The Sustainer",
      color: "#10b981",
      description: "You accept the burden even if it's heavy and keep going until empty. You take pride in being dependable.",
      needs: "Learn to share responsibility, set limits, allow others to carry their own weight.",
      questions: [
        {
          id: "p6",
          text: "When people rely on you, you…",
          options: [
            { text: "Secretly wish for a break", value: 1 },
            { text: "Take pride in being dependable", value: 3 },
            { text: "Accept the burden, even if it's heavy", value: 2 },
            { text: "Share responsibility with others", value: 4 },
            { text: "Only carry what's truly yours", value: 5 }
          ]
        },
        {
          id: "p7",
          text: "Your giving style is…",
          options: [
            { text: "Give too much, then regret", value: 1 },
            { text: "Quiet, but always present", value: 3 },
            { text: "Keep going until empty", value: 2 },
            { text: "Reliable, you show up every time", value: 4 },
            { text: "Measured and mindful", value: 5 }
          ]
        },
        {
          id: "p8",
          text: "If others expect too much, you…",
          options: [
            { text: "Feel guilty if you can't deliver", value: 1 },
            { text: "Do your best, but burn out", value: 2 },
            { text: "Try to meet needs anyway", value: 3 },
            { text: "Talk openly about limits", value: 4 },
            { text: "Set boundaries gently", value: 5 }
          ]
        },
        {
          id: "p9",
          text: "When supporting others, you…",
          options: [
            { text: "Forget your own needs", value: 1 },
            { text: "Give until someone else steps in", value: 2 },
            { text: "Steady, but sometimes resentful", value: 3 },
            { text: "Plan ways for everyone to share the load", value: 4 },
            { text: "Track how much energy you have left", value: 5 }
          ]
        },
        {
          id: "p10",
          text: "If someone thanks you, you…",
          options: [
            { text: "Shrug it off, help is normal", value: 2 },
            { text: "Feel awkward, downplay your help", value: 1 },
            { text: "Appreciate it deeply", value: 3 },
            { text: "Accept with gratitude", value: 4 },
            { text: "Feel recognized and at peace", value: 5 }
          ]
        }
      ]
    },
    {
      key: "nourisher",
      label: "The Nourisher",
      color: "#34d399",
      description: "You offer care even if unasked and anticipate needs before they're spoken. You focus on emotional as well as physical needs.",
      needs: "Learn to let others ask for what they need, trust in their ability to care for themselves.",
      questions: [
        {
          id: "p11",
          text: "Your approach to nurturing is…",
          options: [
            { text: "Give freely, but sometimes lose track of yourself", value: 1 },
            { text: "Offer care even if unasked", value: 2 },
            { text: "Anticipate needs before they're spoken", value: 3 },
            { text: "Focus on emotional as well as physical needs", value: 4 },
            { text: "Support, but check your own reserves", value: 5 }
          ]
        },
        {
          id: "p12",
          text: "When you see someone struggling, you…",
          options: [
            { text: "Worry more than act", value: 1 },
            { text: "Step in quietly", value: 2 },
            { text: "Reach out, even if they resist", value: 3 },
            { text: "Encourage them to ask for what they need", value: 4 },
            { text: "Offer support, but don't force it", value: 5 }
          ]
        },
        {
          id: "p13",
          text: "When you cook, create, or provide, you…",
          options: [
            { text: "Share, hoping to be appreciated", value: 1 },
            { text: "Focus on making others comfortable", value: 2 },
            { text: "Do it even if tired", value: 3 },
            { text: "Make it a ritual, not a chore", value: 4 },
            { text: "Infuse your care with intention", value: 5 }
          ]
        },
        {
          id: "p14",
          text: "The thing you give most is…",
          options: [
            { text: "Time and energy", value: 1 },
            { text: "Comfort during hard times", value: 2 },
            { text: "Sustenance—food, money, support", value: 3 },
            { text: "Encouragement to grow", value: 4 },
            { text: "Safe space to rest", value: 5 }
          ]
        },
        {
          id: "p15",
          text: "When you see someone thrive, you…",
          options: [
            { text: "Wonder if they'll still need you", value: 1 },
            { text: "Miss being their support", value: 2 },
            { text: "Feel proud, but move to the next need", value: 3 },
            { text: "Cheer them on, quietly", value: 4 },
            { text: "Feel fulfilled, knowing you contributed", value: 5 }
          ]
        }
      ]
    },
    {
      key: "guardian",
      label: "The Guardian",
      color: "#6ee7b7",
      description: "You defend no matter the cost and guard what's left, then give again. You have strong boundaries but sometimes they're tested.",
      needs: "Learn to protect your core first, trust others to protect themselves, release the need to be everyone's shield.",
      questions: [
        {
          id: "p16",
          text: "If a threat appears to your people, you…",
          options: [
            { text: "Feel fear, but stay anyway", value: 1 },
            { text: "Stand firm, but plan escape", value: 2 },
            { text: "Rally everyone to prepare", value: 3 },
            { text: "Defend, no matter the cost", value: 4 },
            { text: "Remain calm, assess before acting", value: 5 }
          ]
        },
        {
          id: "p17",
          text: "Your boundaries are…",
          options: [
            { text: "Weak, often ignored", value: 1 },
            { text: "Clear, but flexible", value: 2 },
            { text: "Defined by others' needs", value: 3 },
            { text: "Protective, even if rigid", value: 4 },
            { text: "Strong, but sometimes tested", value: 5 }
          ]
        },
        {
          id: "p18",
          text: "When your resources are threatened, you…",
          options: [
            { text: "Worry more than act", value: 1 },
            { text: "Feel anxious, but trust in abundance", value: 2 },
            { text: "Find ways to replenish and protect", value: 3 },
            { text: "Guard what's left, then give again", value: 4 },
            { text: "Hold steady, share only what's secure", value: 5 }
          ]
        },
        {
          id: "p19",
          text: "If you must choose between self and others, you…",
          options: [
            { text: "Sacrifice yourself, if needed", value: 1 },
            { text: "Ask for help", value: 2 },
            { text: "Seek balance, but tip toward others", value: 3 },
            { text: "Wait for a solution to appear", value: 4 },
            { text: "Protect your core, then provide", value: 5 }
          ]
        },
        {
          id: "p20",
          text: "The mark of a true protector is…",
          options: [
            { text: "Only stepping in when absolutely needed", value: 2 },
            { text: "Giving all, no matter what", value: 1 },
            { text: "Planning ahead for hard times", value: 3 },
            { text: "Firm lines, but soft heart", value: 4 },
            { text: "Keeping everyone safe, but not controlling", value: 5 }
          ]
        }
      ]
    },
    {
      key: "source",
      label: "The Source",
      color: "#a7f3d0",
      description: "You create abundance for all and encourage others to learn and pass it on. You are the root, not the fruit.",
      needs: "Learn to be provided for, trust in the abundance of others, release the need to be the only source.",
      questions: [
        {
          id: "p21",
          text: "Your highest vision is…",
          options: [
            { text: "Holding everything together", value: 2 },
            { text: "Creating abundance for all", value: 5 },
            { text: "Sharing wisdom and resources", value: 1 },
            { text: "Inspiring self-sufficiency", value: 3 },
            { text: "Being the root, not the fruit", value: 4 }
          ]
        },
        {
          id: "p22",
          text: "If you could give one gift, it would be…",
          options: [
            { text: "Shelter from all storms", value: 2 },
            { text: "A way to share with others", value: 4 },
            { text: "The knowledge that they're enough", value: 1 },
            { text: "The ability to grow on their own", value: 3 },
            { text: "A field of endless support", value: 5 }
          ]
        },
        {
          id: "p23",
          text: "When others come to you, you…",
          options: [
            { text: "Accept them, but keep your center", value: 2 },
            { text: "Provide resources, then let go", value: 4 },
            { text: "Listen deeply, then teach", value: 1 },
            { text: "Nurture until they stand on their own", value: 3 },
            { text: "Encourage them to learn and pass it on", value: 5 }
          ]
        },
        {
          id: "p24",
          text: "Your approach to legacy is…",
          options: [
            { text: "Quiet impact, even if unseen", value: 1 },
            { text: "Being remembered for your heart", value: 2 },
            { text: "Wisdom for future givers", value: 3 },
            { text: "Systems that last beyond you", value: 4 },
            { text: "Seeds that grow after you're gone", value: 5 }
          ]
        },
        {
          id: "p25",
          text: "The sign you've become the source is…",
          options: [
            { text: "You are at peace, even if not needed", value: 1 },
            { text: "Others step up without you", value: 2 },
            { text: "You are no longer the only provider", value: 3 },
            { text: "What you give multiplies", value: 4 },
            { text: "Those you support now support others", value: 5 }
          ]
        }
      ]
    }
  ],

  diagnosis: {
    giver: {
      giver: {
        title: "The Stuck Giver",
        diagnosis: "You're trapped in the giving loop, saying yes to everything without considering your own needs.",
        reality: "You're running on empty, giving from a place of depletion rather than abundance.",
        tension: "The tension between your desire to help and your need for self-care creates constant internal conflict.",
        lawToWalk: "Learn to receive as much as you give. Your needs matter just as much as others'.",
        ifYouStay: "You'll burn out completely, becoming unable to help anyone, including yourself.",
        ifYouAct: "You'll find sustainable ways to give that don't deplete your core resources."
      },
      sustainer: {
        title: "The Giver Who Can't Sustain",
        diagnosis: "You give freely but struggle to maintain the energy needed to keep giving consistently.",
        reality: "Your giving is inconsistent because you haven't learned to sustain your own resources.",
        tension: "You want to be reliable but your own needs keep interrupting your ability to provide.",
        lawToWalk: "Develop sustainable giving practices that include regular self-care and replenishment.",
        ifYouStay: "You'll become unreliable and resentful, damaging the trust others have in you.",
        ifYouAct: "You'll become a steady, dependable presence that others can truly count on."
      },
      nourisher: {
        title: "The Giver Who Can't Nourish",
        diagnosis: "You give basic help but struggle to provide the deeper nourishment others truly need.",
        reality: "Your giving is surface-level because you haven't learned to nourish yourself first.",
        tension: "You want to provide meaningful support but lack the depth to truly nurture others.",
        lawToWalk: "Learn to nourish yourself first, then you'll have the depth to truly nourish others.",
        ifYouStay: "Your help will remain shallow and unsatisfying for both you and those you help.",
        ifYouAct: "You'll develop the capacity to provide meaningful, lasting nourishment."
      },
      guardian: {
        title: "The Giver Who Can't Protect",
        diagnosis: "You give freely but struggle to protect your resources or set boundaries when needed.",
        reality: "Your giving is vulnerable because you haven't learned to protect what's essential.",
        tension: "You want to help everyone but lack the boundaries to protect your own wellbeing.",
        lawToWalk: "Develop protective boundaries that allow you to give safely and sustainably.",
        ifYouStay: "You'll be taken advantage of and eventually have nothing left to give.",
        ifYouAct: "You'll learn to give generously while protecting your core resources."
      },
      source: {
        title: "The Giver Who Can't Source",
        diagnosis: "You give from your own limited resources rather than tapping into infinite abundance.",
        reality: "You're giving from scarcity rather than abundance, limiting your capacity to help.",
        tension: "You want to be a source of help but feel limited by your own finite resources.",
        lawToWalk: "Learn to tap into the infinite source of abundance rather than giving from scarcity.",
        ifYouStay: "You'll always feel limited and eventually run out of resources to give.",
        ifYouAct: "You'll become a true source of abundance that never runs dry."
      }
    },
    sustainer: {
      giver: {
        title: "The Sustainer Who Can't Give Freely",
        diagnosis: "You can maintain consistent support but struggle to give spontaneously or generously.",
        reality: "Your giving is measured and controlled rather than flowing from genuine generosity.",
        tension: "You want to be generous but your need for sustainability limits your spontaneity.",
        lawToWalk: "Learn to give freely while maintaining your sustainable practices.",
        ifYouStay: "Your help will feel mechanical and lack the warmth of genuine generosity.",
        ifYouAct: "You'll combine reliability with genuine generosity and warmth."
      },
      sustainer: {
        title: "The Stuck Sustainer",
        diagnosis: "You're trapped in maintaining others without developing your own capacity to grow.",
        reality: "You're sustaining others but not developing your own ability to thrive.",
        tension: "The tension between maintaining others and developing yourself creates stagnation.",
        lawToWalk: "Learn to sustain others while also developing your own capacity to grow.",
        ifYouStay: "You'll become stuck in a maintenance role without personal growth or fulfillment.",
        ifYouAct: "You'll become a sustaining presence that also grows and evolves."
      },
      nourisher: {
        title: "The Sustainer Who Can't Nourish",
        diagnosis: "You can maintain consistent support but struggle to provide deeper nourishment.",
        reality: "Your support is reliable but lacks the depth needed for true growth and healing.",
        tension: "You want to provide meaningful nourishment but focus on maintenance instead.",
        lawToWalk: "Develop the capacity to nourish while maintaining your sustainable practices.",
        ifYouStay: "Your support will remain surface-level and won't facilitate true growth.",
        ifYouAct: "You'll provide both reliable support and meaningful nourishment."
      },
      guardian: {
        title: "The Sustainer Who Can't Protect",
        diagnosis: "You can maintain support but struggle to protect your resources or set boundaries.",
        reality: "Your sustaining efforts are vulnerable because you lack protective boundaries.",
        tension: "You want to maintain support but your resources are constantly under threat.",
        lawToWalk: "Develop protective boundaries while maintaining your sustainable support.",
        ifYouStay: "Your resources will be depleted and you'll become unable to sustain anyone.",
        ifYouAct: "You'll become a protected and sustainable source of support."
      },
      source: {
        title: "The Sustainer Who Can't Source",
        diagnosis: "You can maintain support but struggle to tap into infinite abundance.",
        reality: "You're sustaining from finite resources rather than infinite abundance.",
        tension: "You want to be a source of support but feel limited by your finite capacity.",
        lawToWalk: "Learn to tap into infinite abundance while maintaining sustainable practices.",
        ifYouStay: "You'll always feel limited by your finite resources and capacity.",
        ifYouAct: "You'll become a sustainable source of infinite abundance."
      }
    },
    nourisher: {
      giver: {
        title: "The Nourisher Who Can't Give Freely",
        diagnosis: "You can provide deep nourishment but struggle to give spontaneously or generously.",
        reality: "Your nourishment is controlled and measured rather than flowing freely.",
        tension: "You want to nourish generously but your need for control limits your spontaneity.",
        lawToWalk: "Learn to nourish freely while maintaining your depth and intention.",
        ifYouStay: "Your nourishment will feel controlled and lack the warmth of generosity.",
        ifYouAct: "You'll combine deep nourishment with genuine generosity and warmth."
      },
      sustainer: {
        title: "The Nourisher Who Can't Sustain",
        diagnosis: "You can provide deep nourishment but struggle to maintain consistent support.",
        reality: "Your nourishment is deep but inconsistent, leaving others without reliable support.",
        tension: "You want to provide consistent nourishment but lack sustainable practices.",
        lawToWalk: "Develop sustainable practices while maintaining your capacity for deep nourishment.",
        ifYouStay: "Your nourishment will be inconsistent and unreliable for those who need it.",
        ifYouAct: "You'll provide both deep nourishment and consistent, reliable support."
      },
      nourisher: {
        title: "The Stuck Nourisher",
        diagnosis: "You're trapped in nourishing others without developing your own capacity to be nourished.",
        reality: "You're providing nourishment but not receiving the nourishment you need.",
        tension: "The tension between nourishing others and being nourished yourself creates depletion.",
        lawToWalk: "Learn to receive nourishment while providing it to others.",
        ifYouStay: "You'll become depleted and unable to provide meaningful nourishment.",
        ifYouAct: "You'll become a nourished nourisher who can provide sustainable care."
      },
      guardian: {
        title: "The Nourisher Who Can't Protect",
        diagnosis: "You can provide deep nourishment but struggle to protect your resources or set boundaries.",
        reality: "Your nourishment is vulnerable because you lack protective boundaries.",
        tension: "You want to nourish others but your resources are constantly under threat.",
        lawToWalk: "Develop protective boundaries while maintaining your capacity for deep nourishment.",
        ifYouStay: "Your resources will be depleted and you'll become unable to nourish anyone.",
        ifYouAct: "You'll become a protected source of deep nourishment."
      },
      source: {
        title: "The Nourisher Who Can't Source",
        diagnosis: "You can provide deep nourishment but struggle to tap into infinite abundance.",
        reality: "You're nourishing from finite resources rather than infinite abundance.",
        tension: "You want to be a source of nourishment but feel limited by your finite capacity.",
        lawToWalk: "Learn to tap into infinite abundance while maintaining your capacity for deep nourishment.",
        ifYouStay: "You'll always feel limited by your finite resources and capacity.",
        ifYouAct: "You'll become a source of infinite nourishment."
      }
    },
    guardian: {
      giver: {
        title: "The Guardian Who Can't Give Freely",
        diagnosis: "You can protect resources but struggle to give spontaneously or generously.",
        reality: "Your giving is controlled and protected rather than flowing freely.",
        tension: "You want to give generously but your need for protection limits your spontaneity.",
        lawToWalk: "Learn to give freely while maintaining your protective boundaries.",
        ifYouStay: "Your giving will feel controlled and lack the warmth of generosity.",
        ifYouAct: "You'll combine protective boundaries with genuine generosity and warmth."
      },
      sustainer: {
        title: "The Guardian Who Can't Sustain",
        diagnosis: "You can protect resources but struggle to maintain consistent support.",
        reality: "Your protection is strong but your support is inconsistent.",
        tension: "You want to provide consistent support but focus on protection instead.",
        lawToWalk: "Develop sustainable practices while maintaining your protective capacity.",
        ifYouStay: "Your support will be inconsistent despite your protective boundaries.",
        ifYouAct: "You'll provide both protected and consistent support."
      },
      nourisher: {
        title: "The Guardian Who Can't Nourish",
        diagnosis: "You can protect resources but struggle to provide deep nourishment.",
        reality: "Your protection is strong but your nourishment is shallow.",
        tension: "You want to provide deep nourishment but focus on protection instead.",
        lawToWalk: "Develop the capacity for deep nourishment while maintaining your protective boundaries.",
        ifYouStay: "Your support will remain surface-level despite your protective capacity.",
        ifYouAct: "You'll provide both protected and deeply nourishing support."
      },
      guardian: {
        title: "The Stuck Guardian",
        diagnosis: "You're trapped in protecting others without developing your own capacity to be protected.",
        reality: "You're protecting others but not allowing yourself to be protected.",
        tension: "The tension between protecting others and being protected yourself creates vulnerability.",
        lawToWalk: "Learn to receive protection while providing it to others.",
        ifYouStay: "You'll become vulnerable and unable to provide meaningful protection.",
        ifYouAct: "You'll become a protected protector who can provide sustainable safety."
      },
      source: {
        title: "The Guardian Who Can't Source",
        diagnosis: "You can protect resources but struggle to tap into infinite abundance.",
        reality: "You're protecting finite resources rather than infinite abundance.",
        tension: "You want to be a source of protection but feel limited by your finite capacity.",
        lawToWalk: "Learn to tap into infinite abundance while maintaining your protective capacity.",
        ifYouStay: "You'll always feel limited by your finite resources and capacity.",
        ifYouAct: "You'll become a source of infinite protection."
      }
    },
    source: {
      giver: {
        title: "The Source Who Can't Give Freely",
        diagnosis: "You can tap into infinite abundance but struggle to give spontaneously or generously.",
        reality: "Your giving is controlled and measured despite having infinite resources.",
        tension: "You want to give generously but your need for control limits your spontaneity.",
        lawToWalk: "Learn to give freely from your infinite abundance.",
        ifYouStay: "Your infinite resources will remain untapped and unavailable to others.",
        ifYouAct: "You'll become a free-flowing source of infinite generosity."
      },
      sustainer: {
        title: "The Source Who Can't Sustain",
        diagnosis: "You can tap into infinite abundance but struggle to maintain consistent support.",
        reality: "Your abundance is infinite but your support is inconsistent.",
        tension: "You want to provide consistent support but focus on abundance instead.",
        lawToWalk: "Develop sustainable practices while maintaining your connection to infinite abundance.",
        ifYouStay: "Your infinite resources will be inconsistently available to those who need them.",
        ifYouAct: "You'll provide both infinite abundance and consistent, reliable support."
      },
      nourisher: {
        title: "The Source Who Can't Nourish",
        diagnosis: "You can tap into infinite abundance but struggle to provide deep nourishment.",
        reality: "Your abundance is infinite but your nourishment is shallow.",
        tension: "You want to provide deep nourishment but focus on abundance instead.",
        lawToWalk: "Develop the capacity for deep nourishment while maintaining your connection to infinite abundance.",
        ifYouStay: "Your infinite resources will provide surface-level support only.",
        ifYouAct: "You'll become a source of infinite, deeply nourishing abundance."
      },
      guardian: {
        title: "The Source Who Can't Protect",
        diagnosis: "You can tap into infinite abundance but struggle to protect your resources or set boundaries.",
        reality: "Your abundance is infinite but your resources are vulnerable.",
        tension: "You want to provide infinite abundance but your resources are constantly under threat.",
        lawToWalk: "Develop protective boundaries while maintaining your connection to infinite abundance.",
        ifYouStay: "Your infinite resources will be vulnerable and potentially misused.",
        ifYouAct: "You'll become a protected source of infinite abundance."
      },
      source: {
        title: "The True Source",
        diagnosis: "You have mastered the art of being a source of infinite abundance while maintaining all other capacities.",
        reality: "You are a complete provider who can give freely, sustain consistently, nourish deeply, protect effectively, and source infinitely.",
        tension: "You have transcended the tensions of the provider journey and operate from a place of wholeness.",
        lawToWalk: "Continue to walk the path of the true source, being a complete provider for all.",
        ifYouStay: "You will remain a complete and fulfilled provider.",
        ifYouAct: "You will continue to evolve and expand your capacity to provide for all."
      }
    }
  }
} 