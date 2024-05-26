import { createContext, useState } from "react";

export const FeligresesContext = createContext({});

export default function FeligresContextProvider({ children }) {
  const [feligreses, setFeligreses] = useState([]);

  return (
    <FeligresesContext.Provider value={{ feligreses, setFeligreses }}>
      {children}
    </FeligresesContext.Provider>
  );
}
