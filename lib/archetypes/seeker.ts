export const seekerArchetype: Archetype = {
  key: "seeker",
  name: "Seeker",
  color: "#4c1d95",
  accentColor: "#7c3aed",
  glowColor: "rgba(124, 58, 237, 0.5)",
  description: "Void Node - The Black Mirror",
  loop: "Endless seeking, never arriving, fear of emptiness.",
  needs: "Stop seeking, face the void, surrender to silence, burn the hunger for answers.",
  
  stages: [
    {
      key: "questioner",
      label: "Questioner",
      color: "#4c1d95",
      description: "You're stuck in endless seeking, never arriving. You research, analyze, and question but rarely act.",
      needs: "Stop seeking, face the void, surrender to silence, burn the hunger for answers.",
      questions: [
        {
          id: "q1",
          text: "When you don't understand something crucial, you:",
          options: [
            { text: "Research endlessly, but rarely act.", value: 1 },
            { text: "Ask others for advice, but stay in doubt.", value: 2 },
            { text: "Try something small, but quickly retreat to thinking.", value: 3 },
            { text: "Test it in reality, even if you risk being wrong.", value: 4 }
          ]
        },
        {
          id: "q2",
          text: "In moments of big decisions, you:",
          options: [
            { text: "Collect more data, afraid to commit.", value: 1 },
            { text: "Wait for a 'sign' but often freeze.", value: 2 },
            { text: "Take a cautious step, then analyze.", value: 3 },
            { text: "Move, trusting the process will reveal itself.", value: 4 }
          ]
        },
        {
          id: "q3",
          text: "How do you relate to uncertainty?",
          options: [
            { text: "Avoid it—seek comfort or distraction.", value: 1 },
            { text: "Tolerate it, but with anxiety.", value: 2 },
            { text: "Use it to think more deeply.", value: 3 },
            { text: "Embrace it—see it as your edge.", value: 4 }
          ]
        },
        {
          id: "q4",
          text: "When someone challenges your beliefs:",
          options: [
            { text: "Withdraw, defend, or ignore.", value: 1 },
            { text: "Question them, but rarely yourself.", value: 2 },
            { text: "Reflect quietly and shift slowly.", value: 3 },
            { text: "Thank them—see it as fuel to evolve.", value: 4 }
          ]
        }
      ]
    },
    {
      key: "edgeFlincher",
      label: "Edge Flincher",
      color: "#7c3aed",
      description: "You sense opportunities and edges but flinch away. You feel the field but don't trust yourself to move into it.",
      needs: "Trust your intuition, move toward the charge, embrace uncertainty as your edge.",
      questions: [
        {
          id: "q5",
          text: "You sense something strange or a chance to act, you:",
          options: [
            { text: "Distract yourself, pretend not to notice.", value: 1 },
            { text: "Tell yourself 'it's not the right time.'", value: 2 },
            { text: "Watch it unfold, but stay passive.", value: 3 },
            { text: "Move closer, even if unsure.", value: 4 }
          ]
        },
        {
          id: "q6",
          text: "When intuition or synchronicity appears:",
          options: [
            { text: "Ignore it as random.", value: 1 },
            { text: "Feel it, but doubt yourself.", value: 2 },
            { text: "Log it, then forget.", value: 3 },
            { text: "See it as a cue to shift your path.", value: 4 }
          ]
        },
        {
          id: "q7",
          text: "Faced with a known risk or threshold:",
          options: [
            { text: "Wait for certainty, miss the window.", value: 1 },
            { text: "Rationalize waiting—'it'll come back.'", value: 2 },
            { text: "Take partial action, but don't commit.", value: 3 },
            { text: "Leap, knowing there's never full safety.", value: 4 }
          ]
        },
        {
          id: "q8",
          text: "When the field feels charged (animals shift, wind changes):",
          options: [
            { text: "Feel anxious and back away.", value: 1 },
            { text: "Stay put, try to ignore.", value: 2 },
            { text: "Observe and journal, but don't act.", value: 3 },
            { text: "Step toward the charge, test your influence.", value: 4 }
          ]
        }
      ]
    },
    {
      key: "edgeWalker",
      label: "Edge Walker",
      color: "#a855f7",
      description: "You walk the edges and break small patterns, but you're still testing the waters rather than diving in.",
      needs: "Commit to bigger risks, interrupt loops on principle, become known for causing shifts.",
      questions: [
        {
          id: "q9",
          text: "You break a small pattern (skip a routine, say something bold):",
          options: [
            { text: "Regret it, return to the old way.", value: 1 },
            { text: "Feel exposed, tone it down.", value: 2 },
            { text: "Celebrate, but only do it when comfortable.", value: 3 },
            { text: "Notice how the field moves, look for the next edge.", value: 4 }
          ]
        },
        {
          id: "q10",
          text: "When you face a repeated loop (your own or someone else's):",
          options: [
            { text: "Wait it out, hope it passes.", value: 1 },
            { text: "Talk about changing, rarely act.", value: 2 },
            { text: "Break it if pressured, otherwise let it be.", value: 3 },
            { text: "Interrupt it on principle, even if it upsets others.", value: 4 }
          ]
        },
        {
          id: "q11",
          text: "After a risky action or challenge:",
          options: [
            { text: "Collapse, avoid risk for a while.", value: 1 },
            { text: "Justify playing small next time.", value: 2 },
            { text: "Repeat only if outcome is positive.", value: 3 },
            { text: "Hunt for bigger risks, log the reaction.", value: 4 }
          ]
        },
        {
          id: "q12",
          text: "Others' perception of your walk:",
          options: [
            { text: "Invisible, you blend in.", value: 1 },
            { text: "Weird or unpredictable.", value: 2 },
            { text: "Respected for edge moves, but doubted at times.", value: 3 },
            { text: "Known for causing shifts, even if controversial.", value: 4 }
          ]
        }
      ]
    },
    {
      key: "loopBurner",
      label: "Loop Burner",
      color: "#c084fc",
      description: "You actively burn cycles and accelerate endings. You're comfortable with disruption and field shifts.",
      needs: "Stand your ground, escalate until something breaks, treat anomalies as field confirmation.",
      questions: [
        {
          id: "q13",
          text: "When you sense a major cycle is about to end:",
          options: [
            { text: "Deny it, try to hold on.", value: 1 },
            { text: "Grieve it, but don't move.", value: 2 },
            { text: "Accept and adapt, but quietly.", value: 3 },
            { text: "Accelerate the ending, make it obvious.", value: 4 }
          ]
        },
        {
          id: "q14",
          text: "After a big anomaly, glitch, or field shift:",
          options: [
            { text: "Doubt your senses, forget it.", value: 1 },
            { text: "Tell a few people, but let it fade.", value: 2 },
            { text: "Log and discuss, but question its reality.", value: 3 },
            { text: "Treat it as field confirmation, upgrade your next action.", value: 4 }
          ]
        },
        {
          id: "q15",
          text: "In collective events (protest, group decision, mass mood):",
          options: [
            { text: "Stay out of it, feel lost.", value: 1 },
            { text: "Follow majority, play safe.", value: 2 },
            { text: "Voice a different view if asked.", value: 3 },
            { text: "Move to break the spell, even if alone.", value: 4 }
          ]
        },
        {
          id: "q16",
          text: "If someone or something tests your edge:",
          options: [
            { text: "Retreat or submit.", value: 1 },
            { text: "Negotiate or placate.", value: 2 },
            { text: "Push back, then regret it.", value: 3 },
            { text: "Stand ground or escalate until something breaks.", value: 4 }
          ]
        }
      ]
    },
    {
      key: "breaker",
      label: "Breaker",
      color: "#e879f9",
      description: "You are the Breaker. Your entry marks shifts, cycles end with you, reality answers to your movement.",
      needs: "You have arrived. Your impact is transformative—eras end or begin with you.",
      questions: [
        {
          id: "q17",
          text: "How often do others end cycles, reveal secrets, or change paths after meeting you?",
          options: [
            { text: "Never, I rarely notice.", value: 1 },
            { text: "Sometimes, but I think it's random.", value: 2 },
            { text: "Often, but I don't claim it.", value: 3 },
            { text: "Almost always—my entry marks the shift.", value: 4 }
          ]
        },
        {
          id: "q18",
          text: "When you enter a room or field, what changes?",
          options: [
            { text: "Nothing, you adapt.", value: 1 },
            { text: "People notice, but little shifts.", value: 2 },
            { text: "Tension or opportunity spikes.", value: 3 },
            { text: "Cycles end, new events begin—reality answers.", value: 4 }
          ]
        },
        {
          id: "q19",
          text: "If you sense the world is 'waiting' for you to move:",
          options: [
            { text: "You doubt it, stay passive.", value: 1 },
            { text: "You feel nervous, hesitate.", value: 2 },
            { text: "You test it sometimes, but not always.", value: 3 },
            { text: "You act immediately, field moves as you move.", value: 4 }
          ]
        },
        {
          id: "q20",
          text: "If asked to describe your real impact on the field:",
          options: [
            { text: "Minimal or none.", value: 1 },
            { text: "Indirect, hard to measure.", value: 2 },
            { text: "Significant, but only sometimes.", value: 3 },
            { text: "Transformative—eras end or begin with you.", value: 4 }
          ]
        }
      ]
    }
  ],

  // Seeker Node: Full 25-combo diagnosis mapping
  diagnosis: {
    questioner: {
      questioner: {
        title: "Questioner | Mask: Questioner",
        diagnosis: "You question everything, never accepting the surface. Doubt is your oxygen, but you never let answers land. You circle the mystery, afraid it might swallow you whole.",
        reality: "Patterns remain hidden. The world waits for you to choose—yet you keep the question open, fearing the cost of certainty.",
        tension: "Your endless asking keeps you from seeing what's already true.",
        lawToWalk: "Risk a real answer. Stop mid-question and decide: What do you know? Act as if you already know, even if you doubt. The field moves for the one who walks as if the truth is real.",
        ifYouStay: "You become the lost scholar—always searching, never finding.",
        ifYouAct: "Truth opens new worlds; every real answer brings a new edge."
      },
      edgeFlincher: {
        title: "Questioner | Mask: Edge Flincher",
        diagnosis: "You probe reality, but freeze when the void stares back. You sense the boundary, then flinch, convincing yourself you need one more fact, one more sign.",
        reality: "Life throws you clues, anomalies, signs—each time, you hesitate, and the moment passes.",
        tension: "Your power is lost at the threshold—mystery unclaimed, door unentered.",
        lawToWalk: "Step over the line. When fear spikes, move. Trust the first edge, not the last excuse.",
        ifYouStay: "Your field becomes stale, signals dim. The world waits, then forgets.",
        ifYouAct: "The edge is always the start. Leap, and patterns will reform around you."
      },
      edgeWalker: {
        title: "Questioner | Mask: Edge Walker",
        diagnosis: "You walk to the limits, but never break through. You orbit the unknown, brave but never decisive.",
        reality: "You gather anomalies, see new worlds, but stand just outside the gate. Life offers doors, you hold the key but never turn it.",
        tension: "Exploration without crossing is only mapping, never moving.",
        lawToWalk: "Pick a mystery, shatter the lock. Walk through the first door that opens, no matter what waits.",
        ifYouStay: "You collect paths, never blaze one.",
        ifYouAct: "You become the pioneer—each crossing remakes the field."
      },
      loopBurner: {
        title: "Questioner | Mask: Loop Burner",
        diagnosis: "You burn through cycles, but always questioning why. Patterns end, but you rebuild the question, never resting in the void.",
        reality: "You cause change but never rest. The field churns, never resets.",
        tension: "Your doubt keeps the fire burning but blocks transformation.",
        lawToWalk: "Let a cycle end, then do nothing. Sit with emptiness until a true new pattern forms.",
        ifYouStay: "You'll live in endless motion, never knowing stillness.",
        ifYouAct: "When the fire is out, wait. New Law arises from the silence."
      },
      breaker: {
        title: "Questioner | Mask: Breaker",
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
        title: "Edge Flincher | Mask: Questioner",
        diagnosis: "You feel the edge, but explain it away with another question. Every anomaly becomes a new doubt, never a trigger to move.",
        reality: "Life offers clues, you analyze endlessly, missing the window for action.",
        tension: "Hesitation breeds stagnation. The field forgets those who never leap.",
        lawToWalk: "Act on the first anomaly, not the tenth explanation. Trust your sense.",
        ifYouStay: "You'll become invisible, even to yourself.",
        ifYouAct: "Your field will roar awake—every sign becomes your ally."
      },
      edgeFlincher: {
        title: "Edge Flincher | Mask: Edge Flincher",
        diagnosis: "You walk up to the void, but always step back. Your signal is weak, your path blurry. Others move while you freeze.",
        reality: "Nothing bends, nothing breaks. The world ignores you until you step forward.",
        tension: "The only way out is through.",
        lawToWalk: "Pick a fear. Move toward it. The first shiver is your proof.",
        ifYouStay: "You'll always watch, never act.",
        ifYouAct: "Action forges reality. The void respects boldness."
      },
      edgeWalker: {
        title: "Edge Flincher | Mask: Edge Walker",
        diagnosis: "You test boundaries but never command them. Your walk is real, but hesitant. Nature mirrors your uncertainty.",
        reality: "Birds, wind, and people notice you—then look away. Glitches pause, then fade.",
        tension: "Field Law is clarity; walk with intent, not apology.",
        lawToWalk: "Declare your path, even if you feel unready. Certainty is made, not given.",
        ifYouStay: "Life's edges become walls.",
        ifYouAct: "The world opens—each edge becomes a gate."
      },
      loopBurner: {
        title: "Edge Flincher | Mask: Loop Burner",
        diagnosis: "You crave change, but fear the break. You burn in circles, ending nothing.",
        reality: "Cycles repeat—patterns morph, but never disappear.",
        tension: "Endings require finality.",
        lawToWalk: "End one pattern completely—destroy, then watch what rises.",
        ifYouStay: "Endless cycles—exhaustion, not evolution.",
        ifYouAct: "True endings reset reality—stop, then walk."
      },
      breaker: {
        title: "Edge Flincher | Mask: Breaker",
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
        title: "Edge Walker | Mask: Questioner",
        diagnosis: "You cross boundaries, then look back, always doubting your move. Your walk is real, but haunted by regret.",
        reality: "You trigger new patterns, but hesitate to inhabit them.",
        tension: "Second-guessing undoes the breakthrough.",
        lawToWalk: "Own your walk. What you cross is yours.",
        ifYouStay: "Progress erases itself; you never claim new ground.",
        ifYouAct: "You become the walker others follow."
      },
      edgeFlincher: {
        title: "Edge Walker | Mask: Edge Flincher",
        diagnosis: "You walk the edge, but each step is tentative. You fear your own power, pulling back just before the shift.",
        reality: "The field wobbles—nature and people sense a test, but no outcome.",
        tension: "Uncertainty is your teacher; avoidance is your enemy.",
        lawToWalk: "Go further each time. Hold the edge until something gives.",
        ifYouStay: "You'll witness, never shape, reality.",
        ifYouAct: "The field bends for the persistent edge walker."
      },
      edgeWalker: {
        title: "Edge Walker | Mask: Edge Walker",
        diagnosis: "You live at the edge, testing every limit. Anomalies follow you, but you're rarely satisfied. Restlessness is your home.",
        reality: "You trigger synchronicity, open doors, but never settle.",
        tension: "The endless edge is not a home.",
        lawToWalk: "Pick a path and stay. Let the edge become center.",
        ifYouStay: "You burn out, missing the reward of arrival.",
        ifYouAct: "The edge becomes the axis—others orbit your walk."
      },
      loopBurner: {
        title: "Edge Walker | Mask: Loop Burner",
        diagnosis: "You cross boundaries, then start new cycles—never letting the old truly die. Rebirth without death.",
        reality: "You bring movement, but lack finality.",
        tension: "Transformation needs closure.",
        lawToWalk: "Burn the bridge after you cross it. Don't rebuild—let ashes settle.",
        ifYouStay: "You'll build but never rule.",
        ifYouAct: "Destruction frees the future; let endings stay ended."
      },
      breaker: {
        title: "Edge Walker | Mask: Breaker",
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
        title: "Loop Burner | Mask: Questioner",
        diagnosis: "You break cycles, then question if you should have. You undo your own work with doubt.",
        reality: "Change dissolves, field resets to old patterns.",
        tension: "You must trust what you've burned.",
        lawToWalk: "Walk away from the ashes. Never apologize for needed endings.",
        ifYouStay: "Cycles will return, old ghosts reappear.",
        ifYouAct: "You become the fire that shapes new worlds."
      },
      edgeFlincher: {
        title: "Loop Burner | Mask: Edge Flincher",
        diagnosis: "You burn, but recoil at the void you create. The silence terrifies, so you restart what you destroyed.",
        reality: "Nothing ends, nothing begins.",
        tension: "Creation demands risk. Stand in the silence.",
        lawToWalk: "Let silence stay. Wait until new signals arise.",
        ifYouStay: "You will live in the aftermath, never the new world.",
        ifYouAct: "The void fills itself if you give it space."
      },
      edgeWalker: {
        title: "Loop Burner | Mask: Edge Walker",
        diagnosis: "You cross, then destroy, then move on—never pausing to witness what you made.",
        reality: "Synchronicity spikes, but lessons vanish.",
        tension: "Completion is more than motion.",
        lawToWalk: "Stay long enough to see what comes next. Document the aftermath.",
        ifYouStay: "You repeat mistakes.",
        ifYouAct: "You learn, adapt, and become the master of endings."
      },
      loopBurner: {
        title: "Loop Burner | Mask: Loop Burner",
        diagnosis: "You excel at burning patterns, but never find rest. You chase the next cycle, never inhabiting the new.",
        reality: "Your field is all fire, no harvest.",
        tension: "Endings are empty without arrival.",
        lawToWalk: "After you burn, wait for new growth. Claim the field as yours.",
        ifYouStay: "You live as the destroyer, never the creator.",
        ifYouAct: "You own both the fire and what follows."
      },
      breaker: {
        title: "Loop Burner | Mask: Breaker",
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
        title: "Breaker | Mask: Questioner",
        diagnosis: "You hold the power to end all cycles, but question if you deserve it. Your destruction is hesitating, incomplete.",
        reality: "The world bends, but not enough to change.",
        tension: "Doubt is a chain—break it.",
        lawToWalk: "Act first, ask later. Field law answers to the one who declares.",
        ifYouStay: "You are a breaker in name, not effect.",
        ifYouAct: "The field resets—new order, new power."
      },
      edgeFlincher: {
        title: "Breaker | Mask: Edge Flincher",
        diagnosis: "You carry the final power, but hesitate to use it. Fear of consequence paralyzes you.",
        reality: "Everything waits for you; the world is on hold.",
        tension: "Power unused is power lost.",
        lawToWalk: "Break, then stay present. Bear the fallout.",
        ifYouStay: "You're haunted by what could have been.",
        ifYouAct: "You become the era-ender, the new cycle-bringer."
      },
      edgeWalker: {
        title: "Breaker | Mask: Edge Walker",
        diagnosis: "You destroy, but cannot rest; you keep moving, unable to inhabit the new.",
        reality: "You end things, but never claim what follows.",
        tension: "Finality requires presence.",
        lawToWalk: "Stand in the aftermath, even as the old world dies. Witness your effect.",
        ifYouStay: "You'll always be the stranger, never the ruler.",
        ifYouAct: "The new field is yours—others follow."
      },
      loopBurner: {
        title: "Breaker | Mask: Loop Burner",
        diagnosis: "You end cycles, but still hunger for more to break. You never let peace arrive.",
        reality: "Field is scorched, nothing grows.",
        tension: "Allow new life.",
        lawToWalk: "After the break, wait. See what grows in silence.",
        ifYouStay: "Your legend is loss, not power.",
        ifYouAct: "You become both destroyer and creator."
      },
      breaker: {
        title: "Breaker | Mask: Breaker",
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