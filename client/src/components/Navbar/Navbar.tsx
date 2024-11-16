import { NavLink } from "react-router-dom";
import { Page, pages } from "../../router";
import { useSettingsContext } from "../../context/SettingsContext/SettingsContext";
import { useGridContext } from "../../hooks/useGridContext";
import { createGrid, handleRandomWalls, handleRecursiveDivisionWalls } from "../../utils/helpers";
import { AlgorithmName, VisualizationSpeeds } from "../../types/algorithms";
import "./Navbar.css";

export const Navbar = () => {
  const { selectedAlgorithm, setSelectedAlgorithm, selectedSpeed, setSelectedSpeed } = useSettingsContext();
  const { changeGrid, grid } = useGridContext();

  const handleReset = () => {
    changeGrid(createGrid());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand">Delivery App</a>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarControls"
        aria-controls="navbarControls"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarControls">
        <ul className="navbar-nav mr-auto">
          {pages.filter(page => !page.isNotRenderedInNavbar).map((page: Page) => (
            <li className="nav-item" key={page.name}>
              <NavLink
                to={page.path}
                className={({ isActive }) =>
                  [isActive ? "active" : "text-secondary", "nav-link"].join(" ")
                }
              >
                {page.name.charAt(0).toUpperCase() + page.name.slice(1)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="d-flex align-items-center">
          <div className="dropdown mr-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownAlgorithmButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ width: "12rem", textAlign: "left" }}
            >
              Algorithm: {selectedAlgorithm}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownAlgorithmButton">
              <button
                className="dropdown-item"
                onClick={() => setSelectedAlgorithm(AlgorithmName.DIJKSTRA)}
              >
                {AlgorithmName.DIJKSTRA}
              </button>
              <button
                className="dropdown-item"
                onClick={() => setSelectedAlgorithm(AlgorithmName.ASTAR)}
              >
                {AlgorithmName.ASTAR}
              </button>
            </div>
          </div>

          <div className="dropdown mr-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownAlgorithmButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ width: "12rem", textAlign: "left" }}
            >
              Maze Type:
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownAlgorithmButton">
              <button
                className="dropdown-item"
                onClick={() => handleRandomWalls(grid!, changeGrid)}
              >
                Random Walls
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleRecursiveDivisionWalls(grid!, changeGrid)}
              >
                Recursive Division
              </button>
            </div>
          </div>

          <div className="dropdown mr-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownSpeedButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ width: "12rem", textAlign: "left" }}
            >
              Speed: {selectedSpeed}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownSpeedButton">
              {Object.keys(VisualizationSpeeds).map((speed) => (
                <button
                  key={speed}
                  className="dropdown-item"
                  onClick={() => setSelectedSpeed(speed as keyof typeof VisualizationSpeeds)}
                >
                  {speed.charAt(0).toUpperCase() + speed.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button className="btn btn-primary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </nav>
  );
};
