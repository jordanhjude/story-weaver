import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StoryCard } from "@/components/StoryCard";

const allStories = [
  {
    id: "rynel-nights",
    title: "Rynel Nights",
    excerpt: "The Sukiennice glowed, a medieval behemoth breathing golden light onto the Rynek. Amidst the swirling currents of laughter and music, her gaze snagged on a familiar silhouette—three years had passed, but some imprints never faded...",
    readingTime: "12 min",
    themes: ["Reunion", "Main Square"],
  },
  {
    id: "velvet-nights",
    title: "Velvet Nights",
    excerpt: "She never expected to find him waiting in the garden, beneath the same jasmine that witnessed their first meeting years ago...",
    readingTime: "12 min",
    themes: ["Romance", "Reunion"],
  },
  {
    id: "whispers-library",
    title: "Whispers in the Library",
    excerpt: "Their fingers brushed reaching for the same book. In that moment, surrounded by centuries of love stories, they began their own...",
    readingTime: "8 min",
    themes: ["Longing", "Connection"],
  },
  {
    id: "secret-letter",
    title: "The Secret Letter",
    excerpt: "Folded between the pages of her grandmother's journal, she found words that would change how she understood love forever...",
    readingTime: "15 min",
    themes: ["Mystery", "Passion"],
  },
  {
    id: "moonlight-rendezvous",
    title: "Moonlight Rendezvous",
    excerpt: "The terrace overlooked the sleeping city. He had come here every night for a month, hoping she would appear once more...",
    readingTime: "10 min",
    themes: ["Desire", "Hope"],
  },
  {
    id: "embers-heart",
    title: "Embers of a Heart",
    excerpt: "Years had passed, but the warmth she felt when he entered the room was as immediate as the day they first met...",
    readingTime: "14 min",
    themes: ["Rekindled Love", "Memory"],
  },
  {
    id: "unspoken-promise",
    title: "The Unspoken Promise",
    excerpt: "They never said the words, but in the silence between heartbeats, everything was understood...",
    readingTime: "9 min",
    themes: ["Tension", "Intimacy"],
  },
  {
    id: "letters-between-us",
    title: "Letters Between Us",
    excerpt: "Each envelope arrived without a return address. Each letter drew her deeper into a love she couldn't name...",
    readingTime: "11 min",
    themes: ["Mystery", "Longing"],
  },
  {
    id: "garden-midnight",
    title: "The Garden at Midnight",
    excerpt: "The roses held secrets, and so did he. She walked the stone path knowing tonight would change everything...",
    readingTime: "13 min",
    themes: ["Forbidden", "Romance"],
  },
];

export default function Stories() {
  return (
    <div className="min-h-screen bg-background velvet-texture">
      <SiteHeader />
      
      <main className="pt-32 pb-24">
        <div className="wide-container">
          {/* Header */}
          <div className="max-w-2xl mb-16 animate-fade-in-up">
            <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-4">
              All Stories
            </h1>
            <p className="text-muted-foreground font-body leading-relaxed">
              Explore our collection of romantic tales, each crafted to stir the heart 
              and awaken the imagination.
            </p>
          </div>
          
          {/* Stories Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {allStories.map((story, index) => (
              <StoryCard
                key={story.id}
                {...story}
                className="opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
}
