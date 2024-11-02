import { useEffect } from "react";
import { useGridContext } from "../../hooks/useGridContext";
import { Tile } from "../Tile";
import { createGrid } from "../../utils/helpers";
import { GridInterface } from "../../types/grid";
import { useSelectedRestaurant } from "../../hooks/useSelectedRestaurantContext";

export const Grid = () => {
    const { grid, changeGrid } = useGridContext();
    const { changeSelectedRestaurant } = useSelectedRestaurant()
    
    useEffect(() => {
        if(!grid) {
            changeGrid(createGrid())
        }
    }, [])

    const handleTileClick = (row: number, column: number) => {
        if(grid) {
            if(grid[row][column].restaurant) {
                changeSelectedRestaurant(grid[row][column].restaurant!)
            } else {
                const newGrid: GridInterface = structuredClone(grid);

                newGrid[row][column].isWall = !newGrid[row][column].isWall;

                changeGrid(newGrid);
            }
        }
    }

    return (
        <div className="container d-flex flex-column justify-content-md-center mt-3 mb-3">
            {grid?.map((row, rowIndex) => (
                <div key={rowIndex} className="d-flex flex-direction-row justify-content-md-center">
                    {row.map((point, pointIndex) => {
                        return (
                            <div key={pointIndex} className="d-flex flex-direction-column">
                                <Tile
                                    key={pointIndex}
                                    point={point}
                                    handleTileClick={handleTileClick}
                                />
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};