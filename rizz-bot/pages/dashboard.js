import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { MessageCircle, Zap, BarChart, Clock, User } from 'lucide-react'
import Navbar from '../components/Navbar'
import { storage } from '../utils/storage'

export default function Dashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState(null)
  const [recentReplies, setRecentReplies] = useState([])

  useEffect(() => {
    const userProfile = storage.getProfile()
    if (!userProfile) {
      router.push('/onboarding')
      return
    }
    
    setProfile(userProfile)
    
    // Load recent replies
    const icebreakers = storage.getContent('icebreaker').slice(0, 3)
    const replies = storage.getContent('reply').slice(0, 3)
    const combined = [...icebreakers, ...replies]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5)
    
    setRecentReplies(combined)
  }, [router])

  const tools = [
    {
      id: 'icebreaker',
      title: 'Ice Breaker Generator',
      description: 'Create personalized conversation starters',
      icon: <MessageCircle className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      route: '/icebreaker'
    },
    {
      id: 'reply',
      title: 'Rizz Reply Generator',
      description: 'Get witty responses to any message',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      route: '/rizz-reply'
    },
    {
      id: 'score',
      title: 'Rizz Score Analyzer',
      description: 'Rate your messages and get feedback',
      icon: <BarChart className="w-8 h-8" />,
      color: 'from-green-500 to-teal-500',
      route: '/rizz-score'
    }
  ]

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  if (!profile) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>
  }

  return (
    <>
      <Head>
        <title>Dashboard - Rizz AI</title>
        <meta name="description" content="Your AI dating assistant dashboard" />
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
          
          <div className="container mx-auto px-4 py-8">
            {/* Welcome Section */}
            <div className="mb-12 fade-in">
              <div className="glass-card rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white">Welcome back, <span className="gradient-text">{profile.name}</span>!</h1>
                    <p className="text-slate-300 text-lg">Ready to level up your dating game?</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="glass-card rounded-2xl p-6 text-center hover-lift">
                    <div className="text-3xl font-bold text-white mb-2">{profile.age}</div>
                    <div className="text-slate-300 font-medium">Age</div>
                  </div>
                  <div className="glass-card rounded-2xl p-6 text-center hover-lift">
                    <div className="text-3xl font-bold text-white mb-2">{recentReplies.length}</div>
                    <div className="text-slate-300 font-medium">Recent Replies</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 slide-in">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => router.push(tool.route)}
                  className="glass-card rounded-3xl p-6 hover-lift text-left"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-2xl flex items-center justify-center text-white mb-4`}>
                    {tool.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
                  <p className="text-slate-300 text-sm">{tool.description}</p>
                </button>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="glass-card rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">Recent <span className="gradient-text-accent">Rizz</span></h2>
                <button
                  onClick={() => router.push('/saved-replies')}
                  className="text-blue-300 hover:text-white transition-colors text-sm font-medium modern-button px-4 py-2 rounded-xl"
                >
                  View All
                </button>
              </div>
              
              {recentReplies.length > 0 ? (
                <div className="space-y-4">
                  {recentReplies.map((reply) => (
                    <div
                      key={reply.id}
                      className="glass-card rounded-2xl p-4 cursor-pointer hover-lift"
                      onClick={() => router.push('/saved-replies')}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-blue-300 font-medium capitalize px-3 py-1 bg-blue-500/20 rounded-full">
                          {reply.type}
                        </span>
                        <div className="flex items-center gap-1 text-slate-400 text-xs">
                          <Clock className="w-3 h-3" />
                          {formatTimestamp(reply.timestamp)}
                        </div>
                      </div>
                      <p className="text-white text-sm line-clamp-2">
                        {reply.content.length > 100 ? reply.content.substring(0, 100) + '...' : reply.content}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-300 font-semibold">No saved replies yet</p>
                  <p className="text-slate-400 text-sm">Generate your first icebreaker or reply to get started!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}