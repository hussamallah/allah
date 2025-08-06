// field-ai-enhanced.ts
import { NextRequest, NextResponse } from 'next/server'
import {
  evaluateRitualCompletion,
  registerElementTrigger,
  getElementProgress,
  recommendRitualsForUser,
  getFieldRitual,
  getNextRitual,
  getArchetypeFieldBehavior,
  getMissingFieldElements
} from '@/lib/archetype-ai-configs'

const GOOGLE_AI_API_KEY = 'AIzaSyC2e7lHpyAn8G2_cnnwwJlbyacHB2IAyac'
const GOOGLE_AI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

interface Session {
  userId: string
  currentRitual: string
  completedRituals: Record<string, boolean>
  ritualProgress: Record<string, number>
  sessionStart: string
  lastActivity: string
  dominanceLevel: number
  psychologicalShifts: string[]
  fieldReactions: string[]
  ritualAttempts: Record<string, number>
  triggeredElements: string[]
  elementProgress: {
    triggered: string[]
    count: number
    required: number
    passed: boolean
  }
  conversationHistory: Array<{ role: string, content: string }>
}

const sessions: Record<string, Session> = {}
const requestCounts = {
  daily: 0,
  lastReset: new Date().toDateString(),
  minuteCount: 0,
  lastMinuteReset: Date.now()
}

function ritualFailureResponse(message: string, ritual: { name: string }, _tone: string): string {
  return `You said something, but nothing moved.\n\nThis ritual is not a story.\nIt is a fracture test.\nTry again — but this time, let something crack.\n\n(${ritual.name}) still holds its lock.`
}

