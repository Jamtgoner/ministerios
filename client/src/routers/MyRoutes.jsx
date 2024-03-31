import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Feligreses from "../pages/Feligreses";
import Parentescos from "../pages/Parentescos";
import Transacciones from "../pages/Transacciones";
import Contabilidad from "../pages/Contabilidad";

function MyRoutes() {
  return (
    <div style={{ height: "100vh" }}>
      {" "}
      {/* Contenedor con height de 100vh */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feligreses" element={<Feligreses />} />
        <Route path="/parentescos" element={<Parentescos />} />
        <Route path="/transacciones" element={<Transacciones />} />
        <Route path="/contabilidad" element={<Contabilidad />} />
      </Routes>
    </div>
  );
}
export default MyRoutes;
