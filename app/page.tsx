'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{
      background: '#1A2B5B',
      color: '#ffffff',
      fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      margin: 0,
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <div className="container" style={{
        maxWidth: '600px',
        width: '90vw',
        padding: '40px 20px',
        textAlign: 'left'
      }}>
        {/* Main Heading */}
        <h1 style={{
          fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
          fontWeight: 700,
          marginBottom: '40px',
          color: '#ffffff',
          lineHeight: 1.2,
          wordBreak: 'break-word'
        }}>
          <span style={{ display: 'block' }}>Unlock Your Archetype.</span>
          <span style={{ display: 'block' }}>Take the Free Test Now.</span>
        </h1>
        
        {/* First Paragraph */}
        <p style={{
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          color: '#ffffff',
          lineHeight: 1.6,
          marginBottom: '40px',
          fontWeight: 400
        }}>
          Answer 15 quick questions to reveal who you really are. No signup. No payment. Get your full result instantly. It's free – and it could change everything.
        </p>
        
        {/* Second Paragraph */}
        <p style={{
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          color: '#ffffff',
          lineHeight: 1.6,
          marginBottom: '50px',
          fontWeight: 400
        }}>
          This isn't just about who you are. It's about who you're becoming – and whether you'll rise to meet them.
        </p>
        
        {/* Call-to-Action Button */}
        <div style={{
          textAlign: 'center'
        }}>
          <Link 
            href="/quiz-v2"
            style={{
              background: '#FFC107',
              color: '#1A2B5B',
              fontSize: '1.1rem',
              fontWeight: 700,
              padding: '16px 32px',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}
            className="begin-btn"
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement
              target.style.transform = 'translateY(-2px)'
              target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)'
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement
              target.style.transform = 'translateY(0)'
              target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}
          >
            <span style={{ fontSize: '1rem' }}>🚀</span>
            Start the Free Test
            <span style={{ fontSize: '1rem' }}>→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
