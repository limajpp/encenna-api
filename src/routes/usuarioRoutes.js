import express from "express";
import {
  criarUsuario,
  listarUsuarios,
} from "../controllers/usuarioController.js";

const router = express.Router();

router.post("/criarUsuario", criarUsuario);
router.get("/listarUsuarios", listarUsuarios);

export default router;
