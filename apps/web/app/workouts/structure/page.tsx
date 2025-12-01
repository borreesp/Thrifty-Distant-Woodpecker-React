"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Section, Card, Input } from "@thrifty/ui";
import { WorkoutBlockCard } from "../../../components/workout/WorkoutBlockCard";
import { HexStatCard } from "../../../components/workout/HexStatCard";
import { api } from "../../../lib/api";
import type { Workout } from "../../../lib/types";

export default function WorkoutStructurePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [structure, setStructure] = useState<Workout | null>(null);

  useEffect(() => {
    api
      .getWorkouts()
      .then((data) => {
        setWorkouts(data);
        if (data.length) {
          setSelectedId(String(data[0].id));
        }
      })
      .catch(() => setWorkouts([]));
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    api
      .getWorkoutStructure(selectedId)
      .then(setStructure)
      .catch(() => setStructure(null));
  }, [selectedId]);

  const stats = useMemo(() => {
    if (!structure) return [];
    const minutes = structure.avg_time_seconds ? Math.round(structure.avg_time_seconds / 60) : "s/n";
    return [
      { label: "Duracion", value: `${minutes} min`, subvalue: structure.session_load ?? "" },
      { label: "Dificultad", value: structure.estimated_difficulty ?? "s/n", subvalue: structure.intensity ?? "" },
      { label: "Version", value: `v${structure.version ?? 1}`, subvalue: structure.is_active ? "Activa" : "Archivada" },
      { label: "Musculos", value: (structure.muscles ?? []).join(", ") || "-" }
    ];
  }, [structure]);

  return (
    <div className="space-y-6">
      <Section
        title="Estructura de workouts"
        description="Bloques, movimientos y metadatos para QA de programaciones"
      >
        <div className="mb-4 grid gap-3 md:grid-cols-3">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Workout</p>
            <select
              value={selectedId ?? ""}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100"
            >
              {workouts.map((w) => (
                <option key={w.id} value={w.id} className="bg-slate-900 text-slate-100">
                  {w.title}
                </option>
              ))}
            </select>
          </div>
          <Input label="Dominio" readOnly value={structure?.domain ?? "-"} />
          <Input label="Intensidad" readOnly value={structure?.intensity ?? "-"} />
        </div>
        {structure && (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              {stats.map((s) => (
                <HexStatCard key={s.label} {...s} />
              ))}
            </div>
            <Card title="Bloques" subtitle="Orden y movimientos con metricas">
              <div className="grid gap-4 md:grid-cols-2">
                {(structure.blocks ?? []).map((block) => (
                  <WorkoutBlockCard
                    key={block.id}
                    title={block.title ?? `Bloque ${block.position}`}
                    duration={block.duration_seconds ? `${Math.round(block.duration_seconds / 60)} min` : ""}
                    steps={block.movements.map((mv) => {
                      const base = mv.movement?.name ?? "Movimiento";
                      if (mv.reps) return `${base} x ${mv.reps}${mv.load ? ` @ ${mv.load}${mv.load_unit ?? ""}` : ""}`;
                      if (mv.distance_meters) return `${base} ${mv.distance_meters}m`;
                      if (mv.duration_seconds) return `${base} ${Math.round(mv.duration_seconds / 60)} min`;
                      return base;
                    })}
                  />
                ))}
              </div>
            </Card>
          </div>
        )}
      </Section>
    </div>
  );
}
