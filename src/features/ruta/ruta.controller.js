const Horario = require('../horario/horario.model');
const Ruta = require('../ruta/ruta.model');
const { Op } = require('sequelize');
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

controlador.buscar = async (req, res) => {
  try {
    const { origen_id, destino_id } = req.params;

    const rutas = await Ruta.findAll({
      where: { origen: origen_id, destino: destino_id }
    })
    console.log(rutas.map(r => r.id));

    const today = new Date();
    const horario = await Horario.findAll({
      where: {
        ruta_id: rutas.map(r => r.id),
        estado: 'ACTIVO',
        fechaSalida: { [Op.gte]: today }
      },
      include: [{ model: Ruta, as : 'ruta' }],
      order: [
        ['fechaSalida', 'ASC'],
        ['horaSalida', 'ASC']
      ]
    });
    return res.json(horario);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
}

module.exports = controlador;
