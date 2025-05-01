import express from "express";
import {
  criarMaterial,
  listarMateriais,
  atualizarMaterial,
  deletarMaterial,
} from "../controllers/bibliotecaController.js";

const router = express.Router();

router.post("/criarMaterial", criarMaterial);
router.get("/listarMateriais", listarMateriais);
router.put("/atualizarMaterial/:id", atualizarMaterial);
router.delete("/deletarMaterial/:id", deletarMaterial);

export default router;
