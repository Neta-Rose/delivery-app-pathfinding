import { Node } from '../../entities/node';
import { MinPriorityQueue } from '../data structures';

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

// export function dijkstra(
//   nodeArray: Node[][],
//   start: Node,
//   goals: Node[]
// ): [[number, number][], [number, number][], Node | null] {
//   const rows = nodeArray.length;
//   const cols = nodeArray[0].length;

//   const directions: [number, number][] = [
//     [0, 1],
//     [1, 0],
//     [0, -1],
//     [-1, 0], 
//   ];

//   for (const row of nodeArray) {
//     for (const node of row) {
//       node.cost = Infinity;
//     }
//   }

//   start.cost = 0;

//   const goalPositions = new Set(goals.map((goal) => pointToString(goal.point)));

//   const minHeap = new MinPriorityQueue<Node>((node) => node.cost);

//   minHeap.enqueue(start);

//   const predecessors: Map<string, [number, number]> = new Map();
//   const visitedNodes: [number, number][] = [];

//   let finalNode: Node | null = null;

//   while (!minHeap.isEmpty()) {
//     const current = minHeap.dequeue();

//     if (!current) break;

//     const currentKey = pointToString(current.point);

//     if (predecessors.has(currentKey) && currentKey !== pointToString(start.point)) {
//       continue;
//     }

//     visitedNodes.push(current.point);

//     if (goalPositions.has(currentKey)) {
//       finalNode = current;
//       break;
//     }

//     const [currentRow, currentCol] = current.point;

//     for (const [dr, dc] of directions) {
//       const nextRow = currentRow + dr;
//       const nextCol = currentCol + dc;

//       if (nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols) {
//         const nextNode = nodeArray[nextRow][nextCol];

//         if (nextNode.isWall || nextNode.restaurant !== undefined) continue;

//         const newCost = current.cost + 1;

//         if (newCost < nextNode.cost) {
//           nextNode.cost = newCost;
//           predecessors.set(pointToString(nextNode.point), current.point);
//           minHeap.enqueue(nextNode);
//         }
//       }
//     }
//   }

//   if (!finalNode) {
//     return [[], visitedNodes, null];
//   }

//   const path: [number, number][] = [];
//   let currentPoint = finalNode.point;

//   while (true) {
//     path.push(currentPoint);
//     const currentKey = pointToString(currentPoint);
//     const predecessorPoint = predecessors.get(currentKey);

//     if (!predecessorPoint) {
//       break;
//     }

//     currentPoint = predecessorPoint;
//   }

//   path.reverse();

//   return [path, visitedNodes, finalNode];
// }

// function pointToString(point: [number, number]): string {
//   return `${point[0]},${point[1]}`;
// }