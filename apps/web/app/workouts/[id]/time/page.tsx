"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Section } from "@thrifty/ui";
import { api } from "../../../../lib/api";
import type { Workout, WorkoutBlock } from "../../../../lib/types";

type Mode = "total" | "by_blocks";

const formatSeconds = (total?: number | null) => {
  if (total === undefined || total === null) return "-";
  const minutes = Math.floor(total / 60);
  const seconds = Math.round(total % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const parseTimeInput = (value: string): number | null => {
  if (!value) return null;
  const trimmed = value.trim();
  if (trimmed.includes(":")) {
    const [mm, ss] = trimmed.split(":").map((part) => part.trim());
    const minutes = Number(mm);
    const seconds = Number(ss);
    if (!Number.isFinite(minutes) || !Number.isFinite(seconds)) return null;
    return minutes * 60 + seconds;
  }
  const numeric = Number(trimmed);
  if (!Number.isFinite(numeric)) return null;
  return numeric;
};

const summarizeBlock = (block: WorkoutBlock) => {
  const mainMovement = block.movements?.[0];
  const movementName = mainMovement?.movement?.name;
  const parts: string[] = [];
  if (mainMovement?.reps) parts.push(`${mainMovement.reps} reps`);
  if (mainMovement?.distance_meters) parts.push(`${mainMovement.distance_meters} m`);
  if (mainMovement?.duration_seconds) parts.push(`${mainMovement.duration_seconds} s`);
  if (mainMovement?.calories) parts.push(`${mainMovement.calories} cal`);
  return `${block.title || block.block_type || "Bloque"}${movementName ? ` · ${movementName}` : ""}${parts.length ? ` (${parts.join(" | ")})` : ""}`;
};

export default function WorkoutTimePage() {
  const params = useParams<{ id: string }>();
  const workoutId = params?.id;
  const router = useRouter();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [mode, setMode] = useState<Mode>("total");
  const [totalInput, setTotalInput] = useState("");
  const [blockInputs, setBlockInputs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!workoutId) return;
    setLoading(true);
    api
      .getWorkoutStructure(workoutId)
      .then((payload) => {
        setWorkout(payload);
        setBlockInputs((payload.blocks ?? []).map(() => ""));
        if (payload.avg_time_seconds) {
          setTotalInput(String(payload.avg_time_seconds));
        }
      })
      .catch((err) => {
        const message = err instanceof Error ? err.message : "No se pudo cargar el WOD.";
        setError(message);
      })
      .finally(() => setLoading(false));
  }, [workoutId]);

  const blocks = useMemo(() => {
    if (!workout?.blocks) return [];
    return [...workout.blocks].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  }, [workout?.blocks]);

  const disableByBlocks = blocks.length === 0;

  const parsedBlockTimes = useMemo(
    () => blockInputs.map((input) => parseTimeInput(input)),
    [blockInputs]
  );

  const computedTotal = useMemo(() => {
    const valid = parsedBlockTimes.filter((v): v is number => Number.isFinite(v));
    if (!valid.length) return 0;
    return valid.reduce((acc, v) => acc + v, 0);
  }, [parsedBlockTimes]);

  const handleBlockChange = (index: number, value: string) => {
    setBlockInputs((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSave = async () => {
    if (!workoutId) return;
    setError(null);
    if (mode === "by_blocks" && blockInputs.length !== blocks.length) {
      setError("Completa todos los bloques del WOD.");
      return;
    }

    const payloadBase = {
      method: mode,
      total_time_sec: 0,
      block_times_sec: undefined as number[] | undefined
    };

    if (mode === "total") {
      const parsed = parseTimeInput(totalInput);
      if (!parsed || parsed <= 0) {
        setError("Introduce un tiempo total valido (segundos o mm:ss).");
        return;
      }
      const payload = { ...payloadBase, total_time_sec: parsed };
      setSaving(true);
      try {
        console.info("[time] submit total", payload);
        await api.submitWorkoutTime(workoutId, payload);
        try {
          console.info("[time] applyImpact after total");
          await api.applyWorkoutImpact(workoutId);
        } catch (impactErr) {
          console.warn("[time] applyImpact fallo", impactErr);
        }
        router.push(`/workouts/${workoutId}?saved=time`);
      } catch (err) {
        const message = err instanceof Error ? err.message : "No se pudo guardar el tiempo.";
        setError(message);
      } finally {
        setSaving(false);
      }
      return;
    }

    if (disableByBlocks) {
      setError("Este WOD no tiene bloques para registrar.");
      return;
    }

    const parsed = parsedBlockTimes;
    if (parsed.some((v) => v === null || v === undefined || v <= 0)) {
      setError("Completa los tiempos de todos los bloques en segundos o mm:ss.");
      return;
    }
    const numericBlocks = parsed as number[];
    const total = numericBlocks.reduce((acc, v) => acc + v, 0);
    const payload = { ...payloadBase, total_time_sec: total, block_times_sec: numericBlocks };
    setSaving(true);
    try {
      console.info("[time] submit by_blocks", payload);
      await api.submitWorkoutTime(workoutId, payload);
      try {
        console.info("[time] applyImpact after by_blocks");
        await api.applyWorkoutImpact(workoutId);
      } catch (impactErr) {
        console.warn("[time] applyImpact fallo", impactErr);
      }
      router.push(`/workouts/${workoutId}?saved=time`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo guardar el tiempo por bloques.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-slate-400">Cargando WOD...</p>;
  }

  if (!workout) {
    return <p className="text-sm text-rose-300">{error ?? "WOD no encontrado."}</p>;
  }

  return (
    <div className="space-y-6">
      <Section
        title="🕒 Registrar tiempos"
        description="Guarda tus tiempos totales o por bloques para este WOD."
        className="rounded-3xl border border-white/5 bg-gradient-to-br from-slate-950/80 via-slate-950/60 to-slate-900/70 p-6 md:p-8 shadow-[0_14px_50px_rgba(0,0,0,0.55)]"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Modo de registro de tiempo</p>
            <p className="text-sm text-slate-200">Selecciona si registras un tiempo total o por cada bloque.</p>
          </div>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white md:w-64"
          >
            <option value="total">Tiempo total</option>
            <option value="by_blocks" disabled={disableByBlocks}>
              Tiempo por bloques
            </option>
          </select>
        </div>

        <Card className="mt-4 border border-white/10 bg-slate-900/70 p-4">
          {mode === "total" && (
            <div className="space-y-3">
              <label className="block text-sm text-slate-200">
                Tiempo total (segundos o mm:ss)
                <input
                  value={totalInput}
                  onChange={(e) => setTotalInput(e.target.value)}
                  placeholder="1560 o 26:00"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-white"
                />
              </label>
              <p className="text-xs text-slate-400">Guardaremos este tiempo como referencia principal para el WOD.</p>
            </div>
          )}

          {mode === "by_blocks" && (
            <div className="space-y-4">
              {!blocks.length && <p className="text-sm text-amber-300">Este WOD no tiene bloques para registrar.</p>}
              {blocks.map((block, idx) => (
                <div key={block.id ?? idx} className="rounded-2xl border border-white/10 bg-slate-800/60 p-3">
                  <p className="text-sm font-semibold text-white">{summarizeBlock(block)}</p>
                  <label className="mt-2 block text-xs text-slate-400">
                    Tiempo del bloque (segundos o mm:ss)
                    <input
                      value={blockInputs[idx] ?? ""}
                      onChange={(e) => handleBlockChange(idx, e.target.value)}
                      placeholder="120 o 2:00"
                      className="mt-1 w-full rounded-2xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-white"
                    />
                  </label>
                </div>
              ))}
              {computedTotal > 0 && <p className="text-xs text-slate-400">Tiempo total calculado: {formatSeconds(computedTotal)}</p>}
            </div>
          )}

          {error && <p className="mt-3 text-xs text-rose-300">{error}</p>}
          <div className="mt-4 flex justify-end">
            <Button variant="primary" onClick={handleSave} disabled={saving || (mode === "by_blocks" && disableByBlocks)}>
              {saving ? "Guardando..." : "Guardar resultado"}
            </Button>
          </div>
        </Card>
      </Section>
    </div>
  );
}
