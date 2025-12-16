export type ComicGenre = 
  | "action" 
  | "romance" 
  | "drama" 
  | "thriller" 
  | "fantasy" 
  | "comedy" 
  | "horror"
  | "mommy";

export interface Comic {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  bannerImage?: string;
  genres: ComicGenre[];
  episodeCount: number;
  views: number;
  likes: number;
  city: string;
  isFeatured?: boolean;
  isNew?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Episode {
  id: string;
  comicId: string;
  number: number;
  title: string;
  images: string[];
  createdAt: Date;
}

export const GENRES: { value: ComicGenre; label: string }[] = [
  { value: "action", label: "Action" },
  { value: "romance", label: "Romance" },
  { value: "drama", label: "Drama" },
  { value: "thriller", label: "Thriller" },
  { value: "fantasy", label: "Fantasy" },
  { value: "comedy", label: "Comedy" },
  { value: "horror", label: "Horror" },
  { value: "mommy", label: "Mommy" },
];

export const SAMPLE_COMICS: Comic[] = [
  {
    id: "1",
    title: "Divine Blade: Celestial Child",
    description: "The era of open warfare between humans and fiends has begun. Only humans with special techniques to draw blades from their bodies can stop them.",
    coverImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&h=800&fit=crop",
    genres: ["action", "drama"],
    episodeCount: 24,
    views: 125000,
    likes: 8500,
    city: "Tokyo",
    isFeatured: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-12-10"),
  },
  {
    id: "2",
    title: "Real Love",
    description: "A heartwarming story about finding true love in unexpected places. Two souls destined to meet.",
    coverImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=600&fit=crop",
    genres: ["romance"],
    episodeCount: 7,
    views: 89000,
    likes: 12000,
    city: "Paris",
    isNew: true,
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2024-12-08"),
  },
  {
    id: "3",
    title: "I've Been Reincarnated",
    description: "After dying in a tragic accident, our hero wakes up in a fantasy world with all their memories intact.",
    coverImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop",
    genres: ["thriller", "drama"],
    episodeCount: 7,
    views: 156000,
    likes: 9800,
    city: "Mumbai",
    isFeatured: true,
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2024-12-09"),
  },
  {
    id: "4",
    title: "Gold Boy",
    description: "A young man discovers he has the power to turn anything he touches into gold. But at what cost?",
    coverImage: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=600&fit=crop",
    genres: ["drama"],
    episodeCount: 28,
    views: 234000,
    likes: 15000,
    city: "Dubai",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-12-11"),
  },
  {
    id: "5",
    title: "What is the Outcome for the Villain?",
    description: "I was reborn as the villain in my favorite novel. Now I must change my fate before the hero kills me!",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    genres: ["thriller", "drama"],
    episodeCount: 10,
    views: 98000,
    likes: 7200,
    city: "London",
    createdAt: new Date("2024-04-05"),
    updatedAt: new Date("2024-12-07"),
  },
  {
    id: "6",
    title: "Royal Antique Dealer's Case Files",
    description: "An antique dealer with a mysterious past solves crimes using his knowledge of rare artifacts.",
    coverImage: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&h=600&fit=crop",
    genres: ["action"],
    episodeCount: 10,
    views: 67000,
    likes: 4500,
    city: "Rome",
    createdAt: new Date("2024-05-12"),
    updatedAt: new Date("2024-12-06"),
  },
  {
    id: "7",
    title: "Midnight Serenade",
    description: "A vampire prince falls for a human musician. Their love defies the laws of both worlds.",
    coverImage: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop",
    genres: ["romance", "fantasy"],
    episodeCount: 15,
    views: 178000,
    likes: 21000,
    city: "Barcelona",
    isFeatured: true,
    createdAt: new Date("2024-01-28"),
    updatedAt: new Date("2024-12-10"),
  },
  {
    id: "8",
    title: "The Last Summoner",
    description: "In a world where magic is dying, one summoner holds the key to saving everything.",
    coverImage: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop",
    genres: ["fantasy", "action"],
    episodeCount: 32,
    views: 312000,
    likes: 28000,
    city: "New York",
    createdAt: new Date("2023-11-15"),
    updatedAt: new Date("2024-12-11"),
  },
];
