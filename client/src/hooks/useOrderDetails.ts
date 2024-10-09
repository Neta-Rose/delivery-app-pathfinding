import { useContext } from "react"
import { OrderDetailsContext } from "../context/OrderDetailsContext/OrderDetailsContext";

export const useOrderDetailsContext = () => {
    const orderDetailsContext = useContext(OrderDetailsContext);

    if(!orderDetailsContext) {
        throw new Error("cant use grid context outside of grid provider")
    }

    return orderDetailsContext;
}