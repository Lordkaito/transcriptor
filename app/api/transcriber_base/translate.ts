import client from "./client";

const translate = async (transcriptedText: string) => {
  const translation = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{role: "system", content: "You are a helpful agent that will help me translate text from any language to english"}, {role: "user", content: `translate this text into english and correct any misspelling it may have: ${transcriptedText}`}]
  })

  return translation.choices[0].message.content
}

export default translate;