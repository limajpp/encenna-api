import express from "express";
import TurmaController from "../controllers/turmaController.js";

const router = express.Router();

router.post("/criarTurma", TurmaController.criarTurma);
router.get("/listarTurmas", TurmaController.listarTurmas);
router.put("/atualizarTurma/:id", TurmaController.atualizarTurma);
router.delete("/deletarTurma/:id", TurmaController.deletarTurma);

export default router;
