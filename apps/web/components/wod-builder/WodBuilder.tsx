"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Section } from "@thrifty/ui";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useDraggable,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AthleteImpact } from "../wod-analysis/AthleteImpact";
import { calculateHyroxTransfer, HyroxTransferResult } from "../../lib/hyrox";
import { expectedMetricKeys, recordMetrics } from "../../lib/metrics-debug";
import { adaptAthleteProfile, adaptAthleteImpact } from "../../lib/metrics/adapters";
import { api } from "../../lib/api";
import type { AthleteProfileResponse, Movement, WorkoutCreatePayload } from "../../lib/types";

type WodMovement = {
  uid: string;
  movement: Movement;
  reps?: number;
  load?: number;
  load_unit?: string | null;
  distance_meters?: number;
  duration_seconds?: number;
  comment?: string;
  pace?: string;
};

type WodBlock = {
  id: string;
  title: string;
  type?: string;
  notes?: string;
  movements: WodMovement[];
};

type DragItem =
  | { type: "template"; movementId: number }
  | { type: "movement"; blockId: string; uid: string };

type DropZone =
  | { type: "block"; blockId: string }
  | { type: "movement"; blockId: string; uid: string };

type AnalysisResult = {
  fatigue: number;
  domain: string;
  intensity: string;
  hyroxTransfer: number;
  hyroxDetail: HyroxTransferResult;
  totalTime: number;
  difficulty: number;
  pacing: string;
  capacities: { key: string; value: number }[];
  muscles: { key: string; value: number }[];
  impact: Record<string, number>;
};

const pill =
  "inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-200";

const sectionShell =
  "rounded-3xl border border-white/5 bg-gradient-to-br from-slate-950/85 via-slate-950/60 to-slate-900/70 shadow-[0_12px_50px_rgba(0,0,0,0.45)] backdrop-blur px-5 md:px-7 py-5 md:py-7";

const cardShell =
  "rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950/80 via-slate-950/60 to-slate-900/70 shadow-[0_10px_35px_rgba(0,0,0,0.45)]";

const uid = () => Math.random().toString(36).slice(2, 9);

const categorizeMovement = (movement: Movement) => {
  const name = (movement.name || "").toLowerCase();
  const category = (movement.category || "").toLowerCase();
  if (category.includes("gimn")) return "Gimnasticos";
  if (category.includes("strength") || category.includes("fuerza")) return "Fuerza";
  if (category.includes("cardio")) return "Monoestructurales";
  if (name.includes("run") || name.includes("row") || name.includes("bike")) return "Monoestructurales";
  if (name.includes("sled") || name.includes("wall ball") || category.includes("hyrox")) return "HYROX Stations";
  if (category.includes("metcon")) return "Metcon";
  return "Auxiliares";
};

const getPrimaryMuscle = (movement: Movement) =>
  movement.muscles?.find((m) => m.is_primary)?.muscle_group ?? movement.muscles?.[0]?.muscle_group ?? "General";

const getEquipment = (movement: Movement) => {
  if (movement.default_load_unit) return `Carga (${movement.default_load_unit})`;
  if ((movement.category || "").toLowerCase().includes("bodyweight")) return "Bodyweight";
  return "General";
};

const getTags = (movement: Movement) => {
  const baseTags = new Set<string>();
  if (movement.category) baseTags.add(movement.category);
  const primaryMuscle = getPrimaryMuscle(movement);
  if (primaryMuscle) baseTags.add(primaryMuscle);
  return Array.from(baseTags);
};

const inferLoad = (item: WodMovement) => {
  const repsLoad = (item.reps ?? 0) * 0.25;
  const distanceLoad = (item.distance_meters ?? 0) * 0.01;
  const durationLoad = (item.duration_seconds ?? 0) * 0.02;
  const loadWeight = (item.load ?? 0) / 8;
  return repsLoad + distanceLoad + durationLoad + loadWeight + 1;
};

