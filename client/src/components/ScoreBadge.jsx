function ScoreBadge({ score, large }) {
  const color = score >= 7 ? 'var(--green)' : score >= 5 ? 'var(--gold)' : 'var(--red)'
  const glow = score >= 7 ? 'rgba(0,255,136,0.3)' : score >= 5 ? 'rgba(240,192,64,0.3)' : 'rgba(255,71,87,0.3)'
  const bg = score >= 7 ? 'rgba(0,255,136,0.08)' : score >= 5 ? 'rgba(240,192,64,0.08)' : 'rgba(255,71,87,0.08)'
  const border = score >= 7 ? 'rgba(0,255,136,0.25)' : score >= 5 ? 'rgba(240,192,64,0.25)' : 'rgba(255,71,87,0.25)'

  return (
    <span style={{
      background: bg, color,
      fontWeight: '700',
      fontSize: large ? '1.2rem' : '0.82rem',
      padding: large ? '0.5rem 1.2rem' : '0.22rem 0.7rem',
      borderRadius: '8px',
      border: `1px solid ${border}`,
      fontFamily: 'var(--font-mono)',
      letterSpacing: '0.05em',
      boxShadow: `0 0 12px ${glow}`
    }}>
      {score}/10
    </span>
  )
}

export default ScoreBadge