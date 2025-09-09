// Local storage utilities
export const storage = {
  // Save generated content
  saveContent: (type, content) => {
    if (typeof window === 'undefined') return
    
    try {
      const key = `rizz_${type}`
      const existing = JSON.parse(localStorage.getItem(key) || '[]')
      const newItem = {
        id: Date.now(),
        content,
        timestamp: new Date().toISOString(),
        type
      }
      
      const updated = [newItem, ...existing.slice(0, 49)] // Keep last 50 items
      localStorage.setItem(key, JSON.stringify(updated))
      
      return newItem.id
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  },

  // Get saved content
  getContent: (type) => {
    if (typeof window === 'undefined') return []
    
    try {
      const key = `rizz_${type}`
      return JSON.parse(localStorage.getItem(key) || '[]')
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return []
    }
  },

  // Delete content
  deleteContent: (type, id) => {
    if (typeof window === 'undefined') return
    
    try {
      const key = `rizz_${type}`
      const existing = JSON.parse(localStorage.getItem(key) || '[]')
      const updated = existing.filter(item => item.id !== id)
      localStorage.setItem(key, JSON.stringify(updated))
    } catch (error) {
      console.error('Error deleting from localStorage:', error)
    }
  },

  
  saveProfile: (profile) => {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem('rizz_profile', JSON.stringify(profile))
    } catch (error) {
      console.error('Error saving profile:', error)
    }
  },

  
  getProfile: () => {
    if (typeof window === 'undefined') return null
    
    try {
      return JSON.parse(localStorage.getItem('rizz_profile') || 'null')
    } catch (error) {
      console.error('Error reading profile:', error)
      return null
    }
  }
}