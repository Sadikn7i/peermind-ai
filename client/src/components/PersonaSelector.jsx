function PersonaSelector({ persona, setPersona }) {
  const personas = [
    { id: 'constructive', label: 'Constructive', desc: 'Balanced', icon: '🤝', color: 'var(--cyan)' },
    { id: 'strict', label: 'Strict', desc: 'Rigorous', icon: '🔬', color: 'var(--red)' },
    { id: 'expert', label: 'Expert', desc: 'Technical', icon: '🎓', color: 'var(--purple)' }
  ]

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <p style={{
        marginBottom: '0.75rem', fontWeight: '600',
        color: 'var(--text3)', fontSize: '0.72rem',
        textTransform: 'uppercase', letterSpacing: '0.12em',
        fontFamily: 'var(--font-mono)'
      }}>// Select Reviewer Persona</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
        {personas.map(p => (
          <div
            key={p.id}
            onClick={() => setPersona(p.id)}
            style={{
              padding: '1rem 0.75rem',
              border: `1px solid ${persona === p.id ? p.color : 'var(--border)'}`,
              borderRadius: '12px',
              cursor: 'none',
              background: persona === p.id ? `rgba(${p.color === 'var(--cyan)' ? '0,229,255' : p.color === 'var(--red)' ? '255,71,87' : '168,85,247'},0.08)` : 'rgba(255,255,255,0.02)',
              transition: 'all 0.25s',
              textAlign: 'center',
              boxShadow: persona === p.id ? `0 0 20px ${p.color}33` : 'none'
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{p.icon}</div>
            <p style={{
              fontWeight: '700', fontSize: '0.82rem', marginBottom: '0.15rem',
              color: persona === p.id ? p.color : 'var(--text)'
            }}>{p.label}</p>
            <p style={{ fontSize: '0.68rem', color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PersonaSelector