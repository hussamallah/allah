'use client'

import { useState } from 'react'

interface ShareButtonProps {
  archetype: string
  url?: string
  text?: string
}

export default function ShareButton({ archetype, url, text }: ShareButtonProps) {
  const [showOptions, setShowOptions] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = url || window.location.href
  const shareText = text || `I just discovered I'm a ${archetype}! Find out your archetype:`

  const handleShare = async (method: string) => {
    // Track sharing (no EAS scoring)
    console.log('📤 Sharing via:', method)
    
    if (method === 'copy') {
      try {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    } else if (method === 'twitter') {
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
      window.open(twitterUrl, '_blank')
    } else if (method === 'facebook') {
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
      window.open(facebookUrl, '_blank')
    } else if (method === 'linkedin') {
      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
      window.open(linkedinUrl, '_blank')
    }
    
    setShowOptions(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
      >
        <span>🔗</span>
        <span>Share Result</span>
      </button>

      {showOptions && (
        <div className="absolute top-full mt-2 left-0 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-10 min-w-[200px]">
          <div className="p-2 space-y-1">
            <button
              onClick={() => handleShare('copy')}
              className="w-full text-left px-3 py-2 hover:bg-gray-800 rounded flex items-center space-x-2"
            >
              <span>📋</span>
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="w-full text-left px-3 py-2 hover:bg-gray-800 rounded flex items-center space-x-2"
            >
              <span>🐦</span>
              <span>Twitter</span>
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="w-full text-left px-3 py-2 hover:bg-gray-800 rounded flex items-center space-x-2"
            >
              <span>📘</span>
              <span>Facebook</span>
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="w-full text-left px-3 py-2 hover:bg-gray-800 rounded flex items-center space-x-2"
            >
              <span>💼</span>
              <span>LinkedIn</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}