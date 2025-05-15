import express from "express";
import UsuarioController from "../controllers/usuarioController.js";
import verificarToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/criarUsuario", UsuarioController.criarUsuario);
router.get("/listarUsuarios", verificarToken, UsuarioController.listarUsuarios);
router.put(
  "/atualizarUsuario/:id",
  verificarToken,
  UsuarioController.atualizarUsuario
);
router.delete(
  "/deletarUsuario/:id",
  verificarToken,
  UsuarioController.deletarUsuario
);
router.post("/login", UsuarioController.loginUsuario);

export default router;
