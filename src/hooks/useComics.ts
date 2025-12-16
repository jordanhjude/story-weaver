import { useState, useEffect } from "react";
import { Comic, SAMPLE_COMICS } from "@/types/comic";

const STORAGE_KEY = "jjtales_comics";

export function useComics() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);

      const hydrated: Comic[] = parsed.map((c: any) => {
        const fallback = SAMPLE_COMICS.find((s) => s.id === c.id);
        return {
          ...c,
          city: c.city ?? fallback?.city ?? "",
          createdAt: new Date(c.createdAt),
          updatedAt: new Date(c.updatedAt),
        } as Comic;
      });

      setComics(hydrated);

      // migrate older localStorage data (e.g. before `city` existed)
      const needsMigration = hydrated.some((c) => !c.city);
      if (needsMigration) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(hydrated));
      }
    } else {
      setComics(SAMPLE_COMICS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_COMICS));
    }
    setIsLoading(false);
  }, []);

  const saveComics = (newComics: Comic[]) => {
    setComics(newComics);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newComics));
  };

  const getComic = (id: string) => comics.find((c) => c.id === id);

  const getFeaturedComics = () => comics.filter((c) => c.isFeatured);

  const getRisingStars = () => 
    [...comics].sort((a, b) => b.views - a.views).slice(0, 6);

  const getFanFavorites = () => 
    [...comics].sort((a, b) => b.likes - a.likes).slice(0, 6);

  const getNewReleases = () => 
    [...comics].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 6);

  const searchComics = (query: string) => 
    comics.filter((c) => 
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
    );

  const filterByGenre = (genre: string) => 
    comics.filter((c) => c.genres.includes(genre as any));

  return {
    comics,
    isLoading,
    getComic,
    getFeaturedComics,
    getRisingStars,
    getFanFavorites,
    getNewReleases,
    searchComics,
    filterByGenre,
  };
}
