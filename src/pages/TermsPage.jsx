export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center mb-8">
          <img src="/logo.png" alt="Aura" className="h-10 w-10 mr-3" />
          <h1 className="text-3xl font-bold">Aura</h1>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">Terms & Conditions</h2>
          <p className="text-muted">* Last updated: October 24, 2023 *</p>
        </div>

        <div className="bg-surface rounded-xl border border-border p-8 space-y-8">
          <section>
            <h3 className="text-2xl font-bold mb-4">1. Introduction</h3>
            <p className="text-muted leading-relaxed">
              Welcome to Aura. These Terms and Conditions govern your use of the Aura premium health and habit tracking application. By accessing or using Aura, you agree to be bound by these terms. If you disagree with any part of these terms, you may not access the service.
            </p>
            <p className="text-muted leading-relaxed mt-4">
              Our platform uses advanced biometric data and AI-driven insights to provide personal health guidance. This service is intended for informational purposes only and is not a substitute for professional medical advice.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-4">2. User Accounts</h3>
            <p className="text-muted leading-relaxed mb-3">To access certain features of Aura, you must register for an account. You agree to:</p>
            <ul className="space-y-2 text-muted">
              <li className="flex gap-3">
                <span>•</span>
                <span>Provide accurate, current, and complete information during the registration process</span>
              </li>
              <li className="flex gap-3">
                <span>•</span>
                <span>Update such information to keep it accurate, current, and complete</span>
              </li>
              <li className="flex gap-3">
                <span>•</span>
                <span>Maintain the confidentiality of your password and be responsible for all activity under your account</span>
              </li>
              <li className="flex gap-3">
                <span>•</span>
                <span>Notify us immediately upon becoming aware of any breach of security</span>
              </li>
              <li className="flex gap-3">
                <span>•</span>
                <span>Use your account only for personal, non-commercial purposes</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-4">3. Privacy Policy</h3>
            <p className="text-muted leading-relaxed">
              Your privacy is of paramount importance to us. Aura employs enterprise-grade encryption and Apple-standard security protocols to protect your biometric data. We never sell, rent, or share your personal health information with third parties without your explicit consent.
            </p>
            <p className="text-muted leading-relaxed mt-4">
              For complete details on how we collect, use, and protect your data, please refer to our separate Privacy Policy.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-4">4. Subscription Terms</h3>
            <p className="text-muted leading-relaxed mb-3">
              Aura offers premium subscription tiers that grant access to AI coaching, deep data analytics, and community features. Subscriptions are billed on a monthly or annual basis.
            </p>
            <ul className="space-y-2 text-muted">
              <li className="flex gap-3">
                <span>•</span>
                <span>Billing occurs at the start of each period and is non-refundable</span>
              </li>
              <li className="flex gap-3">
                <span>•</span>
                <span>You may cancel anytime through your account settings; cancellation takes effect at the end of your current period</span>
              </li>
              <li className="flex gap-3">
                <span>•</span>
                <span>We reserve the right to modify pricing with 30 days' notice</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-4">5. Limitation of Liability</h3>
            <p className="text-muted leading-relaxed italic">
              In no event shall Aura, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, even if Aura has been advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-4">6. Governing Law</h3>
            <p className="text-muted leading-relaxed">
              These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction in which Aura operates, and you irrevocably submit to the exclusive jurisdiction of the courts located therein.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-4">7. Contact</h3>
            <p className="text-muted leading-relaxed">
              Questions about our terms? Contact our legal team at <a href="mailto:legal@aura.health" className="text-primary hover:underline">legal@aura.health</a>
            </p>
          </section>
        </div>

        <div className="mt-12 flex gap-4 justify-center">
          <button className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-surface transition">
            Download PDF
          </button>
          <button className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition">
            Accept Terms
          </button>
        </div>

        <p className="text-center text-sm text-muted mt-8">© 2024 Aura Health. All rights reserved. Crafted for performance.</p>
      </div>
    </div>
  );
}
