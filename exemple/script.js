document.addEventListener("DOMContentLoaded", () => {
  const API_BASE_URL = "http://167.234.233.193:3000";

  // Elementos da UI simplificados
  const apiUrlDisplay = document.getElementById("apiUrl");
  const results = document.getElementById("results");
  const testApiBtn = document.getElementById("testApiBtn");

  apiUrlDisplay.textContent = API_BASE_URL;

  // Função para exibir resultados
  const showResult = (data) => {
    results.textContent = JSON.stringify(data, null, 2) || "Nenhum resultado.";
  };

  // Única função: Testar a comunicação com a API
  testApiBtn.addEventListener("click", async () => {
    try {
      showResult({ message: "Testando fetch para /api/test..." });
      const response = await fetch(`${API_BASE_URL}/api/test`);
      const data = await response.json();
      showResult(data);
    } catch (error) {
      console.error("Erro no fetch:", error);
      showResult({ error: "Falha ao comunicar com o servidor.", details: error.message });
    }
  });
});
