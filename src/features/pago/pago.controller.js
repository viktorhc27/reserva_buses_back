const Pago = require('../pago/pago.model');
const controlador = {}

controlador.index = async (req, res) => {
    try {
        const model = await Pago.findAll();
        return res.json(model);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Hable con el administrador', err });
    }
};

controlador.show = async (req, res) => {
    try {
        const model = await Pago.findByPk(req.params.id);
        if (!model) return res.status(404).json({ msg: 'Pago no encontrado' });
        return res.json(model);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Hable con el administrador', err });
    }
};

controlador.create = async (req, res) => {
    try {
        const pago = req.body.pago;
        const model = await Pago.create(pago);
        res.status(201).json(model);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Hable con el administrador', err });
    }
};

controlador.update = async (req, res) => {
    try {
        const model = await Pago.findByPk(req.params.id);
        if (!model) return res.status(404).json({ msg: 'Pago no encontrado' });
        await model.update(req.body.pago);
        res.json(model);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Hable con el administrador', err });
    }
};

controlador.eliminar = async (req, res) => {
    try {
        const model = await Pago.findByPk(req.params.id);
        if (!model) return res.status(404).json({ msg: 'Pago no encontrado' });
        await model.destroy();
        res.json({ msg: 'Pago eliminado' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Hable con el administrador', err });
    }
};

module.exports = controlador;
