import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
const API_KEY = process.env.OPENAI_API_KEY;

const client = new OpenAI();

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file") as File
  const model = form.get("model") as string

  // we can transcribe this way if we want to upload a file from a url
  // const filse = await fetch(
  //   "https://utfs.io/f/b8ed140e-7839-47f3-88f8-d2ea888bd47b-hetufi.mp3"
  // ).then((res) => res.blob());
  // const urlFile = new File([filse], "test.mp3", { type: "audio/mpeg" });
  // console.log(filse);
  // const transcription = await client.audio.translations.create({
  //   file: urlFile,
  //   model: "whisper-1",
  //   prompt: "Translate this text into english"
  // })

  const formdata = new FormData();
  formdata.append("file", file);
  formdata.append("model", model);
  // this prompt is optional and only supposed to be used if you want to translate the audio
  formdata.append("prompt", "Translate this text into english");

  // or we can transcribe like this if we want to upload a file from frontend
  const transcription = await client.audio.translations.create({
    file: file,
    model: "whisper-1",
    // this prompt is optional and only supposed to be used if you want to translate the audio
    // prompt: "Translate this text into english"
  })

  // and this is an equivalent way to call the api
  // const transcription = await fetch("https://api.openai.com/v1/audio/transcriptions", {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${API_KEY}`,
  //   },
  //   body: formdata,
  // })
  console.log(transcription.text)
  return NextResponse.json({ message: "sucess from hello" }, { status: 200 });
}
