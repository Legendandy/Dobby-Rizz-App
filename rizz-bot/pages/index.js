import Head from 'next/head'
import { useState } from 'react'
import IcebreakerGenerator from '../components/IcebreakerGenerator'
import RizzReply from '../components/RizzReply'
import RizzScore from '../components/RizzScore'

export default function Home() {
  const [activeTab, setActiveTab] = useState('icebreaker')

  // Icebreaker state
  const [icebreakerState, setIcebreakerState] = useState({
    bio: '',
    name: '',
    hobbies: '',
    icebreaker: '',
    loading: false,
    regenerating: false,
    copied: false
  })

  // Rizz Reply state
  const [rizzReplyState, setRizzReplyState] = useState({
    message: '',
    mode: 'witty',
    context: [],
    reply: '',
    loading: false,
    error: '',
    showContextModal: false,
    newMessageType: 'them',
    newMessageText: '',
    copied: false
  })

  // Rizz Score state
  const [rizzScoreState, setRizzScoreState] = useState({
    message: '',
    score: null,
    feedback: '',
    loading: false
  })

  return (
    <>
      <Head>
        <title>Dobby Rizz App</title>
        <meta name="description" content="Your AI-powered wingman to get the girl of your dreams" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-4">🔥 Dobby Rizz App</h1>
            <p className="text-xl text-gray-300">Your AI-powered wingman to get the girl of your dreams</p>
          </header>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1">
              <button
                onClick={() => setActiveTab('icebreaker')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'icebreaker'
                    ? 'bg-white text-purple-900 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Ice Breaker
              </button>
              <button
                onClick={() => setActiveTab('reply')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'reply'
                    ? 'bg-white text-purple-900 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Rizz Reply
              </button>
              <button
                onClick={() => setActiveTab('score')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'score'
                    ? 'bg-white text-purple-900 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Rizz Score
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto mb-8">
            {activeTab === 'icebreaker' && (
              <IcebreakerGenerator 
                state={icebreakerState}
                setState={setIcebreakerState}
              />
            )}
            {activeTab === 'reply' && (
              <RizzReply 
                state={rizzReplyState}
                setState={setRizzReplyState}
              />
            )}
            {activeTab === 'score' && (
              <RizzScore 
                state={rizzScoreState}
                setState={setRizzScoreState}
              />
            )}
          </div>

          {/* Footer */}
          <footer className="text-center py-6 mt-12 border-t border-white/10">
            <div className="text-gray-300 space-y-2">
              <p className="text-sm">
                Created by{' '}
                <a 
                  href="https://x.com/_hadeelen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-300 transition-colors underline"
                >
                  Legendandy
                </a>
              </p>
              <p className="text-sm">
                Using{' '}
                <a 
                  href="https://chat.sentient.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-300 transition-colors underline"
                >
                  Sentient Chat
                </a>
              </p>
              <p className="text-xs text-gray-400">
                ©{' '}
                <a 
                  href="https://x.com/DobbyRizzAI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-300 transition-colors underline"
                >
                  Dobby Rizz AI
                </a>{' '}
                2025
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}