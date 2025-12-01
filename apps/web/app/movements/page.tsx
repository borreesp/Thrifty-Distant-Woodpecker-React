"use client";
import React, { useEffect, useState } from "react";
import { Section, Card } from "@thrifty/ui";
import { api } from "../../lib/api";
import type { Movement } from "../../lib/types";

export default function MovementsPage() {
  const [movements, setMovements] = useState<Movement[]>([]);

  useEffect(() => {
    api
      .getMovements()
      .then(setMovements)
      .catch(() => setMovements([]));
  }, []);

  return (
    <Section
      title="Movimientos"
      description="Cat\u00e1logo conectado a lookups de m\u00fasculo principal y uso por bloque."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {movements.map((movement) => (
          <Card
            key={movement.id}
            title={movement.name}
            subtitle={movement.category ?? ""}
            className="bg-white/5"
          >
            <div className="space-y-2 text-sm text-slate-200">
              {movement.description && <p className="text-slate-300">{movement.description}</p>}
              <p className="text-xs text-slate-400">Unidad por defecto: {movement.default_load_unit ?? "-"}</p>
              {movement.muscles.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-300">M\u00fasculos</p>
                  <ul className="flex flex-wrap gap-2">
                    {movement.muscles.map((m) => (
                      <li
                        key={`${movement.id}-${m.muscle_group}`}
                        className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200"
                      >
                        {m.muscle_group} {m.is_primary ? "(primario)" : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
