import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_PROMPT_LENGTH = 500;
const MAX_STYLE_LENGTH = 100;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify JWT authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Authentication required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      console.error("Auth error:", authError?.message);
      return new Response(JSON.stringify({ error: "Invalid authentication" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    console.log(`Image generation request from user: ${user.id}`);

    const { prompt, style } = await req.json();

    // Input validation
    if (!prompt || typeof prompt !== "string") {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
      return new Response(JSON.stringify({ error: `Prompt must be less than ${MAX_PROMPT_LENGTH} characters` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    if (style && (typeof style !== "string" || style.length > MAX_STYLE_LENGTH)) {
      return new Response(JSON.stringify({ error: "Invalid style parameter" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("Lovable API key not configured");
      return new Response(JSON.stringify({ error: "Image service unavailable" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 503,
      });
    }

    // Sanitize inputs
    const sanitizedPrompt = prompt.trim().substring(0, MAX_PROMPT_LENGTH);
    const sanitizedStyle = style ? style.trim().substring(0, MAX_STYLE_LENGTH) : 'photorealistic cinematic photography';

    console.log(`Generating image for user ${user.id}, prompt length: ${sanitizedPrompt.length}`);

    // Enhanced prompt for cinematic storytelling visuals
    const enhancedPrompt = `Cinematic, dramatic scene: ${sanitizedPrompt}. Style: ${sanitizedStyle}, moody lighting, film grain, 35mm film look, emotional depth, dramatic composition. Ultra high resolution.`;

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

    if (!response.ok) {
      console.error("AI API error:", response.status);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 429,
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 503,
        });
      }
      return new Response(JSON.stringify({ error: "Failed to generate image" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const data = await response.json();
    
    // Extract the image from the response
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageUrl) {
      console.error("No image in response");
      return new Response(JSON.stringify({ error: "Failed to generate image" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }
    
    console.log(`Image generated successfully for user ${user.id}`);

    return new Response(
      JSON.stringify({ image: imageUrl }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Image generation error:", error instanceof Error ? error.message : "Unknown error");
    return new Response(
      JSON.stringify({ error: "Failed to generate image" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
