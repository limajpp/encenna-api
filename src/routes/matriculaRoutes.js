import {
  atualizarMatricula,
  criarMatricula,
  deletarMatricula,
  listarMatriculas,
} from "../controllers/matriculaController.js";
import express from "express";

const router = express.Router();

router.post("/criarMatricula", criarMatricula);
router.get("/listarMatriculas", listarMatriculas);
router.put("/atualizarMatricula/:id", atualizarMatricula);
router.delete("/deletarMatricula/:id", deletarMatricula);

export default router;
