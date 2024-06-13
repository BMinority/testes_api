const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const conexao = require('../conexao');
const config = require('../config');

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Email e senha são obrigatórios' });
    }

    try {
        const { rows, rowCount } = await conexao.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        const usuario = rows[0];

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(400).json({ mensagem: 'Senha incorreta' });
        }

        const token = jwt.sign({ id: usuario.id }, config.segredoJwt, { expiresIn: '8h' });

        return res.json({ token });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor' });
    }
};

module.exports = { login };
