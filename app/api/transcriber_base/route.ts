import { NextRequest, NextResponse } from "next/server";
import transcription from "./transcribe";
import translate from "./translate";
export const maxDuration = 60;
const API_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file") as File;
  const model = form.get("model") as string;

  const audioText = await transcription(file);

  const translation = await translate(audioText.text);

  return NextResponse.json(
    { message: audioText.text, translation },
    { headers: { "Access-Control-Allow-Origin": "*" }, status: 200 }
  );
}
