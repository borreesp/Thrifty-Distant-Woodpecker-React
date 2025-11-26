import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const HyroxStationsChart = ({ data = [] }) => {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 shadow-inner shadow-black/40">
      <div className="h-80 w-full">
        <ResponsiveContainer>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 8, right: 16, bottom: 8, left: 16 }}
            barCategoryGap={12}
          >
            <XAxis
              type="number"
              domain={[0, 100]}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey="station"
              width={120}
              tick={{ fill: '#e5e7eb', fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: 'rgba(255, 225, 1, 0.08)' }}
              contentStyle={{
                background: '#0b0b0b',
                border: '1px solid #27272a',
                borderRadius: '12px',
              }}
            />
            <Bar
              dataKey="transfer"
              fill="#FEE101"
              radius={[0, 8, 8, 0]}
              maxBarSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default HyroxStationsChart
