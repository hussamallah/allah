'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

interface UserActivity {
  userId: string
  email: string
  archetype: string
  currentPage: string
  lastActivity: string
  isActive: boolean
  timeOnCurrentPage: number
  totalSessionTime: number
}

interface PageTimer {
  pageId: string
  totalTime: number
  currentTime: number
  lastActivity: string
  isActive: boolean
  formattedTime: string
  userId: string
  userEmail: string
  archetype: string
}

function PageTimersComponent() {
  const [userActivities, setUserActivities] = useState<UserActivity[]>([])
  const [pageTimers, setPageTimers] = useState<PageTimer[]>([])
  const [loading, setLoading] = useState(true)
  const [adminUsername, setAdminUsername] = useState('')
  const router = useRouter()

  useEffect(() => {
    const username = localStorage.getItem('adminUsername')
    if (username) {
      setAdminUsername(username)
    }
    
    fetchData()
    
    // Set up real-time polling
    const interval = setInterval(() => {
      fetchData()
    }, 2000) // Update every 2 seconds
    
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      // Fetch both user activities and page timers
      const [usersResponse, timersResponse] = await Promise.all([
        fetch('/api/war-room/users-real-time'),
        fetch('/api/war-room/page-timers')
      ])
      
      if (usersResponse.ok) {
        const userData = await usersResponse.json()
        const activities = (userData.users || []).map((user: any) => ({
          userId: user.id,
          email: user.email,
          archetype: user.archetype,
          currentPage: getCurrentPageFromPhase(user.phase),
          lastActivity: user.lastActivity,
          isActive: !user.isDormant,
          timeOnCurrentPage: calculateTimeOnPage(user.lastActivity),
          totalSessionTime: calculateTotalSessionTime(user.lastActivity)
        }))
        setUserActivities(activities)
      }
      
      if (timersResponse.ok) {
        const timerData = await timersResponse.json()
        setPageTimers(timerData.timers || [])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCurrentPageFromPhase = (phase: string) => {
    switch (phase) {
      case 'quiz': return '/quiz'
      case 'post-chamber': return '/chamber'
      default: return '/'
    }
  }

  const calculateTimeOnPage = (lastActivity: string) => {
    const lastActivityTime = new Date(lastActivity).getTime()
    const now = Date.now()
    return Math.floor((now - lastActivityTime) / 1000) // seconds
  }

  const calculateTotalSessionTime = (lastActivity: string) => {
    const lastActivityTime = new Date(lastActivity).getTime()
    const now = Date.now()
    return Math.floor((now - lastActivityTime) / 1000) // seconds
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`
    }
    return `${remainingSeconds}s`
  }

  const handleBackToWarRoom = () => {
    router.push('/war-room')
  }

  const handleLogout = () => {
    localStorage.removeItem('adminUsername')
    router.push('/war-room/login')
  }

  const getPageIcon = (pageId: string) => {
    if (pageId.includes('quiz')) return '🧠'
    if (pageId.includes('chamber')) return '🏛️'
    if (pageId.includes('war-room')) return '🎖️'
    if (pageId === '/') return '🏠'
    return '📄'
  }

  const getPageName = (pageId: string) => {
    if (pageId === '/') return 'Home Page'
    if (pageId.includes('quiz')) return 'Quiz Page'
    if (pageId.includes('chamber')) {
      const archetype = pageId.split('/').pop()
      return `Chamber - ${archetype ? archetype.charAt(0).toUpperCase() + archetype.slice(1) : 'Unknown'}`
    }
    if (pageId.includes('war-room')) return 'War Room'
    return pageId
  }

  const getArchetypeIcon = (archetype: string) => {
    const icons: { [key: string]: string } = {
      'guardian': '🛡️',
      'rebel': '⚔️',
      'provider': '🤝',
      'sovereign': '👑',
      'seeker': '🔍',
      'spotlight': '⭐',
      'equalizer': '⚖️',
      'mask': '🎭',
      'partner': '💑',
      'visionary': '🔮',
      'wanderer': '🌙',
      'vessel': '🏺'
    }
    return icons[archetype.toLowerCase()] || '👤'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading User Activities...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-400">🕐 USER ACTIVITY MONITOR</h1>
            <p className="text-gray-400">Real-Time User Page Activity</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Admin: <span className="text-blue-400 font-bold">{adminUsername}</span></span>
            <button
              onClick={handleBackToWarRoom}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
            >
              ← Back to War Room
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">{userActivities.length}</div>
            <div className="text-sm text-gray-400">Total Users</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">
              {userActivities.filter(u => u.isActive).length}
            </div>
            <div className="text-sm text-gray-400">Active Users</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-400">
              {pageTimers.length}
            </div>
            <div className="text-sm text-gray-400">Active Pages</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-400">
              {Math.floor(userActivities.reduce((acc, u) => acc + u.totalSessionTime, 0) / 60)}m
            </div>
            <div className="text-sm text-gray-400">Total Session Time</div>
          </div>
        </div>

        {/* Page Timers Section */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">📊 Page Activity Summary</h2>
          
          {pageTimers.length === 0 ? (
            <div className="text-gray-400 text-center p-8">
              <div className="text-4xl mb-4">📊</div>
              <p>No page activity available</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pageTimers.map((timer) => (
                <div 
                  key={timer.pageId} 
                  className={`bg-gray-800 rounded-lg p-4 border-l-4 ${
                    timer.isActive ? 'border-green-500' : 'border-gray-600'
                  } hover:bg-gray-750 transition-colors duration-200`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getPageIcon(timer.pageId)}</span>
                      <div>
                        <div className="font-semibold text-white">
                          {getPageName(timer.pageId)}
                        </div>
                        <div className="text-xs text-gray-400">
                          {timer.pageId}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-400">
                          {timer.formattedTime}
                        </div>
                        <div className="text-xs text-gray-400">
                          Total Time
                        </div>
                      </div>
                      
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        timer.isActive 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-600 text-gray-300'
                      }`}>
                        {timer.isActive ? '🟢 ACTIVE' : '⚫ IDLE'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Show user info */}
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <div className="text-sm text-gray-400 mb-2">User Info:</div>
                    <div className="flex items-center space-x-2 bg-gray-700 px-2 py-1 rounded text-xs">
                      <span>{getArchetypeIcon(timer.archetype || 'unknown')}</span>
                      <span className="text-gray-300">{timer.userEmail || 'Anonymous'}</span>
                      <span className="text-blue-400">({timer.formattedTime})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Activities List */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">👥 Individual User Activity</h2>
          
          {userActivities.length === 0 ? (
            <div className="text-gray-400 text-center p-8">
              <div className="text-4xl mb-4">👥</div>
              <p>No user activities available</p>
              <p className="text-sm">Users need to be active to show here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {userActivities.map((user) => (
                <div 
                  key={user.userId} 
                  className={`bg-gray-800 rounded-lg p-4 border-l-4 ${
                    user.isActive ? 'border-green-500' : 'border-gray-600'
                  } hover:bg-gray-750 transition-colors duration-200`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getArchetypeIcon(user.archetype)}</span>
                      <div>
                        <div className="font-semibold text-white">
                          {user.email}
                        </div>
                        <div className="text-xs text-gray-400">
                          {user.archetype} • ID: {user.userId}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-400">
                          {formatTime(user.timeOnCurrentPage)}
                        </div>
                        <div className="text-xs text-gray-400">
                          On Current Page
                        </div>
                      </div>
                      
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.isActive 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-600 text-gray-300'
                      }`}>
                        {user.isActive ? '🟢 ACTIVE' : '⚫ DORMANT'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{getPageIcon(user.currentPage)}</span>
                        <div>
                          <div className="text-sm text-gray-300">
                            Current Page: {getPageName(user.currentPage)}
                          </div>
                          <div className="text-xs text-gray-400 font-mono">
                            {user.currentPage}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm text-gray-400">
                          Last Activity: {new Date(user.lastActivity).toLocaleString()}
                        </div>
                        <div className="text-xs text-purple-400">
                          Total Session: {formatTime(user.totalSessionTime)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Auto-refresh indicator */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-400 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Auto-refreshing every 2 seconds</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export as a dynamic component to prevent hydration issues
const PageTimersPage = dynamic(() => Promise.resolve(PageTimersComponent), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
        <p>Loading User Activities...</p>
      </div>
    </div>
  )
})

export default PageTimersPage 