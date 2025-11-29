"use client";
import React from "react";
import { Section } from "@thrifty/ui";
import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { BioMetricGrid } from "../../components/profile/BioMetricGrid";
import { HexRadarChart } from "../../components/charts/HexRadarChart";
import { PhysiologyPanel } from "../../components/profile/PhysiologyPanel";
import { StrengthStatsCard } from "../../components/profile/StrengthStatsCard";
import { EnduranceStatsCard } from "../../components/profile/EnduranceStatsCard";
import { MentalStateCard } from "../../components/profile/MentalStateCard";
import { LifestyleCard } from "../../components/profile/LifestyleCard";
import { SubjectiveNotesCard } from "../../components/profile/SubjectiveNotesCard";
import { TabbedSection } from "../../components/ui/TabbedSection";

const athlete = {
  name: "Alex Atleta",
  level: "Challenger",
  xp: 3420,
  xpToNext: 4800,
  avatar: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800",
  anthropometrics: {
    peso: "78 kg",
    altura: "178 cm",
    grasa: "12.5 %",
    vo2max: "53 ml/kg/min",
    fcReposo: "48 bpm",
    hrv: "82 ms"
  },
  physiology: {
    vo2max: "53 ml/kg/min",
    lactato: "LT2: 4.2 mmol",
    metabolismo: "Aeróbico dominante",
    eficienciaO2: "Alto",
    recuperacion: "12 h"
  },
  strength_max: {
    squat: "190 kg",
    bench: "135 kg",
    deadlift: "220 kg",
    clean: "120 kg",
    snatch: "95 kg",
    jerk: "125 kg",
    pullups: "22 reps",
    dips: "28 reps",
    power: "1250 W",
    verticalJump: "58 cm"
  },
  strength_submax_power: {},
  aerobic_endurance: {
    run5k: "19:45",
    run10k: "41:10",
    pace1k: "3:55 /km",
    pace3k: "4:05 /km",
    row500: "1:32",
    row2k: "7:02",
    ftp: "275 W",
    assault1: "70 cal",
    assault10: "180 cal",
    anaerobicScore: "87",
    metconEfficiency: "A-"
  },
  anaerobic_capacity: {},
  mobility_stability: {},
  skills: {
    engine: 82,
    fuerza: 78,
    potencia: 74,
    velocidad: 70,
    agilidad: 68,
    movilidad: 65
  },
  psychology: {
    motivacion: 9,
    disciplina: 9,
    enfoque: 8,
    estres: 4,
    frustracion: 3,
    drive_competitivo: 8,
    consistencia: 9
  },
  lifestyle: {
    horas_sueno: "7h 45m",
    calidad_sueno: "Alta",
    hidratacion: "3.2L/día",
    nutricion: "Equilibrada + 140g proteína",
    pasos_diarios: "12.5k",
    experiencia: "5 años",
    frecuencia_semanal: "6 sesiones",
    recuperacion: "Movilidad + sauna + sueño"
  },
  subjective_data: {
    energia: "8/10",
    fatiga: "3/10",
    estado_emocional: "Enfocado",
    dolor_articular: "1/10",
    rpe_medio: "7.5",
    recuperacion_percibida: "8/10"
  },
  progression: {}
};

const bioStats = [
  { label: "Peso", value: athlete.anthropometrics.peso },
  { label: "Altura", value: athlete.anthropometrics.altura },
  { label: "% Grasa", value: athlete.anthropometrics.grasa },
  { label: "VO2max", value: athlete.anthropometrics.vo2max },
  { label: "FC reposo", value: athlete.anthropometrics.fcReposo },
  { label: "HRV", value: athlete.anthropometrics.hrv }
];

const physiologyItems = [
  { label: "VO2max", value: athlete.physiology.vo2max },
  { label: "Umbral lactato", value: athlete.physiology.lactato },
  { label: "Metabolismo", value: athlete.physiology.metabolismo },
  { label: "Eficiencia O2", value: athlete.physiology.eficienciaO2 },
  { label: "Recuperación", value: athlete.physiology.recuperacion }
];

const radarData = [
  { label: "Engine", value: athlete.skills.engine },
  { label: "Fuerza", value: athlete.skills.fuerza },
  { label: "Potencia", value: athlete.skills.potencia },
  { label: "Velocidad", value: athlete.skills.velocidad },
  { label: "Agilidad", value: athlete.skills.agilidad },
  { label: "Movilidad", value: athlete.skills.movilidad }
];

export default function ProfilePage() {
  const tabs = [
    { id: "perfil", label: "Perfil" },
    { id: "bio", label: "Biometría" },
    { id: "skills", label: "Skills radar" },
    { id: "fisio", label: "Estado fisiológico" },
    { id: "fuerza", label: "Fuerza máxima" },
    { id: "endurance", label: "Endurance" },
    { id: "mental", label: "Mental / Hábitos" },
    { id: "subjetivo", label: "Datos subjetivos" }
  ];

  const renderTab = (active: string) => {
    switch (active) {
      case "perfil":
        return (
          <ProfileHeader
            name={athlete.name}
            level={athlete.level}
            xp={athlete.xp}
            xpToNext={athlete.xpToNext}
            avatar={athlete.avatar}
          />
        );
      case "bio":
        return <BioMetricGrid stats={bioStats} />;
      case "skills":
        return <HexRadarChart data={radarData} stroke="#FEC94F" fill="#FEC94F" />;
      case "fisio":
        return <PhysiologyPanel items={physiologyItems} />;
      case "fuerza":
        return <StrengthStatsCard strength={athlete.strength_max} />;
      case "endurance":
        return <EnduranceStatsCard endurance={athlete.aerobic_endurance} />;
      case "mental":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <MentalStateCard mental={athlete.psychology} />
            <LifestyleCard lifestyle={athlete.lifestyle} />
          </div>
        );
      case "subjetivo":
        return <SubjectiveNotesCard subjective={athlete.subjective_data} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Section title="Perfil" description="Vista premium del atleta híbrido">
        <TabbedSection tabs={tabs} initialId="perfil" renderContent={renderTab} />
      </Section>
    </div>
  );
}
