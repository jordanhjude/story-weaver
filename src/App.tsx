import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SplashIntro } from "@/components/SplashIntro";
import Home from "./pages/Home";
import Stories from "./pages/Stories";
import StoryReader from "./pages/StoryReader";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Subscribe from "./pages/Subscribe";
import Auth from "./pages/Auth";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import DonationSuccess from "./pages/DonationSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const SPLASH_KEY = "city_of_whispers_splash_seen";

function AppContent() {
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem(SPLASH_KEY);
  });

  const handleEnter = () => {
    sessionStorage.setItem(SPLASH_KEY, "true");
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashIntro onEnter={handleEnter} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/story/:id" element={<StoryReader />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donation-success" element={<DonationSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;