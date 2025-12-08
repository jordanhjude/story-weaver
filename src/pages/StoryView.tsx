import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useStories } from "@/hooks/useStories";
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
        <div className="text-center animate-fade-in">
          <h1 className="font-serif text-3xl font-semibold">Story not found</h1>
          <p className="mt-2 text-muted-foreground">
            This story may have been deleted or never existed.
          </p>
          <Link to="/" className="mt-6 inline-block">
            <Button variant="outline">Return to stories</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    deleteStory(story.id);
    toast.success("Story deleted");
    navigate("/");
  };

  const paragraphs = story.content.split("\n").filter((p) => p.trim());

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All stories
          </Link>
          <div className="flex items-center gap-2">
            <Link to={`/edit/${story.id}`}>
              <Button variant="outline" size="sm" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this story?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Your story will be permanently deleted.
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

      <main className="container py-12">
        <article className="mx-auto max-w-2xl animate-fade-in">
          <header className="mb-12 text-center">
            <time className="text-sm font-medium text-muted-foreground">
              {format(story.createdAt, "MMMM d, yyyy")}
            </time>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
              {story.title}
            </h1>
            <div className="mx-auto mt-8 h-px w-16 bg-primary" />
          </header>

          <div className="story-content text-lg text-foreground/90">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <footer className="mt-16 border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Last updated {format(story.updatedAt, "MMMM d, yyyy 'at' h:mm a")}
            </p>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default StoryView;
