const { verifyToken } = require('../helper/jwt');
const { User, Lodging } = require('../models/index');

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token tidak tersedia' });
    }

    const token = authHeader.slice(7);
    try {
        const decoded = verifyToken(token);
        const user = await User.findByPk(decoded.id)
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = { authenticateToken };
