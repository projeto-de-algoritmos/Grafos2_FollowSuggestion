import { Graph, inverseGraph } from './graph';
const SCC = Graph.getSCC();

const suggestion = (login) => {
  const scc = SCC.find((component) => component.includes(login)) ?? [];
  const suggestion = scc.filter((user) => user !== login);

  const noFollowYet = suggestion.filter((user) => {
    const isFollowed = Graph.getNeighbors(inverseGraph, login).includes(user);
    return !isFollowed;
  });
  
  return noFollowYet;
}

export default suggestion;