import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useStoryImage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async (prompt: string, style?: string): Promise<string | null> => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await supabase.functions.invoke('generate-story-image', {
        body: { prompt, style }
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to generate image');
      }

      return response.data.image;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Image generation error:', errorMessage);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return { generateImage, isGenerating, error };
}
