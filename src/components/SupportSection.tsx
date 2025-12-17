import { Heart, MapPin, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const DONATION_AMOUNTS = [5, 10, 25, 50];

export function SupportSection() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [isLoading, setIsLoading] = useState(false);

  const handleDonate = async () => {
    if (!selectedAmount) {
      toast.error("Please select a donation amount");
      return;
    }
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-donation", {
        body: { amount: selectedAmount },
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (error) {
      console.error("Donation error:", error);
      toast.error("Failed to process donation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container py-10">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-card to-primary/5 border border-border p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3">
              <Heart className="w-3 h-3 text-primary" />
              <span className="text-xs font-medium text-primary">Support My Journey</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Help Me Write Stories From Your City
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-primary" />
                12 Cities
              </span>
              <span>47 Supporters</span>
              <span>$2,450 Raised</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {DONATION_AMOUNTS.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  selectedAmount === amount
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
              >
                ${amount}
              </button>
            ))}
            <Button 
              onClick={handleDonate}
              disabled={isLoading}
              className="ml-2 bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <CreditCard className="w-4 h-4 mr-1" />
              )}
              {isLoading ? "Processing..." : "Donate"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
