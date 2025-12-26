import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      
      <main className="flex-1 pt-24">
        <section className="reading-container py-16">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4 fade-in">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground/60 text-sm mb-12 fade-in" style={{ animationDelay: "0.1s" }}>
            Last updated: December 2024
          </p>
          
          <div className="space-y-12 text-muted-foreground leading-relaxed">
            <section className="fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="font-serif text-xl text-foreground mb-4">Information We Collect</h2>
              <p className="mb-4">When you use Where the Law Ends, we may collect:</p>
              <ul className="list-none space-y-2 pl-4">
                <li>— Email address when you subscribe</li>
                <li>— Reading preferences and history</li>
                <li>— Basic usage data to improve our service</li>
              </ul>
            </section>

            <section className="fade-in" style={{ animationDelay: "0.3s" }}>
              <h2 className="font-serif text-xl text-foreground mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use your information to:</p>
              <ul className="list-none space-y-2 pl-4">
                <li>— Deliver stories to your inbox</li>
                <li>— Improve our content and experience</li>
                <li>— Send occasional updates about new work</li>
              </ul>
            </section>

            <section className="fade-in" style={{ animationDelay: "0.4s" }}>
              <h2 className="font-serif text-xl text-foreground mb-4">Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information. 
                Your data is stored securely and we do not sell your information to third parties.
              </p>
            </section>

            <section className="fade-in" style={{ animationDelay: "0.5s" }}>
              <h2 className="font-serif text-xl text-foreground mb-4">Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-none space-y-2 pl-4">
                <li>— Access your personal data</li>
                <li>— Request deletion of your data</li>
                <li>— Unsubscribe at any time</li>
              </ul>
            </section>

            <section className="fade-in" style={{ animationDelay: "0.6s" }}>
              <h2 className="font-serif text-xl text-foreground mb-4">Contact</h2>
              <p>
                For any privacy-related questions, please reach out through our website.
              </p>
            </section>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}