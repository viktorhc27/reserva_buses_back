const Usuario = require('./usuarios/usuario.model');
const Bus = require('./bus/bus.model');
const Ruta = require('./ruta/ruta.model');
const Horario = require('./horario/horario.model');
const Reserva = require('./reserva/reserva.model');
const Pago = require('./pago/pago.model');
const Asientos = require('./asientos/asientos.model');

// Relaciones



Ruta.hasMany(Horario, { foreignKey: 'ruta_id' });
Horario.belongsTo(Ruta, { foreignKey: 'ruta_id' });

Usuario.hasMany(Reserva, { foreignKey: 'usuario_id' });
Reserva.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Horario.hasMany(Reserva, { foreignKey: 'horario_id' });
Reserva.belongsTo(Horario, { foreignKey: 'horario_id' });

Reserva.hasOne(Pago, { foreignKey: 'reserva_id' });
Pago.belongsTo(Reserva, { foreignKey: 'reserva_id' });

Bus.hasMany(Horario, { foreignKey: 'bus_id' });
Horario.belongsTo(Bus, { foreignKey: 'bus_id' });

Bus.hasMany(Asientos, { foreignKey: 'bus_id' });
Asientos.belongsTo(Bus, { foreignKey: 'bus_id' });

Usuario.hasOne(Horario, { foreignKey: 'usuario_id' })
Horario.belongsTo(Usuario, { foreignKey: 'usuario_id' })

Asientos.hasOne(Reserva, { foreignKey: 'asientos_id' })
Reserva.belongsTo(Asientos, { foreignKey: 'asientos_id' })


module.exports = { Usuario, Bus, Ruta, Horario, Reserva, Pago, Asientos };
