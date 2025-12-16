import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-12 max-w-3xl">
        <h1 className="text-3xl font-black mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-foreground/80">
          <p className="text-sm text-muted-foreground">Last updated: December 2024</p>
          
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using JJtales, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Description of Service</h2>
            <p>JJtales is a platform for reading original comics and stories created by the author. The service includes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access to comics and episodes</li>
              <li>Personal library to save favorites</li>
              <li>Community features and support options</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. User Accounts</h2>
            <p>To access certain features, you must create an account using Google Sign-In. You are responsible for maintaining the security of your account.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Intellectual Property</h2>
            <p>All content on JJtales, including comics, stories, artwork, and text, is the exclusive property of the author. You may not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Copy, reproduce, or distribute any content</li>
              <li>Use content for commercial purposes</li>
              <li>Modify or create derivative works</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. User Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violate any laws or regulations</li>
              <li>Attempt to access restricted areas of the service</li>
              <li>Interfere with the proper functioning of the website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">6. Donations and Support</h2>
            <p>Any donations made to support the author are voluntary and non-refundable. Donations help fund travel and story creation.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">7. Limitation of Liability</h2>
            <p>JJtales is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">8. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}