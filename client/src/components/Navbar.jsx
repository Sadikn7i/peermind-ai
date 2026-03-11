import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(2,3,10,0.8)',
      backdropFilter: 'blur(30px)',
      borderBottom: '1px solid rgba(240,192,64,0.15)',
      padding: '0 3rem',
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      {/* Scanline effect */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
        opacity: 0.03
      }}>
        <div style={{
          position: 'absolute', width: '100%', height: '2px',
          background: 'linear-gradient(transparent, var(--gold), transparent)',
          animation: 'scanline 4s linear infinite'
        }} />
      </div>

      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '38px', height: '38px',
          background: 'linear-gradient(135deg, #f0c040, #ffd700)',
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.2rem',
          boxShadow: '0 0 20px rgba(240,192,64,0.4)',
          animation: 'glow 3s ease infinite'
        }}>⬡</div>
        <div>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.3rem',
            fontWeight: '800',
            color: '#f0f0ff',
            letterSpacing: '-0.03em',
            display: 'block',
            lineHeight: 1
          }}>
            PEER<span style={{
              background: 'linear-gradient(90deg, #f0c040, #00e5ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>MIND</span>
          </span>
          <span style={{
            fontSize: '0.6rem',
            color: 'var(--text3)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)'
          }}>AI Review System v2.0</span>
        </div>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {/* Live indicator */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(0,255,136,0.08)',
          border: '1px solid rgba(0,255,136,0.2)',
          borderRadius: '999px',
          padding: '0.3rem 0.9rem',
          fontSize: '0.72rem',
          fontWeight: '600',
          color: 'var(--green)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.05em'
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: 'var(--green)',
            animation: 'pulse 2s infinite',
            display: 'block'
          }} />
          SYSTEM ONLINE
        </div>
      </div>
    </nav>
  )
}

export default Navbar