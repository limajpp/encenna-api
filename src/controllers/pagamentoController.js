import Pagamento from "../models/pagamento.js";

export const criarPagamento = async (req, res) => {
  try {
    const { usuarioId, valor, dataPagamento, status } = req.body;

    const novoPagamento = new Pagamento({
      usuarioId,
      valor,
      dataPagamento,
      status,
    });

    await novoPagamento.save();
    res.status(201).json(novoPagamento);
    console.log("Pagamento registrado com sucesso!");
  } catch (error) {
    console.error("Erro ao registrar pagamento:", error);
    res.status(500).json({ erro: "Erro ao registrar pagamento." });
  }
};

export const listarPagamentos = async (req, res) => {
  try {
    const pagamentos = await Pagamento.find();
    res.status(200).json(pagamentos);
  } catch (error) {
    console.error("Erro ao listar pagamentos:", error);
    res.status(500).json({ erro: "Erro ao listar pagamentos." });
  }
};

export const atualizarPagamento = async (req, res) => {
  try {
    const { usuarioId, valor, dataPagamento, status } = req.body;

    const pagamentoAtualizado = await Pagamento.findByIdAndUpdate(
      req.params.id,
      { usuarioId, valor, dataPagamento, status }
    );

    res.status(200).json(pagamentoAtualizado);
    console.log("Pagamento atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar pagamento:", error);
    res.status(500).json({ erro: "Erro ao atualizar pagamento." });
  }
};

export const deletarPagamento = async (req, res) => {
  try {
    await Pagamento.findByIdAndDelete(req.params.id);
    res.status(204).end();
    console.log("Pagamento excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir pagamento:", error);
    res.status(500).json({ erro: "Erro ao excluir pagamento." });
  }
};
