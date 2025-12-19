interface SectionDividerProps {
  variant?: "gradient" | "dots" | "line";
}

export function SectionDivider({ variant = "gradient" }: SectionDividerProps) {
  if (variant === "dots") {
    return (
      <div className="flex justify-center items-center gap-2 py-8">
        <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
        <span className="w-2 h-2 rounded-full bg-primary" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
      </div>
    );
  }

  if (variant === "line") {
    return (
      <div className="container py-8">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative h-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  );
}
