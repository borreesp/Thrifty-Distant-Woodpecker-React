import React from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'

import './charts.css'

const HexRadarChart = ({ data = [], stroke = '#1FB6FF', fill = '#1FB6FF', max = 100 }) => {
  const formatted = data.map((item) => ({
    ...item,
    full: max,
  }))

  return (
    <div className="chart-card hex-radar">
      <ResponsiveContainer width="100%" height={320}>
        <RadarChart data={formatted} outerRadius="80%">
          <PolarGrid strokeOpacity={0.2} />
          <PolarAngleAxis dataKey="label" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
          <PolarRadiusAxis angle={90} domain={[0, max]} tick={false} axisLine={false} />
          <Radar
            name="capabilities"
            dataKey="value"
            stroke={stroke}
            fill={fill}
            fillOpacity={0.25}
            strokeWidth={2}
            isAnimationActive
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default HexRadarChart
