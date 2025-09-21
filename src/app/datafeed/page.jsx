"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FeedbackForm from "@/components/FeedbackForm";
import { 
  MessageCircle, 
  Linkedin, 
  Instagram, 
  X, 
  Star, 
  Send,
  Hash,
  Briefcase,
  Heart,
  ThumbsUp,
  Sparkles,
  FileText
} from "lucide-react";

export default function FeedbackPage({ userId }) {
  const [instagramPosts, setInstagramPosts] = useState([]);
  const [linkedinPosts, setLinkedinPosts] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);

  // 🔹 Fetch Instagram posts
  useEffect(() => {
    async function fetchInstagram() {
      try {
        const res = await fetch("/api/content/instagram");
        const data = await res.json();
        if (res.ok) setInstagramPosts(data.contents || []);
        else console.error(data.error);
      } catch (err) {
        console.error(err);
      }
    }
    fetchInstagram();
  }, []);

  // 🔹 Fetch LinkedIn posts
  useEffect(() => {
    async function fetchLinkedin() {
      try {
        const res = await fetch("/api/content/linkedin");
        const data = await res.json();
        if (res.ok) setLinkedinPosts(data.contents || []);
        else console.error(data.error);
      } catch (err) {
        console.error(err);
      }
    }
    fetchLinkedin();
  }, []);

  const snippet = (text, limit = 10) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
  };

  // 🔹 handle form submission success
  const handleFeedbackSuccess = () => {
    toast.success("Feedback submitted!");
    setSelectedContent(null); // close popup automatically
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-sky-100 rounded-full blur-3xl opacity-30 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-50 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-sky-50 rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10 p-8">
        {/* Header with gradient text */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-pink-400 to-sky-400 rounded-2xl shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-sky-500 bg-clip-text text-transparent mb-3">
            Your Generated Content
          </h1>
          <p className="text-gray-600 text-lg">Review and provide feedback on your social media posts</p>
        </div>

        {/* Instagram Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-gradient-to-br from-pink-400 via-purple-400 to-orange-400 rounded-xl shadow-md">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Instagram Posts</h2>
            <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-medium">
              {instagramPosts.length} posts
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instagramPosts.map((content, index) => (
              <div
                key={content._id}
                className="group relative bg-white border border-pink-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                onClick={() => setSelectedContent(content)}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-transparent to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  {/* Post number badge */}
                  <div className="absolute -top-3 -right-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">#{index + 1}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-pink-100 rounded-lg">
                      <Hash className="w-5 h-5 text-pink-500" />
                    </div>
                    <h3 className="font-medium text-gray-800 flex-1 line-clamp-2">
                      {snippet(content.idea, 15)}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 text-gray-500 text-sm">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>Likes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>Comments</span>
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className="mt-4 flex items-center justify-center gap-2 text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">Click to provide feedback</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LinkedIn Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl shadow-md">
              <Linkedin className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">LinkedIn Posts</h2>
            <span className="px-3 py-1 bg-sky-100 text-sky-600 rounded-full text-sm font-medium">
              {linkedinPosts.length} posts
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {linkedinPosts.map((content, index) => (
              <div
                key={content._id}
                className="group relative bg-white border border-sky-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                onClick={() => setSelectedContent(content)}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  {/* Post number badge */}
                  <div className="absolute -top-3 -right-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">#{index + 1}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-sky-100 rounded-lg">
                      <Briefcase className="w-5 h-5 text-sky-500" />
                    </div>
                    <h3 className="font-medium text-gray-800 flex-1 line-clamp-2">
                      {snippet(content.idea, 15)}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 text-gray-500 text-sm">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Reactions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>Comments</span>
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className="mt-4 flex items-center justify-center gap-2 text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">Click to provide feedback</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty state if no content */}
        {instagramPosts.length === 0 && linkedinPosts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="p-6 bg-gradient-to-br from-pink-100 to-sky-100 rounded-full mb-4">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No content yet</h3>
            <p className="text-gray-500">Generate some posts to see them here!</p>
          </div>
        )}
      </div>

      {/* Enhanced Popup Modal */}
      {selectedContent && (
        <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 p-8 rounded-t-3xl relative">
              <button
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                onClick={() => setSelectedContent(null)}
              >
                <X className="w-5 h-5 text-white" />
              </button>
              
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Provide Your Feedback
                </h2>
              </div>
              <p className="text-white/90">Help us improve your content generation</p>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="mb-6 p-5 bg-gradient-to-r from-pink-50 to-sky-50 rounded-2xl border border-pink-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <MessageCircle className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-1">Content Idea</h3>
                    <p className="text-gray-800 italic">
                      {snippet(selectedContent.idea, 30)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Send className="w-5 h-5 text-sky-500" />
                  <h3 className="text-lg font-semibold text-gray-700">Your Feedback</h3>
                </div>
                {/* Pass success callback to form */}
                <FeedbackForm
                  contentId={selectedContent._id}
                  onSuccess={handleFeedbackSuccess}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}