import { Graph, inverseGraph } from "./graph";
const SCC = Graph.getSCC();

const suggestion = (login) => {
  // Encontra o component do usuário
  const scc = SCC.find((component) => component.includes(login)) ?? [];

  // Encontra os usuários que não são seguidos pelo usuário solicitado
  const noFollowYet = scc.filter((componentLogin) => {
    if (componentLogin === login) return false;
    const isFollowed = Graph.getNeighbors(inverseGraph, login).includes(
      componentLogin
    );
    return !isFollowed;
  });

  return noFollowYet;
};

export default suggestion;
