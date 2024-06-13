const express = require('express');
const rotas = require('./rotas/rotas');
const config = require('./config');
const app = express();

app.use(express.json());

app.use(rotas);

app.listen(config.portaServidor, () => {
    console.log(`Servidor rodando na porta ${config.portaServidor}`);
});
