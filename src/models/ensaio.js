import mongoose from "mongoose";

const ensaioSchema = mongoose.Schema(
  {
    pecaRelacionada: {
      type: String,
      required: [true, "A peça relacionada é obrigatória."],
    },
    data: {
      type: Date,
      required: [true, "A data do ensaio é obrigatória."],
    },
    horarioInicio: {
      type: String, 
      required: [true, "O horário de início é obrigatório."],
      match: [
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "Formato de horário de início inválido. Use HH:MM.",
      ],
    },
    horarioFim: {
      type: String, 
      required: [true, "O horário de fim é obrigatório."],
      match: [
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "Formato de horário de fim inválido. Use HH:MM.",
      ],
    },
    local: {
      type: String,
      required: [true, "O local do ensaio é obrigatório."],
      trim: true,
    },
    participantesObservacao: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
); 

export default mongoose.model("Ensaio", ensaioSchema, "ensaios");
