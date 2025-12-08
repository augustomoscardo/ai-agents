import { HumanMessage } from "@langchain/core/messages"
import type { State } from "./state.js";

export function financialSpecialist(state: typeof State.State) {
  console.log(`Financial Specialist chamado!`);

  return {
    messages: [new HumanMessage("Aqui está sua conta: R$300,00. Pode terminar")],
  };
}