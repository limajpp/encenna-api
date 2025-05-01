import express from "express";
import {
  criarCandidato,
  listarCandidatos,
  atualizarCandidato,
  deletarCandidato,
} from "../controllers/candidatoAudicaoController.js";

const router = express.Router();

router.post("/criarCandidato", criarCandidato);
router.get("/listarCandidatos", listarCandidatos);
router.put("/atualizarCandidato/:id", atualizarCandidato);
router.delete("/deletarCandidato/:id", deletarCandidato);

export default router;
