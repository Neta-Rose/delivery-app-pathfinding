import { useContext } from "react";
import { SelectedRestaurantContext } from "../context/SelectedRestaurantContext/SelectedRestaurantContext";

export const useSelectedRestaurant = () => {
    const selectedRestaurantContext = useContext(SelectedRestaurantContext);

    if(!selectedRestaurantContext) {
        throw new Error("cant use restaurant context outside of restaurant provider")
    }

    return selectedRestaurantContext;
}