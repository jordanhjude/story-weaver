import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { toast } from "sonner";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate subscription
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Subscribed. You'll hear from us soon.");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      
      <main className="flex-1 pt-24">
        <section className="reading-container py-16 md:py-24">
          <div className="max-w-md">
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-6 fade-in">
              Subscribe
            </h1>
            
            <p className="text-muted-foreground mb-12 leading-relaxed fade-in" style={{ animationDelay: "0.1s" }}>
              New stories delivered to your inbox. No spam, no algorithms, 
              no bright colors. Just dark fiction for serious readers.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6 fade-in" style={{ animationDelay: "0.2s" }}>
              <div>
                <label htmlFor="email" className="block font-sans text-xs tracking-widest uppercase text-muted-foreground mb-3">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-transparent border border-border text-foreground font-body focus:outline-none focus:border-foreground transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-3 border border-foreground/30 text-foreground font-sans text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            
            <p className="mt-8 text-muted-foreground/50 text-sm fade-in" style={{ animationDelay: "0.3s" }}>
              We respect your privacy. Unsubscribe anytime.
            </p>
            
            <div className="section-divider !mx-0 my-16" />
            
            <div className="fade-in" style={{ animationDelay: "0.4s" }}>
              <h2 className="font-serif text-xl text-foreground mb-4">
                Premium Membership
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                For readers who want more: early access to new stories, 
                exclusive long-form fiction, and audio narrations.
              </p>
              <p className="text-muted-foreground/50 text-sm italic">
                Coming soon.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
