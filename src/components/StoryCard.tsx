import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface StoryCardProps {
  id: string;
  title: string;
  excerpt: string;
  readingTime: string;
  themes?: string[];
  image?: string;
  className?: string;
  style?: CSSProperties;
}

export function StoryCard({ id, title, excerpt, readingTime, themes, image, className, style }: StoryCardProps) {
  return (
    <article 
      className={cn(
        "group overflow-hidden bg-card/50 border border-border/30 hover:border-rose/30 transition-all duration-500 hover:romantic-glow",
        className
      )}
      style={style}
    >
      {/* Image */}
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>
      )}
      
      <div className="p-8 space-y-4">
        {/* Themes */}
        {themes && themes.length > 0 && (
          <div className="flex gap-3">
            {themes.map((theme) => (
              <span 
                key={theme} 
                className="text-xs text-rose/80 tracking-widest uppercase font-body"
              >
                {theme}
              </span>
            ))}
          </div>
        )}
        
        {/* Title */}
        <h3 className="font-serif text-xl md:text-2xl text-foreground tracking-wide group-hover:text-rose transition-colors duration-300">
          {title}
        </h3>
        
        {/* Excerpt */}
        <p className="text-muted-foreground font-body leading-relaxed text-sm md:text-base italic">
          {excerpt}
        </p>
        
        {/* Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-border/20">
          <div className="flex items-center gap-2 text-muted-foreground/70">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs font-body tracking-wide">{readingTime}</span>
          </div>
          
          <Link 
            to={`/story/${id}`}
            className="flex items-center gap-2 text-sm text-rose hover:text-rose/80 transition-colors font-body tracking-wide"
          >
            Read
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}