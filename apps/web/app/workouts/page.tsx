"use client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Card, Section } from "@thrifty/ui";
import { api } from "../../lib/api";
import type { Workout } from "../../lib/types";

const statTone = {
  cardio: "text-cyan-200",
  strength: "text-orange-200",
  hybrid: "text-indigo-200"
} as const;

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ domain: "", intensity: "", hyrox: "" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    setStatus("loading");
    api
      .getWorkouts()
      .then((data) => {
        setWorkouts(data);
        setStatus("idle");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      });
  }, []);

  const domains = useMemo(
    () => Array.from(new Set(workouts.map((w) => w.domain).filter(Boolean))) as string[],
    [workouts]
  );
  const intensities = useMemo(
    () => Array.from(new Set(workouts.map((w) => w.intensity).filter(Boolean))) as string[],
    [workouts]
  );
  const hyroxStations = useMemo(
    () =>
      Array.from(new Set(workouts.flatMap((w) => w.hyrox_stations?.map((h) => h.station) ?? []).filter(Boolean))) as string[],
    [workouts]
  );

  const filtered = useMemo(() => {
    return workouts
      .filter((workout) => (filters.domain ? workout.domain === filters.domain : true))
      .filter((workout) => (filters.intensity ? workout.intensity === filters.intensity : true))
      .filter((workout) =>
        filters.hyrox ? workout.hyrox_stations?.some((station) => station.station === filters.hyrox) : true
      )
      .filter((workout) =>
        search ? `${workout.title} ${workout.description}`.toLowerCase().includes(search.toLowerCase()) : true
      )
      .sort((a, b) => (b.avg_rating ?? 0) - (a.avg_rating ?? 0));
  }, [workouts, filters, search]);

  const renderTags = (workout: Workout) => {
    const tags = [workout.domain, workout.intensity, workout.hyrox_transfer, ...(workout.muscles ?? [])]
      .filter(Boolean)
      .slice(0, 4);
    return (
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            {tag}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Section title="Workouts" description="Todos los WODs disponibles para tu perfil HybridForce.">
        <div className="grid gap-3 md:grid-cols-4">
          <input
            placeholder="Buscador"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500"
          />
          <select
            value={filters.domain}
            onChange={(event) => setFilters((prev) => ({ ...prev, domain: event.target.value }))}
            className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white"
          >
            <option value="">Dominio</option>
            {domains.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
          <select
            value={filters.intensity}
            onChange={(event) => setFilters((prev) => ({ ...prev, intensity: event.target.value }))}
            className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white"
          >
            <option value="">Intensidad</option>
            {intensities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            value={filters.hyrox}
            onChange={(event) => setFilters((prev) => ({ ...prev, hyrox: event.target.value }))}
            className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white"
          >
            <option value="">Estacion HYROX</option>
            {hyroxStations.map((station) => (
              <option key={station} value={station}>
                {station}
              </option>
            ))}
          </select>
        </div>
      </Section>

      {status === "error" && (
        <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
          Error al cargar los workouts: {error}
        </div>
      )}

      {filtered.length === 0 && status === "idle" && (
        <p className="text-sm text-slate-400">No se encontraron WODs con estos filtros.</p>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((workout) => {
          const typeHint = workout.wod_type?.toLowerCase() ?? "";
          const tone: keyof typeof statTone = typeHint.includes("strength")
            ? "strength"
            : typeHint.includes("cardio")
              ? "cardio"
              : "hybrid";
          return (
            <Card key={workout.id} className="bg-slate-900/70 ring-1 ring-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{workout.wod_type}</p>
                  <h3 className="text-xl font-semibold text-white">{workout.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{workout.description}</p>
                </div>
                <div className="text-right text-sm text-slate-400">
                  <p>{workout.avg_difficulty ? workout.avg_difficulty.toFixed(1) : "-"} KP</p>
                  <p>{workout.avg_rating ? workout.avg_rating.toFixed(1) : "-"}?</p>
                </div>
              </div>
              {renderTags(workout)}
              <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                <span>{workout.session_load || "Carga N/A"}</span>
                <span className={`text-xs font-semibold ${statTone[tone]}`}>{tone.toUpperCase()}</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <Link href={`/workouts/${workout.id}`} className="text-sm font-semibold text-cyan-300">
                  Ver detalle
                </Link>
                <span className="text-xs text-slate-400">
                  {workout.avg_time_seconds ? `${Math.round(workout.avg_time_seconds / 60)} min` : "Tiempo s/n"}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
