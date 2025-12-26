import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen, Star, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Subscribed! You'll receive our latest stories soon.");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background velvet-texture">
      <SiteHeader />
      
      <main className="pt-32 pb-24">
        <div className="reading-container">
          {/* Header */}
          <div className="max-w-2xl mb-16 animate-fade-in-up">
            <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-4">
              Join Our Readers
            </h1>
            <p className="text-muted-foreground font-body leading-relaxed">
              Subscribe to receive new stories and exclusive content delivered 
              directly to your inbox.
            </p>
          </div>
          
          {/* Free Newsletter */}
          <div className="bg-card/50 border border-border/30 p-8 md:p-12 mb-12 animate-fade-in-up delay-100">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-5 h-5 text-rose" />
              <h2 className="font-serif text-xl text-foreground tracking-wide">
                Free Newsletter
              </h2>
            </div>
            
            <p className="text-muted-foreground font-body leading-relaxed mb-8">
              Receive weekly story recommendations, writing updates, and exclusive 
              excerpts from upcoming tales.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 px-4 py-3 bg-background border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-rose/50 font-body text-sm"
              />
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="bg-rose hover:bg-rose/90 text-primary-foreground px-6 py-3 font-body tracking-wide disabled:opacity-50"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            
            <p className="text-xs text-muted-foreground/60 mt-4">
              By subscribing, you confirm you are 18 years or older. We respect your privacy.
            </p>
          </div>
          
          {/* Premium Membership */}
          <div className="border-t border-border/30 pt-16">
            <h2 className="font-serif text-2xl text-foreground tracking-wide mb-8">
              Premium Membership
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-12 max-w-xl">
              For readers who desire more, our premium membership offers exclusive 
              access to longer stories, early releases, and special collections.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-card/30 border border-border/20 opacity-0 animate-fade-in-up delay-200">
                <Heart className="w-5 h-5 text-rose mb-4" />
                <h3 className="font-serif text-lg text-foreground mb-2">Early Access</h3>
                <p className="text-sm text-muted-foreground font-body">
                  Read new stories before they're published to the public.
                </p>
              </div>
              
              <div className="p-6 bg-card/30 border border-border/20 opacity-0 animate-fade-in-up delay-300">
                <BookOpen className="w-5 h-5 text-rose mb-4" />
                <h3 className="font-serif text-lg text-foreground mb-2">Long-Form Tales</h3>
                <p className="text-sm text-muted-foreground font-body">
                  Exclusive multi-chapter stories and serialized novels.
                </p>
              </div>
              
              <div className="p-6 bg-card/30 border border-border/20 opacity-0 animate-fade-in-up delay-400">
                <Star className="w-5 h-5 text-rose mb-4" />
                <h3 className="font-serif text-lg text-foreground mb-2">Special Collections</h3>
                <p className="text-sm text-muted-foreground font-body">
                  Curated collections and downloadable ebooks.
                </p>
              </div>
            </div>
            
            <p className="text-muted-foreground/60 font-body text-sm mt-12 italic">
              Premium membership coming soon. Subscribe to the newsletter to be notified.
            </p>
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
}
