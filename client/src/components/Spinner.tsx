import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: number;
  className?: string;
}

export function Spinner({ size = 24, className }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2
        className={cn("animate-spin text-muted-foreground", className)}
        size={size}
        strokeWidth={2}
      />
    </div>
  );
}
