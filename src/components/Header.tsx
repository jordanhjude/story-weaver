import { Link, useNavigate } from "react-router-dom";
import { Search, Book, Trophy, User, LogOut, ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navItems = [
  { to: "/library", icon: Book, label: "My Library" },
  { to: "/tales", icon: () => <span className="text-lg">📚</span>, label: "Tales" },
  { to: "/ranking", icon: Trophy, label: "Ranking", iconClass: "text-primary" },
  { to: "/books", icon: ShoppingBag, label: "Books", iconClass: "text-primary" },
];

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tales?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 glass">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="font-black text-2xl tracking-tight">
            <span className="text-primary">JJ</span>
            <span className="text-foreground">tales</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link 
              key={item.to}
              to={item.to} 
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <item.icon className={`h-4 w-4 ${item.iconClass || ""}`} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 flex-1 justify-end">
          {/* Search - hidden on mobile */}
          <form onSubmit={handleSearch} className="relative hidden sm:block max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tales..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-secondary/50 border-border/50 focus:border-primary"
            />
          </form>
          
          {/* Auth button - desktop */}
          <div className="hidden sm:block">
            {user ? (
              <Button variant="outline" size="sm" className="shrink-0" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <Button variant="outline" size="sm" className="shrink-0" onClick={() => navigate("/auth")}>
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background border-border">
              <div className="flex flex-col h-full pt-8">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search tales..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-secondary/50 border-border/50"
                  />
                </form>

                {/* Mobile Navigation Links */}
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.to}>
                      <Link 
                        to={item.to} 
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors"
                      >
                        <item.icon className={`h-5 w-5 ${item.iconClass || ""}`} />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                {/* Mobile Auth */}
                <div className="mt-auto pb-6">
                  {user ? (
                    <SheetClose asChild>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </SheetClose>
                  ) : (
                    <SheetClose asChild>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => navigate("/auth")}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    </SheetClose>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
