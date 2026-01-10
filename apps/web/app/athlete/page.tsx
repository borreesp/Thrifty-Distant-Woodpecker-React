"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AthleteHeader } from "../../components/athlete/AthleteHeader";
import { AthleteRadar } from "../../components/athlete/AthleteRadar";
import { ProgressTimeline } from "../../components/athlete/ProgressTimeline";
import { MetricsPRs } from "../../components/athlete/MetricsPRs";
import { EquipmentSkills } from "../../components/athlete/EquipmentSkills";
import { FatigueStatus } from "../../components/athlete/FatigueStatus";
import { AchievementGrid } from "../../components/athlete/AchievementGrid";
import { MissionBoard } from "../../components/athlete/MissionBoard";
import { BenchmarkSummary } from "../../components/athlete/BenchmarkSummary";
import { useAthleteProfile } from "../../hooks/useAthlete";
import { api } from "../../lib/api";
import type { Equipment } from "../../lib/types";

export default function AthletePage() {
  const { data, loading, error } = useAthleteProfile();
  const [equipment, setEquipment] = useState<Equipment[]>([]);

  useEffect(() => {
    api.getEquipment().then(setEquipment).catch(() => setEquipment([]));
  }, []);

  const latestLoad = data?.training_load?.[0];
  const loadRatio = latestLoad?.load_ratio ?? null;
  const statusLabel: "verde" | "amarillo" | "rojo" =
    loadRatio && loadRatio > 1.2 ? "rojo" : loadRatio && loadRatio > 1.0 ? "amarillo" : "verde";
  const statusMessage =
    statusLabel === "rojo"
      ? "Riesgo de fatiga, reduce intensidad"
      : statusLabel === "amarillo"
        ? "Carga media, escucha sensaciones"
        : "Carga equilibrada, ideal para tecnica ligera";

  const radarValues = useMemo(() => {
    const map: Record<string, number> = {};
    data?.capacities.forEach((c) => {
      map[c.capacity.toLowerCase()] = c.value;
    });
    return [
      map["fuerza"] ?? 70,
      map["resistencia"] ?? map["cardio"] ?? 68,
      map["metcon"] ?? 65,
      map["gimnasticos"] ?? 62,
      map["movilidad"] ?? 60,
      map["mental"] ?? 64
    ];
  }, [data?.capacities]);

  const metrics = useMemo(() => {
    const bio = data?.biometrics;
    return [
      { label: "FC reposo", value: bio?.hr_rest ? `${bio.hr_rest} bpm` : "-", hint: bio?.hr_avg ? `media ${bio.hr_avg} bpm` : undefined },
      { label: "VO2 est.", value: bio?.vo2_est ? `${bio.vo2_est} ml/kg/min` : "-", hint: bio?.hrv ? `HRV ${bio.hrv}` : undefined },
      {
        label: "Recuperacion",
        value: bio?.recovery_time_hours ? `${bio.recovery_time_hours} h` : "-",
        hint: latestLoad?.acute_load ? `Carga: ${latestLoad.acute_load}` : undefined
      }
    ];
  }, [data?.biometrics, latestLoad?.acute_load]);

  const prs = useMemo(
    () =>
      (data?.prs ?? []).map((pr) => ({
        name: pr.movement,
        score: `${pr.value}${pr.unit ? ` ${pr.unit}` : ""}`,
        date: new Date(pr.achieved_at).toLocaleDateString("es-ES")
      })),
    [data?.prs]
  );

  const skills = useMemo(
    () =>
      (data?.skills ?? []).map((s) => ({
        name: s.movement,
        progress: Math.round(s.score)
      })),
    [data?.skills]
  );

  const headerName = "Demo Athlete";
  const levelLabel = data?.career ? `Nivel ${data.career.level}` : "Nivel -";
  const xpLabel = data?.career ? data.career.xp_total : "-";
  const progress = data?.career ? Math.round(data.career.progress_pct ?? 0) : 0;

  const timelineItems = useMemo(() => {
    if (!data?.achievements.length) {
      return [
        { title: "Bienvenido a HybridForce", date: "Hoy", type: "Carrera", delta: "+0 XP" }
      ];
    }
    return data.achievements.slice(-3).map((achievement) => ({
      title: achievement.name,
      date: achievement.unlocked_at ? new Date(achievement.unlocked_at).toLocaleDateString("es-ES") : "Hoy",
      type: achievement.category ?? "Logro",
      delta: achievement.xp_reward ? `+${achievement.xp_reward.toFixed(0)} XP` : undefined
    }));
  }, [data?.achievements]);

  const gear = useMemo((): { name: string; status?: string }[] => {
    if (!equipment.length) return [];
    return equipment.slice(0, 4).map((eq) => ({
      name: eq.name,
      status: eq.category ?? undefined
    }));
  }, [equipment]);

  return (
    <div className="space-y-8">
      <AthleteHeader name={headerName} level={levelLabel} xp={xpLabel} state={statusMessage} progress={progress} />

      {error && (
        <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
          Error cargando datos: {error}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <AthleteRadar values={radarValues} caption={data ? "Comparado con tu nivel" : "Esperando datos"} />
          <FatigueStatus
            status={statusLabel}
            message={statusMessage}
            metrics={[
              { label: "Carga 7d", value: latestLoad?.acute_load ? `${latestLoad.acute_load}` : "-" },
              { label: "Fatiga", value: statusLabel === "rojo" ? "Alta" : statusLabel === "amarillo" ? "Media" : "Baja" },
              { label: "Ratio", value: loadRatio ? loadRatio.toFixed(2) : "-" }
            ]}
          />
        </div>
        <div className="space-y-4">
          <ProgressTimeline items={timelineItems} />
          <BenchmarkSummary benchmarks={data?.benchmarks ?? []} />
        </div>
      </div>

      <MetricsPRs metrics={metrics} prs={prs} />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <AchievementGrid achievements={data?.achievements ?? []} />
        </div>
        <MissionBoard missions={data?.missions ?? []} />
      </div>

      <EquipmentSkills gear={gear} skills={skills.length ? skills : []} />

      {loading && <p className="text-sm text-slate-400">Cargando datos del atleta...</p>}
    </div>
  );
}
