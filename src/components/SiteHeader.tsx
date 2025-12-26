import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoImage from "@/assets/logo-city-whispers-v2.png";

const navItems = [
  { to: "/stories", label: "Stories" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/subscribe", label: "Subscribe" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/30">
      <nav className="reading-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300"
          >
            <img 
              src={logoImage} 
              alt="City of Whispers" 
              className="w-10 h-10 object-contain"
            />
            <span className="font-serif text-xl tracking-wide text-foreground">
              City of Whispers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`font-sans text-sm tracking-widest uppercase transition-colors duration-300 ${
                    location.pathname === item.to
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <ul className="md:hidden mt-6 pb-4 space-y-4 border-t border-border/50 pt-6">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={`block font-sans text-sm tracking-widest uppercase transition-colors duration-300 ${
                    location.pathname === item.to
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}