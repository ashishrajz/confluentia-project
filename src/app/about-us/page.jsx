"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";

// ✅ FAQ data
const faqs = [
  {
    question: "What features does your platform offer?",
    answer:
      "Our platform offers AI-powered image, text, and video generation along with detailed post-wise analytics, content recommendations, and automated posting on LinkedIn, WhatsApp, Instagram, and Twitter.",
  },
  {
    question: "How does AI improve my marketing?",
    answer:
      "AI analyzes your audience and performance data to suggest the best content and posting strategy, helping you capture attention and grow your user base more efficiently.",
  },
  {
    question: "Is it easy to share content directly?",
    answer:
      "Yes! You can post generated content directly on multiple platforms with a single click and track performance using our advanced analytics dashboard.",
  },
];

const AboutUsPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-pink-100">
      <div className="px-8 py-16 max-w-6xl mx-auto space-y-20">
        {/* About Us */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-pink-400" />
            <h2 className="text-4xl font-bold text-gray-900">About Us</h2>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100 space-y-4">
            <p className="text-gray-700 text-lg leading-relaxed font-semibold">
            At Ascendo, we’re reshaping how brands, creators, and businesses grow in the digital age. In a world overflowing with content and competition, the old ways of marketing just don’t cut it anymore. That’s why we’ve built a smarter, AI-driven way to capture attention, create content, and engage audiences at scale.

Marketing today is too manual, too noisy, and too expensive. We believe startups, creators, and teams deserve tools that work as hard as they do—tools that turn data into insights, and insights into action.

Our platform harnesses the power of AI to analyze, recommend, and optimize content strategies across channels like LinkedIn, Instagram, Twitter, and more. With Ascendo, you can focus on retention and growth, while our intelligent engine provides personalized content ideas, engagement strategies, and actionable recommendations to drive real results.

We’re not just building software—we’re building a smarter way for brands to grow.
            </p>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-pink-400" />
            <h2 className="text-4xl font-bold text-gray-900">FAQs</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm border border-pink-100 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center text-left font-semibold text-lg text-gray-800 focus:outline-none group"
                >
                  <span>{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-pink-600" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="mt-4 pt-4 border-t border-pink-100">
                    <p className="text-gray-600 text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;
