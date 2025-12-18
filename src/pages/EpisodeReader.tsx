import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Volume2, VolumeX, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { StoryImage } from "@/components/StoryImage";
import { getEpisodeImage } from "@/data/episodeImages";
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
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Load voices when available
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis?.getVoices() || [];
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      }
    };

    loadVoices();
    
    // Chrome loads voices asynchronously
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const stopNarration = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
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

    // Limit content length to avoid issues
    const textToSpeak = episode.content.substring(0, 5000);
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    speechRef.current = utterance;
    
    // Configure voice settings
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Select best available voice
    const preferredVoice = voices.find(v => 
      v.name.includes('Google') || 
      v.name.includes('Samantha') || 
      v.name.includes('Daniel') ||
      v.name.includes('Microsoft') ||
      (v.lang.startsWith('en') && !v.localService)
    ) || voices.find(v => v.lang.startsWith('en')) || voices[0];
    
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
      console.error('Speech error:', event.error);
      setIsPlaying(false);
      setIsLoading(false);
      speechRef.current = null;
      if (event.error !== 'canceled' && event.error !== 'interrupted') {
        toast.error("Speech synthesis error. Try again.");
      }
    };

    // Small delay to ensure everything is ready
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 100);
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
  
  // Get pre-generated image if available
  const preGeneratedImage = comicId ? getEpisodeImage(comicId, epNum) : null;
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-black/90">
      {/* Ambient background effect */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/10">
        <div className="container flex items-center justify-between h-16">
          <Link to={`/tale/${comicId}`}>
            <Button variant="ghost" size="sm" className="gap-2 hover:bg-primary/10">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Tale</span>
            </Button>
          </Link>
          
          <div className="text-center">
            <h1 className="text-sm font-semibold truncate max-w-[200px] text-foreground">
              {comic?.title}
            </h1>
            <p className="text-xs text-muted-foreground">
              Episode {epNum}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={playNarration}
              disabled={isLoading}
              title={isPlaying ? "Stop narration" : "Listen to story"}
              className="hover:bg-primary/10"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              ) : isPlaying ? (
                <VolumeX className="h-5 w-5 text-primary" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
            
            <div className="flex items-center bg-muted/50 rounded-full px-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrev}
                disabled={epNum <= 1}
                className="h-8 w-8 hover:bg-primary/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-xs text-muted-foreground min-w-[50px] text-center font-medium">
                {epNum} / {episodeCount}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                disabled={!episodeCount || epNum >= episodeCount}
                className="h-8 w-8 hover:bg-primary/10"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Story Content */}
      <main className="pt-20 pb-28 relative">
        <article className="max-w-2xl mx-auto px-6">
          {/* Episode Title Card */}
          <header className="text-center py-12 mb-8 animate-fade-in">
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-3 block">
              Episode {epNum}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {episode.title}
            </h2>
            <div className="flex items-center justify-center gap-4 text-muted-foreground text-sm">
              <span>✦</span>
              <span>{comic?.city}</span>
              <span>✦</span>
            </div>
          </header>

          {/* Pre-generated Episode Image */}
          {preGeneratedImage && (
            <figure className="my-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <img 
                  src={preGeneratedImage}
                  alt={`Scene from ${episode.title}`}
                  className="relative w-full rounded-xl shadow-2xl shadow-black/50 border border-border/50"
                  loading="lazy"
                />
              </div>
              <figcaption className="text-center text-muted-foreground text-sm mt-4 italic">
                Scene from "{episode.title}"
              </figcaption>
            </figure>
          )}

          {/* Fallback to AI Generation if no pre-generated image */}
          {!preGeneratedImage && scenePrompts.length > 0 && (
            <figure className="my-12">
              <StoryImage 
                prompt={scenePrompts[0]}
                fallbackUrl={existingImages[0]}
                className="w-full rounded-xl shadow-2xl"
                alt="Opening scene"
              />
            </figure>
          )}

          {/* Story paragraphs with enhanced typography */}
          <div className="prose prose-invert prose-lg max-w-none">
            {(() => {
              const paragraphs = episode.content?.split('\n\n').filter((p: string) => p.trim()) || [];
              
              return paragraphs.map((paragraph: string, index: number) => (
                <p 
                  key={`p-${index}`} 
                  className="text-foreground/85 leading-[1.9] mb-8 text-[17px] animate-fade-in first:first-letter:text-5xl first:first-letter:font-serif first:first-letter:font-bold first:first-letter:text-primary first:first-letter:mr-2 first:first-letter:float-left first:first-letter:leading-none"
                  style={{ animationDelay: `${0.2 + index * 0.05}s` }}
                >
                  {paragraph}
                </p>
              ));
            })()}
          </div>

          {/* End decoration */}
          <footer className="text-center py-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="inline-flex items-center gap-3 text-primary/60">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
              <span className="text-2xl">✦</span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40" />
            </div>
            <p className="text-muted-foreground text-sm mt-4">End of Episode {epNum}</p>
          </footer>
        </article>
      </main>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border/50 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.3)]">
        <div className="container flex items-center justify-between h-20 gap-4">
          <Button
            variant="outline"
            onClick={goToPrev}
            disabled={epNum <= 1}
            className="flex-1 max-w-[180px] gap-2 h-12 border-border/50 hover:border-primary/50 hover:bg-primary/5"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Episode {epNum} of {episodeCount}</p>
          </div>
          
          <Button
            variant="outline"
            onClick={goToNext}
            disabled={!episodeCount || epNum >= episodeCount}
            className="flex-1 max-w-[180px] gap-2 h-12 border-border/50 hover:border-primary/50 hover:bg-primary/5"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
