const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

module.exports = (req, _res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw new ApiError(401, 'Token requerido');

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload; // { id, email }
    next();
  } catch (e) {
    next(new ApiError(401, 'Token inválido o expirado'));
  }
};
