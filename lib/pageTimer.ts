// Page Timer Utility - Hidden timer for tracking user time on pages
export interface PageTimerData {
  pageId: string
  startTime: number
  totalTime: number
  lastActivity: number
  isActive: boolean
}

class PageTimer {
  private timers: Map<string, PageTimerData> = new Map()
  private currentPage: string | null = null
  private intervalId: NodeJS.Timeout | null = null

  constructor() {
    this.startTracking()
  }

  // Start timer for a specific page
  startPageTimer(pageId: string) {
    const now = Date.now()
    
    // Stop previous page timer if exists
    if (this.currentPage && this.currentPage !== pageId) {
      this.stopPageTimer(this.currentPage)
    }

    // Create or update timer for current page
    const existingTimer = this.timers.get(pageId)
    if (existingTimer) {
      existingTimer.isActive = true
      existingTimer.startTime = now
      existingTimer.lastActivity = now
    } else {
      this.timers.set(pageId, {
        pageId,
        startTime: now,
        totalTime: 0,
        lastActivity: now,
        isActive: true
      })
    }

    this.currentPage = pageId
    console.log(`🕐 Started timer for page: ${pageId}`)
  }

  // Stop timer for a specific page
  stopPageTimer(pageId: string) {
    const timer = this.timers.get(pageId)
    if (timer && timer.isActive) {
      const now = Date.now()
      timer.totalTime += now - timer.startTime
      timer.isActive = false
      timer.lastActivity = now
      console.log(`⏹️ Stopped timer for page: ${pageId}, total time: ${Math.floor(timer.totalTime / 1000)}s`)
    }
  }

  // Update activity for current page
  updateActivity() {
    if (this.currentPage) {
      const timer = this.timers.get(this.currentPage)
      if (timer) {
        timer.lastActivity = Date.now()
      }
    }
  }

  // Get all timer data
  getAllTimers(): PageTimerData[] {
    return Array.from(this.timers.values())
  }

  // Get timer for specific page
  getPageTimer(pageId: string): PageTimerData | null {
    return this.timers.get(pageId) || null
  }

  // Get current page timer
  getCurrentPageTimer(): PageTimerData | null {
    return this.currentPage ? this.timers.get(this.currentPage) || null : null
  }

  // Start background tracking
  private startTracking() {
    this.intervalId = setInterval(() => {
      this.updateActivity()
    }, 1000) // Update every second
  }

  // Stop tracking
  destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}

// Create global instance
const pageTimer = new PageTimer()

// Export functions for use in components
export const startPageTimer = (pageId: string) => pageTimer.startPageTimer(pageId)
export const stopPageTimer = (pageId: string) => pageTimer.stopPageTimer(pageId)
export const updateActivity = () => pageTimer.updateActivity()
export const getAllTimers = () => pageTimer.getAllTimers()
export const getPageTimer = (pageId: string) => pageTimer.getPageTimer(pageId)
export const getCurrentPageTimer = () => pageTimer.getCurrentPageTimer()

// Auto-cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    pageTimer.destroy()
  })
}

export default pageTimer 