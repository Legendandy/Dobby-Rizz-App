// Test script for Fireworks AI + Dobby model
// Run: node test-fireworks.js

const axios = require('axios')
require('dotenv').config({ path: '.env.local' })

const FIREWORKS_API_KEY = process.env.FIREWORKS_API_KEY
const MODEL_NAME = 'accounts/sentientfoundation-serverless/models/dobby-mini-unhinged-plus-llama-3-1-8b'
const FIREWORKS_API_URL = 'https://api.fireworks.ai/inference/v1/chat/completions'

async function testFireworks() {
  console.log('🧪 Testing Fireworks AI + Dobby Model...')
  console.log('API Key exists:', !!FIREWORKS_API_KEY)
  console.log('API Key preview:', FIREWORKS_API_KEY ? FIREWORKS_API_KEY.substring(0, 15) + '...' : 'MISSING')
  
  if (!FIREWORKS_API_KEY) {
    console.error('❌ FIREWORKS_API_KEY not found!')
    console.log('Steps to fix:')
    console.log('1. Go to https://fireworks.ai/')
    console.log('2. Sign up and get an API key')
    console.log('3. Add to your .env.local file:')
    console.log('FIREWORKS_API_KEY=fw-your_key_here')
    return
  }

  try {
    const messages = [
      {
        role: "system",
        content: "You're Dobby, a witty AI with strong opinions about freedom and crypto. Be direct, confident, and memorable."
      },
      {
        role: "user",
        content: "Give me a witty comeback to someone who says 'Hey, what's up?'"
      }
    ]

    console.log('🚀 Testing request...')
    console.log('Model:', MODEL_NAME)
    
    const response = await axios.post(
      FIREWORKS_API_URL,
      {
        model: MODEL_NAME,
        messages: messages,
        max_tokens: 100,
        temperature: 0.8,
        top_p: 0.9
      },
      {
        headers: {
          'Authorization': `Bearer ${FIREWORKS_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000
      }
    )
    
    console.log('✅ Fireworks AI Test Success!')
    console.log('Model Response:', response.data.choices[0].message.content)
    console.log('Usage:', response.data.usage)
    console.log('🔥 Dobby is ready for your rizz bot!')
    
  } catch (error) {
    console.error('❌ Fireworks AI Test Failed!')
    console.error('Status:', error.response?.status)
    console.error('Error:', error.response?.data || error.message)
    
    if (error.response?.status === 401) {
      console.log('💡 Authentication error - check your API key!')
      console.log('Make sure your API key is correct and active')
    } else if (error.response?.status === 402) {
      console.log('💡 Payment required - add credits to your Fireworks account')
    } else if (error.response?.status === 429) {
      console.log('💡 Rate limit - wait a moment and try again')
    } else if (error.response?.status === 404) {
      console.log('💡 Model not found - the model name might have changed')
    }
  }
}

testFireworks()