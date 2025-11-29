"use client";
import React, { useState } from "react";

type Tab = { id: string; label: string };

type Props = {
  tabs: Tab[];
  initialId?: string;
  renderContent: (id: string) => React.ReactNode;
};

export const TabbedSection: React.FC<Props> = ({ tabs, initialId, renderContent }) => {
  const [active, setActive] = useState(initialId || tabs[0]?.id);
  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              tab.id === active
                ? "border-yellow-300 bg-yellow-400 text-slate-900 shadow-[0_10px_24px_rgba(254,201,79,0.35)]"
                : "border-white/15 bg-surface-alt text-slate-100 hover:-translate-y-0.5 hover:shadow-lg"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-md">
        {active ? renderContent(active) : null}
      </div>
    </div>
  );
};
