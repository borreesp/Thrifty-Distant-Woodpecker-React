import React from "react";
import { cn } from "@thrifty/utils";

type MetricProps = {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  hint?: string;
  className?: string;
};

const trendCopy: Record<NonNullable<MetricProps["trend"]>, string> = {
  up: "text-emerald-400",
  down: "text-rose-400",
  neutral: "text-slate-300"
};

export const Metric: React.FC<MetricProps> = ({
  label,
  value,
  trend = "neutral",
  hint,
  className
}) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/10 bg-surface-alt/70 px-4 py-3",
        className
      )}
    >
      <p className="text-sm text-slate-400">{label}</p>
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-semibold text-white">{value}</span>
        {hint && (
          <span className={cn("text-sm", trendCopy[trend])}>
            {hint}
          </span>
        )}
      </div>
    </div>
  );
};
