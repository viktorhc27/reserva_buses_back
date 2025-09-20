const Clientes = require("./clientes.model.js");


const controlador = {}

controlador.index = async (req, res) => {
  try {
    const model = await Clientes.findAll();
    return res.json(model);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};


controlador.create = async (req, res) => {
  try {
    const user = req.body.cliente;
    const model = await Clientes.create(user);
    return res.status(201).json({ response: 'Registrado con éxito', model: model.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};

controlador.update = async (req, res) => {
  try {
    const model = await Clientes.findByPk(req.params.id);
    if (!model) return res.status(404).json({ msg: 'Cliente no encontrado' });
    await model.update(req.body.cliente);
    res.json(model);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
};

module.exports = controlador;
