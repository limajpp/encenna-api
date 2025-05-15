import express from "express";
import AudicaoController from "../controllers/audicaoController.js";

const router = express.Router();

router.post("/criarAudicao", AudicaoController.criarAudicao);
router.get("/listarAudicoes", AudicaoController.listarAudicoes);
router.put("/atualizarAudicao/:id", AudicaoController.atualizarAudicao);
router.delete("/deletarAudicao/:id", AudicaoController.deletarAudicao);

export default router;
