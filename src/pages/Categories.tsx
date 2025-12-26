import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Heart, Moon, Flame, BookOpen, Lock, Sparkles } from "lucide-react";

const categories = [
  {
    id: "romance",
    name: "Romance",
    description: "Classic love stories of connection, devotion, and tender moments.",
    icon: Heart,
    count: 12,
  },
  {
    id: "longing",
    name: "Longing",
    description: "Tales of desire unfulfilled, waiting, and the ache of distance.",
    icon: Moon,
    count: 8,
  },
  {
    id: "passion",
    name: "Passion",
    description: "Intense emotional journeys and the fire of deep attraction.",
    icon: Flame,
    count: 10,
  },
  {
    id: "forbidden",
    name: "Forbidden",
    description: "Love that defies expectation, convention, or circumstance.",
    icon: Lock,
    count: 6,
  },
  {
    id: "reunion",
    name: "Reunion",
    description: "Second chances, rekindled flames, and paths that cross again.",
    icon: Sparkles,
    count: 7,
  },
  {
    id: "mystery",
    name: "Mystery",
    description: "Romance wrapped in secrets, intrigue, and revelation.",
    icon: BookOpen,
    count: 5,
  },
];

export default function Categories() {
  return (
    <div className="min-h-screen bg-background velvet-texture">
      <SiteHeader />
      
      <main className="pt-32 pb-24">
        <div className="wide-container">
          {/* Header */}
          <div className="max-w-2xl mb-16 animate-fade-in-up">
            <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-4">
              Categories
            </h1>
            <p className="text-muted-foreground font-body leading-relaxed">
              Find stories that match your mood. Each category offers a different 
              shade of romance and emotional depth.
            </p>
          </div>
          
          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  to={`/stories?category=${category.id}`}
                  className={`group p-8 bg-card/50 border border-border/30 hover:border-rose/30 transition-all duration-500 hover:romantic-glow opacity-0 animate-fade-in-up`}
                  style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
                >
                  <Icon className="w-6 h-6 text-rose mb-4 group-hover:scale-110 transition-transform" />
                  
                  <h2 className="font-serif text-xl text-foreground mb-2 tracking-wide group-hover:text-rose transition-colors">
                    {category.name}
                  </h2>
                  
                  <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
                    {category.description}
                  </p>
                  
                  <span className="text-xs text-muted-foreground/60 font-body tracking-wide">
                    {category.count} stories
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
}
