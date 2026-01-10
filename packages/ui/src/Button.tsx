import React from "react";
import { cn } from "@thrifty/utils";

type BaseProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

type AnchorButtonProps = BaseProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };
type NativeButtonProps = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonProps = AnchorButtonProps | NativeButtonProps;

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-brand text-white shadow-soft hover:-translate-y-0.5 hover:bg-brand/90 focus-visible:outline-brand",
  secondary:
    "bg-surface-alt text-slate-100 border border-white/10 hover:border-white/20 focus-visible:outline-brand",
  ghost:
    "bg-transparent text-slate-100 border border-white/15 hover:border-white/40 focus-visible:outline-brand"
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base"
};

const isAnchorProps = (props: ButtonProps): props is AnchorButtonProps => typeof (props as AnchorButtonProps).href === "string";

export const Button: React.FC<ButtonProps> = (props) => {
  if (isAnchorProps(props)) {
    const { variant = "primary", size = "md", className, children, href, ...rest } = props;
    return (
      <a href={href} className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)} {...rest}>
        {children}
      </a>
    );
  }

  const { variant = "primary", size = "md", className, children, ...rest } = props;
  return (
    <button className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)} {...rest}>
      {children}
    </button>
  );
};
