import mongoose from "mongoose";

const audicaoSchema = mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: false,
    default: "",
  },
  dataAudicao: {
    type: Date,
    required: true,
  },
  qtdPapeis: {
    type: Number,
    required: true,
    min: 1,
  },
});

export default mongoose.model("Audicao", audicaoSchema, "audicoes");
