import { DeliveryManApi, RestaurantApi, PersonApi } from "./api";
// import { Restaurant } from "./restaurant";

interface Point {
    restaurant?: RestaurantApi;
    user?: PersonApi;
    deliveryMan?: DeliveryManApi;
    isWall: boolean;
    isPath: boolean;
    isVisited: boolean;
    column: number;
    row: number;
}

type GridInterface = Point[][]

interface GridContextInterface {
    grid: GridInterface | null;
    changeGrid: (grid: GridInterface) => void;
}

export type {
    Point,
    GridContextInterface,
    GridInterface
}