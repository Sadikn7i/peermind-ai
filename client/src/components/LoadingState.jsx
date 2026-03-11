import { useEffect, useState } from 'react'

function LoadingState() {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const steps = [
    { text: 'Extracting paper content', icon: '📄', color: 'var(--gold)' },
    { text: 'Parsing methodology', icon: '🔬', color: 'var(--cyan)' },
    { text: 'Evaluating originality', icon: '💡', color: 'var(--purple)' },
    { text: 'Scoring contributions', icon: '🎯', color: 'var(--green)' },
    { text: 'Generating report', icon: '⚡', color: 'var(--gold)' },
  ]

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStep(s => s < steps.length - 1 ? s + 1 : s)
    }, 3000)
    const progInterval = setInterval(() => {
      setProgress(p => p < 95 ? p + 0.5 : p)
    }, 150)
    return () => { clearInterval(stepInterval); clearInterval(progInterval) }
  }, [])

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '4rem 2rem', animation: 'fadeIn 0.5s ease',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Background orbs */}
      <div style={{
        position: 'absolute', width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(240,192,64,0.05) 0%, transparent 70%)',
        animation: 'float 6s ease infinite'
      }} />

      {/* Spinning rings */}
      <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '3rem' }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '1px solid rgba(240,192,64,0.1)',
          borderTop: '2px solid var(--gold)',
          animation: 'spin 1s linear infinite',
          boxShadow: '0 0 20px rgba(240,192,64,0.3)'
        }} />
        <div style={{
          position: 'absolute', inset: '12px', borderRadius: '50%',
          border: '1px solid rgba(0,229,255,0.1)',
          borderTop: '2px solid var(--cyan)',
          animation: 'spin 1.5s linear infinite reverse'
        }} />
        <div style={{
          position: 'absolute', inset: '24px', borderRadius: '50%',
          border: '1px solid rgba(168,85,247,0.1)',
          borderTop: '2px solid var(--purple)',
          animation: 'spin 2s linear infinite'
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2rem'
        }}>🔬</div>
      </div>

      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '2.5rem', fontWeight: '400',
        marginBottom: '0.5rem', fontStyle: 'italic',
        background: 'linear-gradient(90deg, var(--gold), var(--cyan))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
      }}>Analyzing Your Paper</h2>

      <p style={{ color: 'var(--text3)', marginBottom: '3rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
        AI peer review in progress...
      </p>

      {/* Progress bar */}
      <div style={{
        width: '100%', maxWidth: '400px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '999px', height: '4px',
        marginBottom: '2.5rem', overflow: 'hidden',
        border: '1px solid var(--border)'
      }}>
        <div style={{
          height: '100%', borderRadius: '999px',
          background: 'linear-gradient(90deg, var(--gold), var(--cyan))',
          width: `${progress}%`,
          transition: 'width 0.3s ease',
          boxShadow: '0 0 10px rgba(240,192,64,0.5)'
        }} />
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%', maxWidth: '360px' }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            padding: '0.6rem 1rem',
            borderRadius: '8px',
            background: i === step ? 'rgba(255,255,255,0.04)' : 'transparent',
            border: `1px solid ${i === step ? 'rgba(255,255,255,0.08)' : 'transparent'}`,
            transition: 'all 0.3s',
            animation: i <= step ? `slideInLeft 0.3s ease ${i * 0.1}s both` : 'none'
          }}>
            <span style={{ fontSize: '1rem' }}>{s.icon}</span>
            <span style={{
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              color: i < step ? 'var(--green)' : i === step ? s.color : 'var(--text3)',
              transition: 'color 0.3s'
            }}>{s.text}</span>
            {i < step && <span style={{ marginLeft: 'auto', color: 'var(--green)', fontSize: '0.8rem' }}>✓</span>}
            {i === step && <span style={{ marginLeft: 'auto', color: s.color, fontSize: '0.7rem', animation: 'blink 1s infinite', fontFamily: 'var(--font-mono)' }}>...</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoadingState