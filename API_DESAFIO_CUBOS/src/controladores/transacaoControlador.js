const conexao = require('../conexao');

const listarTransacoes = async (req, res) => {
    const usuarioId = req.usuarioId;

    try {
        const { rows } = await conexao.query('SELECT * FROM transacoes WHERE usuario_id = $1', [usuarioId]);
        return res.json(rows);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor' });
    }
};

const obterTransacaoPorId = async (req, res) => {
    const usuarioId = req.usuarioId;
    const { id } = req.params;

    try {
        const { rows, rowCount } = await conexao.query('SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2', [id, usuarioId]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Transação não encontrada' });
        }

        return res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor' });
    }
};

const cadastrarTransacao = async (req, res) => {
    const usuarioId = req.usuarioId;
    const { tipo, descricao, valor, data, categoria_id } = req.body;

    if (!tipo || !descricao || !valor || !data || !categoria_id) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }

    try {
        const query = 'INSERT INTO transacoes (tipo, descricao, valor, data, categoria_id, usuario_id) VALUES ($1, $2, $3, $4, $5, $6)';
        const params = [tipo, descricao, valor, data, categoria_id, usuarioId];

        await conexao.query(query, params);

        return res.status(201).json({ mensagem: 'Transação cadastrada com sucesso' });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor' });
    }
};

const atualizarTransacao = async (req, res) => {
    const usuarioId = req.usuarioId;
    const { id } = req.params;
    const { tipo, descricao, valor, data, categoria_id } = req.body;

    if (!tipo || !descricao || !valor || !data || !categoria_id) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }

    try {
        const { rowCount } = await conexao.query('SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2', [id, usuarioId]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Transação não encontrada' });
        }

        const query = 'UPDATE transacoes SET tipo = $1, descricao = $2, valor = $3, data = $4, categoria_id = $5 WHERE id = $6';
        const params = [tipo, descricao, valor, data, categoria_id, id];

        await conexao.query(query, params);

        return res.status(200).json({ mensagem: 'Transação atualizada com sucesso' });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor' });
    }
};

const deletarTransacao = async (req, res) => {
    const usuarioId = req.usuarioId;
    const { id } = req.params;

    try {
        const { rowCount } = await conexao.query('SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2', [id, usuarioId]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Transação não encontrada' });
        }

        await conexao.query('DELETE FROM transacoes WHERE id = $1', [id]);

        return res.status(200).json({ mensagem: 'Transação deletada com sucesso' });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no servidor' });
    }
};

module.exports = {
    listarTransacoes,
    obterTransacaoPorId,
    cadastrarTransacao,
    atualizarTransacao,
    deletarTransacao
};