const computeAnalysis = (blocks: WodBlock[], athleteProfile?: AthleteProfileResponse | null): AnalysisResult => {
  let totalLoad = 0;
  let endurance = 0;
  let strength = 0;
  let metcon = 0;
  let gymnastics = 0;
  let hyrox = 0;
  const muscleLoad: Record<string, number> = {};

  blocks.forEach((block) => {
    block.movements.forEach((item) => {
      const ml = inferLoad(item);
      totalLoad += ml;
      const name = (item.movement.name || "").toLowerCase();
      const category = (item.movement.category || "").toLowerCase();
      if (category.includes("cardio") || name.includes("run") || name.includes("row") || name.includes("ski")) endurance += ml;
      if (category.includes("strength") || category.includes("fuerza") || name.includes("deadlift")) strength += ml;
      if (category.includes("metcon") || name.includes("burpee")) metcon += ml;
      if (category.includes("gimn") || name.includes("pull-up") || name.includes("muscle")) gymnastics += ml;
      if (name.includes("wall ball") || name.includes("sled") || name.includes("row") || name.includes("ski") || name.includes("run")) hyrox += ml;
      (item.movement.muscles || []).forEach((m) => {
        const key = m.muscle_group || "General";
        muscleLoad[key] = (muscleLoad[key] ?? 0) + (m.is_primary ? ml : ml * 0.5);
      });
    });
  });

  const totalTime = blocks.reduce((acc, block) => {
    const t = block.movements.reduce((sum, mv) => {
      if (mv.duration_seconds) return sum + mv.duration_seconds;
      if (mv.distance_meters) return sum + mv.distance_meters * 0.3;
      if (mv.reps) return sum + mv.reps * 2.5;
      return sum + 20;
    }, 0);
    return acc + t;
  }, 0);

  const capacityTotals = [
    { key: "resistencia", value: endurance },
    { key: "fuerza", value: strength },
    { key: "metcon", value: metcon },
    { key: "gimnasticos", value: gymnastics }
  ];
  const sortedCap = [...capacityTotals].sort((a, b) => b.value - a.value);
  const capacities = sortedCap.slice(0, 3);
  const domain = capacities[0]?.key || "Mixto";

  const fatigue = Math.min(10, Math.round(totalLoad / 7));
  const difficulty = Math.min(10, Math.round((totalLoad + hyrox * 0.25) / 9));
  const intensity = fatigue >= 8 ? "Alta" : fatigue >= 5 ? "Media" : "Baja";
  const hyroxTransfer = Math.min(100, Math.round((hyrox / Math.max(totalLoad, 1)) * 100));
  const pacing =
    totalTime > 0 ? `Objetivo ${Math.round(totalTime / 60)}-${Math.round(totalTime / 60 + 3)} min (${intensity})` : "Define bloques para sugerir pacing";

  const impact: Record<string, number> = {};
  capacityTotals.forEach((cap) => {
    const normalized = Math.round((cap.value / Math.max(totalLoad, 1)) * 4);
    impact[cap.key] = normalized;
  });
  const dominantMuscle = Object.entries(muscleLoad).sort((a, b) => b[1] - a[1])[0];
  if (dominantMuscle) impact.carga_muscular = Math.round((dominantMuscle[1] / Math.max(totalLoad, 1)) * 4);
  if (hyrox > 0) impact.wallball_skill = 1;
  if (fatigue) impact.fatigue = fatigue;

  if (athleteProfile?.capacities?.length) {
    athleteProfile.capacities.forEach((c) => {
      const key = c.capacity.toLowerCase();
      if (impact[key] !== undefined) {
        impact[key] = Math.max(0, Math.round(impact[key] - c.value / 120));
      }
    });
  }

  const muscles = Object.entries(muscleLoad).map(([key, value]) => ({ key, value: Math.round(value) }));
  const hyroxDetail = calculateHyroxTransfer({
    blocks: blocks.map((b) => ({
      movements: b.movements.map((mv) => ({
        reps: mv.reps,
        distance_meters: mv.distance_meters,
        duration_seconds: mv.duration_seconds,
        movement: { name: mv.movement.name, category: mv.movement.category }
      }))
    })),
    intensity,
    work_rest_ratio: "1:1",
    volume_total: totalTime.toString()
  });

  return {
    fatigue,
    domain,
    intensity,
    hyroxTransfer: hyroxDetail.transferScore,
    hyroxDetail,
    totalTime: Math.round(totalTime),
    difficulty,
    pacing,
    capacities,
    muscles,
    impact
  };
};

const buildAthleteProfileMetrics = (profile?: AthleteProfileResponse | null) => {
  if (!profile) return {};
  const map: Record<string, number> = {};
  (profile.capacities ?? []).forEach((c) => {
    if (c.capacity) map[c.capacity.toLowerCase()] = c.value;
  });
  const bio = profile.biometrics;
  if (bio) {
    if (bio.fatigue_score !== undefined && bio.fatigue_score !== null) map.fatigue_score = Number(bio.fatigue_score);
    if (bio.hr_rest) map.hr_rest = Number(bio.hr_rest);
    if (bio.vo2_est) map.vo2_est = Number(bio.vo2_est);
  }
  const load = profile.training_load?.[0];
  if (load) {
    if (load.acute_load) map.acute_load = Number(load.acute_load);
    if (load.load_ratio) map.load_ratio = Number(load.load_ratio);
  }
  return map;
};

const normalizeCapacity = (raw: string) => {
  const base = raw.toLowerCase();
  if (base.includes("resis")) return "Resistencia";
  if (base.includes("fuerza")) return "Fuerza";
  if (base.includes("gim")) return "Gimnasticos";
  if (base.includes("metcon")) return "Metcon";
  if (base.includes("velocidad")) return "Velocidad";
  return "Metcon";
};

