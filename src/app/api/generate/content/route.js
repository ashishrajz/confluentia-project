// src/app/api/generate/content/route.js
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { connectDB } from "@/lib/db";
import Content from "@/lib/models/content.model";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    // ✅ Get Clerk user
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      platform,
      contentFormat,
      brand,
      product,
      tone,
      targetAudience,
      additionalInfo,
    } = body;

    console.log("Received form data:", body);
    console.log("Authenticated user:", userId);

    // ✅ Init Gemini client
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    console.log("Gemini client initialized");

    // ✅ Build prompt
    const prompt = `
You are a social media content strategist. Generate a ${contentFormat} for ${platform}.
Brand: ${brand || "N/A"}
Product: ${product || "N/A"}
Tone: ${tone || "neutral"}
Target Audience: ${targetAudience || "general users"}
Extra Info: ${additionalInfo || "none"}.

Return in plain text format like:
Idea: ...
Caption: ...
Hashtags: ...
Timing: ...
Tip: ...
Include scene-by-scene breakdown in Idea if possible.
`;

    console.log("Prompt sent to AI:", prompt);

    // ✅ Call Gemini
    let output;
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: { thinkingConfig: { thinkingBudget: 0 } },
      });

      console.log("Full Gemini response object:", response);
      output = response?.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log("Parsed output text:", output);

    } catch (geminiError) {
      console.error("Gemini API call failed:", geminiError.message);
      output = undefined;
    }

    // ✅ Parse AI output
    let result;
    if (output) {
      const ideaMatch = output.match(/Idea:\s*([\s\S]*?)\nCaption:/i);
      const captionMatch = output.match(/Caption:\s*([\s\S]*?)\nHashtags:/i);
      const hashtagsMatch = output.match(/Hashtags:\s*([\s\S]*?)\nTiming:/i);
      const timingMatch = output.match(/Timing:\s*([\s\S]*?)\nTip:/i);
      const tipMatch = output.match(/Tip:\s*([\s\S]*)/i);

      result = {
        idea: ideaMatch?.[1]?.trim() || "AI could not generate idea",
        caption: captionMatch?.[1]?.trim() || "",
        hashtags: hashtagsMatch?.[1]?.trim() || "",
        timing: timingMatch?.[1]?.trim() || "",
        tip: tipMatch?.[1]?.trim() || "",
      };
    } else {
      result = {
        idea: "AI could not generate content. Try again later or check quota.",
        caption: "Sample caption for demo",
        hashtags: "#demo #hackathon #content",
        timing: "Anytime",
        tip: "Check AI quota or retry.",
      };
    }

    // ✅ Connect to DB
    await connectDB();
    console.log("Connected to DB");

    // ✅ Save content with secure Clerk userId
    const newContent = await Content.create({
      user: userId, // 👈 from Clerk
      platform,
      contentFormat,
      brand,
      product,
      tone,
      targetAudience,
      additionalInfo,
      idea: result.idea,
      caption: result.caption,
      hashtags: result.hashtags,
      timing: result.timing,
      tip: result.tip,
    });

    console.log("Saved content to DB:", newContent._id);

    return NextResponse.json(result);

  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate content" },
      { status: 500 }
    );
  }
}
