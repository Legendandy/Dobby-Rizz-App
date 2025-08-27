import { useState, useEffect } from 'react'
import { Play, Star, ArrowRight, Zap, Heart, MessageCircle } from 'lucide-react'

export default function Homepage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    // Check if user has completed onboarding
    const profile = JSON.parse(localStorage.getItem('userProfile') || 'null')
    if (profile) {
      // Could redirect to dashboard, but let them see the homepage
    }
  }, [])

  const handleGetStarted = () => {
    const profile = JSON.parse(localStorage.getItem('userProfile') || 'null')
    if (profile) {
      // Navigate to dashboard if user already has a profile
      window.location.href = '/dashboard'
    } else {
      // Navigate to onboarding for new users
      window.location.href = '/onboarding'
    }
  }

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "AI-Powered Responses",
      description: "Get witty, charming, and flirty replies that actually work"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Generate perfect responses in seconds, never miss your moment"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Higher Match Rate",
      description: "Increase your dating success with AI-crafted conversation starters"
    }
  ]

  const testimonials = [
    {
      name: "Alex M.",
      rating: 5,
      text: "This app doubled my match rate! The AI responses are so natural and engaging."
    },
    {
      name: "Sarah K.",
      rating: 5,
      text: "Finally, an AI that understands dating. The conversation starters are incredible."
    },
    {
      name: "Mike R.",
      rating: 5,
      text: "Went from 0 dates to 3 dates this week. This AI is a game changer!"
    }
  ]

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
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
      `}</style>

      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl floating-1"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-amber-500/10 rounded-full mix-blend-multiply filter blur-3xl floating-2"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl floating-3"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">
            🔥Dobby Rizz AI
          </div>
          <button
            onClick={handleGetStarted}
            className="glass-card text-white px-6 py-2.5 rounded-full font-medium hover:bg-slate-700/50 transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 hero-bg">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 fade-in">
            Your AI Dating
            <br />
            <span className="gradient-text">Wingman</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto fade-in leading-relaxed">
            Get perfect conversation starters and replies for dating apps. 
            Our AI helps you craft messages that actually get responses.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 slide-in">
            <button
              onClick={handleGetStarted}
              className="modern-button text-white px-10 py-4 rounded-2xl font-semibold text-lg flex items-center gap-3"
            >
              <Play className="w-6 h-6" />
              Try It Free
            </button>
            
            <div className="flex items-center gap-3 text-white bg-slate-800/50 px-6 py-3 rounded-2xl backdrop-blur-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-slate-300 font-medium">4.9/5 from 2,000+ users</span>
            </div>
          </div>

          {/* Demo Video/Image Placeholder */}
          <div className="max-w-5xl mx-auto mb-20 fade-in">
            <div className="glass-card rounded-3xl p-8 shine">
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-amber-600/20"></div>
                <div className="text-center text-white relative z-10">
                  <div className="w-20 h-20 mx-auto mb-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Play className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-xl font-semibold">App Demo Video Placeholder</p>
                  <p className="text-slate-400 mt-3">1920x1080 video demo would go here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-20">
            Why Choose <span className="gradient-text-accent">Rizz AI</span>?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="text-center glass-card p-10 rounded-3xl hover-lift group">
                <div className="text-blue-400 mb-6 flex justify-center group-hover:text-amber-400 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-20">
            How It <span className="gradient-text">Works</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "1", title: "Paste Their Profile", desc: "Copy their bio and interests from any dating app" },
              { step: "2", title: "AI Generates Magic", desc: "Our AI crafts personalized messages that spark interest" },
              { step: "3", title: "Get More Matches", desc: "Send compelling messages that actually get responses" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="number-badge w-20 h-20 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-8">
                  {item.step}
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">{item.title}</h3>
                <p className="text-slate-300 text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="relative z-10 py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-20">
            <span className="gradient-text-accent">Success</span> Stories
          </h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card rounded-3xl p-8 hover-lift">
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 italic text-lg leading-relaxed">&quot;{testimonial.text}&quot;</p>
                <p className="text-white font-bold text-lg">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Ready to Level Up Your <span className="gradient-text">Dating Game</span>?
          </h2>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            Join thousands of users who&apos;ve already improved their match rate with Rizz AI
          </p>
          
          <button
            onClick={handleGetStarted}
            className="accent-button modern-button text-white px-12 py-5 rounded-2xl font-bold text-xl flex items-center gap-3 mx-auto mb-6"
          >
            Start Getting Better Matches
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <p className="text-slate-400 text-lg">Free to try &bull; No credit card required</p>
        </div>
      </div>
    </div>
  )
}