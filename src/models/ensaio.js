import mongoose from "mongoose";

const ensaioSchema = mongoose.Schema({
  titulo: { type: String, required: true },
  dataHorario: { type: Date, required: true },
  local: { type: String, required: true },
});

export default mongoose.model("Ensaio", ensaioSchema, "ensaios");
