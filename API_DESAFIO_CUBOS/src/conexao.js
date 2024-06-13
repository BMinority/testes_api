const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool({
    host: config.hostBanco,
    port: config.portaBanco,
    database: config.nomeBanco,
    user: config.usuarioBanco,
    password: config.senhaBanco
});

module.exports = pool;