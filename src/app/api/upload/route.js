import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const { imageBase64 } = await req.json();
    if (!imageBase64) {
      return NextResponse.json(
        { error: "imageBase64 missing in the request body" },
        { status: 400 }
      );
    }

    // Remove the base64 prefix
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const fileName = `image-${Date.now()}.png`;
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    await mkdir(uploadsDir, { recursive: true });
    const filePath = path.join(uploadsDir, fileName);
    await writeFile(filePath, Buffer.from(base64Data, "base64"));

    // ✅ THIS IS WHERE YOU PUT IT
    const publicUrl = `${req.headers.get("origin")}/uploads/${fileName}`;
    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
