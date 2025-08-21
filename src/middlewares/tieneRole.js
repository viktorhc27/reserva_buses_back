const ApiError = require('../utils/ApiError');

module.exports = (...roles) => {
    return (req, _res, next) => {
        try {
            const usuario = req.usuario; 

            if (!usuario || !usuario.rol) {
                throw new ApiError(401, 'Usuario no autenticado');
            }

            if (!roles.includes(usuario.rol)) {
                throw new ApiError(403, 'Rol no autorizado');
            }

            next();
        } catch (error) {
            next(error);
        }
    };
}