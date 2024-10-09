import { createContext } from "react";
import { SelectedRestaurantContextInterface } from "../../types/restaurant";

export const SelectedRestaurantContext = 
    createContext<SelectedRestaurantContextInterface | null>(null);