import { Heart, MapPin, Coffee, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const DONATION_AMOUNTS = [5, 10, 25, 50, 100];

export function SupportSection() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");

  const handleDonate = () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (!amount || amount <= 0) {
      toast.error("Please select or enter a donation amount");
      return;
    }
    // For now, show a toast - later can integrate with Stripe
    toast.success(`Thank you for your $${amount} donation! This feature will be fully enabled soon.`);
  };

  return (
    <section className="container py-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card to-primary/5 border border-border p-8 md:p-12">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Support My Journey</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Help Me Tell Stories From Your City
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Every donation helps me travel to new cities, experience local cultures, and create 
            unique stories inspired by real places. Your support makes these adventures possible!
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {DONATION_AMOUNTS.map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount("");
                }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedAmount === amount && !customAmount
                    ? "bg-primary text-primary-foreground scale-105"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
              >
                ${amount}
              </button>
            ))}
            <input
              type="number"
              placeholder="Custom"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(null);
              }}
              className="w-24 px-4 py-3 rounded-xl bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <Button 
            onClick={handleDonate}
            size="lg" 
            className="px-8 py-6 text-lg font-semibold bg-primary hover:bg-primary/90"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Donate Now
          </Button>

          <div className="flex flex-wrap justify-center gap-6 mt-10 pt-8 border-t border-border">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-5 h-5 text-primary" />
              <span>12 Cities Visited</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Coffee className="w-5 h-5 text-primary" />
              <span>47 Supporters</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Heart className="w-5 h-5 text-primary" />
              <span>$2,450 Raised</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
