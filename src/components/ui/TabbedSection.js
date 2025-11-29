import React, { useState } from 'react'
import './TabbedSection.css'

const TabbedSection = ({ tabs = [], initialId, renderContent }) => {
  const [active, setActive] = useState(initialId || (tabs[0] && tabs[0].id))

  return (
    <div className="tabbed-container">
      <div className="tab-list">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-chip ${tab.id === active ? 'active' : ''}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-panel">{renderContent(active)}</div>
    </div>
  )
}

export default TabbedSection
