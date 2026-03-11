import { useRef, useState } from 'react'

function UploadPanel({ file, setFile }) {
  const inputRef = useRef()
  const [dragging, setDragging] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped?.type === 'application/pdf') setFile(dropped)
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onClick={() => inputRef.current.click()}
      style={{
        border: `1px dashed ${file ? 'rgba(240,192,64,0.6)' : dragging ? 'rgba(0,229,255,0.6)' : 'rgba(255,255,255,0.12)'}`,
        borderRadius: '16px',
        padding: '2.5rem',
        textAlign: 'center',
        cursor: 'none',
        marginBottom: '1.5rem',
        background: file
          ? 'rgba(240,192,64,0.04)'
          : dragging
            ? 'rgba(0,229,255,0.04)'
            : 'rgba(255,255,255,0.01)',
        transition: 'all 0.3s',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: dragging ? '0 0 30px rgba(0,229,255,0.1), inset 0 0 30px rgba(0,229,255,0.05)' : 'none'
      }}>
      <input ref={inputRef} type="file" accept=".pdf" style={{ display: 'none' }}
        onChange={(e) => setFile(e.target.files[0])} />

      {file ? (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          <div style={{
            width: '60px', height: '60px', margin: '0 auto 1rem',
            background: 'linear-gradient(135deg, rgba(240,192,64,0.2), rgba(240,192,64,0.1))',
            border: '1px solid rgba(240,192,64,0.4)',
            borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem',
            boxShadow: '0 0 20px rgba(240,192,64,0.2)'
          }}>📄</div>
          <p style={{ fontWeight: '700', color: 'var(--text)', marginBottom: '0.3rem', fontSize: '0.95rem' }}>{file.name}</p>
          <p style={{ color: 'var(--text3)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
            {(file.size / 1024 / 1024).toFixed(2)} MB · PDF · Click to change
          </p>
        </div>
      ) : (
        <div>
          <div style={{
            width: '60px', height: '60px', margin: '0 auto 1.25rem',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.6rem',
            transition: 'all 0.3s',
            boxShadow: dragging ? '0 0 20px rgba(0,229,255,0.3)' : 'none'
          }}>⬆</div>
          <p style={{ fontWeight: '600', color: 'var(--text)', marginBottom: '0.4rem' }}>
            {dragging ? 'Drop it!' : 'Drop your PDF here'}
          </p>
          <p style={{ color: 'var(--text3)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
            or click to browse · max 10MB
          </p>
        </div>
      )}
    </div>
  )
}

export default UploadPanel