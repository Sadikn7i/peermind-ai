import ReviewSection from './ReviewSection'
import ScoreBadge from './ScoreBadge'

function ReviewReport({ review }) {
  const recConfig = {
    'Accept': { color: 'var(--green)', glow: 'rgba(0,255,136,0.2)', icon: '✓', label: 'ACCEPT' },
    'Minor Revision': { color: 'var(--gold)', glow: 'rgba(240,192,64,0.2)', icon: '~', label: 'MINOR REVISION' },
    'Major Revision': { color: '#f97316', glow: 'rgba(249,115,22,0.2)', icon: '!', label: 'MAJOR REVISION' },
    'Reject': { color: 'var(--red)', glow: 'rgba(255,71,87,0.2)', icon: '✗', label: 'REJECT' }
  }
  const rec = recConfig[review.recommendation] || recConfig['Minor Revision']

  const sections = [
    { key: 'originality', title: 'Originality', icon: '💡' },
    { key: 'methodology', title: 'Methodology', icon: '🔬' },
    { key: 'clarity', title: 'Clarity & Writing', icon: '✍️' },
    { key: 'references', title: 'References', icon: '📚' },
    { key: 'contribution', title: 'Contribution', icon: '🎯' },
  ]

  const avgScore = Math.round(
    sections.reduce((sum, s) => sum + review.sections[s.key].score, 0) / sections.length
  )

  return (
    <div style={{ animation: 'fadeUp 0.6s ease' }}>

      {/* Hero banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(5,7,26,0.9) 0%, rgba(13,18,32,0.9) 100%)',
        border: '1px solid rgba(240,192,64,0.2)',
        borderRadius: '20px', padding: '2.5rem',
        marginBottom: '1.5rem', position: 'relative', overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
      }}>
        {/* Top shine */}
        <div style={{
          position: 'absolute', top: 0, left: '20%',
          width: '60%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(240,192,64,0.5), transparent)'
        }} />
        {/* Glow orb */}
        <div style={{
          position: 'absolute', top: '-50px', right: '-50px',
          width: '250px', height: '250px', borderRadius: '50%',
          background: `radial-gradient(circle, ${rec.glow} 0%, transparent 70%)`
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--border)',
          borderRadius: '6px', padding: '0.3rem 0.8rem',
          fontSize: '0.7rem', color: 'var(--text3)',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          marginBottom: '1.25rem', fontFamily: 'var(--font-mono)'
        }}>
          ✓ Review Complete · {new Date().toLocaleDateString()}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.3rem, 3vw, 2rem)',
          fontWeight: '400', fontStyle: 'italic',
          marginBottom: '1rem', lineHeight: '1.3',
          color: 'var(--text)', maxWidth: '600px'
        }}>{review.title}</h2>

        <p style={{
          color: 'var(--text2)', lineHeight: '1.85',
          marginBottom: '2rem', fontSize: '0.92rem', maxWidth: '580px'
        }}>{review.summary}</p>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <p style={{ color: 'var(--text3)', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>Overall Score</p>
            <ScoreBadge score={review.overallScore} large />
          </div>
          <div>
            <p style={{ color: 'var(--text3)', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>Decision</p>
            <span style={{
              background: `${rec.glow}`,
              color: rec.color,
              border: `1px solid ${rec.color}44`,
              borderRadius: '8px', padding: '0.45rem 1.2rem',
              fontWeight: '800', fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
              boxShadow: `0 0 20px ${rec.glow}`
            }}>{rec.icon} {rec.label}</span>
          </div>
        </div>
      </div>

      {/* Section scores mini bar */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '0.75rem', marginBottom: '1.5rem'
      }}>
        {sections.map(s => {
          const score = review.sections[s.key].score
          const color = score >= 7 ? 'var(--green)' : score >= 5 ? 'var(--gold)' : 'var(--red)'
          return (
            <div key={s.key} style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border)',
              borderRadius: '12px', padding: '1rem 0.75rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>{s.icon}</div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '1.1rem',
                fontWeight: '700', color,
                textShadow: `0 0 10px ${color}`
              }}>{score}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text3)', marginTop: '0.2rem' }}>{s.title}</div>
            </div>
          )
        })}
      </div>

      {/* Detailed sections */}
      <h3 style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: '600',
        color: 'var(--text3)', marginBottom: '1rem',
        textTransform: 'uppercase', letterSpacing: '0.12em'
      }}>// Detailed Analysis</h3>

      {sections.map(s => (
        <ReviewSection
          key={s.key} title={s.title} icon={s.icon}
          score={review.sections[s.key].score}
          feedback={review.sections[s.key].feedback}
        />
      ))}

      {/* Strengths & Weaknesses */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '1.5rem 0 1rem' }}>
        <div style={{
          background: 'rgba(0,255,136,0.03)',
          border: '1px solid rgba(0,255,136,0.15)',
          borderRadius: '14px', padding: '1.5rem'
        }}>
          <h4 style={{
            fontFamily: 'var(--font-mono)', color: 'var(--green)',
            marginBottom: '1rem', fontSize: '0.78rem',
            textTransform: 'uppercase', letterSpacing: '0.1em'
          }}>// Strengths</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {review.strengths.map((s, i) => (
              <li key={i} style={{
                color: 'var(--text2)', marginBottom: '0.6rem',
                fontSize: '0.87rem', lineHeight: '1.7',
                display: 'flex', gap: '0.6rem',
                animation: `slideInLeft 0.3s ease ${i * 0.1}s both`
              }}>
                <span style={{ color: 'var(--green)', flexShrink: 0, fontFamily: 'var(--font-mono)' }}>+</span> {s}
              </li>
            ))}
          </ul>
        </div>

        <div style={{
          background: 'rgba(255,71,87,0.03)',
          border: '1px solid rgba(255,71,87,0.15)',
          borderRadius: '14px', padding: '1.5rem'
        }}>
          <h4 style={{
            fontFamily: 'var(--font-mono)', color: 'var(--red)',
            marginBottom: '1rem', fontSize: '0.78rem',
            textTransform: 'uppercase', letterSpacing: '0.1em'
          }}>// Weaknesses</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {review.weaknesses.map((w, i) => (
              <li key={i} style={{
                color: 'var(--text2)', marginBottom: '0.6rem',
                fontSize: '0.87rem', lineHeight: '1.7',
                display: 'flex', gap: '0.6rem',
                animation: `slideInLeft 0.3s ease ${i * 0.1}s both`
              }}>
                <span style={{ color: 'var(--red)', flexShrink: 0, fontFamily: 'var(--font-mono)' }}>-</span> {w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggestions */}
      <div style={{
        background: 'rgba(240,192,64,0.03)',
        border: '1px solid rgba(240,192,64,0.15)',
        borderRadius: '14px', padding: '1.5rem'
      }}>
        <h4 style={{
          fontFamily: 'var(--font-mono)', color: 'var(--gold)',
          marginBottom: '1rem', fontSize: '0.78rem',
          textTransform: 'uppercase', letterSpacing: '0.1em'
        }}>// Suggestions for Improvement</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {review.suggestionsForImprovement.map((s, i) => (
            <li key={i} style={{
              color: 'var(--text2)', marginBottom: '0.75rem',
              fontSize: '0.87rem', lineHeight: '1.7',
              display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
              animation: `slideInLeft 0.3s ease ${i * 0.1}s both`
            }}>
              <span style={{
                background: 'rgba(240,192,64,0.15)',
                color: 'var(--gold)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem', fontWeight: '700',
                padding: '0.15rem 0.45rem', borderRadius: '4px',
                flexShrink: 0, marginTop: '2px'
              }}>{String(i + 1).padStart(2, '0')}</span>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ReviewReport