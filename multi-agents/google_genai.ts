import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

export const ai = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  apiKey: process.env.GOOGLE_GENAI_API_KEY || ""
})