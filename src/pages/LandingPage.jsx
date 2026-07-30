import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Zap, Users, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-surface/50 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/logo.png" alt="Aura" className="h-8 w-8" />
            <span className="text-xl font-bold">Aura</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-muted hover:text-foreground transition">Features</button>
            <button className="text-muted hover:text-foreground transition">Pricing</button>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 text-foreground hover:bg-surface rounded-lg transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
          <Zap className="h-4 w-4" />
          AI-Driven Evolution
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Master your habits with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Calm Intelligence</span>.
        </h1>

        <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
          Aura leverages advanced biometric data and predictive AI to transform your daily routines into high-performance rituals. Experience health management designed for the modern executive.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => navigate('/signup')}
            className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition flex items-center justify-center gap-2"
          >
            Start Free Trial <ArrowRight className="h-5 w-5" />
          </button>
          <button className="px-8 py-4 border border-border text-foreground rounded-full font-semibold hover:bg-surface transition">
            View Science
          </button>
        </div>

        {/* Live Stats */}
        <div className="bg-surface rounded-xl border border-border p-6 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-2 w-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm text-muted">Live Now</span>
          </div>
          <div className="text-3xl font-bold text-primary mb-1">12,500+</div>
          <div className="text-sm text-muted">Active Users Optimizing Their Potential</div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Why Aura?</h2>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Zap, title: 'Automatic Tracking', description: 'Your wearables sync in real-time with AI-powered habit detection' },
            { icon: TrendingUp, title: 'Predictive Insights', description: 'GPT-4o generates personalized recommendations based on your patterns' },
            { icon: Users, title: 'Community Drive', description: 'Compete on leaderboards, join challenges, celebrate milestones together' },
          ].map((feature, i) => (
            <div key={i} className="bg-surface rounded-xl border border-border p-8 hover:border-primary/30 transition">
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Wearables */}
        <div className="bg-surface rounded-xl border border-border p-12">
          <h3 className="text-2xl font-bold text-center mb-8">Compatible with your ecosystem</h3>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {['🍎 Apple', '🔵 Google', '⚡ Fitbit', '🎮 Garmin', '📱 Samsung', '💍 Oura'].map((brand) => (
              <div key={brand} className="text-center">
                <div className="text-2xl mb-2">{brand.split(' ')[0]}</div>
                <p className="text-sm text-muted">{brand}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Trusted by Visionaries</h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              quote: 'Aura has fundamentally shifted how I view my productivity. The AI coaching isn&apos;t just tracking; it&apos;s predicting my energy crashes before they happen.',
              author: 'Marcus Chen',
              title: 'CEO, Altis Dynamics',
              rating: 5,
            },
            {
              quote: 'The integration with my smartwatch data was seamless. Truly premium health tech.',
              author: 'Sarah J.',
              title: 'Executive',
              rating: 5,
            },
            {
              quote: 'Finally, a habit tracker that doesn&apos;t feel like a chore. It&apos;s predictive, beautiful, and genuinely helpful.',
              author: 'David Vance',
              title: 'Verified User',
              rating: 5,
            },
          ].map((testimonial, i) => (
            <div key={i} className="bg-surface rounded-xl border border-border p-8">
              <div className="flex gap-1 mb-4">
                {Array(testimonial.rating)
                  .fill(null)
                  .map((_, j) => (
                    <span key={j}>⭐</span>
                  ))}
              </div>
              <p className="text-muted mb-6 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to transform your potential?</h2>
        <p className="text-xl text-muted mb-12">
          Join thousands of high-performers already using Aura to master their habits and optimize their health.
        </p>
        <button
          onClick={() => navigate('/signup')}
          className="px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary-dark transition"
        >
          Get Started Free
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="Aura" className="h-6 w-6" />
                <span className="font-bold">Aura</span>
              </div>
              <p className="text-sm text-muted">Elevating human performance through intelligence and design.</p>
            </div>
            {[
              { title: 'PRODUCT', links: ['Features', 'Pricing', 'Science', 'Integration'] },
              { title: 'RESOURCES', links: ['Support', 'Academy', 'Community', 'API Docs'] },
              { title: 'LEGAL', links: ['Privacy', 'Terms', 'Security', 'Cookie Policy'] },
              { title: 'COMPANY', links: ['About', 'Blog', 'Careers', 'Contact'] },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold text-sm mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted hover:text-foreground transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-8 flex items-center justify-between">
            <p className="text-sm text-muted">© 2024 Aura Health. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-muted hover:text-foreground transition">
                Twitter
              </a>
              <a href="#" className="text-muted hover:text-foreground transition">
                LinkedIn
              </a>
              <a href="#" className="text-muted hover:text-foreground transition">
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
