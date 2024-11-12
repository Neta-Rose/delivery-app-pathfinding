import { Grid } from "../../components/Grid";
import { useState } from "react";
import { useSettingsContext } from "../../context/SettingsContext/SettingsContext";
import { Menu } from "../../components/Menu";
import { Sidebar } from "../../components/Sidebar";

export const OrderPage = () => {
  const { selectedAlgorithm, selectedSpeed } = useSettingsContext();
  const [showMenuModal, setShowMenuModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setShowMenuModal(true);
  };

  const handleCloseModal = () => {
    setShowMenuModal(false);
  };

  return (
    <div className="order-page-container d-flex">
      <div className="main-content flex-grow-1">
        <Grid onRestaurantClick={handleOpenModal} />
      </div>

      <Sidebar />

      <Menu
        selectedAlgorithm={selectedAlgorithm}
        visualizationSpeed={selectedSpeed}
        showModal={showMenuModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};
