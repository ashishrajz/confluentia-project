import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";

// Create client with credentials
const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY,
  appSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

export async function POST(req) {
  try {
    const { base64Image, text } = await req.json();
    if (!base64Image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Upload image to Twitter
    // Remove the prefix like "data:image/png;base64,"
    const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, "");
    const mediaId = await client.v1.uploadMedia(Buffer.from(cleanBase64, "base64"), {
      mimeType: "image/png",
    });

    // Post tweet with uploaded image
    const tweet = await client.v2.tweet({
      text: text || "Here’s my AI-generated image!",
      media: { media_ids: [mediaId] },
    });

    return NextResponse.json({ tweet });
  } catch (err) {
    console.error("Twitter upload error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
