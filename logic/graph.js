const graph = require("../listOfFollowers.json");
const nodes = Object.keys(graph);

class Graph {
  static getNeighbors(node) {
    return graph[node];
  }

  static dfsStackOrder(node, visited, stack) {
    // Mark as visited
    visited.push(node);
    // Get neighbors and iterate
    this.getNeighbors(node).forEach((neighbor) => {
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

    // Get neighbors and iterate
    this.getNeighbors(node).forEach((neighbor) => {
      const isVisited = visited.includes(neighbor);
      if (!isVisited) {
        this.dfsMakeSCC(neighbor, visited, component);
      }
    });
  }

  static getStackOrder() {
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
    // Make mount stack sequence of nodes
    const stack = this.getStackOrder();

    const SCC = [];
    const visited = [];

    while (stack.length) {
      // get top of stack
      const node = stack.pop();

      // looks for strongly connected components
      const isVisited = visited.includes(node);
      if (!isVisited) {
        const component = [];
        this.dfsMakeSCC(node, visited, component);
        SCC.push(component);
      }
    }

    return SCC;
  }
}

const main = () => {
  const SCC = Graph.getSCC();
  console.log(SCC);
};
main();
