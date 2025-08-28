'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function TestPage() {
  const [apiStatus, setApiStatus] = useState('Testing...')
  const [userCount, setUserCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    testAPI()
  }, [])

  const testAPI = async () => {
    try {
      const response = await fetch('/api/war-room/users-real-time')
      if (response.ok) {
        const data = await response.json()
        setApiStatus('✅ API Working')
        setUserCount(data.users?.length || 0)
      } else {
        setApiStatus('❌ API Error')
      }
    } catch (error) {
      setApiStatus('❌ Network Error')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 War Room Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">API Status</h2>
            <p className="text-2xl mb-2">{apiStatus}</p>
            <p className="text-gray-400">Users in database: {userCount}</p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Navigation Test</h2>
            <div className="space-y-2">
              <button
                onClick={() => router.push('/war-room')}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => router.push('/war-room/page-timers')}
                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
              >
                Go to Page Timers
              </button>
              <button
                onClick={() => router.push('/war-room/landing-analytics')}
                className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded"
              >
                Go to Landing Analytics
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Available Pages</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-3 bg-gray-800 rounded">
              <strong>Dashboard</strong><br/>
              <span className="text-sm text-gray-400">/war-room</span>
            </div>
            <div className="p-3 bg-gray-800 rounded">
              <strong>Page Timers</strong><br/>
              <span className="text-sm text-gray-400">/war-room/page-timers</span>
            </div>
            <div className="p-3 bg-gray-800 rounded">
              <strong>Landing Analytics</strong><br/>
              <span className="text-sm text-gray-400">/war-room/landing-analytics</span>
            </div>
            <div className="p-3 bg-gray-800 rounded">
              <strong>Funnel Analytics</strong><br/>
              <span className="text-sm text-gray-400">/war-room/funnel-analytics</span>
            </div>
            <div className="p-3 bg-gray-800 rounded">
              <strong>Payment Analytics</strong><br/>
              <span className="text-sm text-gray-400">/war-room/payment-analytics</span>
            </div>
            <div className="p-3 bg-gray-800 rounded">
              <strong>Post-Purchase Analytics</strong><br/>
              <span className="text-sm text-gray-400">/war-room/post-purchase-analytics</span>
            </div>
            <div className="p-3 bg-gray-800 rounded">
              <strong>Revenue Attribution</strong><br/>
              <span className="text-sm text-gray-400">/war-room/revenue-attribution</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 