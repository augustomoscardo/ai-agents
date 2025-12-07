import { Annotation, StateGraph, START, END } from "@langchain/langgraph"
import { BaseMessage, AIMessage, HumanMessage } from "@langchain/core/messages"
import fs from "fs"

const State = Annotation.Root({
  input: Annotation<HumanMessage>,
  executedNodes: Annotation<number>({
    reducer: (currentExecuted, newExecution) => currentExecuted + 1,
    default: () => 0
  }),
  output: Annotation<BaseMessage[]>({
    reducer: (currentOutput, newOutput) => [...currentOutput, ...newOutput],
    default: () => [],
  })
});

// função que altera o estado 
function mockAction(state: typeof State) {
  return {
    executedNodes: 1,
    output: [new AIMessage("Olá da AI")],
  };
}

const graph = new StateGraph(State)
  .addNode("augusto", mockAction)
  .addEdge(START, "augusto")
  .addEdge("augusto", END)
  .compile()

const result = await graph.invoke({
  input: new HumanMessage("E aí!"),
})

console.log(result);

const drawableGraph = await graph.getGraphAsync()
const graphImage = await drawableGraph.drawMermaidPng()

const graphArrayBuffer = await graphImage.arrayBuffer()

fs.writeFileSync("./graph.png", Buffer.from(graphArrayBuffer));
// OU
// fs.writeFileSync("./graph.png", new Uint8Array(graphArrayBuffer));
console.log(graphArrayBuffer);