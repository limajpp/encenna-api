import Audicao from "../models/audicao.js";

export default class AudicaoController {
  static criarAudicao = async (req, res) => {
    try {
      const { titulo, descricao, dataAudicao, qtdPapeis } = req.body;

      const novaAudicao = new Audicao({
        titulo,
        descricao,
        dataAudicao,
        qtdPapeis,
      });

      await novaAudicao.save();
      res.status(201).json(novaAudicao);
      console.log("Audição criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar audição:", error);
      res.status(500).json({ erro: "Erro ao criar audição." });
    }
  };

  static listarAudicoes = async (req, res) => {
    try {
      const audicoes = await Audicao.find();
      res.status(200).json(audicoes);
    } catch (error) {
      console.error("Erro ao listar audições:", error);
      res.status(500).json({ erro: "Erro ao listar audições." });
    }
  };

  static atualizarAudicao = async (req, res) => {
    try {
      const { titulo, descricao, dataAudicao, qtdPapeis } = req.body;

      const audicaoAtualizada = await Audicao.findByIdAndUpdate(req.params.id, {
        titulo,
        descricao,
        dataAudicao,
        qtdPapeis,
      });

      res.status(200).json(audicaoAtualizada);
      console.log("Audição atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar audição:", error);
      res.status(500).json({ erro: "Erro ao atualizar audição." });
    }
  };

  static deletarAudicao = async (req, res) => {
    try {
      await Audicao.findByIdAndDelete(req.params.id);
      console.log("Audição deletada com sucesso!");
      res.status(204).end();
    } catch (error) {
      console.error("Erro ao deletar audição:", error);
      res.status(500).json({ erro: "Erro ao deletar audição." });
    }
  };
}
