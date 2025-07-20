"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Define the type for a ripple object
interface RippleT {
  key: number;
  top: string;
  left: string;
  height: string;
  width: string;
}

const buttonVariants = cva(
  "relative overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", // Added relative, overflow-hidden. Base: rounded-full, removed disabled:opacity-50
  {
    variants: {
      variant: {
        default: // Material Design Filled Button
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md focus-visible:ring-ring disabled:bg-foreground/12 disabled:text-foreground/38 disabled:shadow-none",
        destructive: // Material Design Filled Button - Destructive
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-md focus-visible:ring-ring disabled:bg-foreground/12 disabled:text-foreground/38 disabled:shadow-none",
        outline: // Material Design Outlined Button
          "border border-outline text-primary bg-transparent hover:bg-primary/10 focus-visible:bg-primary/10 focus-visible:ring-ring disabled:border-foreground/12 disabled:text-foreground/38",
        secondary: // Material Design Filled Button - Secondary (can also be M3 Tonal)
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90 hover:shadow-md focus-visible:ring-ring disabled:bg-foreground/12 disabled:text-foreground/38 disabled:shadow-none",
        ghost: // Material Design Text Button
          "text-primary bg-transparent hover:bg-primary/10 focus-visible:bg-primary/10 focus-visible:ring-ring disabled:text-foreground/38",
        link: "text-primary underline-offset-4 hover:underline", // Unchanged
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-full px-3", // M3 buttons are often fully rounded
        lg: "h-11 rounded-full px-8", // M3 buttons are often fully rounded
        icon: "h-10 w-10 rounded-full", // Icons too
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const [ripples, setRipples] = React.useState<RippleT[]>([]);

    // Effect to clean up ripples after animation
    React.useEffect(() => {
      if (ripples.length > 0) {
        const timer = setTimeout(() => {
          setRipples(currentRipples => currentRipples.slice(1)); // Remove the oldest ripple
        }, 600); // Match animation duration
        return () => clearTimeout(timer);
      }
    }, [ripples]);

    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      // Get click position relative to the button
      const rect = button.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      const newRipple: RippleT = {
        key: Date.now(),
        top: `${clickY - radius}px`,
        left: `${clickX - radius}px`,
        height: `${diameter}px`,
        width: `${diameter}px`,
      };

      setRipples(prevRipples => [...prevRipples, newRipple]);
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onMouseDown={createRipple}
        {...props}
      >
        {children}
        {ripples.map(ripple => (
          <span
            key={ripple.key}
            className="absolute rounded-full bg-current opacity-25 animate-ripple pointer-events-none"
            style={{
              top: ripple.top,
              left: ripple.left,
              width: ripple.width,
              height: ripple.height,
              // Initial state for animation, to be overridden by keyframes
              // transform: 'scale(0)', // This is handled by the animation's 0% keyframe
            }}
          />
        ))}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
