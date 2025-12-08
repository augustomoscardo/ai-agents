import { AIMessage } from "@langchain/core/messages"
import type { State } from "./state.js";

export function commsSpecialist(state: typeof State.State) {
  console.log(`Comms Specialist chamado!`);
  
  return {
    executedNodes: 1,
    output: [new AIMessage("Olá da AI")],
  };
}