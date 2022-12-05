import { graph, inverseGraph } from "./graph";

export const edges = (login, type) => {
  if ("Seguidores" === type) return graph[login] ?? [];
  return inverseGraph[login] ?? [];
};
