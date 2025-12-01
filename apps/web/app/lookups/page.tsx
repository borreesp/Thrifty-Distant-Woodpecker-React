"use client";
import React, { useEffect, useState } from "react";
import { Section, Card } from "@thrifty/ui";
import { api } from "../../lib/api";
import type { LookupTables } from "../../lib/types";

const TABLES: { key: keyof LookupTables; label: string }[] = [
  { key: "athlete_levels", label: "Athlete levels" },
  { key: "intensity_levels", label: "Intensity" },
  { key: "energy_domains", label: "Energy domains" },
  { key: "physical_capacities", label: "Capacidades" },
  { key: "muscle_groups", label: "Muscle groups" },
  { key: "hyrox_stations", label: "HYROX stations" }
];

export default function LookupsPage() {
  const [data, setData] = useState<LookupTables | null>(null);

  useEffect(() => {
    api
      .getLookupTables()
      .then(setData)
      .catch(() => setData(null));
  }, []);

  return (
    <Section
      title="Lookups"
      description="Tablas catalogo conectadas al backend"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {TABLES.map((table) => (
          <Card key={table.key} title={table.label} className="bg-white/5">
            <ul className="space-y-2 text-sm text-slate-200">
              {(data?.[table.key] ?? []).map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2"
                >
                  <span>{item.name}</span>
                  <span className="text-xs text-slate-400">{item.code}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}
