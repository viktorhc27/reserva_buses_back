const { Asientos, Horario, Bus, Reserva } = require('../associations');

const controlador = {}

controlador.index = async (req, res) => {
    try {
        const model = await Asientos.findAll();
        return res.json(model);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Hable con el administrador', err });
    }
};

controlador.asientosDisponibles = async (req, res) => {
    try {
        const id = req.params.id

        const horario = await Horario.findByPk(id)

        const reservas = await Reserva.findAll({ where: { horario_id: id } })
        const reservasSet = new Set(reservas.map(e => e.asientos_id));//to json para usar .has

        const asientos = await Asientos.findAll({ where: { bus_id: horario.bus_id } })

        const mapAsientos = asientos.map(a => {
            let estado = "disponible";

            if (reservasSet.has(a.id)) {
                estado = "ocupado"
            }
            if (a.estado == 'fuera_servicio') {
                estado = 'fuera_servicio'
            }

            return {
                id: a.id,
                horario_id: horario.id,
                numero: a.numero,
                bus: horario.nus_id,
                estado
            }

        })
        return res.json({ mapAsientos })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Hable con el administrador', err });
    }
};

controlador.asientoBus = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);
        
        const list = await Asientos.findAll({ where: { bus_id: id } })
     
        return res.json(list)

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Hable con el administrador', err });
    }
};


module.exports = controlador;
