const bcrypt = require('bcrypt');
const conexao = require('../conexao');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Nome, email e senha são obrigatórios' });
    }

    try {
        const { rowCount } = await conexao.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (rowCount > 0) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const query = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)';
        const params = [nome, email, senhaCriptografada];

        await conexao.query(query, params);

        return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor' });
    }
};

const atualizarUsuario = async (req, res) => {
    const usuarioId = req.usuarioId;
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Nome, email e senha são obrigatórios' });
    }

    try {
        const { rowCount: emailExistente } = await conexao.query('SELECT * FROM usuarios WHERE email = $1 AND id != $2', [email, usuarioId]);

        if (emailExistente > 0) {
            return res.status(400).json({ mensagem: 'O e-mail informado já está sendo utilizado por outro usuário' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const query = 'UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4';
        const params = [nome, email, senhaCriptografada, usuarioId];

        await conexao.query(query, params);

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor' });
    }
};

const detalharUsuario = async (req, res) => {
    const usuarioId = req.usuarioId;

    try {
        const { rows, rowCount } = await conexao.query('SELECT id, nome, email FROM usuarios WHERE id = $1', [usuarioId]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        return res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor' });
    }
};

module.exports = {
    cadastrarUsuario,
    detalharUsuario,
    atualizarUsuario
};