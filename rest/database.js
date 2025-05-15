const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

const DB_PATH = path.join(__dirname, '../games.db');

// Configuração da conexão com o banco
async function getDbConnection() {
  return open({
    filename: DB_PATH,
    driver: sqlite3.Database
  });
}

// Cria a tabela se não existir
async function initializeDatabase() {
  const db = await getDbConnection();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      developer TEXT NOT NULL,
      genre TEXT NOT NULL,
      releaseYear INTEGER NOT NULL,
      platform TEXT NOT NULL,
      rating REAL NOT NULL,
      status TEXT NOT NULL
    )
  `);
  await db.close();
}

// Operações CRUD
const dbOperations = {
  getAllGames: async () => {
    const db = await getDbConnection();
    const games = await db.all('SELECT * FROM games');
    await db.close();
    return games.map(game => ({
      ...game,
      platform: game.platform.split(', ') // Convertendo string para array
    }));
  },

  getGameById: async (id) => {
    const db = await getDbConnection();
    const game = await db.get('SELECT * FROM games WHERE id = ?', [id]);
    await db.close();
    return game ? {
      ...game,
      platform: game.platform.split(', ') // Convertendo string para array
    } : null;
  },

  createGame: async (gameData) => {
    const db = await getDbConnection();
    const { lastID } = await db.run(
      `INSERT INTO games (title, developer, genre, releaseYear, platform, rating, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        gameData.title,
        gameData.developer,
        gameData.genre,
        gameData.releaseYear,
        gameData.platform.join(', '), // Convertendo array para string
        gameData.rating,
        gameData.status || 'Backlog'
      ]
    );
    await db.close();
    return { id: lastID, ...gameData };
  },

  updateGame: async (id, gameData) => {
  const db = await getDbConnection();
  
  try {
    // Verifica se o jogo existe primeiro
    const existingGame = await db.get('SELECT * FROM games WHERE id = ?', [id]);
    if (!existingGame) return null;

    // Prepara os dados para atualização
    const updatedGame = {
      ...existingGame,
      ...gameData,
      platform: gameData.platform ? gameData.platform.join(', ') : existingGame.platform
    };

    await db.run(
      `UPDATE games SET 
        title = ?, 
        developer = ?, 
        genre = ?, 
        releaseYear = ?, 
        platform = ?, 
        rating = ?, 
        status = ?
       WHERE id = ?`,
      [
        updatedGame.title,
        updatedGame.developer,
        updatedGame.genre,
        updatedGame.releaseYear,
        updatedGame.platform,
        updatedGame.rating,
        updatedGame.status,
        id
      ]
    );
    
    return { id, ...updatedGame };
    } finally {
    await db.close();
    }
  },

  deleteGame: async (id) => {
    const db = await getDbConnection();
    const { changes } = await db.run('DELETE FROM games WHERE id = ?', [id]);
    await db.close();
    return changes > 0;
  }
};

initializeDatabase(); // Cria a tabela ao iniciar

module.exports = dbOperations;