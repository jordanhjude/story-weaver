import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Heart, ArrowLeft } from "lucide-react";

export default function DonationSuccess() {
  useEffect(() => {
    document.title = "Thank You! | Moonlit Letters";
  }, []);

  return (
    <div className="min-h-screen bg-background velvet-texture">
      <SiteHeader />
      
      <main className="pt-32 pb-24">
        <div className="reading-container">
          <div className="text-center max-w-md mx-auto animate-fade-in-up">
            <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose/10 border border-rose/20">
              <CheckCircle className="w-10 h-10 text-rose" />
            </div>
            
            <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-6">
              Thank You for Your Support
            </h1>
            
            <p className="text-muted-foreground font-body leading-relaxed mb-8">
              Your generosity helps me continue traveling and creating the emotionally 
              rich stories that make Moonlit Letters special. You're now part of this journey.
            </p>
            
            <div className="flex items-center justify-center gap-2 text-rose mb-12">
              <Heart className="w-5 h-5 fill-rose" />
              <span className="font-body italic">You're wonderful</span>
            </div>
            
            <Button 
              asChild
              variant="outline" 
              className="border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground font-body tracking-wide"
            >
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
}
