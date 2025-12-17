import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ComicCard } from "@/components/ComicCard";
import { useLibrary } from "@/hooks/useLibrary";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function Library() {
  const [userId, setUserId] = useState<string | undefined>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUserId(session?.user?.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { libraryItems, isLoading } = useLibrary(userId);

  if (!userId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <div className="flex items-center gap-3 mb-8">
            <Book className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-black">My Library</h1>
          </div>

          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
              <Book className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Sign in to see your library</h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Create an account to save your favorite tales
            </p>
            <Link to="/auth">
              <Button className="gradient-primary">Sign In</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="flex items-center gap-3 mb-8">
          <Book className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-black">My Library</h1>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="aspect-[2/3] rounded-lg" />
            ))}
          </div>
        ) : libraryItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
              <Book className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your library is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Start reading tales and add them to your library
            </p>
            <Link to="/tales">
              <Button className="gradient-primary">Browse Tales</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {libraryItems.map((item: any, index: number) => (
              <ComicCard key={item.id} comic={item.comics} index={index} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
