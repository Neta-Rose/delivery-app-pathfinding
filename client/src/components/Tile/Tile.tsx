import { FC, useEffect, useState } from "react";
import { Point } from "../../types/grid";
import "./Tile.css"
import { useSelectedRestaurant } from "../../hooks/useSelectedRestaurantContext";


interface TileProps {
    point: Point
    handleTileClick: (row: number, column: number) => void 
}

export const Tile: FC<TileProps> = ({ point, handleTileClick }) => {
    const defaultStyle: string = "border point";
    const [style, setStyle] = useState(defaultStyle);
    const { selectedRestaurant } = useSelectedRestaurant();

    useEffect(() => {
        updateStyle(point, defaultStyle, setStyle)
    }, [point])

    useEffect(() => {
        if(point.restaurant) {
            if(selectedRestaurant?.location.x == point.row 
                && selectedRestaurant.location.y == point.column) {
                setStyle(defaultStyle + " selected-restaurant");
            } else {
                setStyle(defaultStyle + " restaurant");
            }
        }
    }, [selectedRestaurant, point])

    return (
        <div className={`${style}`} onClick={() => handleTileClick(point.row, point.column)}>
            {point.deliveryMan && <img src="delivery_man.png" className="point"></img>}
            {point.restaurant && !point.deliveryMan && <img src="restaurant.png" className="point"></img>}
            {point.user && <img src="user.png" className="point"></img>}
        </div>
    );
};

const updateStyle = (point: Point, defaultStyle: string, setStyle: (style: string) => void) => {
    if(point.user) {
        setStyle(defaultStyle + " user");
    } else if(point.restaurant) {
        setStyle(defaultStyle + " restaurant");
    } else if(point.deliveryMan) {
        setStyle(defaultStyle + " deliveryMan");
    } else if(point.isWall) {
        setStyle(defaultStyle + " wall");
    } else if(point.isPath) {
        setStyle(defaultStyle + " path");
    } else if(point.isVisited) {
        setStyle(defaultStyle + " visited")
    } else {
        setStyle(defaultStyle + " empty");
    }
}