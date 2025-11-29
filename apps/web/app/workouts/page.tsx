import { Section } from "@thrifty/ui";
import React from "react";
import { WorkoutCardAdvanced } from "../../components/ui/WorkoutCardAdvanced";

const workouts = [
  { title: "Engine Builder", focus: "Cardio · Z2", duration: "45 min", level: "Base", type: "cardio" as const },
  { title: "Strength Complex", focus: "Fuerza · Lower", duration: "60 min", level: "Intermedio", type: "strength" as const },
  { title: "Hybrid Sprint", focus: "Mixto · EMOM", duration: "30 min", level: "Explosivo", type: "hybrid" as const },
  { title: "Row & Carry", focus: "Cardio + Grip", duration: "25 min", level: "Challenger", type: "hybrid" as const }
];

export default function WorkoutsPage() {
  return (
    <Section
      title="Workouts"
      description="Gestión visual por categorías y niveles."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {workouts.map((w) => (
          <WorkoutCardAdvanced key={w.title} {...w} />
        ))}
      </div>
    </Section>
  );
}
