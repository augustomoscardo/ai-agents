import { AIMessage } from "@langchain/core/messages"
import type { State } from "./state.js";

export function financialSpecialist(state: typeof State.State) {
  console.log(`Financial Specialist chamado!`);
  
  return {
    executedNodes: 1,
    output: [new AIMessage("Olá da AI")],
  };
}