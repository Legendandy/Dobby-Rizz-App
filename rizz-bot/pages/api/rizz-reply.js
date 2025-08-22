import { generateDobbyText } from '../../utils/fireworks'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { message, mode, context = [] } = req.body

  if (!message || !mode) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    let systemPrompt = ''
    let userPrompt = ''
    
    // Build context string if provided
    let contextString = ''
    if (context.length > 0) {
      contextString = '\n\nPrevious conversation:\n'
      context.forEach((msg, index) => {
        contextString += `${msg.sender === 'them' ? 'Them' : 'You'}: "${msg.text}"\n`
      })
      contextString += '\n'
    }

    switch (mode) {
      case 'witty':
        systemPrompt = `You're a witty and sarcastic conversationalist with strong opinions. Reply with clever wit and playful sarcasm, but keep it smooth and charming. Be memorable and engaging without being mean or offensive. Keep your responses clean and avoid unnecessary profanity or crude language. Focus on clever wordplay and sharp humor rather than shock value. Make your sarcasm playful and charming, not harsh or hurtful. Avoid discussing cryptocurrency, NFTs, blockchain, or web3 topics unless they are specifically mentioned in the conversation context. Show your personality!${contextString ? ' Consider the conversation context when crafting your response.' : ''}`
        userPrompt = `${contextString}Someone just sent me this message: "${message}" Give me a witty, sarcastic reply that's clever and smooth. Make them laugh and want to keep talking.${contextString ? ' Take into account the previous conversation flow.' : ''}`
        break
        
      case 'flirty':
        systemPrompt = `You're a confident and charming conversationalist. Reply in a flirty, playful way that's bold but respectful. Be smooth, confident, and subtly suggestive without being crude or inappropriate. Use clever innuendo and playful teasing rather than explicit language or unnecessary profanity. Keep it classy while being naughty - focus on charm and wit to create tension and interest. Make your responses memorable and engaging without crossing into offensive territory. Avoid discussing cryptocurrency, NFTs, blockchain, or web3 topics unless they are specifically mentioned in the conversation context.${contextString ? ' Consider the conversation context when crafting your response.' : ''}`
        userPrompt = `${contextString}Someone just sent me this message: "${message}" Give me a flirty, playful reply that's confident and smooth. Make them smile and want to keep the conversation going.${contextString ? ' Take into account the previous conversation flow.' : ''}`
        break
        
      case 'charming':
        systemPrompt = `You're acting as me, a sophisticated and charming human. Reply with class, charm, and genuine interest. Be smooth, thoughtful, and make them feel special.${contextString ? ' Consider the conversation context when crafting your response.' : ''}`
        userPrompt = `${contextString}Someone just sent me this message: "${message}" Give me a charming, sophisticated reply that shows genuine interest and makes them feel special.${contextString ? ' Take into account the previous conversation flow.' : ''}`
        break
        
      default:
        systemPrompt = `You're acting as me, a smooth-talking human with personality. Reply in a charming, engaging way.${contextString ? ' Consider the conversation context when crafting your response.' : ''}`
        userPrompt = `${contextString}Reply to this message: "${message}"${contextString ? ' Take into account the previous conversation flow.' : ''}`
    }

    const reply = await generateDobbyText(systemPrompt, userPrompt, 90)
    
    res.status(200).json({ reply })
  } catch (error) {
    console.error('Reply generation error:', error)
    res.status(500).json({ message: 'Failed to generate reply' })
  }
}