import { Copy } from 'lucide-react'

export default function RizzReply({ state, setState }) {
  const {
    message,
    mode,
    context,
    reply,
    loading,
    error,
    showContextModal,
    newMessageType,
    newMessageText,
    copied
  } = state

  const updateState = (updates) => {
    setState(prevState => ({ ...prevState, ...updates }))
  }

  const handleGenerateReply = async () => {
    if (!message.trim()) return

    updateState({ loading: true, error: '' })
    try {
      console.log('Sending request with:', { message, mode, context })
      
      const response = await fetch('/api/rizz-reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          mode,
          context
        })
      })

      console.log('Response status:', response.status)
      
      const data = await response.json()
      console.log('Response data:', data)
      
      if (response.ok && data.reply) {
        updateState({ reply: data.reply })
      } else {
        updateState({ error: data.message || 'Failed to generate reply' })
      }
    } catch (error) {
      console.error('Error generating reply:', error)
      updateState({ error: 'Network error. Please try again.' })
    }
    updateState({ loading: false })
  }

  const addContextMessage = () => {
    if (!newMessageText.trim()) return

    updateState({
      context: [...context, {
        sender: newMessageType,
        text: newMessageText
      }],
      newMessageText: '',
      showContextModal: false
    })
  }

  const removeContextMessage = (index) => {
    updateState({ context: context.filter((_, i) => i !== index) })
  }

  const openContextModal = (type) => {
    updateState({ 
      newMessageType: type,
      showContextModal: true 
    })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reply)
    updateState({ copied: true })
    setTimeout(() => updateState({ copied: false }), 2000)
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        ✨Rizz Generator
      </h2>

      {/* Mode Selection */}
      <div className="mb-6">
        <label className="block text-white text-sm font-medium mb-2">
          Reply Style
        </label>
        <select
          value={mode}
          onChange={(e) => updateState({ mode: e.target.value })}
          className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
          style={{ color: 'white' }}
        >
          <option value="witty" style={{ color: 'black' }}>😏 Witty & Sarcastic</option>
          <option value="flirty" style={{ color: 'black' }}>😈 Flirty & Playful</option>
          <option value="charming" style={{ color: 'black' }}>😊 Charming & Sophisticated</option>
        </select>
      </div>

      {/* Context Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <label className="text-white text-sm font-medium">
            Conversation Context ({context.length} messages)
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => openContextModal('them')}
              className="flex items-center gap-1 px-3 py-1 bg-blue-500/70 text-white rounded-md text-xs hover:bg-blue-500/90 transition-colors"
            >
              💬 Add Their Message
            </button>
            <button
              onClick={() => openContextModal('you')}
              className="flex items-center gap-1 px-3 py-1 bg-green-500/70 text-white rounded-md text-xs hover:bg-green-500/90 transition-colors"
            >
              👤 Add Your Message
            </button>
          </div>
        </div>

        {/* Context Messages Display */}
        {context.length > 0 && (
          <div className="bg-white/5 rounded-lg p-4 max-h-48 overflow-y-auto space-y-3">
            {context.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`relative max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    msg.sender === 'them' 
                      ? 'bg-gray-600/60 text-white rounded-tl-none' 
                      : 'bg-blue-600/70 text-white rounded-tr-none'
                  }`}
                >
                  <div className="text-xs opacity-70 mb-1">
                    {msg.sender === 'them' ? 'Them' : 'You'}
                  </div>
                  <div className="text-sm">{msg.text}</div>
                  <button
                    onClick={() => removeContextMessage(index)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-xs"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Current Message Input */}
      <div className="mb-6">
        <label className="block text-white text-sm font-medium mb-2">
          Their Latest Message
        </label>
        <textarea
          value={message}
          onChange={(e) => updateState({ message: e.target.value })}
          placeholder="Enter the message you want to reply to..."
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
          rows={3}
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerateReply}
        disabled={loading || !message.trim()}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
      >
        {loading ? 'Generating...' : '⚡Generate Rizz'}
      </button>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg">
          <p className="text-red-200 text-sm">Error: {error}</p>
        </div>
      )}

      {/* Reply Output */}
      {reply && (
        <div className="mt-6">
          <div className="flex items-start justify-between mb-2">
            <label className="text-white text-sm font-medium">
              Generated Rizz
            </label>
            <button
              onClick={copyToClipboard}
              className="text-white hover:text-gray-300 transition-colors p-1 flex items-center gap-1"
              title="Copy to clipboard"
            >
              <Copy size={20} />
              {copied && <span className="text-sm text-green-300">Copied!</span>}
            </button>
          </div>
          <div className="p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-400/30">
            <p className="text-white leading-relaxed mb-4">{reply}</p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  // Add both the original message and the reply to context
                  const newMessages = [
                    { sender: 'them', text: message },
                    { sender: 'you', text: reply }
                  ]
                  updateState({ context: [...context, ...newMessages] })
                }}
                className="flex-1 py-2 px-4 bg-blue-500/70 text-white rounded-lg hover:bg-blue-500/90 transition-colors text-sm font-medium"
              >
                Add to Conversation Context
              </button>
              <button
                onClick={handleGenerateReply}
                disabled={loading}
                className="flex-1 py-2 px-4 bg-purple-500/70 text-white rounded-lg hover:bg-purple-500/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                {loading ? 'Regenerating...' : 'Regenerate Rizz'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Context Modal */}
      {showContextModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 w-full max-w-md border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">
                Add {newMessageType === 'them' ? 'Their' : 'Your'} Message
              </h3>
              <button
                onClick={() => updateState({ showContextModal: false })}
                className="text-white hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-medium mb-2">
                Message Type
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => updateState({ newMessageType: 'them' })}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    newMessageType === 'them'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  Their Message
                </button>
                <button
                  onClick={() => updateState({ newMessageType: 'you' })}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    newMessageType === 'you'
                      ? 'bg-green-500 text-white'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  Your Message
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2">
                Message Content
              </label>
              <textarea
                value={newMessageText}
                onChange={(e) => updateState({ newMessageText: e.target.value })}
                placeholder={`Enter ${newMessageType === 'them' ? 'their' : 'your'} message...`}
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => updateState({ showContextModal: false })}
                className="flex-1 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addContextMessage}
                disabled={!newMessageText.trim()}
                className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Add Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}