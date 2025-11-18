document.addEventListener("DOMContentLoaded", () => {
  const API_BASE_URL = "http://167.234.233.193:3000";

  // Elementos da UI
  const apiUrlDisplay = document.getElementById("apiUrl");
  const jsonContent = document.getElementById("jsonContent");
  const binIdInput = document.getElementById("binId");
  const fileInput = document.getElementById("fileInput");
  const results = document.getElementById("results");

  // Botões
  const createBinBtn = document.getElementById("createBinBtn");
  const getBinBtn = document.getElementById("getBinBtn");
  const updateBinBtn = document.getElementById("updateBinBtn");
  const deleteBinBtn = document.getElementById("deleteBinBtn");
  const uploadFileBtn = document.getElementById("uploadFileBtn");

  apiUrlDisplay.textContent = API_BASE_URL;

  // Função para exibir resultados
  const showResult = (data) => {
    results.textContent = JSON.stringify(data, null, 2);
  };

  // --- Funções da API de Bins ---

  // Criar Bin
  createBinBtn.addEventListener("click", async () => {
    try {
      const content = JSON.parse(jsonContent.value);
      const response = await fetch(`${API_BASE_URL}/api/bins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await response.json();
      showResult(data);
      if (data.id) {
        binIdInput.value = data.id; // Preenche o campo de ID automaticamente
      }
    } catch (error) {
      showResult({ error: "JSON inválido ou falha na requisição.", details: error.message });
    }
  });

  // Ler Bin
  getBinBtn.addEventListener("click", async () => {
    const binId = binIdInput.value;
    if (!binId) return showResult({ error: "Por favor, insira um ID de bin." });

    const response = await fetch(`${API_BASE_URL}/api/bins/${binId}`);
    const data = await response.json();
    showResult(data);
  });

  // Atualizar Bin
  updateBinBtn.addEventListener("click", async () => {
    const binId = binIdInput.value;
    if (!binId) return showResult({ error: "Por favor, insira um ID de bin para atualizar." });

    try {
      const content = JSON.parse(jsonContent.value);
      const response = await fetch(`${API_BASE_URL}/api/bins/${binId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await response.json();
      showResult(data);
    } catch (error) {
      showResult({ error: "JSON inválido ou falha na requisição.", details: error.message });
    }
  });

  // Deletar Bin
  deleteBinBtn.addEventListener("click", async () => {
    const binId = binIdInput.value;
    if (!binId) return showResult({ error: "Por favor, insira um ID de bin para deletar." });

    if (confirm(`Tem certeza que deseja deletar o bin ${binId}?`)) {
      const response = await fetch(`${API_BASE_URL}/api/bins/${binId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      showResult(data);
      binIdInput.value = ""; // Limpa o campo após deletar
    }
  });

  // --- Funções da API de Arquivos ---

  // Upload de Arquivo
  uploadFileBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];
    if (!file) return showResult({ error: "Por favor, selecione um arquivo." });

    const formData = new FormData();
    formData.append("file", file); // O nome 'file' deve corresponder ao do backend (upload.single('file'))

    try {
      const response = await fetch(`${API_BASE_URL}/api/files`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      showResult(data);
    } catch (error) {
      showResult({ error: "Falha no upload do arquivo.", details: error.message });
    }
  });
});
