import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function EpisodeReader() {
  const { comicId, episodeNumber } = useParams();
  const navigate = useNavigate();
  const epNum = parseInt(episodeNumber || "1");

  const { data: comic } = useQuery({
    queryKey: ["comic", comicId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comics")
        .select("*")
        .eq("id", comicId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: episode, isLoading } = useQuery({
    queryKey: ["episode", comicId, epNum],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("episodes")
        .select("*")
        .eq("comic_id", comicId)
        .eq("episode_number", epNum)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: episodeCount } = useQuery({
    queryKey: ["episodeCount", comicId],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("episodes")
        .select("*", { count: "exact", head: true })
        .eq("comic_id", comicId);
      if (error) throw error;
      return count || 0;
    },
  });

  const goToPrev = () => {
    if (epNum > 1) {
      navigate(`/comic/${comicId}/episode/${epNum - 1}`);
    }
  };

  const goToNext = () => {
    if (episodeCount && epNum < episodeCount) {
      navigate(`/comic/${comicId}/episode/${epNum + 1}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Episode not found</h1>
        <Link to={`/comic/${comicId}`} className="text-primary hover:underline">
          Back to comic
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-14">
          <Link to={`/comic/${comicId}`}>
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          
          <div className="text-center">
            <h1 className="text-sm font-medium truncate max-w-[200px]">
              {comic?.title}
            </h1>
            <p className="text-xs text-muted-foreground">
              Episode {epNum}: {episode.title}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrev}
              disabled={epNum <= 1}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-sm text-muted-foreground min-w-[60px] text-center">
              {epNum} / {episodeCount}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              disabled={!episodeCount || epNum >= episodeCount}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Story Content */}
      <main className="pt-14 pb-20">
        <div className="max-w-2xl mx-auto px-4">
          {/* Episode Title */}
          <h2 className="text-2xl font-bold text-center py-8">
            Episode {epNum}: {episode.title}
          </h2>

          {/* Story with images interspersed */}
          {(() => {
            const paragraphs = episode.content?.split('\n\n').filter((p: string) => p.trim()) || [];
            const images = episode.images || [];
            const elements: React.ReactNode[] = [];
            
            paragraphs.forEach((paragraph: string, index: number) => {
              // Add paragraph
              elements.push(
                <p key={`p-${index}`} className="text-foreground/90 leading-relaxed mb-6 text-base">
                  {paragraph}
                </p>
              );
              
              // Add image after certain paragraphs (distribute images evenly)
              const imageIndex = Math.floor((index + 1) * images.length / paragraphs.length) - 1;
              const prevImageIndex = index === 0 ? -1 : Math.floor(index * images.length / paragraphs.length) - 1;
              
              if (imageIndex >= 0 && imageIndex !== prevImageIndex && images[imageIndex]) {
                elements.push(
                  <figure key={`img-${imageIndex}`} className="my-8 flex justify-center">
                    <img
                      src={images[imageIndex]}
                      alt={`Illustration ${imageIndex + 1}`}
                      className="w-3/4 max-w-md rounded-lg shadow-lg"
                      loading={imageIndex > 1 ? "lazy" : "eager"}
                    />
                  </figure>
                );
              }
            });
            
            return elements;
          })()}
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t border-border">
        <div className="container flex items-center justify-between h-16">
          <Button
            variant="outline"
            onClick={goToPrev}
            disabled={epNum <= 1}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <Button
            variant="outline"
            onClick={goToNext}
            disabled={!episodeCount || epNum >= episodeCount}
            className="gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
}