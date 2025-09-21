'use client';
import { useState } from "react";

export default function GenerateImagePage() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const generateImage = async () => {
    if (!prompt) return alert("Please enter a prompt!");
    setLoading(true);
    try {
      const response = await fetch(
        "https://router.huggingface.co/nebius/v1/images/generations",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "black-forest-labs/flux-dev",
            prompt: prompt,
            response_format: "b64_json",
          }),
        }
      );

      const result = await response.json();
      const imageBase64 = result?.data?.[0]?.b64_json;
      if (!imageBase64) throw new Error("No image returned");

      const newImage = `data:image/png;base64,${imageBase64}`;
      setImage(newImage);
      setHistory([{ prompt, image: newImage }, ...history.slice(0, 2)]);
    } catch (err) {
      console.error("Image generation failed:", err);
      alert("Failed to generate image.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
            AI Image Generator
          </h1>
          <p className="text-gray-600 text-lg">Transform your ideas into stunning visuals</p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Prompt Area */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-blue-100">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Describe your vision
                </label>
                <div className="relative">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="A futuristic city at sunset with flying cars and neon lights..."
                    className="w-full min-h-32 p-5 rounded-2xl border-2 border-blue-200 focus:border-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-100 transition-all duration-300 resize-none bg-gradient-to-br from-blue-50/50 to-pink-50/50 placeholder-gray-400"
                    rows="5"
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {prompt.length} characters
                  </div>
                </div>
              </div>

              <button
                onClick={generateImage}
                disabled={loading}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-400 to-pink-400 text-white font-semibold rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    <span>Creating Magic...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    <span>Generate Image</span>
                  </>
                )}
              </button>

              {/* Quick Prompts */}
              <div className="mt-6">
                <p className="text-xs font-semibold text-gray-500 mb-3">QUICK IDEAS</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Dreamy landscape",
                    "Cyberpunk city",
                    "Fantasy creature",
                    "Abstract art"
                  ].map((idea) => (
                    <button
                      key={idea}
                      onClick={() => setPrompt(idea)}
                      className="px-3 py-1 text-xs bg-gradient-to-r from-blue-100 to-pink-100 text-gray-700 rounded-full hover:from-blue-200 hover:to-pink-200 transition-colors duration-200"
                    >
                      {idea}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Generations */}
            {history.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-blue-100">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">RECENT CREATIONS</h3>
                <div className="space-y-3">
                  {history.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-pink-50 cursor-pointer transition-colors duration-200"
                         onClick={() => {setPrompt(item.prompt); setImage(item.image)}}>
                      <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      <p className="text-sm text-gray-600 truncate flex-1">{item.prompt}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Image Display */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-pink-100">
              {image ? (
                <div className="space-y-4">
                  <div className="relative group">
                    <img 
                      src={image} 
                      alt="Generated" 
                      className="w-full rounded-2xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end p-6">
                      <button 
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = image;
                          link.download = 'ai-generated.png';
                          link.click();
                        }}
                        className="px-4 py-2 bg-white/90 backdrop-blur text-gray-800 rounded-xl hover:bg-white transition-colors duration-200 flex items-center space-x-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                        </svg>
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Generated with AI</span>
                    <span>{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              ) : (
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-pink-100 rounded-2xl flex flex-col items-center justify-center text-gray-400">
                  <svg className="w-24 h-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <p className="text-center">Your AI-generated image will appear here</p>
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
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
