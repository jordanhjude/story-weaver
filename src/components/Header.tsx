import { Link } from "react-router-dom";
import { PenLine, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 glass">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg gradient-primary opacity-60 blur-sm group-hover:opacity-100 transition-opacity" />
            <span className="relative font-serif text-2xl font-bold tracking-tight">
              BEA<span className="text-gradient">tales</span>
            </span>
          </div>
        </Link>
        
        <div className="flex items-center gap-3">
          <Link to="/write">
            <Button size="sm" className="gap-2 gradient-primary border-0 hover:opacity-90 transition-opacity">
              <PenLine className="h-4 w-4" />
              <span className="hidden sm:inline">Write</span>
            </Button>
          </Link>
          <Avatar className="h-9 w-9 border-2 border-primary/50">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
            <AvatarFallback className="bg-secondary">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
