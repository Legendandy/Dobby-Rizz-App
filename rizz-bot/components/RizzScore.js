export default function RizzScore({ state, setState }) {
  const { message, score, feedback, loading } = state

  const updateState = (updates) => {
    setState(prevState => ({ ...prevState, ...updates }))
  }

  const getScore = async () => {
    if (!message) {
      alert('Please enter a message to score')
      return
    }

    updateState({ loading: true })
    try {
      const response = await fetch('/api/rizz-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      })
      const data = await response.json()
      updateState({ score: data.score, feedback: data.feedback })
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to get rizz score. Please try again.')
    }
    updateState({ loading: false })
  }

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-400'
    if (score >= 6) return 'text-yellow-400'
    if (score >= 4) return 'text-orange-400'
    return 'text-red-400'
  }

  const getScoreEmoji = (score) => {
    if (score >= 9) return '🔥'
    if (score >= 8) return '😎'
    if (score >= 6) return '😊'
    if (score >= 4) return '😐'
    return '💀'
  }

  const getScoreText = (score) => {
    if (score >= 8) return 'Legendary Rizz!'
    if (score >= 6) return 'Good Rizz!'
    if (score >= 4) return 'Average Rizz'
    return 'Needs Work'
  }

  const shareToX = () => {
    const emoji = getScoreEmoji(score)
    const scoreText = getScoreText(score)
    const websiteUrl = window.location.origin
    
    const tweetText = `I just got a ${score}/10 rizz score ${emoji}
    
"${scoreText}"

Think you can do better? Test your rizz game at ${websiteUrl} 🔥

@DobbyRizzAI @SentientAGI #AI #Dating #Confidence`

    const encodedTweet = encodeURIComponent(tweetText)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTweet}`
    
    window.open(twitterUrl, '_blank', 'width=600,height=400')
  }

  const shareToWhatsApp = () => {
    const emoji = getScoreEmoji(score)
    const scoreText = getScoreText(score)
    const websiteUrl = window.location.origin
    
    const whatsappText = `I just got a ${score}/10 rizz score ${emoji}

"${scoreText}"

Think you can do better? Test your rizz game at ${websiteUrl} 🔥`

    const encodedMessage = encodeURIComponent(whatsappText)
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">📊 Rizz Score</h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-white mb-2 font-medium">Your Message</label>
          <textarea
            value={message}
            onChange={(e) => updateState({ message: e.target.value })}
            placeholder="Enter your message to get a rizz score..."
            rows="4"
            className="w-full p-4 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-white/50 focus:outline-none resize-none"
          />
        </div>
      </div>

      <button
        onClick={getScore}
        disabled={loading}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? '🤖 Analyzing...' : '⚡ Get Rizz Score'}
      </button>

      {score !== null && (
        <div className="mt-6 p-6 bg-white/20 rounded-lg border border-white/30">
          {/* Score Display */}
          <div className="text-center mb-6">
            <div className={`text-6xl font-bold ${getScoreColor(score)} mb-2`}>
              {score}/10 {getScoreEmoji(score)}
            </div>
            <div className="text-2xl text-white font-semibold">
              {getScoreText(score)}
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="mb-6">
              <h4 className="text-white font-bold mb-2">Rizz Feedback:</h4>
              <p className="text-gray-200 leading-relaxed">{feedback}</p>
            </div>
          )}

          {/* Challenge Others Text */}
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/30">
            <div className="text-center">
              <h4 className="text-white font-bold mb-2">🚀 Challenge Your Friends!</h4>
              <p className="text-gray-200 text-sm mb-3">
                Think your friends have better rizz? Share this link and let them prove it:
              </p>
              <div className="bg-white/10 rounded-lg p-3 mb-3">
                <code className="text-green-300 text-sm break-all">
                  {typeof window !== 'undefined' ? window.location.origin : 'your-website.com'}
                </code>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={shareToX}
                  className="bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Share to X
                </button>
                <button
                  onClick={shareToWhatsApp}
                  className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Share to WhatsApp
                </button>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}