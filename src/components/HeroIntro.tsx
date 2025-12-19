import { Globe, BookOpen, Heart } from "lucide-react";

export function HeroIntro() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Stories from every corner of the globe</span>
          </div>

          {/* Main headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Real Tales That</span>{" "}
            <span className="text-gradient">Move You</span>
          </h2>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            From bustling city streets to quiet mountain villages, these are the stories that define us—
            raw, unfiltered, and deeply human. Read them. Feel them. Connect with them.
          </p>

          {/* Three pillars */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="group p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Global Perspectives</h3>
              <p className="text-sm text-muted-foreground">
                Each story is written from a different city, capturing the essence of places most never see
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Authentic Narratives</h3>
              <p className="text-sm text-muted-foreground">
                No filters, no pretense—just honest storytelling that reflects real human experiences
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Emotional Connection</h3>
              <p className="text-sm text-muted-foreground">
                Stories that stay with you, challenge you, and remind you what it means to be alive
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
