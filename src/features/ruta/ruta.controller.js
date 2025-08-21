const Ruta = require('../ruta/ruta.model');
const controlador = {}

controlador.index = async (req, res) => {
  try {
    const model = await Ruta.findAll();
    return res.json(model);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};

controlador.show = async (req, res) => {
  try {
    const model = await Ruta.findByPk(req.params.id);
    if (!model) return res.status(404).json({ msg: 'Ruta no encontrada' });
    return res.json(model);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};

controlador.create = async (req, res) => {
  try {
    const ruta = req.body.ruta;
    const model = await Ruta.create(ruta);
    res.status(201).json(model);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};

controlador.update = async (req, res) => {
  try {
    const model = await Ruta.findByPk(req.params.id);
    if (!model) return res.status(404).json({ msg: 'Ruta no encontrada' });
    await model.update(req.body.ruta);
    res.json(model);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};

controlador.eliminar = async (req, res) => {
  try {
    const model = await Ruta.findByPk(req.params.id);
    if (!model) return res.status(404).json({ msg: 'Ruta no encontrada' });
    await model.destroy();
    res.json({ msg: 'Ruta eliminada' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};

module.exports = controlador;
