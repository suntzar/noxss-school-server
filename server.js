const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json()); // Para parsear JSON no corpo das requisições
app.use(express.urlencoded({ extended: true })); // Para parsear dados de formulários

// --- Configuração de Pastas ---
const BINS_DIR = path.join(__dirname, "data", "bins");
const FILES_DIR = path.join(__dirname, "data", "files");

// Garante que os diretórios de dados existam
fs.mkdirSync(BINS_DIR, { recursive: true });
fs.mkdirSync(FILES_DIR, { recursive: true });

// --- Configuração do Multer para Upload de Arquivos ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, FILES_DIR);
  },
  filename: function (req, file, cb) {
    // Gera um nome de arquivo único para evitar conflitos
    const uniqueSuffix = uuidv4();
    const extension = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${extension}`);
  },
});

const upload = multer({ storage: storage });

// --- Rotas da API ---

app.get("/", (req, res) => {
  res.send("Servidor no-XSS School está no ar! Use as rotas /api/bins e /api/files.");
});

// ====== ROTAS PARA BINS DE JSON ======

// [POST] Criar um novo bin de JSON
app.post("/api/bins", (req, res) => {
  const binId = uuidv4();
  const filePath = path.join(BINS_DIR, `${binId}.json`);

  fs.writeFile(filePath, JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: "Falha ao salvar o bin de JSON." });
    }
    res.status(201).json({ message: "Bin criado com sucesso!", id: binId });
  });
});

// [GET] Obter um bin de JSON pelo ID
app.get("/api/bins/:id", (req, res) => {
  const filePath = path.join(BINS_DIR, `${req.params.id}.json`);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).json({ error: "Bin não encontrado." });
    }
    res.status(200).json(JSON.parse(data));
  });
});

// [PUT] Atualizar um bin de JSON pelo ID
app.put("/api/bins/:id", (req, res) => {
  const filePath = path.join(BINS_DIR, `${req.params.id}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Bin não encontrado para atualização." });
  }

  fs.writeFile(filePath, JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: "Falha ao atualizar o bin." });
    }
    res.status(200).json({ message: "Bin atualizado com sucesso!", id: req.params.id });
  });
});

// [DELETE] Deletar um bin de JSON pelo ID
app.delete("/api/bins/:id", (req, res) => {
  const filePath = path.join(BINS_DIR, `${req.params.id}.json`);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(404).json({ error: "Bin não encontrado para deletar." });
    }
    res.status(200).json({ message: "Bin deletado com sucesso." });
  });
});

// ====== ROTAS PARA ARQUIVOS ======

// [POST] Fazer upload de um arquivo
// O nome do campo no formulário deve ser 'file'
app.post("/api/files", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhum arquivo enviado." });
  }
  res.status(201).json({
    message: "Arquivo enviado com sucesso!",
    filename: req.file.filename,
    url: `/api/files/${req.file.filename}`,
  });
});

// [GET] Baixar um arquivo pelo nome
app.get("/api/files/:filename", (req, res) => {
  const filePath = path.join(FILES_DIR, req.params.filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath); // Envia o arquivo para download
  } else {
    res.status(404).json({ error: "Arquivo não encontrado." });
  }
});

// --- Inicialização do Servidor ---
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
});
