import { useState } from "react";
import { Header } from "@/components/Header";
import { StoryCard } from "@/components/StoryCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { EmptyState } from "@/components/EmptyState";
import { useStories } from "@/hooks/useStories";
import { StoryCategory } from "@/types/story";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { stories, isLoading, getStoriesByCategory } = useStories();
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | "all">("all");
  
  const filteredStories = getStoriesByCategory(selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full gradient-primary opacity-10 blur-3xl" />
        
        <div className="container relative">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Your <span className="text-gradient">Stories</span>, Your Way
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Create immersive tales with photos, videos, and music
            </p>
          </div>
        </div>
      </section>

      <main className="container pb-20">
        {/* Category Filter */}
        <div className="mb-8 animate-fade-in">
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>

        {isLoading ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl bg-card border border-border/50 overflow-hidden">
                <Skeleton className="aspect-[16/10]" />
                <div className="p-5">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="mt-3 h-6 w-3/4" />
                  <Skeleton className="mt-3 h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredStories.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStories.map((story, index) => (
              <StoryCard key={story.id} story={story} index={index} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
