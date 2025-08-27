import { useState } from 'react'
import { BarChart3, TrendingUp, AlertCircle, CheckCircle, Sparkles, ArrowLeft } from 'lucide-react'
import Navbar from './Navbar'

export default function RizzScore() {
  const [state, setState] = useState({
    message: '',
    score: null,
    feedback: '',
    suggestions: [],
    loading: false,
    error: ''
  })

  const { message, score, feedback, suggestions, loading, error } = state

  const updateState = (updates) => {
    setState(prevState => ({ ...prevState, ...updates }))
  }

  const analyzeMessage = async () => {
    if (!message.trim()) return

    updateState({ loading: true, error: '' })
    try {
      const response = await fetch('/api/rizz-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      })

      const data = await response.json()
      
      if (response.ok) {
        updateState({
          score: data.score,
          feedback: data.feedback,
          suggestions: data.suggestions || []
        })
      } else {
        updateState({ error: data.message || 'Failed to analyze message' })
      }
    } catch (error) {
      console.error('Error analyzing message:', error)
      updateState({ error: 'Network error. Please try again.' })
    }
    updateState({ loading: false })
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    if (score >= 40) return 'text-orange-400'
    return 'text-red-400'
  }

  const getScoreGradient = (score) => {
    if (score >= 80) return 'from-green-500 to-emerald-500'
    if (score >= 60) return 'from-yellow-500 to-orange-500'
    if (score >= 40) return 'from-orange-500 to-red-500'
    return 'from-red-500 to-pink-500'
  }

  return (
    <>
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
            <div className="max-w-4xl mx-auto">
              <div className="glass-card rounded-3xl p-8">
                <div className="text-center mb-8 fade-in">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-5xl font-bold text-white mb-2">Rizz Score <span className="gradient-text">Analyzer</span></h1>
                  <p className="text-slate-300 text-lg">Get AI feedback on your messages and learn how to improve</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Input Section */}
                  <div className="space-y-6 slide-in">
                    <div>
                      <label className="block text-white mb-2 font-medium text-lg">Your Message</label>
                      <textarea
                        value={message}
                        onChange={(e) => updateState({ message: e.target.value })}
                        placeholder="Paste your message here to get it analyzed..."
                        rows="6"
                        className="w-full p-4 rounded-2xl bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 focus:border-blue-500 focus:outline-none resize-none backdrop-blur-sm transition-all duration-300"
                      />
                    </div>

                    <button
                      onClick={analyzeMessage}
                      disabled={loading || !message.trim()}
                      className="w-full modern-button text-white font-bold py-4 px-6 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <Sparkles className="w-5 h-5 animate-spin" />
                          Analyzing Your Rizz...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          Analyze My Rizz
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Results Section */}
                  <div className="fade-in">
                    {error && (
                      <div className="glass-card border border-red-500/50 rounded-2xl p-4 mb-4 bg-red-500/20">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-red-200" />
                          <p className="text-red-200">{error}</p>
                        </div>
                      </div>
                    )}

                    {score !== null ? (
                      <div className="space-y-6">
                        {/* Score Display */}
                        <div className="glass-card rounded-3xl p-6 text-center hover-lift">
                          <div className="mb-4">
                            <div className={`text-6xl font-bold ${getScoreColor(score)} mb-2`}>
                              {score}
                            </div>
                            <div className="text-slate-300">Rizz Score</div>
                          </div>
                          
                          <div className="w-full bg-slate-700 rounded-full h-3 mb-4">
                            <div 
                              className={`bg-gradient-to-r ${getScoreGradient(score)} h-3 rounded-full transition-all duration-1000`}
                              style={{ width: `${score}%` }}
                            ></div>
                          </div>

                          <div className="text-white text-sm">
                            {score >= 80 && "🔥 Fire rizz! This message is likely to get a great response."}
                            {score >= 60 && score < 80 && "👍 Good rizz! This message should work well."}
                            {score >= 40 && score < 60 && "🤔 Average rizz. Could use some improvements."}
                            {score < 40 && "❌ Low rizz. This message might not get the response you want."}
                          </div>
                        </div>

                        {/* Feedback */}
                        {feedback && (
                          <div className="glass-card rounded-2xl p-6 hover-lift">
                            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                              <CheckCircle className="w-6 h-6 text-blue-400" />
                              AI <span className="gradient-text-accent">Feedback</span>
                            </h3>
                            <p className="text-slate-200 leading-relaxed text-lg">{feedback}</p>
                          </div>
                        )}

                        {/* Suggestions */}
                        {suggestions.length > 0 && (
                          <div className="glass-card rounded-2xl p-6 hover-lift">
                            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                              <Sparkles className="w-6 h-6 text-purple-400" />
                              Improvement <span className="gradient-text">Suggestions</span>
                            </h3>
                            <ul className="space-y-3">
                              {suggestions.map((suggestion, index) => (
                                <li key={index} className="text-slate-200 leading-relaxed flex items-start gap-3">
                                  <span className="text-purple-400 font-bold text-lg">•</span>
                                  <span>{suggestion}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="glass-card rounded-3xl p-8 border-2 border-dashed border-slate-600/50 text-center">
                        <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-300 font-medium">Your rizz score and feedback will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}