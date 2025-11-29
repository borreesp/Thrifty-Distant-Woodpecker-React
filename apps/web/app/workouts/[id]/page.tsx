import React from "react";
import { Section } from "@thrifty/ui";
import { WorkoutDetailHeader } from "../../../components/workout/WorkoutDetailHeader";
import { HexStatCard } from "../../../components/workout/HexStatCard";
import { AthleteRadarChart } from "../../../components/workout/AthleteRadarChart";
import { WorkoutBlockCard } from "../../../components/workout/WorkoutBlockCard";
import { GearMiniCard } from "../../../components/workout/GearMiniCard";
import { PhysioBenefitCard } from "../../../components/workout/PhysioBenefitCard";
import { FeelingIndicator } from "../../../components/workout/FeelingIndicator";
import { StartHexButton } from "../../../components/workout/StartHexButton";

const workout = {
  id: "engine-builder",
  name: "Engine Builder",
  type: "engine",
  duration: 45,
  intensity: "moderate",
  recommendedLevel: "Intermedio",
  energy: {
    calories: 520,
    metabolicSystem: "aerobic"
  },
  skillImpact: {
    engine: 80,
    strength: 20,
    power: 10,
    agility: 40,
    speed: 30,
    mobility: 15
  },
  xp: {
    total: 220,
    perMinute: 5,
    progression: 30
  },
  muscles: {
    primary: ["Cuádriceps", "Glúteos"],
    secondary: ["Core", "Espalda baja"]
  },
  gear: ["Airbike", "Kettlebell", "Cuerda", "Esterilla"],
  blocks: [
    {
      title: "Calentamiento",
      duration: "7 min",
      steps: ["Movilidad general", "Activación escapular", "Remos suaves"]
    },
    {
      title: "Main Block",
      duration: "30 min",
      steps: ["Z3 constante", "Cadencia estable", "Respiración controlada"]
    },
    {
      title: "Cool Down",
      duration: "8 min",
      steps: ["Transición suave", "Respiración", "Estiramientos leves"]
    }
  ],
  benefits: ["Mejora cardiovascular", "Capacidad aeróbica", "Estabilidad core"],
  expectedFeeling:
    "Trabajo intenso pero sostenible. Burn en cuádriceps y respiración elevada en fase intermedia."
};

const hexStats = [
  { label: "XP total", value: `${workout.xp.total}`, subvalue: "+30% progresión" },
  { label: "Calorías", value: `${workout.energy.calories}`, subvalue: "Metabolic: Aeróbico" },
  { label: "XP / min", value: `${workout.xp.perMinute}`, subvalue: "Eficiencia" },
  { label: "Progresión", value: `${workout.xp.progression}%`, subvalue: "Modo carrera" }
];

const radarData = [
  { label: "Engine", value: workout.skillImpact.engine },
  { label: "Fuerza", value: workout.skillImpact.strength },
  { label: "Potencia", value: workout.skillImpact.power },
  { label: "Agilidad", value: workout.skillImpact.agility },
  { label: "Velocidad", value: workout.skillImpact.speed },
  { label: "Movilidad", value: workout.skillImpact.mobility }
];

export default function WorkoutDetailPage({ params }: { params: { id: string } }) {
  const data = workout; // futuro: fetch por params.id
  return (
    <div className="space-y-8">
      <Section title="Detalle de workout" description="Vista premium gamificada">
        <WorkoutDetailHeader
          name={data.name}
          type={data.type}
          duration={data.duration}
          intensity={data.intensity}
          recommendedLevel={data.recommendedLevel}
        />
      </Section>

      <Section title="Impacto y XP">
        <div className="grid gap-4 md:grid-cols-4">
          {hexStats.map((stat) => (
            <HexStatCard key={stat.label} {...stat} />
          ))}
        </div>
      </Section>

      <Section title="Impacto en habilidades">
        <AthleteRadarChart data={radarData} />
      </Section>

      <Section title="Bloques del workout" description="Calentamiento · Main · Cool down">
        <div className="grid gap-4 md:grid-cols-3">
          {data.blocks.map((block) => (
            <WorkoutBlockCard key={block.title} {...block} />
          ))}
        </div>
      </Section>

      <Section title="Material necesario">
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {data.gear.map((item) => (
            <GearMiniCard key={item} label={item} />
          ))}
        </div>
      </Section>

      <Section title="Beneficios fisiológicos">
        <div className="grid gap-3 md:grid-cols-3">
          {data.benefits.map((benefit) => (
            <PhysioBenefitCard key={benefit} label={benefit} />
          ))}
        </div>
      </Section>

      <Section title="Cómo te sentirás">
        <FeelingIndicator text={data.expectedFeeling} />
      </Section>

      <div className="flex justify-center pb-8">
        <StartHexButton />
      </div>
    </div>
  );
}
