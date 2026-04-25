import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-bg border-accent hover:shadow-glow hover:bg-accent-soft active:translate-y-px",
  secondary:
    "bg-transparent text-ink border-border-strong hover:border-accent hover:text-accent hover:shadow-glow-soft",
  ghost:
    "bg-transparent text-ink-muted border-transparent hover:text-ink hover:bg-bg-elev",
};

export const Button = React.forwardRef<
  HTMLButtonElement,
  BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(function Button(
  { variant = "primary", size = "md", className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(baseStyles, sizes[size], variants[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
});

type AnchorProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...rest
}: AnchorProps) {
  return (
    <a
      href={href}
      className={cn(baseStyles, sizes[size], variants[variant], className)}
      {...rest}
    >
      {children}
    </a>
  );
}
