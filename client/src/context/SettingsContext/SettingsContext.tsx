import React, { createContext, useContext, useState, ReactNode } from "react";
import { AlgorithmName, VisualizationSpeeds } from "../../types/algorithms";

interface SettingsContextType {
  selectedAlgorithm: AlgorithmName;
  setSelectedAlgorithm: (algorithm: AlgorithmName) => void;
  selectedSpeed: keyof typeof VisualizationSpeeds;
  setSelectedSpeed: (speed: keyof typeof VisualizationSpeeds) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmName>(AlgorithmName.ASTAR);
  const [selectedSpeed, setSelectedSpeed] = useState<keyof typeof VisualizationSpeeds>("fast");

  return (
    <SettingsContext.Provider
      value={{ selectedAlgorithm, setSelectedAlgorithm, selectedSpeed, setSelectedSpeed }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettingsContext must be used within a SettingsProvider");
  }
  return context;
};
