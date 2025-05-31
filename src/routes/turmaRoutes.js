import express from "express";
import TurmaController from "../controllers/turmaController.js";
import verificarToken from "../middlewares/auth.js";

const router = express.Router();

router.post("/criarTurma", verificarToken, TurmaController.criarTurma);
router.get("/listarTurmas", verificarToken, TurmaController.listarTurmas);
router.put(
  "/atualizarTurma/:id",
  verificarToken,
  TurmaController.atualizarTurma
);
router.delete(
  "/deletarTurma/:id",
  verificarToken,
  TurmaController.deletarTurma
);

export default router;
