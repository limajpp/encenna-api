import express from "express";
import BibliotecaController from "../controllers/bibliotecaController.js";

const router = express.Router();

router.post("/criarMaterial", BibliotecaController.criarMaterial);
router.get("/listarMateriais", BibliotecaController.listarMateriais);
router.put("/atualizarMaterial/:id", BibliotecaController.atualizarMaterial);
router.delete("/deletarMaterial/:id", BibliotecaController.deletarMaterial);

export default router;
