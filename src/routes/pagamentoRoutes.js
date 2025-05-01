import express from "express";
import {
  criarPagamento,
  listarPagamentos,
  atualizarPagamento,
  deletarPagamento,
} from "../controllers/pagamentoController.js";

const router = express.Router();

router.post("/criarPagamento", criarPagamento);
router.get("/listarPagamentos", listarPagamentos);
router.put("/atualizarPagamento/:id", atualizarPagamento);
router.delete("/deletarPagamento/:id", deletarPagamento);

export default router;
