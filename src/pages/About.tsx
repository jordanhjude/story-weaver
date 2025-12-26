import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      
      <main className="flex-1 pt-24">
        <section className="reading-container py-16 md:py-24">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-12 fade-in">
            About
          </h1>
          
          <div className="max-w-xl space-y-8 text-muted-foreground leading-relaxed">
            <p className="fade-in" style={{ animationDelay: "0.1s" }}>
              This website exists for stories that don't resolve cleanly.
            </p>
            
            <p className="fade-in" style={{ animationDelay: "0.2s" }}>
              No heroes. No lessons. Just consequences.
            </p>
            
            <div className="section-divider !mx-0" />
            
            <p className="fade-in" style={{ animationDelay: "0.3s" }}>
              These are stories about what happens when the systems we trust—law, faith, 
              family—fail to deliver the justice they promise. About the silence that follows 
              violence. About decisions made in rooms where no one is watching.
            </p>
            
            <p className="fade-in" style={{ animationDelay: "0.4s" }}>
              The characters here are not monsters. They are people who crossed lines 
              that seemed reasonable at the time. They are the police officer who looked away, 
              the judge who ruled by politics, the believer who chose vengeance over mercy.
            </p>
            
            <p className="fade-in" style={{ animationDelay: "0.5s" }}>
              If you're looking for comfort, these stories will disappoint you.
            </p>
            
            <p className="fade-in" style={{ animationDelay: "0.6s" }}>
              If you're looking for truth, you might find something here.
            </p>
            
            <div className="section-divider !mx-0" />
            
            <p className="text-muted-foreground/60 font-sans text-sm fade-in" style={{ animationDelay: "0.7s" }}>
              The author writes anonymously. The stories speak for themselves.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
