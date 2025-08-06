'use client'

import { useState } from 'react'

interface PurchaseButtonProps {
  tier: string
  price: number
  features: string[]
  archetype: string
}

export default function PurchaseButton({ tier, price, features, archetype }: PurchaseButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePurchase = async () => {
    setIsProcessing(true)
    
    try {
      // Track purchase (no EAS scoring)
      console.log('💰 Purchase attempt:', { tier, price, archetype })
      
      // Simulate purchase process (replace with actual payment integration)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert(`Purchase successful! You now have access to the ${tier} tier.`)
      
      // You would integrate with Stripe, PayPal, or other payment processor here
      // Example:
      // const response = await fetch('/api/purchase', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ tier, price, archetype })
      // })
      
    } catch (error) {
      console.error('Purchase failed:', error)
      alert('Purchase failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const getPriceColor = (price: number) => {
    if (price === 1) return 'text-pink-400'
    if (price === 3) return 'text-indigo-400'
    if (price === 5) return 'text-emerald-400'
    if (price === 10) return 'text-amber-400'
    return 'text-gray-400'
  }

  const getTierEmoji = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'compatibility': return '💡'
      case 'override1': return '⚡'
      case 'override2': return '🎯'
      case 'fullbundle': return '👑'
      default: return '💎'
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
      <div className="text-center mb-4">
        <div className="text-3xl mb-2">{getTierEmoji(tier)}</div>
        <h3 className="text-xl font-bold text-white mb-2">{tier.toUpperCase()} TIER</h3>
        <div className={`text-3xl font-bold ${getPriceColor(price)} mb-1`}>
          ${price}
        </div>
        <div className="text-sm text-gray-400">one-time payment</div>
      </div>

      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-gray-300">
            <span className="text-green-400 mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={handlePurchase}
        disabled={isProcessing}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
          isProcessing
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          `Get ${tier} Access`
        )}
      </button>

      <div className="text-xs text-gray-500 text-center mt-3">
        Secure payment • Cancel anytime
      </div>
    </div>
  )
}