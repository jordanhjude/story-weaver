import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, style } = await req.json();

    if (!prompt) {
      throw new Error("Prompt is required");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("Lovable API key not configured");
    }

    console.log(`Generating image for prompt: ${prompt.substring(0, 100)}...`);

    // Enhanced prompt for cinematic storytelling visuals
    const enhancedPrompt = `Cinematic, dramatic scene: ${prompt}. Style: ${style || 'photorealistic cinematic photography'}, moody lighting, film grain, 35mm film look, emotional depth, dramatic composition. Ultra high resolution.`;

    console.log("Calling Lovable AI...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: enhancedPrompt
          }
        ],
        modalities: ["image", "text"]
      }),
    });

    console.log(`API response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lovable AI error:", response.status, errorText);
      
      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again in a moment.");
      }
      if (response.status === 402) {
        throw new Error("Usage limit reached. Please add credits to your workspace.");
      }
      throw new Error(`AI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Response keys:", Object.keys(data));
    console.log("Choices:", data.choices?.length);
    
    if (data.choices?.[0]?.message) {
      console.log("Message keys:", Object.keys(data.choices[0].message));
    }
    
    // Extract the image from the response
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageUrl) {
      console.error("No image in response. Full response:", JSON.stringify(data, null, 2));
      throw new Error("No image generated - check response format");
    }
    
    console.log("Image generated successfully, length:", imageUrl.length);

    return new Response(
      JSON.stringify({ image: imageUrl }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Image generation error:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
