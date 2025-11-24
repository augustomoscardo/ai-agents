import { GoogleGenAI } from "@google/genai"
import { config } from "dotenv"
import { allFunctions as calendarFunctions } from "./tools/calendar.js";
import { allFunctions as emailFunctions } from "./tools/email.js";

config()

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
})

// nova lista com todas as funções
const allFunctions = calendarFunctions.concat(emailFunctions);

const contents = [
  {
    role: "user",
    parts: [
      { text: "Mande uma mensagem bonita de aniversário para minha mãe. O contato é mãe. Gere uma mensagem aleatória e bonita" }
    ]
  }
]

let response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: contents,
  config: {
    tools: [
      {
        functionDeclarations: allFunctions,
      }
    ]
  }
})

console.log(response.candidates[0].content.parts[0]);

// contents.push(response.candidates[0].content)

// contents.push({
//   role: "user",
//   parts: [
//     {
//       functionResponse: {
//         name: "getTodayDate",
//         response: {
//           result: "2025-11-24"
//         }
//       }
//     }
//   ]
// })

// response = await ai.models.generateContent({
//   model: "gemini-2.5-flash",
//   contents: contents,
// });

// console.log(response.candidates[0].content);