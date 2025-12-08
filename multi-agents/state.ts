import { Annotation } from "@langchain/langgraph";
import { BaseMessage } from "@langchain/core/messages"


export const State = Annotation.Root({
  nextNode: Annotation<string>(),
  messages: Annotation<BaseMessage[]>({
    reducer: (currentOutput, newOutput) => [...currentOutput, ...newOutput],
    default: () => [],
  })
});