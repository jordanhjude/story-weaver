import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Comic } from "@/hooks/useComicsDB";

interface HeroCarouselProps {
  comics: Comic[];
}

export function HeroCarousel({ comics }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % comics.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [comics.length]);

  const goTo = (index: number) => setCurrentIndex(index);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + comics.length) % comics.length);
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % comics.length);

  if (comics.length === 0) return null;

  const current = comics[currentIndex];

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Background Image with enhanced overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
        style={{ backgroundImage: `url(${current.banner_image || current.cover_image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-transparent" />
      </div>

      {/* Main tagline at top */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <p className="text-sm md:text-base text-foreground/80 font-medium tracking-widest uppercase">
          Real Tales From Every Corner of the Globe
        </p>
      </div>

      {/* Content */}
      <div className="relative container h-full flex items-center pt-16">
        <div className="max-w-2xl animate-slide-in" key={current.id}>
          {/* Genre badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {current.genres?.map((genre) => (
              <Badge 
                key={genre} 
                variant="secondary" 
                className="bg-primary/20 text-primary border border-primary/30 text-xs capitalize px-3 py-1"
              >
                {genre}
              </Badge>
            ))}
          </div>
          
          {/* Title with dramatic styling */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-[1.1] tracking-tight">
            {current.title}
          </h1>

          {/* Location with enhanced styling */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <span className="text-foreground/90 font-medium">Written in {current.city}</span>
          </div>
          
          {/* Description with better typography */}
          <p className="text-muted-foreground text-base md:text-lg mb-8 line-clamp-3 leading-relaxed max-w-xl">
            {current.description}
          </p>
          
          {/* Enhanced CTA */}
          <div className="flex items-center gap-4">
            <Link to={`/tale/${current.id}`}>
              <Button size="lg" className="gradient-primary text-primary-foreground font-semibold px-10 py-6 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
                Read This Story
              </Button>
            </Link>
            <span className="text-sm text-muted-foreground">
              {current.episode_count || 0} Episodes
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/30 hover:bg-background/50 transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button 
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/30 hover:bg-background/50 transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {comics.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentIndex 
                ? "bg-primary w-6" 
                : "bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
