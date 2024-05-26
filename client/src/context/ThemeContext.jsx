import { createContext, useState } from "react";
import { Dark, Light } from "../styles/Themes";
import { ThemeProvider } from "styled-components";

export const ThemeContext = createContext(null);

export default function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={themeStyle}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
