import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      
      <main className="flex-1 pt-24">
        <section className="reading-container py-32 text-center">
          <h1 className="font-serif text-6xl text-foreground mb-6 fade-in">
            404
          </h1>
          <p className="text-muted-foreground mb-12 fade-in" style={{ animationDelay: "0.1s" }}>
            This page does not exist.
          </p>
          <Link 
            to="/" 
            className="inline-block px-8 py-3 border border-foreground/30 text-foreground font-sans text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-all duration-300 fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Return home
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default NotFound;