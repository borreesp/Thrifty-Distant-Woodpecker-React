import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet'

import Navigation from '../components/navigation'
import Footer from '../components/footer'
import TabbedSection from '../components/ui/TabbedSection'
import BaseCard from '../components/ui/BaseCard'
import HexRadarChart from '../components/charts/HexRadarChart'
import BarLevelChart from '../components/charts/BarLevelChart'
import LinearProgressBar from '../components/charts/LinearProgressBar'
import CircularXpProgress from '../components/charts/CircularXpProgress'
import WeekPlan from '../components/WeekPlan'
import './wod-analysis.css'

const summaryData = {
  domain: 'Mixed',
  intensity: 'Alta',
  times: {
    Beginner: { value: 20.5, range: '18-21 min' },
    Intermedio: { value: 17, range: '15-18 min' },
    RX: { value: 13.5, range: '12-14 min' },
    'HYROX Competitor': { value: 11, range: '10-11:30 min' },
  },
  muscles: ['Piernas', 'Core', 'Hombros', 'Posterior', 'Grip'],
  athlete:
    'Favorece atletas con motor aeróbico sólido, potencia de tren inferior y habilidad gimnástica controlada.',
  transfer: 'Alta',
  wodType: 'Intervalos mixtos con carga',
}

const radarData = [
  { label: 'Fuerza', value: 72 },
  { label: 'Endurance', value: 88 },
  { label: 'Velocidad', value: 65 },
  { label: 'Skill / Gimnásticos', value: 70 },
  { label: 'Metcon', value: 85 },
  { label: 'Carga muscular', value: 78 },
]

const capacityNotes = [
  {
    title: 'Fuerza',
    copy: 'Cargas medias con alta densidad de repeticiones. Deadlifts y lunges marcan la sesión.',
  },
  {
    title: 'Endurance',
    copy: 'Segmentos de carrera repetidos exigen control de ritmo y respiración nasal en la base.',
  },
  {
    title: 'Velocidad',
    copy: 'Tramos cortos permiten cierres agresivos si la técnica se mantiene estable.',
  },
  {
    title: 'Skill / Gimnásticos',
    copy: 'Toes to bar y BBJO requieren eficiencia técnica para no romper el flujo.',
  },
  {
    title: 'Metcon',
    copy: 'Bloque mixto continuo con presión cardiovascular sostenida y pocas pausas.',
  },
  {
    title: 'Carga muscular',
    copy: 'Fatiga acumulada en cuádriceps, glúteo y erectores. Grip activo durante casi todo el WOD.',
  },
]

const metrics = [
  { label: 'Volumen total', value: '210 reps + 2.4 km carrera' },
  { label: 'Ratio trabajo/descanso', value: '4:1 (micro-pausas planificadas)' },
  { label: 'Estímulo dominante', value: 'Mixed / Intervalos controlados' },
  { label: 'Tipo de carga', value: 'Full body con énfasis en empuje y tracción' },
  { label: 'Dificultad estimada', value: '7.5 / 10' },
  { label: 'Cadena muscular dominante', value: 'Legs + Core' },
]

const hyroxStations = [
  { station: 'SkiErg', transfer: 76 },
  { station: 'Sled Push', transfer: 82 },
  { station: 'Sled Pull', transfer: 74 },
  { station: 'Farmers Carry', transfer: 69 },
  { station: 'Burpee Broad Jump', transfer: 71 },
  { station: 'Row', transfer: 68 },
  { station: 'Sandbag Lunges', transfer: 86 },
  { station: 'Wall Balls', transfer: 92 },
]

const equipment = [
  {
    name: 'Zapatillas híbridas',
    level: 'Intermedio',
    description: 'Drop medio, tracción para sled y estabilidad en levantamientos.',
  },
  {
    name: 'Cinturón ligero',
    level: 'Competidor',
    description: 'Soporte lumbar en deadlifts sin perder movilidad en carrera.',
  },
  {
    name: 'Rodilleras compresivas',
    level: 'RX',
    description: 'Protección y calor articular para lunges y wall balls largos.',
  },
  {
    name: 'Magnesio líquido',
    level: 'Todos',
    description: 'Grip estable en BBJO y kettlebell lunges.',
  },
]

const similarWods = [
  { name: 'Engine Builder 2.0', focus: 'Z2 + cargas medias', duration: '38 min' },
  { name: 'Quads On Fire', focus: 'Wall balls + run', duration: '22 min' },
  { name: 'Grip & Go', focus: 'Carrera + KB lunges', duration: '28 min' },
]

const weekPlan = [
  { day: 'Lunes', focus: 'Motor', description: 'Z2 + técnica run' },
  { day: 'Miércoles', focus: 'Strength', description: 'Lower + accesorios' },
  { day: 'Viernes', focus: 'HYROX', description: 'Simulador estaciones' },
  { day: 'Sábado', focus: 'Metcon', description: 'Intervalos mixtos' },
]

const notes = [
  { title: 'Pacing', copy: 'Salidas controladas, split negativos en cada run.' },
  { title: 'Breaks estratégicos', copy: 'Wall balls en bloques de 15-15-10, deadlifts 10-10-10.' },
  { title: 'Atleta objetivo', copy: 'Motor aeróbico sólido y skill gimnástico eficiente.' },
]

