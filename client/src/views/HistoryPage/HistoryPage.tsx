import { useEffect, useState } from "react";
import api from "../../api/api";
import { OrderApi } from "../../types/api";

export const HistoryPage = () => {
    const [orders, setOrders] = useState<OrderApi[] | null>(null);

    const fetchOrders = async () => {
        const orders: OrderApi[] = await api.order().getAll()
        setOrders(orders);
        console.log(orders)
    }

    useEffect(() => {
        fetchOrders();
    }, [])
    
    return (
        <div className="m-5">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Status</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Items</th>
                        <th scope="col">Delivery Man's Name</th>
                        <th scope="col">Restaurant's Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">#</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((order, index) => (
                        <tr>
                            {order.status ? <td>Accepted</td> : <td>Denied</td>}
                            <td>{order.price}$</td>
                            <td className="d-flex flex-column">
                                {order.items.map((item, index) => (
                                    <span key={index}>{item.name}</span>
                                ))}
                            </td>
                            <td>{order.deliveryMan.personDetails.name}</td>
                            <td>{order.restaurant.name}</td>
                            <td>{order.date.substring(0, 10)}</td>
                            <th scope="row">{index + 1}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
