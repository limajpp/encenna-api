import express from "express";
import {
  atualizarUsuario,
  criarUsuario,
  deletarUsuario,
  listarUsuarios,
} from "../controllers/usuarioController.js";

const router = express.Router();

router.post("/criarUsuario", criarUsuario);
router.get("/listarUsuarios", listarUsuarios);
router.put("/atualizarUsuario/:id", atualizarUsuario);
router.delete("/deletarUsuario/:id", deletarUsuario);

export default router;
