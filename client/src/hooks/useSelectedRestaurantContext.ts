import { useContext } from "react";
import { SelectedRestaurantContext } from "../context/SelectedRestaurantContext/SelectedRestaurantContext";

export const useSelectedRestaurant = () => {
    const selectedRestaurantContext = useContext(SelectedRestaurantContext);

    if(!selectedRestaurantContext) {
        throw new Error("cant use grid context outside of grid provider")
    }

    return selectedRestaurantContext;
}