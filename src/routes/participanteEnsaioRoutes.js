import express from "express";
import ParticipanteEnsaioController from "../controllers/participanteEnsaioController.js";

const router = express.Router();

router.post("/criarParticipanteEnsaio", ParticipanteEnsaioController.criarParticipanteEnsaio);
router.get("/listarParticipantesEnsaio", ParticipanteEnsaioController.listarParticipantesEnsaio);
router.put("/atualizarParticipanteEnsaio/:id", ParticipanteEnsaioController.atualizarParticipanteEnsaio);
router.delete("/deletarParticipanteEnsaio/:id", ParticipanteEnsaioController.deletarParticipanteEnsaio);

export default router;
