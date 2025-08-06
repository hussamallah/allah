'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

interface GA4Event {
  event: string
  parameters?: Record<string, any>
}

interface GA4TrackerProps {
  measurementId: string
  archetype?: string
  onEvent?: (event: GA4Event) => void
}

export default function GA4Tracker({ 
  measurementId, 
  archetype, 
  onEvent 
}: GA4TrackerProps) {
  const isInitialized = useRef(false)

  useEffect(() => {
    if (isInitialized.current) return

    // Initialize GA4
    const initGA4 = () => {
      // Load GA4 script
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
      document.head.appendChild(script)

      // Initialize gtag
      window.dataLayer = window.dataLayer || []
      window.gtag = function() {
        window.dataLayer.push(arguments)
      }

      window.gtag('js', new Date())
      window.gtag('config', measurementId, {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: {
          'custom_parameter_archetype': 'archetype'
        }
      })

      isInitialized.current = true
    }

    // Track custom events
    const trackCustomEvent = (eventName: string, parameters?: Record<string, any>) => {
      if (window.gtag) {
        const eventData: GA4Event = {
          event: eventName,
          parameters: {
            ...parameters,
            archetype
          }
        }

        window.gtag('event', eventName, {
          ...parameters,
          archetype
        })

        onEvent?.(eventData)
      }
    }

    // Track conversion events
    const trackConversions = () => {
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        const conversionButton = target.closest('[data-ga4-event]')
        
        if (conversionButton) {
          const eventName = conversionButton.getAttribute('data-ga4-event')
          const parameters = conversionButton.getAttribute('data-ga4-params')
          
          if (eventName) {
            trackCustomEvent(eventName, parameters ? JSON.parse(parameters) : {})
          }
        }
      })
    }

    // Track ecommerce events
    const trackEcommerce = () => {
      // Track begin_checkout
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        const checkoutButton = target.closest('[data-ga4-begin-checkout]')
        
        if (checkoutButton) {
          const value = checkoutButton.getAttribute('data-ga4-value')
          const currency = checkoutButton.getAttribute('data-ga4-currency')
          
          window.gtag('event', 'begin_checkout', {
            value: value ? parseFloat(value) : undefined,
            currency: currency || 'USD',
            archetype
          })
        }
      })

      // Track purchase
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        const purchaseButton = target.closest('[data-ga4-purchase]')
        
        if (purchaseButton) {
          const value = purchaseButton.getAttribute('data-ga4-value')
          const currency = purchaseButton.getAttribute('data-ga4-currency')
          const transactionId = purchaseButton.getAttribute('data-ga4-transaction-id')
          
          window.gtag('event', 'purchase', {
            value: value ? parseFloat(value) : undefined,
            currency: currency || 'USD',
            transaction_id: transactionId,
            archetype
          })
        }
      })
    }

    // Initialize GA4
    initGA4()

    // Set up event tracking
    setTimeout(() => {
      trackConversions()
      trackEcommerce()
    }, 1000)

  }, [measurementId, archetype, onEvent])

  return null
} 