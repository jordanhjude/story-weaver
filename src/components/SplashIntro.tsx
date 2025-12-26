import { useState } from "react";
import { ChevronDown } from "lucide-react";
import logoImage from "@/assets/logo-city-whispers-v2.png";

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
      className={`fixed inset-0 z-50 bg-background velvet-texture flex flex-col items-center justify-center cursor-pointer transition-all duration-600 ${
        isExiting ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
      onClick={handleEnter}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-rose/8 rounded-full blur-[180px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-plum/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div 
          className="mb-8 animate-fade-in"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          <img 
            src={logoImage} 
            alt="City of Whispers" 
            className="w-32 h-32 md:w-40 md:h-40 mx-auto object-contain"
          />
        </div>

        {/* Title */}
        <h1 
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground tracking-wide animate-fade-in"
          style={{ animationDelay: "0.5s", animationFillMode: "both" }}
        >
          City of Whispers
        </h1>

        {/* Tagline */}
        <p 
          className="mt-6 text-base md:text-lg text-muted-foreground font-body italic animate-fade-in"
          style={{ animationDelay: "1s", animationFillMode: "both" }}
        >
          Letting cities speak of love and romance
        </p>

        {/* Enter prompt */}
        <div 
          className="mt-16 flex flex-col items-center gap-3 animate-fade-in"
          style={{ animationDelay: "1.6s", animationFillMode: "both" }}
        >
          <span className="text-xs text-muted-foreground/60 uppercase tracking-[0.3em] font-body">
            Enter
          </span>
          <ChevronDown className="w-5 h-5 text-rose/60 animate-bounce" />
        </div>
      </div>

      {/* Subtle bottom gradient line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose/30 to-transparent animate-fade-in"
        style={{ animationDelay: "2s", animationFillMode: "both" }}
      />
    </div>
  );
}