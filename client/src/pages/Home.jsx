import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import UploadPanel from '../components/UploadPanel'
import PersonaSelector from '../components/PersonaSelector'
import LoadingState from '../components/LoadingState'
import { submitPaperForReview } from '../services/api'

function Particle({ style }) {
  return <div style={{
    position: 'absolute',
    width: '4px', height: '4px',
    borderRadius: '50%',
    background: 'var(--gold)',
    animation: `particle ${2 + Math.random() * 3}s ease-out infinite`,
    animationDelay: `${Math.random() * 3}s`,
    ...style
  }} />
}

function Home() {
  const [file, setFile] = useState(null)
  const [persona, setPersona] = useState('constructive')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [hoverBtn, setHoverBtn] = useState(false)
  const navigate = useNavigate()
  const cursorRef = useRef()
  const cursorRingRef = useRef()

  useEffect(() => {
    const move = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
      if (cursorRingRef.current) {
        setTimeout(() => {
          cursorRingRef.current.style.left = e.clientX + 'px'
          cursorRingRef.current.style.top = e.clientY + 'px'
        }, 80)
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  const handleSubmit = async () => {
    if (!file) return setError('Please upload a PDF file first')
    setError(null)
    setLoading(true)
    try {
      const data = await submitPaperForReview(file, persona)
      navigate('/review', { state: { review: data.review } })
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingState />

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Custom cursor */}
      <div ref={cursorRef} className="cursor" />
      <div ref={cursorRingRef} className="cursor-ring" />

      {/* Ambient background orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <div style={{
          position: 'absolute', width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240,192,64,0.06) 0%, transparent 70%)',
          top: '-200px', left: '50%', transform: 'translateX(-50%)',
          animation: 'float 8s ease infinite'
        }} />
        <div style={{
          position: 'absolute', width: '400px', height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)',
          bottom: '10%', right: '10%',
          animation: 'float 10s ease infinite reverse'
        }} />
        <div style={{
          position: 'absolute', width: '300px', height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 70%)',
          top: '40%', left: '5%',
          animation: 'float 12s ease infinite'
        }} />
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Hero Section */}
      <div style={{
        position: 'relative', zIndex: 1,
        textAlign: 'center',
        padding: '6rem 2rem 2rem',
        animation: 'fadeUp 0.8s ease'
      }}>

        {/* Top badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
          background: 'rgba(240,192,64,0.08)',
          border: '1px solid rgba(240,192,64,0.25)',
          borderRadius: '999px',
          padding: '0.5rem 1.5rem',
          marginBottom: '2.5rem',
          animation: 'borderGlow 3s ease infinite'
        }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text3)' }}>//</span>
          <span style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            Next-Gen AI Peer Review
          </span>
          <span style={{
            background: 'var(--gold)', color: 'var(--bg)',
            fontSize: '0.65rem', fontWeight: '800',
            padding: '0.15rem 0.5rem', borderRadius: '4px',
            fontFamily: 'var(--font-mono)'
          }}>BETA</span>
        </div>

        {/* Main heading */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
          fontWeight: '400',
          lineHeight: '1',
          marginBottom: '0.5rem',
          letterSpacing: '-0.03em',
          position: 'relative',
          display: 'inline-block'
        }}>
          <span style={{ display: 'block', color: 'var(--text)' }}>Academic</span>
          <span style={{
            display: 'block',
            fontStyle: 'italic',
            background: 'linear-gradient(90deg, #f0c040 0%, #ffd700 30%, #00e5ff 60%, #a855f7 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientShift 4s ease infinite'
          }}>Review</span>
          <span style={{ display: 'block', color: 'var(--text)' }}>Redefined.</span>
        </h1>

        <p style={{
          fontSize: '1.1rem',
          color: 'var(--text2)',
          maxWidth: '500px',
          margin: '2rem auto',
          lineHeight: '1.9',
          fontWeight: '400',
          animation: 'fadeUp 0.8s ease 0.2s both'
        }}>
          Upload your manuscript. Our AI delivers rigorous, structured peer review in under 30 seconds.
        </p>

        {/* Stats */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '0',
          margin: '3rem auto',
          maxWidth: '600px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          overflow: 'hidden',
          animation: 'fadeUp 0.8s ease 0.4s both'
        }}>
          {[
            { val: '<30s', label: 'Review Time', color: 'var(--gold)' },
            { val: '5', label: 'Review Criteria', color: 'var(--cyan)' },
            { val: '10pt', label: 'Scoring Scale', color: 'var(--purple)' },
            { val: '∞', label: 'Paper Length', color: 'var(--green)' },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1,
              padding: '1.5rem 1rem',
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
              textAlign: 'center'
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.6rem',
                fontWeight: '700',
                color: s.color,
                marginBottom: '0.25rem',
                textShadow: `0 0 20px ${s.color}`
              }}>{s.val}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main upload card */}
      <div style={{
        maxWidth: '680px', margin: '0 auto', padding: '0 2rem 8rem',
        position: 'relative', zIndex: 1,
        animation: 'fadeUp 0.8s ease 0.5s both'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(240,192,64,0.2)',
          borderRadius: '24px',
          padding: '2.5rem',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Card glow top */}
          <div style={{
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
            width: '80%', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(240,192,64,0.6), transparent)'
          }} />

          <UploadPanel file={file} setFile={setFile} />
          <PersonaSelector persona={persona} setPersona={setPersona} />

          {error && (
            <div style={{
              background: 'var(--red-dim)',
              border: '1px solid rgba(255,71,87,0.3)',
              borderRadius: '10px',
              padding: '0.85rem 1rem',
              color: 'var(--red)',
              fontSize: '0.85rem',
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-mono)',
              display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}>
              <span>⚠</span> {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            onMouseEnter={() => setHoverBtn(true)}
            onMouseLeave={() => setHoverBtn(false)}
            style={{
              width: '100%', padding: '1.1rem',
              background: hoverBtn
                ? 'linear-gradient(135deg, #ffd700, #f0c040, #00e5ff)'
                : 'linear-gradient(135deg, #f0c040, #ffd700)',
              backgroundSize: '200% auto',
              color: '#02030a',
              border: 'none', borderRadius: '12px',
              fontSize: '1rem', fontWeight: '800',
              cursor: 'none', letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-body)',
              boxShadow: hoverBtn
                ? '0 8px 40px rgba(240,192,64,0.5), 0 0 80px rgba(240,192,64,0.2)'
                : '0 4px 20px rgba(240,192,64,0.25)',
              transform: hoverBtn ? 'translateY(-2px) scale(1.01)' : 'translateY(0) scale(1)',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}>
            Generate Peer Review →
          </button>

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '1.5rem', marginTop: '1.25rem'
          }}>
            {['🔒 Secure', '⚡ Fast', '🎯 Accurate'].map(tag => (
              <span key={tag} style={{
                fontSize: '0.75rem', color: 'var(--text3)',
                fontFamily: 'var(--font-mono)'
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home