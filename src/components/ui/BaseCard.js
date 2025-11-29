import React from 'react'
import './BaseCard.css'

const BaseCard = ({ children, className = '' }) => {
  return <div className={`base-card ${className}`}>{children}</div>
}

export default BaseCard
