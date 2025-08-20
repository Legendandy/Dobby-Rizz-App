import { Copy } from 'lucide-react'

export default function IcebreakerGenerator({ state, setState }) {
  const {
    bio,
    name,
    hobbies,
    icebreaker,
    loading,
    regenerating,
    copied
  } = state

  const updateState = (updates) => {
    setState(prevState => ({ ...prevState, ...updates }))
  }

  // Mock function to simulate API call
  const generateIcebreakerText = (bio, name, hobbies) => {
    const templates = [
      `Hey ${name}! I noticed you're into ${hobbies.split(',')[0]?.trim() || 'interesting stuff'}. ${bio.includes('travel') ? "Where's the most spontaneous place you've traveled to?" : "What's your favorite way to spend a weekend?"}`,
      `Hi ${name}! Your bio caught my attention - especially the part about ${hobbies.split(',')[1]?.trim() || hobbies.split(',')[0]?.trim() || 'your interests'}. ${bio.includes('food') || bio.includes('cook') ? "What's your go-to comfort food?" : "What's something you're passionate about that most people don't know?"}`,
      `${name}! I see we might have ${hobbies.split(',')[0]?.trim() || 'some things'} in common. ${bio.length > 50 ? "Your bio made me smile - " : ""}what's the best advice you've ever received?`,
      `Hey ${name}! ${bio.includes('dog') || bio.includes('cat') || bio.includes('pet') ? "Pet tax required - " : ""}I'm curious about ${hobbies.split(',')[Math.floor(Math.random() * hobbies.split(',').length)]?.trim() || 'your interests'}. What got you into that?`,
      `Hi ${name}! Your profile suggests you're someone who ${bio.includes('adventure') ? 'loves adventure' : bio.includes('music') ? 'appreciates good music' : 'has great taste'}. What's something you've been excited about lately?`
    ]
    return templates[Math.floor(Math.random() * templates.length)]
  }

  const generateIcebreaker = async () => {
    if (!bio || !name || !hobbies) {
      alert('Please fill in all fields')
      return
    }

    updateState({ loading: true })
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      const generated = generateIcebreakerText(bio, name, hobbies)
      updateState({ icebreaker: generated })
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to generate icebreaker. Please try again.')
    }
    updateState({ loading: false })
  }

  const regenerateIcebreaker = async () => {
    updateState({ regenerating: true })
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      const generated = generateIcebreakerText(bio, name, hobbies)
      updateState({ icebreaker: generated })
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to regenerate icebreaker. Please try again.')
    }
    updateState({ regenerating: false })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(icebreaker)
    updateState({ copied: true })
    setTimeout(() => updateState({ copied: false }), 2000)
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">🧊 Ice Breaker Text Generator</h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-white mb-2 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => updateState({ name: e.target.value })}
            placeholder="Enter their name..."
            className="w-full p-4 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-white/50 focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-white mb-2 font-medium">Tinder Bio</label>
          <textarea
            value={bio}
            onChange={(e) => updateState({ bio: e.target.value })}
            placeholder="Paste their bio here... or mention something you notice in their profile pictures (like hiking, pets, traveling, or food) that could provide more context."
            rows="4"
            className="w-full p-4 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-white/50 focus:outline-none resize-none"
          />
        </div>
        
        <div>
          <label className="block text-white mb-2 font-medium">Hobbies</label>
          <input
            type="text"
            value={hobbies}
            onChange={(e) => updateState({ hobbies: e.target.value })}
            placeholder="Enter their hobbies (comma separated)..."
            className="w-full p-4 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-white/50 focus:outline-none"
          />
        </div>
      </div>

      <button
        onClick={generateIcebreaker}
        disabled={loading}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? '🤖 Generating...' : '🧊 Generate Rizz'}
      </button>

      {icebreaker && (
        <div className="mt-6 p-6 bg-white/20 rounded-lg">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-white">Your Ice Breaker:</h3>
            <button
              onClick={copyToClipboard}
              className="text-white hover:text-gray-300 transition-colors p-1 flex items-center gap-1"
              title="Copy to clipboard"
            >
              <Copy size={20} />
              {copied && <span className="text-sm text-green-300">Copied!</span>}
            </button>
          </div>
          <p className="text-gray-100 text-lg leading-relaxed mb-4">{icebreaker}</p>
          <button
            onClick={regenerateIcebreaker}
            disabled={regenerating}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {regenerating ? 'Regenerating...' : 'Regenerate Rizz'}
          </button>
        </div>
      )}
    </div>
  )
}