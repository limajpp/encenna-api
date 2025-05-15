import Matricula from "../models/matricula.js";

export default class MatriculaController {
  static criarMatricula = async (req, res) => {
    try {
      const { alunoId, turmaId, nota, frequencia } = req.body;
      const novaMatricula = Matricula({ alunoId, turmaId, nota, frequencia });
      await novaMatricula.save();
      res.status(201).json(novaMatricula);
      console.log("Matrícula criada com sucesso!");
    } catch (error) {
      console.error("Algo deu errado ao tentar criar a matrícula...", error);
    }
  };

  static listarMatriculas = async (req, res) => {
    try {
      const matriculas = await Matricula.find();
      if (!matriculas)
        return res.status(404).json({ erro: "Ainda não existem matrícula..." });
      res.json(matriculas);
    } catch (error) {
      console.error("Algo deu errado ao tentar listar as matrículas...", error);
    }
  };

  static atualizarMatricula = async (req, res) => {
    try {
      const { alunoId, turmaId, nota, frequencia } = req.body;
      const matriculaAntiga = await Matricula.findByIdAndUpdate(req.params.id, {
        alunoId,
        turmaId,
        nota,
        frequencia,
      });
      res.json(matriculaAntiga);
      console.log("Matrícula atualizada com sucesso!");
    } catch (error) {
      console.error(
        "Algo deu errado ao tentar atualizar a matrícula...",
        error
      );
    }
  };

  static deletarMatricula = async (req, res) => {
    try {
      await Matricula.findByIdAndDelete(req.params.id);
      res.status(204).end();
      console.log("Matrícula excluída com sucesso!");
    } catch (error) {
      console.error("Algo deu errado ao tentar excluir a matrícula...", error);
    }
  };
}
