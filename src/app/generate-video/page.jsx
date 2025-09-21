'use client';
import { useState } from "react";
import { InferenceClient } from "@huggingface/inference";

export default function GenerateVideoPage() {
  const [prompt, setPrompt] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const generateVideo = async () => {
    if (!prompt) return alert("Please enter a prompt!");
    setLoading(true);

    try {
      // Pass token as string
      const client = new InferenceClient(process.env.NEXT_PUBLIC_HF_API_KEY);

      const result = await client.textToVideo({
        provider: "fal-ai",
        model: "zai-org/CogVideoX-5b",
        inputs: prompt,
      });

      // Convert Blob or ArrayBuffer to URL
      const videoBlob =
        result instanceof Blob
          ? result
          : new Blob([await result.arrayBuffer()], { type: "video/mp4" });

      const videoUrl = URL.createObjectURL(videoBlob);

      setVideo(videoUrl);
      setHistory(prev => [{ prompt, video: videoUrl }, ...prev.slice(0, 2)]);
    } catch (err) {
      console.error("Failed to generate video:", err);
      alert("Failed to generate video. See console for details.");
      setVideo(null);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
            AI Video Generator
          </h1>
          <p className="text-gray-600 text-lg">Turn your imagination into moving visuals</p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
          {/* Left - Input */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-purple-100">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Describe your vision
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A young man walking on the street..."
                  className="w-full min-h-[128px] p-5 rounded-2xl border-2 border-purple-200 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 resize-none bg-gradient-to-br from-purple-50/50 to-blue-50/50 placeholder-gray-400"
                />
                <div className="text-xs text-gray-400 mt-1">{prompt.length} characters</div>
              </div>

              <button
                onClick={generateVideo}
                disabled={loading}
                aria-busy={loading}
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-400 to-blue-400 text-white font-semibold rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? "Generating Video..." : "Generate Video"}
              </button>
            </div>

            {/* Recent Creations */}
            {history.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-purple-100">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">RECENT CREATIONS</h3>
                <div className="space-y-3">
                  {history.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 cursor-pointer transition-colors duration-200"
                      onClick={() => {
                        setPrompt(item.prompt);
                        setVideo(item.video);
                      }}
                    >
                      <video src={item.video} className="w-16 h-12 rounded-lg object-cover" />
                      <p className="text-sm text-gray-600 truncate flex-1">{item.prompt}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right - Video */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-blue-100">
              {video ? (
                <video src={video} controls autoPlay loop muted className="w-full rounded-2xl shadow-lg" />
              ) : (
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex flex-col items-center justify-center text-gray-400">
                  <p>Your AI-generated video will appear here</p>
                  <p className="text-xs mt-2">Enter a prompt and click generate</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
