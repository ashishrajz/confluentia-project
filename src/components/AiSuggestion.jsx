'use client';
import { useState } from "react";
import { Instagram, Linkedin, TrendingUp, Zap, Brain } from 'lucide-react';
import { RiGeminiFill } from "react-icons/ri";

const AiSuggestion = () => {
  const [platform, setPlatform] = useState("Instagram");

  const suggestions = {
    Instagram: {
      title: "Instagram Growth Strategy",
      description: "Based on your Instagram analytics, here are personalized recommendations to boost your presence:",
      actions: [
        "Post Reels 3-4 times per week during 6-8 PM for maximum reach",
        "Use 8-12 relevant hashtags mixing popular and niche tags",
        "Engage with followers within the first hour of posting",
        "Create carousel posts for higher engagement rates",
        "Use Instagram Stories daily with interactive stickers"
      ],
      prompts: [
        "Share a behind-the-scenes story of your creative process",
        "Create a carousel with '5 tips for...' in your niche",
        "Ask followers 'This or That' questions in Stories",
        "Post a transformation or before/after reel",
        "Share user-generated content with grateful captions"
      ],
      color: "from-pink-400 to-purple-500",
      icon: Instagram
    },
    LinkedIn: {
      title: "LinkedIn Professional Strategy",
      description: "Optimize your LinkedIn presence with these data-driven recommendations:",
      actions: [
        "Share industry insights on Tuesday-Thursday mornings (8-10 AM)",
        "Write long-form posts with personal experiences and lessons learned",
        "Engage meaningfully on 5-10 posts before sharing your content",
        "Use native LinkedIn video for 5x more engagement",
        "Build authority by sharing case studies and professional wins"
      ],
      prompts: [
        "Share 3 lessons learned from a recent project failure",
        "Write about an industry trend and your unique perspective",
        "Create a post about mentorship and tag your mentors",
        "Share a client success story with measurable results",
        "Discuss a controversial topic in your industry respectfully"
      ],
      color: "from-blue-500 to-indigo-600",
      icon: Linkedin
    }
  };

  const currentSuggestions = suggestions[platform];
  const Icon = currentSuggestions.icon;

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center p-8">
        {/* AI Logo Section */}
        <div className="relative mb-6">
          <div className="relative p-6">
            <div className="flex items-center justify-center space-x-2">
             
              <RiGeminiFill className="w-8 h-8 text-pink-400" />
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-bold text-gray-800 mb-2">
          Smart AI Suggestions
        </h1>
        <p className="text-gray-500 mb-8 text-lg">Powered by Advanced Analytics</p>

        {/* Platform Toggle */}
        <div className="relative flex space-x-4 mb-8 p-1 bg-white rounded-xl shadow-lg">
          <div 
            className={`absolute top-1 bottom-1 transition-all duration-300 rounded-lg ${
              platform === "Instagram" 
                ? "left-1 right-1/2 mr-2 bg-pink-400/20" 
                : "left-1/2 ml-2 right-1 bg-blue-400/20"
            }`}
          ></div>
          <button
            onClick={() => setPlatform("Instagram")}
            className={`relative flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all z-10 ${
              platform === "Instagram"
                ? "text-white"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            <Instagram className="w-5 h-5" />
            Instagram
          </button>
          <button
            onClick={() => setPlatform("LinkedIn")}
            className={`relative flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all z-10 ${
              platform === "LinkedIn"
                ? "text-white"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </button>
        </div>

        {/* Suggestions Card */}
        <div className={`relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-200 max-w-3xl mx-auto transition-all duration-500`}>
          {/* Floating Icons */}
          <div className="absolute -top-4 -right-4 p-3">
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
          <div className="absolute -bottom-4 -left-4 p-3">
            <Zap className="w-6 h-6 text-yellow-500" />
          </div>

          {/* Card Header */}
          <div className={`relative bg-gradient-to-r ${currentSuggestions.color} text-white rounded-2xl p-6 mb-6 shadow-lg overflow-hidden`}>
            <div className="absolute top-0 right-0 opacity-10">
              <Icon className="w-24 h-24 -mr-6 -mt-6" />
            </div>
            <h2 className="relative text-2xl font-bold flex items-center gap-3">
              <Icon className="w-7 h-7" />
              {currentSuggestions.title}
            </h2>
          </div>

          <p className="text-gray-700 mb-6 text-left text-lg leading-relaxed">
            {currentSuggestions.description}
          </p>

          {/* Action Items */}
          <div className="space-y-3 mb-8">
            {currentSuggestions.actions.map((action, index) => (
              <div
                key={index}
                className="flex items-start text-left p-4 rounded-xl transition-all duration-300 hover:shadow-md hover:scale-[1.02] cursor-default"
              >
                <span
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r ${currentSuggestions.color} text-white text-sm font-bold mr-4 flex-shrink-0 mt-0.5 shadow-md`}
                >
                  {index + 1}
                </span>
                <p className="text-gray-700 leading-relaxed">{action}</p>
              </div>
            ))}
          </div>

          {/* Future Posts Section */}
          <div className="mt-8 pt-8 border-t-2 border-gray-200/50">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 p-1">
              <RiGeminiFill className={`w-5 h-5 ${platform === "Instagram" ? 'text-pink-400' : 'text-blue-400'}`} />
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <RiGeminiFill className="w-6 h-6 text-purple-500" />
                AI-Powered Content Prompts for {platform}
              </h3>
              
              <p className="text-gray-700 text-left leading-relaxed mb-4">
                For future posts on <span className="font-semibold">{platform}</span>, leverage these AI-optimized prompts:
              </p>
              
              <div className="space-y-2">
                {currentSuggestions.prompts.map((prompt, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className={`${platform === "Instagram" ? 'text-pink-400' : 'text-blue-400'} mt-1`}>•</span>
                    <span className="text-gray-800 font-medium">"{prompt}"</span>
                  </div>
                ))}
              </div>
              
              <p className="mt-4 text-sm text-gray-600 italic">
                💡 These AI-curated prompts will help maintain consistent engagement and accelerate your growth trajectory.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8">
            <button
              className={`w-full py-4 px-6 rounded-xl bg-gradient-to-r ${currentSuggestions.color} text-white font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3`}
            >
             Dive Deeper
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AiSuggestion;
