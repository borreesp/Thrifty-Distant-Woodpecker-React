"use client";
import React from "react";
import { AthleteHeader } from "../../components/athlete/AthleteHeader";
import { AthleteRadar } from "../../components/athlete/AthleteRadar";
import { ProgressTimeline } from "../../components/athlete/ProgressTimeline";
import { MetricsPRs } from "../../components/athlete/MetricsPRs";
import { EquipmentSkills } from "../../components/athlete/EquipmentSkills";
import { FatigueStatus } from "../../components/athlete/FatigueStatus";

const TIMELINE = [
  { title: "PR 5K run", date: "12 Feb 2025", type: "Endurance", delta: "-00:35" },
  { title: "Nivel 12", date: "18 Mar 2025", type: "Level up", delta: "+XP" },
  { title: "Medalla HYROX Sprint", date: "05 Apr 2025", type: "Badge", delta: "+transfer" }
];

const METRICS = [
  { label: "FC reposo", value: "48 bpm", hint: "-2 vs mes" },
  { label: "VO2 est.", value: "52 ml/kg/min", hint: "+1.1" },
  { label: "Recuperacion", value: "1.4 h", hint: "post WOD" }
];

const PRS = [
  { name: "Back squat", score: "150 kg", date: "Feb 2025" },
  { name: "5K Run", score: "19:32", date: "Mar 2025" },
  { name: "Burpees 5min", score: "82 reps", date: "Abr 2025" },
  { name: "Assault 10min", score: "200 cal", date: "Abr 2025" }
];

const GEAR = [
  { name: "Saco 20kg", status: "Equipado" },
  { name: "Chaleco 10kg", status: "Disponible" },
  { name: "Bandas resistencia", status: "Equipado" },
  { name: "Zapatillas hybrido", status: "Equipado" }
];

const SKILLS = [
  { name: "Sled push", progress: 78 },
  { name: "Wall balls", progress: 82 },
  { name: "Row cadence", progress: 74 },
  { name: "Transitions", progress: 68 }
];

export default function AthletePage() {
  return (
    <div className="space-y-8">
      <AthleteHeader name="Atleta Hibrido" level="Nivel 12" xp="12 480" age="28" state="Recuperado" progress={72} />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <AthleteRadar values={[82, 76, 74, 70, 66, 80]} caption="Comparado con media: +6%" />
          <FatigueStatus
            status="verde"
            message="Carga equilibrada, ideal para tecnica ligera"
            metrics={[
              { label: "Carga 7d", value: "7.2 h" },
              { label: "Fatiga", value: "Media" },
              { label: "Sueno", value: "7.4 h" }
            ]}
          />
        </div>
        <div className="space-y-4">
          <ProgressTimeline items={TIMELINE} />
        </div>
      </div>

      <MetricsPRs metrics={METRICS} prs={PRS} />

      <EquipmentSkills gear={GEAR} skills={SKILLS} />
    </div>
  );
}
