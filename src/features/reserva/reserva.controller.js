const { Op } = require('sequelize');
const { Asientos } = require('../associations');
const Reserva = require('../reserva/reserva.model');
const controlador = {}
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
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

    if (!reserva || reserva.length === 0) {
      return res.status(400).json({
        response: 'No hay asientos seleccionados'
      });
    }

    for (const r of reserva) {
      const disponible = await Reserva.findOne({ where: { asientos_id: r.asientos_id, horario_id: r.horario_id } });
      const asiento = await Asientos.findOne({ where: { id: r.asientos_id, bus_id: r.bus_id } });

      if (!asiento) return res.status(404).json({ response: 'Asiento no encontrado' });
      if (disponible) return res.status(500).json({ response: 'Asiento no disponible' });
    }

    let reservasSaved = await Reserva.bulkCreate(reserva);

    return res.json({ response: 'Reservado con éxito', reservasSaved });

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

controlador.verificarReserva = async (req, res) => {
  try {
    const { asientos_id, horario_id } = req.body.reserva;

    const ocupados = await Reserva.findAll({
      where: {
        horario_id: horario_id,
        asientos_id: asientos_id
      }
    });
    if (ocupados.length > 0) {
      return res.json(false)
    }
    return res.json(true)


  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
}
controlador.verificarReservaLista = async (req, res) => {
  try {
    const reservas = req.body.reserva;

    // Ejecutamos todas las consultas en paralelo
    const resultados = await Promise.all(
      reservas.map(r =>
        Reserva.findOne({
          where: {
            horario_id: r.horario_id,
            asientos_id: r.asientos_id
          },
          include: [{ model: Asientos, as: 'asiento' }]
        })
      )
    );


    // Filtramos los asientos ocupados
    const ocupados = resultados
      .filter(r => r) // si existe, está ocupado
      .map(r => r.asiento.numero);

    // Calculamos asientos libres
    const libres = (ocupados.length === 0) ? 1 : reservas.length - ocupados.length;
    // Solo agregamos 'response' si hay ocupados
    const responseObj = { libre: ocupados.length === 0, qty: libres };
    if (ocupados.length > 0) {
      responseObj.response = `Los siguientes asientos no están disponibles: ${ocupados.join(", ")}.`;
    }

    return res.json(responseObj);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Hable con el administrador", err });
  }
};
controlador.ticket_qr = async (req, res) => {
  try {
    const doc = new PDFDocument({
      size: [250, 600],
      margins: { top: 20, bottom: 20, left: 20, right: 20 }
    });
    const { reserva_id } = req.params
    let ticket = await Reserva.findByPk(reserva_id)
    if (!ticket) {
      return res.status(404).json({ msg: 'Reserva no encontrada' });
    }
    // Configurar cabecera para PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=pdf_con_qr.pdf');
    // Enviar PDF directamente al cliente
    doc.pipe(res);

    // Agregar texto
    doc.fontSize(14).text('Ticket de Reserva', { align: 'center' })
    doc.moveDown()


    // Generar QR como data URL
    const qrData = await QRCode.toDataURL(`${ticket.id}`);
    const base64Data = qrData.replace(/^data:image\/png;base64,/, '');
    const qrBuffer = Buffer.from(base64Data, 'base64');

    // Insertar QR
    doc.image(qrBuffer, 50, 100, { width: 150, height: 150 });

    doc.end(); // Finalizar PDF
    // Texto debajo del QR
    doc.fontSize(12).text('Escanea el QR para ver tu reserva', 50, 280);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Hable con el administrador', err });
  }
}
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
