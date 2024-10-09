import { FC, useState } from "react";
import { SelectedRestaurantContextInterface } from "../../types/restaurant";
import { SelectedRestaurantContext } from "./SelectedRestaurantContext";
import { RestaurantApi } from "../../types/api";

export const SelectedRestaurantProvider: FC<{children: JSX.Element[] | JSX.Element}> = ({ children }) => {
    const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantApi | null>(null);

    const changeSelectedRestaurant = (restaurant: RestaurantApi | null) => setSelectedRestaurant(restaurant);

    const GridProviderValue: SelectedRestaurantContextInterface = {
        selectedRestaurant,
        changeSelectedRestaurant,
    };

    return (
        <SelectedRestaurantContext.Provider value={GridProviderValue}>
            {children}
        </SelectedRestaurantContext.Provider>
    )
}