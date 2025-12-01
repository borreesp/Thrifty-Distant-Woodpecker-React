"use client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Card, Section } from "@thrifty/ui";
import { api } from "../../lib/api";
import type { Workout, WorkoutStats } from "../../lib/types";

type WorkoutCard = {
  id: number | string;
  title: string;
  focus: string;
  duration: string;
  level: string;
  type: "cardio" | "strength" | "hybrid";
  difficulty?: number | null;
  rating?: number | null;
  tags: string[];
};

const FALLBACK: WorkoutCard[] = [
  { id: "fallback-1", title: "Engine Builder", focus: "Cardio · Z2", duration: "45 min", level: "Base", type: "cardio", difficulty: 5.5, rating: 4.2, tags: ["Row", "Bike"] },
  { id: "fallback-2", title: "Strength Complex", focus: "Fuerza · Lower", duration: "60 min", level: "Intermedio", type: "strength", difficulty: 7.1, rating: 4.6, tags: ["Barbell", "Core"] },
  { id: "fallback-3", title: "Hybrid Sprint", focus: "Mixto · EMOM", duration: "30 min", level: "Explosivo", type: "hybrid", difficulty: 6.8, rating: 4.4, tags: ["Bike", "Carry"] },
  { id: "fallback-4", title: "Row & Carry", focus: "Cardio + Grip", duration: "25 min", level: "Challenger", type: "hybrid", difficulty: 7.9, rating: 4.7, tags: ["Row", "Farmer"] }
];

function mapWorkout(workout: Workout): WorkoutCard {
  const minutes = workout.avg_time_seconds ? Math.round(workout.avg_time_seconds / 60) : null;
  const typeHint = workout.wod_type?.toLowerCase() || "";
  const type: WorkoutCard["type"] = typeHint.includes("strength") ? "strength" : typeHint.includes("cardio") ? "cardio" : "hybrid";
  const tags = [
    workout.domain,
    workout.intensity,
    workout.hyrox_transfer,
    ...(workout.muscles ?? []),
    ...(workout.hyrox_stations?.map((h) => h.station) ?? [])
  ]
    .filter(Boolean)
    .slice(0, 4) as string[];

  return {
    id: workout.id,
    title: workout.title,
    focus: [workout.domain ?? "Mixto", workout.intensity ?? "N/A", workout.wod_type ?? "WOD"].filter(Boolean).join(" · "),
    duration: minutes ? `${minutes} min` : "s/n",
    level: workout.session_load || "N/A",
    type,
    difficulty: workout.estimated_difficulty,
    rating: workout.avg_rating,
    tags
  };
}

function Badge({ tone, children }: { tone: "cardio" | "strength" | "hybrid"; children: React.ReactNode }) {
  const tones = {
    cardio: "bg-cyan-500/15 text-cyan-200 border border-cyan-500/20",
    strength: "bg-orange-500/15 text-orange-200 border border-orange-500/20",
    hybrid: "bg-indigo-500/15 text-indigo-200 border border-indigo-500/20"
  };
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">{children}</span>;
}

export default function WorkoutsPage() {
  const [items, setItems] = useState<WorkoutCard[]>(FALLBACK);
  const [stats, setStats] = useState<WorkoutStats[]>([]);

  useEffect(() => {
    api
      .getWorkouts()
      .then((data) => setItems(data.map(mapWorkout)))
      .catch(() => setItems(FALLBACK));
    api
      .getWorkoutStats()
      .then(setStats)
      .catch(() => setStats([]));
  }, []);

  const avgDifficulty = useMemo(() => {
    const vals = stats.map((s) => Number(s.estimated_difficulty ?? 0)).filter(Boolean);
    if (!vals.length) return null;
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  }, [stats]);

  return (
    <div className="space-y-8">
      <header className="overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 shadow-xl ring-1 ring-white/5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Biblioteca WODs</p>
            <h1 className="text-3xl font-semibold text-white">Análisis y selección de workouts</h1>
            <p className="mt-1 text-slate-300">Explora, compara y lanza tus sesiones directamente.</p>
          </div>
          <div className="flex gap-3">
            <Badge tone="hybrid">Mixtos</Badge>
            <Badge tone="strength">Fuerza</Badge>
            <Badge tone="cardio">Cardio</Badge>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Card className="bg-white/5">
            <p className="text-sm text-slate-400">Workouts en librería</p>
            <p className="text-2xl font-semibold text-white">{items.length}</p>
            <p className="text-xs text-slate-400">Filtra por dominio, intensidad o estación</p>
          </Card>
          <Card className="bg-white/5">
            <p className="text-sm text-slate-400">Dificultad promedio</p>
            <p className="text-2xl font-semibold text-white">{avgDifficulty ?? "s/n"}</p>
            <p className="text-xs text-slate-400">Basado en ratings agregados</p>
          </Card>
          <Card className="bg-white/5">
            <p className="text-sm text-slate-400">Últimas valoraciones</p>
            <p className="text-2xl font-semibold text-white">{stats.reduce((acc, s) => acc + (s.rating_count ?? 0), 0)}</p>
            <p className="text-xs text-slate-400">Votos totales</p>
          </Card>
        </div>
      </header>

      <Section title="Explorar workouts" description="Elige por foco fisiológico, intensidad o duración.">
        <div className="grid gap-4 lg:grid-cols-3">
          {items.map((w) => (
            <Link key={w.id} href={`/workouts/${w.id}`} className="group block">
              <Card className="h-full cursor-pointer border border-white/5 bg-slate-900/60 p-4 transition duration-200 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-800/80">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-400">{w.focus}</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{w.title}</h3>
                  </div>
                  <Badge tone={w.type}>{w.level}</Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
                  <Pill>{w.duration}</Pill>
                  {typeof w.difficulty === "number" && <Pill>Dif: {w.difficulty.toFixed(1)}</Pill>}
                  {typeof w.rating === "number" && <Pill>Rating {w.rating.toFixed(1)}</Pill>}
                  {w.tags.slice(0, 3).map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Estadísticas rápidas" description="Dificultad y ratings agregados">
        <Card className="bg-slate-900/70 p-4 ring-1 ring-white/5">
          <div className="grid grid-cols-5 gap-3 text-xs text-slate-300">
            <span className="font-semibold text-slate-200">Workout</span>
            <span className="font-semibold text-slate-200">Dif.</span>
            <span className="font-semibold text-slate-200">Avg time</span>
            <span className="font-semibold text-slate-200">Rating</span>
            <span className="font-semibold text-slate-200">Votes</span>
            {stats.map((s) => (
              <React.Fragment key={s.workout_id}>
                <span>{s.title ?? s.workout_id}</span>
                <span>{s.estimated_difficulty ?? "-"}</span>
                <span>{s.avg_time_seconds ?? "-"}</span>
                <span>{s.avg_rating ?? "-"}</span>
                <span>{s.rating_count ?? 0}</span>
              </React.Fragment>
            ))}
          </div>
        </Card>
      </Section>
    </div>
  );
}
