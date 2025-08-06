'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f1c3f 0%, #233a7c 55%, #2752b3 100%)',
      color: '#ececec',
      fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      margin: 0,
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <div className="container" style={{
        maxWidth: '430px',
        width: '95vw',
        background: '#232321cc',
        borderRadius: '30px',
        boxShadow: '0 8px 32px #0006',
        padding: '24px 30px 20px 30px',
        textAlign: 'center',
        margin: '10px 0'
      }}>
        <h1 style={{
          fontSize: '1.8em',
          letterSpacing: '0.02em',
          fontWeight: 800,
          marginBottom: '12px',
          color: '#ececec'
        }}>
          Unlock Your Archetype. Take the Free Test Now.
        </h1>
        
        <div className="desc" style={{
          fontSize: '1.05em',
          color: '#d1c7ae',
          lineHeight: 1.5,
          marginBottom: '18px',
          letterSpacing: '0.01em'
        }}>
          Answer 15 quick questions to reveal who you are, what drives you, and who you could become.<br/>
          No payment. No signup. No commitment.<br/>
          Your full result is free, instant, and yours to keep.<br/>
          It could change how you see yourself forever—and show you the path to your future self.
        </div>
        
        <div className="motivation" style={{
          fontSize: '1.02em',
          color: '#ffe394',
          marginBottom: '18px',
          fontWeight: 600,
          letterSpacing: '0.01em'
        }}>
          This isn't just about finding out who you are.<br/>
          It's about seeing the next version of yourself—and deciding if you want to become that person.
        </div>
        
        <Link 
          href="/quiz"
          style={{
            background: '#fff',
            color: '#223162',
            fontSize: '1.14em',
            fontWeight: 700,
            padding: '17px 54px',
            border: 'none',
            borderRadius: '22px',
            boxShadow: '0 2px 14px #233a7c44',
            cursor: 'pointer',
            transition: 'box-shadow 0.18s, transform 0.10s, background 0.18s, color 0.18s',
            letterSpacing: '0.01em',
            marginTop: '14px',
            display: 'inline-block',
            textDecoration: 'none',
            animation: 'pulse 2s infinite'
          }}
          className="begin-btn"
        >
          Start the Free Test
        </Link>
        
        <div className="footer" style={{
          marginTop: '16px',
          fontSize: '0.92em',
          color: '#b3bad6',
          fontStyle: 'italic',
          letterSpacing: '0.01em'
        }}>
          There's nothing after this but your answers. No tricks. No pressure.<br/>
          Take the test. See yourself—then choose your next step.
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0% { box-shadow: 0 2px 14px #233a7c44; }
          50% { box-shadow: 0 4px 32px #fff7; }
          100% { box-shadow: 0 2px 14px #233a7c44; }
        }
        .begin-btn:hover {
          box-shadow: 0 6px 24px #233a7cbb !important;
          background: #ececec !important;
          color: #0f1c3f !important;
          transform: translateY(-2px) scale(1.03) !important;
        }
        @media (max-width: 600px) {
          .container {
            padding: 20px 3vw 16px 3vw !important;
            max-width: 99vw !important;
            margin: 5px 0 !important;
          }
          h1 { 
            font-size: 1.5em !important; 
            margin-bottom: 10px !important;
          }
          .begin-btn { 
            font-size: 0.95em !important; 
            padding: 12px 8vw !important; 
          }
          .desc { 
            font-size: 1em !important;
            line-height: 1.4 !important;
            margin-bottom: 14px !important; 
          }
          .motivation { 
            font-size: 0.98em !important;
            margin-bottom: 14px !important; 
          }
          .footer { 
            font-size: 0.88em !important;
            margin-top: 12px !important; 
          }
        }
      `}</style>
    </div>
  )
}
