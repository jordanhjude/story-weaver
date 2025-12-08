import { useState, useEffect } from "react";
import { Story } from "@/types/story";

const STORAGE_KEY = "my-stories";

export function useStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setStories(
        parsed.map((s: Story) => ({
          ...s,
          createdAt: new Date(s.createdAt),
          updatedAt: new Date(s.updatedAt),
        }))
      );
    }
    setIsLoading(false);
  }, []);

  const saveStory = (story: Omit<Story, "id" | "createdAt" | "updatedAt" | "excerpt">) => {
    const newStory: Story = {
      ...story,
      id: crypto.randomUUID(),
      excerpt: story.content.slice(0, 150) + (story.content.length > 150 ? "..." : ""),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updated = [newStory, ...stories];
    setStories(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newStory;
  };

  const updateStory = (id: string, updates: Partial<Pick<Story, "title" | "content">>) => {
    const updated = stories.map((s) =>
      s.id === id
        ? {
            ...s,
            ...updates,
            excerpt: updates.content
              ? updates.content.slice(0, 150) + (updates.content.length > 150 ? "..." : "")
              : s.excerpt,
            updatedAt: new Date(),
          }
        : s
    );
    setStories(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const deleteStory = (id: string) => {
    const updated = stories.filter((s) => s.id !== id);
    setStories(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const getStory = (id: string) => stories.find((s) => s.id === id);

  return { stories, isLoading, saveStory, updateStory, deleteStory, getStory };
}
