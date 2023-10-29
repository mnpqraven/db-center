import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { HTMLAttributes, forwardRef } from "react";

export const Loading = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(function Loading({ className, ...props }, ref) {
  return (
    <span
      className={cn("flex items-center justify-center gap-1", className)}
      {...props}
      ref={ref}
    >
      <Loader2 className="animate-spin" />
      Loading...
    </span>
  );
});
