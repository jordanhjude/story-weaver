import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Heart, Feather, Shield, EyeOff } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background velvet-texture">
      <SiteHeader />
      
      <main className="pt-32 pb-24">
        <div className="reading-container">
          {/* Header */}
          <div className="max-w-2xl mb-16 animate-fade-in-up">
            <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-8">
              About City of Whispers
            </h1>
            
            <div className="space-y-6 text-muted-foreground font-body leading-relaxed">
              <p className="text-lg italic text-foreground/90">
                I am a writer. You don't know my name, and that's intentional.
              </p>
              
              <p>
                City of Whispers is a collection of anonymous stories about romance 
                and intimacy—the kind that unfolds in city streets, dimly lit bars, 
                rooftop terraces, and quiet hotel rooms.
              </p>
              
              <p>
                I travel. I observe. I write. Every city has its own rhythm of desire, 
                its own language of glances and gestures that strangers exchange 
                before they become something more.
              </p>
              
              <p>
                These stories are for adults who understand that intimacy is more 
                than physical—it's the tension before the touch, the words left 
                unspoken, the what-ifs that linger long after.
              </p>
              
              <p className="text-foreground/80 font-medium">
                Anonymity gives me freedom. It gives you permission.
              </p>
            </div>
          </div>
          
          {/* Values */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24 border-t border-border/30 pt-16">
            <div className="space-y-4 opacity-0 animate-fade-in-up delay-100">
              <EyeOff className="w-6 h-6 text-rose" />
              <h3 className="font-serif text-lg text-foreground tracking-wide">
                Anonymous Author
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                The writer remains unknown. The stories speak for themselves, 
                unburdened by identity or expectation.
              </p>
            </div>
            
            <div className="space-y-4 opacity-0 animate-fade-in-up delay-200">
              <Heart className="w-6 h-6 text-rose" />
              <h3 className="font-serif text-lg text-foreground tracking-wide">
                Emotional Intimacy
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Stories that explore the full spectrum of romantic emotion, 
                from tender beginnings to passionate intensity.
              </p>
            </div>
            
            <div className="space-y-4 opacity-0 animate-fade-in-up delay-300">
              <Feather className="w-6 h-6 text-rose" />
              <h3 className="font-serif text-lg text-foreground tracking-wide">
                Urban Settings
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Every story is born from a city—its cafés, streets, 
                and the strangers who pass through them.
              </p>
            </div>
            
            <div className="space-y-4 opacity-0 animate-fade-in-up delay-400">
              <Shield className="w-6 h-6 text-rose" />
              <h3 className="font-serif text-lg text-foreground tracking-wide">
                Respectful Content
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                All narratives center on consent, respect, and genuine 
                connections between characters.
              </p>
            </div>
          </div>
          
          {/* Contact */}
          <div className="mt-24 pt-16 border-t border-border/30">
            <h2 className="font-serif text-xl text-foreground tracking-wide mb-4">
              Reach the Author
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed">
              For inquiries or to share your own city whisper, reach out at{" "}
              <a 
                href="mailto:whispers@cityofwhispers.com" 
                className="text-rose hover:text-rose/80 transition-colors story-link"
              >
                whispers@cityofwhispers.com
              </a>
            </p>
            <p className="text-muted-foreground/60 font-body text-sm mt-2 italic">
              I read every message. I respond to none. But your words may become a story.
            </p>
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
}