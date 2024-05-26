import MyRoutes from "./routers/MyRoutes";
import { ConfigProvider } from "antd";
import { useState, useContext } from "react";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import ThemeContextProvider from "./context/ThemeContext";

function App() {
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
        <ThemeContextProvider>
          <BrowserRouter>
            <Container className={sidebarOpen ? "sidebarState active" : ""}>
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              <MyRoutes />
            </Container>
          </BrowserRouter>
        </ThemeContextProvider>
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
