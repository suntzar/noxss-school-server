# Servidor de Armazenamento Pessoal

Este é um servidor simples em Node.js/Express para substituir serviços como `jsonbin.io`, permitindo o armazenamento de "bins" de JSON e o upload/download de arquivos. Ideal para desenvolvimento frontend e projetos pessoais.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (geralmente vem com o Node.js)

## Instalação

1.  Clone este repositório (ou copie os arquivos para sua máquina).
2.  Navegue até a pasta do projeto no terminal.
3.  Instale as dependências:

    ```bash
    npm install
    ```

## Como Rodar o Servidor

- **Para produção:**

  ```bash
  npm start
  ```

- **Para desenvolvimento (com reinício automático ao salvar):**

  ```bash
  npm run dev
  ```

O servidor estará rodando em `http://localhost:3000` por padrão.

---

## Uso da API

### Bins de JSON

#### `POST /api/bins`

Cria um novo "bin" de JSON. Envie o conteúdo JSON no corpo da requisição.

**Exemplo de Resposta:**

```json
{
  "message": "Bin criado com sucesso!",
  "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
}
```

#### `GET /api/bins/:id`

Recupera um bin de JSON pelo seu ID.

#### `PUT /api/bins/:id`

Atualiza (sobrescreve) um bin de JSON existente. Envie o novo conteúdo JSON no corpo da requisição.

#### `DELETE /api/bins/:id`

Deleta um bin de JSON.

### Arquivos

#### `POST /api/files`

Faz o upload de um arquivo. Use um cliente HTTP (como Postman, Insomnia, ou `fetch` no frontend) para enviar uma requisição `multipart/form-data` com o arquivo no campo `file`.

**Exemplo de Resposta:**

```json
{
  "message": "Arquivo enviado com sucesso!",
  "filename": "a1b2c3d4-e5f6-7890-1234-567890abcdef.png",
  "url": "/api/files/a1b2c3d4-e5f6-7890-1234-567890abcdef.png"
}
```

#### `GET /api/files/:filename`

Faz o download de um arquivo pelo seu nome de arquivo único (retornado no upload).
