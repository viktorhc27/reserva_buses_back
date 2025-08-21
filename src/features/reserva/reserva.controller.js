const { Asientos } = require('../associations');
const Reserva = require('../reserva/reserva.model');
const controlador = {}

controlador.index = async (req, res) => {
  try {
    const model = await Reserva.findAll();
    return res.json(model);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};

controlador.reservar = async (req, res) => {
  try {
    const { reserva } = req.body;

    const disponible = await Reserva.findOne({ where: { asientos_id: reserva.numero, horario_id: reserva.horario_id } })
    const asiento = await Asientos.findOne({
      where: { numero: reserva.numero, bus_id: horario.bus_id }
    });
    if (!asiento) return res.status(404).json({ response: 'Asiento no encontrado' });
    if (disponible) {
      return res.status(500).json({ response: 'Asiento no disponible' })
    }

    await Reserva.create({
      asientos_id: reserva.numero,
      horario_id: reserva.horario_id,
      usuario_id: reserva.usuario_id
    })

    return res.json({ response: 'Reservado con exito' })

  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};
controlador.show = async (req, res) => {
  try {
    const model = await Reserva.findByPk(req.params.id);
    if (!model) return res.status(404).json({ msg: 'Reserva no encontrada' });
    return res.json(model);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};

controlador.create = async (req, res) => {
  try {
    const reserva = req.body.reserva;
    const model = await Reserva.create(reserva);
    res.status(201).json(model);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};

controlador.update = async (req, res) => {
  try {
    const model = await Reserva.findByPk(req.params.id);
    if (!model) return res.status(404).json({ msg: 'Reserva no encontrada' });
    await model.update(req.body.reserva);
    res.json(model);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};

controlador.eliminar = async (req, res) => {
  try {
    const model = await Reserva.findByPk(req.params.id);
    if (!model) return res.status(404).json({ msg: 'Reserva no encontrada' });
    await model.destroy();
    res.json({ msg: 'Reserva eliminada' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};

module.exports = controlador;
