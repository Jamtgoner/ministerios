import {poolPG} from "../db.js"

export const getContabilidad = async (_req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
      const { rows } = await poolPG.query(`SELECT * FROM contabilidad`);
  
      if (!rows || rows.length === 0) {
        return res.status(404).json({ error: "No se encontraron resultados" });
      }

      res.json(rows);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };