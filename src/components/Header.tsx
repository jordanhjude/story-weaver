import { Link } from "react-router-dom";
import { PenLine, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <BookOpen className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
          <span className="font-serif text-xl font-semibold tracking-tight">
            Story<span className="text-primary">Craft</span>
          </span>
        </Link>
        <Link to="/write">
          <Button className="gap-2">
            <PenLine className="h-4 w-4" />
            Write Story
          </Button>
        </Link>
      </div>
    </header>
  );
}
