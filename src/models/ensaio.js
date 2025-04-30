import mongoose from "mongoose";

const ensaioSchema = mongoose.Schema({
  titulo: { type: String, required: true },
  dataHorario: { type: String, required: true },
  local: { type: String, required: true },
});

export default mongoose.model("Ensaio", ensaioSchema, "ensaios");
