import { Link } from "react-router-dom";
import { Story } from "@/types/story";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";

interface StoryCardProps {
  story: Story;
  index: number;
}

export function StoryCard({ story, index }: StoryCardProps) {
  return (
    <Link
      to={`/story/${story.id}`}
      className="group block animate-fade-in-up opacity-0"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <article className="rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <time className="text-sm font-medium text-muted-foreground">
          {format(story.createdAt, "MMMM d, yyyy")}
        </time>
        <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight text-card-foreground transition-colors group-hover:text-primary">
          {story.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-muted-foreground leading-relaxed">
          {story.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
          Read story
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </article>
    </Link>
  );
}