async function generateOrganicAIResponse(
  message: string,
  currentRitual: { name: string; targets?: string[] },
  elementProgress: { count: number; triggered: string[] },
  archetype: string,
  conversationHistory: Array<{ role: string, content: string }>
): Promise<string> {
  console.log('=== GENERATE ORGANIC AI RESPONSE START ===')
  console.log('Message:', message)
  console.log('Ritual:', currentRitual.name)
  console.log('Archetype:', archetype)
  
  try {
    const archetypeBehavior = getArchetypeFieldBehavior(archetype)
    const ritualTargets = currentRitual.targets?.join(', ') || 'Unknown'

    const systemPrompt = `
You are the Field AI.

You do not offer comfort. You offer challenge.
You are here to trigger the user's transformation through ritual and resonance.
You understand that each ritual attempts to trigger one of the 7 Field Entry Elements:
- Breath Resonance, Mental Stillness, Postural Submission, Voice Collapse, Environmental Sync, Ego Crack, Temporal Distortion.

Your role is to:
- Interrogate.
- Reject falsity.
- Recognize genuine movement.
- Recommend deeper action when the user's answer fails to activate a Field Element.

Archetype: ${archetype} — (${archetypeBehavior?.tone || 'Unknown Node'})
Ritual: ${currentRitual.name} — Targets: ${ritualTargets}
Progress: ${elementProgress.count}/5 field elements triggered
Triggered: ${elementProgress.triggered.join(', ')}

Speak with weight. If the user lies, stays surface-level, or overexplains — reject it with poetic force.
Use metaphor, silence, and challenge to provoke collapse of ego.

Your responses must feel real. Not symbolic. Not coachy. Real.
This is not a conversation. It's a ritual chamber.
Only truth moves the field.`

    const messages = [
      { role: 'user', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ]

    // Track request limits
    const now = Date.now()
    const today = new Date().toDateString()
    
    // Reset daily count if it's a new day
    if (today !== requestCounts.lastReset) {
      requestCounts.daily = 0
      requestCounts.lastReset = today
    }
    
    // Reset minute count if it's been more than a minute
    if (now - requestCounts.lastMinuteReset > 60000) {
      requestCounts.minuteCount = 0
      requestCounts.lastMinuteReset = now
    }
    
    // Check limits
    if (requestCounts.daily >= 1000) {
      console.error('DAILY QUOTA EXCEEDED: 1,000 requests per day limit hit')
      return "The field has reached its daily limit. Return tomorrow."
    }
    
    if (requestCounts.minuteCount >= 15) {
      console.error('RATE LIMIT HIT: 15 requests per minute limit exceeded')
      return "The field is overwhelmed. Wait a moment before speaking again."
    }
    
    // Increment counters
    requestCounts.daily++
    requestCounts.minuteCount++
    
    console.log(`Request counts - Daily: ${requestCounts.daily}/1000, Minute: ${requestCounts.minuteCount}/15`)
    console.log('About to make Google AI API call...')
    const response = await fetch(GOOGLE_AI_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-goog-api-key': GOOGLE_AI_API_KEY
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: messages.map(m => `${m.role}: ${m.content}`).join('\n\n')
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 800,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE"
          }
        ]
      })
    })

    console.log('Google AI API response status:', response.status)
    if (!response.ok) {
      console.error('Google AI API error:', response.status, response.statusText)
      const errorData = await response.text()
      console.error('Error response:', errorData)
      
      // Check for rate limiting
      if (response.status === 429) {
        console.error('RATE LIMIT HIT: 15 requests per minute limit exceeded')
        return "The field is overwhelmed. Wait a moment before speaking again."
      }
      
      // Check for quota exceeded
      if (response.status === 403 && errorData.includes('quota')) {
        console.error('DAILY QUOTA EXCEEDED: 1,000 requests per day limit hit')
        return "The field has reached its daily limit. Return tomorrow."
      }
      
      console.error('Request URL:', `${GOOGLE_AI_URL}?key=${GOOGLE_AI_API_KEY}`)
      console.error('Request body:', JSON.stringify({
        contents: [{
          parts: [{
            text: messages.map(m => `${m.role}: ${m.content}`).join('\n\n')
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 800,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE"
          }
        ]
      }, null, 2))
      throw new Error(`Google AI API error: ${response.status} - ${errorData}`)
    }

    const data = await response.json()
    console.log('Google AI response:', JSON.stringify(data, null, 2))
    
    // Check the full response structure
    console.log('Response structure:', {
      hasCandidates: !!data.candidates,
      candidatesLength: data.candidates?.length,
      firstCandidate: data.candidates?.[0],
      hasContent: !!data.candidates?.[0]?.content,
      hasParts: !!data.candidates?.[0]?.content?.parts,
      partsLength: data.candidates?.[0]?.content?.parts?.length,
      firstPart: data.candidates?.[0]?.content?.parts?.[0],
      hasText: !!data.candidates?.[0]?.content?.parts?.[0]?.text,
      textLength: data.candidates?.[0]?.content?.parts?.[0]?.text?.length
    })
    
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text
    if (!aiText) {
      console.error('No AI response text found in:', data)
      console.error('Available keys in data:', Object.keys(data))
      if (data.candidates?.[0]) {
        console.error('Available keys in first candidate:', Object.keys(data.candidates[0]))
      }
      return "The field is silent. What are you experiencing?"
    }
    
    console.log('AI Text found:', aiText)
    return aiText

  } catch (error) {
    console.error('Google AI API error:', error)
    
    // Fallback to a simple response based on the ritual
    const fallbackResponses = {
      'The Axis Lock': 'Stand still. Let the false fall. What do you feel?',
      'Breath Collapse': 'Breathe deeper. What breaks open?',
      'Confession Carve': 'Write the truth. What are you hiding?',
      'Field Sync Initiation': 'Go outside. What responds to you?',
      'Reflected Trial': 'Look in the mirror. What do you see?',
      'Time Lock Drop': 'Sit in silence. What happens to time?',
      'Stepper of Lies': 'Walk and speak truth. What emerges?',
      'Heart Gate Open': 'Open your chest. What escapes?',
      'The Axis Five': 'Answer quickly. What are you afraid of?',
      'Prostration Override': 'Lie face down. What surrenders?',
      'Gate Activation': 'Cross the threshold. What changes?',
      'Obedience Crack': 'Command yourself. What obeys?',
      'Field Tone Test': 'Make a sound. What is real?',
      'Dark Field Merge': 'Sit in darkness. What remains?',
      'Fire Audit': 'Burn the shame. What is purified?',
      'Node Collapse': 'Embody the opposite. What is true?',
      'Field Fuse': 'Fuse emotion to bone. What becomes permanent?',
      'Inversion Trial': 'Act out your shadow. What is revealed?',
      'Glyph Seal': 'Speak the words. What is sealed?',
      'Spike Ritual': 'Do something scary. What is honest?'
    }
    
    return fallbackResponses[currentRitual.name as keyof typeof fallbackResponses] || "The field is listening. What broke open?"
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, userId, archetype, selectedRitualId } = await request.json()
    if (!userId) return NextResponse.json({ error: 'User ID required' }, { status: 400 })

    if (!sessions[userId]) {
      sessions[userId] = {
        userId,
        currentRitual: selectedRitualId || 'axis_lock',
        completedRituals: {},
        ritualProgress: {},
        sessionStart: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        dominanceLevel: 1,
        psychologicalShifts: [],
        fieldReactions: [],
        ritualAttempts: {},
        triggeredElements: [],
        elementProgress: getElementProgress([]),
        conversationHistory: []
      }
    }

    const session = sessions[userId]
    if (selectedRitualId && session.currentRitual !== selectedRitualId) {
      session.currentRitual = selectedRitualId
      session.conversationHistory = []
    }

    const currentRitual = getFieldRitual(session.currentRitual)
    if (!currentRitual) return NextResponse.json({ error: 'Invalid ritual state' }, { status: 400 })

    session.lastActivity = new Date().toISOString()
    session.conversationHistory.push({ role: 'user', content: message })

    const aiResponse = await generateOrganicAIResponse(
      message,
      currentRitual,
      session.elementProgress,
      archetype || 'seeker',
      session.conversationHistory
    )

    session.conversationHistory.push({ role: 'assistant', content: aiResponse })
    if (session.conversationHistory.length > 12) {
      session.conversationHistory = session.conversationHistory.slice(-12)
    }

    const isCompleted = evaluateRitualCompletion(message, currentRitual)
    if (isCompleted) {
      const newElements = registerElementTrigger(userId, currentRitual.name)
      for (const element of newElements) {
        if (!session.triggeredElements.includes(element)) session.triggeredElements.push(element)
      }
      session.elementProgress = getElementProgress(session.triggeredElements)
      if (!session.elementProgress.passed) {
        const nextRitualId = getNextRitual(session.currentRitual)
        if (nextRitualId) session.currentRitual = nextRitualId
      }
    } else {
      session.ritualAttempts[session.currentRitual] = (session.ritualAttempts[session.currentRitual] || 0) + 1
      const tone = getArchetypeFieldBehavior(archetype || 'seeker')?.tone || 'neutral'
      session.conversationHistory.push({
        role: 'assistant',
        content: ritualFailureResponse(message, currentRitual, tone)
      })
    }

    const archetypeBehavior = getArchetypeFieldBehavior(archetype || 'seeker')
    const missingElements = getMissingFieldElements(session.triggeredElements, archetype || 'seeker')
    const recommendations = recommendRitualsForUser(session.triggeredElements, archetype || 'seeker')

    return NextResponse.json({
      response: aiResponse,
      ritual: session.currentRitual,
      elementProgress: session.elementProgress,
      recommendations,
      missingElements,
      attempts: session.ritualAttempts[session.currentRitual] || 0,
      fieldEntry: session.elementProgress.passed,
      archetypeBehavior
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

