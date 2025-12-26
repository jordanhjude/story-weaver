import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Mail, MapPin, EyeOff } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background velvet-texture">
      <SiteHeader />
      
      <main className="pt-32 pb-24">
        <div className="reading-container">
          <div className="max-w-2xl">
            <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-4 animate-fade-in">
              Reach Into the Whispers
            </h1>
            <p className="text-muted-foreground font-body mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              The author remains anonymous, but messages are always read.
            </p>
            
            <div className="space-y-8">
              {/* Anonymous Note */}
              <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="p-8 bg-card/50 border border-border/30 space-y-4">
                  <div className="flex items-center gap-3">
                    <EyeOff className="w-5 h-5 text-rose" />
                    <h2 className="font-serif text-lg text-foreground">A Note on Anonymity</h2>
                  </div>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    I don't share my name, my face, or my location. This isn't mystery for 
                    mystery's sake—it's freedom. Freedom to write without pretense, and 
                    freedom for you to read without expectation.
                  </p>
                  <p className="text-muted-foreground/70 font-body italic text-sm">
                    The stories are real. The author is a ghost.
                  </p>
                </div>
              </section>
              
              {/* Location Section */}
              <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-px flex-1 bg-border/50"></span>
                  <span className="text-sm text-muted-foreground uppercase tracking-widest">Currently</span>
                  <span className="h-px flex-1 bg-border/50"></span>
                </div>
                
                <div className="p-6 bg-card/30 border border-border/20">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="h-5 w-5 text-rose" />
                    <span className="font-serif text-lg text-foreground">Somewhere in Europe</span>
                  </div>
                  <p className="text-muted-foreground font-body text-sm ml-8 italic">
                    Moving between cities. Collecting whispers.
                  </p>
                </div>
              </section>
              
              {/* Email Section */}
              <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-px flex-1 bg-border/50"></span>
                  <span className="text-sm text-muted-foreground uppercase tracking-widest">Contact</span>
                  <span className="h-px flex-1 bg-border/50"></span>
                </div>
                
                <a 
                  href="mailto:whispers@cityofwhispers.com"
                  className="group flex items-center gap-4 p-6 bg-card/30 border border-border/20 hover:border-rose/30 hover:bg-card/50 transition-all duration-300"
                >
                  <div className="p-3 rounded-full bg-rose/10 text-rose">
                    <Mail size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-serif text-foreground group-hover:text-rose transition-colors">Email</p>
                    <p className="text-sm text-muted-foreground">whispers@cityofwhispers.com</p>
                  </div>
                  <span className="text-muted-foreground group-hover:text-rose group-hover:translate-x-1 transition-all">→</span>
                </a>
                
                <p className="text-xs text-muted-foreground/60 mt-4 italic text-center">
                  I read every message. I respond to few. But your words may become a story.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
}