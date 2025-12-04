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
    reducer: (currentOutput, newOutput) => [...currentOutput, ...newOutput],//currentOutput.concat(newOutput),
    default: () => [],
  })
});

// função que altera o estado 
function mockAction(state: typeof State) {
  return {
    output: [new AIMessage("Olá da AI")],
  };
}

function mockAction2(state: typeof State) {
  return {
    output: [new HumanMessage("Olá do Humano")],
  };
}

const graph = new StateGraph(State)
  .addNode("augusto", mockAction)
  .addNode("brenda", mockAction2)
  .addEdge(START, "augusto")
  .addEdge("augusto", "brenda")
  .addEdge("brenda", END)
  .compile()

const result = await graph.invoke({
  input: new HumanMessage("Início da E aí!"),
})


const drawableGraph = await graph.getGraphAsync()
const graphImage = await drawableGraph.drawMermaidPng()

const graphArrayBuffer = await graphImage.arrayBuffer()

fs.writeFileSync("./graph.png", Buffer.from(graphArrayBuffer));
// OU
// fs.writeFileSync("./graph.png", new Uint8Array(graphArrayBuffer));
console.log(graphArrayBuffer);