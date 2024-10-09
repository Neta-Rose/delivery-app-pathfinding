import { useContext } from "react";
import { GridContext } from "../context/GridContext/GridContext";

export const useGridContext = () => {
    const gridContext = useContext(GridContext);

    if(!gridContext) {
        throw new Error("cant use grid context outside of grid provider")
    }

    return gridContext;
}