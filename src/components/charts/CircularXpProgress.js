import React from 'react'
import './charts.css'

const CircularXpProgress = ({ value = 0, size = 120, stroke = 10, color = '#FEC94F' }) => {
  const pct = Math.max(0, Math.min(100, value))
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (pct / 100) * circumference

  return (
    <div className="circular-wrapper" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="circular-svg">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="circular-anim"
        />
      </svg>
      <div className="circular-center">
        <div className="circular-value">{pct}%</div>
        <div className="circular-sub">XP</div>
      </div>
    </div>
  )
}

export default CircularXpProgress
