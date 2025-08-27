import { useState } from 'react'
import Head from 'next/head'
import { Copy, Save, Plus, X, Sparkles, ArrowLeft } from 'lucide-react'
import Navbar from './Navbar'
import { storage } from '../utils/storage'

export default function RizzReply() {
  const [state, setState] = useState({
    message: '',
    mode: 'witty',
    context: [],
    reply: '',
    loading: false,
    error: '',
    showContextModal: false,
    newMessageType: 'them',
    newMessageText: '',
    copied: false,
    saved: false
  })

  const {
    message, mode, context, reply, loading, error, showContextModal,
    newMessageType, newMessageText, copied, saved
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
        updateState({ reply: data.reply, saved: false })
      } else {
        updateState({ error: data.message || 'Failed to generate reply' })
      }
    } catch (error) {
      console.error('Error generating reply:', error)
      updateState({ error: 'Network error. Please try again.' })
    }
    updateState({ loading: false })
  }

  const addToConversationContext = () => {
    if (message.trim() && reply.trim()) {
      const newContext = [
        ...context,
        { sender: 'them', text: message },
        { sender: 'me', text: reply }
      ]
      updateState({ 
        context: newContext,
        message: '',
        reply: ''
      })
    }
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

  const saveReply = () => {
    if (reply) {
      storage.saveContent('reply', reply)
      updateState({ saved: true })
      setTimeout(() => updateState({ saved: false }), 2000)
    }
  }

  return (
    <>
      <Head>
        <title>Rizz Reply Generator - Rizz AI</title>
        <meta name="description" content="Generate perfect AI-powered responses to any message" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        <style jsx>{`
          .gradient-text {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8, #0ea5e9, #06b6d4);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradient-shift 4s ease-in-out infinite;
          }
          
          .gradient-text-accent {
            background: linear-gradient(135deg, #f59e0b, #d97706, #ea580c, #dc2626);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradient-shift 3s ease-in-out infinite;
          }
          
          .glass-card {
            background: rgba(30, 41, 59, 0.7);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(148, 163, 184, 0.2);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          }
          
          .glass-nav {
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(148, 163, 184, 0.1);
          }
          
          .hover-lift {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .hover-lift:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
          }
          
          .fade-in {
            animation: fadeIn 1.2s ease-out;
          }
          
          .slide-in {
            animation: slideIn 1s ease-out;
          }
          
          .modern-button {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }
          
          .modern-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
          }
          
          .modern-button:hover::before {
            left: 100%;
          }
          
          .modern-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 30px rgba(59, 130, 246, 0.6);
          }
          
          .accent-button {
            background: linear-gradient(135deg, #f59e0b, #ea580c);
            box-shadow: 0 4px 20px rgba(245, 158, 11, 0.4);
          }
          
          .accent-button:hover {
            box-shadow: 0 8px 30px rgba(245, 158, 11, 0.6);
          }
          
          .floating-1 {
            animation: float1 8s ease-in-out infinite;
          }
          
          .floating-2 {
            animation: float2 10s ease-in-out infinite;
          }
          
          .floating-3 {
            animation: float3 12s ease-in-out infinite;
          }
          
          .number-badge {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
          }
          
          .testimonial-card {
            background: rgba(30, 41, 59, 0.8);
            backdrop-filter: blur(25px);
            border: 1px solid rgba(148, 163, 184, 0.2);
            box-shadow: 0 12px 50px rgba(0, 0, 0, 0.4);
          }
          
          .hero-bg {
            background: 
              radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(14, 165, 233, 0.2) 0%, transparent 50%);
          }

          .message-bubble {
            max-width: 80%;
            word-wrap: break-word;
          }

          .message-them {
            background: #374151;
            color: #f9fafb;
            margin-right: auto;
            border-radius: 18px 18px 18px 4px;
          }

          .message-me {
            background: #3b82f6;
            color: white;
            margin-left: auto;
            border-radius: 18px 18px 4px 18px;
          }
          
          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          @keyframes fadeIn {
            from { 
              opacity: 0; 
              transform: translateY(40px);
            }
            to { 
              opacity: 1; 
              transform: translateY(0);
            }
          }
          
          @keyframes slideIn {
            from { 
              opacity: 0; 
              transform: translateX(-40px);
            }
            to { 
              opacity: 1; 
              transform: translateX(0);
            }
          }
          
          @keyframes float1 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(10deg); }
          }
          
          @keyframes float2 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-40px) rotate(-10deg); }
          }
          
          @keyframes float3 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-25px) rotate(5deg); }
          }
          
          .grid-pattern {
            background-image: 
              linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px);
            background-size: 50px 50px;
          }
        `}</style>

        {/* Background Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-20"></div>

        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl floating-1"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-amber-500/10 rounded-full mix-blend-multiply filter blur-3xl floating-2"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl floating-3"></div>
        </div>

        <div className="relative z-10">
          <Navbar />
          
          {/* Back to Dashboard Button */}
          <div className="container mx-auto px-4 pt-4">
            <button
              onClick={() => window.history.back()}
              className="glass-card text-white px-6 py-3 rounded-2xl font-medium hover-lift flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
          </div>
          
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="glass-card rounded-3xl p-8">
                <div className="text-center mb-8 fade-in">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-5xl font-bold text-white mb-2">Rizz <span className="gradient-text">Reply</span> Generator</h1>
                  <p className="text-slate-300 text-lg">Generate perfect responses with AI-powered charm</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Input Section */}
                  <div className="space-y-6 slide-in">
                    {/* Mode Selection */}
                    <div>
                      <label className="block text-white mb-2 font-medium text-lg">Reply Style</label>
                      <div className="flex gap-2 flex-wrap">
                        {['witty', 'flirty', 'sweet', 'funny', 'confident'].map((styleMode) => (
                          <button
                            key={styleMode}
                            onClick={() => updateState({ mode: styleMode })}
                            className={`px-4 py-2 rounded-2xl font-medium capitalize transition-all ${
                              mode === styleMode
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                : 'glass-card text-slate-300 hover:text-white'
                            }`}
                          >
                            {styleMode}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Context Section - Moved Above */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-white font-medium text-lg">Conversation Context (Optional)</label>
                        <button
                          onClick={() => openContextModal('them')}
                          className="text-blue-300 hover:text-white transition-colors text-sm flex items-center gap-1 glass-card px-3 py-1 rounded-xl"
                        >
                          <Plus size={16} />
                          Add Message
                        </button>
                      </div>
                      
                      {context.length > 0 && (
                        <div className="glass-card rounded-2xl p-4 max-h-60 overflow-y-auto">
                          <div className="space-y-3">
                            {context.map((msg, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <div className={`message-bubble p-3 text-sm relative group ${
                                  msg.sender === 'them' ? 'message-them' : 'message-me'
                                }`}>
                                  {msg.text}
                                  <button
                                    onClick={() => removeContextMessage(index)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X size={12} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Message Input */}
                    <div>
                      <label className="block text-white mb-2 font-medium text-lg">Their Message</label>
                      <textarea
                        value={message}
                        onChange={(e) => updateState({ message: e.target.value })}
                        placeholder="Paste the message you received..."
                        rows="4"
                        className="w-full p-4 rounded-2xl bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 focus:border-blue-500 focus:outline-none resize-none backdrop-blur-sm transition-all duration-300"
                      />
                    </div>

                    <button
                      onClick={handleGenerateReply}
                      disabled={loading || !message.trim()}
                      className="w-full modern-button text-white font-bold py-4 px-6 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <Sparkles className="w-5 h-5 animate-spin" />
                          Generating Your Reply...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          Generate Rizz Reply
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Result Section */}
                  <div className="fade-in">
                    {error && (
                      <div className="glass-card border border-red-500/50 rounded-2xl p-4 mb-4 bg-red-500/20">
                        <p className="text-red-200">⚠️ {error}</p>
                      </div>
                    )}

                    {reply ? (
                      <div className="glass-card rounded-3xl p-6 hover-lift">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-bold text-white">Your <span className="gradient-text-accent">Rizz Reply</span></h3>
                          <div className="flex gap-2">
                            <button
                              onClick={copyToClipboard}
                              className="text-white hover:text-slate-300 transition-colors p-3 rounded-2xl glass-card hover-lift"
                              title="Copy to clipboard"
                            >
                              <Copy size={20} />
                            </button>
                            <button
                              onClick={saveReply}
                              className="text-white hover:text-slate-300 transition-colors p-3 rounded-2xl glass-card hover-lift"
                              title="Save reply"
                            >
                              <Save size={20} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="glass-card rounded-2xl p-4 mb-4">
                          <p className="text-white leading-relaxed text-lg">{reply}</p>
                        </div>
                        
                        {copied && (
                          <div className="text-green-300 text-sm mb-2 flex items-center gap-1 font-medium">
                            ✓ Copied to clipboard!
                          </div>
                        )}
                        
                        {saved && (
                          <div className="text-green-300 text-sm mb-2 flex items-center gap-1 font-medium">
                            ✓ Saved to your collection!
                          </div>
                        )}

                        <button
                          onClick={addToConversationContext}
                          className="w-full accent-button modern-button text-white px-4 py-3 rounded-2xl font-medium"
                        >
                          📝 Add to Conversation Context
                        </button>
                      </div>
                    ) : (
                      <div className="glass-card rounded-3xl p-8 border-2 border-dashed border-slate-600/50 text-center">
                        <Sparkles className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-300 font-medium">Your generated reply will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Context Modal */}
        {showContextModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="glass-card rounded-3xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-white mb-4">Add Context Message</h3>
              
              <div className="mb-4">
                <label className="block text-white text-sm font-medium mb-2">Who sent this?</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateState({ newMessageType: 'them' })}
                    className={`px-4 py-2 rounded-2xl font-medium transition-all ${
                      newMessageType === 'them'
                        ? 'bg-slate-600 text-white'
                        : 'glass-card text-slate-300 hover:text-white'
                    }`}
                  >
                    Them
                  </button>
                  <button
                    onClick={() => updateState({ newMessageType: 'me' })}
                    className={`px-4 py-2 rounded-2xl font-medium transition-all ${
                      newMessageType === 'me'
                        ? 'bg-purple-600 text-white'
                        : 'glass-card text-slate-300 hover:text-white'
                    }`}
                  >
                    Me
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-white text-sm font-medium mb-2">Message</label>
                <textarea
                  value={newMessageText}
                  onChange={(e) => updateState({ newMessageText: e.target.value })}
                  placeholder="Enter the message..."
                  rows="3"
                  className="w-full p-3 rounded-2xl bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 focus:border-blue-500 focus:outline-none resize-none backdrop-blur-sm transition-all duration-300"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={addContextMessage}
                  className="flex-1 modern-button text-white px-4 py-2 rounded-2xl font-medium"
                >
                  Add Message
                </button>
                <button
                  onClick={() => updateState({ showContextModal: false, newMessageText: '' })}
                  className="px-4 py-2 glass-card text-white rounded-2xl font-medium hover-lift"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}