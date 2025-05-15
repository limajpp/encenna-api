import express from "express";
import PagamentoController from "../controllers/pagamentoController.js";

const router = express.Router();

router.post("/criarPagamento", PagamentoController.criarPagamento);
router.get("/listarPagamentos", PagamentoController.listarPagamentos);
router.put("/atualizarPagamento/:id", PagamentoController.atualizarPagamento);
router.delete("/deletarPagamento/:id", PagamentoController.deletarPagamento);

export default router;
