import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Donation price IDs mapping
const DONATION_PRICES: Record<number, string> = {
  5: "price_1SfiUsCZscUwCgU6qgJpL6Dm",
  10: "price_1SfiV8CZscUwCgU6rJBdxp7I",
  25: "price_1SfiVJCZscUwCgU6uktRZ01h",
  50: "price_1SfiVUCZscUwCgU6TB88etvx",
};

const VALID_AMOUNTS = [5, 10, 25, 50];

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

    console.log(`Donation request from user: ${user.id}`);

    const { amount } = await req.json();
    
    // Validate amount
    if (typeof amount !== "number" || !VALID_AMOUNTS.includes(amount)) {
      return new Response(JSON.stringify({ error: "Invalid donation amount" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const priceId = DONATION_PRICES[amount];

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("Stripe key not configured");
      return new Response(JSON.stringify({ error: "Payment service unavailable" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 503,
      });
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-08-27.basil",
    });

    const origin = req.headers.get("origin") || "https://jjtales.lovable.app";
    
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/donation-success`,
      cancel_url: `${origin}/`,
      customer_email: user.email,
      metadata: {
        user_id: user.id,
      },
    });

    console.log(`Checkout session created for user ${user.id}`);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error creating donation session:", error instanceof Error ? error.message : "Unknown error");
    return new Response(JSON.stringify({ error: "Failed to create donation session" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
