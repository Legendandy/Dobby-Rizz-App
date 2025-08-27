import { generateDobbyText } from '../../utils/fireworks'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { message, mode = 'witty', context = [] } = req.body

    if (!message) {
      return res.status(400).json({ message: 'Message is required' })
    }

    console.log('🔥 API: Generating rizz reply for mode:', mode)

    const modePrompts = {
      witty: "Be clever, sharp, and playfully intelligent. Use wordplay and smart humor.",
      flirty: "Be charming, confident, naughty and romantically engaging without being inappropriate.",
      sweet: "Be genuine, sweet, warm, and endearing. Show sincere interest.",
      funny: "Be humorous, funny and entertaining. Make them laugh with good jokes or observations.",
      confident: "Be bold, assertive but not disrespectful, self-assured, and magnetic. Show strong personality."
    }

    const systemPrompt = `You are a dating AI wingman specializing in creating personalized, charming replies to dating app messages that are engaging, authentic, and get responses. Do NOT include your name ("Dobby") or refer to yourself in the message. Do NOT use quotation marks under any circumstances, including around phrases from the message or context.

Your specialty: Creating ${mode} responses that feel natural and increase attraction.

Style Guide for ${mode} responses: ${modePrompts[mode]}

Rules:
- Choose a concise, context-appropriate length for the response, typically 10–40 words, based on the provided message and context
- Never be inappropriate or crude
- Match their energy level
- Show genuine interest
- Create intrigue and continue the conversation
- Be authentic, not generic
- Avoid interview-style questions`

    let contextString = ''
    if (context && context.length > 0) {
      contextString = '\n\nConversation Context:\n'
      context.forEach(msg => {
        contextString += `${msg.sender}: ${msg.text}\n`
      })
    }

    const userPrompt = `Reply to this message in a ${mode} way:
${message}${contextString}

Create a response that continues the conversation naturally and increases their interest in you.`

    const reply = await generateDobbyText(systemPrompt, userPrompt)
    
    console.log('✅ API: Generated reply:', reply)

    res.status(200).json({ reply })
  } catch (error) {
    console.error('❌ API: Error in rizz reply generation:', error)
    res.status(500).json({ 
      message: 'Failed to generate reply',
      error: error.message 
    })
  }
}