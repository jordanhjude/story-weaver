import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Volume2, VolumeX, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { StoryImage } from "@/components/StoryImage";

// Extract key scene descriptions from story content
function extractScenePrompts(content: string, title: string, comicTitle: string): string[] {
  const paragraphs = content.split('\n\n').filter(p => p.trim().length > 50);
  const prompts: string[] = [];
  
  // Opening scene
  if (paragraphs.length > 0) {
    const firstPara = paragraphs[0].substring(0, 200);
    prompts.push(`Opening scene from "${comicTitle}": ${firstPara}`);
  }
  
  // Mid-story dramatic moment
  if (paragraphs.length > 3) {
    const midIndex = Math.floor(paragraphs.length / 2);
    const midPara = paragraphs[midIndex].substring(0, 200);
    prompts.push(`Dramatic scene from "${title}": ${midPara}`);
  }
  
  // Climax/ending scene
  if (paragraphs.length > 5) {
    const endPara = paragraphs[paragraphs.length - 2].substring(0, 200);
    prompts.push(`Climactic moment from "${comicTitle}": ${endPara}`);
  }
  
  return prompts;
}

export default function EpisodeReader() {
  const { comicId, episodeNumber } = useParams();
  const navigate = useNavigate();
  const epNum = parseInt(episodeNumber || "1");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const { data: episode, isLoading: episodeLoading } = useQuery({
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
    stopNarration();
    if (epNum > 1) {
      navigate(`/tale/${comicId}/episode/${epNum - 1}`);
    }
  };

  const goToNext = () => {
    stopNarration();
    if (episodeCount && epNum < episodeCount) {
      navigate(`/tale/${comicId}/episode/${epNum + 1}`);
    }
  };

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stopNarration = () => {
    window.speechSynthesis.cancel();
    speechRef.current = null;
    setIsPlaying(false);
    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, [comicId, epNum]);

  const playNarration = () => {
    if (isPlaying) {
      stopNarration();
      return;
    }

    if (!episode?.content) {
      toast.error("No content to narrate");
      return;
    }

    if (!window.speechSynthesis) {
      toast.error("Speech synthesis not supported in this browser");
      return;
    }

    setIsLoading(true);
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(episode.content);
    speechRef.current = utterance;
    
    // Configure voice settings for better quality
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to get a good English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.name.includes('Google') || 
      v.name.includes('Samantha') || 
      v.name.includes('Daniel') ||
      (v.lang.startsWith('en') && v.localService === false)
    ) || voices.find(v => v.lang.startsWith('en'));
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsLoading(false);
      toast.success("Playing narration...");
    };

    utterance.onend = () => {
      setIsPlaying(false);
      speechRef.current = null;
    };

    utterance.onerror = (event) => {
      console.error('Speech error:', event);
      setIsPlaying(false);
      setIsLoading(false);
      if (event.error !== 'canceled') {
        toast.error("Failed to play narration");
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  if (episodeLoading) {
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
        <Link to={`/tale/${comicId}`} className="text-primary hover:underline">
          Back to tale
        </Link>
      </div>
    );
  }

  const existingImages = episode.images || [];
  const scenePrompts = episode.content 
    ? extractScenePrompts(episode.content, episode.title, comic?.title || "Story")
    : [];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-14">
          <Link to={`/tale/${comicId}`}>
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
              onClick={playNarration}
              disabled={isLoading}
              title={isPlaying ? "Stop narration" : "Listen to story"}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : isPlaying ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
            
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

          {/* Opening AI Image */}
          {scenePrompts.length > 0 && (
            <figure className="my-8 flex justify-center">
              <StoryImage 
                prompt={scenePrompts[0]}
                fallbackUrl={existingImages[0]}
                className="w-full max-w-lg"
                alt="Opening scene"
              />
            </figure>
          )}

          {/* Story with images interspersed */}
          {(() => {
            const paragraphs = episode.content?.split('\n\n').filter((p: string) => p.trim()) || [];
            const elements: React.ReactNode[] = [];
            const midPoint = Math.floor(paragraphs.length / 2);
            const climaxPoint = Math.floor(paragraphs.length * 0.75);
            
            paragraphs.forEach((paragraph: string, index: number) => {
              // Add paragraph with proper styling
              elements.push(
                <p key={`p-${index}`} className="text-foreground/90 leading-relaxed mb-6 text-base first-letter:text-3xl first-letter:font-bold first-letter:mr-1 first-letter:float-left">
                  {paragraph}
                </p>
              );

              // Add mid-story AI image
              if (index === midPoint && scenePrompts.length > 1) {
                elements.push(
                  <figure key="mid-image" className="my-10 flex justify-center">
                    <StoryImage 
                      prompt={scenePrompts[1]}
                      fallbackUrl={existingImages[1]}
                      className="w-full max-w-lg"
                      alt="Story moment"
                    />
                  </figure>
                );
              }

              // Add climax AI image
              if (index === climaxPoint && scenePrompts.length > 2) {
                elements.push(
                  <figure key="climax-image" className="my-10 flex justify-center">
                    <StoryImage 
                      prompt={scenePrompts[2]}
                      fallbackUrl={existingImages[2]}
                      className="w-full max-w-lg"
                      alt="Climactic moment"
                    />
                  </figure>
                );
              }
            });
            
            return elements;
          })()}

          {/* End decoration */}
          <div className="text-center py-8 text-muted-foreground">
            <span className="text-2xl">✦ ✦ ✦</span>
          </div>
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
