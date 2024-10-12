export enum AlgorithmName {
    DIJKSTRA="dijkstra",
    ASTAR="astar",
}

export const VisualizationSpeeds = {
    fast: {
        visitedSpeed: 0,
        pathSpeed: 50,
        deliveryManSpeed: 100,
    },
    medium: {
        visitedSpeed: 50,
        pathSpeed: 100,
        deliveryManSpeed: 200,
    },
    slow: {
        visitedSpeed: 100,
        pathSpeed: 200,
        deliveryManSpeed: 300,
    },
}