import React from 'react'
import { Helmet } from 'react-helmet'
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

import Navigation from '../components/navigation'
import Footer from '../components/footer'
import Tabs from '../components/Tabs'
import RadarChartWOD from '../components/RadarChartWOD'
import MetricsTable from '../components/MetricsTable'
import HyroxStationsChart from '../components/HyroxStationsChart'
import WeekPlan from '../components/WeekPlan'
import './wod-analysis.css'

const WODAnalysis = () => {
  const wodText = `FOR TIME\n1000m run\n50 wall balls @ 9/6kg\n30 deadlifts @ 80/55kg\n25 burpee box jump overs 24/20"\n800m run\n20 toes to bar\n20 kettlebell lunges @ 24/16kg\n600m run`

  const summaryData = {
    domain: 'Mixed',
    intensity: 'Alta',
    times: {
      Beginner: { value: 20.5, range: '18–21 min' },
      Intermedio: { value: 17, range: '15–18 min' },
      RX: { value: 13.5, range: '12–14 min' },
      'HYROX Competitor': { value: 11, range: '10–11:30 min' },
    },
    muscles: ['Piernas', 'Core', 'Hombros', 'Posterior', 'Grip'],
    athlete:
      'Favorece atletas con motor aeróbico sólido, potencia de tren inferior y habilidad gimnástica controlada.',
    transfer: 'Alta',
    wodType: 'Placeholder: Intervalos con carga / Mixed modal',
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
      copy: 'Tramos cortos de carrera permiten cierres agresivos si la técnica se mantiene estable.',
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
      price: '€129',
      description: 'Drop medio, buena tracción para sled y estabilidad en levantamientos.',
      image:
        'https://images.unsplash.com/photo-1528701800489-20be9f4444d5?auto=format&fit=crop&w=800&q=60',
    },
    {
      name: 'Cinturón de halterofilia ligero',
      price: '€79',
      description: 'Soporte lumbar en deadlifts sin perder movilidad en carrera.',
      image:
        'https://images.unsplash.com/photo-1605296867424-35fc25c9212d?auto=format&fit=crop&w=800&q=60',
    },
    {
      name: 'Rodilleras compresivas',
      price: '€45',
      description: 'Protección y calor articular para lunges y wall balls largos.',
      image:
        'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=60',
    },
    {
      name: 'Magnesio líquido',
      price: '€12',
      description: 'Control del grip en toes to bar y farmers carry prolongados.',
      image:
        'https://images.unsplash.com/photo-1551927411-95e412943b8f?auto=format&fit=crop&w=800&q=60',
    },
  ]

  const similarWods = [
    {
      title: 'Stim: Chipper agresivo',
      description: '1.6km run + 40 wall balls + 30 KB swings + 20 burpee box jump overs.',
    },
    {
      title: 'Stim: Intervalos aeróbico-potencia',
      description: '5 rounds: 500m row, 12 deadlifts 80/55kg, 10 toes to bar, 8 BBJO.',
    },
    {
      title: 'Stim: HYROX prep',
      description: '4 rounds: 800m run, sled push 15m, sled pull 15m, 20 lunges, 25 wall balls.',
    },
  ]

  const weekPlanDays = [
    { day: 'Día 1', focus: 'Aeróbico base (Z2)', description: '45–60 min zancada o ciclismo, respiración nasal.' },
    { day: 'Día 2', focus: 'Fuerza', description: 'Back squat + accesorios core/espalda, tempo controlado.' },
    { day: 'Día 3', focus: 'Mixed modal', description: 'Intervalos con carrera + gimnásticos + sled liviano.' },
    { day: 'Día 4', focus: 'Técnica HYROX', description: 'Transiciones de estaciones, pacing de wall balls y lunges.' },
    { day: 'Día 5', focus: 'Carrera/estación', description: 'Repeticiones de 1km run + skill específica (SkiErg/Row).' },
  ]

  const socialData = {
    rating: 4.6,
    votes: 132,
    meanTime: '13:42',
    perceivedDifficulty: '7/10',
    officialTag: 'HYROX friendly',
    comments: [
      {
        author: 'Ana M.',
        time: '12:55',
        text: 'Pega fuerte en las piernas, mantener respiración en las carreras marcó la diferencia.',
      },
      {
        author: 'Diego R.',
        time: '14:20',
        text: 'Wall balls + BBJO queman; recomiendo dividir en sets pequeños y constantes.',
      },
      {
        author: 'Lucía G.',
        time: '13:10',
        text: 'Gran simulación para HYROX, carga moderada pero exige eficiencia técnica.',
      },
    ],
  }

  const timeData = Object.keys(summaryData.times).map((key) => ({
    level: key,
    minutes: summaryData.times[key].value,
    range: summaryData.times[key].range,
  }))

  const tabs = [
    {
      key: 'resumen',
      label: 'Resumen',
      content: (
        <div className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="card">
              <p className="text-xs uppercase tracking-[0.14em] text-yellow-400">Dominio energético</p>
              <h3 className="text-2xl font-bold text-white">{summaryData.domain}</h3>
              <p className="text-sm text-gray-400 mt-1">
                Intensidad {summaryData.intensity}. Transferencia HYROX {summaryData.transfer}.
              </p>
            </div>
            <div className="card">
              <p className="text-xs uppercase tracking-[0.14em] text-yellow-400">Músculos principales</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {summaryData.muscles.map((muscle) => (
                  <span
                    key={muscle}
                    className="rounded-full bg-neutral-800 px-3 py-1 text-xs font-semibold text-gray-100"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm text-gray-400">{summaryData.athlete}</p>
            </div>
            <div className="card">
              <p className="text-xs uppercase tracking-[0.14em] text-yellow-400">Tipo de atleta favorecido</p>
              <h3 className="mt-2 text-lg font-bold text-white">Motor + potencia de piernas</h3>
              <p className="mt-2 text-sm text-gray-400">Transferencia a HYROX: {summaryData.transfer}</p>
              <div className="mt-3 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-gray-300">
                {summaryData.wodType}
              </div>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="card">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Tiempo estimado por nivel</p>
                <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs uppercase tracking-wide text-gray-300">
                  Proyección
                </span>
              </div>
              <div className="mt-4 h-52 w-full">
                <ResponsiveContainer>
                  <BarChart data={timeData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis
                      dataKey="level"
                      tick={{ fill: '#d1d5db', fontSize: 11 }}
                      axisLine={{ stroke: '#27272a' }}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(255, 225, 1, 0.08)' }}
                      contentStyle={{
                        background: '#0b0b0b',
                        border: '1px solid #27272a',
                        borderRadius: '12px',
                      }}
                      formatter={(value, name, props) => [`${value} min (${props.payload.range})`, 'Tiempo']}
                    />
                    <Bar dataKey="minutes" fill="#FEE101" radius={[8, 8, 0, 0]} maxBarSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 text-xs text-gray-400">
                Valores calculados a partir de la densidad de trabajo y transiciones.
              </div>
            </div>
            <div className="card space-y-3">
              <p className="text-sm font-semibold text-white">Notas rápidas</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-3">
                  <p className="text-xs uppercase text-yellow-400">Pacing recomendado</p>
                  <p className="mt-1 text-sm text-gray-200">
                    Carreras en Z3, sets de wall balls 25/15/10, BBJO sin pausa.
                  </p>
                </div>
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-3">
                  <p className="text-xs uppercase text-yellow-400">Breaks estratégicos</p>
                  <p className="mt-1 text-sm text-gray-200">Respira en transiciones, 5-8 seg máximo.</p>
                </div>
              </div>
              <div className="rounded-xl border border-neutral-800 bg-gradient-to-r from-neutral-900 to-neutral-800 p-4">
                <p className="text-xs uppercase text-yellow-400">Atleta objetivo</p>
                <p className="mt-1 text-sm text-gray-200">
                  Ideal para preparar combinaciones de carrera + estaciones HYROX sin sacrificar volumen de fuerza.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'hexagono',
      label: 'Hexágono de Capacidades',
      content: (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <RadarChartWOD data={radarData} />
            <div className="grid gap-4 sm:grid-cols-2">
              {capacityNotes.map((item) => (
                <div key={item.title} className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
                  <p className="text-xs uppercase tracking-wide text-yellow-400">{item.title}</p>
                  <p className="mt-2 text-sm text-gray-300">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'detalles',
      label: 'Detalles Técnicos',
      content: (
        <div className="space-y-6">
          <MetricsTable metrics={metrics} />
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="card">
              <p className="text-xs uppercase tracking-[0.14em] text-yellow-400">Pacing recomendado</p>
              <p className="mt-2 text-sm text-gray-200">
                Primer run controlado (Z3). Mantén respiración nasal en wall balls y lunges. Empuja en el último 800m.
              </p>
            </div>
            <div className="card">
              <p className="text-xs uppercase tracking-[0.14em] text-yellow-400">Versión RX</p>
              <p className="mt-2 text-sm text-gray-200">Carga indicada. Sin pausas largas, sets inteligentes 20/15/10.</p>
            </div>
            <div className="card">
              <p className="text-xs uppercase tracking-[0.14em] text-yellow-400">Versión Scaled</p>
              <p className="mt-2 text-sm text-gray-200">
                Deadlift 60/40kg, wall balls 7/4kg, BBJO step-over permitido, lunges sin carga.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-yellow-400">Observaciones IA</p>
            <p className="mt-2 text-sm text-gray-200">
              Controla la fatiga lumbar. Divide lunges en sets cortos para no comprometer el patrón de carrera. Calienta
              con movilidad de cadera y activación de core.
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'hyrox',
      label: 'Enfoque HYROX',
      content: (
        <div className="space-y-6">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
              <div className="lg:w-2/5">
                <p className="text-xs uppercase tracking-[0.14em] text-yellow-400">Estaciones HYROX trabajadas</p>
                <ul className="mt-3 space-y-2 text-sm text-gray-200">
                  {hyroxStations.map((item) => (
                    <li key={item.station} className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#FEE101]"></span>
                        {item.station}
                      </span>
                      <span className="text-xs text-gray-300">{item.transfer}%</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-3/5">
                <HyroxStationsChart data={hyroxStations} />
              </div>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-4">
            {[
              { title: '12+ semanas', tag: 'Base', desc: 'Volumen aeróbico + técnica de estaciones.' },
              { title: '8–12 semanas', tag: 'Carga', desc: 'Incrementa densidad y sleds moderados.' },
              { title: '4 semanas', tag: 'Intensidad', desc: 'Bloques race-pace, transiciones rápidas.' },
              { title: 'Peak week', tag: 'Taper', desc: 'Reduce volumen, mantiene velocidad de estaciones.' },
            ].map((item) => (
              <div key={item.title} className="card">
                <p className="text-xs uppercase text-yellow-400">{item.title}</p>
                <p className="text-sm font-semibold text-white">{item.tag}</p>
                <p className="mt-2 text-sm text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-200">
              Carga de la sesión
            </span>
            <span className="rounded-full bg-yellow-400 px-4 py-2 text-xs font-bold uppercase text-black">Moderate/Hard</span>
            <span className="text-sm text-gray-300">
              Sensación esperada: cardio sostenido + fatiga de piernas. Ajusta sleds según superficie.
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'material',
      label: 'Material Recomendado',
      content: (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {equipment.map((item) => (
            <div
              key={item.name}
              className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-inner shadow-black/40"
            >
              <img src={item.image} alt={item.name} className="h-40 w-full object-cover" />
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <span className="text-xs font-bold text-yellow-400">{item.price}</span>
                </div>
                <p className="text-sm text-gray-300">{item.description}</p>
                <button className="w-full rounded-full border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs font-semibold text-white hover:border-yellow-400 hover:text-yellow-200">
                  Comparar precios
                </button>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: 'similares',
      label: 'WODs Similares y Semana Recomendada',
      content: (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">WODs similares</p>
            <div className="space-y-3">
              {similarWods.map((wod) => (
                <div key={wod.title} className="card">
                  <p className="text-xs uppercase text-yellow-400">{wod.title}</p>
                  <p className="mt-1 text-sm text-gray-200">{wod.description}</p>
                  <button className="mt-3 inline-flex items-center rounded-full border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs font-semibold text-white hover:border-yellow-400 hover:text-yellow-200">
                    Ver WOD
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">Semana recomendada</p>
            <WeekPlan days={weekPlanDays} />
          </div>
        </div>
      ),
    },
    {
      key: 'social',
      label: 'Valoración Social',
      content: (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="card">
              <p className="text-xs uppercase text-yellow-400">Rating</p>
              <p className="text-3xl font-extrabold text-white">
                {socialData.rating.toFixed(1)}
                <span className="text-lg font-semibold text-gray-300"> / 5</span>
              </p>
              <div className="mt-2 flex items-center gap-1 text-yellow-400">
                {'★★★★★☆☆☆☆☆'.slice(0, Math.round(socialData.rating))}
              </div>
              <p className="text-sm text-gray-400">{socialData.votes} registros</p>
            </div>
            <div className="card">
              <p className="text-xs uppercase text-yellow-400">Tiempo medio</p>
              <p className="text-2xl font-bold text-white">{socialData.meanTime}</p>
              <p className="mt-1 text-sm text-gray-400">Dificultad percibida: {socialData.perceivedDifficulty}</p>
              <p className="mt-2 text-xs uppercase text-yellow-400">{socialData.officialTag}</p>
            </div>
            <div className="card flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase text-yellow-400">Añade tu marca</p>
                <p className="mt-1 text-sm text-gray-200">Compara tu tiempo y feeling con la comunidad.</p>
              </div>
              <button className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#FEE101] px-4 py-2 text-sm font-semibold text-black">
                Añadir mi tiempo
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">Comentarios destacados</p>
            <div className="grid gap-3 md:grid-cols-3">
              {socialData.comments.map((comment) => (
                <div key={comment.author} className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">{comment.author}</p>
                    <span className="text-xs text-gray-400">{comment.time}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-300">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="wod-analysis-page min-h-screen bg-neutral-950 text-gray-100">
      <Helmet>
        <title>Analizador de WOD - HYROX / CrossFit</title>
        <meta
          property="og:title"
          content="Analizador de WOD - HYROX / CrossFit"
        />
      </Helmet>
      <Navigation />
      <main className="wod-analysis-shell">
        <section className="wod-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-950"></div>
          <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 lg:flex-row lg:items-start">
            <div className="flex-1 space-y-5">
              <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">Analizador de WOD</p>
              <h1 className="text-4xl font-extrabold uppercase leading-tight text-white md:text-5xl">
                Análisis completo de tu WOD
              </h1>
              <p className="text-lg text-gray-300">
                Tipo de WOD detectado: {summaryData.wodType}. Optimizado para híbridos que buscan transferir a HYROX y
                CrossFit sin perder control de intensidad.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-full bg-[#FEE101] px-5 py-3 text-sm font-semibold uppercase text-black shadow-lg shadow-yellow-500/30">
                  Guardar WOD
                </button>
                <button className="rounded-full border border-neutral-800 bg-transparent px-5 py-3 text-sm font-semibold uppercase text-white hover:border-yellow-400 hover:text-yellow-200">
                  Analizar otro WOD
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="mini-card">
                  <p className="text-xs uppercase text-gray-400">Dominio</p>
                  <p className="text-xl font-bold text-white">{summaryData.domain}</p>
                  <p className="text-xs text-gray-400">Metabólico mixto controlado</p>
                </div>
                <div className="mini-card">
                  <p className="text-xs uppercase text-gray-400">Intensidad</p>
                  <p className="text-xl font-bold text-white">{summaryData.intensity}</p>
                  <p className="text-xs text-gray-400">Z3-Z4 progresiva</p>
                </div>
                <div className="mini-card">
                  <p className="text-xs uppercase text-gray-400">Transfer HYROX</p>
                  <p className="text-xl font-bold text-yellow-400">{summaryData.transfer}</p>
                  <p className="text-xs text-gray-400">Wall balls, lunges, carrera</p>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/80 p-5 shadow-2xl shadow-black/50">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase tracking-wide text-white">WOD original</p>
                  <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-gray-200">Input usuario</span>
                </div>
                <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-neutral-900 px-4 py-4 text-sm text-gray-100 shadow-inner shadow-black/30">
                  {wodText}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-6xl px-6">
            <Tabs tabs={tabs} defaultActive="resumen" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default WODAnalysis
