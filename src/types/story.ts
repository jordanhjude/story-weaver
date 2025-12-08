export type StoryCategory = 
  | "adventure" 
  | "romance" 
  | "mystery" 
  | "fantasy" 
  | "drama" 
  | "horror" 
  | "comedy" 
  | "sci-fi";

export interface StoryMedia {
  type: "image" | "video" | "music";
  url: string;
  caption?: string;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: StoryCategory;
  media: StoryMedia[];
  backgroundMusic?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const CATEGORIES: { value: StoryCategory; label: string; emoji: string }[] = [
  { value: "adventure", label: "Adventure", emoji: "🗺️" },
  { value: "romance", label: "Romance", emoji: "💕" },
  { value: "mystery", label: "Mystery", emoji: "🔍" },
  { value: "fantasy", label: "Fantasy", emoji: "✨" },
  { value: "drama", label: "Drama", emoji: "🎭" },
  { value: "horror", label: "Horror", emoji: "👻" },
  { value: "comedy", label: "Comedy", emoji: "😂" },
  { value: "sci-fi", label: "Sci-Fi", emoji: "🚀" },
];

export const SAMPLE_COVERS = [
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop",
];
