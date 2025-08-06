'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'


interface UserProfile {
  id: string
  email: string
  archetype: string
  lastActivity: string
  phase: 'quiz' | 'answer-sequence' | 'chamber' | 'post-chamber'
  isDormant: boolean
  sessionData: {}
  // Database fields for modal
  test_results?: any
  created_at?: string
  user_id?: string
  timeSpent?: Record<string, number>
  totalTime?: number
}

interface SessionData {}



function WarRoomPageComponent() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [adminUsername, setAdminUsername] = useState('')
  const [filterArchetype, setFilterArchetype] = useState('all')
  const [filterPhase, setFilterPhase] = useState('all')

  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedProfiles, setSelectedProfiles] = useState<Set<string>>(new Set())
  const router = useRouter()

  useEffect(() => {
    const username = localStorage.getItem('adminUsername')
    if (username) {
      setAdminUsername(username)
    }
    
    fetchUsers()
    
    // Set up real-time polling
    const interval = setInterval(() => {
      fetchUsers()
    }, 2000) // Update every 2 seconds
    
    // Listen for page activity updates
    const handlePageActivityUpdate = () => {
      fetchUsers()
    }
    
    window.addEventListener('pageActivityUpdate', handlePageActivityUpdate)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('pageActivityUpdate', handlePageActivityUpdate)
    }
  }, [])

  const fetchUsers = async () => {
    try {
      console.log('🔄 Fetching users from API...')
      const response = await fetch('/api/war-room/users-real-time')
      console.log('📡 API response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('✅ API data received:', data)
        console.log('👥 API Users array length:', data.users?.length)
        
        // Deduplicate users by user_id, prioritizing email over anonymous
        const userMap = new Map<string, UserProfile>()
        
        data.users?.forEach((user: UserProfile) => {
          const userId = user.user_id || user.id
          const existing = userMap.get(userId)
          
          if (!existing) {
            userMap.set(userId, user)
          } else {
            // Prioritize user with email over anonymous
            if (user.email && user.email !== 'Anonymous User' && 
                (!existing.email || existing.email === 'Anonymous User')) {
              userMap.set(userId, user)
            }
            // If both have emails, keep the most recent
            else if (user.email && existing.email && 
                     new Date(user.lastActivity) > new Date(existing.lastActivity)) {
              userMap.set(userId, user)
            }
          }
        })
        
        const uniqueUsers = Array.from(userMap.values())
        console.log('👥 Unique users after deduplication:', uniqueUsers.length)
        setUsers(uniqueUsers)
      } else {
        console.warn('⚠️ API response not OK')
      }
    } catch (error) {
      console.error('❌ Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUserClick = (user: UserProfile) => {
    setSelectedUser(user)
    setShowUserModal(true)
  }

  const closeUserModal = () => {
    setSelectedUser(null)
    setShowUserModal(false)
  }

  const handleDeleteProfile = async (userId: string, email: string) => {
    console.log('🗑️ Delete button clicked for:', { userId, email })
    
    if (confirm(`Are you sure you want to delete the profile for ${email}? This action cannot be undone.`)) {
      console.log('✅ User confirmed deletion, making API call...')
      
      try {
        const user = users.find(u => u.id === userId)
        const deleteId = user?.user_id || userId
        
        const response = await fetch(`/api/war-room/profiles/${deleteId}`, {
          method: 'DELETE'
        })
        
        console.log('📡 API response status:', response.status)
        
        if (response.ok) {
          const result = await response.json()
          console.log('✅ Delete successful:', result)
          
                  // Remove user from local state
        setUsers(prev => prev.filter(user => (user.user_id || user.id) !== userId))
          closeUserModal()
          alert('Profile deleted successfully')
        } else {
          const errorData = await response.json().catch(() => ({}))
          console.error('❌ Delete failed:', errorData)
          alert(`Failed to delete profile: ${errorData.error || 'Unknown error'}`)
        }
      } catch (error) {
        console.error('❌ Error deleting profile:', error)
        alert('Error deleting profile')
      }
    } else {
      console.log('❌ User cancelled deletion')
    }
  }

  const handleSelectProfile = (userId: string) => {
    setSelectedProfiles(prev => {
      const newSet = new Set(prev)
      if (newSet.has(userId)) {
        newSet.delete(userId)
      } else {
        newSet.add(userId)
      }
      return newSet
    })
  }

  const handleSelectAll = () => {
    if (selectedProfiles.size === filteredUsers.length) {
      setSelectedProfiles(new Set())
    } else {
      setSelectedProfiles(new Set(filteredUsers.map(user => user.user_id || user.id)))
    }
  }

  const handleBulkDelete = async () => {
    const selectedCount = selectedProfiles.size
    if (selectedCount === 0) return
    
    const selectedEmails = filteredUsers
      .filter(user => selectedProfiles.has(user.id))
      .map(user => user.email)
      .join(', ')

    if (confirm(`Are you sure you want to delete ${selectedCount} profile(s)?\n\nEmails: ${selectedEmails}\n\nThis action cannot be undone.`)) {
      try {
        const deletePromises = Array.from(selectedProfiles).map(userId => {
          const user = users.find(u => (u.user_id || u.id) === userId)
          const deleteId = user?.user_id || userId
          return fetch(`/api/war-room/profiles/${deleteId}`, { method: 'DELETE' })
        })
        
        const responses = await Promise.all(deletePromises)
        const successCount = responses.filter(r => r.ok).length
        const failCount = responses.length - successCount
        
        // Remove successfully deleted users from local state
        setUsers(prev => prev.filter(user => !selectedProfiles.has(user.user_id || user.id)))
        setSelectedProfiles(new Set())
        
        if (failCount === 0) {
          alert(`Successfully deleted ${successCount} profile(s)`)
        } else {
          alert(`Deleted ${successCount} profile(s), failed to delete ${failCount} profile(s)`)
        }
      } catch (error) {
        console.error('❌ Error bulk deleting profiles:', error)
        alert('Error deleting profiles')
      }
    }
  }



  // Filter users based on current filters
  const filteredUsers = users.filter(user => {
    if (filterArchetype !== 'all' && user.archetype !== filterArchetype) return false
    if (filterPhase !== 'all' && user.phase !== filterPhase) return false
    return true
  })

  const handleLogout = () => {
    localStorage.removeItem('adminUsername')
    router.push('/war-room/login')
  }

  const getArchetypeEmoji = (archetype: string) => {
    const emojis: Record<string, string> = {
      seeker: '🧠',
      guardian: '🛡️',
      rebel: '⚔️',
      provider: '🛒',
      partner: '🤝',
      sovereign: '👑',
      equalizer: '⚖️',
      mask: '🎭',
      spotlight: '✨',
      visionary: '🔮',
      wanderer: '🌙',
      vessel: '🚢',
      'test-stage-seeker': '🧪'
    }
    return emojis[archetype.toLowerCase()] || '👤'
  }

  const getPhaseColor = (phase: string) => {
    const colors: Record<string, string> = {
      quiz: 'text-blue-400',
      'answer-sequence': 'text-purple-400',
      chamber: 'text-green-400',
      'post-chamber': 'text-yellow-400'
    }
    return colors[phase] || 'text-gray-400'
  }

  const getTimeSinceActivity = (timestamp: string) => {
    const now = new Date()
    const activityTime = new Date(timestamp)
    const diffMs = now.getTime() - activityTime.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}d ago`
  }

  const formatTimeSpent = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    if (minutes < 60) return `${minutes}m ${remainingSeconds}s`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
  }

  const getPageDisplayName = (page: string) => {
    const pageNames: Record<string, string> = {
      '/': 'Landing Page',
      '/quiz': 'Quiz',
      '/quiz/results': 'Quiz Results',
      '/chamber/spotlight': 'Spotlight Chamber',
      '/chamber/spotlight/explore-who-you-are': 'Explore Who You Are',
      '/chamber/spotlight/field-proof': 'Field Proof',
      '/chamber/spotlight/field-proof/choose-path': 'Choose Path',
      '/chamber/spotlight/field-proof/free-walk': 'Free Walk',
      '/chamber/spotlight/field-proof/free-walk/results': 'Free Walk Results',
      '/chamber/guardian': 'Guardian Chamber',
      '/chamber/guardian/explore-who-you-are': 'Explore Who You Are',
      '/chamber/guardian/field-proof': 'Field Proof',
      '/chamber/guardian/field-proof/choose-path': 'Choose Path',
      '/chamber/guardian/field-proof/free-walk': 'Free Walk',
      '/chamber/guardian/field-proof/free-walk/results': 'Free Walk Results',
      '/chamber/partner': 'Partner Chamber',
      '/chamber/partner/explore-who-you-are': 'Explore Who You Are',
      '/chamber/partner/field-proof': 'Field Proof',
      '/chamber/partner/field-proof/choose-path': 'Choose Path',
      '/chamber/partner/field-proof/free-walk': 'Free Walk',
      '/chamber/partner/field-proof/free-walk/results': 'Free Walk Results',
      '/chamber/sovereign': 'Sovereign Chamber',
      '/chamber/sovereign/explore-who-you-are': 'Explore Who You Are',
      '/chamber/sovereign/field-proof': 'Field Proof',
      '/chamber/sovereign/field-proof/choose-path': 'Choose Path',
      '/chamber/sovereign/field-proof/free-walk': 'Free Walk',
      '/chamber/sovereign/field-proof/free-walk/results': 'Free Walk Results',
      '/chamber/equalizer': 'Equalizer Chamber',
      '/chamber/equalizer/explore-who-you-are': 'Explore Who You Are',
      '/chamber/equalizer/field-proof': 'Field Proof',
      '/chamber/equalizer/field-proof/choose-path': 'Choose Path',
      '/chamber/equalizer/field-proof/free-walk': 'Free Walk',
      '/chamber/equalizer/field-proof/free-walk/results': 'Free Walk Results',
      '/chamber/rebel': 'Rebel Chamber',
      '/chamber/rebel/explore-who-you-are': 'Explore Who You Are',
      '/chamber/rebel/field-proof': 'Field Proof',
      '/chamber/rebel/field-proof/choose-path': 'Choose Path',
      '/chamber/rebel/field-proof/free-walk': 'Free Walk',
      '/chamber/rebel/field-proof/free-walk/results': 'Free Walk Results',
      '/chamber/provider': 'Provider Chamber',
      '/chamber/provider/explore-who-you-are': 'Explore Who You Are',
      '/chamber/provider/field-proof': 'Field Proof',
      '/chamber/provider/field-proof/choose-path': 'Choose Path',
      '/chamber/provider/field-proof/free-walk': 'Free Walk',
      '/chamber/provider/field-proof/free-walk/results': 'Free Walk Results',
      '/chamber/mask': 'Mask Chamber',
      '/chamber/mask/explore-who-you-are': 'Explore Who You Are',
      '/chamber/mask/field-proof': 'Field Proof',
      '/chamber/mask/field-proof/choose-path': 'Choose Path',
      '/chamber/mask/field-proof/free-walk': 'Free Walk',
      '/chamber/mask/field-proof/free-walk/results': 'Free Walk Results',
      '/chamber/visionary': 'Visionary Chamber',
      '/chamber/visionary/explore-who-you-are': 'Explore Who You Are',
      '/chamber/visionary/field-proof': 'Field Proof',
      '/chamber/visionary/field-proof/choose-path': 'Choose Path',
      '/chamber/visionary/field-proof/free-walk': 'Free Walk',
      '/chamber/visionary/field-proof/free-walk/results': 'Free Walk Results',
      '/chamber/wanderer': 'Wanderer Chamber',
      '/chamber/wanderer/explore-who-you-are': 'Explore Who You Are',
      '/chamber/wanderer/field-proof': 'Field Proof',
      '/chamber/wanderer/field-proof/choose-path': 'Choose Path',
      '/chamber/wanderer/field-proof/free-walk': 'Free Walk',
      '/chamber/wanderer/field-proof/free-walk/results': 'Free Walk Results',
      '/chamber/test-stage-seeker': 'Test Stage Seeker Chamber',
      '/chamber/test-stage-seeker/explore-who-you-are': 'Explore Who You Are',
      '/chamber/test-stage-seeker/field-proof': 'Field Proof',
      '/chamber/test-stage-seeker/field-proof/choose-path': 'Choose Path',
      '/chamber/test-stage-seeker/field-proof/free-walk': 'Free Walk',
      '/chamber/test-stage-seeker/field-proof/free-walk/results': 'Free Walk Results',
      '/chamber/vessel': 'Vessel Chamber',
      '/chamber/vessel/explore-who-you-are': 'Explore Who You Are',
      '/chamber/vessel/field-proof': 'Field Proof',
      '/chamber/vessel/field-proof/choose-path': 'Choose Path',
      '/chamber/vessel/field-proof/free-walk': 'Free Walk',
      '/chamber/vessel/field-proof/free-walk/results': 'Free Walk Results'
    }
    return pageNames[page] || page
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading War Room...</p>
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
            <h1 className="text-2xl font-bold text-red-400">WAR ROOM</h1>
            <p className="text-gray-400">Real-Time Psychological Field Observatory</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Admin: <span className="text-red-400 font-bold">{adminUsername}</span></span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-100px)]">
        {/* Left Sidebar - User Grid */}
        <div className="w-1/3 border-r border-gray-800 p-4 overflow-y-auto">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-4">Active Users ({filteredUsers.length})</h2>
            
            {/* Filters */}
            <div className="space-y-2 mb-4">
              <select
                value={filterArchetype}
                onChange={(e) => setFilterArchetype(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-sm"
              >
                <option value="all">All Archetypes</option>
                <option value="seeker">🧠 Seeker</option>
                <option value="guardian">🛡️ Guardian</option>
                <option value="rebel">⚔️ Rebel</option>
                <option value="provider">🛒 Provider</option>
                <option value="spotlight">🌟 Spotlight</option>
                <option value="equalizer">⚖️ Equalizer</option>
                <option value="sovereign">👑 Sovereign</option>
                <option value="visionary">🔮 Visionary</option>
                <option value="wanderer">🚶 Wanderer</option>
                <option value="mask">🎭 Mask</option>
                <option value="sage">🧙 Sage</option>
                <option value="mystic">✨ Mystic</option>
                <option value="servant">🙏 Servant</option>
              </select>
              
              <select
                value={filterPhase}
                onChange={(e) => setFilterPhase(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-2 py-1 text-sm"
              >
                <option value="all">All Phases</option>
                <option value="quiz">Quiz</option>
                <option value="answer-sequence">Answer Sequence</option>
                <option value="chamber">Chamber</option>
                <option value="post-chamber">Post-Chamber</option>
              </select>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedProfiles.size === filteredUsers.length && filteredUsers.length > 0}
                  onChange={handleSelectAll}
                  className="rounded"
                />
                <span className="text-sm text-gray-400">
                  Select All ({selectedProfiles.size} selected)
                </span>
              </div>
            </div>
          </div>

          {/* Bulk Delete Controls */}
          <div className="mb-4 flex items-center justify-between bg-gray-800 rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedProfiles.size === filteredUsers.length && filteredUsers.length > 0}
                onChange={handleSelectAll}
                className="rounded"
              />
              <span className="text-sm text-gray-400">
                Select All ({selectedProfiles.size} selected)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {selectedProfiles.size > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300 text-sm"
                >
                  Delete Selected ({selectedProfiles.size})
                </button>
              )}

            </div>
          </div>

          {/* User Cards */}
          <div className="space-y-3">
            {filteredUsers.length === 0 ? (
              <div className="text-gray-400 text-center p-4">
                No users found. Users array: {users.length}
              </div>
            ) : null}
            {filteredUsers.map((user) => (
              <div 
                key={user.user_id || user.id} 
                className={`bg-gray-900 rounded-lg p-3 border-l-4 ${user.isDormant ? 'border-gray-600' : 'border-green-500'} hover:bg-gray-800 transition-colors duration-200`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedProfiles.has(user.user_id || user.id)}
                      onChange={(e) => {
                        e.stopPropagation()
                        handleSelectProfile(user.user_id || user.id)
                      }}
                      className="rounded"
                    />
                    <span 
                      className="text-xl cursor-pointer" 
                      onClick={() => handleUserClick(user)}
                    >
                      {getArchetypeEmoji(user.archetype)}
                    </span>
                    <span 
                      className="font-semibold text-sm cursor-pointer" 
                      onClick={() => handleUserClick(user)}
                    >
                      {user.archetype.toUpperCase()}
                    </span>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs text-white ${getPhaseColor(user.phase)}`}>
                    {user.phase}
                  </div>
                </div>
                
                <div className="cursor-pointer" onClick={() => handleUserClick(user)}>
                  <div className="text-xs text-gray-400 mb-2">{user.email}</div>
                  
                  {user.user_id && (
                    <div className="text-xs text-purple-400 mb-1">
                      ID: {user.user_id}
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500">
                    Last: {getTimeSinceActivity(user.lastActivity)}
                  </div>
                  

                </div>
              </div>
            ))}
          </div>
        </div>



        {/* Analytics */}
        <div className="w-1/2 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Analytics & Intelligence</h2>
          
          {/* System Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-900 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-400">{users.length}</div>
              <div className="text-sm text-gray-400">Active Users</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-3">
              <div className="text-2xl font-bold text-yellow-400">
                {users.filter(u => u.isDormant).length}
              </div>
              <div className="text-sm text-gray-400">Dormant (&gt;10min)</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-400">
                {users.filter(u => u.phase === 'post-chamber').length}
              </div>
              <div className="text-sm text-gray-400">Completed</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-3">
              <div className="text-2xl font-bold text-red-400">
                {users.filter(u => u.phase === 'quiz').length}
              </div>
              <div className="text-sm text-gray-400">In Progress</div>
            </div>
          </div>

          {/* Archetype Distribution */}
          <div className="bg-gray-900 rounded-lg p-4 mb-6">
            <h3 className="font-bold mb-3">Node Distribution</h3>
            <div className="space-y-2">
              {Array.from(new Set(users.map(u => u.archetype))).map(archetype => {
                const count = users.filter(u => u.archetype === archetype).length
                const percentage = (count / users.length) * 100
                return (
                  <div key={archetype} className="flex items-center justify-between">
                    <span className="text-sm">{getArchetypeEmoji(archetype)} {archetype}</span>
                    <span className="text-sm text-gray-400">{count} ({percentage.toFixed(0)}%)</span>
                  </div>
                )
              })}
            </div>
          </div>

                    {/* User Activity Monitor */}
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-6">
            <div 
              className="flex items-center justify-between cursor-pointer hover:bg-blue-800/20 p-2 rounded transition-colors duration-200"
              onClick={() => router.push('/war-room/page-timers')}
            >
              <h3 className="font-bold text-blue-400">🕐 User Activity Monitor</h3>
              <span className="text-blue-400 text-sm">→ View Details</span>
            </div>
              <div className="space-y-2 text-sm">
                {users.length === 0 ? (
                  <div className="text-gray-400">No user activities available</div>
                ) : (
                  <>
                    <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                      <span>Active: {users.filter(u => !u.isDormant).length}</span>
                      <span>Total: {users.length}</span>
                    </div>
                    {users.slice(0, 3).map((user) => (
                      <div key={user.user_id || user.id} className="flex justify-between items-center">
                        <span className="text-gray-300 font-mono text-xs truncate max-w-32">
                          {user.email}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs ${!user.isDormant ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'}`}>
                            {!user.isDormant ? 'ACTIVE' : 'DORMANT'}
                          </span>
                          <span className="text-blue-400 font-mono text-xs">
                            {user.archetype}
                          </span>
                        </div>
                      </div>
                    ))}
                    {users.length > 3 && (
                      <div className="text-center text-xs text-gray-500 mt-2">
                        +{users.length - 3} more users
                      </div>
                    )}
                  </>
                )}
              </div>
          </div>

          {/* Critical Alerts */}
          <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
            <h3 className="font-bold text-red-400 mb-3">⚠️ Critical Alerts</h3>
            <div className="space-y-2 text-sm">
              {users.filter(u => u.isDormant).map(user => (
                <div key={user.user_id || user.id} className="text-yellow-300">
                  {user.email}: Dormant for {getTimeSinceActivity(user.lastActivity)}
                </div>
              ))}
              {users.filter(u => u.phase === 'post-chamber').map(user => (
                <div key={user.user_id || user.id} className="text-green-300">
                  {user.email}: Completed journey
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{getArchetypeEmoji(selectedUser.archetype)}</span>
                <div>
                  <h2 className="text-2xl font-bold">{selectedUser.archetype.toUpperCase()} NODE</h2>
                  <p className="text-gray-400">{selectedUser.email}</p>
                </div>
              </div>
              <button
                onClick={closeUserModal}
                className="text-gray-400 hover:text-white text-2xl"
              >
                &times;
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">


              {/* Session Timeline */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="font-bold mb-3">Session Timeline</h3>
                <div className="space-y-2">
                  {selectedUser.user_id && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">User ID:</span>
                      <span className="text-purple-400 font-mono">{selectedUser.user_id}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Created:</span>
                    <span>{selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleString() : 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Last Activity:</span>
                    <span>{selectedUser.lastActivity ? new Date(selectedUser.lastActivity).toLocaleString() : 'Unknown'}</span>
                  </div>
                </div>
              </div>

              {/* Time Breakdown */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="font-bold mb-3">⏱️ Time Breakdown</h3>
                {selectedUser.timeSpent && Object.keys(selectedUser.timeSpent).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(selectedUser.timeSpent)
                      .sort(([,a], [,b]) => (b as number) - (a as number)) // Sort by time descending
                      .map(([page, timeSpent]) => (
                        <div key={page} className="flex justify-between items-center p-2 bg-gray-700 rounded">
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-300">
                              {getPageDisplayName(page)}
                            </div>
                            <div className="text-xs text-gray-400 font-mono">
                              {page}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-green-400">
                              {formatTimeSpent(timeSpent as number)}
                            </div>
                            <div className="text-xs text-gray-400">
                              {timeSpent as number}s
                            </div>
                          </div>
                        </div>
                      ))}
                    <div className="pt-2 border-t border-gray-600">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-300">Total Time:</span>
                        <span className="text-lg font-bold text-blue-400">
                          {formatTimeSpent(selectedUser.totalTime || 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm">No time data available</div>
                )}
              </div>



              {/* Delete Profile Button */}
              <div className="flex justify-end pt-4 border-t border-gray-700">
                <button
                  onClick={() => handleDeleteProfile(selectedUser.user_id || selectedUser.id, selectedUser.email)}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300 flex items-center space-x-2"
                >
                  <span>🗑️</span>
                  <span>Delete Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Export as a dynamic component to prevent hydration issues
const WarRoomPage = dynamic(() => Promise.resolve(WarRoomPageComponent), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
        <p>Loading War Room...</p>
      </div>
    </div>
  )
})

export default WarRoomPage