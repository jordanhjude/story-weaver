import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StoryCard } from "@/components/StoryCard";
import { useComicsDB } from "@/hooks/useComicsDB";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { isLoading, comics } = useComicsDB();
  const featuredStories = comics?.slice(0, 6) || [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="reading-container py-24 md:py-32">
          <div className="max-w-xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight fade-in">
              Stories about justice, guilt, and what happens when the law stops working.
            </h1>
            
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed fade-in" style={{ animationDelay: "0.2s" }}>
              Dark psychological fiction for readers who prefer truth over comfort.
            </p>
            
            <Link
              to="/stories"
              className="inline-block mt-10 px-8 py-3 border border-foreground/30 text-foreground font-sans text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-all duration-300 fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              Read a story
            </Link>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider" />

        {/* Description */}
        <section className="reading-container py-16">
          <p className="text-center text-muted-foreground max-w-2xl mx-auto leading-relaxed font-body text-lg fade-in">
            These stories explore moral collapse, silent faith, violence without spectacle, 
            and decisions made when no one is watching.
          </p>
        </section>

        {/* Divider */}
        <div className="section-divider" />

        {/* Featured Stories */}
        <section className="reading-container py-16">
          <h2 className="font-serif text-2xl text-foreground mb-12 fade-in">
            Featured Stories
          </h2>
          
          {isLoading ? (
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border-b border-border/30 pb-8">
                  <Skeleton className="h-6 w-3/4 mb-3 bg-muted" />
                  <Skeleton className="h-4 w-full mb-2 bg-muted" />
                  <Skeleton className="h-4 w-1/4 bg-muted" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-0">
              {featuredStories.map((story, index) => (
                <StoryCard 
                  key={story.id} 
                  story={story} 
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center fade-in" style={{ animationDelay: "0.6s" }}>
            <Link
              to="/stories"
              className="font-sans text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              View all stories →
            </Link>
          </div>
        </section>

        {/* Email Subscription */}
        <section className="reading-container py-24">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-serif text-xl text-foreground mb-4 fade-in">
              New stories, delivered quietly.
            </h3>
            <p className="text-muted-foreground text-sm mb-8 fade-in" style={{ animationDelay: "0.1s" }}>
              No spam. No algorithms. Just stories that matter.
            </p>
            <Link
              to="/subscribe"
              className="inline-block px-6 py-2 border border-border text-muted-foreground font-sans text-sm tracking-widest uppercase hover:border-foreground hover:text-foreground transition-all duration-300 fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Subscribe
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
