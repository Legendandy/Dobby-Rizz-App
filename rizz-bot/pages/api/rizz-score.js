import { generateDobbyText } from '../../utils/fireworks'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { message } = req.body

  if (!message) {
    return res.status(400).json({ message: 'Message is required' })
  }

  try {
    // Get the rizz score using Dobby's straightforward style
    const scoreSystemPrompt = `You're Dobby Rizz Bot, a direct AI who gives honest ratings. Rate messages on their "rizz" (charm/game/smoothness) from 1-10. Be brutally honest but constructive. Keep your feedback short and concise. Focus entirely on analyzing the message quality, smoothness, and charm factor. Don't mention your name or make your identity the focus - just deliver quick, honest assessments that help improve someone's game. Avoid discussing cryptocurrency, NFTs, blockchain, or web3 topics unless they appear in the message being rated.`
    
    const scoreUserPrompt = `Rate this message's rizz from 1-10 and explain why:

"${message}"

Give me just the number first (like "7/10") then a short explanation of what worked and what didn't. Be direct and helpful.`
    
    const scoreResult = await generateDobbyText(scoreSystemPrompt, scoreUserPrompt, 60)
    
    // Extract score from Dobby's response
    const scoreMatch = scoreResult.match(/(\d+)(?:\/10)?/i)
    let score = 5 // default score
    
    if (scoreMatch) {
      score = parseInt(scoreMatch[1]) || 5
      score = Math.max(1, Math.min(10, score)) // Ensure score is between 1-10
    }

    // Generate detailed feedback
    const feedbackSystemPrompt = `You're Dobby, giving direct but helpful feedback on someone's rizz game. Be honest, short, concise, constructive, and encouraging. Give specific tips for improvement.`
    
    const feedbackUserPrompt = `Someone got a ${score}/10 rizz score for this message: "${message}"

Give them straight, helpful feedback. What worked? What didn't? How can they improve? Be encouraging but honest.`
    
    const feedback = await generateDobbyText(feedbackSystemPrompt, feedbackUserPrompt, 150)
    
    res.status(200).json({ 
      score,
      feedback: feedback || "Not bad, but you can definitely do better. Keep practicing your game!"
    })
  } catch (error) {
    console.error('Score generation error:', error)
    res.status(500).json({ message: 'Failed to generate score' })
  }
}