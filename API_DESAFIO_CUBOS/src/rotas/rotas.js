const express = require('express');
const autenticacaoMiddleware = require('../middlewares/autenticacaoMiddleware');
const autenticacaoControlador = require('../controladores/autenticacaoControlador');
const usuarioControlador = require('../controladores/usuarioControlador');
const categoriaControlador = require('../controladores/categoriaControlador');
const transacaoControlador = require('../controladores/transacaoControlador');

const rotas = express.Router();

rotas.post('/login', autenticacaoControlador.login);
rotas.post('/usuarios', usuarioControlador.cadastrarUsuario);

rotas.use(autenticacaoMiddleware);

rotas.get('/categorias', categoriaControlador.listarCategorias);

rotas.get('/usuario', usuarioControlador.detalharUsuario);
rotas.put('/usuario', usuarioControlador.atualizarUsuario);

rotas.get('/transacoes', transacaoControlador.listarTransacoes);
rotas.get('/transacoes/extrato', transacaoControlador.obterExtrato); // Nova rota
rotas.get('/transacoes/:id', transacaoControlador.obterTransacaoPorId);
rotas.post('/transacoes', transacaoControlador.cadastrarTransacao);
rotas.put('/transacoes/:id', transacaoControlador.atualizarTransacao);
rotas.delete('/transacoes/:id', transacaoControlador.deletarTransacao);

module.exports = rotas;
