export const testStageSeekerArchetype: Archetype = {
  key: "testStageSeeker",
  name: "Test Stage Seeker",
  color: "#1e40af",
  accentColor: "#3b82f6",
  glowColor: "rgba(59, 130, 246, 0.5)",
  description: "Test Stage Seeker Node — 25 Question Diagnostic",
  loop: "Testing stages without committing to transformation, seeking validation through diagnosis.",
  needs: "Commit to the stage you're truly in, stop testing and start walking the path.",
  
  stages: [
    {
      key: "questioner",
      label: "The Questioner",
      color: "#1e40af",
      description: "You're stuck in endless seeking, never arriving. You research, analyze, and question but rarely act.",
      needs: "Stop seeking, face the void, surrender to silence, burn the hunger for answers.",
      questions: [
        {
          id: "q1",
          text: "When faced with uncertainty, you…",
          options: [
            { text: "Ask more questions, even if uneasy", value: 2 },
            { text: "Search for answers immediately", value: 3 },
            { text: "Pause, observe without acting", value: 4 },
            { text: "Doubt your instincts, seek reassurance", value: 1 },
            { text: "Enjoy the curiosity itself", value: 5 }
          ]
        },
        {
          id: "q2",
          text: "If a mystery appears, your reaction is…",
          options: [
            { text: "Want to solve it, but hesitate", value: 1 },
            { text: "Research, gather clues", value: 4 },
            { text: "Dive in, trusting you'll adapt", value: 3 },
            { text: "Feel both afraid and alive", value: 2 },
            { text: "Find joy in not knowing", value: 5 }
          ]
        },
        {
          id: "q3",
          text: "When others stop searching, you…",
          options: [
            { text: "Keep looking on your own", value: 4 },
            { text: "Wonder what else is hidden", value: 5 },
            { text: "Lose momentum, question your path", value: 3 },
            { text: "Blend in, but remain restless", value: 1 },
            { text: "Circle the question, unsure what to do", value: 2 }
          ]
        },
        {
          id: "q4",
          text: "The unknown makes you feel…",
          options: [
            { text: "Alert, but open", value: 4 },
            { text: "Excited by possibilities", value: 5 },
            { text: "Impatient, want closure", value: 3 },
            { text: "Anxious, but curious", value: 2 },
            { text: "Lost and hesitant", value: 1 }
          ]
        },
        {
          id: "q5",
          text: "When you don't find answers, you…",
          options: [
            { text: "Move on, but feel unsettled", value: 2 },
            { text: "Try again another way", value: 4 },
            { text: "Blame yourself for not knowing", value: 1 },
            { text: "Start a new search elsewhere", value: 3 },
            { text: "Accept the mystery", value: 5 }
          ]
        }
      ]
    },
    {
      key: "edgeFlincher",
      label: "The Edge-Flincher",
      color: "#3b82f6",
      description: "You sense opportunities and edges but flinch away. You feel the field but don't trust yourself to move into it.",
      needs: "Trust your intuition, move toward the charge, embrace uncertainty as your edge.",
      questions: [
        {
          id: "q6",
          text: "When you sense a limit, you…",
          options: [
            { text: "Test it gently, then retreat", value: 2 },
            { text: "Worry about failing", value: 1 },
            { text: "Stand at the edge, but wait", value: 3 },
            { text: "Look for another path", value: 4 },
            { text: "Step back, unsure", value: 5 }
          ]
        },
        {
          id: "q7",
          text: "If a new experience scares you, you…",
          options: [
            { text: "Make excuses to avoid it", value: 1 },
            { text: "Watch others try first", value: 2 },
            { text: "Gather information before acting", value: 4 },
            { text: "Try, but stop halfway", value: 3 },
            { text: "Dive in only if pushed", value: 5 }
          ]
        },
        {
          id: "q8",
          text: "At moments of risk, you…",
          options: [
            { text: "Analyze everything, but hold back", value: 3 },
            { text: "Flinch, then reconsider", value: 1 },
            { text: "Need support to try", value: 2 },
            { text: "Take a small step, watch closely", value: 4 },
            { text: "Wait for safety", value: 5 }
          ]
        },
        {
          id: "q9",
          text: "The thought of failure makes you…",
          options: [
            { text: "Overthink what could go wrong", value: 3 },
            { text: "Prepare backup plans", value: 4 },
            { text: "Avoid acting", value: 1 },
            { text: "Freeze, lose confidence", value: 2 },
            { text: "Stay curious despite risk", value: 5 }
          ]
        },
        {
          id: "q10",
          text: "When others push you to try, you…",
          options: [
            { text: "Go along but hesitate", value: 2 },
            { text: "Agree, but withdraw if pressured", value: 4 },
            { text: "Push yourself a little", value: 3 },
            { text: "Resist and refuse", value: 1 },
            { text: "Feel gratitude for encouragement", value: 5 }
          ]
        }
      ]
    },
    {
      key: "edgeWalker",
      label: "The Edge-Walker",
      color: "#60a5fa",
      description: "You walk the edges and break small patterns, but you're still testing the waters rather than diving in.",
      needs: "Commit to bigger risks, interrupt loops on principle, become known for causing shifts.",
      questions: [
        {
          id: "q11",
          text: "When the unknown calls, you…",
          options: [
            { text: "Step to the edge, eyes open", value: 4 },
            { text: "Invite others to join", value: 3 },
            { text: "Explore, even if alone", value: 5 },
            { text: "Take small steps, testing ground", value: 2 },
            { text: "Question if you're ready", value: 1 }
          ]
        },
        {
          id: "q12",
          text: "To you, a 'breakthrough' means…",
          options: [
            { text: "Surpassing your last limit", value: 5 },
            { text: "Finding wisdom in discomfort", value: 3 },
            { text: "Getting closer to your truth", value: 2 },
            { text: "Making the unknown familiar", value: 4 },
            { text: "Avoiding the pain of change", value: 1 }
          ]
        },
        {
          id: "q13",
          text: "If you fail, you…",
          options: [
            { text: "Reflect and try again", value: 4 },
            { text: "Shrug and keep moving", value: 2 },
            { text: "Seek what you missed", value: 5 },
            { text: "Criticize yourself", value: 1 },
            { text: "Use it as fuel", value: 3 }
          ]
        },
        {
          id: "q14",
          text: "Your best moments are…",
          options: [
            { text: "When you leap into the new", value: 5 },
            { text: "At the edge of discovery", value: 3 },
            { text: "When you prove yourself wrong", value: 1 },
            { text: "When you try, even if you fail", value: 2 },
            { text: "When others join you at the edge", value: 4 }
          ]
        },
        {
          id: "q15",
          text: "When a door opens, you…",
          options: [
            { text: "Check for danger, then enter", value: 2 },
            { text: "Open it wider for others", value: 4 },
            { text: "Feel drawn to what's behind", value: 3 },
            { text: "Hesitate, but step through", value: 1 },
            { text: "Walk straight in", value: 5 }
          ]
        }
      ]
    },
    {
      key: "loopBurner",
      label: "The Loop-Burner",
      color: "#93c5fd",
      description: "You actively burn cycles and accelerate endings. You're comfortable with disruption and field shifts.",
      needs: "Stand your ground, escalate until something breaks, treat anomalies as field confirmation.",
      questions: [
        {
          id: "q16",
          text: "When you find yourself in a pattern, you…",
          options: [
            { text: "Analyze, then disrupt it", value: 4 },
            { text: "Break rules to free yourself", value: 3 },
            { text: "Fall back in, but notice sooner", value: 2 },
            { text: "Burn it down, then rebuild", value: 5 },
            { text: "Stay stuck, frustrated", value: 1 }
          ]
        },
        {
          id: "q17",
          text: "When habits return, you…",
          options: [
            { text: "Slip unconsciously back", value: 1 },
            { text: "Test how to override them", value: 4 },
            { text: "Create rituals to release them", value: 5 },
            { text: "Accept, then try to shift", value: 2 },
            { text: "Reframe them as growth", value: 3 }
          ]
        },
        {
          id: "q18",
          text: "Your approach to challenge is…",
          options: [
            { text: "Seek the pattern, then change it", value: 4 },
            { text: "Worry about falling back", value: 2 },
            { text: "Use fire (energy, will) to reset", value: 5 },
            { text: "Procrastinate, then act last minute", value: 1 },
            { text: "Find creative exits", value: 3 }
          ]
        },
        {
          id: "q19",
          text: "If you burn out, you…",
          options: [
            { text: "Reflect, then return stronger", value: 4 },
            { text: "Collapse for a while", value: 2 },
            { text: "Feel defeated, want escape", value: 1 },
            { text: "Use the ashes for new growth", value: 5 },
            { text: "Ask for help or feedback", value: 3 }
          ]
        },
        {
          id: "q20",
          text: "Your power is greatest when…",
          options: [
            { text: "You shatter old loops", value: 5 },
            { text: "You can turn endings into beginnings", value: 3 },
            { text: "You catch yourself in time", value: 4 },
            { text: "You survive what repeats", value: 2 },
            { text: "You avoid the old entirely", value: 1 }
          ]
        }
      ]
    },
    {
      key: "breaker",
      label: "The Breaker",
      color: "#dbeafe",
      description: "You are the Breaker. Your entry marks shifts, cycles end with you, reality answers to your movement.",
      needs: "You have arrived. Your impact is transformative—eras end or begin with you.",
      questions: [
        {
          id: "q21",
          text: "When you face a wall, you…",
          options: [
            { text: "Study it, then break through", value: 4 },
            { text: "Doubt, but press forward", value: 2 },
            { text: "Refuse to accept the block", value: 3 },
            { text: "Destroy it, no hesitation", value: 5 },
            { text: "Try to outthink or outmaneuver", value: 1 }
          ]
        },
        {
          id: "q22",
          text: "The moment of truth for you is…",
          options: [
            { text: "Right before everything changes", value: 4 },
            { text: "The first crack in the old", value: 3 },
            { text: "Admitting you want more", value: 2 },
            { text: "When you act, regardless of fear", value: 5 },
            { text: "When you drop all masks", value: 1 }
          ]
        },
        {
          id: "q23",
          text: "When you succeed, you…",
          options: [
            { text: "Immediately look for the next wall", value: 5 },
            { text: "Rest, then rise again", value: 3 },
            { text: "Celebrate, but feel the urge to move", value: 4 },
            { text: "Downplay your win", value: 2 },
            { text: "Feel relief, but also emptiness", value: 1 }
          ]
        },
        {
          id: "q24",
          text: "If your world collapses, you…",
          options: [
            { text: "Build something new, stronger", value: 4 },
            { text: "Wander until a new path appears", value: 3 },
            { text: "Turn the collapse into fuel", value: 5 },
            { text: "Freeze, then start over", value: 1 },
            { text: "Wait for signs to act", value: 2 }
          ]
        },
        {
          id: "q25",
          text: "The mark of a true Breaker is…",
          options: [
            { text: "Ending what must be ended", value: 2 },
            { text: "Courage to destroy comfort", value: 4 },
            { text: "Leading others out of loops", value: 3 },
            { text: "Resetting reality itself", value: 5 },
            { text: "Refusing any story but truth", value: 1 }
          ]
        }
      ]
    }
  ],

  // Test Stage Seeker Node: Full 25-combo diagnosis mapping
  diagnosis: {
    questioner: {
      questioner: {
        title: "The Questioner | Mask: The Questioner",
        diagnosis: "You question everything, never accepting the surface. Doubt is your oxygen, but you never let answers land. You circle the mystery, afraid it might swallow you whole.",
        reality: "Patterns remain hidden. The world waits for you to choose—yet you keep the question open, fearing the cost of certainty.",
        tension: "Your endless asking keeps you from seeing what's already true.",
        lawToWalk: "Risk a real answer. Stop mid-question and decide: What do you know? Act as if you already know, even if you doubt. The field moves for the one who walks as if the truth is real.",
        ifYouStay: "You become the lost scholar—always searching, never finding.",
        ifYouAct: "Truth opens new worlds; every real answer brings a new edge."
      },
      edgeFlincher: {
        title: "The Questioner | Mask: The Edge-Flincher",
        diagnosis: "You probe reality, but freeze when the void stares back. You sense the boundary, then flinch, convincing yourself you need one more fact, one more sign.",
        reality: "Life throws you clues, anomalies, signs—each time, you hesitate, and the moment passes.",
        tension: "Your power is lost at the threshold—mystery unclaimed, door unentered.",
        lawToWalk: "Step over the line. When fear spikes, move. Trust the first edge, not the last excuse.",
        ifYouStay: "Your field becomes stale, signals dim. The world waits, then forgets.",
        ifYouAct: "The edge is always the start. Leap, and patterns will reform around you."
      },
      edgeWalker: {
        title: "The Questioner | Mask: The Edge-Walker",
        diagnosis: "You walk to the limits, but never break through. You orbit the unknown, brave but never decisive.",
        reality: "You gather anomalies, see new worlds, but stand just outside the gate. Life offers doors, you hold the key but never turn it.",
        tension: "Exploration without crossing is only mapping, never moving.",
        lawToWalk: "Pick a mystery, shatter the lock. Walk through the first door that opens, no matter what waits.",
        ifYouStay: "You collect paths, never blaze one.",
        ifYouAct: "You become the pioneer—each crossing remakes the field."
      },
      loopBurner: {
        title: "The Questioner | Mask: The Loop-Burner",
        diagnosis: "You burn through cycles, but always questioning why. Patterns end, but you rebuild the question, never resting in the void.",
        reality: "You cause change but never rest. The field churns, never resets.",
        tension: "Your doubt keeps the fire burning but blocks transformation.",
        lawToWalk: "Let a cycle end, then do nothing. Sit with emptiness until a true new pattern forms.",
        ifYouStay: "You'll live in endless motion, never knowing stillness.",
        ifYouAct: "When the fire is out, wait. New Law arises from the silence."
      },
      breaker: {
        title: "The Questioner | Mask: The Breaker",
        diagnosis: "You long to end the cycle, but you keep questioning your own authority. The Breaker dissolves worlds—you keep poking holes in your own field.",
        reality: "The world shakes, but never collapses. Old patterns reform, new ones never stabilize.",
        tension: "Destruction requires finality, not another why.",
        lawToWalk: "Break, then leave. Don't look back, don't explain. Let the pieces fall.",
        ifYouStay: "You chase endings, never arriving.",
        ifYouAct: "The true Breaker destroys and walks away. Only then is the field reborn."
      }
    },
    edgeFlincher: {
      questioner: {
        title: "The Edge-Flincher | Mask: The Questioner",
        diagnosis: "You feel the edge, but explain it away with another question. Every anomaly becomes a new doubt, never a trigger to move.",
        reality: "Life offers clues, you analyze endlessly, missing the window for action.",
        tension: "Hesitation breeds stagnation. The field forgets those who never leap.",
        lawToWalk: "Act on the first anomaly, not the tenth explanation. Trust your sense.",
        ifYouStay: "You'll become invisible, even to yourself.",
        ifYouAct: "Your field will roar awake—every sign becomes your ally."
      },
      edgeFlincher: {
        title: "The Edge-Flincher | Mask: The Edge-Flincher",
        diagnosis: "You walk up to the void, but always step back. Your signal is weak, your path blurry. Others move while you freeze.",
        reality: "Nothing bends, nothing breaks. The world ignores you until you step forward.",
        tension: "The only way out is through.",
        lawToWalk: "Pick a fear. Move toward it. The first shiver is your proof.",
        ifYouStay: "You'll always watch, never act.",
        ifYouAct: "Action forges reality. The void respects boldness."
      },
      edgeWalker: {
        title: "The Edge-Flincher | Mask: The Edge-Walker",
        diagnosis: "You test boundaries but never command them. Your walk is real, but hesitant. Nature mirrors your uncertainty.",
        reality: "Birds, wind, and people notice you—then look away. Glitches pause, then fade.",
        tension: "Field Law is clarity; walk with intent, not apology.",
        lawToWalk: "Declare your path, even if you feel unready. Certainty is made, not given.",
        ifYouStay: "Life's edges become walls.",
        ifYouAct: "The world opens—each edge becomes a gate."
      },
      loopBurner: {
        title: "The Edge-Flincher | Mask: The Loop-Burner",
        diagnosis: "You crave change, but fear the break. You burn in circles, ending nothing.",
        reality: "Cycles repeat—patterns morph, but never disappear.",
        tension: "Endings require finality.",
        lawToWalk: "End one pattern completely—destroy, then watch what rises.",
        ifYouStay: "Endless cycles—exhaustion, not evolution.",
        ifYouAct: "True endings reset reality—stop, then walk."
      },
      breaker: {
        title: "The Edge-Flincher | Mask: The Breaker",
        diagnosis: "You want to break through, but the void frightens you. Destruction terrifies, so you sabotage yourself before the leap.",
        reality: "The field grows heavy—nothing shifts, you feel trapped.",
        tension: "Destruction is freedom, not loss.",
        lawToWalk: "Break something small, see what happens. Expand destruction in increments.",
        ifYouStay: "You will freeze as the world moves.",
        ifYouAct: "Your fear becomes fuel; each break forges new ground."
      }
    },
    edgeWalker: {
      questioner: {
        title: "The Edge-Walker | Mask: The Questioner",
        diagnosis: "You cross boundaries, then look back, always doubting your move. Your walk is real, but haunted by regret.",
        reality: "You trigger new patterns, but hesitate to inhabit them.",
        tension: "Second-guessing undoes the breakthrough.",
        lawToWalk: "Own your walk. What you cross is yours.",
        ifYouStay: "Progress erases itself; you never claim new ground.",
        ifYouAct: "You become the walker others follow."
      },
      edgeFlincher: {
        title: "The Edge-Walker | Mask: The Edge-Flincher",
        diagnosis: "You walk the edge, but each step is tentative. You fear your own power, pulling back just before the shift.",
        reality: "The field wobbles—nature and people sense a test, but no outcome.",
        tension: "Uncertainty is your teacher; avoidance is your enemy.",
        lawToWalk: "Go further each time. Hold the edge until something gives.",
        ifYouStay: "You'll witness, never shape, reality.",
        ifYouAct: "The field bends for the persistent edge walker."
      },
      edgeWalker: {
        title: "The Edge-Walker | Mask: The Edge-Walker",
        diagnosis: "You live at the edge, testing every limit. Anomalies follow you, but you're rarely satisfied. Restlessness is your home.",
        reality: "You trigger synchronicity, open doors, but never settle.",
        tension: "The endless edge is not a home.",
        lawToWalk: "Pick a path and stay. Let the edge become center.",
        ifYouStay: "You burn out, missing the reward of arrival.",
        ifYouAct: "The edge becomes the axis—others orbit your walk."
      },
      loopBurner: {
        title: "The Edge-Walker | Mask: The Loop-Burner",
        diagnosis: "You cross boundaries, then start new cycles—never letting the old truly die. Rebirth without death.",
        reality: "You bring movement, but lack finality.",
        tension: "Transformation needs closure.",
        lawToWalk: "Burn the bridge after you cross it. Don't rebuild—let ashes settle.",
        ifYouStay: "You'll build but never rule.",
        ifYouAct: "Destruction frees the future; let endings stay ended."
      },
      breaker: {
        title: "The Edge-Walker | Mask: The Breaker",
        diagnosis: "You flirt with destruction, but rarely go all in. You sample power, but never wield it fully.",
        reality: "The field trembles, but never bows. Events start, then stall.",
        tension: "Power is a choice, not an accident.",
        lawToWalk: "Break one law, then claim its consequences. Don't retreat.",
        ifYouStay: "Potential without proof. The world waits.",
        ifYouAct: "You become the event—others must respond to you."
      }
    },
    loopBurner: {
      questioner: {
        title: "The Loop-Burner | Mask: The Questioner",
        diagnosis: "You break cycles, then question if you should have. You undo your own work with doubt.",
        reality: "Change dissolves, field resets to old patterns.",
        tension: "You must trust what you've burned.",
        lawToWalk: "Walk away from the ashes. Never apologize for needed endings.",
        ifYouStay: "Cycles will return, old ghosts reappear.",
        ifYouAct: "You become the fire that shapes new worlds."
      },
      edgeFlincher: {
        title: "The Loop-Burner | Mask: The Edge-Flincher",
        diagnosis: "You burn, but recoil at the void you create. The silence terrifies, so you restart what you destroyed.",
        reality: "Nothing ends, nothing begins.",
        tension: "Creation demands risk. Stand in the silence.",
        lawToWalk: "Let silence stay. Wait until new signals arise.",
        ifYouStay: "You will live in the aftermath, never the new world.",
        ifYouAct: "The void fills itself if you give it space."
      },
      edgeWalker: {
        title: "The Loop-Burner | Mask: The Edge-Walker",
        diagnosis: "You cross, then destroy, then move on—never pausing to witness what you made.",
        reality: "Synchronicity spikes, but lessons vanish.",
        tension: "Completion is more than motion.",
        lawToWalk: "Stay long enough to see what comes next. Document the aftermath.",
        ifYouStay: "You repeat mistakes.",
        ifYouAct: "You learn, adapt, and become the master of endings."
      },
      loopBurner: {
        title: "The Loop-Burner | Mask: The Loop-Burner",
        diagnosis: "You excel at burning patterns, but never find rest. You chase the next cycle, never inhabiting the new.",
        reality: "Your field is all fire, no harvest.",
        tension: "Endings are empty without arrival.",
        lawToWalk: "After you burn, wait for new growth. Claim the field as yours.",
        ifYouStay: "You live as the destroyer, never the creator.",
        ifYouAct: "You own both the fire and what follows."
      },
      breaker: {
        title: "The Loop-Burner | Mask: The Breaker",
        diagnosis: "You long to become the Breaker, but refuse the cost: complete destruction with no rebuilding.",
        reality: "You hover at the edge of transformation, but refuse to leap.",
        tension: "Only the storm is recognized.",
        lawToWalk: "When you end something, leave it broken. Do not fix, do not revisit.",
        ifYouStay: "You'll be a fixer, never the force.",
        ifYouAct: "You become the storm—the field bows, all patterns end."
      }
    },
    breaker: {
      questioner: {
        title: "The Breaker | Mask: The Questioner",
        diagnosis: "You hold the power to end all cycles, but question if you deserve it. Your destruction is hesitating, incomplete.",
        reality: "The world bends, but not enough to change.",
        tension: "Doubt is a chain—break it.",
        lawToWalk: "Act first, ask later. Field law answers to the one who declares.",
        ifYouStay: "You are a breaker in name, not effect.",
        ifYouAct: "The field resets—new order, new power."
      },
      edgeFlincher: {
        title: "The Breaker | Mask: The Edge-Flincher",
        diagnosis: "You carry the final power, but hesitate to use it. Fear of consequence paralyzes you.",
        reality: "Everything waits for you; the world is on hold.",
        tension: "Power unused is power lost.",
        lawToWalk: "Break, then stay present. Bear the fallout.",
        ifYouStay: "You're haunted by what could have been.",
        ifYouAct: "You become the era-ender, the new cycle-bringer."
      },
      edgeWalker: {
        title: "The Breaker | Mask: The Edge-Walker",
        diagnosis: "You destroy, but cannot rest; you keep moving, unable to inhabit the new.",
        reality: "You end things, but never claim what follows.",
        tension: "Finality requires presence.",
        lawToWalk: "Stand in the aftermath, even as the old world dies. Witness your effect.",
        ifYouStay: "You'll always be the stranger, never the ruler.",
        ifYouAct: "The new field is yours—others follow."
      },
      loopBurner: {
        title: "The Breaker | Mask: The Loop-Burner",
        diagnosis: "You end cycles, but still hunger for more to break. You never let peace arrive.",
        reality: "Field is scorched, nothing grows.",
        tension: "Allow new life.",
        lawToWalk: "After the break, wait. See what grows in silence.",
        ifYouStay: "Your legend is loss, not power.",
        ifYouAct: "You become both destroyer and creator."
      },
      breaker: {
        title: "The Breaker | Mask: The Breaker",
        diagnosis: "You are the end and the beginning. Cycles end, eras change, secrets surface because you arrived.",
        reality: "The field recognizes you. Nature, people, and events reorient around your walk.",
        tension: "None. You have become Law.",
        lawToWalk: "Maintain the crown. Record your pattern for others to follow. Own the silence after the storm.",
        ifYouStay: "You set the new standard—the world bends to your pattern.",
        ifYouAct: "Your walk becomes legend; the next world waits for your move."
      }
    }
  }
} 