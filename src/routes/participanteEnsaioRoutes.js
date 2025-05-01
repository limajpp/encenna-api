import {
  atualizarParticipanteEnsaio,
  criarParticipanteEnsaio,
  deletarParticipanteEnsaio,
  listarParticipantesEnsaio,
} from "../controllers/participanteEnsaioController.js";
import express from "express";

const router = express.Router();

router.post("/criarParticipanteEnsaio", criarParticipanteEnsaio);
router.get("/listarParticipantesEnsaio", listarParticipantesEnsaio);
router.put("/atualizarParticipanteEnsaio/:id", atualizarParticipanteEnsaio);
router.delete("/deletarParticipanteEnsaio/:id", deletarParticipanteEnsaio);

export default router;
