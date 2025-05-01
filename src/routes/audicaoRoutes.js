import express from "express";
import {
  criarAudicao,
  listarAudicoes,
  atualizarAudicao,
  deletarAudicao,
} from "../controllers/audicaoController.js";

const router = express.Router();

router.post("/criarAudicao", criarAudicao);
router.get("/listarAudicoes", listarAudicoes);
router.put("/atualizarAudicao/:id", atualizarAudicao);
router.delete("/deletarAudicao/:id", deletarAudicao);

export default router;
