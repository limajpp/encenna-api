import express from "express";
import {
  atualizarEnsaio,
  criarEnsaio,
  deletarEnsaio,
  listarEnsaios,
} from "../controllers/ensaioController.js";

const router = express.Router();

router.post("/criarEnsaio", criarEnsaio);
router.get("/listarEnsaios", listarEnsaios);
router.put("/atualizarEnsaio/:id", atualizarEnsaio);
router.delete("/deletarEnsaio/:id", deletarEnsaio);

export default router;
