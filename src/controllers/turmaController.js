import Turma from "../models/turma.js";
import Matricula from "../models/matricula.js";
import Usuario from "../models/usuario.js";

export default class TurmaController {
  static criarTurma = async (req, res) => {
    try {
      const { nomeTurma, professorId } = req.body;

      if (!nomeTurma || !professorId) {
        return res
          .status(400)
          .json({ erro: "Nome da turma e ID do professor são obrigatórios." });
      }

      const professorExistente = await Usuario.findById(professorId);
      if (!professorExistente) {
        return res
          .status(404)
          .json({ erro: "Professor não encontrado com o ID fornecido." });
      }
      if (
        professorExistente.tipo !== "Professor" &&
        professorExistente.tipo !== "Administrador"
      ) {
        return res.status(403).json({
          erro: "O usuário fornecido não tem permissão para ser professor de uma turma.",
        });
      }

      const novaTurma = new Turma({ nomeTurma, professorId });
      await novaTurma.save();
      res.status(201).json(novaTurma);
      console.log("Turma criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar nova turma:", error);
      if (error.name === "ValidationError") {
        const errosDeValidacao = Object.values(error.errors).map(
          (err) => err.message
        );
        return res
          .status(400)
          .json({ erro: "Erro de validação.", detalhes: errosDeValidacao });
      }
      res.status(500).json({
        erro: "Ocorreu um erro inesperado ao tentar criar a turma.",
        detalhes: error.message,
      });
    }
  };

  static listarTurmas = async (req, res) => {
    try {
      const { id: usuarioLogadoId, tipo: tipoUsuarioLogado } = req.usuario;
      let queryTurmas = {};

      if (tipoUsuarioLogado === "Professor") {
        queryTurmas = { professorId: usuarioLogadoId };
      } else if (tipoUsuarioLogado === "Aluno") {
        const matriculasDoAluno = await Matricula.find({
          alunoId: usuarioLogadoId,
        })
          .select("turmaId -_id")
          .lean();
        const turmasIds = matriculasDoAluno.map((m) => m.turmaId);
        if (turmasIds.length === 0) {
          return res.status(200).json([]);
        }
        queryTurmas = { _id: { $in: turmasIds } };
      }

      const turmas = await Turma.find(queryTurmas)
        .populate({
          path: "professorId",
          select: "nome email fotoPerfil",
        })
        .sort({ nomeTurma: 1 })
        .lean();

      if (!turmas || turmas.length === 0) {
        return res.status(200).json([]);
      }

      const turmasComDetalhes = [];
      for (const turma of turmas) {
        const matriculasDaTurma = await Matricula.find({ turmaId: turma._id })
          .populate({
            path: "alunoId",
            select: "nome email fotoPerfil frequencia",
          })
          .select("nota frequencia")
          .lean();

        const alunosFormatados = matriculasDaTurma.map((m) => ({
          ...(m.alunoId && typeof m.alunoId === "object"
            ? {
                id: m.alunoId._id,
                nome: m.alunoId.nome,
                email: m.alunoId.email,
                fotoPerfil: m.alunoId.fotoPerfil,
                frequenciaGeralAluno: m.alunoId.frequencia,
              }
            : { nome: "Aluno não encontrado" }),
          notaNaTurma: m.nota,
          frequenciaNaTurma: m.frequencia,
        }));

        turmasComDetalhes.push({
          _id: turma._id,
          nomeTurma: turma.nomeTurma,
          professor:
            turma.professorId && typeof turma.professorId === "object"
              ? {
                  id: turma.professorId._id,
                  nome: turma.professorId.nome,
                  email: turma.professorId.email,
                  fotoPerfil: turma.professorId.fotoPerfil,
                }
              : { nome: "Professor não atribuído" },
          alunos: alunosFormatados,
          createdAt: turma.createdAt,
          updatedAt: turma.updatedAt,
        });
      }

      res.status(200).json(turmasComDetalhes);
    } catch (error) {
      console.error("Erro ao listar turmas com detalhes:", error);
      res.status(500).json({
        erro: "Erro interno ao tentar listar as turmas com detalhes.",
      });
    }
  };

  static atualizarTurma = async (req, res) => {
    try {
      const { id } = req.params;
      const dadosAtualizacao = req.body;

      if (Object.keys(dadosAtualizacao).length === 0) {
        return res
          .status(400)
          .json({ erro: "Nenhum dado fornecido para atualização." });
      }

      if (dadosAtualizacao.professorId) {
        const professorExistente = await Usuario.findById(
          dadosAtualizacao.professorId
        );
        if (!professorExistente) {
          return res.status(404).json({
            erro: "Novo professor não encontrado com o ID fornecido.",
          });
        }
        if (
          professorExistente.tipo !== "Professor" &&
          professorExistente.tipo !== "Administrador"
        ) {
          return res.status(403).json({
            erro: "O usuário fornecido para ser o novo professor não tem a permissão adequada.",
          });
        }
      }

      const turmaAtualizada = await Turma.findByIdAndUpdate(
        id,
        { $set: dadosAtualizacao },
        { new: true, runValidators: true }
      ).populate("professorId", "nome email fotoPerfil");

      if (!turmaAtualizada) {
        return res.status(404).json({ erro: "Turma não encontrada." });
      }

      res.status(200).json(turmaAtualizada);
      console.log("Turma atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar turma:", error);
      if (error.name === "ValidationError") {
        const errosDeValidacao = Object.values(error.errors).map(
          (err) => err.message
        );
        return res
          .status(400)
          .json({ erro: "Erro de validação.", detalhes: errosDeValidacao });
      }
      if (
        error.name === "CastError" &&
        (error.path === "_id" || error.path === "professorId")
      ) {
        return res.status(400).json({
          erro: `ID de ${
            error.path === "_id" ? "turma" : "professor"
          } inválido.`,
        });
      }
      res
        .status(500)
        .json({ erro: "Erro interno ao tentar atualizar a turma." });
    }
  };

  static deletarTurma = async (req, res) => {
    try {
      const { id } = req.params;
      const matriculasNaTurma = await Matricula.countDocuments({ turmaId: id });
      if (matriculasNaTurma > 0) {
        return res
          .status(400)
          .json({
            erro: "Não é possível deletar a turma, pois existem alunos matriculados.",
          });
      }

      const turmaDeletada = await Turma.findByIdAndDelete(id);

      if (!turmaDeletada) {
        return res.status(404).json({ erro: "Turma não encontrada." });
      }

      console.log("Turma excluída com sucesso!");
      res.status(204).end();
    } catch (error) {
      console.error("Erro ao deletar turma:", error);
      if (error.name === "CastError" && error.path === "_id") {
        return res.status(400).json({ erro: "ID da turma inválido." });
      }
      res.status(500).json({ erro: "Erro interno ao tentar deletar a turma." });
    }
  };
}
