"use client";
import React from "react";
import { motion } from "framer-motion";

const axes = ["Fuerza", "Cardio", "Potencia", "Tecnica", "Movilidad", "Mentalidad"];

export const AthleteRadar: React.FC<{ values: number[]; caption?: string }> = ({ values, caption }) => {
  const normalized = axes.map((axis, idx) => ({ label: axis, value: values[idx] ?? 50 }));
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl bg-slate-900/70 p-4 ring-1 ring-white/5"
    >
      <p className="text-sm text-slate-300">Capacidades fisicas</p>
      <div className="mt-3 grid gap-4 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-xl bg-slate-900/80 p-6">
          <div className="relative h-56 w-56">
            <div className="absolute inset-0 rotate-30 rounded-[32%] border border-cyan-500/30" />
            <div className="absolute inset-3 rotate-45 rounded-[32%] border border-indigo-500/20" />
            <div className="absolute inset-6 rotate-60 rounded-[32%] border border-emerald-500/20" />
            <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-200">Radar indicativo</div>
          </div>
        </div>
        <div className="space-y-2 text-sm text-slate-200">
          {normalized.map((entry) => (
            <div key={entry.label} className="flex items-center justify-between gap-3 rounded-lg bg-white/5 px-3 py-2">
              <span>{entry.label}</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full bg-cyan-400" style={{ width: `${entry.value}%` }} />
                </div>
                <span className="text-cyan-200">{entry.value}%</span>
              </div>
            </div>
          ))}
          {caption && <p className="pt-2 text-xs text-slate-400">{caption}</p>}
        </div>
      </div>
    </motion.div>
  );
};
