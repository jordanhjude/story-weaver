import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Book, Clock, ShoppingBag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function BookStore() {
  const { data: comics, isLoading } = useQuery({
    queryKey: ["comics-for-books"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comics")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handlePreOrder = (title: string) => {
    toast.info(`Pre-orders for "${title}" coming soon!`, {
      description: "Join our newsletter to be notified when available.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Book className="h-4 w-4" />
            <span>Coming Soon</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Stories as <span className="text-primary">Books</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Own the complete tales in beautifully crafted paperback and hardcover editions. 
            Each book features exclusive artwork and behind-the-scenes content.
          </p>
        </section>

        {/* Books Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
            <span className="h-px flex-1 bg-border"></span>
            <span>Upcoming Releases</span>
            <span className="h-px flex-1 bg-border"></span>
          </h2>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-muted rounded-xl mb-4" />
                  <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {comics?.map((comic, index) => (
                <article 
                  key={comic.id} 
                  className="group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Book Cover */}
                  <div className="relative mb-6">
                    <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl shadow-black/30 border border-border/50 transform group-hover:scale-[1.02] transition-transform duration-500">
                      {/* Book spine effect */}
                      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/30 to-transparent z-10" />
                      
                      {comic.cover_image ? (
                        <img 
                          src={comic.cover_image} 
                          alt={comic.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <Book className="h-16 w-16 text-primary/50" />
                        </div>
                      )}
                      
                      {/* Coming Soon Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm border border-border text-xs font-medium text-foreground flex items-center gap-1.5">
                        <Clock className="h-3 w-3 text-primary" />
                        Coming Soon
                      </div>
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {comic.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {comic.description || "A captivating tale waiting to be told..."}
                    </p>
                    
                    {/* Genre Tags */}
                    {comic.genres && comic.genres.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {comic.genres.slice(0, 3).map((genre) => (
                          <span 
                            key={genre} 
                            className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Pre-order Button */}
                    <Button 
                      onClick={() => handlePreOrder(comic.title)}
                      className="w-full mt-4 gap-2"
                      variant="outline"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Notify Me
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Info Section */}
        <section className="max-w-2xl mx-auto text-center py-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="p-8 rounded-2xl bg-card border border-border">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Why Physical Books?
            </h3>
            <p className="text-muted-foreground mb-6">
              While all stories are free to read online, owning a physical copy means supporting 
              the journey and holding a piece of the adventure in your hands. Each book is a 
              collector's edition with exclusive content you won't find anywhere else.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">100%</p>
                <p className="text-xs text-muted-foreground">Original Artwork</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">Bonus</p>
                <p className="text-xs text-muted-foreground">Behind the Scenes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">Limited</p>
                <p className="text-xs text-muted-foreground">First Editions</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
