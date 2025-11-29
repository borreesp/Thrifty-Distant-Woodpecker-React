import React from "react";
import { cn } from "@thrifty/utils";

type ScreenProps = {
  children: React.ReactNode;
  className?: string;
};

export const Screen: React.FC<ScreenProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-br from-surface via-surface-alt to-black text-slate-50",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">{children}</div>
    </div>
  );
};
