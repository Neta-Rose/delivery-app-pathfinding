import { Grid } from "../../components/Grid";
import { useGridContext } from "../../hooks/useGridContext";
import { createGrid } from "../../utils/helpers";
import { useState } from "react";
import { AlgorithmName, VisualizationSpeeds } from "../../types/algorithms";
import { Menu } from "../../components/Menu";

export const OrderPage = () => {
    const { changeGrid } = useGridContext();
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmName>(AlgorithmName.DIJKSTRA);
    const [selectedSpeed, setSelectedSpeed] = useState<string>("medium");

    return (
        <div className="container d-flex flex-row justify-content-md-between">
            <div>
                <Grid />
                <div className="d-flex flex-row mb-3 mt-3 justify-content-between">
                    <div className="dropdown">
                        <button 
                            className="btn btn-secondary dropdown-toggle" 
                            type="button" 
                            id="dropdownMenuButton" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false"
                            style={{width: '10rem', textAlign: 'left'}}
                        >
                            Algorithm: {selectedAlgorithm}
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
                    <div className="dropdown">
                        <button 
                            className="btn btn-secondary dropdown-toggle" 
                            type="button" 
                            id="dropdownVisualizationSpeedButton" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false"
                            style={{width: '10rem', textAlign: 'left'}}
                        >
                            Speed: {selectedSpeed}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownVisualizationSpeedButton">
                            {Object.keys(VisualizationSpeeds).map((speed) => (
                                <a className="dropdown-item" onClick={
                                    () => setSelectedSpeed(speed)
                                    }>{speed}</a>
                            ))}
                        </div>
                        
                    </div>
                </div>
            </div>
            <Menu 
                selectedAlgorithm={selectedAlgorithm} 
                visualizationSpeed={selectedSpeed}
            />
        </div>
    );
};