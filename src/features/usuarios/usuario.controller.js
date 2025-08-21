const Usuario = require('../usuarios/usuario.model');
const controlador = {}

controlador.index = async (req, res) => {
  try {
    const model = await Usuario.findAll();
    return res.json(model);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};

controlador.show = async (req, res) => {
  try {
    const model = await Usuario.findByPk(req.params.id);
    if (!model) return res.status(404).json({ msg: 'Usuario no encontrado' });
    return res.json(model);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};

controlador.create = async (req, res) => {
  try {
    const usuario = req.body.usuario;
    const model = await Usuario.create(usuario);
    res.status(201).json(model);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};

controlador.update = async (req, res) => {
  try {
    const model = await Usuario.findByPk(req.params.id);
    if (!model) return res.status(404).json({ msg: 'Usuario no encontrado' });
    await model.update(req.body.usuario);
    res.json(model);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};

controlador.eliminar = async (req, res) => {
  try {
    const model = await Usuario.findByPk(req.params.id);
    if (!model) return res.status(404).json({ msg: 'Usuario no encontrado' });
    await model.destroy();
    res.json({ msg: 'Usuario eliminado' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};

module.exports = controlador;
