import React from "react";
import { cn } from "@thrifty/utils";

type SectionProps = {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  id?: string;
};

export const Section: React.FC<SectionProps> = ({
  title,
  description,
  actions,
  children,
  className,
  id
}) => {
  return (
    <section id={id} className={cn("space-y-4 py-4", className)}>
      {(title || description || actions) && (
        <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            {title && <h2 className="text-2xl font-semibold">{title}</h2>}
            {description && (
              <p className="text-sm text-slate-300">{description}</p>
            )}
          </div>
          {actions}
        </header>
      )}
      <div className="grid gap-4 md:gap-6">{children}</div>
    </section>
  );
};