const WODAnalysis = () => {
  const timesChart = useMemo(
    () =>
      Object.entries(summaryData.times).map(([label, info]) => ({
        label,
        value: info.value,
        range: info.range,
      })),
    [],
  )

  const tabs = [
    { id: 'resumen', label: 'Resumen' },
    { id: 'hex', label: 'Hexágono de Capacidades' },
    { id: 'tecnicos', label: 'Detalles Técnicos' },
    { id: 'hyrox', label: 'Enfoque HYROX' },
    { id: 'material', label: 'Material Recomendado' },
    { id: 'wods', label: 'WODs Similares / Semana' },
    { id: 'social', label: 'Valoración Social' },
  ]

  const renderTab = (active) => {
    switch (active) {
      case 'resumen':
        return (
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-3">
              <BaseCard>
                <h3>Dominio energético</h3>
                <p className="text-sm text-gray-300">{summaryData.domain}</p>
                <p className="text-xs text-gray-400">Intensidad {summaryData.intensity}</p>
              </BaseCard>
              <BaseCard>
                <h3>Músculos principales</h3>
                <div className="chip-row">
                  {summaryData.muscles.map((m) => (
                    <span key={m} className="chip">
                      {m}
                    </span>
                  ))}
                </div>
              </BaseCard>
              <BaseCard>
                <h3>Tipo de atleta favorecido</h3>
                <p className="text-sm text-gray-300">{summaryData.athlete}</p>
              </BaseCard>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <BaseCard>
                <h4>Tiempo estimado por nivel</h4>
                <BarLevelChart data={timesChart} />
                <div className="text-xs text-gray-400 mt-2">Barras amarillas, fondo oscuro</div>
              </BaseCard>
              <BaseCard>
                <h4>Notas rápidas</h4>
                <div className="grid gap-3">
                  {notes.map((n) => (
                    <div key={n.title} className="note-card">
                      <p className="text-xs uppercase tracking-wide text-yellow-300">{n.title}</p>
                      <p className="text-sm text-gray-200">{n.copy}</p>
                    </div>
                  ))}
                </div>
              </BaseCard>
            </div>
          </div>
        )
      case 'hex':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <BaseCard>
              <h4>Hexágono de capacidades</h4>
              <HexRadarChart data={radarData} stroke="#FEC94F" fill="#FEC94F" />
            </BaseCard>
            <div className="grid gap-3">
              {capacityNotes.map((cap) => (
                <BaseCard key={cap.title} className="small-card">
                  <p className="text-xs uppercase tracking-wide text-yellow-300">{cap.title}</p>
                  <p className="text-sm text-gray-200">{cap.copy}</p>
                </BaseCard>
              ))}
            </div>
          </div>
        )
      case 'tecnicos':
        return (
          <div className="grid gap-3 md:grid-cols-2">
            {metrics.map((m) => (
              <BaseCard key={m.label} className="small-card">
                <p className="text-xs uppercase tracking-wide text-yellow-300">{m.label}</p>
                <p className="text-sm text-gray-200">{m.value}</p>
              </BaseCard>
            ))}
          </div>
        )
      case 'hyrox':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <BaseCard>
              <h4>Transferencia a HYROX</h4>
              <div className="grid gap-3">
                {hyroxStations.map((station) => (
                  <div key={station.station} className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-white">{station.station}</p>
                    </div>
                    <div className="flex-1 px-4">
                      <LinearProgressBar value={station.transfer} color="#FEC94F" />
                    </div>
                  </div>
                ))}
              </div>
            </BaseCard>
            <BaseCard className="flex flex-col items-center justify-center">
              <h4>XP HYROX</h4>
              <CircularXpProgress value={72} color="#FEC94F" />
              <p className="mt-3 text-sm text-gray-300">Compatibilidad global con estaciones</p>
            </BaseCard>
          </div>
        )
      case 'material':
        return (
          <div className="grid gap-3 md:grid-cols-2">
            {equipment.map((item) => (
              <BaseCard key={item.name} className="small-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{item.name}</p>
                    <p className="text-xs uppercase tracking-wide text-yellow-300">Nivel {item.level}</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-200">{item.description}</p>
              </BaseCard>
            ))}
          </div>
        )
      case 'wods':
        return (
          <div className="grid gap-4">
            <div className="grid gap-3 md:grid-cols-3">
              {similarWods.map((w) => (
                <BaseCard key={w.name} className="small-card">
                  <p className="text-sm font-semibold text-white">{w.name}</p>
                  <p className="text-xs text-gray-400">{w.focus}</p>
                  <p className="text-xs text-yellow-300">{w.duration}</p>
                </BaseCard>
              ))}
            </div>
            <BaseCard>
              <h4>Semana recomendada</h4>
              <WeekPlan days={weekPlan} />
            </BaseCard>
          </div>
        )
      case 'social':
        return (
          <div className="grid gap-3 md:grid-cols-2">
            {[1, 2, 3, 4].map((idx) => (
              <BaseCard key={idx} className="small-card">
                <p className="text-sm text-white">Feedback comunidad #{idx}</p>
                <p className="text-xs text-gray-300">Placeholder de rating y comentarios.</p>
              </BaseCard>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="wod-analysis-container">
      <Helmet>
        <title>Analizador WOD · Hex UI</title>
      </Helmet>
      <Navigation />
      <main className="wod-analysis-main">
        <div className="hero-panel">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Analizador HYROX</p>
            <h1 className="text-3xl font-semibold text-white">WOD Detalle</h1>
            <p className="text-sm text-gray-300">Estructura de pestañas tipo chip + gráficos hex unificados.</p>
          </div>
          <div className="xp-badge">
            <CircularXpProgress value={68} color="#FEC94F" />
          </div>
        </div>
        <TabbedSection tabs={tabs} initialId="resumen" renderContent={renderTab} />
      </main>
      <Footer />
    </div>
  )
}

export default WODAnalysis
