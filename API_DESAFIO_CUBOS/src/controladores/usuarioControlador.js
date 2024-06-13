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

module.exports = { cadastrarUsuario };
