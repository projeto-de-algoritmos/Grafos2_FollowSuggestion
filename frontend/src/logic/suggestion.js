import { Graph, inverseGraph } from './graph';
const SCC = Graph.getSCC();

const suggestion = (login) => {
  const scc = SCC.find((component) => component.includes(login)) ?? [];
  const suggestion = scc.filter((componentLogin) => componentLogin !== login);

  const noFollowYet = suggestion.filter((componentLogin) => {
    if(componentLogin === login) return false;
    const isFollowed = Graph.getNeighbors(inverseGraph, login).includes(componentLogin);
    return !isFollowed;
  });
  
  return noFollowYet;
}

export default suggestion;