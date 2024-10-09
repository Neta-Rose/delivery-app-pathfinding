import { createContext } from "react";
import { OrderDetailsContextInterface } from "../../types/order";

export const OrderDetailsContext = 
    createContext<OrderDetailsContextInterface | null>(null);