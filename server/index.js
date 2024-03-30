import express from "express";
import feligresesRoutes from "./src/routes/feligreses.routes.js";
import contabilidadRoutes from "./src/routes/contabilidad.routes.js";
import miscRoutes from "./src/routes/misc.routes.js";
import parentescoRoutes from "./src/routes/parentescos.routes.js";
import transaccionesRoutes from "./src/routes/transacciones.routes.js";
import cors from "cors";

process.loadEnvFile();

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server en el puerto ${PORT}`);
});

app.use(feligresesRoutes);
app.use(contabilidadRoutes);
app.use(miscRoutes);
app.use(parentescoRoutes);
app.use(transaccionesRoutes);

app.use((error, _req, res, next) => {
  return res.status(500).json({ error: error.message });
});
