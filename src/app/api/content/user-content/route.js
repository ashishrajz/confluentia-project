// src/app/api/content/user-content/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Content from "@/lib/models/content.model";
import { auth } from "@clerk/nextjs/server";

export async function GET(req) {
  try {
    await connectDB();

    // ✅ Get logged-in user from Clerk instead of query param
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Query by Clerk userId string
    const contents = await Content.find({ user: userId }).sort({ createdAt: -1 });

    return NextResponse.json({ contents });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch contents" },
      { status: 500 }
    );
  }
}
