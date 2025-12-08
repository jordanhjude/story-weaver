import { Link } from "react-router-dom";
import { Story, CATEGORIES } from "@/types/story";
import { format } from "date-fns";
import { Play, Image, Music } from "lucide-react";

interface StoryCardProps {
  story: Story;
  index: number;
}

export function StoryCard({ story, index }: StoryCardProps) {
  const category = CATEGORIES.find((c) => c.value === story.category);
  const hasVideo = story.media.some((m) => m.type === "video");
  const hasImages = story.media.some((m) => m.type === "image");
  const hasMusic = story.backgroundMusic;

  return (
    <Link
      to={`/story/${story.id}`}
      className="group block animate-fade-in-up opacity-0"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <article className="relative overflow-hidden rounded-xl bg-card border border-border/50 transition-all duration-500 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
        {/* Cover Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={story.coverImage}
            alt={story.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          
          {/* Media indicators */}
          <div className="absolute top-3 right-3 flex gap-2">
            {hasVideo && (
              <div className="flex items-center justify-center h-8 w-8 rounded-full glass">
                <Play className="h-4 w-4 text-primary" />
              </div>
            )}
            {hasImages && (
              <div className="flex items-center justify-center h-8 w-8 rounded-full glass">
                <Image className="h-4 w-4 text-accent" />
              </div>
            )}
            {hasMusic && (
              <div className="flex items-center justify-center h-8 w-8 rounded-full glass animate-pulse-glow">
                <Music className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-xs font-medium glass">
              {category?.emoji} {category?.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <time className="text-xs font-medium text-muted-foreground">
            {format(story.createdAt, "MMM d, yyyy")}
          </time>
          <h2 className="mt-2 font-serif text-xl font-semibold leading-tight text-card-foreground transition-colors group-hover:text-gradient line-clamp-2">
            {story.title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {story.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}
