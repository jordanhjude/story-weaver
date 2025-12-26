import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StoryCard } from "@/components/StoryCard";
import { AuthorLocation } from "@/components/AuthorLocation";
import { SupportSection } from "@/components/SupportSection";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

// Import Kraków story images
import krakowVelvetImg from "@/assets/stories/krakow-velvet-nights.jpg";
import krakowLibraryImg from "@/assets/stories/krakow-library.jpg";
import krakowLetterImg from "@/assets/stories/krakow-letter.jpg";
import krakowMoonlightImg from "@/assets/stories/krakow-moonlight.jpg";

const featuredStories = [
  {
    id: "rynek-nights",
    title: "Rynek Nights",
    excerpt: "Under the glow of the Sukiennice, she saw him again—the stranger from the café who had vanished three years ago without a word...",
    readingTime: "12 min",
    themes: ["Reunion", "Main Square"],
    image: krakowVelvetImg,
  },
  {
    id: "jagiellonian-secrets",
    title: "Jagiellonian Secrets",
    excerpt: "In the ancient halls of the university, their hands touched reaching for the same forbidden manuscript. Some stories are meant to be shared...",
    readingTime: "8 min",
    themes: ["Academia", "Longing"],
    image: krakowLibraryImg,
  },
  {
    id: "kazimierz-letters",
    title: "Letters from Kazimierz",
    excerpt: "Hidden in a vintage shop on Szeroka Street, she found letters addressed to a woman with her name, written fifty years before she was born...",
    readingTime: "15 min",
    themes: ["Mystery", "Jewish Quarter"],
    image: krakowLetterImg,
  },
  {
    id: "wawel-moonlight",
    title: "Wawel Moonlight",
    excerpt: "Every night he waited on the castle terrace, watching the Vistula flow, hoping she would return to the place where they first kissed...",
    readingTime: "10 min",
    themes: ["Desire", "Castle"],
    image: krakowMoonlightImg,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background velvet-texture">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="pt-40 pb-24">
        <div className="reading-container">
          <div className="max-w-2xl animate-fade-in-up">
            <p className="text-sm text-muted-foreground font-body uppercase tracking-widest mb-4 opacity-70">
              Letting cities speak of love and romance
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight tracking-wide">
              Every city has a love story waiting to be told.
            </h1>
            
            <p className="mt-8 text-lg text-muted-foreground font-body leading-relaxed opacity-0 animate-fade-in-up delay-200">
              An anonymous writer. A journey across the world. 
              Intimate stories of romance born from the streets, cafés, and 
              hidden corners of each city I visit.
            </p>
            
            <div className="mt-12 opacity-0 animate-fade-in-up delay-300">
              <Button 
                asChild
                className="bg-rose hover:bg-rose/90 text-primary-foreground px-8 py-6 text-base tracking-wide font-body"
              >
                <Link to="/stories">
                  <Heart className="w-4 h-4 mr-2" />
                  Read a story
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Author Location */}
      <AuthorLocation city="Kraków" country="Poland" />
      
      {/* Description */}
      <section className="py-16 border-y border-border/20">
        <div className="reading-container">
          <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-2xl">
            Right now, I'm in Kraków—writing from its ancient squares, candlelit 
            cafés, and moonlit castle walls. But this is just the beginning. 
            Paris, Tokyo, Barcelona, Buenos Aires... each city will have its chapter.
          </p>
          <p className="mt-6 text-muted-foreground/70 font-body italic">
            You won't know my name. But you'll feel every city through my words.
          </p>
        </div>
      </section>
      
      {/* Featured Stories */}
      <section className="py-24">
        <div className="wide-container">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="font-serif text-2xl text-foreground tracking-wide">
              Current Chapter: Kraków
            </h2>
            <span className="text-sm text-muted-foreground/60 font-body italic hidden md:block">
              More cities coming soon...
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredStories.map((story, index) => (
              <StoryCard
                key={story.id}
                {...story}
                className={`opacity-0 animate-fade-in-up delay-${(index + 1) * 100}`}
              />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link 
              to="/stories" 
              className="story-link font-body text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              View all stories →
            </Link>
          </div>
        </div>
      </section>
      
      {/* Support Section */}
      <SupportSection />
      
      {/* Newsletter */}
      <section className="py-24 bg-secondary/30">
        <div className="reading-container text-center">
          <h2 className="font-serif text-2xl text-foreground mb-4 tracking-wide">
            Follow the Journey
          </h2>
          <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
            Be the first to know when I arrive in a new city. New stories, new whispers.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-background border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-rose/50 font-body text-sm"
            />
            <Button 
              type="submit"
              className="bg-rose hover:bg-rose/90 text-primary-foreground px-6 py-3 font-body tracking-wide"
            >
              Subscribe
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground/60 mt-4">
            By subscribing, you confirm you are 18 years or older.
          </p>
        </div>
      </section>
      
      <SiteFooter />
    </div>
  );
}