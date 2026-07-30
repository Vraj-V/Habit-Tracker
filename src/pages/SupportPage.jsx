import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

export default function SupportPage() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      question: 'How does Aura calculate my performance score?',
      answer:
        'Your performance score is calculated based on multiple factors including habit completion rate, streak consistency, wearable data integration, sleep quality, and overall activity levels. The algorithm weighs recent performance more heavily than historical data.',
    },
    {
      question: 'Can I export my health data for my doctor?',
      answer:
        'Yes! You can export all your health data in JSON or CSV format. Go to Settings > Data Management > Export Data. You can also generate a comprehensive PDF report suitable for sharing with healthcare professionals.',
    },
    {
      question: 'What wearables are compatible with Aura?',
      answer:
        'Aura works with Apple HealthKit, Google Health Connect, Fitbit, Garmin, Samsung Health, Oura Ring, Polar, Suunto, and Whoop. We continuously add support for more devices. Check the wearable section in your settings for the full list.',
    },
    {
      question: 'Is my biometric data private?',
      answer:
        'Your privacy is paramount. Aura uses enterprise-grade encryption and Apple-standard security protocols. Your biometric data never leaves our servers unless you explicitly export it. We never sell or share your data with third parties.',
    },
    {
      question: 'How can I cancel my subscription?',
      answer:
        'You can cancel anytime through your account settings. Go to Settings > Membership Status > Manage Subscription > Cancel. Your access continues until the end of your billing period, and we offer no-questions-asked cancellation.',
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-3xl space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">How can we help?</h1>
        <p className="text-lg text-muted">Everything you need to master your health and thrive with Aura.</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted" />
        <input
          type="text"
          placeholder="Search for articles, guides, or troubleshooting..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-lg bg-surface border border-border text-foreground placeholder-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: '💬', title: 'Live Concierge', description: 'Human health experts available 24/7 to interpret your AI insights' },
          { icon: '📚', title: 'Aura Academy', description: 'Evidence-based courses on sleep optimization and metabolic health' },
          { icon: '👥', title: 'Executive Circle', description: 'Exclusive peer groups for high-performance networking and accountability' },
        ].map((item, i) => (
          <div key={i} className="bg-surface rounded-lg border border-border p-6 hover:border-primary/30 transition cursor-pointer group">
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="font-semibold mb-2 group-hover:text-primary transition">{item.title}</h3>
            <p className="text-sm text-muted">{item.description}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

        <div className="space-y-3">
          {filteredFaqs.map((faq, i) => (
            <div
              key={i}
              className="bg-surface rounded-lg border border-border overflow-hidden hover:border-primary/30 transition"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-surface-hover transition"
              >
                <span className="font-semibold text-left">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-muted flex-shrink-0 transition ${
                    expandedFaq === i ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              {expandedFaq === i && (
                <div className="px-6 py-4 bg-surface-hover text-muted text-sm leading-relaxed border-t border-border">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted">No results found for "{searchTerm}"</p>
            <p className="text-sm text-muted mt-2">Try searching with different keywords</p>
          </div>
        )}
      </div>

      {/* Contact */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-8 text-center">
        <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
        <p className="text-muted mb-6">
          Reach out to our support team at{' '}
          <a href="mailto:support@aura.health" className="text-primary hover:underline">
            support@aura.health
          </a>
        </p>
        <div className="space-y-2 text-sm text-muted">
          <p>📚 <a href="#" className="text-primary hover:underline">Documentation</a></p>
          <p>⚡ <a href="#" className="text-primary hover:underline">API Status</a></p>
          <p>🔒 <a href="#" className="text-primary hover:underline">Privacy Policy</a></p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-muted pt-8 border-t border-border">
        <p>© 2024 Aura Health. All rights reserved. Crafted for performance.</p>
      </div>
    </div>
  );
}
