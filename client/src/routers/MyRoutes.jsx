import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Feligreses from "../pages/Feligreses";
import Feligres from "../pages/Feligres";
import Parentescos from "../pages/Parentescos";
import Transacciones from "../pages/Transacciones";
import Contabilidad from "../pages/Contabilidad";
import NotFound from "../pages/NotFound";

function MyRoutes() {
  return (
    <div style={{ height: "100vh" }}>
      {" "}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feligreses" element={<Feligreses />} />
        <Route path="/feligres" element={<Feligres />} />
        <Route path="/parentescos" element={<Parentescos />} />
        <Route path="/transacciones" element={<Transacciones />} />
        <Route path="/contabilidad" element={<Contabilidad />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
export default MyRoutes;
