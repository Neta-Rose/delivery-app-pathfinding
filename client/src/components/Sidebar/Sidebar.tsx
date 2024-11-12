import { FC, useEffect, useState } from "react";
import { RestaurantApi } from "../../types/api";
import api from "../../api/api";
import { useSelectedRestaurant } from "../../hooks/useSelectedRestaurantContext";

import "./Sidebar.css";

export const Sidebar: FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantApi[]>([]);
  const { selectedRestaurant, changeSelectedRestaurant } = useSelectedRestaurant();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const fetchedRestaurants = await api.restaurants().getAll();
        setRestaurants(fetchedRestaurants);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleRestaurantClick = (restaurant: RestaurantApi) => {
    changeSelectedRestaurant(restaurant);
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Restaurants</h2>
      <ul className="restaurant-list">
        {restaurants.map((restaurant) => (
          <li
            key={restaurant.id}
            className={`restaurant-item ${
              selectedRestaurant?.id === restaurant.id ? "active" : ""
            }`}
            onClick={() => handleRestaurantClick(restaurant)}
          >
            <span className="restaurant-name">{restaurant.name}</span>
            <span className="restaurant-location">
              ({restaurant.location.x}, {restaurant.location.y})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
