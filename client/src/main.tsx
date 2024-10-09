import "./main.css";
import "@fontsource/heebo";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GridProvider } from "./context/GridContext";
import { SelectedRestaurantProvider } from "./context/SelectedRestaurantContext/SelectedRestaurantProvider";
import { OrderDetailsProvider } from "./context/OrderDetailsContext/OrderDetailsProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GridProvider>
      <SelectedRestaurantProvider>
        <OrderDetailsProvider>
          <App />
        </OrderDetailsProvider>
      </SelectedRestaurantProvider>
    </GridProvider>
  </StrictMode>
);
