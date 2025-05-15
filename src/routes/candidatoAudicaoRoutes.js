import express from "express";
import CandidatoAudicaoController from "../controllers/candidatoAudicaoController.js";

const router = express.Router();

router.post("/criarCandidato", CandidatoAudicaoController.criarCandidato);
router.get("/listarCandidatos", CandidatoAudicaoController.listarCandidatos);
router.put("/atualizarCandidato/:id", CandidatoAudicaoController.atualizarCandidato);
router.delete("/deletarCandidato/:id", CandidatoAudicaoController.deletarCandidato);

export default router;
