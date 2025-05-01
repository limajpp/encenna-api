import {
  atualizarTurma,
  criarTurma,
  deletarTurma,
  listarTurmas,
} from "../controllers/turmaController.js";
import express from "express";

const router = express.Router();

router.post("/criarTurma", criarTurma);
router.get("/listarTurmas", listarTurmas);
router.put("/atualizarTurma/:id", atualizarTurma);
router.delete("/deletarTurma/:id", deletarTurma);

export default router;
