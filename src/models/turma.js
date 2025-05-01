import mongoose from "mongoose";

const turmaSchema = mongoose.Schema({
  nomeTurma: { type: String, required: true },
  professorId: { type: mongoose.Types.ObjectId, required: true },
});

export default mongoose.model("Turma", turmaSchema, "turmas");
