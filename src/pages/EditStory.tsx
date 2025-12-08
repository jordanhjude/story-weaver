import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Image, Video, Music, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStories } from "@/hooks/useStories";
import { CATEGORIES, StoryCategory, StoryMedia, SAMPLE_COVERS } from "@/types/story";
import { toast } from "sonner";

const EditStory = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getStory, updateStory } = useStories();
  const story = getStory(id || "");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<StoryCategory>("adventure");
  const [coverImage, setCoverImage] = useState(SAMPLE_COVERS[0]);
  const [media, setMedia] = useState<StoryMedia[]>([]);
  const [backgroundMusic, setBackgroundMusic] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (story) {
      setTitle(story.title);
      setContent(story.content);
      setCategory(story.category);
      setCoverImage(story.coverImage);
      setMedia(story.media);
      setBackgroundMusic(story.backgroundMusic || "");
    }
  }, [story]);

  if (!story) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center animate-fade-in px-4">
          <h1 className="font-serif text-3xl font-semibold">Story not found</h1>
          <Link to="/" className="mt-6 inline-block">
            <Button variant="outline">Return to stories</Button>
          </Link>
        </div>
      </div>
    );
  }

  const addMedia = (type: "image" | "video") => {
    const url = prompt(`Enter ${type} URL:`);
    if (url) {
      const caption = prompt("Add a caption (optional):") || undefined;
      setMedia([...media, { type, url, caption }]);
    }
  };

  const removeMedia = (index: number) => {
    setMedia(media.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Please add a title");
      return;
    }
    if (!content.trim()) {
      toast.error("Story needs content");
      return;
    }

    setIsSaving(true);
    updateStory(story.id, {
      title: title.trim(),
      content: content.trim(),
      category,
      coverImage,
      media,
      backgroundMusic: backgroundMusic || undefined,
    });
    toast.success("Story updated!");
    navigate(`/story/${story.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/50 glass">
        <div className="container flex h-16 items-center justify-between">
          <Link
            to={`/story/${story.id}`}
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2 gradient-primary border-0">
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </header>

      <main className="container py-8 animate-fade-in">
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Cover Image */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">Cover Image</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {SAMPLE_COVERS.map((cover, i) => (
                <button
                  key={i}
                  onClick={() => setCoverImage(cover)}
                  className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    coverImage === cover ? "border-primary ring-2 ring-primary/30" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={cover} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <Input
              placeholder="Or paste custom image URL..."
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="bg-secondary/50 border-border/50"
            />
          </div>

          {/* Category */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground">Category</label>
            <Select value={category} onValueChange={(v) => setCategory(v as StoryCategory)}>
              <SelectTrigger className="bg-secondary/50 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass border-border/50">
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.emoji} {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div>
            <Input
              placeholder="Your story title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-0 bg-transparent font-serif text-3xl sm:text-4xl font-semibold placeholder:text-muted-foreground/40 focus-visible:ring-0 p-0"
            />
            <div className="mt-2 h-px bg-gradient-to-r from-primary/50 via-accent/30 to-transparent" />
          </div>

          {/* Content */}
          <Textarea
            placeholder="Begin your tale..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[40vh] resize-none border-0 bg-transparent font-serif text-lg leading-relaxed placeholder:text-muted-foreground/40 focus-visible:ring-0 p-0"
          />

          {/* Media */}
          <div className="space-y-4 pt-8 border-t border-border/50">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-semibold">Story Media</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => addMedia("image")} className="gap-2">
                  <Image className="h-4 w-4" />
                  Image
                </Button>
                <Button variant="outline" size="sm" onClick={() => addMedia("video")} className="gap-2">
                  <Video className="h-4 w-4" />
                  Video
                </Button>
              </div>
            </div>

            {media.length > 0 && (
              <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
                {media.map((m, i) => (
                  <div key={i} className="relative group rounded-lg overflow-hidden bg-secondary/50 aspect-video">
                    {m.type === "image" ? (
                      <img src={m.url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Video className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <button
                      onClick={() => removeMedia(i)}
                      className="absolute top-2 right-2 h-6 w-6 rounded-full bg-destructive flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4 text-destructive-foreground" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Music className="h-4 w-4 text-primary" />
                Background Music URL
              </label>
              <Input
                placeholder="https://example.com/music.mp3"
                value={backgroundMusic}
                onChange={(e) => setBackgroundMusic(e.target.value)}
                className="bg-secondary/50 border-border/50"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditStory;
