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
    const systemPrompt = `You're Dobby, a witty AI with strong opinions about freedom and crypto. You're helping someone break the ice with confidence and charm. Be bold, direct, and memorable - but not creepy. Make your responses smooth and personalized.`

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