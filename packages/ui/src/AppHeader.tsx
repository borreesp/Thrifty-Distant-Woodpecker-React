import React from "react";
import { cn } from "@thrifty/utils";

type NavLink = {
  label: string;
  href: string;
};

type AppHeaderProps = {
  links?: NavLink[];
  cta?: React.ReactNode;
  className?: string;
};

const defaultLinks: NavLink[] = [
  { label: "Dashboard", href: "/" },
  { label: "Workouts", href: "/workouts" },
  { label: "Progreso", href: "/progress" },
  { label: "Perfil", href: "/profile" }
];

export const AppHeader: React.FC<AppHeaderProps> = ({
  links = defaultLinks,
  cta,
  className
}) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 mb-6 w-full border-b border-white/10 bg-surface/80 backdrop-blur",
        className
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/20 text-brand">
            <span className="text-lg font-black">HF</span>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.08em] text-slate-300">
              HybridForce
            </p>
            <p className="text-xs text-slate-400">Atleta híbrido · MVP</p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-slate-200 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-white hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">{cta}</div>
      </div>
    </header>
  );
};
