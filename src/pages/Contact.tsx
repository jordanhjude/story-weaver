import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Instagram, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2 animate-fade-in">Get in Touch</h1>
          <p className="text-muted-foreground mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Connect with JJtales and follow the journey
          </p>
          
          <div className="space-y-8">
            {/* Social Media Section */}
            <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <span className="h-px flex-1 bg-border"></span>
                <span>Follow the Story</span>
                <span className="h-px flex-1 bg-border"></span>
              </h2>
              
              <div className="grid gap-4">
                <a 
                  href="https://instagram.com/jjtales_"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-card/80 transition-all duration-300"
                >
                  <div className="p-3 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white">
                    <Instagram size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">Instagram</p>
                    <p className="text-sm text-muted-foreground">@jjtales_</p>
                  </div>
                  <span className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">→</span>
                </a>
                
                <a 
                  href="https://x.com/beatalestory" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-card/80 transition-all duration-300"
                >
                  <div className="p-3 rounded-full bg-black text-white">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">X (Twitter)</p>
                    <p className="text-sm text-muted-foreground">@beatalestory</p>
                  </div>
                  <span className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">→</span>
                </a>
                
                <a 
                  href="https://www.tiktok.com/@beatalestory" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-card/80 transition-all duration-300"
                >
                  <div className="p-3 rounded-full bg-black text-white">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">TikTok</p>
                    <p className="text-sm text-muted-foreground">@beatalestory</p>
                  </div>
                  <span className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">→</span>
                </a>
              </div>
            </section>
            
            {/* Location Section */}
            <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <span className="h-px flex-1 bg-border"></span>
                <span>Currently Writing From</span>
                <span className="h-px flex-1 bg-border"></span>
              </h2>
              
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-lg font-medium text-foreground">Kraków, Poland</span>
                </div>
                <p className="text-muted-foreground text-sm ml-8">
                  Stories inspired by the places I visit. Follow along as the journey continues.
                </p>
              </div>
            </section>
            
            {/* Email Section */}
            <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <span className="h-px flex-1 bg-border"></span>
                <span>Direct Contact</span>
                <span className="h-px flex-1 bg-border"></span>
              </h2>
              
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">For inquiries, reach out via social media</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
