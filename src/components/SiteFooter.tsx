import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/30 mt-32">
      <div className="reading-container py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link to="/" className="font-serif text-lg tracking-wide text-foreground hover:text-rose transition-colors">
              Moonlit Letters
            </Link>
            <p className="text-sm text-muted-foreground italic font-body">
              Stories that stir the heart and imagination.
            </p>
          </div>
          
          {/* Navigation */}
          <nav className="flex flex-wrap gap-8">
            <Link 
              to="/stories" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              Stories
            </Link>
            <Link 
              to="/categories" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              About
            </Link>
            <Link 
              to="/privacy" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              Privacy
            </Link>
            <Link 
              to="/terms" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              Terms
            </Link>
          </nav>
        </div>
        
        {/* Age Notice */}
        <div className="mt-12 pt-8 border-t border-border/20">
          <p className="text-xs text-muted-foreground text-center">
            This website contains mature content intended for adults 18 years of age and older.
          </p>
          <p className="text-xs text-muted-foreground/60 text-center mt-2">
            © {new Date().getFullYear()} Moonlit Letters. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
