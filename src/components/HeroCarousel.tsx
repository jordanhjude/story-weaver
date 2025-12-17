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
    <section className="relative h-[500px] md:h-[550px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${current.banner_image || current.cover_image})` }}
      >
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative container h-full flex items-center">
        <div className="max-w-lg animate-slide-in" key={current.id}>
          <div className="flex gap-2 mb-4">
            {current.genres?.map((genre) => (
              <Badge 
                key={genre} 
                variant="secondary" 
                className="bg-secondary/80 text-foreground text-xs capitalize"
              >
                {genre}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight">
            {current.title}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">Written in {current.city}</span>
          </div>
          
          <p className="text-muted-foreground text-sm md:text-base mb-6 line-clamp-3">
            {current.description}
          </p>
          
          <Link to={`/tale/${current.id}`}>
            <Button size="lg" className="gradient-primary text-primary-foreground font-semibold px-8">
              Read now
            </Button>
          </Link>
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
