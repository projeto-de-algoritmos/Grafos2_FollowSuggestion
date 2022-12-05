import graph from "./listOfFollowers.json";
const nodes = Object.keys(graph);

const getinverseGraph = () => { 
  const inverse = {};
  for (const key in graph) {
    inverse[key] = [];
  }
  for (const key in graph) {
    for (const follower of graph[key]) {
      inverse[follower].push(key);
    }
  }
  return inverse;
};

const inverseGraph = getinverseGraph();
class Graph {
  static getNeighbors(graph, node) {
    return graph[node];
  }

  static dfsStackOrder(node, visited, stack) {
    // Mark as visited
    visited.push(node);
    // Get neighbors and iterate in graph
    this.getNeighbors(graph, node).forEach((neighbor) => {
      const isVisited = visited.includes(neighbor);
      if (!isVisited) {
        this.dfsStackOrder(neighbor, visited, stack);
      }
    });

    // Push to stack
    stack.push(node);
  }

  static dfsMakeSCC(node, visited, component) {
    // Mark as visited
    visited.push(node);

    // Add to current component
    component.push(node);

    // Get neighbors and iterate in inverse graph
    this.getNeighbors(inverseGraph, node).forEach((neighbor) => {
      const isVisited = visited.includes(neighbor);
      if (!isVisited) {
        this.dfsMakeSCC(neighbor, visited, component);
      }
    });
  }

  static getStackOrder() {
    // stack and visited stores
    const stack = [];
    const visited = [];
    nodes.forEach((node) => {
      const isVisited = visited.includes(node);
      if (!isVisited) {
        this.dfsStackOrder(node, visited, stack);
      }
    });

    return stack;
  }

  // SCC algorithm
  static getSCC() {
    // fill order
    const stack = this.getStackOrder();

    // SCC and visited stores
    const scc = [];
    const visited = [];

    while (stack.length) {
      // get top of stack
      const node = stack.pop();

      // looks for strongly connected components
      const isVisited = visited.includes(node);
      if (!isVisited) {
        const component = [];
        this.dfsMakeSCC(node, visited, component);
        scc.push(component);
      }
    }

    return scc;
  }
}

export {Graph, inverseGraph};