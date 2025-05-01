import mongoose from "mongoose";

const matriculaSchema = mongoose.Schema({
  alunoId: { type: mongoose.Types.ObjectId, required: true },
  turmaId: { type: mongoose.Types.ObjectId, required: true },
  nota: { type: Number, required: true },
  frequencia: { type: Number, required: true },
});

export default mongoose.model("Matricula", matriculaSchema, "matriculas");
