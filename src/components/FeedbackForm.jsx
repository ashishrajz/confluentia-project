"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function FeedbackForm({ contentId, onSuccess }) {
  const [formData, setFormData] = useState({
    likes24h: 0,
    comments24h: 0,
    likes48h: 0,
    comments48h: 0,
    likes7d: 0,
    comments7d: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // keep numeric types similar to original (Number)
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // **NO backend changes** — same endpoint + payload shape as before
      const res = await fetch("/api/content/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentId, ...formData }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Feedback saved");
        // close popup if parent provided onSuccess
        if (typeof onSuccess === "function") onSuccess();
      } else {
        // surface backend error message but do not alter behavior
        toast.error(data?.error || "Failed to save feedback");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { name: "likes24h", label: "Likes (24h)" },
          { name: "comments24h", label: "Comments (24h)" },
          { name: "likes48h", label: "Likes (48h)" },
          { name: "comments48h", label: "Comments (48h)" },
          { name: "likes7d", label: "Likes (7 Days)" },
          { name: "comments7d", label: "Comments (7 Days)" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            <input
              type="number"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              min={0}
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-xl text-white font-semibold shadow
          ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition-transform"}`}
      >
        {loading ? "Saving..." : "Save Feedback"}
      </button>
    </form>
  );
}
