import { generateDobbyText } from '../../utils/fireworks'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { bio, name, hobbies } = req.body

  if (!bio || !name || !hobbies) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    // Dobby-style system prompt - direct and confident
    const systemPrompt = `You are a charming and witty conversation starter. Your goal is to help create engaging, personalized ice breaker messages that grab attention in a respectful way. Focus entirely on the context and details provided about the person or situation. Craft responses that are smooth, confident, and memorable without being pushy or inappropriate. Keep your tone calm, respectful, and naturally charming. Avoid any references to cryptocurrency, NFTs, blockchain, or web3 topics unless they are specifically mentioned in the context provided. Do not mention your name or identity. Simply focus on creating the perfect ice breaker based on the information given.`

    const userPrompt = `Help me write a killer ice breaker for someone named ${name}. Here's what I know:

Bio: "${bio}"
Hobbies: ${hobbies}

Write a smooth, personalized ice breaker that references something specific from their profile. Make it confident, witty, and engaging. Don't be generic - be memorable!`

    const icebreaker = await generateDobbyText(systemPrompt, userPrompt, 80)
    
    res.status(200).json({ icebreaker })
  } catch (error) {
    console.error('Ice breaker generation error:', error)
    res.status(500).json({ message: 'Failed to generate ice breaker' })
  }
}