"use client";
import { useState } from "react";
import { Button } from "@nextui-org/react";
const Transcript = () => {
  const environment = process.env.NODE_ENV;
  let MAIN_URL = "";
  if (environment === "development") MAIN_URL = "http://localhost:3000";
  if (environment === "production")
    MAIN_URL = "https://transcriptor-nine.vercel.app";
  const [text, setText] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = () => {
    const file = document.getElementById("file") as HTMLInputElement;
    const formData = new FormData();
    if (file.files == null) return;
    setLoading(true);
    formData.append("file", file.files[0]);
    formData.append("model", "whisper-1");
    const res = fetch(`${MAIN_URL}/api/transcriber_base`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setText(res.message);
        setTranslation(res.translation);
        setLoading(false);
      });
  };
  return (
    <div className="h-[100dvh] pt-4 flex flex-col content-center text-xl">
      <div className="flex gap-4 justify-center content-center h-fit">
        <input type="file" name="file" id="file" />
        {/* <button type="submit" disabled={loading} onClick={handleSubmit}>
        submit
      </button> */}
        <Button
          color="primary"
          type="submit"
          onClick={handleSubmit}
          isLoading={loading}
          disabled={loading}
        >
          Submit
        </Button>
      </div>
      <div className="px-4 flex gap-2">
        <div>
          <span className="text-green-500">
            {text !== "" ? "Transcription" : ""}
          </span>
          <p>{text}</p>
        </div>
        <div>
          <span className="text-green-500">
            {translation !== "" ? "Translation" : ""}
          </span>
          <p>{translation}</p>
        </div>
      </div>
    </div>
  );
};

export default Transcript;
