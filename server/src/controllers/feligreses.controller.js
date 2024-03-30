import { poolPG } from "../../db.js";

export const getFeligreses = async (_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const { rows } = await poolPG.query(`SELECT * FROM feligreses`);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "No se encontraron resultados" });
    }

    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const getFeligres = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const { id } = req.params;
    const { rows } = await poolPG.query(
      `SELECT * FROM feligreses WHERE id_feligres = $1`,
      [id]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "No se encontraron resultados" });
    }

    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const createFeligres = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const { nombre, p_apellido, s_apellido, direccion, telefono, correo } =
      req.body;
    await poolPG.query(
      `INSERT INTO feligreses (nombre, p_apellido, s_apellido, direccion, telefono, correo) VALUES ($1, $2, $3, $4, $5, $6)`,
      [nombre, p_apellido, s_apellido, direccion, telefono, correo]
    );
    res.send("Feligres creado");
  } catch (error) {
    next(error);
  }
};

export const delFeligres = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const { id } = req.params;
    const { rows } = await poolPG.query(
      `DELETE FROM feligreses WHERE id_feligres = $1 RETURNING *`,
      [id]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "No se encontraron resultados" });
    }

    res.send("Feligres eliminado");
  } catch (error) {
    next(error);
  }
};

export const updateFeligres = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const { nombre, p_apellido, s_apellido, direccion, telefono, correo } =
      req.body;
    const { id } = req.params;

    const { rows } = await poolPG.query(
      `UPDATE feligreses SET nombre = $1, p_apellido = $2, s_apellido = $3, direccion = $4, telefono = $5, correo = $6 WHERE id_feligres = $7 RETURNING *`,
      [nombre, p_apellido, s_apellido, direccion, telefono, correo, id]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "No se encontraron resultados" });
    }

    res.send("Feligres actualizado");
  } catch (error) {
    next(error);
  }
};
