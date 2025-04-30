import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./src/config/dbConnection.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/", (req, res) => {
  res.send("API - Encenna");
});

app.listen(PORT, () => {
  console.log(`Servidor ativo na porta ${PORT}...`);
});

connectDb();