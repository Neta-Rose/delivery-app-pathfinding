import { GridContext } from "./GridContext";
import { FC, useState } from "react";
import { GridContextInterface } from "../../types/grid";
import { GridInterface } from "../../types/grid";

export const GridProvider: FC<{children: JSX.Element[] | JSX.Element}> = ({ children }) => {
    const [grid, setGrid] = useState<GridInterface | null>(null);

    const changeGrid = (grid: GridInterface | null) => setGrid(grid);

    const GridProviderValue: GridContextInterface = {
        grid,
        changeGrid,
    };

    return (
        <GridContext.Provider value={GridProviderValue}>
            {children}
        </GridContext.Provider>
    )
}