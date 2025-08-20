import axios from 'axios'

const FIREWORKS_API_URL = 'https://api.fireworks.ai/inference/v1/chat/completions'
const FIREWORKS_API_KEY = process.env.FIREWORKS_API_KEY
const MODEL_NAME = 'accounts/sentientfoundation-serverless/models/dobby-mini-unhinged-plus-llama-3-1-8b'

export async function queryDobbyModel(messages, parameters = {}) {
  console.log('🔍 DEBUG: Fireworks API Key exists?', !!FIREWORKS_API_KEY)
  console.log('🔍 DEBUG: Model name:', MODEL_NAME)
  console.log('🔍 DEBUG: Messages:', messages)
  
  if (!FIREWORKS_API_KEY) {
    throw new Error('FIREWORKS_API_KEY environment variable is not set')
  }

  try {
    const requestData = {
      model: MODEL_NAME,
      messages: messages,
      max_tokens: parameters.max_tokens || 150,
      temperature: parameters.temperature || 0.8,
      top_p: parameters.top_p || 0.9,
      frequency_penalty: parameters.frequency_penalty || 0.1,
      presence_penalty: parameters.presence_penalty || 0.1,
      stream: false
    }

    console.log('🔍 DEBUG: Request data:', JSON.stringify(requestData, null, 2))

    const response = await axios.post(
      FIREWORKS_API_URL,
      requestData,
      {
        headers: {
          'Authorization': `Bearer ${FIREWORKS_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    )
    
    console.log('✅ DEBUG: Response status:', response.status)
    console.log('✅ DEBUG: Response data:', JSON.stringify(response.data, null, 2))
    
    return response.data
  } catch (error) {
    console.error('❌ DEBUG: Full error:', error)
    console.error('❌ DEBUG: Error response:', error.response?.data)
    console.error('❌ DEBUG: Error status:', error.response?.status)
    throw error
  }
}

export async function generateDobbyText(systemPrompt, userPrompt, maxTokens = 100) {
  try {
    console.log('🚀 DEBUG: Generating Dobby text')
    console.log('🎯 System:', systemPrompt.substring(0, 50) + '...')
    console.log('👤 User:', userPrompt.substring(0, 50) + '...')
    
    const messages = [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user", 
        content: userPrompt
      }
    ]
    
    const result = await queryDobbyModel(messages, {
      max_tokens: maxTokens,
      temperature: 0.8,
      top_p: 0.9
    })
    
    console.log('📝 DEBUG: Raw result:', result)
    
    if (result && result.choices && result.choices.length > 0) {
      const generatedText = result.choices[0].message.content.trim()
      console.log('✅ DEBUG: Generated text:', generatedText)
      
      return generatedText || "Let me think of something better to say..."
    }
    
    return "I'm having trouble coming up with a response right now."
    
  } catch (error) {
    console.error('❌ DEBUG: Text generation error:', error.message)
    
    if (error.response?.status === 401) {
      return "Authentication error. Please check your Fireworks API key."
    } else if (error.response?.status === 429) {
      return "Rate limit exceeded. Please wait a moment and try again."
    } else if (error.response?.status === 500) {
      return "Server error. The model might be temporarily unavailable."
    } else if (error.code === 'ECONNABORTED') {
      return "Request timeout. The model is taking too long to respond."
    }
    
    return `Error: ${error.message}`
  }
}