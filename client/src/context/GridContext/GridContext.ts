import { createContext } from "react";
import { GridContextInterface } from "../../types/grid";

export const GridContext = createContext<GridContextInterface | null>(null);