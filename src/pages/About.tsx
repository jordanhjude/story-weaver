import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Heart, Feather, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background velvet-texture">
      <SiteHeader />
      
      <main className="pt-32 pb-24">
        <div className="reading-container">
          {/* Header */}
          <div className="max-w-2xl mb-16 animate-fade-in-up">
            <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-8">
              About Moonlit Letters
            </h1>
            
            <div className="space-y-6 text-muted-foreground font-body leading-relaxed">
              <p className="text-lg italic text-foreground/90">
                Moonlit Letters collects emotionally rich stories of love, attraction, and connection.
              </p>
              
              <p>
                Each tale is crafted to immerse readers in romance, tension, and the thrill 
                of intimate moments—all for adults seeking meaningful storytelling.
              </p>
              
              <p>
                We believe that the most powerful stories are those that explore the complexities 
                of the heart: the longing, the anticipation, the quiet moments of connection 
                that words can barely capture.
              </p>
              
              <p>
                Our stories are written for readers who appreciate emotional depth, beautiful 
                prose, and narratives that linger long after the final sentence.
              </p>
            </div>
          </div>
          
          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8 mt-24 border-t border-border/30 pt-16">
            <div className="space-y-4 opacity-0 animate-fade-in-up delay-100">
              <Heart className="w-6 h-6 text-rose" />
              <h3 className="font-serif text-lg text-foreground tracking-wide">
                Emotional Depth
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Stories that explore the full spectrum of romantic emotion, 
                from tender beginnings to passionate intensity.
              </p>
            </div>
            
            <div className="space-y-4 opacity-0 animate-fade-in-up delay-200">
              <Feather className="w-6 h-6 text-rose" />
              <h3 className="font-serif text-lg text-foreground tracking-wide">
                Literary Quality
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Each story is crafted with care for language, pacing, and the 
                subtle art of romantic tension.
              </p>
            </div>
            
            <div className="space-y-4 opacity-0 animate-fade-in-up delay-300">
              <Shield className="w-6 h-6 text-rose" />
              <h3 className="font-serif text-lg text-foreground tracking-wide">
                Respectful Content
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                All narratives center on consent, respect, and the genuine 
                connections between characters.
              </p>
            </div>
          </div>
          
          {/* Contact */}
          <div className="mt-24 pt-16 border-t border-border/30">
            <h2 className="font-serif text-xl text-foreground tracking-wide mb-4">
              Get in Touch
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed">
              For inquiries, submissions, or collaboration opportunities, 
              please reach out at{" "}
              <a 
                href="mailto:hello@moonlitletters.com" 
                className="text-rose hover:text-rose/80 transition-colors story-link"
              >
                hello@moonlitletters.com
              </a>
            </p>
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
}
