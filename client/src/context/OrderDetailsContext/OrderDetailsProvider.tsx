import { FC, useState } from "react";
import { itemDetailsInterface, OrderDetailsContextInterface } from "../../types/order";
import { OrderDetailsContext } from "./OrderDetailsContext";
import { ItemApi, RestaurantApi } from "../../types/api";

export const OrderDetailsProvider: FC<{children: JSX.Element[] | JSX.Element}> = ({ children }) => {
    const [orderItems, setOrderItems] = useState<itemDetailsInterface[]>([]);

    const addToOrder = (amount: number, item: ItemApi, restaurant: RestaurantApi): void => {
        setOrderItems([
            ...orderItems,
            { orderItemId: orderItems.length, amount, item, restaurant }
        ])
    }

    const removeFromOrder = (orderItemId: number) => {
        setOrderItems([
            ...orderItems.filter((orderItem) => orderItem.orderItemId !== orderItemId)
        ]);
    }

    const changeOrderItems = (orderItems: itemDetailsInterface[]) => 
        setOrderItems(orderItems);

    const GridProviderValue: OrderDetailsContextInterface = {
        orderItems,
        changeOrderItems,
        addToOrder,
        removeFromOrder
    };

    return (
        <OrderDetailsContext.Provider value={GridProviderValue}>
            {children}
        </OrderDetailsContext.Provider>
    )
}