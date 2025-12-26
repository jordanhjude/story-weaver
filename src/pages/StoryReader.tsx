import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Story {
  id: string;
  title: string;
  description: string | null;
  genres: string[] | null;
}

interface Episode {
  id: string;
  title: string;
  content: string | null;
  episode_number: number;
}

export default function StoryReader() {
  const { id } = useParams();
  const [story, setStory] = useState<Story | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    async function fetchStory() {
      if (!id) return;
      
      const { data: storyData } = await supabase
        .from("comics")
        .select("*")
        .eq("id", id)
        .single();
      
      const { data: episodesData } = await supabase
        .from("episodes")
        .select("*")
        .eq("comic_id", id)
        .order("episode_number", { ascending: true });
      
      setStory(storyData);
      setEpisodes(episodesData || []);
      setCurrentEpisode(episodesData?.[0] || null);
      setIsLoading(false);
    }
    
    fetchStory();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate reading time
  const readingTime = currentEpisode?.content 
    ? Math.max(5, Math.floor(currentEpisode.content.length / 1000))
    : 5;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="pt-24">
          <div className="reading-container py-16">
            <Skeleton className="h-10 w-3/4 mb-4 bg-muted" />
            <Skeleton className="h-4 w-1/4 mb-12 bg-muted" />
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full bg-muted" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="pt-24">
          <div className="reading-container py-32 text-center">
            <h1 className="font-serif text-2xl text-foreground mb-4">Story not found</h1>
            <Link to="/stories" className="text-muted-foreground hover:text-foreground transition-colors">
              ← Back to stories
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Progress indicator */}
      <div 
        className="fixed top-0 left-0 h-px bg-blood z-[60] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <SiteHeader />
      
      <main className="pt-24">
        {/* Story Header */}
        <header className="reading-container py-16 border-b border-border/30">
          <Link 
            to="/stories" 
            className="font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
          >
            ← Stories
          </Link>
          
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight fade-in">
            {story.title}
          </h1>
          
          <div className="mt-6 flex items-center gap-4 text-muted-foreground/60 fade-in" style={{ animationDelay: "0.1s" }}>
            <span className="font-sans text-xs tracking-widest uppercase">
              {story.genres?.[0] || "Fiction"}
            </span>
            <span>·</span>
            <span className="font-sans text-xs">
              {readingTime} min read
            </span>
          </div>

          {/* Episode navigation if multiple episodes */}
          {episodes.length > 1 && (
            <div className="mt-8 flex flex-wrap gap-3 fade-in" style={{ animationDelay: "0.2s" }}>
              {episodes.map((ep) => (
                <button
                  key={ep.id}
                  onClick={() => setCurrentEpisode(ep)}
                  className={`px-4 py-2 font-sans text-xs tracking-widest uppercase border transition-colors ${
                    currentEpisode?.id === ep.id
                      ? "border-foreground text-foreground"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  Part {ep.episode_number}
                </button>
              ))}
            </div>
          )}
        </header>

        {/* Story Content */}
        <article className="reading-container py-16">
          {currentEpisode?.content ? (
            <div 
              className="story-content fade-in"
              dangerouslySetInnerHTML={{ 
                __html: currentEpisode.content
                  .split('\n\n')
                  .map(p => `<p>${p}</p>`)
                  .join('') 
              }}
            />
          ) : (
            <p className="text-muted-foreground italic">
              This story is coming soon.
            </p>
          )}
        </article>

        {/* Story End */}
        <div className="section-divider" />
        
        <div className="reading-container py-16 text-center">
          <p className="font-serif text-muted-foreground italic mb-12 fade-in">
            The story ends where the questions begin.
          </p>
          
          <Link
            to="/stories"
            className="inline-block px-8 py-3 border border-foreground/30 text-foreground font-sans text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-all duration-300 fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Read another story
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
