"use client";
import React, { useEffect, useMemo, useState } from "react";
import { api } from "../../../lib/api";
import type { Workout, WorkoutBlock } from "../../../lib/types";
import { HeaderOverview } from "../../../components/wod/HeaderOverview";
import { AthleteResponsePanel } from "../../../components/wod/AthleteResponsePanel";
import { WODStationBreakdown } from "../../../components/wod/WODStationBreakdown";
import { DataVisualZone } from "../../../components/wod/DataVisualZone";
import { TacticalInsightsPanel } from "../../../components/wod/TacticalInsightsPanel";
import { PersonalTrackPanel } from "../../../components/wod/PersonalTrackPanel";

const FALLBACK_WORKOUT: Workout = {
  id: 0,
  title: "Engine Builder",
  description: "Row + wall balls",
  domain: "Aerobico",
  intensity: "Media",
  hyrox_transfer: "Media",
  wod_type: "Intervals",
  version: 1,
  is_active: true,
  session_load: "Moderate",
  session_feel: "Pulso controlado",
  estimated_difficulty: 6.5,
  avg_time_seconds: 1200,
  rating_count: 0,
  capacities: [
    { capacity: "Resistencia", value: 80, note: "Ritmo sostenible" },
    { capacity: "Carga muscular", value: 55, note: "Volumen ligero" }
  ],
  hyrox_stations: [{ station: "Row", transfer_pct: 70 }],
  muscles: ["Piernas", "Core"],
  blocks: [
    {
      id: 1,
      workout_id: 0,
      position: 1,
      block_type: "warmup",
      title: "Calentamiento",
      description: "Row easy pace",
      duration_seconds: 420,
      rounds: null,
      notes: "",
      movements: [
        { id: 1, movement_id: 1, position: 1, reps: null, load: null, load_unit: null, distance_meters: 400, duration_seconds: null, calories: null, movement: { id: 1, name: "Row", category: "Cardio", description: "", default_load_unit: null, video_url: null, muscles: [] } }
      ]
    },
    {
      id: 2,
      workout_id: 0,
      position: 2,
      block_type: "intervals",
      title: "10 rounds",
      description: "200m row + 10 wall balls",
      duration_seconds: 900,
      rounds: 10,
      notes: "",
      movements: [
        { id: 2, movement_id: 1, position: 1, reps: null, load: null, load_unit: null, distance_meters: 200, duration_seconds: null, calories: null, movement: { id: 1, name: "Row", category: "Cardio", description: "", default_load_unit: null, video_url: null, muscles: [] } },
        { id: 3, movement_id: 2, position: 2, reps: 10, load: 9, load_unit: "kg", distance_meters: null, duration_seconds: null, calories: null, movement: { id: 2, name: "Wall Ball", category: "Metcon", description: "", default_load_unit: "kg", video_url: null, muscles: [] } }
      ]
    }
  ]
};

const HYROX_STATIONS = [
  "1K Run",
  "SkiErg",
  "Sled Push",
  "Sled Pull",
  "Burpee Broad Jump",
  "Row",
  "Farmers Carry",
  "Sandbag Lunges",
  "Wall Balls"
];

function blockSteps(block: WorkoutBlock) {
  return block.movements.map((mv) => {
    const base = mv.movement?.name ?? "Movimiento";
    if (mv.reps) return `${base} x ${mv.reps}${mv.load ? ` @ ${mv.load}${mv.load_unit ?? ""}` : ""}`;
    if (mv.distance_meters) return `${base} ${mv.distance_meters}m`;
    if (mv.duration_seconds) return `${base} ${Math.round(mv.duration_seconds / 60)} min`;
    if (mv.calories) return `${base} ${mv.calories} cal`;
    return base;
  });
}

export default function WorkoutDetailPage({ params }: { params: { id: string } }) {
  const workoutId = params.id;
  const [workout, setWorkout] = useState<Workout>(FALLBACK_WORKOUT);
  const [versions, setVersions] = useState<Workout[]>([FALLBACK_WORKOUT]);

  useEffect(() => {
    async function load() {
      try {
        const [structure, vers] = await Promise.all([
          api.getWorkoutStructure(workoutId),
          api.getWorkoutVersions(workoutId)
        ]);
        setWorkout(structure.blocks?.length ? structure : { ...structure, blocks: await api.getWorkoutBlocks(workoutId) });
        setVersions(vers && vers.length ? vers : [structure]);
      } catch {
        setWorkout(FALLBACK_WORKOUT);
        setVersions([FALLBACK_WORKOUT]);
      }
    }
    load();
  }, [workoutId]);

  const minutes = useMemo(() => (workout.avg_time_seconds ? Math.round(workout.avg_time_seconds / 60) : null), [workout]);
  const radarData = useMemo(
    () => (workout.capacities ?? []).map((c) => ({ label: c.capacity, value: c.value })),
    [workout]
  );

  const stations = useMemo(() => {
    const blocks = workout.blocks ?? [];
    const mapped = blocks.map((b, idx) => ({
      id: b.id,
      title: b.title ?? `Bloque ${b.position}`,
      duration: b.duration_seconds ? Math.round(b.duration_seconds / 60) : null,
      steps: blockSteps(b),
      muscle: b.movements.map((m) => m.movement?.muscles?.[0]?.muscle_group ?? m.movement?.name ?? "").find(Boolean) ?? "General",
      metabolic: b.block_type ?? "",
      compare: HYROX_STATIONS[idx % HYROX_STATIONS.length]
    }));
    return mapped;
  }, [workout]);

  return (
    <div className="space-y-10">
      <HeaderOverview
        title={workout.title}
        dateHint={`v${workout.version ?? 1}`}
        durationLabel={minutes ? `${minutes} min` : "s/n"}
        effortTag={workout.intensity ?? "N/A"}
        loadScore={workout.estimated_difficulty ?? 0}
        aerobicShare={Math.min(85, Math.max(15, (workout.avg_time_seconds ?? 0) / 1000))}
      />

      <AthleteResponsePanel
        heartRates={{ avg: 138, max: 172 }}
        hrv={78}
        glycogenCurve={[82, 70, 55, 48, 40, 35, 30, 28]}
        fatigueByStation={stations.map((s, idx) => ({ label: `Est.${idx + 1}`, value: 60 + (idx % 4) * 8 }))}
      />

      <WODStationBreakdown stations={stations} />

      <DataVisualZone
        effortCurve={[10, 30, 45, 60, 55, 70, 80, 78, 82, 75, 70, 60]}
        dropOffCurve={[2, 5, 8, 12, 15, 18, 22, 26, 28, 30, 30, 30]}
        radarData={radarData.length ? radarData : [{ label: "Resistencia", value: 65 }]}
      />

      <TacticalInsightsPanel
        weaknesses={[(workout.capacities?.[0]?.capacity ?? "Resistencia"), "Transiciones HYROX", "Fatiga en tren inferior"]}
        suggestions={["Controla pace en primera mitad", "Practica Sled con carga progresiva", "Agrega trabajo de movilidad entre bloques"]}
        hyroxTransfer={workout.hyrox_transfer ?? "N/A"}
      />

      <PersonalTrackPanel
        feel={workout.session_feel ?? "Pulso estable, respiracion controlada"}
        notes={workout.description ?? ""}
        compareLabel={workout.hyrox_stations?.[0]?.station ?? "Wall Balls"}
        versions={versions.map((v) => ({ id: v.id, title: v.title, version: v.version ?? 1 }))}
      />
    </div>
  );
}
