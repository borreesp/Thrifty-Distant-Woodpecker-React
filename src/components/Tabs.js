import React, { useState } from 'react'

const Tabs = ({ tabs = [], defaultActive }) => {
  const initialKey = defaultActive || (tabs.length > 0 ? tabs[0].key : '')
  const [activeKey, setActiveKey] = useState(initialKey)

  const activeTab = tabs.find((tab) => tab.key === activeKey) || tabs[0]

  return (
    <div className="wod-tabs space-y-4">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveKey(tab.key)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              tab.key === activeKey
                ? 'bg-[#FEE101] text-black border-[#FEE101] shadow-lg shadow-yellow-500/30'
                : 'bg-neutral-900 text-gray-200 border-neutral-800 hover:border-yellow-400 hover:text-yellow-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="wod-tab-panel rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 shadow-inner shadow-black/30 backdrop-blur-sm">
        {activeTab?.content}
      </div>
    </div>
  )
}

export default Tabs
