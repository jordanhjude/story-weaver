import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-12 max-w-3xl">
        <h1 className="text-3xl font-black mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-foreground/80">
          <p className="text-sm text-muted-foreground">Last updated: December 2024</p>
          
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Information We Collect</h2>
            <p>When you use JJtales, we may collect the following information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account information (email, name) when you sign in with Google</li>
              <li>Reading history and saved comics in your library</li>
              <li>Usage data to improve our service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and maintain your account</li>
              <li>Save your reading preferences and library</li>
              <li>Improve our comics and user experience</li>
              <li>Send important updates about the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information. Your data is stored securely and we do not sell your information to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Cookies</h2>
            <p>We use essential cookies to maintain your session and preferences. These are necessary for the website to function properly.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request deletion of your account</li>
              <li>Update your information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">6. Contact</h2>
            <p>For any privacy-related questions, please contact us through our website.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}