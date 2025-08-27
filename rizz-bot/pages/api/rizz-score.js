import { generateDobbyText } from '../../utils/fireworks'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ message: 'Message is required' })
    }

    console.log('🔥 API: Analyzing rizz score for message:', message.substring(0, 50))

    const systemPrompt = `You are Dobby, an expert dating coach AI who analyzes dating app messages. Rate messages on a scale of 1-100 and provide constructive feedback.

Scoring Criteria:
- Engagement level (does it invite a response?)
- Authenticity (does it feel genuine?)
- Interest factor (is it intriguing?)
- Confidence level (shows self-assurance without arrogance?)
- Personalization (references their profile/interests?)
- Conversation flow (moves the chat forward?)

Response format:
Score: [number 1-100]
Feedback: [2-3 sentences explaining the score]
Suggestions: [3 specific improvement tips, separated by semicolons]

Be honest but constructive. Help them improve their game.`

    const userPrompt = `Rate this dating app message and provide feedback:

"${message}"

Give me a score out of 100, honest feedback, and specific suggestions for improvement.`

    const analysis = await generateDobbyText(systemPrompt, userPrompt, 200)
    
    console.log('✅ API: Generated analysis:', analysis)

    // Parse the response
    const lines = analysis.split('\n').filter(line => line.trim())
    let score = 50
    let feedback = "Unable to analyze this message properly."
    let suggestions = []

    lines.forEach(line => {
      if (line.toLowerCase().includes('score:')) {
        const scoreMatch = line.match(/(\d+)/)
        if (scoreMatch) {
          score = Math.min(100, Math.max(1, parseInt(scoreMatch[1])))
        }
      } else if (line.toLowerCase().includes('feedback:')) {
        feedback = line.replace(/feedback:\s*/i, '').trim()
      } else if (line.toLowerCase().includes('suggestions:')) {
        const suggestionText = line.replace(/suggestions:\s*/i, '').trim()
        suggestions = suggestionText.split(';').map(s => s.trim()).filter(s => s)
      }
    })

    res.status(200).json({ score, feedback, suggestions })
  } catch (error) {
    console.error('❌ API: Error in rizz score analysis:', error)
    res.status(500).json({ 
      message: 'Failed to analyze message',
      error: error.message 
    })
  }
}