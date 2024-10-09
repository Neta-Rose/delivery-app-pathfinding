import { Grid } from "../../components/Grid";
import { useGridContext } from "../../hooks/useGridContext";
import { createGrid } from "../../utils/helpers";
import { useState } from "react";
import { AlgorithmName } from "../../types/algorithms";
import { Menu } from "../../components/Menu";

export const OrderPage = () => {
    const { changeGrid } = useGridContext();
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmName>(AlgorithmName.DIJKSTRA);

    return (
        <div className="container d-flex flex-row justify-content-md-between">
            <div>
                <Grid />
                <div className="d-flex flex-row mb-3 mt-3 justify-content-around">
                    <div className="dropdown">
                        <button 
                            className="btn btn-secondary dropdown-toggle" 
                            type="button" 
                            id="dropdownMenuButton" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false"
                            style={{width: '6rem', textAlign: 'center'}}
                        >
                            {selectedAlgorithm}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" onClick={
                                () => setSelectedAlgorithm(AlgorithmName.DIJKSTRA)
                                }>{AlgorithmName.DIJKSTRA}</a>
                            <a className="dropdown-item" onClick={
                                () => setSelectedAlgorithm(AlgorithmName.ASTAR)
                                }>{AlgorithmName.ASTAR}</a>
                        </div>
                    </div>
                    <button 
                        className="btn btn-primary"
                        onClick={() => changeGrid(createGrid())}
                    >
                        reset
                    </button>    
                </div>
            </div>
            <Menu selectedAlgorithm={selectedAlgorithm} />
        </div>
    );
};