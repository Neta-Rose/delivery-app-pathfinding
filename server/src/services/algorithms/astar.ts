import { Node } from '../../entities/node';

export function astar(nodeArray: Node[][], start: Node, goal: Node): 
[[number, number][], [number, number][]] {
  const rows = nodeArray.length;
  const cols = nodeArray[0].length;
  const directions: [number, number][] = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  const openHeap: Node[] = [start];
  start.g = 0;
  start.h = heuristic(start.point, goal.point);
  const gCosts: Map<string, number> = new Map();
  const predecessors: Map<string, [number, number] | null> = new Map();
  const visitedNodes: [number, number][] = [];

  const skippingDeliveryMans: boolean = goal.user !== undefined;

  const encodePoint = (p: [number, number]): string => `${p[0]},${p[1]}`;

  while (openHeap.length > 0) {
    openHeap.sort((a, b) => (a.g ?? Infinity) + (a.h ?? Infinity) - ((b.g ?? Infinity) + (b.h ?? Infinity)));
    const current = openHeap.shift()!;
    visitedNodes.push(current.point);
    const [currentRow, currentCol] = current.point;

    if (encodePoint(current.point) === encodePoint(goal.point)) break;

    for (const [dr, dc] of directions) {
      const nextRow = currentRow + dr;
      const nextCol = currentCol + dc;
      if (nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols) {
        const nextNode = nodeArray[nextRow][nextCol];
        if (!nextNode.isWall && nextNode.restaurant === undefined) {
          if(skippingDeliveryMans && nextNode.deliveryMan !== undefined) break;
          const newG = (current.g ?? 0) + 1;
          if (newG < (nextNode.g ?? Infinity)) {
            nextNode.g = newG;
            nextNode.h = heuristic(nextNode.point, goal.point);
            predecessors.set(encodePoint(nextNode.point), current.point);
            openHeap.push(nextNode);
          }
        }
      }
    }
  }

  const path: [number, number][] = [];
  let step: [number, number] | null = goal.point;
  
  if(predecessors.get(encodePoint(step)) == null) {
    return [null, visitedNodes]
  }

  while (step) {
    path.push(step);
    step = predecessors.get(encodePoint(step)) ?? null;
  }

  path.reverse();

  return [path, visitedNodes];
}

function heuristic(a: [number, number], b: [number, number]): number {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}
