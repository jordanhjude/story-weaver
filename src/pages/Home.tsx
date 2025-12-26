import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StoryCard } from "@/components/StoryCard";
import { AuthorLocation } from "@/components/AuthorLocation";
import { SupportSection } from "@/components/SupportSection";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

// Import story images
import velvetNightsImg from "@/assets/stories/velvet-nights.jpg";
import whispersLibraryImg from "@/assets/stories/whispers-library.jpg";
import secretLetterImg from "@/assets/stories/secret-letter.jpg";
import moonlightRendezvousImg from "@/assets/stories/moonlight-rendezvous.jpg";

const featuredStories = [
  {
    id: "velvet-nights",
    title: "Velvet Nights",
    excerpt: "She never expected to find him waiting in the garden, beneath the same jasmine that witnessed their first meeting years ago...",
    readingTime: "12 min",
    themes: ["Romance", "Reunion"],
    image: velvetNightsImg,
  },
  {
    id: "whispers-library",
    title: "Whispers in the Library",
    excerpt: "Their fingers brushed reaching for the same book. In that moment, surrounded by centuries of love stories, they began their own...",
    readingTime: "8 min",
    themes: ["Longing", "Connection"],
    image: whispersLibraryImg,
  },
  {
    id: "secret-letter",
    title: "The Secret Letter",
    excerpt: "Folded between the pages of her grandmother's journal, she found words that would change how she understood love forever...",
    readingTime: "15 min",
    themes: ["Mystery", "Passion"],
    image: secretLetterImg,
  },
  {
    id: "moonlight-rendezvous",
    title: "Moonlight Rendezvous",
    excerpt: "The terrace overlooked the sleeping city. He had come here every night for a month, hoping she would appear once more...",
    readingTime: "10 min",
    themes: ["Desire", "Hope"],
    image: moonlightRendezvousImg,
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
              Written anonymously from cities around the world
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight tracking-wide">
              Where romance lives in the streets.
            </h1>
            
            <p className="mt-8 text-lg text-muted-foreground font-body leading-relaxed opacity-0 animate-fade-in-up delay-200">
              Intimate stories of connection, desire, and the quiet moments 
              that unfold when strangers become something more.
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
            I write from cafés, hotel rooms, and park benches. The cities change, 
            but the stories remain—whispered confessions of attraction, forbidden 
            glances across crowded rooms, and the electric tension of almost.
          </p>
          <p className="mt-6 text-muted-foreground/70 font-body italic">
            You won't know my name. But you'll recognize the feelings.
          </p>
        </div>
      </section>
      
      {/* Featured Stories */}
      <section className="py-24">
        <div className="wide-container">
          <h2 className="font-serif text-2xl text-foreground mb-12 tracking-wide">
            Featured Stories
          </h2>
          
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
            Join the Inner Circle
          </h2>
          <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
            Receive new stories and exclusive content. No spam, just whispers.
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