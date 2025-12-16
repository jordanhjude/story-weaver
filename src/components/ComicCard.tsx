import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Comic } from "@/types/comic";

interface ComicCardProps {
  comic: Comic;
  index?: number;
}

export function ComicCard({ comic, index = 0 }: ComicCardProps) {
  return (
    <Link 
      to={`/comic/${comic.id}`}
      className="group block card-hover opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-card">
        <img 
          src={comic.coverImage} 
          alt={comic.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Episode Count Badge */}
        <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm rounded px-2 py-0.5">
          <span className="text-xs font-semibold text-primary">{comic.episodeCount}</span>
        </div>

        {/* New Badge */}
        {comic.isNew && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-primary text-primary-foreground text-xs">NEW</Badge>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/90 to-transparent" />
        
        {/* Title on hover */}
        <div className="absolute inset-x-0 bottom-0 p-3">
          <h3 className="font-bold text-sm line-clamp-2 leading-tight">
            {comic.title}
          </h3>
          <div className="flex gap-1 mt-1.5 flex-wrap">
            {comic.genres.slice(0, 2).map((genre) => (
              <span 
                key={genre} 
                className="text-[10px] text-primary capitalize"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
