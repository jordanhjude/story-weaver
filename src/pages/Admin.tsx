import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Book, BookPlus, Trash2, Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useComicsDB } from "@/hooks/useComicsDB";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Admin() {
  const navigate = useNavigate();
  const { comics, isLoading } = useComicsDB();
  const [user, setUser] = useState<any>(null);
  const [isAddingComic, setIsAddingComic] = useState(false);
  const [newComic, setNewComic] = useState({
    title: "",
    description: "",
    cover_image: "",
    city: "",
    genres: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const handleAddComic = async () => {
    if (!newComic.title) {
      toast.error("Title is required");
      return;
    }

    const { error } = await supabase.from("comics").insert({
      title: newComic.title,
      description: newComic.description,
      cover_image: newComic.cover_image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
      city: newComic.city,
      genres: newComic.genres.split(",").map((g) => g.trim()).filter(Boolean),
    });

    if (error) {
      toast.error("Failed to add comic");
      return;
    }

    toast.success("Comic added!");
    setIsAddingComic(false);
    setNewComic({ title: "", description: "", cover_image: "", city: "", genres: "" });
    window.location.reload();
  };

  const handleDeleteComic = async (id: string) => {
    if (!confirm("Are you sure you want to delete this comic?")) return;

    const { error } = await supabase.from("comics").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete comic");
      return;
    }

    toast.success("Comic deleted");
    window.location.reload();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
            <p className="text-muted-foreground mb-4">Please sign in to access the admin panel</p>
            <Button onClick={() => navigate("/auth")}>Sign In</Button>
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BookPlus className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-black">Admin Panel</h1>
          </div>

          <Dialog open={isAddingComic} onOpenChange={setIsAddingComic}>
            <DialogTrigger asChild>
              <Button className="gradient-primary gap-2">
                <Plus className="h-4 w-4" />
                Add Comic
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Comic</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Input
                  placeholder="Title"
                  value={newComic.title}
                  onChange={(e) => setNewComic({ ...newComic, title: e.target.value })}
                />
                <Textarea
                  placeholder="Description"
                  value={newComic.description}
                  onChange={(e) => setNewComic({ ...newComic, description: e.target.value })}
                />
                <Input
                  placeholder="Cover Image URL"
                  value={newComic.cover_image}
                  onChange={(e) => setNewComic({ ...newComic, cover_image: e.target.value })}
                />
                <Input
                  placeholder="City (e.g., Tokyo)"
                  value={newComic.city}
                  onChange={(e) => setNewComic({ ...newComic, city: e.target.value })}
                />
                <Input
                  placeholder="Genres (comma-separated: action, drama)"
                  value={newComic.genres}
                  onChange={(e) => setNewComic({ ...newComic, genres: e.target.value })}
                />
                <Button onClick={handleAddComic} className="w-full">
                  Add Comic
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {comics.map((comic) => (
              <div
                key={comic.id}
                className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border"
              >
                <img
                  src={comic.cover_image || "/placeholder.svg"}
                  alt={comic.title}
                  className="w-16 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-bold">{comic.title}</h3>
                  <p className="text-sm text-muted-foreground">{comic.city}</p>
                  <p className="text-xs text-muted-foreground">
                    {comic.genres?.join(", ")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigate(`/comic/${comic.id}`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteComic(comic.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}