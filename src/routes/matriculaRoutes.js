import express from "express";
import MatriculaController from "../controllers/matriculaController.js";

const router = express.Router();

router.post("/criarMatricula", MatriculaController.criarMatricula);
router.get("/listarMatriculas", MatriculaController.listarMatriculas);
router.put("/atualizarMatricula/:id", MatriculaController.atualizarMatricula);
router.delete("/deletarMatricula/:id", MatriculaController.deletarMatricula);

export default router;
