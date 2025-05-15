import Ensaio from "../models/ensaio.js";

export default class EnsaioController {
  static criarEnsaio = async (req, res) => {
    try {
      const { titulo, dataHorario, local } = req.body;
      const novoEnsaio = new Ensaio({ titulo, dataHorario, local });
      await novoEnsaio.save();
      res.status(201).json(novoEnsaio);
      console.log("Novo ensaio criado com sucesso!");
    } catch (error) {
      console.error("Algo deu errado ao tentar criar um novo ensaio...", error);
    }
  };

  static listarEnsaios = async (req, res) => {
    try {
      const ensaios = await Ensaio.find();
      if (!ensaios)
        return res.status(404).json({ erro: "A lista de ensaios está vazia" });
      res.status(200).json(ensaios);
    } catch (error) {
      console.error(
        "Algo deu errado ao tentar listar os ensaios disponíveis...",
        error
      );
    }
  };

  static atualizarEnsaio = async (req, res) => {
    try {
      const { titulo, dataHorario, local } = req.body;
      const ensaioAntigo = await Ensaio.findByIdAndUpdate(req.params.id, {
        titulo,
        dataHorario,
        local,
      });
      res.json(ensaioAntigo);
      console.log("Ensaio atualizado com sucesso!");
    } catch (error) {
      console.error("Algo deu errado ao tentar atualizar o ensaio...", error);
    }
  };

  static deletarEnsaio = async (req, res) => {
    try {
      const ensaio = await Ensaio.findByIdAndDelete(req.params.id);
      res.json(ensaio);
      console.log("Ensaio excluído com sucesso!");
      res.status(204).end();
    } catch (error) {
      console.error("Algo deu errado ao tentar excluir o ensaio...", error);
    }
  };
}
