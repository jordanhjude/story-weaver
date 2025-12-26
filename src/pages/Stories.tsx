import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StoryCard } from "@/components/StoryCard";
import { useComicsDB } from "@/hooks/useComicsDB";
import { Skeleton } from "@/components/ui/skeleton";

export default function Stories() {
  const { isLoading, comics } = useComicsDB();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      
      <main className="flex-1 pt-24">
        <section className="reading-container py-16">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4 fade-in">
            Stories
          </h1>
          <p className="text-muted-foreground mb-12 fade-in" style={{ animationDelay: "0.1s" }}>
            Dark psychological fiction exploring justice, guilt, and moral collapse.
          </p>
          
          {isLoading ? (
            <div className="space-y-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border-b border-border/30 pb-8">
                  <Skeleton className="h-6 w-3/4 mb-3 bg-muted" />
                  <Skeleton className="h-4 w-full mb-2 bg-muted" />
                  <Skeleton className="h-4 w-1/4 bg-muted" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-0">
              {comics?.map((story, index) => (
                <StoryCard 
                  key={story.id} 
                  story={story}
                  style={{ animationDelay: `${index * 0.05}s` }}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
