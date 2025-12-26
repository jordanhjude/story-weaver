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
                I am a writer. You will never know my name. That is the point.
              </p>
              
              <p>
                City of Whispers is a collection of anonymous stories about romance 
                and intimacy—the kind that breathes in shadowed alleyways, flickers 
                in dimly lit cafés, lingers on quiet hotel terraces, and hides in 
                the glow of city nights.
              </p>
              
              <p>
                I move through cities unseen. I watch. I listen. I write. Every city 
                has its own rhythm of desire, its own secret language of glances, 
                fleeting touches, and silent invitations that strangers exchange 
                before becoming something more.
              </p>
              
              <p>
                These stories are for adults who understand that intimacy is never 
                only physical—it's the tension in a shared glance, the words that 
                are never spoken, the "what-ifs" that linger long after a passing encounter.
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
                The writer remains unseen. The stories speak for themselves—unburdened 
                by identity, expectation, or pretense.
              </p>
            </div>
            
            <div className="space-y-4 opacity-0 animate-fade-in-up delay-200">
              <Heart className="w-6 h-6 text-rose" />
              <h3 className="font-serif text-lg text-foreground tracking-wide">
                Emotional Intimacy
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Every tale explores the full spectrum of desire, from tender hesitation 
                to the heat of unspoken passion.
              </p>
            </div>
            
            <div className="space-y-4 opacity-0 animate-fade-in-up delay-300">
              <Feather className="w-6 h-6 text-rose" />
              <h3 className="font-serif text-lg text-foreground tracking-wide">
                Urban Settings
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Every story is born from a city—the cafés, streets, rooftops, and secret 
                corners where strangers brush past, leaving traces of longing behind.
              </p>
            </div>
            
            <div className="space-y-4 opacity-0 animate-fade-in-up delay-400">
              <Shield className="w-6 h-6 text-rose" />
              <h3 className="font-serif text-lg text-foreground tracking-wide">
                Consent and Connection
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                All narratives center on mutual desire, consent, and genuine emotional 
                connection between characters.
              </p>
            </div>
          </div>
          
          {/* Contact */}
          <div className="mt-24 pt-16 border-t border-border/30">
            <h2 className="font-serif text-xl text-foreground tracking-wide mb-4">
              Reach the Author
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed">
              If you have a story to share or a city whisper to submit, write to{" "}
              <a 
                href="mailto:beatalestory@gmail.com" 
                className="text-rose hover:text-rose/80 transition-colors story-link"
              >
                beatalestory@gmail.com
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