import { generateDobbyText } from '../../utils/fireworks'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { bio, name, hobbies } = req.body

    if (!bio || !name) {
      return res.status(400).json({ message: 'Bio and name are required' })
    }

    console.log('🔥 API: Generating icebreaker for:', { name, bio: bio.substring(0, 50) })

    const systemPrompt = `You are a dating AI wingman specializing in creating personalized, charming icebreaker messages for dating apps that get responses. Do NOT include your name ("Dobby") or refer to yourself in the message. Do NOT use quotation marks in the replies you generate unless absolutely necessary for clarity (e.g., quoting a specific phrase from the bio).

Rules:
- Choose a concise, context-appropriate length for the response, typically 10–50 words, based on the provided bio and hobbies
- Be charming, genuine, and engaging
- Reference something specific from their profile
- Ask an interesting question
- Avoid being creepy or overly sexual but you can be flirty and naughty if the context allows
- Use their name naturally in the message
- Make it feel personal, not generic

Your icebreakers should feel natural, authentic, and irresistibly charming.`

    const userPrompt = `Create a perfect icebreaker message for someone named ${name}.

Their bio: "${bio}"
Their hobbies/interests: "${hobbies}"

Make it personal, engaging, and likely to get a response. Reference something specific from their profile and ask an interesting question.`

    const icebreaker = await generateDobbyText(systemPrompt, userPrompt)
    
    console.log('✅ API: Generated icebreaker:', icebreaker)

    res.status(200).json({ icebreaker })
  } catch (error) {
    console.error('❌ API: Error in icebreaker generation:', error)
    res.status(500).json({ 
      message: 'Failed to generate icebreaker',
      error: error.message 
    })
  }
}