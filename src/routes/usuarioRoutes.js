import express from "express";
import UsuarioController from "../controllers/usuarioController.js";

const router = express.Router();

router.post("/criarUsuario", UsuarioController.criarUsuario);
router.get("/listarUsuarios", UsuarioController.listarUsuarios);
router.put("/atualizarUsuario/:id", UsuarioController.atualizarUsuario);
router.delete("/deletarUsuario/:id", UsuarioController.deletarUsuario);
router.post("/login", UsuarioController.loginUsuario);

export default router;
