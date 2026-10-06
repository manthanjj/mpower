import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#2D4A3E] text-[#FBFBF9] hover:bg-[#223930] shadow-sm",
        secondary:
          "bg-[#E7EFE9] text-[#2D4A3E] hover:bg-[#d8e5dc] font-semibold",
        accent:
          "bg-[#C86D51] text-white hover:bg-[#b55d42] shadow-sm",
        outline:
          "border border-[#E2E7E3] bg-white hover:bg-[#F8F9F5] text-[#1A2421]",
        ghost:
          "hover:bg-[#E7EFE9]/60 text-[#1A2421] hover:text-[#2D4A3E]",
        link:
          "text-[#2D4A3E] underline-offset-4 hover:underline p-0 h-auto font-normal",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 shadow-sm",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10 p-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
