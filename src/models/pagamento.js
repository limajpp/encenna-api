import mongoose from "mongoose";

const pagamentoSchema = mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  valor: { type: mongoose.Schema.Types.Decimal128, required: true },
  dataPagamento: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Pendente", "Pago", "Cancelado"],
    required: true,
  },
});

export default mongoose.model("Pagamento", pagamentoSchema, "pagamentos");
