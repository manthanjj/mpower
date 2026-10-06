import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#2D4A3E] text-[#FBFBF9]",
        secondary:
          "border-[#E2E7E3] bg-[#E7EFE9] text-[#2D4A3E] font-semibold",
        accent:
          "border-transparent bg-[#C86D51] text-white",
        outline:
          "border-[#E2E7E3] text-[#5C6B64] bg-white",
        emergency:
          "border-[#FEE2E2] bg-[#FEF2F2] text-[#991B1B]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
