const express = require('express');
const router = express.Router();
const { 
  getAllGames, 
  getGameById, 
  createGame, 
  updateGame, 
  deleteGame 
} = require('./database');

router.get('/', async (req, res) => {
  try {
    const games = await getAllGames();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar jogos' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const game = await getGameById(req.params.id);
    game ? res.json(game) : res.status(404).json({ error: 'Jogo não encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar jogo' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newGame = await createGame(req.body);
    res.status(201).json(newGame);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar jogo' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedGame = await updateGame(req.params.id, req.body);
    res.json(updatedGame);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar jogo' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const success = await deleteGame(req.params.id);
    success ? res.json({ message: 'Jogo deletado' }) : res.status(404).json({ error: 'Jogo não encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar jogo' });
  }
});

module.exports = router;