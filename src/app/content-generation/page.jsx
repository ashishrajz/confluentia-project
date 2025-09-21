"use client";

import { useState } from "react";
import { RiQuillPenLine } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaMagic } from "react-icons/fa";
import AiResponse from "@/components/AiResponse";
import Form from "@/components/Form";
import ReactMarkdown from 'react-markdown';


export default function ContentCreationPage() {
  // initial state includes fields from your original form + some UI-only extras
  const [formData, setFormData] = useState({
    // ORIGINAL FIELDS (these will be sent to /api/generate/content)
    platform: "",
    contentFormat: "",
    brand: "",
    product: "",
    tone: "",
    targetAudience: "",
    additionalInfo: "",

    // EXTRA (UI-only / optional) — kept for design but NOT sent to backend
    topic: "",
    contentLength: "",
    language: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // Build payload only with the original fields (do not send UI-only extras)
    const payload = {
      platform: formData.platform,
      contentFormat: formData.contentFormat,
      brand: formData.brand,
      product: formData.product,
      tone: formData.tone,
      targetAudience: formData.targetAudience,
      additionalInfo: formData.additionalInfo,
    };

    try {
      const res = await fetch("/api/generate/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setResult(data);
      } else {
        setResult({ error: data.error || "Failed to generate content" });
      }
    } catch (err) {
      console.error(err);
      setResult({ error: "❌ Error calling API" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-400 to-blue-300 rounded-full mb-6 shadow-lg">
            <RiQuillPenLine className="text-3xl text-gray-100" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-blue-600 bg-clip-text text-transparent mb-4">
            Content Creation Studio
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Follow our simple 3-step process to create engaging posts that resonate with your audience!
          </p>
        </div>

        {/* 3-Step Content Card (kept from your friend's UI) */}
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 space-y-6">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-pink-50 to-pink-100 hover:shadow-lg transition-all duration-300">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg text-lg">
              <RiQuillPenLine className="text-xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-1">Fill in Your Post Details</h3>
              <p className="text-gray-700 text-sm">
                Enter your platform, content format, tone, and target audience.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 hover:shadow-lg transition-all duration-300">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg text-lg">
              <AiOutlinePlusCircle className="text-xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-1">Add Extra Details</h3>
              <p className="text-gray-700 text-sm">
                Add context, examples, keywords, or style preferences to enhance the AI output.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 hover:shadow-lg transition-all duration-300">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg text-lg">
              <FaMagic className="text-xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-1">Let the AI Work Its Magic</h3>
              <p className="text-gray-700 text-sm">
                Watch our AI generate creative content tailored to your specifications instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Instruction */}
        <p className="text-gray-700 text-center mt-12 mb-6 text-lg">
          Complete the form to unlock your AI-generated content.
        </p>

        {/* Form & Results Container */}
        <div className="max-w-5xl mx-auto border border-gray-200 rounded-3xl bg-white/90 backdrop-blur-sm shadow-2xl p-12 mt-8">
          <Form
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
          />

          {/* Result Section (from your original UI) */}
          {result && (
  <div className="mt-10 bg-white/90 p-8 shadow-xl rounded-2xl border border-gray-100">
    {/* Main Heading */}
    <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
      ✨ Your Generated Content
    </h2>

    {result.error ? (
      <p className="text-red-600">{result.error}</p>
    ) : (
      <div className="space-y-6">
        {/* IDEA */}
        {result.idea && (
          <div
            className="p-6 rounded-2xl border-2 bg-white/90 shadow-lg border-transparent bg-clip-padding"
            style={{
              borderImage: "linear-gradient(90deg, #ec4899, #3b82f6) 1",
            }}
          >
            <div className="prose max-w-none">
              <ReactMarkdown>
                {`## 💡 Idea

${result.idea
  // break at Scene and trim
  .split(/(?=\*\*?Scene|\bScene\s)/)
  .map(scene => scene.trim())
  .join("\n\n")}`}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* CAPTION */}
        {result.caption && (
          <div
            className="p-6 rounded-2xl border-2 bg-white/90 shadow-lg border-transparent bg-clip-padding"
            style={{
              borderImage: "linear-gradient(90deg, #3b82f6, #8b5cf6) 1",
            }}
          >
            <div className="prose max-w-none">
              <ReactMarkdown>{`## 📝 Caption\n${result.caption}`}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* HASHTAGS */}
        {result.hashtags && (
          <div
            className="p-6 rounded-2xl border-2 bg-white/90 shadow-lg border-transparent bg-clip-padding"
            style={{
              borderImage: "linear-gradient(90deg, #10b981, #06b6d4) 1",
            }}
          >
            <div className="prose max-w-none">
              <ReactMarkdown>{`## 🏷️ Hashtags\n${result.hashtags}`}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* BEST TIME */}
        {result.timing && (
          <div
            className="p-6 rounded-2xl border-2 bg-white/90 shadow-lg border-transparent bg-clip-padding"
            style={{
              borderImage: "linear-gradient(90deg, #f59e0b, #ef4444) 1",
            }}
          >
            <div className="prose max-w-none">
              <ReactMarkdown>{`## ⏰ Best Time\n${result.timing}`}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* TIP */}
        {result.tip && (
          <div
            className="p-6 rounded-2xl border-2 bg-white/90 shadow-lg border-transparent bg-clip-padding"
            style={{
              borderImage: "linear-gradient(90deg, #8b5cf6, #ec4899) 1",
            }}
          >
            <div className="prose max-w-none">
              <ReactMarkdown>{`## 💡 Tip\n${result.tip}`}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    )}
  </div>
)}








          {/* Keep AI suggestions / static tips component */}
          {result && (<AiResponse />)}
        </div>
      </div>
    </main>
  );
}
