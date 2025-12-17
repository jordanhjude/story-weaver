import { useState, useEffect } from "react";
import { useStoryImage } from "@/hooks/useStoryImage";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageIcon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StoryImageProps {
  prompt: string;
  fallbackUrl?: string;
  className?: string;
  alt?: string;
}

export function StoryImage({ prompt, fallbackUrl, className = "", alt = "Story illustration" }: StoryImageProps) {
  const { generateImage, isGenerating, error } = useStoryImage();
  const [imageUrl, setImageUrl] = useState<string | null>(fallbackUrl || null);
  const [hasAttempted, setHasAttempted] = useState(false);

  const handleGenerate = async () => {
    setHasAttempted(true);
    const url = await generateImage(prompt);
    if (url) {
      setImageUrl(url);
    }
  };

  // Show fallback if provided, otherwise show generate button
  if (!imageUrl && !isGenerating) {
    return (
      <div className={`flex flex-col items-center justify-center bg-muted/30 rounded-lg p-6 ${className}`}>
        <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
        {hasAttempted && error ? (
          <>
            <p className="text-sm text-muted-foreground mb-2">Failed to generate image</p>
            <Button variant="outline" size="sm" onClick={handleGenerate}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </>
        ) : (
          <Button variant="outline" size="sm" onClick={handleGenerate}>
            <ImageIcon className="h-4 w-4 mr-2" />
            Generate AI Image
          </Button>
        )}
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className={`relative ${className}`}>
        <Skeleton className="w-full aspect-square rounded-lg" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Generating AI image...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imageUrl!}
      alt={alt}
      className={`rounded-lg shadow-lg ${className}`}
      loading="lazy"
    />
  );
}
