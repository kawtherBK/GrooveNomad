import React from "react";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "default" | "outline" | "ghost" | "destructive";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-6 text-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-primary text-white hover:bg-primary/90",
  outline: "border border-input text-foreground hover:bg-accent",
  ghost: "bg-transparent hover:bg-accent text-foreground",
  destructive: "bg-red-600 text-white hover:bg-red-700",
};

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export const Button = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, children, size = "md", variant = "default", ...props }, ref) => {
    return (
      <button
        className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        {...props}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
