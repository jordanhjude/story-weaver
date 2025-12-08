import { Link } from "react-router-dom";
import { PenLine, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center animate-fade-in px-4">
      <div className="relative">
        <div className="absolute -inset-8 rounded-full gradient-primary opacity-20 blur-2xl" />
        <Sparkles className="relative h-16 w-16 text-primary animate-float" />
      </div>
      <h2 className="mt-8 font-serif text-3xl font-semibold">
        Your stories await
      </h2>
      <p className="mt-4 max-w-md text-muted-foreground">
        Every great tale begins with a single word. Start your journey and bring your stories to life with photos, videos, and music.
      </p>
      <Link to="/write" className="mt-8">
        <Button size="lg" className="gap-2 gradient-primary border-0 hover:opacity-90">
          <PenLine className="h-5 w-5" />
          Create your first story
        </Button>
      </Link>
    </div>
  );
}
