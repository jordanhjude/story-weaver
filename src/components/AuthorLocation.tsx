import { MapPin, Feather, EyeOff } from "lucide-react";

interface AuthorLocationProps {
  city: string;
  country: string;
  nextEpisode?: string;
}

export function AuthorLocation({ city, country }: AuthorLocationProps) {
  return (
    <section className="py-16">
      <div className="reading-container">
        <div className="relative overflow-hidden bg-card/50 border border-border/30 p-8 md:p-12">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-full bg-rose/10 border border-rose/20">
                <EyeOff className="w-6 h-6 text-rose" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-body uppercase tracking-widest mb-2">
                  Currently Writing From
                </p>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground tracking-wide">
                  {city}
                </h3>
                <p className="text-muted-foreground font-body italic">{country}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground/60">
              <MapPin className="w-4 h-4 text-rose/60" />
              <span className="text-sm font-body italic">
                Identity unknown. Stories everywhere.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}