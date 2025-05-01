import mongoose from "mongoose";

const candidatoAudicaoSchema = mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  audicaoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  tipoPapel: {
    type: String,
    required: true,
    enum: ["Protagonista", "Coadjuvante", "Figurante"], // Enum inicial(mudar se necessário).
  },
  videoUpload: {
    type: String,
    required: false,
    default: "",
  },
  roteiroDisponivel: {
    type: String,
    required: false,
    default: "",
  },
});

export default mongoose.model(
  "CandidatoAudicao",
  candidatoAudicaoSchema,
  "candidatosAudicao"
);
