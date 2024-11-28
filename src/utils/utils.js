export const sleep = (speed) => {
  return new Promise(resolve => setTimeout(resolve, 75 / speed));
}

export const showSolution = async (node) => {
  let parent = node.parent;
  while (parent !== undefined) {
    await sleep();
    parent.solution = true;
    parent = parent.parent;
  }
}

export const getNodeNeighbours = (node, gridSize, cellList) => {
  const [x, y] = [node.x, node.y];
  let nodeToAdd = undefined;
  let neighbours = [];

  for (let i=x-1; i<=x+1; i++) {
    for (let j=y-1; j<=y+1; j++) {
      if (i===x && j===y) continue;
      if (i<0 || j<0) continue; // TODO: add outer bounds
      if (i>=gridSize || j >= gridSize) continue;

      nodeToAdd = cellList[i][j];
      if (nodeToAdd) neighbours.push(nodeToAdd);
    }
  }

  return neighbours;
}

export const getDistance = (nodeA, nodeB) => {
  return Math.sqrt(Math.pow(nodeB.x - nodeA.x, 2) + Math.pow(nodeB.y - nodeA.y, 2));
}

export const compareNodes = (nodeA, nodeB) => {
  if (nodeA.heuristique < nodeB.heuristique) {
    return 1;
  } else if (nodeA.heuristique === nodeB.heuristique) {
    return 0;
  } else {
    return -1;
  }
}
