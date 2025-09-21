// models/Content.js
import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  user: { type: String, default: null },
  platform: String,
  contentFormat: String,
  brand: String,
  product: String,
  tone: String,
  targetAudience: String,
  additionalInfo: String,
  idea: String,
  caption: String,
  hashtags: String,
  timing: String,
  tip: String,
  // Analytics fields
  analytics: {
    likes24h: { type: Number, default: 0 },
    comments24h: { type: Number, default: 0 },
    likes48h: { type: Number, default: 0 },
    comments48h: { type: Number, default: 0 },
    likes7d: { type: Number, default: 0 },
    comments7d: { type: Number, default: 0 },
  },
}, { timestamps: true });

export default mongoose.models.Content || mongoose.model("Content", ContentSchema);
