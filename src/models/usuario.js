import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = mongoose.Schema({
  nome: { type: String, required: true },
  email: {
    type: String,
    required: false,
    match: /.+\@.+\..+/,
    lowercase: true,
    trim: true,
  },
  senha: { type: String, required: true, unique: true },
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

usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("Usuario", usuarioSchema, "usuarios");
