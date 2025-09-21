// models/Analytics.js
import mongoose from "mongoose";

const AnalyticsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    contentId: { type: mongoose.Schema.Types.ObjectId, ref: "Content", required: true },

    metrics: {
      likes24h: { type: Number, default: 0 },
      comments24h: { type: Number, default: 0 },
      likes48h: { type: Number, default: 0 },
      comments48h: { type: Number, default: 0 },
      likes7d: { type: Number, default: 0 },
      comments7d: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Analytics || mongoose.model("Analytics", AnalyticsSchema);
