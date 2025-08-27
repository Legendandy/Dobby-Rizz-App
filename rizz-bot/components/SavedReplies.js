import { useState, useEffect } from 'react'
import { Search, Copy, Trash2, MessageCircle, Clock, Filter, ArrowLeft } from 'lucide-react'
import Navbar from './Navbar'
import { storage } from '../utils/storage'

export default function SavedReplies() {
  const [state, setState] = useState({
    replies: [],
    filteredReplies: [],
    searchTerm: '',
    filter: 'all',
    copied: null,
    showDeleteModal: false,
    deleteCandidate: null
  })

  const { replies, filteredReplies, searchTerm, filter, copied, showDeleteModal, deleteCandidate } = state

  const updateState = (updates) => {
    setState(prevState => ({ ...prevState, ...updates }))
  }

  useEffect(() => {
    loadReplies()
  }, [])

  useEffect(() => {
    filterReplies()
  }, [replies, searchTerm, filter])

  const loadReplies = () => {
    const icebreakers = storage.getContent('icebreaker')
    const rizzReplies = storage.getContent('reply')
    const allReplies = [...icebreakers, ...rizzReplies]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    
    updateState({ replies: allReplies })
  }

  const filterReplies = () => {
    let filtered = replies

    if (filter !== 'all') {
      filtered = filtered.filter(reply => reply.type === filter)
    }

    if (searchTerm) {
      filtered = filtered.filter(reply =>
        reply.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    updateState({ filteredReplies: filtered })
  }

  const copyToClipboard = (content, id) => {
    navigator.clipboard.writeText(content)
    updateState({ copied: id })
    setTimeout(() => updateState({ copied: null }), 2000)
  }

  const deleteReply = (id, type) => {
    updateState({ showDeleteModal: true, deleteCandidate: { id, type } })
  }

  const confirmDelete = () => {
    if (deleteCandidate) {
      storage.deleteContent(deleteCandidate.type, deleteCandidate.id)
      loadReplies()
      updateState({ showDeleteModal: false, deleteCandidate: null })
    }
  }

  const cancelDelete = () => {
    updateState({ showDeleteModal: false, deleteCandidate: null })
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
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
          
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          
          .modal-content {
            background: rgba(30, 41, 59, 0.9);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 1.5rem;
            padding: 2rem;
            max-width: 32rem;
            width: 100%;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            animation: fadeIn 0.3s ease-out;
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
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-5xl font-bold text-white mb-2">Saved <span className="gradient-text">Replies</span></h1>
                  <p className="text-slate-300 text-lg">Manage your collection of AI-generated messages</p>
                </div>

                {/* Search and Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 slide-in">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => updateState({ searchTerm: e.target.value })}
                      placeholder="Search your replies..."
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 focus:border-blue-500 focus:outline-none backdrop-blur-sm transition-all duration-300"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Filter className="text-slate-400 w-5 h-5" />
                    <select
                      value={filter}
                      onChange={(e) => updateState({ filter: e.target.value })}
                      className="px-4 py-4 rounded-2xl bg-slate-800/50 text-white border border-slate-600/50 focus:border-blue-500 focus:outline-none backdrop-blur-sm transition-all duration-300"
                    >
                      <option value="all">All Types</option>
                      <option value="icebreaker">Ice Breakers</option>
                      <option value="reply">Rizz Replies</option>
                    </select>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 fade-in">
                  <div className="glass-card rounded-2xl p-6 text-center hover-lift">
                    <div className="text-3xl font-bold text-white">{replies.length}</div>
                    <div className="text-slate-300 font-medium">Total Saved</div>
                  </div>
                  <div className="glass-card rounded-2xl p-6 text-center hover-lift">
                    <div className="text-3xl font-bold text-white">
                      {replies.filter(r => r.type === 'icebreaker').length}
                    </div>
                    <div className="text-slate-300 font-medium">Ice Breakers</div>
                  </div>
                  <div className="glass-card rounded-2xl p-6 text-center hover-lift">
                    <div className="text-3xl font-bold text-white">
                      {replies.filter(r => r.type === 'reply').length}
                    </div>
                    <div className="text-slate-300 font-medium">Rizz Replies</div>
                  </div>
                </div>

                {/* Replies List */}
                {filteredReplies.length > 0 ? (
                  <div className="space-y-4">
                    {filteredReplies.map((reply) => (
                      <div
                        key={reply.id}
                        className="glass-card rounded-2xl p-6 hover-lift transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                              reply.type === 'icebreaker' 
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' 
                                : 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                            }`}>
                              {reply.type === 'icebreaker' ? 'Ice Breaker' : 'Rizz Reply'}
                            </span>
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                              <Clock className="w-4 h-4" />
                              {formatTimestamp(reply.timestamp)}
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => copyToClipboard(reply.content, reply.id)}
                              className="text-white hover:text-slate-300 transition-colors p-3 rounded-2xl glass-card hover-lift"
                              title="Copy to clipboard"
                            >
                              <Copy size={18} />
                            </button>
                            <button
                              onClick={() => deleteReply(reply.id, reply.type)}
                              className="text-white hover:text-red-400 transition-colors p-3 rounded-2xl glass-card hover-lift"
                              title="Delete reply"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="glass-card rounded-2xl p-4 mb-4">
                          <p className="text-white leading-relaxed text-lg">{reply.content}</p>
                        </div>
                        
                        {copied === reply.id && (
                          <div className="text-green-300 text-sm font-medium flex items-center gap-1">
                            ✓ Copied to clipboard!
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="glass-card rounded-3xl p-12 border-2 border-dashed border-slate-600/50 text-center">
                    <MessageCircle className="w-16 h-16 text-slate-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">No replies found</h3>
                    <p className="text-slate-300 text-lg mb-8">
                      {searchTerm || filter !== 'all' 
                        ? 'Try adjusting your search or filter'
                        : 'Start generating some ice breakers and replies to build your collection!'
                      }
                    </p>
                    {!searchTerm && filter === 'all' && (
                      <button
                        onClick={() => window.location.href = '/dashboard'}
                        className="modern-button text-white px-8 py-4 rounded-2xl font-bold"
                      >
                        Go to Dashboard
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2 className="text-2xl font-bold text-white mb-4">Confirm Deletion</h2>
                <p className="text-slate-300 mb-6">
                  Are you sure you want to delete this reply?
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={cancelDelete}
                    className="modern-button text-white px-6 py-3 rounded-2xl font-medium"
                  >
                    No, Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="accent-button text-white px-6 py-3 rounded-2xl font-medium"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}