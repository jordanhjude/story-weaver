import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Edit, Trash2, Share2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useStories } from "@/hooks/useStories";
import { CATEGORIES } from "@/types/story";
import { MusicPlayer } from "@/components/MusicPlayer";
import { MediaGallery } from "@/components/MediaGallery";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const StoryView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getStory, deleteStory } = useStories();
  const story = getStory(id || "");

  if (!story) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center animate-fade-in px-4">
          <h1 className="font-serif text-3xl font-semibold">Story not found</h1>
          <p className="mt-2 text-muted-foreground">
            This tale may have been lost to time.
          </p>
          <Link to="/" className="mt-6 inline-block">
            <Button variant="outline">Return to stories</Button>
          </Link>
        </div>
      </div>
    );
  }

  const category = CATEGORIES.find((c) => c.value === story.category);
  const paragraphs = story.content.split("\n").filter((p) => p.trim());

  const handleDelete = () => {
    deleteStory(story.id);
    toast.success("Story deleted");
    navigate("/");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Cover */}
      <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <img
          src={story.coverImage}
          alt={story.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        {/* Navigation */}
        <header className="absolute top-0 inset-x-0 z-10">
          <div className="container flex h-16 items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 rounded-full glass text-foreground/90 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full glass hover:bg-secondary/80"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Link to={`/edit/${story.id}`}>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full glass hover:bg-secondary/80">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full glass hover:bg-destructive/20 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="glass border-border/50">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this story?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. Your story and all its media will be permanently deleted.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </header>

        {/* Title overlay */}
        <div className="absolute bottom-0 inset-x-0 container pb-8 animate-slide-up">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium glass mb-4">
            {category?.emoji} {category?.label}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">
            {story.title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {format(story.createdAt, "MMMM d, yyyy")}
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="container py-12">
        <article className="mx-auto max-w-2xl">
          <div className="story-content text-lg text-foreground/90 animate-fade-in">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Media Gallery */}
          {story.media.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border/50">
              <MediaGallery media={story.media} />
            </div>
          )}

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border/50 text-center">
            <p className="text-sm text-muted-foreground">
              Last updated {format(story.updatedAt, "MMMM d, yyyy")}
            </p>
          </footer>
        </article>
      </main>

      {/* Music Player */}
      {story.backgroundMusic && <MusicPlayer src={story.backgroundMusic} />}
    </div>
  );
};

export default StoryView;
