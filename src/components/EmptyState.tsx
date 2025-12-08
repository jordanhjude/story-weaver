import { Link } from "react-router-dom";
import { PenLine, Feather } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center animate-fade-in">
      <div className="relative">
        <div className="absolute -inset-4 rounded-full bg-primary/10 blur-xl" />
        <Feather className="relative h-16 w-16 text-primary" />
      </div>
      <h2 className="mt-6 font-serif text-3xl font-semibold">
        Your stories await
      </h2>
      <p className="mt-3 max-w-md text-muted-foreground">
        Every great author started with a single word. Begin your journey and share your stories with the world.
      </p>
      <Link to="/write" className="mt-8">
        <Button size="lg" className="gap-2">
          <PenLine className="h-5 w-5" />
          Write your first story
        </Button>
      </Link>
    </div>
  );
}
