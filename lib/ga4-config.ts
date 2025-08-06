export const GA4_CONFIG = {
  measurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'G-XXXXXXXXXX',
  
  // Custom event mappings
  events: {
    // Funnel events
    PAGE_VIEW: 'page_view',
    BEGIN_JOURNEY: 'begin_journey',
    START_QUIZ: 'start_quiz',
    COMPLETE_QUIZ: 'complete_quiz',
    EMAIL_SUBMIT: 'email_submit',
    
    // Ecommerce events
    BEGIN_CHECKOUT: 'begin_checkout',
    ADD_TO_CART: 'add_to_cart',
    PURCHASE: 'purchase',
    
    // Custom events
    ARCHETYPE_RESULT: 'archetype_result',
    QUIZ_ABANDON: 'quiz_abandon',
    PAYMENT_ATTEMPT: 'payment_attempt',
    PAYMENT_SUCCESS: 'payment_success',
    PAYMENT_FAILED: 'payment_failed'
  },
  
  // Custom parameters
  parameters: {
    ARCHETYPE: 'archetype',
    QUIZ_TYPE: 'quiz_type',
    PAYMENT_METHOD: 'payment_method',
    UTM_SOURCE: 'utm_source',
    UTM_CAMPAIGN: 'utm_campaign'
  }
}

export const trackGA4Event = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
} 