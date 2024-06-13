const conexao = require('../conexao');

const listarCategorias = async (req, res) => {
    try {
        const { rows } = await conexao.query('SELECT * FROM categorias');
        return res.json(rows);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor' });
    }
};

module.exports = { listarCategorias };
