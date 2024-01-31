'use client'
import { useState } from "react";
const Hello = () => {
  const [text, setText] = useState<string>("");
  const handleSubmit = () => {
    const file = document.getElementById("file") as HTMLInputElement;
    const formData = new FormData();
    if(file.files == null) return
    formData.append("file", file.files[0]);
    formData.append("model", "whisper-1")
    const res = fetch("https://transcriptor-nine.vercel.app/api/transcriber_base", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => setText(res.message));
  }
  return (
    <div>
      <input type="file" name="file" id="file" />
      <button type="submit" onClick={handleSubmit}>submit</button>
      <p>{text}</p>
    </div>
  );
};

export default Hello;
