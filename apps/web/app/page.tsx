"use client";
import React from "react";
import { Button, Card, Metric, Section } from "@thrifty/ui";

const weeklyLoad = [
  { label: "L", value: 72, tone: "bg-blue-500" },
  { label: "M", value: 65, tone: "bg-indigo-500" },
  { label: "X", value: 50, tone: "bg-emerald-500" },
  { label: "J", value: 80, tone: "bg-orange-500" },
  { label: "V", value: 30, tone: "bg-slate-500" },
  { label: "S", value: 95, tone: "bg-rose-500" },
  { label: "D", value: 20, tone: "bg-slate-600" }
];

const quickActions = [
  { label: "Analizar WOD", hint: "Carga estimada y fatiga", href: "/wod-analysis" },
  { label: "Historial", hint: "Tus ultimas sesiones", href: "/workouts" },
  { label: "Atleta", hint: "Perfil y progreso", href: "/athlete" }
];

const suggestions = [
  {
    title: "Descanso activo",
    detail: "Z2 30-40 min + movilidad. Reduce fatiga acumulada.",
    cta: "Iniciar",
    accent: "from-emerald-500/60 to-emerald-400/30"
  },
  {
    title: "PR Assault Bike",
    detail: "2 x (10:00) tempo 75% + 2 x 2:00 sprint.",
    cta: "Planificar",
    accent: "from-cyan-500/60 to-indigo-500/30"
  }
];

const capacityHex = [
  { label: "Fuerza", value: 82 },
  { label: "Resistencia", value: 74 },
  { label: "Tecnica", value: 68 },
  { label: "Movilidad", value: 60 },
  { label: "Mentalidad", value: 88 },
  { label: "Recuperacion", value: 72 }
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header className="overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 shadow-xl ring-1 ring-white/5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Modo carrera</p>
            <h1 className="mt-1 text-3xl font-semibold text-white">¡Vamos, atleta!</h1>
            <p className="mt-2 text-slate-300">Nivel 12 · Challenger · Ultimo logro: Sprint Hyrox</p>
          </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" href="/wod-analysis">
            Analizar un WOD
          </Button>
          <Button variant="ghost" href="/workouts">
            Ver historial
          </Button>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Metric label="XP total" value="12 480" hint="72% al siguiente nivel" />
          <Metric label="Sesiones semana" value="5" hint="+2 vs pasada" />
          <Metric label="Carga 7d" value="7.2 h" hint="Objetivo: 8 h" />
        </div>
      </header>

      <Section title="Estado rapido" description="Energía, fatiga y proximas acciones.">
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="bg-slate-900/60 ring-1 ring-white/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Recuperacion</p>
                <p className="text-2xl font-semibold text-emerald-300">Óptima</p>
                <p className="text-sm text-slate-400">Listo para intensidad moderada</p>
              </div>
              <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-emerald-500/40 to-emerald-300/30 p-3">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900 text-lg font-semibold text-emerald-200">
                  88%
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-sm text-slate-300">
              <div className="rounded-lg bg-slate-800/70 p-3">
                <p className="text-xs text-slate-400">HRV</p>
                <p className="font-semibold">78 ms</p>
              </div>
              <div className="rounded-lg bg-slate-800/70 p-3">
                <p className="text-xs text-slate-400">Sueño</p>
                <p className="font-semibold">7.4 h</p>
              </div>
              <div className="rounded-lg bg-slate-800/70 p-3">
                <p className="text-xs text-slate-400">Fatiga</p>
                <p className="font-semibold text-amber-300">Media</p>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900/60 ring-1 ring-white/5">
            <p className="text-sm text-slate-400">Capacidades</p>
            <div className="relative mt-3 grid place-items-center">
              <div className="relative h-56 w-56">
                <div className="absolute inset-0 rotate-30 rounded-[28%] bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 blur" />
                <div className="absolute inset-4 rounded-[28%] border border-cyan-500/30" />
                <div className="absolute inset-8 rounded-[28%] border border-indigo-500/30" />
                <div className="absolute inset-12 rounded-[28%] border border-emerald-500/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-sm text-slate-200">
                    <p className="text-lg font-semibold text-cyan-200">Perfil híbrido</p>
                    <p className="text-slate-400">Hover: últimas 4 semanas</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
              {capacityHex.map((c) => (
                <div key={c.label} className="flex items-center justify-between rounded-lg bg-slate-800/70 px-3 py-2">
                  <span>{c.label}</span>
                  <span className="font-semibold text-cyan-200">{c.value}%</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-slate-900/60 ring-1 ring-white/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Carga semanal</p>
                <p className="text-xl font-semibold text-white">Distribución 7d</p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">ZS2–ZS4</span>
            </div>
            <div className="mt-4 flex items-end gap-2">
              {weeklyLoad.map((d) => (
                <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
                  <div className={`w-full rounded-full ${d.tone}`} style={{ height: `${Math.max(16, d.value * 0.9)}px` }} />
                  <span className="text-xs text-slate-400">{d.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section title="Sugerencias destacadas" description="Acciones concretas según tu estado.">
        <div className="grid gap-4 md:grid-cols-2">
          {suggestions.map((s) => (
            <div
              key={s.title}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${s.accent} p-5 ring-1 ring-white/10`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.12em] text-white/70">Recomendado</p>
                  <h3 className="text-xl font-semibold text-white">{s.title}</h3>
                  <p className="mt-1 text-sm text-white/80">{s.detail}</p>
                </div>
                <Button variant="ghost" size="sm">
                  {s.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Accesos rapidos" description="Entra directo a lo que importa.">
        <div className="grid gap-3 md:grid-cols-3">
          {quickActions.map((action) => (
            <Card
              key={action.label}
              className="group flex cursor-pointer items-center justify-between rounded-xl border border-white/5 bg-slate-900/50 px-4 py-3 transition hover:border-cyan-400/50 hover:bg-slate-800/80"
              href={action.href}
            >
              <div>
                <p className="text-sm font-semibold text-white">{action.label}</p>
                <p className="text-xs text-slate-400">{action.hint}</p>
              </div>
              <span className="text-cyan-300 transition group-hover:translate-x-1">→</span>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
