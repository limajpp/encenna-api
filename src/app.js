import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/dbConnection.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import ensaioRoutes from "./routes/ensaioRoutes.js";
import participanteEnsaioRoutes from "./routes/participanteEnsaioRoutes.js";
import turmaRoutes from "./routes/turmaRoutes.js";
import matriculaRoutes from "./routes/matriculaRoutes.js";
import candidatoAudicaoRoutes from "./routes/candidatoAudicaoRoutes.js";
import audicaoRoutes from "./routes/audicaoRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
connectDb();

app.use("/api/usuario", usuarioRoutes);
app.use("/api/ensaio", ensaioRoutes);
app.use("/api/participantesEnsaio", participanteEnsaioRoutes);
app.use("/api/turma", turmaRoutes);
app.use("/api/matricula", matriculaRoutes);
app.use("/api/candidatoAudicao", candidatoAudicaoRoutes);
app.use("/api/audicao", audicaoRoutes);

app.use("/", (req, res) => {
  res.send("API - Encenna");
});

export default app;
