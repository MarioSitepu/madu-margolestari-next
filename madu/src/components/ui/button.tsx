import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

const variantClassNames: Record<ButtonVariant, string> = {
  default:
    "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/40",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus-visible:ring-secondary/40",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const sizeClassNames: Record<ButtonSize, string> = {
  default: "h-11 px-6 text-base",
  sm: "h-9 px-4 text-sm",
  lg: "h-12 px-8 text-lg",
  icon: "h-11 w-11",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variantClassNames[variant],
          sizeClassNames[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };

