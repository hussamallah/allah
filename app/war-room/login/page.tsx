'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function WarRoomLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simple credential check
    if (username === 'hussamallah' && password === 'hussamallah') {
      // Store admin session in localStorage
      localStorage.setItem('warRoomAdmin', 'true')
      localStorage.setItem('adminUsername', username)
      
      // Redirect to war room
      router.push('/war-room')
    } else {
      setError('Invalid credentials. Please try again.')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-red-500">🔥 WAR ROOM</h1>
          <p className="text-xl text-gray-300">Admin Access Required</p>
          <div className="w-32 h-1 mx-auto mt-4 bg-gradient-to-r from-red-600 to-orange-600"></div>
        </div>

        {/* Login Form */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8 backdrop-blur-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter admin username"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter admin password"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)' }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Authenticating...
                </span>
              ) : (
                'Access War Room'
              )}
            </button>
          </form>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <button
              onClick={() => router.push('/')}
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              ← Back to Home
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
            <p className="text-yellow-300 text-sm">
              ⚠️ <strong>SECURITY NOTICE:</strong> This is a restricted admin area. 
              Unauthorized access attempts will be logged.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 