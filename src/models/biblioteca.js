import mongoose from "mongoose";

const bibliotecaSchema = mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: false },
  arquivo: { type: String, required: false }, // Path ou URL.
  tipo: {
    type: String,
    required: true,
    enum: ["Partitura", "Roteiro", "Livro", "Outro"],
  },
});

export default mongoose.model("Biblioteca", bibliotecaSchema, "biblioteca");
