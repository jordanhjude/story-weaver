import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Library() {
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
          <h2 className="text-xl font-semibold mb-2">Your library is empty</h2>
          <p className="text-muted-foreground mb-6 max-w-sm">
            Start reading comics and they'll appear here for easy access
          </p>
          <Link to="/comics">
            <Button className="gradient-primary">
              Browse Comics
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
