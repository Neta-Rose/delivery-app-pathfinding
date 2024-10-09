import { FC, useEffect, useState } from "react";
import { useSelectedRestaurant } from "../../hooks/useSelectedRestaurantContext";
import { MenuApi } from "../../types/api";
import api from "../../api/api";
import { MenuItem } from "../MenuItem";
import { useOrderDetailsContext } from "../../hooks/useOrderDetails";
import { OrderItem } from "../OrderItem";
import { Point } from "../../types/grid";
import { AlgorithmName } from "../../types/algorithms";
import { useGridContext } from "../../hooks/useGridContext";
import { placeOrderHelper } from "../../utils/helpers";

interface MenuProps {
    selectedAlgorithm: AlgorithmName;
}

export const Menu: FC<MenuProps> = ({ selectedAlgorithm }) => {
    const { selectedRestaurant } = useSelectedRestaurant();
    const [menu, setMenu] = useState<MenuApi | null>(null);
    const { orderItems, changeOrderItems } = useOrderDetailsContext();
    const { grid, changeGrid } = useGridContext();
    const [, setSelectedDeliveryMan] = useState<null | Point>(null);

    const placeOrderOnClick = () => {
        if(orderItems!.length <= 0) {
            alert('Menu is empty!');
            return;
        }

        if(grid && selectedRestaurant && orderItems) {
            placeOrderHelper(
                grid, changeGrid, selectedRestaurant, orderItems, selectedAlgorithm, setSelectedDeliveryMan
            )
        }
    }

    const fetchMenu = async (restaurantId: number) => {
        const menu: MenuApi = await api.menus().getMenuByRestaurantId(restaurantId);
        setMenu(menu);
    }
    
    useEffect(() => {  
        try {
            if(selectedRestaurant)
                fetchMenu(selectedRestaurant!.id)
        } catch(error) {
            console.log(error);
        }
        
        changeOrderItems([]);
    }, [selectedRestaurant]);

    const styles = {
        menu: {
            marginTop: '1rem',
            width: '20rem',
            backgroundColor: '#d6d6d6',
            padding: '8px',
            borderRadius: '5px',
        },
        description: {
            width: '13rem',
        },
        menuButtons: {
            borderRadius: '50%',
            width: '2rem',
            height: '2rem',
            text: 'center',
            margin: '1rem'
        }
    }

    return (
        <div>
            {selectedRestaurant ? 
                <div style={styles.menu} className="d-flex flex-column justify-content-md-center">
                    <h1 className="mb-3 text-center border-bottom border-secondary">{menu?.name}</h1>
                    {menu?.items.map((item, index) => ( <MenuItem key={`item-${index}`} item={item}/> ))}
                    {orderItems?.map((orderItem, index) => ( <OrderItem key={`order-item-${index}`} orderItem={orderItem} />))}
                    <div className="d-flex flex-row justify-content-between mt-2">
                        <button onClick={() => placeOrderOnClick()} className="btn btn-success">Order</button>
                        <button onClick={() => changeOrderItems([])} className="btn btn-danger">Clear All</button>
                    </div>
                </div> 
                : 
                <h4>
                    No Restaurant Was Chosen 
                </h4>
            }
        </div>
    );
};
