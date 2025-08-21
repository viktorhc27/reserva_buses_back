const { Asientos } = require('../associations');
const Bus = require('../bus/bus.model');
const controlador = {}

controlador.index = async (req, res) => {
    try {
        const model = await Bus.findAll();
        return res.json(model);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Hable con el administrador', err });
    }
};

controlador.show = async (req, res) => {
    try {
        const model = await Bus.findByPk(req.params.id);
        if (!model) return res.status(404).json({ msg: 'Bus no encontrado' });
        return res.json(model);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Hable con el administrador', err });
    }
};

controlador.create = async (req, res) => {
    try {
        const bus = req.body.bus;
        const model = await Bus.create(bus);

        const asientos = []
        for (let i = 1; i <= model.capacidad; i++) {
            asientos.push({ numero: i, bus_id: model.id })
        }

        await Asientos.bulkCreate(asientos)

        return res.status(201).json({ response: 'Bus Creado exitosamente con ' + model.capacidad + ' asientos', model });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Hable con el administrador', err });
    }
};

controlador.update = async (req, res) => {
    try {
        const model = await Bus.findByPk(req.params.id);
        if (!model) return res.status(404).json({ msg: 'Bus no encontrado' });
        await model.update(req.body.bus);
        res.json({response:'Bus Actualizado'});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Hable con el administrador', err });
    }
};

controlador.eliminar = async (req, res) => {
    try {
        const model = await Bus.findByPk(req.params.id);
        if (!model) return res.status(404).json({ msg: 'Bus no encontrado' });
        await model.destroy();
        res.json({ response: 'Bus eliminado' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Hable con el administrador', err });
    }
};

module.exports = controlador;
