import { User } from "./node";
import { DeliveryMan } from "./typeORM/DeliveryMan.entity";

export type Tile = {
    restaurant?: RestaurantApi;
    user?: User;
    deliveryMan?: DeliveryMan;
    isWall: boolean;
    isPath: boolean;
    isVisited: boolean;
    column: number;
    row: number;
}

export type RestaurantApi = {
    id: number;
    location: {
        x: number,
        y: number,
    };
    name: string;
    phone: string;
}

export type Grid = Tile[][]