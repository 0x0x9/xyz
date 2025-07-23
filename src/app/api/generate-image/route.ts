import { NextRequest, NextResponse } from "next/server";
import { generateImage } from "@/ai/flows/generate-image";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: "Prompt manquant" }, { status: 400 });
  }
  try {
    const image = await generateImage(prompt);
    return NextResponse.json({ image });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
