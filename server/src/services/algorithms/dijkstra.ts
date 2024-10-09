import { Node } from '../../entities/node';

export function dijkstra(nodeArray: Node[][], start: Node, goals: Node[]): 
[[number, number][], [number, number][], Node] {
  const rows = nodeArray.length;
  const cols = nodeArray[0].length;
  const directions: [number, number][] = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  const startNode = start;
  const goalNodes = goals;
  let finalNode: Node | null = null;
  const minHeap: Node[] = [startNode];
  startNode.cost = 0;
  const predecessors: Map<string, [number, number] | null> = new Map();
  const visitedNodes: [number, number][] = [];

  const encodePoint = (p: [number, number]): string => `${p[0]},${p[1]}`;

  while (minHeap.length > 0) {
    minHeap.sort((a, b) => (a.cost ?? Infinity) - (b.cost ?? Infinity));
    const current = minHeap.shift()!;
    const [currentRow, currentCol] = current.point;
    visitedNodes.push(current.point);

    let toBreake: boolean = false;
    goalNodes.forEach((goalNode) => {
      if (encodePoint(current.point) === encodePoint(goalNode.point)) {
        toBreake = true;
        finalNode = goalNode;
      }
    })

    if(toBreake) break;

    for (const [dr, dc] of directions) {
      const nextRow = currentRow + dr;
      const nextCol = currentCol + dc;
      if (nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols) {
        const nextNode = nodeArray[nextRow][nextCol];
        if (!nextNode.isWall && nextNode.restaurant === undefined) {
          const newCost = (current.cost ?? 0) + 1;
          if (newCost < (nextNode.cost ?? Infinity)) {
            nextNode.cost = newCost;
            predecessors.set(encodePoint(nextNode.point), current.point);
            minHeap.push(nextNode);
          }
        }
      }
    }
  }

  if(!finalNode) {
    return [[], visitedNodes, null]
  }

  const path: [number, number][] = [];
  let step: [number, number] | null = finalNode.point;

  if(predecessors.get(encodePoint(step)) == null) {
    return [null, visitedNodes, finalNode]
  }

  while (step) {
    path.push(step);
    step = predecessors.get(encodePoint(step)) ?? null;
  }

  path.reverse();

  return [path, visitedNodes, finalNode];
}
