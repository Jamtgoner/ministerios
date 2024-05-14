import { poolPG } from "../../db.js";
import fs from "fs";

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
      `SELECT *,
       ENCODE(foto, 'base64') AS profile
       FROM feligreses
       WHERE id_feligres = $1`,
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

export const getFeligresFam = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const { id } = req.params;
    const { rows } = await poolPG.query(
      `SELECT 
      fr.nombre AS "Familiar",
        CASE 
          WHEN r.sub_parent AND fr.sexo = 'M' THEN p.sub_parent_m
          WHEN r.sub_parent AND fr.sexo = 'F' THEN p.sub_parent_f
          ELSE p.parentesco
      END AS "Parentesco"
  FROM feligreses f
  JOIN relacion_parentesco r ON f.id_feligres = r.id_pfeligres
  JOIN feligreses fr ON (f.id_feligres = r.id_pfeligres AND fr.id_feligres = r.id_sfeligres)
  JOIN parentesco p ON r.id_parentesco = p.id_parentesco
  WHERE f.id_feligres = $1`,
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
    const {
      nombre,
      p_apellido,
      s_apellido,
      direccion,
      telefono,
      correo,
      sexo,
    } = req.body;

    let fotoBuffer = null;

    if (req.file) {
      const foto = req.file;
      fotoBuffer = fs.readFileSync(foto.path);
      fs.unlinkSync(foto.path);
    }

    const result = await poolPG.query(
      `INSERT INTO feligreses (nombre, p_apellido, s_apellido, direccion, telefono, correo,sexo, foto) VALUES ($1, $2, $3, $4, $5, $6,$7, $8) RETURNING *`,
      [
        nombre,
        p_apellido,
        s_apellido,
        direccion,
        telefono,
        correo,
        sexo,
        fotoBuffer,
      ]
    );

    const feligresCreado = result.rows[0];

    res.send(feligresCreado);
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
