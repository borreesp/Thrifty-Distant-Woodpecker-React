"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { WorkoutDetailLayout } from "../../../../components/workout/WorkoutDetailLayout";
import { api } from "../../../../lib/api";
import type {
  AthleteProfileResponse,
  AuthUser,
  Equipment,
  Workout,
  WorkoutAnalysis
} from "../../../../lib/types";
import { expectedMetricKeys, recordMetrics } from "../../../../lib/metrics-debug";
import { adaptAthleteImpact, adaptAthleteProfile, adaptWorkoutComputedMetrics } from "../../../../lib/metrics/adapters";

type LoadState<T> = { data: T | null; loading: boolean; error?: string | null };

export default function WodAnalysisResultPage() {
  const params = useParams<{ id: string }>();
  const workoutId = params?.id;

  const [workoutState, setWorkoutState] = useState<LoadState<Workout>>({ data: null, loading: true });
  const [analysisState, setAnalysisState] = useState<LoadState<WorkoutAnalysis>>({ data: null, loading: true });
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [similarState, setSimilarState] = useState<LoadState<Workout[]>>({ data: null, loading: true });
  const [athleteProfile, setAthleteProfile] = useState<AthleteProfileResponse | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [applyState, setApplyState] = useState<{ applying: boolean; applied: boolean; error: string | null }>({
    applying: false,
    applied: false,
    error: null
  });

  useEffect(() => {
    if (!workoutId) return;
    setWorkoutState((prev) => ({ ...prev, loading: true }));
    setAnalysisState((prev) => ({ ...prev, loading: true }));
    setSimilarState((prev) => ({ ...prev, loading: true }));

    Promise.all([
      api.getWorkoutStructure(workoutId),
      api.getWorkoutAnalysis(workoutId).catch(() => null),
      api.getWorkoutSimilar?.(workoutId).catch(() => null),
      api.getEquipment().catch(() => []),
      api.getAthleteProfile().catch(() => null),
      api.me().catch(() => null)
    ])
      .then(([workoutPayload, analysisPayload, similarPayload, equipmentPayload, athletePayload, mePayload]) => {
        setWorkoutState({ data: workoutPayload, loading: false });
        setAnalysisState({ data: analysisPayload, loading: false });
        setSimilarState({ data: similarPayload, loading: false });
        setEquipment(equipmentPayload ?? []);
        setAthleteProfile(athletePayload);
        setUser(mePayload?.user ?? null);
        setApplyState((prev) => ({
          ...prev,
          applied: Boolean(analysisPayload?.applied)
        }));
      })
      .catch((err) => {
        const message = err instanceof Error ? err.message : "Error";
        setWorkoutState({ data: null, loading: false, error: message });
        setAnalysisState({ data: null, loading: false, error: message });
        setSimilarState((prev) => ({ ...prev, loading: false, error: message }));
      });
  }, [workoutId]);

  const workout = workoutState.data;
  const analysis = analysisState.data;

  useEffect(() => {
    setApplyState((prev) => ({
      ...prev,
      applied: Boolean(analysis?.applied)
    }));
  }, [analysis?.applied]);

  useEffect(() => {
    if (!workout) return;
    recordMetrics("wodAnalysisResult", "athleteProfile", adaptAthleteProfile(athleteProfile ?? undefined as any), [
      ...expectedMetricKeys.capacities,
      ...expectedMetricKeys.biometrics,
      ...expectedMetricKeys.load,
      ...expectedMetricKeys.state
    ]);
    recordMetrics("wodAnalysisResult", "workoutMetadata", adaptWorkoutComputedMetrics(workout as any), [
      ...expectedMetricKeys.hyrox,
      "estimated_difficulty",
      "avg_time_seconds",
      "avg_rating",
      "avg_difficulty",
      "work_rest_ratio"
    ]);
    if (analysis) {
      recordMetrics("wodAnalysisResult", "athleteImpact", adaptAthleteImpact((analysis as any).athlete_impact as any));
    }
  }, [analysis, athleteProfile, workout]);

  const similarWorkouts = useMemo(() => similarState.data ?? [], [similarState.data]);

  const handleApplyImpact = async () => {
    if (!workoutId || !workout) {
      console.warn("[applyImpact] Falta workoutId o workout cargado");
      setApplyState((prev) => ({ ...prev, error: "No hay WOD cargado." }));
      return;
    }
    if (!analysis) {
      console.warn("[applyImpact] No hay analisis disponible para aplicar impacto");
    }
    if (analysis && !(analysis as any).athlete_impact) {
      console.warn("[applyImpact] Analisis sin athlete_impact; el backend deberia calcularlo antes de aplicar.", analysis);
    }
    setApplyState((prev) => ({ ...prev, applying: true, error: null }));
    try {
      const response = await api.applyWorkoutImpact(workoutId, analysis?.id ? { analysis_id: analysis.id } : {});
      setApplyState({ applying: false, applied: Boolean(response.applied), error: null });
      if (!response.impact) {
        console.warn("[applyImpact] Impacto vacio en la respuesta", response);
      }
      if (response.updated_profile) {
        setAthleteProfile(response.updated_profile);
      }
      if (response.analysis) {
        setAnalysisState({ data: response.analysis, loading: false });
      } else if (analysis) {
        setAnalysisState((prev) => ({
          ...prev,
          data: { ...analysis, applied: response.applied ?? true, applied_at: response.applied_at }
        }));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo aplicar el entrenamiento.";
      console.error("[applyImpact] Error aplicando impacto", err);
      setApplyState((prev) => ({ ...prev, applying: false, error: message }));
    }
  };

  if (workoutState.loading) return <p className="text-sm text-slate-400">Cargando analisis...</p>;
  if (!workout) return <p className="text-sm text-rose-300">WOD no encontrado.</p>;

  return (
    <WorkoutDetailLayout
      mode="analysis"
      workout={workout}
      analysis={analysis}
      equipment={equipment}
      athleteProfile={athleteProfile}
      user={user}
      similarWorkouts={similarWorkouts}
      impactApplied={applyState.applied || Boolean(analysis?.applied)}
      onApplyImpact={handleApplyImpact}
      applyingImpact={applyState.applying}
      applyError={applyState.error}
    />
  );
}
