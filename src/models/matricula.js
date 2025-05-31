import mongoose from "mongoose";

const matriculaSchema = mongoose.Schema(
  {
    alunoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "O ID do aluno é obrigatório."],
    },
    turmaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Turma",
      required: [true, "O ID da turma é obrigatório."],
    },
    nota: {
      type: Number,
      required: [true, "A nota é obrigatória."],
      min: [0, "Nota não pode ser menor que 0."],
      max: [10, "Nota não pode ser maior que 10."],
    },
    frequencia: {
      type: Number,
      required: [true, "A frequência é obrigatória."],
      min: [0, "Frequência não pode ser menor que 0."],
      max: [100, "Frequência não pode ser maior que 100."],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Matricula", matriculaSchema, "matriculas");
