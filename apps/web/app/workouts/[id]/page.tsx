"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { WorkoutDetailLayout } from "../../../components/workout/WorkoutDetailLayout";
import { api } from "../../../lib/api";
import type {
  AthleteProfileResponse,
  AuthUser,
  Equipment,
  Workout,
  WorkoutAnalysis,
  WorkoutResult
} from "../../../lib/types";

type LoadState<T> = { data: T | null; loading: boolean; error?: string | null };

export default function WorkoutDetailPage() {
  const params = useParams<{ id: string }>();
  const workoutId = params?.id;

  const [workoutState, setWorkoutState] = useState<LoadState<Workout>>({ data: null, loading: true });
  const [analysisState, setAnalysisState] = useState<LoadState<WorkoutAnalysis>>({ data: null, loading: true });
  const [similarState, setSimilarState] = useState<LoadState<Workout[]>>({ data: null, loading: true });
  const [resultsState, setResultsState] = useState<LoadState<WorkoutResult[]>>({ data: null, loading: true });
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [athleteProfile, setAthleteProfile] = useState<AthleteProfileResponse | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [savingResult, setSavingResult] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!workoutId) return;
    setWorkoutState((prev) => ({ ...prev, loading: true }));
    setAnalysisState((prev) => ({ ...prev, loading: true }));
    setSimilarState((prev) => ({ ...prev, loading: true }));
    setResultsState((prev) => ({ ...prev, loading: true }));

    Promise.all([
      api.getWorkoutStructure(workoutId),
      api.getWorkoutAnalysis(workoutId).catch(() => null),
      api.getWorkoutSimilar?.(workoutId).catch(() => null),
      api.getEquipment().catch(() => []),
      api.getAthleteProfile().catch(() => null),
      api.getWorkoutResults?.(workoutId).catch(() => []),
      api.me().catch(() => null)
    ])
      .then(([workoutPayload, analysisPayload, similarPayload, equipmentPayload, athletePayload, resultsPayload, mePayload]) => {
        setWorkoutState({ data: workoutPayload, loading: false });
        setAnalysisState({ data: analysisPayload, loading: false });
        setSimilarState({ data: similarPayload, loading: false });
        setEquipment(equipmentPayload ?? []);
        setAthleteProfile(athletePayload);
        setResultsState({ data: resultsPayload ?? [], loading: false });
        setUser(mePayload?.user ?? null);
      })
      .catch((err) => {
        const message = err instanceof Error ? err.message : "Error";
        setWorkoutState({ data: null, loading: false, error: message });
        setAnalysisState((prev) => ({ ...prev, loading: false, error: message }));
        setResultsState((prev) => ({ data: prev.data ?? [], loading: false, error: message }));
      });
  }, [workoutId]);

  const workout = workoutState.data;
  const analysis = analysisState.data;

  const handleSubmit = async (formState: { time_seconds: number; difficulty: number; rating: number; comment: string }) => {
    if (!workoutId) return;
    setSavingResult(true);
    setFeedback(null);
    try {
      const response = await api.submitWorkoutResult(workoutId, formState);
      if (response?.result) {
        setResultsState((prev) => ({
          data: [...(prev.data ?? []), response.result],
          loading: false,
          error: null
        }));
      }
      setFeedback(response ? `Guardado. +${response.xp_awarded} XP (nivel ${response.level}).` : "Resultado guardado.");
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setSavingResult(false);
    }
  };

  if (workoutState.loading) {
    return <p className="text-sm text-slate-400">Cargando workout...</p>;
  }

  if (!workout) {
    return <p className="text-sm text-rose-300">Workout no encontrado.</p>;
  }

  return (
    <WorkoutDetailLayout
      mode="workout"
      workout={workout}
      analysis={analysis}
      equipment={equipment}
      athleteProfile={athleteProfile}
      user={user}
      results={resultsState.data ?? []}
      similarWorkouts={similarState.data ?? []}
      feedback={feedback}
      savingResult={savingResult}
      onSubmitResult={handleSubmit}
    />
  );
}
