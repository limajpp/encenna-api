import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor ativo na porta ${PORT}...`);
});
