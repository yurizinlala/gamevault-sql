# 🎮 GameVault – CRUD Completo com Banco de Dados Relacional

Aplicação acadêmica desenvolvida na **Atividade 3** da disciplina de Desenvolvimento Web. Implementa um **CRUD** completo de jogos em um banco relacional (SQLite) com back-end RESTful e front-end em HTML + JavaScript puro.

O link com o vídeo explicativo para mostrar o projeto em ação: 

---

## 📌 Recursos

### Back-end (/backend)
- **CRUD completo** para a entidade `games` (Create, Read, Update, Delete)
- Persistência em **SQLite3**
- Rotas RESTful com validação de payloads
- Conversão automática de tipos para suportar arrays (plataformas)
- CORS habilitado

### Front-end (/frontend)
- Interface responsiva em grid de cards
- Formulário interativo para criação, edição e exclusão
- Consumo da API via `fetch()`
- Mensagens de erro e confirmação

---

## 🛠️ Tecnologias Utilizadas

**Back-end:**
- Node.js
- Express
- SQLite3
- CORS

**Front-end:**
- HTML5
- CSS3 (Flexbox/Grid)
- JavaScript Vanilla (ES6+)

---

## 🚀 Instalação e Execução

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/gamevault-atividade3.git
   cd gamevault-atividade3
   ```
2. **Instale as dependências do back-end**
   ```bash
   cd rest
   npm install sqlite3 sqlite
   ```
3. **Configuração do banco de dados**
   - O arquivo `backend/schema.sql` contém o script de criação da tabela `games`:
     ```sql
     CREATE TABLE IF NOT EXISTS games (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       title TEXT NOT NULL,
       developer TEXT NOT NULL,
       genre TEXT NOT NULL,
       releaseYear INTEGER NOT NULL,
       platform TEXT NOT NULL,
       rating REAL NOT NULL,
       status TEXT NOT NULL
     );
     ```
4. **Inicie o servidor REST**
   ```bash
   cd rest
   node server.js
   ```
   O servidor estará disponível em `http://localhost:3000`.
5. **Abra o front-end**
   - No navegador, abra `frontend/index.html` (pode usar Live Server ou `file://`).
   - A aplicação irá se conectar ao back-end automaticamente.

---

## 📋 Uso via Front-end

- **Adicionar Jogo:**
  1. Clique em **Novo Jogo**
  2. Preencha o formulário e envie
- **Editar Jogo:**
  1. Clique no ícone de lápis no card
  2. Modifique os dados e salve
- **Excluir Jogo:**
  1. Clique no ícone de lixeira
  2. Confirme a exclusão

---

## 📋 Uso via API (Exemplos curl)

```bash
# Listar todos os jogos
curl http://localhost:3000/games

# Obter jogo por ID
curl http://localhost:3000/games/1

# Criar novo jogo
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"title":"Cyberpunk 2077","developer":"CD Projekt Red","genre":"RPG","releaseYear":2020,"platform":["PC","PlayStation"],"rating":7.5,"status":"Jogando"}' \
  http://localhost:3000/games

# Atualizar jogo (ID=1)
curl -X PUT \
  -H "Content-Type: application/json" \
  -d '{"rating":8.0}' \
  http://localhost:3000/games/1

# Deletar jogo (ID=1)
curl -X DELETE http://localhost:3000/games/1
```

---

## 🗃️ Estrutura do Banco de Dados

Arquivo: `rest/schema.sql`

```sql
CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  developer TEXT NOT NULL,
  genre TEXT NOT NULL,
  releaseYear INTEGER NOT NULL,
  platform TEXT NOT NULL,
  rating REAL NOT NULL,
  status TEXT NOT NULL
);
``` 

O banco gerado ficará em `../games.db`.

---

## 📚 Documentação da API REST

| Método | Endpoint        | Descrição                        | Payload Exemplo                             |
|------:|:----------------|:---------------------------------|:--------------------------------------------|
| GET   | `/games`        | Lista todos os jogos             | —                                           |
| GET   | `/games/:id`    | Retorna jogo por ID              | —                                           |
| POST  | `/games`        | Cria novo jogo                   | `{"title":"Novo","developer":"Dev","genre":"FPS","releaseYear":2024,"platform":["PC"],"rating":8.0,"status":"Backlog"}` |
| PUT   | `/games/:id`    | Atualiza jogo existente          | `{"rating":9.5}`                           |
| DELETE| `/games/:id`    | Remove jogo por ID               | —                                           |
