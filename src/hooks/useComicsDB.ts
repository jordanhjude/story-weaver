import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Comic {
  id: string;
  title: string;
  description: string | null;
  cover_image: string | null;
  banner_image: string | null;
  genres: string[];
  episode_count: number;
  views: number;
  likes: number;
  city: string | null;
  is_featured: boolean;
  is_new: boolean;
  created_at: string;
  updated_at: string;
}

export interface Episode {
  id: string;
  comic_id: string;
  episode_number: number;
  title: string;
  images: string[];
  created_at: string;
}

export function useComicsDB() {
  const { data: comics = [], isLoading } = useQuery({
    queryKey: ["comics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comics")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Comic[];
    },
  });

  const getComic = (id: string) => comics.find((c) => c.id === id);

  const getFeaturedComics = () => comics.filter((c) => c.is_featured);

  const getRisingStars = () =>
    [...comics].sort((a, b) => b.views - a.views).slice(0, 6);

  const getFanFavorites = () =>
    [...comics].sort((a, b) => b.likes - a.likes).slice(0, 6);

  const getNewReleases = () =>
    [...comics]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 6);

  const searchComics = (query: string) =>
    comics.filter(
      (c) =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.description?.toLowerCase().includes(query.toLowerCase())
    );

  const filterByGenre = (genre: string) =>
    comics.filter((c) => c.genres.includes(genre));

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

export function useComic(id: string) {
  return useQuery({
    queryKey: ["comic", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comics")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data as Comic | null;
    },
    enabled: !!id,
  });
}

export function useEpisodes(comicId: string) {
  return useQuery({
    queryKey: ["episodes", comicId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("episodes")
        .select("*")
        .eq("comic_id", comicId)
        .order("episode_number", { ascending: true });
      if (error) throw error;
      return data as Episode[];
    },
    enabled: !!comicId,
  });
}