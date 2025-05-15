const express = require('express');
const cors = require('cors');
const app = express();
const gamesRouter = require('./routes');

app.use(cors());
app.use(express.json());
app.use('/games', gamesRouter);

app.listen(3000, () => {
  console.log('Servidor REST rodando em http://localhost:3000');
});