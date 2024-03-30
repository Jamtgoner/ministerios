import { poolPG } from "../../db.js";

export const getTransacciones = async (_req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const { rows } = await poolPG.query(`SELECT * FROM transacciones`);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "No se encontraron resultados" });
    }

    res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
