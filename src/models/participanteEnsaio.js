import mongoose from "mongoose";

const participanteEnsaioSchema = mongoose.Schema({
  ensaioId: { type: mongoose.Types.ObjectId, required: true },
  usuarioId: { type: mongoose.Types.ObjectId, required: true },
});

export default mongoose.model(
  "ParticipanteEnsaios",
  participanteEnsaioSchema,
  "participantesEnsaio"
);
