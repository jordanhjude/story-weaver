import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Heart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function DonationSuccess() {
  useEffect(() => {
    document.title = "Thank You! | JJtales";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Thank You for Your Support!
          </h1>
          <p className="text-muted-foreground mb-6">
            Your donation helps me continue traveling and creating stories from cities around the world. 
            You're now part of the JJtales journey!
          </p>
          <div className="flex items-center justify-center gap-2 text-primary mb-8">
            <Heart className="w-5 h-5 fill-primary" />
            <span className="font-medium">You're amazing!</span>
          </div>
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
