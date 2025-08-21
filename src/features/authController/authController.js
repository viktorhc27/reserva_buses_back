const Usuario = require("../usuarios/usuario.model");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const controlador = {};

controlador.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.scope('withPassword').findOne({ where: { email } });
        if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });

        const valido = await usuario.comparePassword(password);
        if (!valido) return res.status(401).json({ message: "Contraseña incorrecta" });
        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.json({ message: "Login exitoso", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Hable con el administrador', error });
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



module.exports = controlador;