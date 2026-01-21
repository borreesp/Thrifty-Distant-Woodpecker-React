"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Section } from "@thrifty/ui";
import { api } from "../../../../lib/api";
import type { Workout, WorkoutBlock } from "../../../../lib/types";

type Mode = "total" | "by_blocks";
type SegmentKind = "BLOCK" | "ROUND" | "SCENARIO" | "INTERVAL";

type Segment = {
  id: string;
  label: string;
  kind: SegmentKind;
  roundIndex?: number;
  scenarioKey?: string;
  expectedType?: "work" | "rest" | "total";
  required: boolean;
  order: number;
  blockId?: number;
  blockTitle?: string | null;
};

type SegmentPlan = {
  segments: Segment[];
  label: string;
  note?: string;
  usedAdvanced: boolean;
};

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

const toArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? value : []);

const buildSegmentPlan = (workout: Workout, orderedBlocks: WorkoutBlock[]): SegmentPlan => {
  const extra = (workout.extra_attributes_json || {}) as Record<string, any>;
  const intervalBlocks = (extra?.interval_blocks as Record<string, any>) || {};
  const builderBlocks = toArray<any>(extra?.builder_blocks);

  const findBuilderBlock = (block: WorkoutBlock, index: number) =>
    builderBlocks.find((b) => String(b.id) === String(block.id)) || builderBlocks[index];

  const findBlockMeta = (block: WorkoutBlock, index: number) => {
    const keys = [`blockId:${block.id}`, `block:${block.id}`, `${block.id}`];
    for (const key of keys) {
      if (intervalBlocks && intervalBlocks[key]) return intervalBlocks[key];
    }
    return findBuilderBlock(block, index) || null;
  };

  const segments: Segment[] = [];
  let order = 0;
  let usedAdvanced = false;

  orderedBlocks.forEach((block, idx) => {
    const blockId = typeof block.id === "number" ? block.id : idx;
    const blockTitle = block.title || block.block_type || `Bloque ${idx + 1}`;
    const blockType = (block.block_type || "").toUpperCase();
    const meta = findBlockMeta(block, idx) || {};
    const engine =
      meta.engine ||
      (blockType === "INTERVALS"
        ? "INTERVALS_WORK_REST"
        : blockType === "ROUNDS"
          ? "ROUNDS"
          : undefined);
    const rounds = Number(meta.rounds ?? block.rounds ?? 1) || 1;
    const patternRaw = toArray<string>(meta.pattern);
    const scenariosRaw = toArray<any>(meta.scenarios);
    const scenarioSeq = patternRaw.length
      ? patternRaw
      : scenariosRaw.map((s) => s?.label).filter(Boolean);
    const scenarioBase = scenarioSeq.length ? scenarioSeq : scenariosRaw.map((s) => s?.label).filter(Boolean);
    const scenarioLabels = scenarioBase.length ? scenarioBase : ["A"];
    const uniqueScenarioLabels = Array.from(new Set(scenarioLabels));
    const required = true;

    if (engine === "ROUNDS") {
      usedAdvanced = true;
      if (rounds <= 10) {
        for (let r = 1; r <= rounds; r += 1) {
          const scenarioKey = scenarioLabels[(r - 1) % scenarioLabels.length];
          segments.push({
            id: `round:${blockId}:${r}`,
            label: `${blockTitle} - R${r}${scenarioKey ? ` (${scenarioKey})` : ""}`,
            kind: "ROUND",
            roundIndex: r,
            scenarioKey,
            expectedType: "work",
            required,
            order: order++,
            blockId,
            blockTitle
          });
        }
      } else {
        const labels = uniqueScenarioLabels.length ? uniqueScenarioLabels : ["Total"];
        labels.forEach((scenarioKey) => {
          segments.push({
            id: `scenario:${blockId}:${scenarioKey}`,
            label: `${blockTitle} - Escenario ${scenarioKey} (total)`,
            kind: "SCENARIO",
            scenarioKey,
            expectedType: "work",
            required,
            order: order++,
            blockId,
            blockTitle
          });
        });
      }
      return;
    }

    if (engine === "INTERVALS_WORK_REST") {
      usedAdvanced = true;
      const scenarioRest = meta.scenario_rest_seconds ?? meta.rest_seconds;
      const usePerRound = rounds <= 8;
      if (usePerRound) {
        for (let r = 1; r <= rounds; r += 1) {
          scenarioLabels.forEach((scenarioKey) => {
            segments.push({
              id: `interval:${blockId}:r${r}:${scenarioKey || "work"}:work`,
              label: `${blockTitle} - R${r} ${scenarioKey || "Escenario"} (work)`,
              kind: "INTERVAL",
              roundIndex: r,
              scenarioKey,
              expectedType: "work",
              required,
              order: order++,
              blockId,
              blockTitle
            });
          });
          if (scenarioRest !== undefined && scenarioRest !== null) {
            segments.push({
              id: `interval:${blockId}:r${r}:rest`,
              label: `${blockTitle} - R${r} descanso`,
              kind: "INTERVAL",
              roundIndex: r,
              scenarioKey: "rest",
              expectedType: "rest",
              required: false,
              order: order++,
              blockId,
              blockTitle
            });
          }
        }
      } else {
        (uniqueScenarioLabels.length ? uniqueScenarioLabels : ["Escenario"]).forEach((scenarioKey) => {
          segments.push({
            id: `interval:${blockId}:${scenarioKey}:work`,
            label: `${blockTitle} - Escenario ${scenarioKey} (work total)`,
            kind: "INTERVAL",
            scenarioKey,
            expectedType: "work",
            required,
            order: order++,
            blockId,
            blockTitle
          });
        });
        if (scenarioRest !== undefined && scenarioRest !== null) {
          segments.push({
            id: `interval:${blockId}:rest-total`,
            label: `${blockTitle} - Descanso total`,
            kind: "INTERVAL",
            scenarioKey: "rest",
            expectedType: "rest",
            required: false,
            order: order++,
            blockId,
            blockTitle
          });
        }
      }
      return;
    }

    segments.push({
      id: `block:${blockId}`,
      label: `${blockTitle}`,
      kind: "BLOCK",
      expectedType: "work",
      required,
      order: order++,
      blockId,
      blockTitle
    });
  });

  const label = segments.some((s) => s.kind === "INTERVAL")
    ? "Tiempo por intervalos / escenarios"
    : segments.some((s) => s.kind === "ROUND")
      ? "Tiempo por rondas"
      : "Tiempo por bloques";

  const note = usedAdvanced ? undefined : "Este WOD no tiene estructura detallada; se registrara por bloques estandar.";

  return { segments, label, note, usedAdvanced };
};

