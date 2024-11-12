import { useEffect, useState, MouseEvent } from "react";
import { useGridContext } from "../../hooks/useGridContext";
import { Tile } from "../Tile";
import { createGrid } from "../../utils/helpers";
import { GridInterface } from "../../types/grid";
import { useSelectedRestaurant } from "../../hooks/useSelectedRestaurantContext";

interface GridProps {
  onRestaurantClick: () => void;
}

export const Grid: React.FC<GridProps> = ({ onRestaurantClick }) => {
  const { grid, changeGrid } = useGridContext();
  const { changeSelectedRestaurant } = useSelectedRestaurant();
  
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragMode, setDragMode] = useState<boolean>(true);

  useEffect(() => {
    if (!grid) {
      changeGrid(createGrid());
    }
  }, [grid, changeGrid]);

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
    const target = event.target as HTMLElement;
    const row = parseInt(target.getAttribute("data-row") || "0");
    const column = parseInt(target.getAttribute("data-column") || "0");
    const tile = grid![row][column];
    setDragMode(!tile.isWall);
    toggleWall(row, column, !tile.isWall);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleWall = (row: number, column: number, addWall: boolean) => {
    if (grid) {
      const newGrid: GridInterface = structuredClone(grid);
      newGrid[row][column].isWall = addWall;
      changeGrid(newGrid);
    }
  };

  const handleTileHover = (row: number, column: number) => {
    if (isDragging) {
      toggleWall(row, column, dragMode);
    }
  };

  const handleTileClick = (
    row: number,
    column: number,
    isRestaurant: boolean
  ) => {
    if (grid) {
      if (grid[row][column].restaurant) {
        changeSelectedRestaurant(grid[row][column].restaurant!);
        if (isRestaurant) {
          onRestaurantClick();
        }
      } else {
        const newGrid: GridInterface = structuredClone(grid);
        newGrid[row][column].isWall = !newGrid[row][column].isWall;
        changeGrid(newGrid);
      }
    }
  };

  return (
    <div
      className="container d-flex flex-column justify-content-md-center mt-3 mb-3"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseDown={handleMouseDown}
    >
      {grid?.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="d-flex flex-direction-row justify-content-md-center"
        >
          {row.map((point, pointIndex) => {
            return (
              <div key={pointIndex} className="d-flex flex-direction-column">
                <Tile
                  key={pointIndex}
                  point={point}
                  handleTileClick={handleTileClick}
                  handleTileHover={handleTileHover}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
