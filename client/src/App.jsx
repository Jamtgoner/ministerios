import MyRoutes from "./routers/MyRoutes";
import { ConfigProvider } from "antd";
import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Light, Dark } from "./styles/Themes";

export const ThemeContext = React.createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "light" ? Light : Dark;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontSize: "18px",
          },
        }}
      >
        <ThemeContext.Provider value={{ setTheme, theme }}>
          <ThemeProvider theme={themeStyle}>
            <BrowserRouter>
              <Container className={sidebarOpen ? "sidebarState active" : ""}>
                <Sidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                <MyRoutes />
              </Container>
            </BrowserRouter>
          </ThemeProvider>
        </ThemeContext.Provider>
      </ConfigProvider>
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 90px auto;
  background: ${({ theme }) => theme.background};
  transition: all 0.3s;
  &.active {
    grid-template-columns: 300px auto;
  }
  color: ${({ theme }) => theme.text};
`;
export default App;
