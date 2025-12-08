import { Header } from "@/components/Header";
import { StoryCard } from "@/components/StoryCard";
import { EmptyState } from "@/components/EmptyState";
import { useStories } from "@/hooks/useStories";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { stories, isLoading } = useStories();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center animate-fade-in">
            <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
              Your Stories
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              A collection of tales from your imagination
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg border border-border bg-card p-6">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-3 h-7 w-3/4" />
                  <Skeleton className="mt-4 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-5/6" />
                </div>
              ))}
            </div>
          ) : stories.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-6">
              {stories.map((story, index) => (
                <StoryCard key={story.id} story={story} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
