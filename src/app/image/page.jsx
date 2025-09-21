"use client";
import { useState } from "react";

export default function GenerateImagePage() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);           // URL to display
  const [imageBase64, setImageBase64] = useState(null); // ✅ store base64 for Twitter
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
      console.log("HF API result:", result);

      if (!result?.data?.[0]?.b64_json) {
        throw new Error("No image returned. Response: " + JSON.stringify(result));
      }

      const base64 = result.data[0].b64_json;

      // ✅ store base64 for later (Twitter upload)
      setImageBase64(base64);

      // Create a data URI for preview
      const newImage = `data:image/png;base64,${base64}`;

      // Upload to your backend to get a URL
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: newImage }), // ✅ send data URI to backend
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed");

      const uploadedImageUrl = uploadData.url;

      setImage(uploadedImageUrl); // ✅ show uploaded image
      setHistory([{ prompt, image: uploadedImageUrl }, ...history.slice(0, 2)]);
    } catch (err) {
      console.error("Image generation failed:", err);
      alert("Failed to generate image.");
    }
    setLoading(false);
  };

  // ✅ Share function: sends base64 to your /api/tweet route
  // Example share function
const shareOnTwitter = (prompt, imageUrl) => {
  // Compose tweet text
  const tweetText = `Check out this AI-generated image: ${prompt}`;
  
  // Intent Tweet URL (no auth required)
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(imageUrl)}`;
  
  // Opens Twitter in a new tab with pre-filled text + link
  window.open(twitterUrl, "_blank");
};

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      {/* Background */}
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

        {/* Layout */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
          {/* Prompt Side */}
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
            </div>
          </div>

          {/* Image Side */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-pink-100">
              {image ? (
                <div className="space-y-4">
                  <img src={image} alt="Generated" className="w-full rounded-2xl shadow-lg" />
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = image;
                        link.download = 'ai-generated.png';
                        link.click();
                      }}
                      className="px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors duration-200"
                    >
                      Download
                    </button>
                    <button
  onClick={() => shareOnTwitter(prompt, image)}
  className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
>
  Share on Twitter
</button>

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
