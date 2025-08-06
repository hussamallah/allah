'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function WarRoomLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === '/war-room/login') {
      setIsChecking(false)
      return
    }

    // Check if user is authenticated
    const warRoomAdmin = localStorage.getItem('warRoomAdmin')
    const username = localStorage.getItem('adminUsername')
    
    if (warRoomAdmin === 'true' && username) {
      setIsChecking(false)
    } else {
      // Redirect to login if not authenticated
      router.push('/war-room/login')
    }
  }, [pathname, router])

  if (isChecking) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-xl">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
} 