const normalizeMuscle = (raw: string) => {
  const base = raw.toLowerCase();
  if (base.includes("pierna")) return "Piernas";
  if (base.includes("core")) return "Core";
  if (base.includes("hombro")) return "Hombros";
  if (base.includes("posterior")) return "Posterior";
  if (base.includes("grip") || base.includes("agarre")) return "Grip";
  if (base.includes("pecho")) return "Pecho";
  if (base.includes("brazo") || base.includes("bicep") || base.includes("tricep")) return "Brazos";
  return "Core";
};

const normalizeDomain = (raw: string) => {
  const base = raw.toLowerCase();
  if (base.includes("aer")) return "Aerobico";
  if (base.includes("anaer")) return "Anaerobico";
  return "Mixto";
};

const normalizeIntensity = (raw: string) => {
  const base = raw.toLowerCase();
  if (base.includes("alta")) return "Alta";
  if (base.includes("media")) return "Media";
  return "Baja";
};

const toNumber = (value: number | undefined) => (typeof value === "number" && Number.isFinite(value) ? value : undefined);

export function DraggableMovementItem({ movement }: { movement: Movement }) {
  const category = categorizeMovement(movement);
  const primaryMuscle = getPrimaryMuscle(movement);
  const equipment = getEquipment(movement);
  const tags = getTags(movement);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `template-${movement.id}`,
    data: { type: "template", movementId: movement.id }
  });
  const style = {
    transform: CSS.Translate.toString(transform ?? { x: 0, y: 0 }),
    opacity: isDragging ? 0.6 : 1
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="group cursor-grab rounded-xl border border-white/10 bg-white/5 p-3 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:border-cyan-400/40"
      style={style}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold leading-tight">{movement.name}</p>
          <p className="text-[11px] text-slate-400">Tipo: {movement.category || "Sin categoria"}</p>
        </div>
        <span className="rounded-full bg-slate-800 px-2 py-1 text-[11px] uppercase tracking-wide text-slate-200">{category}</span>
      </div>
      <div className="mt-2 grid gap-1 text-[11px] text-slate-300">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-slate-900/60 px-2 py-1">Grupo: {primaryMuscle}</span>
          <span className="rounded-full bg-slate-900/60 px-2 py-1">Equipamiento: {equipment}</span>
          <span className="rounded-full bg-slate-900/60 px-2 py-1">Codigo #{movement.id}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span key={`${movement.id}-${tag}`} className="rounded-full bg-slate-900/60 px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MovementPalette({ movements }: { movements: Movement[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return movements;
    return movements.filter((mv) => {
      const haystack = [
        mv.name,
        mv.category,
        getPrimaryMuscle(mv),
        mv.default_load_unit,
        ...getTags(mv)
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [movements, search]);

  const grouped = useMemo(() => {
    const map: Record<string, Movement[]> = {};
    filtered.forEach((mv) => {
      const cat = categorizeMovement(mv);
      if (!map[cat]) map[cat] = [];
      map[cat].push(mv);
    });
    return map;
  }, [filtered]);

  return (
    <div className={`${cardShell} p-4 space-y-3`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Movimientos disponibles</p>
          <p className="text-sm text-slate-300">Arrastra para construir el WOD</p>
        </div>
        <span className={pill}>{filtered.length} items</span>
      </div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por nombre, grupo o tipo..."
        className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-white"
      />
      <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
        {Object.entries(grouped).map(([cat, items]) => (
          <span key={cat} className="rounded-full bg-slate-900/60 px-2 py-1">
            {cat} · {items.length}
          </span>
        ))}
      </div>
      <div className="space-y-3 max-h-[72vh] overflow-auto pr-1">
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} className="space-y-2">
            <p className="text-[11px] uppercase tracking-wide text-slate-400">{cat}</p>
            <div className="grid gap-2">
              {items.map((mv) => (
                <DraggableMovementItem key={mv.id} movement={mv} />
              ))}
            </div>
          </div>
        ))}
        {!filtered.length && <p className="text-sm text-slate-400">No hay movimientos que coincidan.</p>}
      </div>
    </div>
  );
}

