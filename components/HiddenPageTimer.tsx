'use client'

import { useEffect, useState } from 'react'
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

  useEffect(() => {
    console.log("HiddenPageTimer MOUNTED", { pathname });
  }, []);

  useEffect(() => {
    // Track ALL pages - no restrictions
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

      // Send initial page entry to war room
      sendPageActivity(existingUserId, pathname, 0)
    }
  }, [pathname])

  useEffect(() => {
    // Track ALL pages - no restrictions
    const isEngagementPage = true
    
    if (!isEngagementPage) return

    // Page changed - calculate time spent and send update
    if (currentPage !== pathname && currentPage && userId) {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      sendPageActivity(userId, currentPage, timeSpent)
    }

    // Update current page and reset timer
    setCurrentPage(pathname)
    setStartTime(Date.now())

    // Send new page entry
    if (userId) {
      sendPageActivity(userId, pathname, 0)
    }
  }, [pathname, userId])

  const sendPageActivity = async (id: string, page: string, timeSpent: number) => {
    try {
      console.log("Timer sending page activity", { id, page, timeSpent });
      
      const activity: PageActivity = {
        userId: id,
        currentPage: page,
        timeSpent: timeSpent,
        lastActivity: new Date().toISOString()
      }

      // Send to war room API
      await fetch('/api/war-room/page-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activity)
      })

      console.log('📊 Sent page activity:', { id, page, timeSpent })
      
      // Trigger immediate War Room update by broadcasting a custom event
      window.dispatchEvent(new CustomEvent('pageActivityUpdate', {
        detail: { userId: id, page, timeSpent }
      }))
    } catch (error) {
      console.error('❌ Error sending page activity:', error)
    }
  }

  // This component doesn't render anything visible
  return null
} 