import { Quote, Pen, Compass } from "lucide-react";

export function WhyJJtales() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 to-background" />
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Story side */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
              <Pen className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium text-accent uppercase tracking-wider">The Story Behind</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Why I Started <span className="text-gradient">JJtales</span>
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                It began in a cramped café in Kraków, Poland. The rain was relentless, my laptop was dying, 
                and I had just overheard a conversation between two strangers that would change everything.
              </p>
              <p>
                They were talking about loss—the kind that reshapes you. And in that moment, 
                I realized: every city holds thousands of these stories, whispered in cafés, 
                shouted on street corners, or buried in the hearts of people who'll never tell them.
              </p>
              <p className="font-medium text-foreground">
                JJtales exists to unearth those stories. To travel, to listen, and to write 
                the tales that deserve to be told.
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">12 Cities Explored</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <Quote className="w-5 h-5 text-accent" />
                <span className="text-sm text-muted-foreground">50+ Stories Written</span>
              </div>
            </div>
          </div>

          {/* Quote side */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
            
            <div className="relative p-8 md:p-10 rounded-3xl bg-card border border-border">
              <Quote className="w-12 h-12 text-primary/30 mb-4" />
              <blockquote className="text-xl md:text-2xl font-serif italic text-foreground leading-relaxed mb-6">
                "Every person you pass on the street is living a story as vivid and complex as your own. 
                My job is to catch a glimpse of those stories before they disappear."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                  JJ
                </div>
                <div>
                  <p className="font-semibold text-foreground">The Author</p>
                  <p className="text-sm text-muted-foreground">Wanderer • Storyteller</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