export function MovementEditor({
  movement,
  onChange,
  onRemove,
  dragHandleProps
}: {
  movement: WodMovement;
  onChange: (mv: WodMovement) => void;
  onRemove: () => void;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            {...dragHandleProps}
            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-slate-900/50 text-xs text-slate-300 hover:border-cyan-400/50"
            aria-label="Mover movimiento"
          >
            ::
          </button>
          <div>
            <p className="font-semibold leading-tight">{movement.movement.name}</p>
            <p className="text-[11px] text-slate-400">{movement.movement.category || "Sin categoria"}</p>
          </div>
        </div>
        <button type="button" onClick={onRemove} className="text-[11px] text-rose-200 hover:text-rose-100">
          Quitar
        </button>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <label className="grid gap-1 text-[11px] text-slate-400">
          Reps
          <input
            type="number"
            value={movement.reps ?? ""}
            placeholder="30"
            onChange={(e) => onChange({ ...movement, reps: e.target.value === "" ? undefined : Number(e.target.value) })}
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-2 py-2 text-xs text-white"
          />
        </label>
        <label className="grid gap-1 text-[11px] text-slate-400">
          Carga
          <div className="grid grid-cols-[1fr_auto] gap-2 rounded-lg border border-white/10 bg-slate-900/60 px-2 py-2 text-xs text-white">
            <input
              type="number"
              value={movement.load ?? ""}
              placeholder="45"
              onChange={(e) => onChange({ ...movement, load: e.target.value === "" ? undefined : Number(e.target.value) })}
              className="w-full bg-transparent outline-none"
            />
            <input
              type="text"
              value={movement.load_unit ?? ""}
              placeholder="Kg"
              onChange={(e) => onChange({ ...movement, load_unit: e.target.value })}
              className="w-16 bg-transparent text-right outline-none"
            />
          </div>
        </label>
        <label className="grid gap-1 text-[11px] text-slate-400">
          Distancia (m)
          <input
            type="number"
            value={movement.distance_meters ?? ""}
            placeholder="400"
            onChange={(e) =>
              onChange({ ...movement, distance_meters: e.target.value === "" ? undefined : Number(e.target.value) })
            }
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-2 py-2 text-xs text-white"
          />
        </label>
        <label className="grid gap-1 text-[11px] text-slate-400">
          Duracion estimada (s)
          <input
            type="number"
            value={movement.duration_seconds ?? ""}
            placeholder="90"
            onChange={(e) =>
              onChange({ ...movement, duration_seconds: e.target.value === "" ? undefined : Number(e.target.value) })
            }
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-2 py-2 text-xs text-white"
          />
        </label>
        <label className="grid gap-1 text-[11px] text-slate-400 md:col-span-2">
          Ritmo objetivo / pacing
          <input
            type="text"
            value={movement.pace ?? ""}
            placeholder="RPE 7 / 1:1 trabajo-descanso"
            onChange={(e) => onChange({ ...movement, pace: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-2 py-2 text-xs text-white"
          />
        </label>
        <label className="grid gap-1 text-[11px] text-slate-400 md:col-span-2">
          Comentarios / tecnica
          <input
            type="text"
            value={movement.comment ?? ""}
            placeholder="Controlar respiracion, mantener postura"
            onChange={(e) => onChange({ ...movement, comment: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-2 py-2 text-xs text-white"
          />
        </label>
      </div>
    </div>
  );
}

function SortableMovementItem({
  movement,
  blockId,
  onChange,
  onRemove
}: {
  movement: WodMovement;
  blockId: string;
  onChange: (mv: WodMovement) => void;
  onRemove: () => void;
}) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: movement.uid,
    data: { type: "movement", blockId, uid: movement.uid }
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };
  const dragHandleProps = { ...attributes, ...listeners } as React.HTMLAttributes<HTMLButtonElement>;
  return (
    <div ref={setNodeRef} style={style}>
      <MovementEditor movement={movement} onChange={onChange} onRemove={onRemove} dragHandleProps={dragHandleProps} />
    </div>
  );
}

export function DroppableWodArea({
  block,
  children
}: {
  block: WodBlock;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `block-${block.id}`,
    data: { type: "block", blockId: block.id }
  });
  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl border border-dashed px-3 py-2 text-xs ${
        isOver ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-100" : "border-white/15 bg-slate-900/40 text-slate-400"
      }`}
    >
      {children}
    </div>
  );
}

export function BlockCard({
  block,
  onUpdateMovement,
  onRemoveMovement,
  onUpdateBlock,
  onRemoveBlock
}: {
  block: WodBlock;
  onUpdateMovement: (blockId: string, movement: WodMovement) => void;
  onRemoveMovement: (blockId: string, movementUid: string) => void;
  onUpdateBlock: (blockId: string, update: Partial<Pick<WodBlock, "title" | "type" | "notes">>) => void;
  onRemoveBlock: (blockId: string) => void;
}) {
  return (
    <div className={`${cardShell} p-4`}>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full flex-col gap-2">
          <input
            value={block.title}
            onChange={(e) => onUpdateBlock(block.id, { title: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-white"
            placeholder="Nombre del bloque"
          />
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
            <span className="rounded-full bg-slate-900/60 px-2 py-1">{block.movements.length} movimientos</span>
            {block.type && <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-cyan-200">{block.type}</span>}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 md:w-64">
          <input
            value={block.type ?? ""}
            onChange={(e) => onUpdateBlock(block.id, { type: e.target.value })}
            placeholder="Tipo (EMOM, AMRAP...)"
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-xs text-white"
          />
          <textarea
            value={block.notes ?? ""}
            onChange={(e) => onUpdateBlock(block.id, { notes: e.target.value })}
            placeholder="Notas del bloque, pacing o esquema"
            className="h-16 w-full resize-none rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-xs text-white"
          />
          <button type="button" onClick={() => onRemoveBlock(block.id)} className="text-[11px] text-rose-200 hover:text-rose-100">
            Eliminar bloque
          </button>
        </div>
      </div>
      <div className="mt-3 space-y-2">
        <SortableContext items={block.movements.map((mv) => mv.uid)} strategy={verticalListSortingStrategy}>
          {block.movements.map((mv) => (
            <SortableMovementItem
              key={mv.uid}
              movement={mv}
              blockId={block.id}
              onChange={(updated) => onUpdateMovement(block.id, updated)}
              onRemove={() => onRemoveMovement(block.id, mv.uid)}
            />
          ))}
        </SortableContext>
        <DroppableWodArea block={block}>Arrastra aqui para agregar o reordenar en {block.title}</DroppableWodArea>
      </div>
    </div>
  );
}

export function WodBlocksEditor({
  blocks,
  onUpdateMovement,
  onRemoveMovement,
  onAddBlock,
  onUpdateBlock,
  onRemoveBlock
}: {
  blocks: WodBlock[];
  onUpdateMovement: (blockId: string, movement: WodMovement) => void;
  onRemoveMovement: (blockId: string, movementUid: string) => void;
  onAddBlock: () => void;
  onUpdateBlock: (blockId: string, update: Partial<Pick<WodBlock, "title" | "type" | "notes">>) => void;
  onRemoveBlock: (blockId: string) => void;
}) {
  return (
    <div className="space-y-3">
      {blocks.map((block) => (
        <BlockCard
          key={block.id}
          block={block}
          onUpdateMovement={onUpdateMovement}
          onRemoveMovement={onRemoveMovement}
          onUpdateBlock={onUpdateBlock}
          onRemoveBlock={onRemoveBlock}
        />
      ))}
      <Button variant="primary" onClick={onAddBlock}>
        + Anadir bloque
      </Button>
    </div>
  );
}

export function WodAnalysisPanel({ analysis }: { analysis: AnalysisResult }) {
  const hyroxActivators = Object.entries(analysis.hyroxDetail.components)
    .filter(([, v]) => (v ?? 0) > 0)
    .map(([k]) => k.replace(/_/g, " "))
    .slice(0, 4);

  const impactTop = Object.entries(analysis.impact || {})
    .filter(([, v]) => typeof v === "number")
    .sort((a, b) => (Number(b[1]) || 0) - (Number(a[1]) || 0))
    .slice(0, 4);

  return (
    <div className={`${cardShell} p-4 space-y-4`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Analisis en tiempo real</p>
          <p className="text-sm text-slate-300">Fatiga, dominio y pacing se recalculan en cada cambio.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className={pill}>{analysis.totalTime ? `${Math.round(analysis.totalTime / 60)} min totales` : "Tiempo N/A"}</span>
          <span className={pill}>Intensidad: {analysis.intensity}</span>
        </div>
      </div>

      <div className="grid gap-2 md:grid-cols-3">
        <Card className="border border-white/10 bg-white/5 p-3 text-white">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Fatiga estimada</p>
          <p className="text-3xl font-semibold text-white">{analysis.fatigue}/10</p>
          <p className="text-[11px] text-slate-400">Dificultad: {analysis.difficulty}/10</p>
        </Card>
        <Card className="border border-white/10 bg-white/5 p-3 text-white">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Dominio energetico</p>
          <p className="text-xl font-semibold text-white">{analysis.domain}</p>
          <p className="text-[11px] text-slate-400">Transfer HYROX: {analysis.hyroxTransfer}/100</p>
        </Card>
        <Card className="border border-white/10 bg-white/5 p-3 text-white">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Tiempo y pacing</p>
          <p className="text-lg font-semibold text-white">{analysis.totalTime ? `${Math.round(analysis.totalTime / 60)} min` : "N/A"}</p>
          <p className="text-[11px] text-slate-400">{analysis.pacing}</p>
        </Card>
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        <Card className="border border-white/10 bg-white/5 p-3 text-white">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Capacidades foco</p>
          <div className="mt-2 space-y-2">
            {analysis.capacities.map((c) => (
              <div key={c.key} className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="uppercase tracking-wide">{c.key}</span>
                  <span className="text-amber-200">{Math.round(c.value)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-900">
                  <div className="h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" style={{ width: `${Math.min(100, c.value * 8)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="border border-white/10 bg-white/5 p-3 text-white">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">HYROX y enfoque</p>
          <p className="text-2xl font-semibold text-white">{analysis.hyroxTransfer}/100</p>
          <p className="text-[11px] text-slate-400">
            Activadores: {hyroxActivators.join(", ") || "Sin componentes HYROX detectados"}
          </p>
          <ul className="mt-2 space-y-1 text-xs text-slate-200">
            {analysis.hyroxDetail.explanation.slice(0, 3).map((item) => (
              <li key={item} className="rounded-lg bg-slate-900/60 px-2 py-1">
                {item}
              </li>
            ))}
            {!analysis.hyroxDetail.explanation.length && <li className="text-slate-400">Sin datos HYROX</li>}
          </ul>
        </Card>
      </div>

      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">Carga muscular</p>
        <div className="grid gap-2 md:grid-cols-2">
          {analysis.muscles.slice(0, 6).map((m) => (
            <div key={m.key} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
              <div className="flex items-center justify-between">
                <span>{m.key}</span>
                <span className="text-xs text-amber-200">{m.value.toFixed(0)}</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-slate-900">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                  style={{ width: `${Math.min(100, m.value * 8)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">Impacto potencial en el atleta</p>
        <div className="flex flex-wrap gap-2">
          {impactTop.map(([key, value]) => (
            <span key={key} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] uppercase tracking-wide text-slate-200">
              {key}: {Number(value).toFixed(0)}
            </span>
          ))}
          {!impactTop.length && <span className="text-xs text-slate-400">Se calculara al definir movimientos.</span>}
        </div>
      </div>
    </div>
  );
}

export function WodBuilder() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [blocks, setBlocks] = useState<WodBlock[]>([{ id: uid(), title: "Bloque 1", movements: [] }]);
  const [athleteProfile, setAthleteProfile] = useState<AthleteProfileResponse | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [workoutTitle, setWorkoutTitle] = useState("WOD personalizado");
  const [workoutNotes, setWorkoutNotes] = useState("");
  const [activeDrag, setActiveDrag] = useState<DragItem | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  useEffect(() => {
    api.getMovements().then(setMovements).catch(() => setMovements([]));
    api.getAthleteProfile().then(setAthleteProfile).catch(() => setAthleteProfile(null));
  }, []);

  const analysis = useMemo(() => computeAnalysis(blocks, athleteProfile), [blocks, athleteProfile]);
  const athleteMetrics = useMemo(() => adaptAthleteProfile(buildAthleteProfileMetrics(athleteProfile)), [athleteProfile]);

  const findMovementTemplate = (id: number) => movements.find((m) => m.id === id);

  const addMovementFromTemplate = (movementId: number, blockId: string, targetIndex?: number) => {
    const template = findMovementTemplate(movementId);
    if (!template) return;
    const newMv: WodMovement = { uid: uid(), movement: template };
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== blockId) return block;
        const list = [...block.movements];
        const index = targetIndex !== undefined ? Math.max(0, Math.min(targetIndex, list.length)) : list.length;
        list.splice(index, 0, newMv);
        return { ...block, movements: list };
      })
    );
  };

  const moveExistingMovement = (uidToMove: string, fromBlockId: string, toBlockId: string, targetIndex?: number) => {
    setBlocks((prev) => {
      const source = prev.find((b) => b.id === fromBlockId);
      const destination = prev.find((b) => b.id === toBlockId);
      if (!source || !destination) return prev;

      const moving = source.movements.find((mv) => mv.uid === uidToMove);
      if (!moving) return prev;

      const destinationList = destination.movements.filter((mv) => !(fromBlockId === toBlockId && mv.uid === uidToMove));
      const insertAt =
        targetIndex !== undefined ? Math.max(0, Math.min(targetIndex, destinationList.length)) : destinationList.length;
      destinationList.splice(insertAt, 0, moving);

      return prev.map((block) => {
        if (block.id === fromBlockId && block.id !== toBlockId) {
          return { ...block, movements: block.movements.filter((mv) => mv.uid !== uidToMove) };
        }
        if (block.id === toBlockId) {
          return { ...block, movements: destinationList };
        }
        if (block.id === fromBlockId && block.id === toBlockId) {
          return { ...block, movements: destinationList };
        }
        return block;
      });
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    const dragData = event.active.data.current as DragItem | undefined;
    if (dragData) setActiveDrag(dragData);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeData = active.data.current as DragItem | undefined;
    const overData = over?.data.current as DropZone | undefined;
    setActiveDrag(null);
    if (!activeData || !overData) return;

    const targetBlockId = overData.blockId;
    const targetIndex =
      overData.type === "movement"
        ? blocks.find((b) => b.id === targetBlockId)?.movements.findIndex((mv) => mv.uid === (over?.id as string))
        : undefined;

    if (activeData.type === "template") {
      addMovementFromTemplate(activeData.movementId, targetBlockId, targetIndex);
      return;
    }
    moveExistingMovement(activeData.uid, activeData.blockId, targetBlockId, targetIndex);
  };

  const handleUpdateMovement = (blockId: string, movement: WodMovement) => {
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== blockId) return block;
        return { ...block, movements: block.movements.map((mv) => (mv.uid === movement.uid ? movement : mv)) };
      })
    );
  };

  const handleRemoveMovement = (blockId: string, movementUid: string) => {
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== blockId) return block;
        return { ...block, movements: block.movements.filter((mv) => mv.uid !== movementUid) };
      })
    );
  };

  const handleAddBlock = () => setBlocks((prev) => [...prev, { id: uid(), title: `Bloque ${prev.length + 1}`, movements: [] }]);
  const handleUpdateBlock = (blockId: string, update: Partial<Pick<WodBlock, "title" | "type" | "notes">>) =>
    setBlocks((prev) => prev.map((block) => (block.id === blockId ? { ...block, ...update } : block)));
  const handleRemoveBlock = (blockId: string) => setBlocks((prev) => prev.filter((block) => block.id !== blockId));

  const hyroxStationsFromBlocks = useMemo(() => {
    const hyroxDetail = analysis.hyroxDetail;
    return Object.entries(hyroxDetail.components)
      .filter(([, v]) => v > 0)
      .map(([key, value]) => ({ station: key.replace(/_/g, " "), transfer_pct: Math.round((value / 100) * 100) }));
  }, [analysis.hyroxDetail]);

  const buildPayload = (purpose: "wod" | "template" | "ai"): WorkoutCreatePayload => {
    const primaryCapacity = normalizeCapacity(analysis.capacities[0]?.key ?? "Metcon");
    const mainMuscle = normalizeMuscle(analysis.muscles[0]?.key ?? "Core");
    const domain = normalizeDomain(analysis.domain);
    const intensity = normalizeIntensity(analysis.intensity);
    const volumeTotal = blocks
      .map((b) =>
        b.movements
          .map((m) => m.reps ?? m.distance_meters ?? m.duration_seconds ?? 0)
          .reduce((sum, val) => sum + (Number.isFinite(val) ? Number(val) : 0), 0)
      )
      .reduce((a, b) => a + b, 0)
      .toString();

    return {
      title: workoutTitle || "WOD personalizado",
      description: workoutNotes || "Generado desde el WOD Builder interactivo.",
      domain,
      intensity,
      hyrox_transfer: intensity,
      wod_type: purpose === "template" ? "Template" : "Custom",
      volume_total: volumeTotal || "0",
      work_rest_ratio: "1:1",
      dominant_stimulus: primaryCapacity,
      load_type: hyroxStationsFromBlocks.length ? "Hybrid" : "Standard",
      estimated_difficulty: analysis.difficulty,
      main_muscle_chain: mainMuscle,
      extra_attributes_json: {
        builder_blocks: blocks,
        pacing: analysis.pacing,
        hyrox_transfer_score: analysis.hyroxDetail.transferScore,
        hyrox_components: analysis.hyroxDetail.components,
        generated_from: "wod-builder",
        generated_at: new Date().toISOString()
      },
      athlete_profile_desc: "Auto generado segun tu perfil y el constructor visual.",
      target_athlete_desc: `Orientado a ${intensity} intensidad y dominio ${domain}`,
      session_load: `${analysis.fatigue}/10`,
      session_feel: analysis.intensity,
      official_tag: purpose === "template" ? "template" : undefined,
      pacing_tip: analysis.pacing,
      pacing_detail: analysis.pacing,
      break_tip: "Descansos controlados, evita llegar a fallo",
      rx_variant: "RX auto",
      scaled_variant: "Scaled auto",
      ai_observation: "Generado desde interfaz inteligente",
      avg_time_seconds: toNumber(analysis.totalTime),
      avg_rating: null,
      avg_difficulty: analysis.difficulty,
      rating_count: 0,
      level_times: [],
      capacities: analysis.capacities.map((c) => ({
        capacity: normalizeCapacity(c.key),
        value: Math.max(1, Math.round(c.value)),
        note: "Auto"
      })),
      hyrox_stations: hyroxStationsFromBlocks,
      muscles: analysis.muscles.slice(0, 3).map((m) => normalizeMuscle(m.key)),
      equipment_ids: [],
      similar_workout_ids: []
    };
  };

  const handleSave = async (kind: "wod" | "template" | "ai") => {
    setStatus(kind === "ai" ? "Analizando con IA..." : "Guardando...");
    try {
      const payload = buildPayload(kind);
      if (kind === "ai") {
        await api.analyzeWorkoutPayload(payload);
        setStatus("Analisis enviado al backend.");
      } else {
        await api.createWorkout(payload);
        setStatus(kind === "template" ? "Plantilla guardada." : "Workout guardado.");
      }
    } catch (error) {
      setStatus("No se pudo completar la accion. Revisa la consola o el backend.");
    }
  };

  const handleGenerateRandom = () => {
    if (!movements.length) return;
    const pick = (filter: (m: Movement) => boolean, count: number) => {
      const pool = movements.filter(filter);
      return Array.from({ length: count }, () => pool[Math.floor(Math.random() * pool.length)]).filter(Boolean) as Movement[];
    };
    const blocksGenerated: WodBlock[] = [
      {
        id: uid(),
        title: "Bloque 1",
        type: "Engine",
        movements: pick((m) => categorizeMovement(m) === "Monoestructurales", 2).map((mv) => ({
          uid: uid(),
          movement: mv,
          distance_meters: 400,
          pace: "Ritmo sostenible"
        }))
      },
      {
        id: uid(),
        title: "Bloque 2",
        type: "Strength",
        movements: pick((m) => categorizeMovement(m) === "Fuerza" || categorizeMovement(m) === "Metcon", 2).map((mv) => ({
          uid: uid(),
          movement: mv,
          reps: 15,
          load: mv.default_load_unit ? 20 : undefined
        }))
      }
    ];
    setBlocks(blocksGenerated);
    setStatus("WOD aleatorio generado.");
  };

  const overlayLabel =
    activeDrag?.type === "template"
      ? movements.find((m) => m.id === (activeDrag as { movementId: number }).movementId)?.name
      : activeDrag?.type === "movement"
        ? "Mover movimiento"
        : null;

  useEffect(() => {
    if (!athleteProfile && !analysis) return;
    recordMetrics("wodBuilder", "athleteProfile", athleteMetrics, [
      ...expectedMetricKeys.capacities,
      ...expectedMetricKeys.biometrics,
      ...expectedMetricKeys.load,
      ...expectedMetricKeys.state
    ]);
    recordMetrics("wodBuilder", "analysis", adaptAthleteImpact(analysis as any), [...expectedMetricKeys.hyrox, "fatigue", "difficulty", "totalTime"]);
  }, [analysis, athleteMetrics, athleteProfile]);

  return (
    <div className="space-y-6">
      <Section
        title="WOD Builder inteligente"
        description="Construye un WOD visualmente, arrastra movimientos y observa el analisis en tiempo real."
        className={sectionShell}
      >
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => handleSave("wod")}>
              Guardar WOD
            </Button>
            <Button variant="secondary" onClick={() => handleSave("template")}>
              Guardar como plantilla
            </Button>
            <Button variant="ghost" onClick={() => handleSave("ai")}>
              Analizar con IA
            </Button>
            <Button variant="ghost" onClick={handleGenerateRandom}>
              Generar WOD aleatorio
            </Button>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <input
              value={workoutTitle}
              onChange={(e) => setWorkoutTitle(e.target.value)}
              placeholder="Titulo del WOD"
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-white"
            />
            <input
              value={workoutNotes}
              onChange={(e) => setWorkoutNotes(e.target.value)}
              placeholder="Notas generales / objetivo"
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-white"
            />
          </div>
        </div>
        {status && <span className="text-sm text-slate-300">{status}</span>}
        <div className="mt-4 grid gap-2 md:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white">
            <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">Fatiga</p>
            <p className="text-xl font-semibold">{analysis.fatigue}/10</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white">
            <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">Dominio</p>
            <p className="text-lg font-semibold">{analysis.domain}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white">
            <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">HYROX transfer</p>
            <p className="text-lg font-semibold">{analysis.hyroxTransfer}/100</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white">
            <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">Tiempo total</p>
            <p className="text-lg font-semibold">{analysis.totalTime ? `${Math.round(analysis.totalTime / 60)} min` : "N/A"}</p>
          </div>
        </div>
      </Section>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid gap-4 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <MovementPalette movements={movements} />
          </div>
          <div className="lg:col-span-2">
            <WodBlocksEditor
              blocks={blocks}
              onUpdateMovement={handleUpdateMovement}
              onRemoveMovement={handleRemoveMovement}
              onAddBlock={handleAddBlock}
              onUpdateBlock={handleUpdateBlock}
              onRemoveBlock={handleRemoveBlock}
            />
          </div>
          <div className="lg:col-span-1 space-y-3 lg:sticky lg:top-4">
            <WodAnalysisPanel analysis={analysis} />
            <AthleteImpact athleteProfile={athleteMetrics} athleteImpact={analysis.impact} mode="preview" />
          </div>
        </div>
        <DragOverlay>
          {overlayLabel && (
            <div className="rounded-xl border border-cyan-400/40 bg-slate-900/80 px-4 py-3 text-sm text-white shadow-lg">
              {overlayLabel}
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default WodBuilder;
