const Usuario = require("../usuarios/usuario.model");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const controlador = {};

controlador.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Buscar usuario con contraseña
        const usuario = await Usuario.scope('withPassword').findOne({ where: { email } });
        if (!usuario) return res.status(404).json({ response: false, message: "Usuario no encontrado" });

        const valido = await usuario.comparePassword(password);
        if (!valido) return res.status(401).json({ response: false, message: "Contraseña incorrecta" });

        // Generar token
        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Eliminar el campo de contraseña antes de responder
        const usuarioSinPassword = usuario.toJSON();
        delete usuarioSinPassword.withPassword;

        return res.json({ response: true, token, usuario: usuarioSinPassword });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ response: false, msg: 'Hable con el administrador', error });
    }
}

controlador.create = async (req, res) => {
    try {
        const usuario = req.body.usuario;
        const model = await Usuario.create(usuario);
        return res.status(201).json(model);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Hable con el administrador', err });
    }
};


controlador.isLogged = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.usuario.id)
        // Generar token
        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.json({ logged: true, usuario, token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ logged: false, msg: 'Hable con el administrador', error });
    }
}
module.exports = controlador;