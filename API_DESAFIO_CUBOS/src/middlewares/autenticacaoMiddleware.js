const jwt = require('jsonwebtoken');
const config = require('../config');

const autenticacaoMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ mensagem: 'Token não fornecido' });
    }
    const token = authorization.replace('Bearer ', '').trim();
    try {
        const { id } = jwt.verify(token, config.segredoJwt);
        req.usuarioId = id;
        return next();
    } catch (error) {
        return res.status(401).json({ mensagem: 'Token inválido' });
    }
};

module.exports = autenticacaoMiddleware;
