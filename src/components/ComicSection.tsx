import { Comic } from "@/hooks/useComicsDB";
import { ComicCard } from "./ComicCard";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface ComicSectionProps {
  title: string;
  comics: Comic[];
  seeAllLink?: string;
  variant?: "default" | "highlight";
}

export function ComicSection({ title, comics, seeAllLink, variant = "default" }: ComicSectionProps) {
  if (comics.length === 0) return null;

  return (
    <section className={`py-8 ${variant === "highlight" ? "bg-secondary/30" : ""}`}>
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase">
            {title}
          </h2>
          {seeAllLink && (
            <Link 
              to={seeAllLink}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              See all
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {comics.map((comic, index) => (
            <ComicCard key={comic.id} comic={comic} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
