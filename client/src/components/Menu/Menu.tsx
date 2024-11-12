import { FC, useEffect, useState } from "react";
import { useSelectedRestaurant } from "../../hooks/useSelectedRestaurantContext";
import { MenuApi } from "../../types/api";
import api from "../../api/api";
import { MenuItem } from "../MenuItem";
import { useOrderDetailsContext } from "../../hooks/useOrderDetails";
import { OrderItem } from "../OrderItem";
import { Point } from "../../types/grid";
import { useGridContext } from "../../hooks/useGridContext";
import { placeOrderHelper } from "../../utils/helpers";
import { AlgorithmName } from "../../types/algorithms";
import { SyncLoader } from "react-spinners";

interface MenuProps {
  selectedAlgorithm: AlgorithmName;
  visualizationSpeed: string;
  showModal: boolean;
  handleCloseModal: () => void;
}

export const Menu: FC<MenuProps> = ({
  selectedAlgorithm,
  visualizationSpeed,
  showModal,
  handleCloseModal,
}) => {
  const { selectedRestaurant } = useSelectedRestaurant();
  const [menu, setMenu] = useState<MenuApi | null>(null);
  const { orderItems, changeOrderItems } = useOrderDetailsContext();
  const { grid, changeGrid } = useGridContext();
  const [, setSelectedDeliveryMan] = useState<null | Point>(null);

  const placeOrderOnClick = () => {
    if (orderItems!.length <= 0) {
      alert("Menu is empty!");
      return;
    }

    if (grid && selectedRestaurant && orderItems) {
      placeOrderHelper(
        grid,
        changeGrid,
        selectedRestaurant,
        orderItems,
        selectedAlgorithm,
        setSelectedDeliveryMan,
        visualizationSpeed
      );
    }
  };

  const fetchMenu = async (restaurantId: number) => {
    const menu: MenuApi = await api.menus().getMenuByRestaurantId(restaurantId);
    setMenu(menu);
  };

  useEffect(() => {
    if (selectedRestaurant) fetchMenu(selectedRestaurant!.id);
    changeOrderItems([]);
  }, [selectedRestaurant]);

  return (
    <div
      className={`modal fade ${showModal ? "show d-block" : ""}`}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="menuModalLabel"
      aria-hidden={!showModal}
      style={{ backgroundColor: showModal ? "rgba(0,0,0,0.5)" : "transparent" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="menuModalLabel">
              {menu?.name}
            </h5>
            <button
              type="button"
              className="close"
              onClick={() => {
                handleCloseModal();
                setMenu(null);
              }}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {menu ? (
                selectedRestaurant ? (
                    <>
                      {menu?.items.map((item, index) => (
                        <MenuItem key={`item-${index}`} item={item} />
                      ))}
                      {orderItems?.map((orderItem, index) => (
                        <OrderItem key={`order-item-${index}`} orderItem={orderItem} />
                      ))}
                    </>
                  ) : (
                    <h4>No Restaurant Was Chosen</h4>
                  )
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <SyncLoader />
                </div>
            )}
          </div>
          <div className="modal-footer">
            <button onClick={() => {
                placeOrderOnClick();
                handleCloseModal();
                setMenu(null);
            }} className="btn btn-success">
              Order
            </button>
            <button onClick={() => changeOrderItems([])} className="btn btn-danger">
              Clear All
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                handleCloseModal();
                setMenu(null);
              }
            }
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
