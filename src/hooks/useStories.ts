import { useState, useEffect } from "react";
import { Story, StoryCategory, SAMPLE_COVERS } from "@/types/story";

const STORAGE_KEY = "beatales-stories";

const SAMPLE_STORIES: Story[] = [
  {
    id: "1",
    title: "The Last Sunset on Mars",
    content: "The crimson dust swirled around Maya's boots as she stepped onto the observation deck for the last time. After fifteen years of terraforming, humanity's first Martian colony was finally self-sustaining. But for Maya, it meant saying goodbye to the planet that had become her home.\n\nThe twin moons hung low on the horizon, casting their pale light across the rust-colored landscape. She remembered her first sunrise here—how the sky had turned from black to deep purple to a shade of orange she'd never seen on Earth.\n\n\"Ready to go?\" James's voice crackled through her earpiece.\n\n\"One more minute,\" she whispered, watching as the sun dipped below the distant mountains, painting the sky in shades of amber and gold.",
    excerpt: "The crimson dust swirled around Maya's boots as she stepped onto the observation deck for the last time...",
    coverImage: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=600&fit=crop",
    category: "sci-fi",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800", caption: "The Martian sunset" },
      { type: "video", url: "https://www.youtube.com/embed/gCBq0F1CL1M", caption: "Mars atmosphere simulation" },
    ],
    backgroundMusic: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Whispers in the Rain",
    content: "Every rainy day reminded Lily of him. The way droplets would catch in his dark hair, how he'd laugh and pull her under the nearest awning, the warmth of his hand in hers as they waited for the storm to pass.\n\nIt had been three years since he left for Paris. Three years of unanswered letters and fading photographs. She'd moved on—at least, that's what she told herself.\n\nBut when she saw him standing across the street, umbrella in hand, time seemed to stop. The rain fell harder now, blurring the world around them into watercolors of gray and blue.\n\n\"Lily?\" His voice carried across the traffic, the same way it had carried across crowded rooms and quiet mornings.\n\nShe didn't run. She didn't need to. He was already walking toward her.",
    excerpt: "Every rainy day reminded Lily of him. The way droplets would catch in his dark hair...",
    coverImage: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&h=600&fit=crop",
    category: "romance",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800", caption: "The rainy street" },
    ],
    backgroundMusic: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
  },
  {
    id: "3",
    title: "The Clockmaker's Secret",
    content: "Old Mr. Hendricks had lived in the village for as long as anyone could remember. His shop, nestled between the bakery and the bookstore, was filled with clocks of every size and era. But there was one clock he never sold—a tall grandfather clock that stood in the back corner, its hands frozen at 11:47.\n\n\"It's not for sale,\" he would say whenever anyone asked, his eyes growing distant. \"Some things are meant to stay exactly as they are.\"\n\nWhen young Sophie discovered the truth about the clock on the night of the winter solstice, she understood why. The clock wasn't broken. It was waiting.\n\nWaiting for a moment that had happened seventy years ago, and would happen again tonight.",
    excerpt: "Old Mr. Hendricks had lived in the village for as long as anyone could remember...",
    coverImage: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800&h=600&fit=crop",
    category: "mystery",
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800", caption: "The mysterious clock" },
    ],
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-03-05"),
  },
];

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
    } else {
      setStories(SAMPLE_STORIES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_STORIES));
    }
    setIsLoading(false);
  }, []);

  const saveStory = (
    story: Omit<Story, "id" | "createdAt" | "updatedAt" | "excerpt">
  ) => {
    const newStory: Story = {
      ...story,
      id: crypto.randomUUID(),
      excerpt: story.content.slice(0, 120) + (story.content.length > 120 ? "..." : ""),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updated = [newStory, ...stories];
    setStories(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newStory;
  };

  const updateStory = (
    id: string,
    updates: Partial<Omit<Story, "id" | "createdAt" | "updatedAt" | "excerpt">>
  ) => {
    const updated = stories.map((s) =>
      s.id === id
        ? {
            ...s,
            ...updates,
            excerpt: updates.content
              ? updates.content.slice(0, 120) + (updates.content.length > 120 ? "..." : "")
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

  const getStoriesByCategory = (category: StoryCategory | "all") =>
    category === "all" ? stories : stories.filter((s) => s.category === category);

  return {
    stories,
    isLoading,
    saveStory,
    updateStory,
    deleteStory,
    getStory,
    getStoriesByCategory,
  };
}
