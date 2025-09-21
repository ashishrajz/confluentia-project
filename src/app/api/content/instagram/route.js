// src/app/api/content/instagram/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Content from "@/lib/models/content.model";
import { auth } from "@clerk/nextjs/server";

export async function GET(req) {
  try {
    const { userId } = await auth(); // get logged-in user
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Fetch all Instagram posts for the user
    const contents = await Content.find({ user: userId, platform: "instagram" })
      .sort({ createdAt: -1 });

    if (contents.length === 0) {
      return NextResponse.json({ message: "No Instagram content found" }, { status: 404 });
    }

    return NextResponse.json({ contents }); // send all posts
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch Instagram content" },
      { status: 500 }
    );
  }
}
