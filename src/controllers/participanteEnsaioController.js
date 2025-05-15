import ParticipanteEnsaio from "../models/participanteEnsaio.js";

export default class ParticipanteEnsaioController {
  static criarParticipanteEnsaio = async (req, res) => {
    try {
      const { ensaioId, usuarioId } = req.body;
      const novoParticipanteEnsaio = new ParticipanteEnsaio({
        ensaioId,
        usuarioId,
      });
      await novoParticipanteEnsaio.save();
      res.status(201).json(novoParticipanteEnsaio);
      console.log("Participante criado com sucesso!");
    } catch (error) {
      console.error(
        "Algo deu errado ao tentar criar um participante para o ensaio...",
        error
      );
    }
  };

  static listarParticipantesEnsaio = async (req, res) => {
    try {
      const participantesEnsaio = await ParticipanteEnsaio.find();
      if (!participantesEnsaio)
        return res
          .status(404)
          .json({ erro: "Não existem participantes ativos em um ensaio..." });
      res.status(200).json(participantesEnsaio);
    } catch (error) {
      console.error(
        "Algo deu errado ao tentar listar os participantes do ensaio",
        error
      );
    }
  };

  static atualizarParticipanteEnsaio = async (req, res) => {
    try {
      const { ensaioId, usuarioId } = req.body;
      const participanteAntigo = await ParticipanteEnsaio.findByIdAndUpdate(
        req.params.id,
        { ensaioId, usuarioId }
      );
      res.json(participanteAntigo);
      console.log("Participante alterado com sucesso!");
    } catch (error) {
      console.error(
        "Algo deu errado ao tentar atualizar o participante...",
        error
      );
    }
  };

  static deletarParticipanteEnsaio = async (req, res) => {
    try {
      await ParticipanteEnsaio.findByIdAndDelete(req.params.id);
      res.status(204).end();
      console.log("Participante excluído com sucesso!");
    } catch (error) {
      console.error(
        "Algo deu errado ao tentar excluir o participante...",
        error
      );
    }
  };
}
