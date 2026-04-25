import * as React from "react";
import { cn } from "@/lib/cn";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  hoverable?: boolean;
  as?: "div" | "article" | "li";
};

export function Card({
  hoverable = false,
  as = "div",
  className,
  children,
  ...rest
}: Props) {
  const Comp = as as React.ElementType;
  return (
    <Comp
      className={cn(
        "card p-6 sm:p-7",
        hoverable && "card-hover",
        className,
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
}
