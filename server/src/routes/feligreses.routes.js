import { Router } from "express";
import {
  getFeligreses,
  getFeligres,
  createFeligres,
  delFeligres,
  updateFeligres,
} from "../controllers/feligreses.controller.js";

const router = Router();

router.get("/feligreses", getFeligreses);
router.get("/feligres/:id", getFeligres);
router.post("/feligres", createFeligres);
router.delete("/feligres/:id", delFeligres);
router.put("/feligres/:id", updateFeligres);

export default router;
