'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'

interface PageActivity {
  userId: string
  currentPage: string
  timeSpent: number
  lastActivity: string
  email?: string
  archetype?: string
}

export default function HiddenPageTimer() {
  const pathname = usePathname()
  const [currentPage, setCurrentPage] = useState(pathname)
  const [startTime, setStartTime] = useState(Date.now())
  const [userId, setUserId] = useState<string>('')
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastUpdateRef = useRef<number>(Date.now())
  const pageStartTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    console.log("HiddenPageTimer MOUNTED", { pathname });
  }, []);

  useEffect(() => {
    // Check if this is a War Room page - don't track these
    const isWarRoomPage = pathname.startsWith('/war-room')
    
    if (isWarRoomPage) {
      console.log('🚫 Skipping timer tracking for War Room page:', pathname)
      return
    }
    
    // Track ALL other pages - no restrictions
    const isEngagementPage = true
    
    if (isEngagementPage) {
      // Check if we already have a user ID in localStorage
      let existingUserId = localStorage.getItem('user_tracking_id')
      
      if (!existingUserId) {
        // Generate a new user ID only once per session
        existingUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem('user_tracking_id', existingUserId)
        console.log('🆔 Generated new tracking ID for engagement:', existingUserId)
      } else {
        console.log('🆔 Using existing tracking ID:', existingUserId)
      }
      
      setUserId(existingUserId)

      // Send initial page entry to war room (0 seconds)
      sendPageActivity(existingUserId, pathname, 0)
    }
  }, [pathname])

  useEffect(() => {
    // Check if this is a War Room page - don't track these
    const isWarRoomPage = pathname.startsWith('/war-room')
    
    if (isWarRoomPage) {
      console.log('🚫 Skipping timer tracking for War Room page:', pathname)
      return
    }
    
    // Track ALL other pages - no restrictions
    const isEngagementPage = true
    
    if (!isEngagementPage) return

    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Page changed - calculate time spent on previous page and send update
    if (currentPage !== pathname && currentPage && userId) {
      const timeSpentOnPreviousPage = Math.floor((Date.now() - pageStartTimeRef.current) / 1000)
      console.log(`⏱️ Time spent on ${currentPage}: ${timeSpentOnPreviousPage}s`)
      sendPageActivity(userId, currentPage, timeSpentOnPreviousPage)
    }

    // Update current page and reset timer for new page
    setCurrentPage(pathname)
    pageStartTimeRef.current = Date.now()
    lastUpdateRef.current = Date.now()

    // Send new page entry (0 seconds for new page)
    if (userId) {
      sendPageActivity(userId, pathname, 0)
      
      // Start continuous tracking for current page
      intervalRef.current = setInterval(() => {
        const timeSpent = Math.floor((Date.now() - lastUpdateRef.current) / 1000)
        if (timeSpent >= 30) { // Update every 30 seconds
          console.log(`⏱️ Periodic update for ${pathname}: ${timeSpent}s`)
          sendPageActivity(userId, pathname, timeSpent)
          lastUpdateRef.current = Date.now()
        }
      }, 30000) // Check every 30 seconds
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [pathname, userId])

  // Handle page unload events (user closes tab, navigates away, etc.)
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Don't send data if we're on a War Room page
      const isWarRoomPage = pathname.startsWith('/war-room')
      if (isWarRoomPage) return
      
      if (userId && currentPage) {
        const timeSpent = Math.floor((Date.now() - pageStartTimeRef.current) / 1000)
        console.log(`⏱️ Final time for ${currentPage} (beforeunload): ${timeSpent}s`)
        
        // Use sendBeacon for more reliable delivery during page unload
        sendPageActivityBeacon(userId, currentPage, timeSpent)
      }
    }

    const handlePageHide = () => {
      // Don't send data if we're on a War Room page
      const isWarRoomPage = pathname.startsWith('/war-room')
      if (isWarRoomPage) return
      
      if (userId && currentPage) {
        const timeSpent = Math.floor((Date.now() - pageStartTimeRef.current) / 1000)
        console.log(`⏱️ Final time for ${currentPage} (pagehide): ${timeSpent}s`)
        
        // Use sendBeacon for more reliable delivery during page unload
        sendPageActivityBeacon(userId, currentPage, timeSpent)
      }
    }

    const handleVisibilityChange = () => {
      // Don't send data if we're on a War Room page
      const isWarRoomPage = pathname.startsWith('/war-room')
      if (isWarRoomPage) return
      
      if (document.visibilityState === 'hidden' && userId && currentPage) {
        const timeSpent = Math.floor((Date.now() - pageStartTimeRef.current) / 1000)
        console.log(`⏱️ Final time for ${currentPage} (visibilitychange): ${timeSpent}s`)
        
        // Use sendBeacon for more reliable delivery during page unload
        sendPageActivityBeacon(userId, currentPage, timeSpent)
      }
    }

    // Add all event listeners
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('pagehide', handlePageHide)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('pagehide', handlePageHide)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [userId, currentPage, pathname])

  // Use sendBeacon for reliable data sending during page unload
  const sendPageActivityBeacon = (id: string, page: string, timeSpent: number) => {
    try {
      const activity = {
        userId: id,
        currentPage: page,
        timeSpent: timeSpent,
        lastActivity: new Date().toISOString()
      }

      // Use sendBeacon for more reliable delivery during page unload
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(activity)], { type: 'application/json' })
        const success = navigator.sendBeacon('/api/war-room/page-activity', blob)
        console.log(` Beacon sent for ${page}: ${success ? '✅ Success' : '❌ Failed'}`)
      } else {
        // Fallback to fetch if sendBeacon is not available
        sendPageActivity(id, page, timeSpent)
      }
    } catch (error) {
      console.error('❌ Error sending beacon:', error)
    }
  }

  const sendPageActivity = async (id: string, page: string, timeSpent: number) => {
    try {
      console.log("🧪 TESTING: Timer sending page activity", { id, page, timeSpent });
      
      const activity: PageActivity = {
        userId: id,
        currentPage: page,
        timeSpent: timeSpent,
        lastActivity: new Date().toISOString()
      }

      // Send to war room API
      const response = await fetch('/api/war-room/page-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activity)
      })

      if (response.ok) {
        console.log('✅ TESTING: Successfully sent page activity:', { id, page, timeSpent })
      } else {
        console.error('❌ TESTING: Failed to send page activity:', response.status)
      }
      
      // Trigger immediate War Room update by broadcasting a custom event
      window.dispatchEvent(new CustomEvent('pageActivityUpdate', {
        detail: { userId: id, page, timeSpent }
      }))
    } catch (error) {
      console.error('❌ TESTING: Error sending page activity:', error)
    }
  }

  // This component doesn't render anything visible
  return null
} 