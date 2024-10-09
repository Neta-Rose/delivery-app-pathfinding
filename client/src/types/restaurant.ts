import { RestaurantApi } from "./api";

interface SelectedRestaurantContextInterface {
    selectedRestaurant: RestaurantApi | null;
    changeSelectedRestaurant: (restaurant: RestaurantApi) => void;
}

export type {
    SelectedRestaurantContextInterface
}