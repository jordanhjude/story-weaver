import { Link } from "react-router-dom";
import { CSSProperties } from "react";

interface StoryCardProps {
  story: {
    id: string;
    title: string;
    description?: string | null;
    genres?: string[] | null;
  };
  style?: CSSProperties;
}

export function StoryCard({ story, style }: StoryCardProps) {
  // Estimate reading time based on description length (rough estimate)
  const readingTime = Math.max(5, Math.floor((story.description?.length || 0) / 200));
  
  // Get first genre as theme
  const theme = story.genres?.[0] || "Fiction";

  return (
    <article 
      className="border-b border-border/30 py-8 group fade-in"
      style={style}
    >
      <Link to={`/story/${story.id}`} className="block">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <h3 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-gold transition-colors duration-300">
              {story.title}
            </h3>
            
            {story.description && (
              <p className="mt-3 text-muted-foreground line-clamp-2 leading-relaxed">
                {story.description}
              </p>
            )}
            
            <div className="mt-4 flex items-center gap-4">
              <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground/60">
                {theme}
              </span>
              <span className="text-muted-foreground/30">·</span>
              <span className="font-sans text-xs text-muted-foreground/60">
                {readingTime} min read
              </span>
            </div>
          </div>
          
          <span className="font-sans text-xs tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors duration-300 hidden md:block">
            Read
          </span>
        </div>
      </Link>
    </article>
  );
}
