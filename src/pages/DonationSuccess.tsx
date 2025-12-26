import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft } from "lucide-react";

export default function DonationSuccess() {
  useEffect(() => {
    document.title = "Thank You! | City of Whispers";
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
              Thank You
            </h1>
            
            <p className="text-muted-foreground font-body leading-relaxed mb-4">
              Your support means more than you know. It allows me to keep traveling, 
              keep observing, and keep writing the stories that find you here.
            </p>
            
            <p className="text-muted-foreground/70 font-body italic mb-8">
              You've become part of the whisper.
            </p>
            
            <Button asChild variant="outline" className="border-border/50">
              <Link to="/stories">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Stories
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
}