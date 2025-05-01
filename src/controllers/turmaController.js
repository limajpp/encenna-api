import Turma from "../models/turma.js";

export const criarTurma = async (req, res) => {
  try {
    const { nomeTurma, professorId } = req.body;
    const novaTurma = new Turma({ nomeTurma, professorId });
    await novaTurma.save();
    res.status(201).json(novaTurma);
    console.log("Turma criada com sucesso!");
  } catch (error) {
    console.error("Algo deu errado ao tentar criar a turma...", error);
  }
};

export const listarTurmas = async (req, res) => {
  try {
    const turmas = await Turma.find();
    if (!turmas)
      return res.status(404).json({ erro: "Ainda não existem turmas..." });
    res.status(200).json(turmas);
  } catch (error) {
    console.error("Algo deu errado ao tentar listar as turmas...", error);
  }
};

export const atualizarTurma = async (req, res) => {
  try {
    const { nomeTurma, professorId } = req.body;
    const turmaAntiga = await Turma.findByIdAndUpdate(req.params.id, {
      nomeTurma,
      professorId,
    });
    res.json(turmaAntiga);
    console.log("Turma atualizada com sucesso!");
  } catch (error) {
    console.error("Algo deu errado ao tentar atualizar a turma...", error);
  }
};

export const deletarTurma = async (req, res) => {
  try {
    await Turma.findByIdAndDelete(req.params.id);
    console.log("Turma excluída com sucesso!");
    res.status(200).end();
  } catch (error) {
    console.error("Algo deu errado ao tentar deletar a turma...", error);
  }
};
