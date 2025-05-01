import CandidatoAudicao from "../models/candidatoAudicao.js";

export const criarCandidato = async (req, res) => {
  try {
    const {
      usuarioId,
      audicaoId,
      tipoPapel,
      videoUpload,
      roteiroDisponivel,
    } = req.body;

    const novoCandidato = new CandidatoAudicao({
      usuarioId,
      audicaoId,
      tipoPapel,
      videoUpload,
      roteiroDisponivel,
    });

    await novoCandidato.save();
    res.status(201).json(novoCandidato);
    console.log("Candidato à audição criado com sucesso!");
  } catch (error) {
    console.error("Erro ao criar candidato à audição:", error);
    res.status(500).json({ erro: "Erro ao criar candidato." });
  }
};

export const listarCandidatos = async (req, res) => {
  try {
    const candidatos = await CandidatoAudicao.find();
    res.status(200).json(candidatos);
  } catch (error) {
    console.error("Erro ao listar candidatos:", error);
    res.status(500).json({ erro: "Erro ao listar candidatos." });
  }
};

export const atualizarCandidato = async (req, res) => {
  try {
    const {
      usuarioId,
      audicaoId,
      tipoPapel,
      videoUpload,
      roteiroDisponivel,
    } = req.body;

    const candidatoAtualizado = await CandidatoAudicao.findByIdAndUpdate(
      req.params.id,
      {
        usuarioId,
        audicaoId,
        tipoPapel,
        videoUpload,
        roteiroDisponivel,
      }
    );

    res.status(200).json(candidatoAtualizado);
    console.log("Candidato à audição atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar candidato:", error);
    res.status(500).json({ erro: "Erro ao atualizar candidato." });
  }
};

export const deletarCandidato = async (req, res) => {
  try {
    await CandidatoAudicao.findByIdAndDelete(req.params.id);
    console.log("Candidato à audição excluído com sucesso!");
    res.status(204).end();
  } catch (error) {
    console.error("Erro ao deletar candidato:", error);
    res.status(500).json({ erro: "Erro ao deletar candidato." });
  }
};
