import React from 'react'

const WeekPlan = ({ days = [] }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {days.map((day) => (
        <div
          key={day.day}
          className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 shadow-inner shadow-black/30"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-yellow-400">{day.day}</p>
            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-200">
              {day.focus}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-300">{day.description}</p>
        </div>
      ))}
    </div>
  )
}

export default WeekPlan
