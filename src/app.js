import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/dbConnection.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
connectDb();

app.use("/api/usuario", usuarioRoutes);

app.use("/", (req, res) => {
  res.send("API - Encenna");
});

export default app;
