import React from "react";
import { cn } from "@thrifty/utils";

type CardProps = {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  actions,
  className,
  children
}) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-surface/60 shadow-soft backdrop-blur-md",
        "p-5 md:p-6 text-slate-100",
        className
      )}
    >
      {(title || subtitle || actions) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="space-y-1">
            {title && <h3 className="text-lg font-semibold">{title}</h3>}
            {subtitle && <p className="text-sm text-slate-300">{subtitle}</p>}
          </div>
          {actions}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};
