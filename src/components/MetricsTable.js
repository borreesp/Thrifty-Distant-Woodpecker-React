import React from 'react'

const MetricsTable = ({ metrics = [] }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-inner shadow-black/40">
      <table className="w-full text-sm text-gray-100">
        <tbody>
          {metrics.map((metric) => (
            <tr
              key={metric.label}
              className="odd:bg-neutral-950 even:bg-neutral-900 border-b border-neutral-800/60 last:border-b-0"
            >
              <td className="px-4 py-3 font-semibold text-gray-200">
                {metric.label}
              </td>
              <td className="px-4 py-3 text-right text-gray-300">
                {metric.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MetricsTable
