'use client'
const Hello = () => {
  const handleSubmit = () => {
    const file = document.getElementById("file") as HTMLInputElement;
    const formData = new FormData();
    if(file.files == null) return
    formData.append("file", file.files[0]);
    formData.append("model", "whisper-1")
    const res = fetch("http://localhost:3000/api/transcriber_base", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }
  return (
    <div>
      <input type="file" name="file" id="file" />
      <button type="submit" onClick={handleSubmit}>submit</button>
    </div>
  );
};

export default Hello;
