import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Book, BookPlus, Trash2, Edit, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useComicsDB } from "@/hooks/useComicsDB";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Input validation schema
const ComicSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  description: z.string().max(5000, "Description must be less than 5000 characters").optional(),
  cover_image: z.string().url("Invalid URL").optional().or(z.literal("")),
  city: z.string().max(100, "City must be less than 100 characters").optional(),
  genres: z.string().max(500, "Genres must be less than 500 characters").optional(),
});

export default function Admin() {
  const navigate = useNavigate();
  const { comics, isLoading } = useComicsDB();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isCheckingRole, setIsCheckingRole] = useState(true);
  const [isAddingComic, setIsAddingComic] = useState(false);
  const [newComic, setNewComic] = useState({
    title: "",
    description: "",
    cover_image: "",
    city: "",
    genres: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        // Check admin role server-side
        const { data: roleData, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", currentUser.id)
          .eq("role", "admin")
          .maybeSingle();

        if (error) {
          console.error("Error checking role:", error.message);
          setIsAdmin(false);
        } else {
          setIsAdmin(!!roleData);
        }
      } else {
        setIsAdmin(false);
      }
      setIsCheckingRole(false);
    };

    checkAuth();
  }, []);

  const handleAddComic = async () => {
    // Validate input
    const result = ComicSchema.safeParse(newComic);
    if (!result.success) {
      const firstError = result.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    const validated = result.data;
    const genres = validated.genres
      ? validated.genres.split(",").map((g) => g.trim()).filter(Boolean).slice(0, 10)
      : [];

    const { error } = await supabase.from("comics").insert({
      title: validated.title.trim(),
      description: validated.description?.trim() || null,
      cover_image: validated.cover_image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
      city: validated.city?.trim() || null,
      genres: genres,
    });

    if (error) {
      console.error("Insert error:", error.message);
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
      console.error("Delete error:", error.message);
      toast.error("Failed to delete comic");
      return;
    }

    toast.success("Comic deleted");
    window.location.reload();
  };

  // Loading state while checking authentication
  if (isCheckingRole) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Verifying access...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Not authenticated
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

  // Not an admin - redirect to home
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-muted-foreground mb-4">You don't have permission to access this page</p>
            <Button onClick={() => navigate("/")}>Go Home</Button>
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
                  placeholder="Title (required)"
                  value={newComic.title}
                  onChange={(e) => setNewComic({ ...newComic, title: e.target.value })}
                  maxLength={200}
                />
                <Textarea
                  placeholder="Description"
                  value={newComic.description}
                  onChange={(e) => setNewComic({ ...newComic, description: e.target.value })}
                  maxLength={5000}
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
                  maxLength={100}
                />
                <Input
                  placeholder="Genres (comma-separated: action, drama)"
                  value={newComic.genres}
                  onChange={(e) => setNewComic({ ...newComic, genres: e.target.value })}
                  maxLength={500}
                />
                <Button onClick={handleAddComic} className="w-full">
                  Add Comic
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
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
