import React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "destructive" | "outline" | "ghost" | "link";
    size?: "sm" | "default" | "lg";
};

const variantStyle: Record<
    NonNullable<ButtonProps["variant"]>,
    string
    > = {
  default:
    "bg-zinc-900 text-white hover:bg-zinc-800 disabled:opacity-50",
  destructive:
    "bg-red-600 text-white hover:bg-red-500 disabled:opacity-50",
  outline:
    "border border-zinc-200 bg-transparent hover:bg-zinc-50 disabled:opacity-50",
  ghost:
    "bg-transparent hover:bg-zinc-100 disabled:opacity-50",
  link:
    "bg-transparent underline-offset-4 hover:underline text-zinc-900",        
    };

    const sizeStyle: Record<NonNullable<ButtonProps["size"]>, string> = {
        sm: "text-sm px-3 py-1.5",
        default: "text-sm px-4 py-2",
        lg: "text-base px-5 py-3",
    };

    const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
        ({ className, variant = "default", size = "default", ...props }, ref) => {
            return (
                <button
                    ref= {ref}
                    className={cn(
                    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none",
                    variantStyle[variant],
                    sizeStyle[size],
                    className
                )}
                    {...props}
                />
            );
        }
    );

    Button.displayName = "Button";

    export { Button };
    export default Button; 