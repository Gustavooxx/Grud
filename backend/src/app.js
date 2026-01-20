import express from "express";
import cors from "cors";
import rotas from "./routes.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORTA || 3000;

rotas(app);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));