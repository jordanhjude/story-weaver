import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Eye, Share2, BookOpen } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useComic, useEpisodes } from "@/hooks/useComicsDB";
import { toast } from "sonner";

export default function ComicView() {
  const { id } = useParams();
  const { data: comic, isLoading: comicLoading } = useComic(id || "");
  const { data: episodes = [], isLoading: episodesLoading } = useEpisodes(id || "");

  if (comicLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!comic) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Tale not found</h1>
            <Link to="/" className="text-primary hover:underline">
              Back to home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleStartReading = () => {
    if (episodes.length > 0) {
      window.location.href = `/tale/${id}/episode/1`;
    } else {
      toast.info("No episodes available yet");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Banner */}
        <div className="relative h-[300px] md:h-[400px]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${comic.banner_image || comic.cover_image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
          
          <div className="absolute top-4 left-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="container -mt-32 relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Cover */}
            <div className="shrink-0">
              <img 
                src={comic.cover_image || "/placeholder.svg"}
                alt={comic.title}
                className="w-48 md:w-56 aspect-[2/3] object-cover rounded-lg shadow-2xl mx-auto md:mx-0"
              />
            </div>

            {/* Info */}
            <div className="flex-1 pt-4">
              <div className="flex gap-2 mb-3">
                {comic.genres?.map((genre) => (
                  <Badge key={genre} variant="secondary" className="capitalize">
                    {genre}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-black mb-4">
                {comic.title}
              </h1>

              <p className="text-muted-foreground mb-6 max-w-2xl">
                {comic.description}
              </p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  <span>{(comic.views / 1000).toFixed(0)}K views</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>{(comic.likes / 1000).toFixed(1)}K likes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" />
                  <span>{episodes.length} episodes</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  size="lg" 
                  className="gradient-primary text-primary-foreground font-semibold px-8"
                  onClick={handleStartReading}
                >
                  Start Reading
                </Button>
                <Button size="lg" variant="outline" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Episodes List */}
          <div className="mt-12 pb-12">
            <h2 className="text-xl font-bold mb-4">Episodes</h2>
            {episodesLoading ? (
              <div className="animate-pulse text-muted-foreground">Loading episodes...</div>
            ) : episodes.length === 0 ? (
              <p className="text-muted-foreground">No episodes available yet.</p>
            ) : (
              <div className="grid gap-2">
                {episodes.map((episode) => (
                  <Link 
                    key={episode.id}
                    to={`/tale/${id}/episode/${episode.episode_number}`}
                    className="flex items-center justify-between p-4 bg-card rounded-lg hover:bg-card/80 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground text-sm w-12">
                        Ep. {episode.episode_number}
                      </span>
                      <span className="font-medium">{episode.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(episode.created_at).toLocaleDateString()}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
