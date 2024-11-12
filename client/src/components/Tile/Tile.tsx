import { FC, useEffect, useState } from "react";
import { Point } from "../../types/grid";
import "./Tile.css";
import { useSelectedRestaurant } from "../../hooks/useSelectedRestaurantContext";

interface TileProps {
  point: Point;
  handleTileClick: (
    row: number,
    column: number,
    isRestaurant: boolean
  ) => void;
  handleTileHover: (row: number, column: number) => void;
}

export const Tile: FC<TileProps> = ({ point, handleTileClick, handleTileHover }) => {
  const defaultStyle: string = "border point";
  const [style, setStyle] = useState(defaultStyle);
  const { selectedRestaurant } = useSelectedRestaurant();

  useEffect(() => {
    updateStyle(point, defaultStyle, setStyle);
  }, [point]);

  useEffect(() => {
    if (point.restaurant) {
      if (
        selectedRestaurant?.location.x === point.row &&
        selectedRestaurant.location.y === point.column
      ) {
        setStyle(defaultStyle + " selected-restaurant");
      } else {
        setStyle(defaultStyle + " restaurant");
      }
    }
  }, [selectedRestaurant, point]);

  const onClick = () => {
    handleTileClick(point.row, point.column, point.restaurant ? true : false);
  };

  const onMouseEnter = () => {
    handleTileHover(point.row, point.column);
  };

  return (
    <div
      className={`${style}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter} 
      data-row={point.row}
      data-column={point.column}
    >
      {point.deliveryMan && (
        <img src="delivery_man.png" className="point" alt="Delivery Man" />
      )}
      {point.restaurant && !point.deliveryMan && (
        <img src="restaurant.png" className="point" alt="Restaurant" />
      )}
      {point.user && <img src="user.png" className="point" alt="User" />}
    </div>
  );
};

const updateStyle = (
  point: Point,
  defaultStyle: string,
  setStyle: (style: string) => void
) => {
  if (point.user) {
    setStyle(defaultStyle + " user");
  } else if (point.restaurant) {
    setStyle(defaultStyle + " restaurant");
  } else if (point.deliveryMan) {
    setStyle(defaultStyle + " deliveryMan");
  } else if (point.isWall) {
    setStyle(defaultStyle + " wall");
  } else if (point.isPath) {
    setStyle(defaultStyle + " path");
  } else if (point.isVisited) {
    setStyle(defaultStyle + " visited");
  } else {
    setStyle(defaultStyle + " empty");
  }
};
