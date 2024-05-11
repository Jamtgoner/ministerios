import { Router } from "express";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

import {
  getFeligreses,
  getFeligres,
  createFeligres,
  delFeligres,
  updateFeligres,
  getFeligresFam,
} from "../controllers/feligreses.controller.js";

const router = Router();

router.get("/feligreses", getFeligreses);
router.get("/feligres/:id", getFeligres);
router.get("/feligresf/:id", getFeligresFam);
router.post("/feligres", upload.single("foto"), createFeligres);
router.delete("/feligres/:id", delFeligres);
router.put("/feligres/:id", updateFeligres);

export default router;
