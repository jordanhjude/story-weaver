import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SplashIntroProps {
  onEnter: () => void;
}

export function SplashIntro({ onEnter }: SplashIntroProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(onEnter, 600);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 bg-background flex flex-col items-center justify-center cursor-pointer transition-all duration-600 ${
        isExiting ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
      onClick={handleEnter}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Logo animation */}
        <h1 
          className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight animate-fade-in"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          <span className="text-primary">JJ</span>
          <span className="text-foreground">tales</span>
        </h1>

        {/* Tagline */}
        <p 
          className="mt-6 text-lg md:text-xl text-muted-foreground animate-fade-in"
          style={{ animationDelay: "0.8s", animationFillMode: "both" }}
        >
          Untold Tales From Every Corner of the Globe
        </p>

        {/* Enter prompt */}
        <div 
          className="mt-12 flex flex-col items-center gap-2 animate-fade-in"
          style={{ animationDelay: "1.4s", animationFillMode: "both" }}
        >
          <span className="text-sm text-muted-foreground uppercase tracking-widest">
            Click anywhere to enter
          </span>
          <ChevronDown className="w-6 h-6 text-primary animate-bounce" />
        </div>
      </div>

      {/* Decorative line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-fade-in"
        style={{ animationDelay: "1.8s", animationFillMode: "both" }}
      />
    </div>
  );
}
