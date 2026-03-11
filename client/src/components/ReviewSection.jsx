import { useState } from 'react'
import ScoreBadge from './ScoreBadge'

function ReviewSection({ title, score, feedback, icon }) {
  const [open, setOpen] = useState(true)

  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid var(--border)',
      borderRadius: '14px',
      marginBottom: '0.75rem',
      overflow: 'hidden',
      transition: 'all 0.3s',
      backdropFilter: 'blur(10px)'
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{
          padding: '1.25rem 1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          cursor: 'pointer',
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem'
          }}>{icon}</span>
          <h3 style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem', fontWeight: '700',
            color: 'var(--text)', margin: 0, letterSpacing: '0.02em'
          }}>{title}</h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ScoreBadge score={score} />
          <span style={{ color: 'var(--text3)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>
            {open ? '▲' : '▼'}
          </span>
        </div>
      </div>
      {open && (
        <div style={{
          padding: '1.25rem 1.5rem',
          borderTop: '1px solid var(--border)',
          animation: 'fadeIn 0.2s ease'
        }}>
          <p style={{
            color: 'var(--text2)', lineHeight: '1.85',
            fontSize: '0.9rem', margin: 0
          }}>{feedback}</p>
        </div>
      )}
    </div>
  )
}

export default ReviewSection