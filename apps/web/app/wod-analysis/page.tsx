"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Section, Button } from "@thrifty/ui";
import { HeroHeader } from "../../components/wod-analysis/HeroHeader";
import { UploadForm } from "../../components/wod-analysis/UploadForm";
import { BlocksEditor } from "../../components/wod-analysis/BlocksEditor";
import { AnalyzingOverlay } from "../../components/wod-analysis/AnalyzingOverlay";
import { api } from "../../lib/api";
import type { EditableWodBlock } from "../../components/wod/wod-types";
import type { Workout } from "../../lib/types";

const shellClass =
  "rounded-3xl border border-white/5 bg-gradient-to-br from-slate-950/80 via-slate-950/60 to-slate-900/70 p-6 md:p-8 shadow-[0_14px_50px_rgba(0,0,0,0.55)]";

export default function WodAnalysisUploadPage() {
  const router = useRouter();
  const [draftBlocks, setDraftBlocks] = useState<EditableWodBlock[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>("");
  const [isParsing, setIsParsing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    api
      .getWorkouts()
      .then((list) => {
        setWorkouts(list);
        if (list.length) setSelectedWorkoutId(list[0].id.toString());
      })
      .catch(() => setWorkouts([]));
  }, []);

  useEffect(() => {
    if (!isAnalyzing) return;
    setStepIndex(0);
    const id = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % 3);
    }, 900);
    return () => clearInterval(id);
  }, [isAnalyzing]);

  const handleParsed = (payload: { imageUrl: string; blocks: EditableWodBlock[] }) => {
    setImageUrl(payload.imageUrl);
    setDraftBlocks(payload.blocks);
  };

  const analyzeSteps = useMemo(
    () => [
      { label: "Interpretando bloques y volumen", status: stepIndex > 0 ? "done" : "active" },
      { label: "Calculando carga, pacing y capacidades", status: stepIndex > 1 ? "done" : stepIndex === 1 ? "active" : "pending" },
      { label: "Preparando dashboards y HYROX transfer", status: stepIndex === 2 ? "active" : "pending" }
    ],
    [stepIndex]
  );

  const parseSteps = [{ label: "Extrayendo bloques del entrenamiento…", status: "active" as const }];

  const handleAnalyze = async (formData: {
    title: string;
    date: string;
    duration: string;
    effort: string;
    stimulus: string;
    tags: string[];
    blocks: EditableWodBlock[];
  }) => {
    const targetId = selectedWorkoutId || workouts[0]?.id?.toString();
    if (!targetId) return;
    setIsAnalyzing(true);
    try {
      const analysis = await api.getWorkoutAnalysis(targetId);
      const redirectId = (analysis as any)?.workout_id ?? targetId;
      router.push(`/wod-analysis/result/${redirectId}`);
    } catch (err) {
      console.error(err);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      <HeroHeader
        title="Analiza tu WOD con inteligencia híbrida"
        subtitle="Sube tu entrenamiento y nuestro motor lo dividirá en bloques, calculará la carga y te dará recomendaciones de pacing y capacidades."


      />

      <Section
        id="wod-upload"
        title="Subida y preparación del WOD"
        description="Carga tu imagen, revisa los bloques detectados y lánzate al análisis completo."
        className={shellClass}
      >
        <UploadForm
          onParsed={handleParsed}
          onProcessingChange={(loading) => setIsParsing(loading)}
        />

        <Card className="bg-slate-900/70 ring-1 ring-white/10">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Selector de referencia</p>
              <p className="text-sm text-slate-200">Usa un WOD existente como referencia para el motor de analítica.</p>
            </div>
            <div className="flex flex-col gap-2 md:w-72">
              <label className="text-xs text-slate-400">WOD base</label>
              <select
                value={selectedWorkoutId}
                onChange={(e) => setSelectedWorkoutId(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white"
              >
                {workouts.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {draftBlocks.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Bloques detectados</p>
                <p className="text-sm text-slate-300">Edita reps, peso y tiempos antes de lanzar el análisis.</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setDraftBlocks([])}>
                Reiniciar
              </Button>
            </div>
            <BlocksEditor
              blocks={draftBlocks}
              onBlocksChange={setDraftBlocks}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />
          </div>
        )}
      </Section>

      <AnalyzingOverlay active={isParsing} title="Extrayendo bloques del entrenamiento…" subtitle="Leyendo tu WOD" steps={parseSteps} />
      <AnalyzingOverlay
        active={isAnalyzing}
        title="Analizando tu WOD…"
        subtitle="Calculando intensidad, capacidades y pacing personalizado."
        steps={analyzeSteps}
      />
    </div>
  );
}
