import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useStories } from "@/hooks/useStories";
import { toast } from "sonner";

const EditStory = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getStory, updateStory } = useStories();
  const story = getStory(id || "");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (story) {
      setTitle(story.title);
      setContent(story.content);
    }
  }, [story]);

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

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Please add a title to your story");
      return;
    }
    if (!content.trim()) {
      toast.error("Your story needs some content");
      return;
    }

    setIsSaving(true);
    updateStory(story.id, { title: title.trim(), content: content.trim() });
    toast.success("Story updated!");
    navigate(`/story/${story.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link
            to={`/story/${story.id}`}
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to story
          </Link>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </header>

      <main className="container py-12 animate-fade-in">
        <div className="mx-auto max-w-3xl">
          <Input
            placeholder="Give your story a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-0 bg-transparent font-serif text-3xl font-semibold placeholder:text-muted-foreground/50 focus-visible:ring-0 sm:text-4xl"
          />
          <div className="mt-1 h-px bg-gradient-to-r from-primary/50 via-border to-transparent" />
          <Textarea
            placeholder="Once upon a time..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-8 min-h-[60vh] resize-none border-0 bg-transparent font-serif text-lg leading-relaxed placeholder:text-muted-foreground/50 focus-visible:ring-0"
          />
        </div>
      </main>
    </div>
  );
};

export default EditStory;
