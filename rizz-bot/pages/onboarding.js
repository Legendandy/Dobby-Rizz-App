import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { ArrowRight, ArrowLeft, User, Calendar, Smartphone } from 'lucide-react'
import { storage } from '../utils/storage'

export default function Onboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    datingApps: [],
    goals: []
  })

  const datingApps = [
    'Tinder', 'Bumble', 'Hinge', 'OKCupid', 'Match', 'Coffee Meets Bagel', 'Other'
  ]

  const goals = [
    'Get more matches',
    'Start better conversations', 
    'Find a relationship',
    'Improve my dating confidence',
    'Have fun dating'
  ]

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      // Save profile and redirect to dashboard
      storage.saveProfile(profile)
      router.push('/dashboard')
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateProfile = (key, value) => {
    setProfile(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const toggleArrayItem = (key, item) => {
    setProfile(prev => ({
      ...prev,
      [key]: prev[key].includes(item) 
        ? prev[key].filter(i => i !== item)
        : [...prev[key], item]
    }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return profile.name.trim() && profile.age
      case 2:
        return profile.datingApps.length > 0
      case 3:
        return profile.goals.length > 0
      default:
        return false
    }
  }

  return (
    <>
      <Head>
        <title>Get Started - Rizz AI</title>
        <meta name="description" content="Complete your profile to get personalized AI dating assistance" />
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
          
          .shine {
            position: relative;
            overflow: hidden;
          }
          
          .shine::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            animation: shine 3s infinite;
          }
          
          @keyframes shine {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          
          .warning-card {
            background: rgba(30, 41, 59, 0.7);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(245, 158, 11, 0.3);
            border-radius: 1rem;
            padding: 1rem;
            color: #f59e0b;
            font-size: 0.9rem;
            font-weight: 500;
            text-align: center;
            margin-top: 1rem;
            transition: all 0.3s ease;
          }
          
          .warning-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(245, 158, 11, 0.2);
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
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto pt-8 px-4 mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="text-white text-lg font-semibold">
                Step {currentStep} of 3
              </div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-2xl mx-auto px-4 pb-8">
            <div className="glass-card rounded-3xl p-8 shine">
              
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="text-center fade-in">
                  <User className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                  <h2 className="text-4xl font-bold text-white mb-6">Tell us about yourself</h2>
                  
                  <div className="space-y-6 text-left">
                    <div>
                      <label className="block text-white mb-2 font-medium text-lg">What&apos;s your name?</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => updateProfile('name', e.target.value)}
                        placeholder="Enter your first name..."
                        className="w-full p-4 rounded-2xl bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 focus:border-blue-500 focus:outline-none backdrop-blur-sm transition-all duration-300"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white mb-2 font-medium text-lg">How old are you?</label>
                      <input
                        type="number"
                        value={profile.age}
                        onChange={(e) => updateProfile('age', e.target.value)}
                        placeholder="Age"
                        min="18"
                        max="100"
                        className="w-full p-4 rounded-2xl bg-slate-800/50 text-white placeholder-slate-400 border border-slate-600/50 focus:border-blue-500 focus:outline-none backdrop-blur-sm transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Dating Apps */}
              {currentStep === 2 && (
                <div className="text-center fade-in">
                  <Smartphone className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                  <h2 className="text-4xl font-bold text-white mb-6">Which dating apps do you use?</h2>
                  <p className="text-slate-300 mb-8 text-lg">Select all that apply</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {datingApps.map((app) => (
                      <button
                        key={app}
                        onClick={() => toggleArrayItem('datingApps', app)}
                        className={`p-4 rounded-2xl font-medium transition-all duration-300 ${
                          profile.datingApps.includes(app)
                            ? 'modern-button text-white'
                            : 'glass-card text-white hover-lift'
                        }`}
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Goals */}
              {currentStep === 3 && (
                <div className="text-center fade-in">
                  <Calendar className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                  <h2 className="text-4xl font-bold text-white mb-6">What are your dating goals?</h2>
                  <p className="text-slate-300 mb-8 text-lg">Select what you want to achieve</p>
                  
                  <div className="space-y-4">
                    {goals.map((goal) => (
                      <button
                        key={goal}
                        onClick={() => toggleArrayItem('goals', goal)}
                        className={`w-full p-4 rounded-2xl font-medium transition-all duration-300 text-left ${
                          profile.goals.includes(goal)
                            ? 'modern-button text-white'
                            : 'glass-card text-white hover-lift'
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                  <div className="warning-card">
                    Please review your selections. You won&apos;t be able to change these details after continuing.
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 px-8 py-4 glass-card text-white rounded-2xl hover-lift disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
                
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 px-8 py-4 modern-button text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  {currentStep === 3 ? 'Complete Setup' : 'Continue'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}