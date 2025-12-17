import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ComicSection } from "@/components/ComicSection";
import { AuthorLocation } from "@/components/AuthorLocation";
import { SupportSection } from "@/components/SupportSection";
import { useComicsDB } from "@/hooks/useComicsDB";
import { Skeleton } from "@/components/ui/skeleton";

export default function Index() {
  const { 
    isLoading, 
    getFeaturedComics, 
    getRisingStars, 
    getFanFavorites,
    getNewReleases 
  } = useComicsDB();

  const featured = getFeaturedComics();
  const risingStars = getRisingStars();
  const fanFavorites = getFanFavorites();
  const newReleases = getNewReleases();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {isLoading ? (
          <div className="h-[500px] bg-card animate-pulse" />
        ) : (
          <HeroCarousel comics={featured} />
        )}

        <AuthorLocation 
          city="Paris" 
          country="France" 
          nextDestination="Tokyo, Japan"
        />

        {isLoading ? (
          <div className="container py-8">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="aspect-[2/3] rounded-lg" />
              ))}
            </div>
          </div>
        ) : (
          <>
            <ComicSection 
              title="Rising Stars" 
              comics={risingStars} 
              seeAllLink="/tales?sort=views"
            />
            
            <ComicSection 
              title="Fan Favorites" 
              comics={fanFavorites} 
              seeAllLink="/tales?sort=likes"
              variant="highlight"
            />

            <ComicSection 
              title="New Releases" 
              comics={newReleases} 
              seeAllLink="/tales?sort=new"
            />
          </>
        )}

        <SupportSection />
      </main>

      <Footer />
    </div>
  );
}
