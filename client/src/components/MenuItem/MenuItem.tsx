import { FC, useEffect, useState } from "react";
import { ItemApi } from "../../types/api";
import { useSelectedRestaurant } from "../../hooks/useSelectedRestaurantContext";
import { useOrderDetailsContext } from "../../hooks/useOrderDetails";

interface MenuItemProps {
    item: ItemApi;
}

export const MenuItem: FC<MenuItemProps> = ({ item }) => {
    const [showingDetails, setShowingDetails] = useState<boolean>(false);
    const [amount, setAmount] = useState(0);
    const { selectedRestaurant } = useSelectedRestaurant();
    const { addToOrder } = useOrderDetailsContext();
    
    useEffect(() => {
        setAmount(0);
        setShowingDetails(false);
    }, [selectedRestaurant])

    const addToOrderButtonFunction = (amount: number) => {
        if(amount > 0) {
            addToOrder(amount, item, selectedRestaurant!); 
            setShowingDetails(false);
            setAmount(0);
        }
    }

    return (
        <div className="d-flex flex-column">
            <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-column">
                    <span>{item.price}$</span>
                    {showingDetails ? 
                    <i className="bi bi-chevron-up" onClick={() => setShowingDetails(!showingDetails)}></i>
                    :
                    <i className="bi bi-chevron-down" onClick={() => setShowingDetails(!showingDetails)}></i>}
                    
                </div>
                <div className="d-flex flex-column">
                    <h4>{item.name}</h4>
                    <p className="mr-auto" style={styles.description}>{item.description}</p>
                </div>
            </div>
            {showingDetails && 
             <>
                <div className="d-flex flex-row justify-content-between mb-3">
                    <div>
                        <button style={styles.menuRightButton} onClick={() => setAmount(amount + 1)}>+</button>
                        <input className="text-center" value={amount} id={`input-${item.id}`} style={styles.input}></input>
                        <button style={styles.menuLeftButton} onClick={() => amount > 0 && setAmount(amount - 1)}>-</button>
                    </div>
                    <button onClick={() => addToOrderButtonFunction(amount)}>Add</button>
                </div>
            </>}
        </div>
    );
};

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
    menuRightButton: {
        borderRadius: '50%',
        width: '2rem',
        height: '2rem',
        text: 'center',
        marginLeft: '1rem'
    },
    menuLeftButton: {
        borderRadius: '50%',
        width: '2rem',
        height: '2rem',
        text: 'center',
        marginRight: '1rem'
    },
    input: {
        height: '2rem',
        borderRadius: '5px',
        width: '3rem',
    },
    orderButton: {
        
    }
}
