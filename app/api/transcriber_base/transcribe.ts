import client from "./client";

const transcription = async (audioFile: File) => {
  const transcript = await client.audio.transcriptions.create({
    file: audioFile,
    model: "whisper-1"
  })

  return transcript
};

export default transcription;
