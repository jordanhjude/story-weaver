import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useComics } from "@/hooks/useComics";
import { Link } from "react-router-dom";
import { Trophy, Eye, Heart, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Ranking() {
  const { comics } = useComics();

  const byViews = [...comics].sort((a, b) => b.views - a.views);
  const byLikes = [...comics].sort((a, b) => b.likes - a.likes);
  const byNew = [...comics].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

  const RankingList = ({ items, metric }: { items: typeof comics; metric: "views" | "likes" | "new" }) => (
    <div className="space-y-3">
      {items.map((comic, index) => (
        <Link
          key={comic.id}
          to={`/comic/${comic.id}`}
          className="flex items-center gap-4 p-4 bg-card rounded-lg hover:bg-card/80 transition-colors"
        >
          <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${
            index === 0 ? "bg-yellow-500 text-black" :
            index === 1 ? "bg-gray-400 text-black" :
            index === 2 ? "bg-amber-700 text-white" :
            "bg-secondary text-muted-foreground"
          }`}>
            {index + 1}
          </div>
          
          <img 
            src={comic.coverImage}
            alt={comic.title}
            className="w-12 h-16 object-cover rounded"
          />
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{comic.title}</h3>
            <div className="flex gap-2 mt-1">
              {comic.genres.slice(0, 2).map((genre) => (
                <span key={genre} className="text-xs text-primary capitalize">{genre}</span>
              ))}
            </div>
          </div>
          
          <div className="text-right text-sm text-muted-foreground">
            {metric === "views" && (
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {(comic.views / 1000).toFixed(0)}K
              </div>
            )}
            {metric === "likes" && (
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4 text-red-500" />
                {(comic.likes / 1000).toFixed(1)}K
              </div>
            )}
            {metric === "new" && (
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                {comic.updatedAt.toLocaleDateString()}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-black">Ranking</h1>
        </div>

        <Tabs defaultValue="views" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="views" className="gap-2">
              <Eye className="h-4 w-4" />
              Most Viewed
            </TabsTrigger>
            <TabsTrigger value="likes" className="gap-2">
              <Heart className="h-4 w-4" />
              Most Liked
            </TabsTrigger>
            <TabsTrigger value="new" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Recently Updated
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="views">
            <RankingList items={byViews} metric="views" />
          </TabsContent>
          
          <TabsContent value="likes">
            <RankingList items={byLikes} metric="likes" />
          </TabsContent>
          
          <TabsContent value="new">
            <RankingList items={byNew} metric="new" />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
