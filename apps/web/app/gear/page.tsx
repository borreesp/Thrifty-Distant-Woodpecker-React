import { Button, Card, Section } from "@thrifty/ui";
import React from "react";

const gear = [
  {
    name: "Zapatillas mixtas",
    level: "Challenger",
    recommendation: "Salomon Aero Glide / Nike Metcon",
    category: "Calzado"
  },
  {
    name: "Cinturón olímpico",
    level: "Challenger",
    recommendation: "Pioneer Lever",
    category: "Fuerza"
  },
  {
    name: "Wearable",
    level: "Rookie+",
    recommendation: "Garmin Forerunner / Coros Pace",
    category: "Datos"
  }
];

export default function GearPage() {
  return (
    <Section
      title="Material recomendado"
      description="Según tu nivel y objetivo actual."
      actions={<Button variant="secondary">Actualizar nivel</Button>}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {gear.map((item) => (
          <Card
            key={item.name}
            title={item.name}
            subtitle={`${item.category} · Nivel ${item.level}`}
          >
            <p className="text-sm text-slate-300">{item.recommendation}</p>
            <div className="mt-3 flex items-center justify-between">
              <Button variant="ghost" size="sm">
                Ver detalles
              </Button>
              <Button variant="primary" size="sm">
                Añadir a lista
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
