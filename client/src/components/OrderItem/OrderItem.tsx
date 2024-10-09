import { FC } from "react";
import { itemDetailsInterface } from "../../types/order"
import { useOrderDetailsContext } from "../../hooks/useOrderDetails";

interface OrderItemProps {
    orderItem: itemDetailsInterface;
}

export const OrderItem: FC<OrderItemProps> = ({ orderItem }) => {
    const { removeFromOrder } = useOrderDetailsContext()

    return (
        <div className="border-top border-dark d-flex flex-row-reverse justify-content-between">
            <div className="d-flex flex-column">
                <span className="font-italic">:Dish Name</span>
                <span className="font-weight-bold">{orderItem.item.name}</span>
            </div>
            <div className="d-flex flex-column">
                <span className="font-italic">:Amont</span>
                <span className="font-weight-bold text-center">{orderItem.amount}</span>
            </div>
            <div className="d-flex flex-column">
                <span className="font-italic">:Total Price</span>
                <span className="font-weight-bold text-center">{orderItem.amount * orderItem.item.price}$</span>
            </div>
            <i onClick={() => removeFromOrder(orderItem.orderItemId)} className="bi bi-dash-circle"></i>
        </div>
    )
}