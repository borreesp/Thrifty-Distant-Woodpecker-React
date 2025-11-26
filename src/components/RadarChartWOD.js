import React from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'

const RadarChartWOD = ({ data = [], color = '#FEE101' }) => {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 shadow-inner shadow-black/40">
      <div className="h-80 w-full">
        <ResponsiveContainer>
          <RadarChart data={data} outerRadius="80%">
            <PolarGrid stroke="#1f2937" />
            <PolarAngleAxis
              dataKey="label"
              tick={{ fill: '#e5e7eb', fontSize: 12 }}
            />
            <PolarRadiusAxis angle={45} domain={[0, 100]} tick={false} />
            <Radar
              dataKey="value"
              stroke={color}
              fill={color}
              fillOpacity={0.25}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RadarChartWOD
