import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useLibrary(userId: string | undefined) {
  const queryClient = useQueryClient();

  const { data: libraryItems = [], isLoading } = useQuery({
    queryKey: ["library", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("user_library")
        .select("*, comics(*)")
        .eq("user_id", userId);
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const addToLibrary = useMutation({
    mutationFn: async (comicId: string) => {
      if (!userId) throw new Error("Not logged in");
      const { error } = await supabase
        .from("user_library")
        .insert({ user_id: userId, comic_id: comicId });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library", userId] });
      toast.success("Added to library!");
    },
    onError: (error: any) => {
      if (error.message?.includes("duplicate")) {
        toast.info("Already in your library");
      } else {
        toast.error("Failed to add to library");
      }
    },
  });

  const removeFromLibrary = useMutation({
    mutationFn: async (comicId: string) => {
      if (!userId) throw new Error("Not logged in");
      const { error } = await supabase
        .from("user_library")
        .delete()
        .eq("user_id", userId)
        .eq("comic_id", comicId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library", userId] });
      toast.success("Removed from library");
    },
    onError: () => {
      toast.error("Failed to remove from library");
    },
  });

  const isInLibrary = (comicId: string) => {
    return libraryItems.some((item: any) => item.comic_id === comicId);
  };

  return {
    libraryItems,
    isLoading,
    addToLibrary: addToLibrary.mutate,
    removeFromLibrary: removeFromLibrary.mutate,
    isInLibrary,
  };
}