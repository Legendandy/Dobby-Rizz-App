import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { LogOut } from 'lucide-react'
import { storage } from '../utils/storage'

export default function Navbar() {
  const router = useRouter()
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const logoutButtonRef = useRef(null)
  const modalRef = useRef(null)
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 })

  const handleLogout = () => {
    setShowLogoutModal(true)
  }

  const confirmLogout = () => {
    localStorage.clear()
    router.push('/')
    setShowLogoutModal(false)
  }

  const cancelLogout = () => {
    setShowLogoutModal(false)
  }

  useEffect(() => {
    if (showLogoutModal && logoutButtonRef.current) {
      const rect = logoutButtonRef.current.getBoundingClientRect()
      const rightOffset = window.innerWidth - rect.right
      setModalPosition({
        top: rect.bottom + window.scrollY + 5, // Position just below the button with a 5px gap
        right: rightOffset // Align right edge with button's right edge
      })
    }
  }, [showLogoutModal])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (showLogoutModal && modalRef.current && !modalRef.current.contains(event.target)) {
        setShowLogoutModal(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [showLogoutModal])

  return (
    <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20 relative z-50">
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 1.5rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          animation: fadeIn 0.3s ease-out;
          z-index: 1000;
          width: 20rem;
          padding: 1.5rem;
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
        
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(20px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
      `}</style>
      
      <div className="w-full px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-2xl font-bold text-white hover:text-purple-300 transition-colors"
            >
              🔥 Dobby Rizz AI
            </button>
          </div>

          <div className="relative">
            <button
              ref={logoutButtonRef}
              onClick={handleLogout}
              className="flex items-center gap-2 text-white hover:text-red-300 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            {showLogoutModal && (
              <div
                className="modal-overlay"
                style={{
                  top: `${modalPosition.top}px`,
                  right: `${modalPosition.right}px`,
                }}
                ref={modalRef}
              >
                <h2 className="text-xl font-bold text-white mb-3">Confirm Logout</h2>
                <p className="text-slate-300 mb-4 text-sm">
                  Are you sure you want to log out? This will clear your profile data.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={cancelLogout}
                    className="modern-button text-white px-4 py-2 rounded-xl font-medium text-sm"
                  >
                    No, Cancel
                  </button>
                  <button
                    onClick={confirmLogout}
                    className="accent-button text-white px-4 py-2 rounded-xl font-medium text-sm"
                  >
                    Yes, Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}