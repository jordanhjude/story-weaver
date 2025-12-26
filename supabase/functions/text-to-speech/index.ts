import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_TEXT_LENGTH = 4096;
const VALID_VOICES = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"];

serve(async (req) => {
  // Handle CORS preflight requests
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

    console.log(`TTS request from user: ${user.id}`);

    const { text, voice } = await req.json();
    
    // Input validation
    if (!text || typeof text !== "string") {
      return new Response(JSON.stringify({ error: "Text is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    if (text.length > MAX_TEXT_LENGTH) {
      return new Response(JSON.stringify({ error: `Text must be less than ${MAX_TEXT_LENGTH} characters` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const selectedVoice = voice && VALID_VOICES.includes(voice) ? voice : "alloy";

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    
    if (!OPENAI_API_KEY) {
      console.error("OpenAI API key not configured");
      return new Response(JSON.stringify({ error: "Speech service unavailable" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 503,
      });
    }

    console.log(`Generating speech for user ${user.id}, ${text.length} characters, voice: ${selectedVoice}`);

    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tts-1",
        input: text.substring(0, MAX_TEXT_LENGTH),
        voice: selectedVoice,
        response_format: "mp3",
      }),
    });

    if (!response.ok) {
      console.error("OpenAI API error:", response.status);
      return new Response(JSON.stringify({ error: "Failed to generate speech" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    const audioBuffer = await response.arrayBuffer();
    console.log(`Audio generated for user ${user.id}, size: ${audioBuffer.byteLength}`);

    return new Response(audioBuffer, {
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    console.error("Text-to-speech error:", error instanceof Error ? error.message : "Unknown error");
    return new Response(JSON.stringify({ error: "Failed to generate speech" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
