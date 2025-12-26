import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/30 mt-24">
      <div className="reading-container py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Brand */}
          <div>
            <Link 
              to="/" 
              className="font-serif text-lg text-foreground hover:text-gold transition-colors"
            >
              Where the Law Ends
            </Link>
            <p className="mt-2 font-sans text-xs text-muted-foreground tracking-wide">
              Dark psychology and moral collapse.
            </p>
          </div>

          {/* Links */}
          <nav className="flex gap-8">
            <Link 
              to="/stories" 
              className="font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Stories
            </Link>
            <Link 
              to="/about" 
              className="font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link 
              to="/privacy" 
              className="font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
          </nav>
        </div>

        {/* Copyright */}
        <div className="section-divider" />
        <p className="text-center font-sans text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Where the Law Ends. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
