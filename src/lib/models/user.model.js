// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true }, // Clerk user ID
    email: { type: String, required: true, unique: true },
    name: { type: String },

    plan: {
      type: String,
      enum: ["free", "pro"],
      default: "free",
    },

    credits: { type: Number, default: 10 },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