const aggregateBlockTimes = (segments: Segment[], parsed: Record<string, number | null>, blocks: WorkoutBlock[]) => {
  const map = new Map<number, number>();
  segments.forEach((seg) => {
    if (seg.blockId === undefined || seg.blockId === null) return;
    const value = parsed[seg.id];
    if (!Number.isFinite(value) || (value as number) <= 0) return;
    map.set(seg.blockId, (map.get(seg.blockId) ?? 0) + (value as number));
  });
  return blocks.map((block, idx) => {
    const targetId = typeof block.id === "number" ? block.id : idx;
    return map.get(targetId) ?? 0;
  });
};

const kindLabel = (segment: Segment) => {
  if (segment.kind === "INTERVAL" && segment.expectedType === "rest") return "Descanso";
  if (segment.kind === "INTERVAL") return "Trabajo";
  if (segment.kind === "ROUND") return "Round";
  if (segment.kind === "SCENARIO") return "Escenario";
  return "Bloque";
};

export default function WorkoutTimePage() {
  const params = useParams<{ id: string }>();
  const workoutId = params?.id;
  const router = useRouter();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [mode, setMode] = useState<Mode>("total");
  const [totalInput, setTotalInput] = useState("");
  const [segmentInputs, setSegmentInputs] = useState<Record<string, string>>({});
  const [includeTotalOverride, setIncludeTotalOverride] = useState(false);
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

  const segmentPlan = useMemo<SegmentPlan>(() => {
    if (!workout) {
      return { segments: [], label: "Tiempo por bloques", note: undefined, usedAdvanced: false };
    }
    return buildSegmentPlan(workout, blocks);
  }, [workout, blocks]);

  const segmentKey = useMemo(() => segmentPlan.segments.map((seg) => seg.id).join("|"), [segmentPlan.segments]);

  useEffect(() => {
    if (!segmentPlan.segments.length) return;
    const defaults: Record<string, string> = {};
    segmentPlan.segments.forEach((seg) => {
      defaults[seg.id] = "";
    });
    setSegmentInputs(defaults);
    setIncludeTotalOverride(false);
  }, [workout?.id, segmentKey]);

  const parsedSegmentTimes = useMemo(() => {
    const map: Record<string, number | null> = {};
    segmentPlan.segments.forEach((seg) => {
      map[seg.id] = parseTimeInput(segmentInputs[seg.id] ?? "");
    });
    return map;
  }, [segmentInputs, segmentPlan.segments]);

  const computedTotal = useMemo(
    () =>
      segmentPlan.segments.reduce((acc, seg) => {
        const val = parsedSegmentTimes[seg.id];
        if (Number.isFinite(val)) return acc + (val as number);
        return acc;
      }, 0),
    [parsedSegmentTimes, segmentPlan.segments]
  );

  const blockTimesFromSegments = useMemo(
    () => aggregateBlockTimes(segmentPlan.segments, parsedSegmentTimes, blocks),
    [segmentPlan.segments, parsedSegmentTimes, blocks]
  );

  const segmentGroups = useMemo(() => {
    const groups = new Map<string, { key: string; title: string; items: Segment[] }>();
    segmentPlan.segments.forEach((seg) => {
      const key = `${seg.blockId ?? "seg"}-${seg.blockTitle ?? "otros"}`;
      if (!groups.has(key)) {
        groups.set(key, { key, title: seg.blockTitle || "Segmentos", items: [] });
      }
      groups.get(key)!.items.push(seg);
    });
    return Array.from(groups.values()).map((group) => ({
      ...group,
      items: group.items.sort((a, b) => a.order - b.order)
    }));
  }, [segmentPlan.segments]);

  const disableByBlocks = segmentPlan.segments.length === 0;

  const handleSegmentChange = (id: string, value: string) => {
    setSegmentInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    if (!workoutId) return;
    setError(null);

    const payloadBase = {
      method: mode,
      total_time_sec: 0,
      block_times_sec: undefined as number[] | undefined,
      segment_times_sec: undefined as Record<string, number> | undefined,
      segment_mode: segmentPlan.label
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
        await api.submitWorkoutTime(workoutId, payload);
        try {
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
      setError("Este WOD no tiene estructura para registrar por segmentos.");
      return;
    }

    const missingRequired = segmentPlan.segments.some((seg) => {
      if (!seg.required) return false;
      const val = parsedSegmentTimes[seg.id];
      return val === null || val === undefined || val <= 0;
    });
    if (missingRequired) {
      setError("Completa los segmentos requeridos en segundos o mm:ss.");
      return;
    }

    const segmentTimes: Record<string, number> = {};
    segmentPlan.segments.forEach((seg) => {
      const val = parsedSegmentTimes[seg.id];
      if (Number.isFinite(val) && (val as number) > 0) {
        segmentTimes[seg.id] = val as number;
      }
    });

    if (!Object.keys(segmentTimes).length) {
      setError("Introduce al menos un tiempo de segmento.");
      return;
    }

    const totalFromSegments = Object.values(segmentTimes).reduce((acc, v) => acc + v, 0);
    const totalOverride = includeTotalOverride ? parseTimeInput(totalInput) : null;
    const totalSeconds = totalOverride && totalOverride > 0 ? totalOverride : totalFromSegments;
    if (!totalSeconds || totalSeconds <= 0) {
      setError("Calculamos un total invalido. Revisa los tiempos ingresados.");
      return;
    }

    const payload = {
      ...payloadBase,
      total_time_sec: totalSeconds,
      block_times_sec: blockTimesFromSegments.length ? blockTimesFromSegments : undefined,
      segment_times_sec: segmentTimes
    };

    setSaving(true);
    try {
      await api.submitWorkoutTime(workoutId, payload);
      try {
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
        title="Registrar tiempos"
        description="Guarda tus tiempos totales o por segmentos coherentes con el WOD."
        className="rounded-3xl border border-white/5 bg-gradient-to-br from-slate-950/80 via-slate-950/60 to-slate-900/70 p-6 md:p-8 shadow-[0_14px_50px_rgba(0,0,0,0.55)]"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Modo de registro de tiempo</p>
            <p className="text-sm text-slate-200">Selecciona si registras un tiempo total o el desglose detallado.</p>
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
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Desglose</p>
                  <p className="text-sm text-slate-200">{segmentPlan.label}</p>
                  {segmentPlan.note && <p className="text-xs text-amber-300">{segmentPlan.note}</p>}
                </div>
                <label className="flex items-center gap-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={includeTotalOverride}
                    onChange={(e) => setIncludeTotalOverride(e.target.checked)}
                    className="h-4 w-4 rounded border border-white/20 bg-slate-900/70"
                  />
                  <span>Agregar tiempo total manual (opcional)</span>
                </label>
              </div>

              {includeTotalOverride && (
                <label className="block text-xs text-slate-400">
                  Tiempo total (segundos o mm:ss)
                  <input
                    value={totalInput}
                    onChange={(e) => setTotalInput(e.target.value)}
                    placeholder="1560 o 26:00"
                    className="mt-1 w-full rounded-2xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-white"
                  />
                </label>
              )}

              {!segmentPlan.segments.length && (
                <p className="text-sm text-amber-300">Este WOD no tiene bloques para registrar.</p>
              )}

              {segmentGroups.map((group) => (
                <div key={group.key} className="rounded-2xl border border-white/10 bg-slate-800/60 p-3 space-y-3">
                  <p className="text-sm font-semibold text-white">{group.title}</p>
                  {group.items.map((segment) => (
                    <div key={segment.id} className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-white">{segment.label}</p>
                        <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
                          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
                            {kindLabel(segment)}
                          </span>
                          {segment.roundIndex && (
                            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">R{segment.roundIndex}</span>
                          )}
                          {segment.scenarioKey && (
                            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
                              Escenario {segment.scenarioKey}
                            </span>
                          )}
                          {!segment.required && (
                            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-amber-200">Opcional</span>
                          )}
                        </div>
                      </div>
                      <label className="mt-2 block text-xs text-slate-400">
                        Tiempo (segundos o mm:ss)
                        <input
                          value={segmentInputs[segment.id] ?? ""}
                          onChange={(e) => handleSegmentChange(segment.id, e.target.value)}
                          placeholder="120 o 2:00"
                          className="mt-1 w-full rounded-2xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-white"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              ))}

              {computedTotal > 0 && (
                <p className="text-xs text-slate-400">Tiempo total calculado: {formatSeconds(computedTotal)}</p>
              )}
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
