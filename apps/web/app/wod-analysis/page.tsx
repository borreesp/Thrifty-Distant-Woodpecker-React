"use client";
import React, { useMemo } from "react";
import { Card, Section, Button } from "@thrifty/ui";
import { BarLevelChart } from "../../components/charts/BarLevelChart";
import { HexRadarChart } from "../../components/charts/HexRadarChart";
import { LinearProgressBar } from "../../components/charts/LinearProgressBar";
import { TabbedSection } from "../../components/ui/TabbedSection";

const summaryData = {
  domain: "Mixed",
  intensity: "Alta",
  muscles: ["Piernas", "Core", "Hombros", "Posterior", "Grip"],
  athlete: "Favorece motor aerobico, potencia en tren inferior y skill estable.",
  transfer: "Alta",
  wodType: "Intervalos mixtos con carga"
};

const timesByLevel = {
  Beginner: { value: 20.5, range: "18-21 min", notes: "Pace constante, breaks frecuentes" },
  Intermedio: { value: 17, range: "15-18 min", notes: "Romper wall balls en 3 bloques" },
  RX: { value: 13.5, range: "12-14 min", notes: "Transitions rapidas" },
  Competidor: { value: 11, range: "10-11:30 min", notes: "Splits negativos" }
};

const radarData = [
  { label: "Fuerza", value: 72 },
  { label: "Endurance", value: 88 },
  { label: "Velocidad", value: 65 },
  { label: "Skill", value: 70 },
  { label: "Metcon", value: 85 },
  { label: "Carga", value: 78 }
];

const capacityNotes = [
  { title: "Fuerza", copy: "Cargas medias con alta densidad de repeticiones." },
  { title: "Endurance", copy: "Runs repetidos exigen control de ritmo y respiracion nasal." },
  { title: "Velocidad", copy: "Cierres agresivos si la tecnica se mantiene estable." },
  { title: "Skill", copy: "Toes to bar y BBJO requieren eficiencia tecnica." },
  { title: "Metcon", copy: "Bloque mixto continuo con pocas pausas." },
  { title: "Carga", copy: "Fatiga acumulada en cuadriceps, gluteo y grip." }
];

const hyroxStations = [
  { station: "SkiErg", transfer: 76, tip: "Cadencia estable" },
  { station: "Sled Push", transfer: 82, tip: "Empuje constante" },
  { station: "Sled Pull", transfer: 74, tip: "Mantener traccion" },
  { station: "Farmers Carry", transfer: 69, tip: "Control de grip" },
  { station: "Burpee Broad Jump", transfer: 71, tip: "Respiracion nasal" },
  { station: "Row", transfer: 68, tip: "Cadencia 24-26" },
  { station: "Sandbag Lunges", transfer: 86, tip: "Pace uniforme" },
  { station: "Wall Balls", transfer: 92, tip: "Bloques 15-15-10" }
];

const notes = [
  { title: "Pacing", copy: "Salidas controladas, splits negativos en cada run." },
  { title: "Breaks", copy: "Wall balls 15-15-10, deadlifts 10-10-10, BBJO en parejas." },
  { title: "Objetivo", copy: "Atleta con motor aerobico solido y skill eficiente." }
];

const wodText = `FOR TIME
1000m run
50 wall balls @ 9/6kg
30 deadlifts @ 80/55kg
25 burpee box jump overs 24/20"
800m run
20 toes to bar
20 kettlebell lunges @ 24/16kg
600m run`;

const equipment = [
  { name: "Zapatillas hibridas", detail: "Traccion para sled y estabilidad en levantamientos." },
  { name: "Cinturon ligero", detail: "Soporte lumbar en deadlifts sin perder movilidad." },
  { name: "Rodilleras compresivas", detail: "Proteccion para lunges y wall balls largos." },
  { name: "Magnesio liquido", detail: "Grip estable en BBJO y KB lunges." }
];

const similarWods = [
  { name: "Engine Builder 2.0", focus: "Z2 + cargas medias", duration: "38 min" },
  { name: "Quads On Fire", focus: "Wall balls + run", duration: "22 min" },
  { name: "Grip & Go", focus: "Carrera + KB lunges", duration: "28 min" }
];

const weekPlan = [
  { day: "Lunes", focus: "Motor", description: "Z2 + tecnica run" },
  { day: "Miercoles", focus: "Strength", description: "Lower + accesorios" },
  { day: "Viernes", focus: "HYROX", description: "Simulador estaciones" },
  { day: "Sabado", focus: "Metcon", description: "Intervalos mixtos" }
];

const social = [
  { user: "Alex", rating: "4.6", note: "Buen balance run/skill" },
  { user: "Ines", rating: "4.8", note: "Hyrox transfer alto" },
  { user: "Ruben", rating: "4.5", note: "Grip demandante" }
];

const TabTitle = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-slate-200">{children}</p>
);

export default function WodAnalysisPage() {
  const timesChart = useMemo(
    () =>
      Object.entries(timesByLevel).map(([label, info]) => ({
        label,
        value: info.value,
        range: info.range
      })),
    []
  );

  const tabs = [
    { id: "resumen", label: "Resumen" },
    { id: "hex", label: "Capacidades" },
    { id: "tecnicos", label: "Tecnicos" },
    { id: "hyrox", label: "HYROX" },
    { id: "material", label: "Material" },
    { id: "wods", label: "WODs / Semana" },
    { id: "social", label: "Social" }
  ];

  const renderTab = (active: string) => {
    switch (active) {
      case "resumen":
        return (
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="bg-slate-900/70 p-4 ring-1 ring-white/5">
                <h3 className="text-white font-semibold">Dominio energetico</h3>
                <p className="text-sm text-slate-300">{summaryData.domain}</p>
                <p className="text-xs text-slate-400">Intensidad {summaryData.intensity}</p>
              </Card>
              <Card className="bg-slate-900/70 p-4 ring-1 ring-white/5">
                <h3 className="text-white font-semibold">Musculos principales</h3>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-200">
                  {summaryData.muscles.map((m) => (
                    <span key={m} className="rounded-full border border-amber-200/40 bg-amber-200/10 px-3 py-1 text-amber-100">
                      {m}
                    </span>
                  ))}
                </div>
              </Card>
              <Card className="bg-slate-900/70 p-4 ring-1 ring-white/5">
                <h3 className="text-white font-semibold">Atleta favorecido</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{summaryData.athlete}</p>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <TabTitle>Tiempo estimado por nivel</TabTitle>
                <BarLevelChart data={timesChart} color="#22d3ee" />
                <div className="mt-3 grid gap-2 text-xs text-slate-300">
                  {Object.entries(timesByLevel).map(([label, info]) => (
                    <div key={label} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                      <span>{label}</span>
                      <span className="text-cyan-200">{info.range}</span>
                      <span className="text-slate-400">{info.notes}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Card className="bg-slate-900/70 p-4 ring-1 ring-white/5 text-sm text-slate-200">
                <p className="font-semibold text-white">Notas rapidas</p>
                <div className="mt-3 grid gap-3">
                  {notes.map((n) => (
                    <div key={n.title} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <p className="text-xs uppercase tracking-wide text-amber-300">{n.title}</p>
                      <p className="text-sm text-slate-200">{n.copy}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            <Card className="bg-slate-900/70 p-4 ring-1 ring-white/5 text-sm text-slate-200 whitespace-pre-line">{wodText}</Card>
          </div>
        );
      case "hex":
        return (
          <div className="grid gap-4 lg:grid-cols-2">
            <HexRadarChart data={radarData} stroke="#22d3ee" fill="#22d3ee" />
            <Card className="bg-slate-900/70 p-4 ring-1 ring-white/5 text-sm text-slate-200">
              <p className="font-semibold text-white">Capacidades y notas</p>
              <div className="mt-3 space-y-2">
                {capacityNotes.map((c) => (
                  <div key={c.title} className="rounded-lg bg-white/5 px-3 py-2">
                    <p className="text-xs uppercase tracking-wide text-cyan-300">{c.title}</p>
                    <p className="text-sm text-slate-200">{c.copy}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );
      case "tecnicos":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-slate-900/70 p-4 ring-1 ring-white/5 text-sm text-slate-200">
              <p className="font-semibold text-white">Metricas de carga</p>
              <div className="mt-3 space-y-2">
                <LinearProgressBar label="Volumen" value={78} color="#22d3ee" />
                <LinearProgressBar label="Densidad" value={72} color="#f59e0b" />
                <LinearProgressBar label="Fatiga local" value={68} color="#f97316" />
                <LinearProgressBar label="Skill" value={70} color="#38bdf8" />
              </div>
            </Card>
            <Card className="bg-slate-900/70 p-4 ring-1 ring-white/5 text-sm text-slate-200">
              <p className="font-semibold text-white">Plan de breaks y pacing</p>
              <ul className="mt-3 space-y-2">
                <li className="rounded-lg bg-white/5 px-3 py-2">Wall balls: 15-15-10</li>
                <li className="rounded-lg bg-white/5 px-3 py-2">Deadlifts: 3 x 10 con 10s de pausa</li>
                <li className="rounded-lg bg-white/5 px-3 py-2">BBJO: pareja con pacing constante</li>
                <li className="rounded-lg bg-white/5 px-3 py-2">Runs: split negativo, cadencia controlada</li>
              </ul>
            </Card>
          </div>
        );
      case "hyrox":
        return (
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="bg-slate-900/70 p-4 ring-1 ring-white/5 text-sm text-slate-200">
              <p className="font-semibold text-white">Transferencias por estacion</p>
              <div className="mt-3 space-y-2">
                {hyroxStations.map((h) => (
                  <div key={h.station} className="rounded-lg bg-white/5 px-3 py-2">
                    <div className="flex items-center justify-between text-sm text-white">
                      <span>{h.station}</span>
                      <span className="text-amber-200">{h.tip}</span>
                    </div>
                    <LinearProgressBar value={h.transfer} color="#f59e0b" variant="compact" />
                  </div>
                ))}
              </div>
            </Card>
            <Card className="bg-slate-900/70 p-4 ring-1 ring-white/5 text-sm text-slate-200">
              <p className="font-semibold text-white">Plan semanal HYROX</p>
              <div className="mt-3 grid gap-2">
                {weekPlan.map((d) => (
                  <div key={d.day} className="rounded-lg bg-white/5 px-3 py-2">
                    <p className="text-sm text-white">{d.day}</p>
                    <p className="text-xs text-slate-400">{d.focus}</p>
                    <p className="text-sm text-slate-200">{d.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );
      case "material":
        return (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {equipment.map((e) => (
              <Card key={e.name} className="bg-slate-900/70 p-4 ring-1 ring-white/5 text-sm text-slate-200">
                <p className="text-sm font-semibold text-white">{e.name}</p>
                <p className="text-xs text-slate-400">{e.detail}</p>
              </Card>
            ))}
          </div>
        );
      case "wods":
        return (
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="bg-slate-900/70 p-4 ring-1 ring-white/5 text-sm text-slate-200">
              <p className="font-semibold text-white">WODs similares</p>
              <div className="mt-3 space-y-2">
                {similarWods.map((w) => (
                  <div key={w.name} className="rounded-lg bg-white/5 px-3 py-2">
                    <p className="text-sm text-white">{w.name}</p>
                    <p className="text-xs text-slate-400">{w.focus}</p>
                    <p className="text-xs text-slate-300">{w.duration}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="bg-slate-900/70 p-4 ring-1 ring-white/5 text-sm text-slate-200">
              <p className="font-semibold text-white">Semana recomendada</p>
              <div className="mt-3 space-y-2">
                {weekPlan.map((d) => (
                  <div key={d.day} className="rounded-lg bg-white/5 px-3 py-2">
                    <p className="text-sm text-white">{d.day}</p>
                    <p className="text-xs text-slate-400">{d.focus}</p>
                    <p className="text-xs text-slate-300">{d.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );
      case "social":
        return (
          <Card className="bg-slate-900/70 p-4 ring-1 ring-white/5 text-sm text-slate-200">
            <p className="font-semibold text-white">Valoracion social</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              {social.map((s) => (
                <div key={s.user} className="rounded-lg bg-white/5 px-3 py-2">
                  <p className="text-sm text-white">{s.user}</p>
                  <p className="text-xs text-slate-400">Rating {s.rating}</p>
                  <p className="text-xs text-slate-300">{s.note}</p>
                </div>
              ))}
            </div>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <header className="overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 shadow-xl ring-1 ring-white/5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Analisis HYROX</p>
            <h1 className="text-3xl font-semibold text-white">WOD Analysis</h1>
            <p className="mt-1 text-slate-300">Tipo: {summaryData.wodType} · Intensidad {summaryData.intensity}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-300">
              <span className="rounded-full border border-cyan-500/40 bg-cyan-500/15 px-3 py-1 text-cyan-100">{summaryData.domain}</span>
              <span className="rounded-full border border-indigo-500/40 bg-indigo-500/15 px-3 py-1 text-indigo-100">Transfer {summaryData.transfer}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="primary" href="/workouts/structure">Nuevo analisis</Button>
            <Button variant="ghost" href="/workouts">Ver workouts</Button>
          </div>
        </div>
      </header>

      <TabbedSection tabs={tabs} initialId="resumen" renderContent={renderTab} />
    </div>
  );
}