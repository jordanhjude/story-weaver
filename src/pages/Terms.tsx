import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background velvet-texture">
      <SiteHeader />
      
      <main className="pt-32 pb-24">
        <div className="reading-container">
          <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide mb-8">Terms of Service</h1>
          
          <div className="space-y-8 text-muted-foreground font-body leading-relaxed">
            <p className="text-sm text-muted-foreground/60">Last updated: December 2024</p>
            
            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using City of Whispers, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">2. Description of Service</h2>
              <p>City of Whispers is a platform for reading original stories about romance and intimacy, created by an anonymous author. The service includes:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Access to original romantic fiction</li>
                <li>Ability to save and like stories</li>
                <li>Community features and support options</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">3. Age Requirement</h2>
              <p>This website contains mature content intended for adults 18 years of age and older. By using this service, you confirm that you meet this age requirement.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">4. User Accounts</h2>
              <p>To access certain features, you may create an account using Google Sign-In. You are responsible for maintaining the security of your account.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">5. Intellectual Property</h2>
              <p>All content on City of Whispers, including stories, artwork, and text, is the exclusive property of the author. You may not:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Copy, reproduce, or distribute any content</li>
                <li>Use content for commercial purposes</li>
                <li>Modify or create derivative works</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">6. User Conduct</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Violate any laws or regulations</li>
                <li>Attempt to access restricted areas of the service</li>
                <li>Interfere with the proper functioning of the website</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">7. Donations and Support</h2>
              <p>Any donations made to support the author are voluntary and non-refundable. Donations help fund travel and story creation.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">8. Limitation of Liability</h2>
              <p>City of Whispers is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-3">9. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}