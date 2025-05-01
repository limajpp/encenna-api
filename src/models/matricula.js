import mongoose from "mongoose";

const matriculaSchema = mongoose.Schema({
  alunoId: { type: mongoose.Types.ObjectId, required: true },
  turmaId: { type: mongoose.Types.ObjectId, required: true },
  nota: { type: Number, required: true, min: 0, max: 10 },
  frequencia: { type: Number, required: true, min: 0, max: 100 },
});

export default mongoose.model("Matricula", matriculaSchema, "matriculas");
