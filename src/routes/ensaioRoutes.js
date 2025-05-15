import express from "express";
import EnsaioController from "../controllers/ensaioController.js";

const router = express.Router();

router.post("/criarEnsaio", EnsaioController.criarEnsaio);
router.get("/listarEnsaios", EnsaioController.listarEnsaios);
router.put("/atualizarEnsaio/:id", EnsaioController.atualizarEnsaio);
router.delete("/deletarEnsaio/:id", EnsaioController.deletarEnsaio);

export default router;
