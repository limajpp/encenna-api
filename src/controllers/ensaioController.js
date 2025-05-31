import Ensaio from "../models/ensaio.js";

export default class EnsaioController {
  static criarEnsaio = async (req, res) => {
    try {
      const {
        pecaRelacionada,
        data,
        horarioInicio,
        horarioFim,
        local,
        participantesObservacao,
      } = req.body;

      if (
        !pecaRelacionada ||
        !data ||
        !horarioInicio ||
        !horarioFim ||
        !local
      ) {
        return res.status(400).json({
          erro: "Campos obrigatórios ausentes: peça relacionada, data, horário de início, horário de fim, local.",
        });
      }

      if (horarioInicio >= horarioFim) {
        return res
          .status(400)
          .json({
            erro: "O horário de início deve ser anterior ao horário de fim.",
          });
      }

      const novoEnsaio = new Ensaio({
        pecaRelacionada,
        data,
        horarioInicio,
        horarioFim,
        local,
        participantesObservacao: participantesObservacao || "",
      });

      await novoEnsaio.save();
      res.status(201).json(novoEnsaio);
      console.log("Novo ensaio criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar novo ensaio:", error);
      if (error.name === "ValidationError") {
        const errosDeValidacao = Object.values(error.errors).map(
          (err) => err.message
        );
        return res
          .status(400)
          .json({ erro: "Erro de validação.", detalhes: errosDeValidacao });
      }
      res.status(500).json({
        erro: "Ocorreu um erro inesperado ao tentar criar o ensaio.",
        detalhes: error.message,
      });
    }
  };

  static listarEnsaios = async (req, res) => {
    try {
      const ensaios = await Ensaio.find().sort({ data: 1, horarioInicio: 1 });
      res.status(200).json(ensaios);
    } catch (error) {
      console.error("Erro ao listar ensaios:", error);
      res
        .status(500)
        .json({ erro: "Erro interno ao tentar listar os ensaios." });
    }
  };

  static atualizarEnsaio = async (req, res) => {
    try {
      const { id } = req.params;
      const dadosAtualizacao = req.body;

      if (Object.keys(dadosAtualizacao).length === 0) {
        return res
          .status(400)
          .json({ erro: "Nenhum dado fornecido para atualização." });
      }

      const { horarioInicio, horarioFim } = dadosAtualizacao;
      if (horarioInicio && horarioFim && horarioInicio >= horarioFim) {
        return res.status(400).json({
          erro: "O horário de início deve ser anterior ao horário de fim.",
        });
      } else if (horarioInicio && !horarioFim) {
        const ensaioExistente = await Ensaio.findById(id).lean();
        if (
          ensaioExistente &&
          ensaioExistente.horarioFim &&
          horarioInicio >= ensaioExistente.horarioFim
        ) {
          return res.status(400).json({
            erro: "O horário de início deve ser anterior ao horário de fim existente.",
          });
        }
      } else if (!horarioInicio && horarioFim) {
        const ensaioExistente = await Ensaio.findById(id).lean();
        if (
          ensaioExistente &&
          ensaioExistente.horarioInicio &&
          ensaioExistente.horarioInicio >= horarioFim
        ) {
          return res.status(400).json({
            erro: "O horário de início existente deve ser anterior ao novo horário de fim.",
          });
        }
      }

      const ensaioAtualizado = await Ensaio.findByIdAndUpdate(
        id,
        { $set: dadosAtualizacao },
        { new: true, runValidators: true }
      );

      if (!ensaioAtualizado) {
        return res.status(404).json({ erro: "Ensaio não encontrado." });
      }

      res.status(200).json(ensaioAtualizado);
      console.log("Ensaio atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar ensaio:", error);
      if (error.name === "ValidationError") {
        const errosDeValidacao = Object.values(error.errors).map(
          (err) => err.message
        );
        return res
          .status(400)
          .json({ erro: "Erro de validação.", detalhes: errosDeValidacao });
      }
      if (error.name === "CastError" && error.path === "_id") {
        return res.status(400).json({ erro: "ID do ensaio inválido." });
      }
      res
        .status(500)
        .json({ erro: "Erro interno ao tentar atualizar o ensaio." });
    }
  };

  static deletarEnsaio = async (req, res) => {
    try {
      const { id } = req.params;
      const ensaioDeletado = await Ensaio.findByIdAndDelete(id);

      if (!ensaioDeletado) {
        return res.status(404).json({ erro: "Ensaio não encontrado." });
      }

      console.log("Ensaio excluído com sucesso!");
      res.status(204).end();
    } catch (error) {
      console.error("Erro ao excluir ensaio:", error);
      if (error.name === "CastError" && error.path === "_id") {
        return res.status(400).json({ erro: "ID do ensaio inválido." });
      }
      res
        .status(500)
        .json({ erro: "Erro interno ao tentar excluir o ensaio." });
    }
  };
}
