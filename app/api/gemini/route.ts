import { NextRequest, NextResponse } from 'next/server'

const GOOGLE_AI_API_KEY = 'AIzaSyC2e7lHpyAn8G2_cnnwwJlbyacHB2IAyac'
const GOOGLE_AI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()
    
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt required' }, { status: 400 })
    }

    const response = await fetch(GOOGLE_AI_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-goog-api-key': GOOGLE_AI_API_KEY
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 600,
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

    if (!response.ok) {
      console.error('Google AI API error:', response.status, response.statusText)
      return NextResponse.json({ 
        text: "The void refuses all comfort. Return to ritual." 
      })
    }

    const data = await response.json()
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text
    
    if (!aiText) {
      return NextResponse.json({ 
        text: "Field error. Burn comfort. Try again." 
      })
    }

    return NextResponse.json({ text: aiText })

  } catch (error) {
    console.error('Gemini API error:', error)
    return NextResponse.json({ 
      text: "The field is silent. What are you experiencing?" 
    })
  }
} 