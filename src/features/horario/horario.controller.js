const Horario = require('../horario/horario.model');
const controlador = {}

controlador.index = async (req, res) => {
  try {
    const model = await Horario.findAll();
    return res.json(model);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};

controlador.show = async (req, res) => {
  try {
    const model = await Horario.findByPk(req.params.id);
    if (!model) return res.status(404).json({ msg: 'Horario no encontrado' });
    return res.json(model);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};

controlador.create = async (req, res) => {
  try {
    const horario = req.body.horario;
    const model = await Horario.create(horario);
    res.status(201).json(model);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};

controlador.update = async (req, res) => {
  try {
    const model = await Horario.findByPk(req.params.id);
    if (!model) return res.status(404).json({ msg: 'Horario no encontrado' });
    await model.update(req.body.horario);
    res.json(model);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};

controlador.eliminar = async (req, res) => {
  try {
    const model = await Horario.findByPk(req.params.id);
    if (!model) return res.status(404).json({ msg: 'Horario no encontrado' });
    await model.destroy();
    res.json({ msg: 'Horario eliminado' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};

module.exports = controlador;
