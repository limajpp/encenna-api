import mongoose from "mongoose";

const turmaSchema = mongoose.Schema(
  {
    nomeTurma: {
      type: String,
      required: [true, "O nome da turma é obrigatório."],
      trim: true,
    },
    professorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "O ID do professor é obrigatório."],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Turma", turmaSchema, "turmas");
