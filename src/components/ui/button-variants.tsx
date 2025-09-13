import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

const heroButtonVariants = cva(
  "gradient-primary text-primary-foreground font-semibold transition-spring shadow-medium hover:shadow-strong hover:scale-105",
  {
    variants: {
      size: {
        default: "h-11 px-8",
        sm: "h-9 px-6 text-sm",
        lg: "h-12 px-10 text-lg",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface HeroButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof heroButtonVariants> {
  asChild?: boolean;
}

export const HeroButton = forwardRef<HTMLButtonElement, HeroButtonProps>(
  ({ className, size, asChild = false, ...props }, ref) => {
    return (
      <Button
        className={cn(heroButtonVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

HeroButton.displayName = "HeroButton";

const successButtonVariants = cva(
  "bg-success text-success-foreground hover:bg-success/90 transition-smooth shadow-soft",
  {
    variants: {
      size: {
        default: "h-10 px-6",
        sm: "h-9 px-4 text-sm",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface SuccessButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof successButtonVariants> {
  asChild?: boolean;
}

export const SuccessButton = forwardRef<HTMLButtonElement, SuccessButtonProps>(
  ({ className, size, asChild = false, ...props }, ref) => {
    return (
      <Button
        className={cn(successButtonVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

SuccessButton.displayName = "SuccessButton";

const warningButtonVariants = cva(
  "bg-warning text-warning-foreground hover:bg-warning/90 transition-smooth shadow-soft",
  {
    variants: {
      size: {
        default: "h-10 px-6",
        sm: "h-9 px-4 text-sm",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface WarningButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof warningButtonVariants> {
  asChild?: boolean;
}

export const WarningButton = forwardRef<HTMLButtonElement, WarningButtonProps>(
  ({ className, size, asChild = false, ...props }, ref) => {
    return (
      <Button
        className={cn(warningButtonVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

WarningButton.displayName = "WarningButton";