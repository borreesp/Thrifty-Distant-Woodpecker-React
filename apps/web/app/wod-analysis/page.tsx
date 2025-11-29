"use client";
import React, { useMemo } from "react";
import { Section } from "@thrifty/ui";
import { HexRadarChart } from "../../components/charts/HexRadarChart";
import { BarLevelChart } from "../../components/charts/BarLevelChart";
import { LinearProgressBar } from "../../components/charts/LinearProgressBar";
import { CircularXpProgress } from "../../components/charts/CircularXpProgress";
import { TabbedSection } from "../../components/ui/TabbedSection";

const summaryData = {
  domain: "Mixed",
  intensity: "Alta",
  times: {
    Beginner: { value: 20.5, range: "18-21 min" },
    Intermedio: { value: 17, range: "15-18 min" },
    RX: { value: 13.5, range: "12-14 min" },
    "HYROX Competitor": { value: 11, range: "10-11:30 min" }
  },
  muscles: ["Piernas", "Core", "Hombros", "Posterior", "Grip"],
  athlete:
    "Favorece atletas con motor aeróbico sólido, potencia de tren inferior y habilidad gimnástica controlada.",
  transfer: "Alta",
  wodType: "Intervalos mixtos con carga / Mixed modal"
};

const wodText = `FOR TIME
1000m run
50 wall balls @ 9/6kg
30 deadlifts @ 80/55kg
25 burpee box jump overs 24/20"
800m run
20 toes to bar
20 kettlebell lunges @ 24/16kg
600m run`;

const radarData = [
  { label: "Fuerza", value: 72 },
  { label: "Endurance", value: 88 },
  { label: "Velocidad", value: 65 },
  { label: "Skill / Gimnásticos", value: 70 },
  { label: "Metcon", value: 85 },
  { label: "Carga muscular", value: 78 }
];

const capacityNotes = [
  {
    title: "Fuerza",
    copy: "Cargas medias con alta densidad de repeticiones. Deadlifts y lunges marcan la sesión."
  },
  {
    title: "Endurance",
    copy: "Segmentos de carrera repetidos exigen control de ritmo y respiración nasal en la base."
  },
  {
    title: "Velocidad",
    copy: "Tramos cortos permiten cierres agresivos si la técnica se mantiene estable."
  },
  {
    title: "Skill / Gimnásticos",
    copy: "Toes to bar y BBJO requieren eficiencia técnica para no romper el flujo."
  },
  {
    title: "Metcon",
    copy: "Bloque mixto continuo con presión cardiovascular sostenida y pocas pausas."
  },
  {
    title: "Carga muscular",
    copy: "Fatiga acumulada en cuádriceps, glúteo y erectores. Grip activo durante casi todo el WOD."
  }
];

const metrics = [
  { label: "Volumen total", value: "210 reps + 2.4 km carrera" },
  { label: "Ratio trabajo/descanso", value: "4:1 (micro-pausas planificadas)" },
  { label: "Estímulo dominante", value: "Mixed / Intervalos controlados" },
  { label: "Tipo de carga", value: "Full body con énfasis en empuje y tracción" },
  { label: "Dificultad estimada", value: "7.5 / 10" },
  { label: "Cadena muscular dominante", value: "Legs + Core" }
];

const hyroxStations = [
  { station: "SkiErg", transfer: 76 },
  { station: "Sled Push", transfer: 82 },
  { station: "Sled Pull", transfer: 74 },
  { station: "Farmers Carry", transfer: 69 },
  { station: "Burpee Broad Jump", transfer: 71 },
  { station: "Row", transfer: 68 },
  { station: "Sandbag Lunges", transfer: 86 },
  { station: "Wall Balls", transfer: 92 }
];

const equipment = [
  {
    name: "Zapatillas híbridas",
    level: "Intermedio",
    description: "Drop medio, tracción para sled y estabilidad en levantamientos."
  },
  {
    name: "Cinturón ligero",
    level: "Competidor",
    description: "Soporte lumbar en deadlifts sin perder movilidad en carrera."
  },
  {
    name: "Rodilleras compresivas",
    level: "RX",
    description: "Protección y calor articular para lunges y wall balls largos."
  },
  {
    name: "Magnesio líquido",
    level: "Todos",
    description: "Grip estable en BBJO y kettlebell lunges."
  }
];

