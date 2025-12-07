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
function supervisor(state: typeof State.State) {
  console.log(`Supervisor escolhendo próximo especialista...`);
  
  return {
    output: [new AIMessage("Olá da AI")],
  };
}

function financialSpecialist(state: typeof State.State) {
  console.log(`Financial Specialist chamado!`);
  
  return {
    executedNodes: 1,
    output: [new AIMessage("Olá da AI")],
  };
}

function schedulingSpecialist(state: typeof State.State) {
  console.log(`Scheduling Specialist chamado!`);
  
  return {
    executedNodes: 1,
    output: [new AIMessage("Olá da AI")],
  };
}

function commsSpecialist(state: typeof State.State) {
  console.log(`Comms Specialist chamado!`);
  
  return {
    executedNodes: 1,
    output: [new AIMessage("Olá da AI")],
  };
}

const graph = new StateGraph(State)
  .addNode("supervisor", supervisor)
  .addNode("financial_specialist", financialSpecialist)
  .addNode("scheduling_specialist", schedulingSpecialist)
  .addNode("comms_specialist", commsSpecialist)
  .addEdge(START, "supervisor")
  .addConditionalEdges("supervisor", (state: typeof State.State) => {
      if(state.executedNodes == 0) {
          return "financial_specialist";
      }else if(state.executedNodes == 1){
          return "scheduling_specialist";
      }else if(state.executedNodes == 2){
          return "comms_specialist";
      }else{
          return "END";
      }
  })
  .addEdge("financial_specialist", "supervisor")
  .addEdge("scheduling_specialist", "supervisor")
  .addEdge("comms_specialist", "supervisor")
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