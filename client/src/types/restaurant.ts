import { RestaurantApi } from "./api";

interface SelectedRestaurantContextInterface {
    selectedRestaurant: RestaurantApi | null;
    changeSelectedRestaurant: (restaurant: RestaurantApi | null) => void;
}

export type {
    SelectedRestaurantContextInterface
}