const Usuarios_invitados = require('../usuarios_invitados/usuarios_invitados.model');

const controlador = {}

controlador.index = async (req, res) => {
  try {
    const model = await Usuarios_invitados.findAll();
    return res.json(model);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};


controlador.create = async (req, res) => {
  try {
    const user = req.body.usuarios_invitados;
    const model = await Usuarios_invitados.create(user);
    res.status(201).json(model);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};


module.exports = controlador;
