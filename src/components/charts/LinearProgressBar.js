import React from 'react'
import './charts.css'

const LinearProgressBar = ({ value = 0, label, color = '#FEC94F' }) => {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div className="progress-wrapper">
      {label && <div className="progress-label">{label}</div>}
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <div className="progress-value">{pct}%</div>
    </div>
  )
}

export default LinearProgressBar
