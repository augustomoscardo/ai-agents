import { ai } from "./google_genai.js";
import { State } from "./state.js";
import { z } from "zod"

const routingTool = {
  name: "routingTool",
  description: "Selecione o próximo estado.",
  schema: z.object({
    next: z.enum(["financial_specialist", "scheduling_specialist", "comms_specialist", "END"])
  })
}

// função que altera o estado 
export async function supervisor(state: typeof State.State) {
  console.log('Supervisor escolhendo o próximo especialista');

  const aiWithTool = ai.bindTools([routingTool], {
    tool_choice: "routingTool"
  })

  const aiResponse = await aiWithTool.invoke(`
    Não preciso de mais nada, termine.
    Escolha um desses próximos estados: financial_specialist, scheduling_specialist, comms_specialist, END.
    Retorne APENAS o nome do especialista e nada mais. Sem quebra de linha
  `)

  if (aiResponse.tool_calls) {
    return {
      nextNode: aiResponse.tool_calls[0]?.args.next
    } 
  } else {

    return {
      nextNode: "END"
    }
  }
}