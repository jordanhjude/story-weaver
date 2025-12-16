import { MapPin, Plane } from "lucide-react";

interface AuthorLocationProps {
  city: string;
  country: string;
  nextDestination?: string;
}

export function AuthorLocation({ city, country, nextDestination }: AuthorLocationProps) {
  return (
    <section className="container py-12">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-card to-primary/10 border border-primary/20 p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-full bg-primary/20 border border-primary/30">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Currently Writing From</p>
              <h3 className="text-3xl font-bold text-foreground">{city}</h3>
              <p className="text-lg text-muted-foreground">{country}</p>
            </div>
          </div>
          
          {nextDestination && (
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-background/50 border border-border">
              <Plane className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Next stop:</span>
              <span className="font-semibold text-foreground">{nextDestination}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
