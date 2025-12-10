import { HumanMessage, SystemMessage } from "@langchain/core/messages"
import { State } from "./state.js";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ai } from "./google_genai.js";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

const sendEmail = new DynamicStructuredTool({
  name: "send_email",
  description: "Envia um email para o usuário.",
  schema: z.object({
    emailContent: z.string().describe("O conteúdo do email a ser enviado ao usuário.")
  }),
  func: async ({ emailContent }) => {
    console.log("Enviando email para o usuário...");
    console.log(emailContent);

    return "Email enviado com sucesso.";
  }
})

const agent = createReactAgent({
  llm: ai,
  tools: [sendEmail],
  prompt: new SystemMessage(
    "Você é um secretário de um consultório, responsável por enviar comunicações para os clientes" +
    "Apenas envie um e-mail, não espere nenhuma confirmação do usuário." +
    "Sumarize toda a conversa e todas as ações que foram feitas e envie um e-mail para o cliente"
  )
})

export async function commsSpecialist(state: typeof State.State) {
  console.log(`Comms Specialist chamado!`);

  const result = await agent.invoke(state)

  const response = result.messages[result.messages.length - 1]?.content;

  return {
    messages: [new HumanMessage({
      content: `Comms Specialist: ${response || ""}`
    })],
  };
}