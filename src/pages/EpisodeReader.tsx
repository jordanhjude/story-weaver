import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

export default function EpisodeReader() {
  const { comicId, episodeNumber } = useParams();
  const navigate = useNavigate();
  const epNum = parseInt(episodeNumber || "1");
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      console.log("Loaded voices:", availableVoices.length);
      setVoices(availableVoices);
    };

    loadVoices();
    
    // Chrome requires listening to voiceschanged event
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

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

  const stopNarration = () => {
    console.log("Stopping narration");
    window.speechSynthesis.cancel();
    speechRef.current = null;
    setIsPlaying(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const playNarration = () => {
    console.log("Play narration clicked, isPlaying:", isPlaying);
    
    if (isPlaying) {
      stopNarration();
      return;
    }

    if (!episode?.content) {
      console.log("No content to narrate");
      toast.error("No content to narrate");
      return;
    }

    if (!('speechSynthesis' in window)) {
      console.log("Speech synthesis not supported");
      toast.error("Voice narration not supported in this browser");
      return;
    }

    // Cancel any pending speech
    window.speechSynthesis.cancel();

    // Create speech utterance with shorter text chunks for reliability
    const textToSpeak = episode.content.substring(0, 3000);
    console.log("Creating utterance with text length:", textToSpeak.length);
    
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Try to get a good English voice
    console.log("Available voices:", voices.length);
    const englishVoice = voices.find(v => v.lang.startsWith('en-') && v.name.toLowerCase().includes('female')) 
      || voices.find(v => v.lang.startsWith('en-US'))
      || voices.find(v => v.lang.startsWith('en'));
    
    if (englishVoice) {
      console.log("Using voice:", englishVoice.name);
      utterance.voice = englishVoice;
    } else {
      console.log("No English voice found, using default");
    }

    utterance.onstart = () => {
      console.log("Speech started");
      setIsPlaying(true);
    };

    utterance.onend = () => {
      console.log("Speech ended");
      setIsPlaying(false);
      speechRef.current = null;
    };

    utterance.onerror = (event) => {
      console.error("Speech error:", event.error);
      setIsPlaying(false);
      speechRef.current = null;
      if (event.error !== 'canceled') {
        toast.error("Failed to play narration: " + event.error);
      }
    };

    speechRef.current = utterance;
    
    // Small delay helps with Chrome
    setTimeout(() => {
      console.log("Speaking...");
      window.speechSynthesis.speak(utterance);
      toast.success("Playing narration...");
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

  const videos = episode.videos || [];

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
            {/* Narration Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={playNarration}
              title={isPlaying ? "Stop narration" : "Listen to story"}
            >
              {isPlaying ? (
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

          {/* Opening Video if available */}
          {videos.length > 0 && videos[0] && (
            <figure className="my-8">
              <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  src={videos[0]}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Episode video"
                />
              </div>
            </figure>
          )}

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

              // Add mid-story video if available
              if (videos.length > 1 && index === Math.floor(paragraphs.length / 2) && videos[1]) {
                elements.push(
                  <figure key="mid-video" className="my-10">
                    <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                      <iframe
                        src={videos[1]}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Episode video"
                      />
                    </div>
                  </figure>
                );
              }
            });
            
            return elements;
          })()}

          {/* End Video if available */}
          {videos.length > 2 && videos[2] && (
            <figure className="my-8">
              <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  src={videos[2]}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Episode video"
                />
              </div>
            </figure>
          )}
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
