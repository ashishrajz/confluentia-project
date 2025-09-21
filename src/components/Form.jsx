"use client";

import { FaMagic } from "react-icons/fa";

const Form = ({ formData, handleChange, handleSubmit, loading }) => {
  return (
    <div>
      {/* Sequential / Step-wise Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-10">
        {/* Platform */}
        <div className="space-y-3">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Select Platform <span className="text-pink-500 ml-1">*</span>
          </label>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-pink-200 focus:border-pink-400 transition-all duration-300 bg-white text-gray-700 text-lg cursor-pointer"
            required
          >
            <option value="">Choose your platform...</option>
            <option value="instagram">📸 Instagram</option>
            <option value="linkedin">💼 LinkedIn</option>
            
          </select>
          <p className="text-sm text-gray-500 mt-1">Choose the platform where you'll share your content</p>
        </div>

        {/* Content Format (from your original) */}
        <div className="space-y-3">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Content Format <span className="text-pink-500 ml-1">*</span>
          </label>
          <select
            name="contentFormat"
            value={formData.contentFormat}
            onChange={handleChange}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 bg-white text-gray-700 text-lg cursor-pointer"
            required
          >
            <option value="">-- Select Format --</option>
            <option value="reel">Reel</option>
            <option value="carousel">Carousel</option>
            <option value="post">Post</option>
            <option value="story">Story</option>
          </select>
          <p className="text-sm text-gray-500 mt-1">Choose the content format (reel, carousel, post, etc.)</p>
        </div>

        {/* Brand Name */}
        <div className="space-y-3">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Brand Name <span className="text-gray-400 text-sm ml-2">(Optional)</span>
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="e.g., Your Business Name, @username"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 bg-white text-gray-700 text-lg"
          />
          <p className="text-sm text-gray-500 mt-1">Add your brand name to personalize the content</p>
        </div>

        {/* Product */}
        <div className="space-y-3">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Product <span className="text-gray-400 text-sm ml-2">(Optional)</span>
          </label>
          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
            placeholder="e.g., Product or service name"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 bg-white text-gray-700 text-lg"
          />
          <p className="text-sm text-gray-500 mt-1">Add product name or details</p>
        </div>

        {/* Tone */}
        <div className="space-y-3">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Choose Tone <span className="text-pink-500 ml-1">*</span>
          </label>
          <select
            name="tone"
            value={formData.tone}
            onChange={handleChange}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 bg-white text-gray-700 text-lg cursor-pointer"
            required
          >
            <option value="">Select tone...</option>
            <option value="professional">💼 Professional & Formal</option>
            <option value="casual">😎 Casual & Relaxed</option>
            <option value="funny">😂 Humorous & Witty</option>
            <option value="inspirational">💪 Motivational & Inspiring</option>
            <option value="informative">📚 Informative & Educational</option>
            <option value="friendly">😊 Friendly & Approachable</option>
          </select>
          <p className="text-sm text-gray-500 mt-1">Pick the tone for your content</p>
        </div>

        {/* Target Audience */}
        <div className="space-y-3">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Target Audience <span className="text-pink-500 ml-1">*</span>
          </label>
          <input
            type="text"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            placeholder="e.g., Students, Professionals, Parents"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none transition-all duration-300 bg-white text-gray-700 text-lg"
            required
          />
          <p className="text-sm text-gray-500 mt-1">Who is your content aimed at?</p>
        </div>

        {/* Additional Info */}
        <div className="space-y-3">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Describe More <span className="text-gray-400 text-sm ml-2">(Optional)</span>
          </label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            placeholder="Add any additional details or instructions for the AI..."
            className="w-full p-4 border-2 border-blue-400 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-200 transition-all duration-300 bg-white text-gray-700 text-lg resize-none h-32"
          />
          <p className="text-sm text-gray-500 mt-1">Provide extra context or instructions to help the AI generate better content.</p>
        </div>

        

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={loading}
            className="group relative px-12 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-200"
          >
            <div className="flex items-center gap-3">
              <FaMagic className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
              {loading ? "Generating..." : "Generate Amazing Content"}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
