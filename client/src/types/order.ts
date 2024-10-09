import { ItemApi, RestaurantApi } from "./api";

interface OrderDetailsContextInterface {
    orderItems: itemDetailsInterface[] | null;
    changeOrderItems: (orderItems: itemDetailsInterface[]) => void;
    addToOrder: (amount: number, item: ItemApi, restaurant: RestaurantApi) => void;
    removeFromOrder: (orderItemId: number) => void;
}

interface itemDetailsInterface {
    restaurant: RestaurantApi;
    orderItemId: number;
    amount: number;
    item: ItemApi;
}

export type {
    OrderDetailsContextInterface,
    itemDetailsInterface
}