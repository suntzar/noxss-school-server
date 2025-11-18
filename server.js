const express = require("express");
const cors = require("cors");
const path = require("path"); // Importa o módulo 'path' do Node.js

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Habilita o CORS para todas as origens, essencial para testes de frontend
app.use(express.json()); // Habilita o parse de JSON no corpo das requisições

// --- Servir Arquivos Estáticos da pasta 'exemple' ---
// Isso permite que o navegador carregue o script.js e style.css referenciados no HTML.
app.use(express.static(path.join(__dirname, "exemple")));

// --- Rotas da API ---

// Rota raiz ('/'): Serve a página principal do frontend.
app.get("/", (req, res) => {
  console.log("Servindo a página index.html");
  res.sendFile(path.join(__dirname, "exemple", "index.html"));
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
