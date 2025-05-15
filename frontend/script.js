const API_URL = 'http://localhost:3000/games';
let currentGameId = null;

// ====================== FUNÇÕES PRINCIPAIS ====================== //
async function fetchGames() {
  try {
    const response = await fetch(API_URL);
    const games = await response.json();
    renderGames(games);
  } catch (error) {
    showError('Falha ao carregar jogos');
  }
}

async function saveGame(gameData) {
  try {
    const method = currentGameId ? 'PUT' : 'POST';
    const url = currentGameId ? `${API_URL}/${currentGameId}` : API_URL;

    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameData)
    });

    if (!response.ok) throw new Error('Falha na operação');
    return true;
  } catch (error) {
    showError(error.message);
    return false;
  }
}

async function deleteGame(id) {
  if (!confirm('Tem certeza que deseja excluir este jogo?')) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Falha ao excluir');
    fetchGames();
  } catch (error) {
    showError('Erro ao excluir jogo');
  }
}

// ====================== INTERFACE ====================== //
function toggleForm() {
  const overlay = document.getElementById('formOverlay');
  overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
  if (overlay.style.display === 'none') resetForm();
}

function resetForm() {
  document.getElementById('gameForm').reset();
  document.getElementById('formTitle').textContent = 'Adicionar Novo Jogo';
  currentGameId = null;
}

async function loadGameForEdit(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const game = await response.json();
    
    // Preencher formulário
    document.getElementById('title').value = game.title;
    document.getElementById('developer').value = game.developer;
    document.getElementById('genre').value = game.genre;
    document.getElementById('releaseYear').value = game.releaseYear;
    document.getElementById('rating').value = game.rating;
    document.getElementById('status').value = game.status;

    // Plataformas
    document.querySelectorAll('input[name="platform"]').forEach(checkbox => {
      checkbox.checked = game.platform.includes(checkbox.value);
    });

    currentGameId = game.id;
    document.getElementById('formTitle').textContent = 'Editar Jogo';
    toggleForm();
  } catch (error) {
    showError('Falha ao carregar jogo');
  }
}

function createGameCard(game) {
  const card = document.createElement('div');
  card.className = 'game-card';
  card.innerHTML = `
    <div class="game-header">
      <h3 class="game-title">${game.title}</h3>
      <span class="game-rating">⭐ ${game.rating}/10</span>
    </div>
    <div class="game-details">
      <p><strong>Desenvolvedora:</strong> ${game.developer}</p>
      <p><strong>Gênero:</strong> ${game.genre}</p>
      <p><strong>Ano:</strong> ${game.releaseYear}</p>
      <p><strong>Plataformas:</strong> ${game.platform.join(', ')}</p>
      <p><strong>Status:</strong> ${game.status}</p>
    </div>
    <div class="game-actions">
      <button class="btn-edit" onclick="loadGameForEdit('${game.id}')">
        <i class="fas fa-edit"></i> Editar
      </button>
      <button class="btn-delete" onclick="deleteGame('${game.id}')">
        <i class="fas fa-trash"></i> Excluir
      </button>
    </div>
  `;
  return card;
}

function renderGames(games) {
  const grid = document.getElementById('gameGrid');
  grid.innerHTML = '';
  games.forEach(game => grid.appendChild(createGameCard(game)));
}

function showError(message) {
  alert(`Erro: ${message}`);
}

// ====================== EVENTOS ====================== //
document.getElementById('gameForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const gameData = {
    title: document.getElementById('title').value,
    developer: document.getElementById('developer').value,
    genre: document.getElementById('genre').value,
    releaseYear: parseInt(document.getElementById('releaseYear').value),
    platform: Array.from(document.querySelectorAll('input[name="platform"]:checked'))
               .map(checkbox => checkbox.value),
    rating: parseFloat(document.getElementById('rating').value),
    status: document.getElementById('status').value
  };

  const success = await saveGame(gameData);
  if (success) {
    toggleForm();
    fetchGames();
  }
});

// Inicialização
document.addEventListener('DOMContentLoaded', fetchGames);