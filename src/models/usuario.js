import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
  nome: { type: String, required: true },
  email: {
    type: String,
    required: false,
    match: /.+\@.+\..+/,
    lowercase: true,
    trim: true,
  },
  senhaHash: { type: String, required: true },
  telefone: {
    type: String,
    required: true,
    match: /^\d{10,11}$/, // 10 ou 11 dígitos sem formatação, DDD + Número.
  },
  cpf: {
    type: String,
    required: true,
    match: /^\d{11}$/, // 11 dígitos sem formatação, Ex: xxxyyyzzzab.
    unique: true,
  },
  tipo: {
    type: String,
    required: true,
    enum: ["Administrador", "Usuário", "Responsável"],
  },
  fotoPerfil: { type: String, required: false, default: "" },
});

export default mongoose.model("Usuario", usuarioSchema, "usuarios");
