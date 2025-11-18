const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Habilita o CORS para todas as origens, essencial para testes de frontend
app.use(express.json()); // Habilita o parse de JSON no corpo das requisições

// --- Rotas da API ---

// Rota raiz para um teste rápido no navegador
app.get("/", (req, res) => {
  console.log("Requisição recebida na rota '/'");
  res.status(200).send("Servidor de teste simples está no ar!");
});

// Rota de API para testar a resposta JSON
app.get("/api/test", (req, res) => {
  console.log("Requisição recebida na rota '/api/test'");
  res.status(200).json({ message: "A API de teste está funcionando corretamente." });
});

// --- Inicialização do Servidor ---
app.listen(PORT, () => {
  console.log(`Servidor de TESTE rodando na porta ${PORT}`);
  console.log(`Acesse em: http://localhost:${PORT} ou http://<seu-ip>:${PORT}`);
});
