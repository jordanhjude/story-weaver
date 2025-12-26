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
    <section className="py-16">
      <div className="reading-container">
        <div className="relative overflow-hidden bg-card/50 border border-border/30 p-8 md:p-12">
          {/* Subtle glow effect */}
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose/5 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-rose/10 border border-rose/20">
                <Heart className="w-4 h-4 text-rose" />
              </div>
              <span className="text-xs text-rose font-body uppercase tracking-widest">
                Support the Journey
              </span>
            </div>
            
            <h2 className="font-serif text-2xl md:text-3xl text-foreground tracking-wide mb-3">
              Help Bring These Stories to Life
            </h2>
            
            <p className="text-muted-foreground font-body leading-relaxed mb-8 max-w-xl">
              Your support helps me travel to new cities, find inspiration, and craft 
              the emotionally rich tales that make Moonlit Letters special.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8 text-sm text-muted-foreground/70 font-body">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose/60" />
                12 Cities Visited
              </span>
              <span>47 Supporters</span>
              <span>$2,450 Raised</span>
            </div>
            
            {/* Donation selector */}
            <div className="flex flex-wrap items-center gap-3">
              {DONATION_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`px-5 py-2.5 font-body text-sm tracking-wide transition-all duration-300 border ${
                    selectedAmount === amount
                      ? "bg-rose text-primary-foreground border-rose"
                      : "bg-transparent text-muted-foreground border-border/50 hover:border-rose/50 hover:text-foreground"
                  }`}
                >
                  ${amount}
                </button>
              ))}
              
              <Button 
                onClick={handleDonate}
                disabled={isLoading}
                className="bg-rose hover:bg-rose/90 text-primary-foreground px-6 py-2.5 font-body tracking-wide"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <CreditCard className="w-4 h-4 mr-2" />
                )}
                {isLoading ? "Processing..." : "Support"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
