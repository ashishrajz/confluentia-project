// src/app/api/content/feedback/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Content from "@/lib/models/content.model";

export async function POST(req) {
  try {
    const { contentId, likes24h, comments24h, likes48h, comments48h, likes7d, comments7d } = await req.json();

    await connectDB();

    const content = await Content.findByIdAndUpdate(
      contentId,
      {
        analytics: { likes24h, comments24h, likes48h, comments48h, likes7d, comments7d },
      },
      { new: true }
    );

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Feedback saved", content });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message || "Failed to save feedback" }, { status: 500 });
  }
}
