import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ComicCard } from "@/components/ComicCard";
import { Button } from "@/components/ui/button";
import { useComicsDB } from "@/hooks/useComicsDB";
import { GENRES } from "@/types/comic";
import { Skeleton } from "@/components/ui/skeleton";

export default function Comics() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const sortBy = searchParams.get("sort") || "";
  
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const { comics, isLoading, searchComics, filterByGenre } = useComicsDB();

  const filteredComics = useMemo(() => {
    let result = comics;
    
    if (searchQuery) {
      result = searchComics(searchQuery);
    }
    
    if (selectedGenre) {
      result = filterByGenre(selectedGenre);
    }

    if (sortBy === "views") {
      result = [...result].sort((a, b) => b.views - a.views);
    } else if (sortBy === "likes") {
      result = [...result].sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "new") {
      result = [...result].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return result;
  }, [comics, searchQuery, selectedGenre, sortBy, searchComics, filterByGenre]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-black mb-6">
          {searchQuery ? `Search: "${searchQuery}"` : "All Comics"}
        </h1>

        {/* Genre Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={selectedGenre === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedGenre(null)}
            className={selectedGenre === null ? "gradient-primary" : ""}
          >
            All
          </Button>
          {GENRES.map((genre) => (
            <Button
              key={genre.value}
              variant={selectedGenre === genre.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedGenre(genre.value)}
              className={selectedGenre === genre.value ? "gradient-primary" : ""}
            >
              {genre.label}
            </Button>
          ))}
        </div>

        {/* Comics Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <Skeleton key={i} className="aspect-[2/3] rounded-lg" />
            ))}
          </div>
        ) : filteredComics.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No comics found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredComics.map((comic, index) => (
              <ComicCard key={comic.id} comic={comic} index={index} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