const similarWods = [
  { name: "Engine Builder 2.0", focus: "Z2 + cargas medias", duration: "38 min" },
  { name: "Quads On Fire", focus: "Wall balls + run", duration: "22 min" },
  { name: "Grip & Go", focus: "Carrera + KB lunges", duration: "28 min" }
];

const weekPlan = [
  { day: "Lunes", focus: "Motor", description: "Z2 + técnica run" },
  { day: "Miércoles", focus: "Strength", description: "Lower + accesorios" },
  { day: "Viernes", focus: "HYROX", description: "Simulador estaciones" },
  { day: "Sábado", focus: "Metcon", description: "Intervalos mixtos" }
];

const notes = [
  { title: "Pacing", copy: "Salidas controladas, split negativos en cada run." },
  { title: "Breaks estratégicos", copy: "Wall balls en bloques de 15-15-10, deadlifts 10-10-10." },
  { title: "Atleta objetivo", copy: "Motor aeróbico sólido y skill gimnástico eficiente." }
];

const WodAnalysisPage = () => {
  const timesChart = useMemo(
    () =>
      Object.entries(summaryData.times).map(([label, info]) => ({
        label,
        value: info.value,
        range: info.range
      })),
    []
  );

  const tabs = [
    { id: "resumen", label: "Resumen" },
    { id: "hex", label: "Hexágono de Capacidades" },
    { id: "tecnicos", label: "Detalles Técnicos" },
    { id: "hyrox", label: "Enfoque HYROX" },
    { id: "material", label: "Material Recomendado" },
    { id: "wods", label: "WODs Similares / Semana" },
    { id: "social", label: "Valoración Social" }
  ];

  const renderTab = (active: string) => {
    switch (active) {
      case "resumen":
        return (
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow">
                <h3 className="text-white font-semibold">Dominio energético</h3>
                <p className="text-sm text-slate-300">{summaryData.domain}</p>
                <p className="text-xs text-slate-400">Intensidad {summaryData.intensity}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow">
                <h3 className="text-white font-semibold">Músculos principales</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {summaryData.muscles.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-amber-200/40 bg-amber-200/15 px-3 py-1 text-xs font-semibold text-amber-100"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow">
                <h3 className="text-white font-semibold">Tipo de atleta favorecido</h3>
                <p className="text-sm text-slate-300">{summaryData.athlete}</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-white font-semibold mb-2">Tiempo estimado por nivel</h4>
                <BarLevelChart data={timesChart} />
                <p className="text-xs text-slate-400 mt-2">Barras amarillas, fondo oscuro</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow">
                <h4 className="text-white font-semibold mb-2">Notas rápidas</h4>
                <div className="grid gap-3">
                  {notes.map((n) => (
                    <div
                      key={n.title}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 shadow-inner"
                    >
                      <p className="text-xs uppercase tracking-wide text-amber-300">{n.title}</p>
                      <p className="text-sm text-slate-200">{n.copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "hex":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="text-white font-semibold mb-2">Hexágono de capacidades</h4>
              <HexRadarChart data={radarData} stroke="#FEC94F" fill="#FEC94F" />
            </div>
            <div className="grid gap-3">
              {capacityNotes.map((cap) => (
                <div key={cap.title} className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow">
                  <p className="text-xs uppercase tracking-wide text-amber-300">{cap.title}</p>
                  <p className="text-sm text-slate-200">{cap.copy}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "tecnicos":
        return (
          <div className="grid gap-3 md:grid-cols-2">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow">
                <p className="text-xs uppercase tracking-wide text-amber-300">{m.label}</p>
                <p className="text-sm text-slate-200">{m.value}</p>
              </div>
            ))}
          </div>
        );
      case "hyrox":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow">
              <h4 className="text-white font-semibold mb-3">Transferencia a HYROX</h4>
              <div className="grid gap-3">
                {hyroxStations.map((station) => (
                  <div key={station.station} className="flex items-center gap-4">
                    <div className="text-sm text-white w-28">{station.station}</div>
                    <LinearProgressBar
                      value={station.transfer}
                      color="#FEC94F"
                      variant="compact"
                      className="flex-1"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow flex flex-col items-center justify-center">
              <h4 className="text-white font-semibold mb-2">XP HYROX</h4>
              <CircularXpProgress value={72} color="#FEC94F" />
              <p className="mt-3 text-sm text-slate-300">Compatibilidad global con estaciones</p>
            </div>
          </div>
        );
      case "material":
        return (
          <div className="grid gap-3 md:grid-cols-2">
            {equipment.map((item) => (
              <div key={item.name} className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="text-xs uppercase tracking-wide text-amber-300">Nivel {item.level}</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-slate-200">{item.description}</p>
              </div>
            ))}
          </div>
        );
      case "wods":
        return (
          <div className="grid gap-4">
            <div className="grid gap-3 md:grid-cols-3">
              {similarWods.map((w) => (
                <div key={w.name} className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow">
                  <p className="text-sm font-semibold text-white">{w.name}</p>
                  <p className="text-xs text-slate-400">{w.focus}</p>
                  <p className="text-xs text-amber-300">{w.duration}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow">
              <h4 className="text-white font-semibold mb-2">Semana recomendada</h4>
              <div className="grid gap-3 md:grid-cols-2">
                {weekPlan.map((day) => (
                  <div key={day.day} className="rounded-xl border border-white/10 bg-white/5 p-3 shadow-inner">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-amber-300">{day.day}</p>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-200">
                        {day.focus}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-300">{day.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "social":
        return (
          <div className="grid gap-3 md:grid-cols-2">
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow">
                <p className="text-sm text-white">Feedback comunidad #{idx}</p>
                <p className="text-xs text-gray-300">Placeholder de rating y comentarios.</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Section title="Analizador WOD" description="Capacidades, tiempos y material recomendado.">
        <div className="space-y-6">
          <div className="grid gap-6 rounded-2xl border border-white/10 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-neutral-800 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.55)] md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <div className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-amber-300">
                  Analizador de WOD
                </p>
                <h1 className="mt-2 text-3xl font-extrabold text-white md:text-4xl">
                  Análisis completo de tu WOD
                </h1>
                <p className="mt-3 text-sm text-slate-200">
                  Tipo de WOD detectado: {summaryData.wodType}. Optimizado para híbridos que buscan
                  transferir a HYROX y CrossFit sin perder control de intensidad.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow-[0_12px_32px_rgba(250,204,21,0.5)]">
                  Guardar WOD
                </button>
                <button className="rounded-full border border-white/20 bg-transparent px-5 py-2 text-sm font-semibold text-slate-100 hover:bg-white/5">
                  Analizar otro WOD
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Dominio</p>
                  <p className="text-lg font-semibold text-white">{summaryData.domain}</p>
                  <p className="text-xs text-slate-300">Metabólico mixto controlado</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                    Intensidad
                  </p>
                  <p className="text-lg font-semibold text-white">{summaryData.intensity}</p>
                  <p className="text-xs text-slate-300">Z3-Z4 progresiva</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                    Transfer HYROX
                  </p>
                  <p className="text-lg font-semibold text-white">{summaryData.transfer}</p>
                  <p className="text-xs text-slate-300">Wall balls, lunges, carrera</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-2xl border border-white/15 bg-neutral-950/70 p-4 shadow-inner">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">WOD original</p>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-slate-200">
                  Input usuario
                </span>
              </div>
              <pre className="flex-1 whitespace-pre-wrap rounded-xl bg-neutral-900/80 p-3 text-xs text-slate-100">
                {wodText}
              </pre>
            </div>
          </div>

          <TabbedSection tabs={tabs} initialId="resumen" renderContent={renderTab} />
        </div>
      </Section>
    </div>
  );
};

export default WodAnalysisPage;
