import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome é obrigatório."],
      trim: true,
    },
    email: {
      type: String,
      required: false,
      match: [/.+\@.+\..+/, "Por favor, insira um email válido."],
      lowercase: true,
      trim: true,
    },
    senha: { type: String, required: [true, "A senha é obrigatória."] },
    telefone: {
      type: String,
      required: [true, "O telefone é obrigatório."],
      match: [
        /^\d{10,11}$/,
        "Telefone deve ter 10 ou 11 dígitos (somente números).",
      ],
    },
    cpf: {
      type: String,
      required: [true, "O CPF é obrigatório."],
      match: [/^\d{11}$/, "CPF deve ter 11 dígitos (somente números)."],
      unique: true,
    },
    tipo: {
      type: String,
      required: [true, "O tipo de usuário é obrigatório."],
      enum: {
        values: ["Administrador", "Professor", "Aluno"],
        message:
          "'{VALUE}' não é um tipo de usuário válido. Valores permitidos: Administrador, Professor, Aluno.",
      },
    },
    fotoPerfil: { type: String, required: false, default: "" },
    frequencia: {
      type: Number,
      required: false,
      min: [0, "Frequência não pode ser menor que 0."],
      max: [100, "Frequência não pode ser maior que 100."],
    },
  },
  { timestamps: true }
);

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
