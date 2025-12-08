import { AIMessage } from "@langchain/core/messages"
import type { State } from "./state.js";

export function schedulingSpecialist(state: typeof State.State) {
  console.log(`Scheduling Specialist chamado!`);

  return {
    messages: [new AIMessage("Olá da AI")],
  };
}