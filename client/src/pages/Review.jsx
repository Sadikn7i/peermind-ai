import { useLocation, useNavigate } from 'react-router-dom'
import ReviewReport from '../components/ReviewReport'

function Review() {
  const location = useLocation()
  const navigate = useNavigate()
  const review = location.state?.review

  if (!review) {
    return (
      <div style={{
        minHeight: '80vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '4rem'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem', animation: 'float 4s ease infinite' }}>📭</div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: '2.5rem',
          fontStyle: 'italic', marginBottom: '0.75rem'
        }}>No Review Found</h2>
        <p style={{ color: 'var(--text2)', marginBottom: '2.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
          Please submit a paper first
        </p>
        <button onClick={() => navigate('/')} style={{
          padding: '0.85rem 2.5rem',
          background: 'linear-gradient(135deg, #f0c040, #ffd700)',
          color: '#02030a', border: 'none', borderRadius: '10px',
          cursor: 'pointer', fontWeight: '800', fontSize: '0.9rem',
          fontFamily: 'var(--font-body)', letterSpacing: '0.05em',
          textTransform: 'uppercase',
          boxShadow: '0 4px 20px rgba(240,192,64,0.3)'
        }}>← Go Back Home</button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '2.5rem 2rem 6rem' }}>
      <button
        onClick={() => navigate('/')}
        style={{
          marginBottom: '2rem', padding: '0.6rem 1.25rem',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--border)',
          borderRadius: '10px', cursor: 'pointer',
          color: 'var(--text2)', fontSize: '0.85rem',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          transition: 'all 0.2s',
          fontFamily: 'var(--font-mono)'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(240,192,64,0.4)'
          e.currentTarget.style.color = 'var(--gold)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.color = 'var(--text2)'
        }}
      >
        ← new_review()
      </button>
      <ReviewReport review={review} />
    </div>
  )
}

export default Review