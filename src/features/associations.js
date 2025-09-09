const Usuario = require('./usuarios/usuario.model');
const Bus = require('./bus/bus.model');
const Ruta = require('./ruta/ruta.model');
const Horario = require('./horario/horario.model');
const Reserva = require('./reserva/reserva.model');
const Pago = require('./pago/pago.model');
const Asientos = require('./asientos/asientos.model');
const Usuarios_invitados = require('./usuarios_invitados/usuarios_invitados.model');

// Relaciones

Ruta.hasMany(Horario, { foreignKey: 'ruta_id' });
Horario.belongsTo(Ruta, { foreignKey: 'ruta_id', as: 'ruta' });

Usuario.hasMany(Reserva, { foreignKey: 'usuario_id' });
Reserva.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Horario.hasMany(Reserva, { foreignKey: 'horario_id' });
Reserva.belongsTo(Horario, { foreignKey: 'horario_id' });

Reserva.hasOne(Pago, { foreignKey: 'reserva_id' });
Pago.belongsTo(Reserva, { foreignKey: 'reserva_id' });

Bus.hasMany(Horario, { foreignKey: 'bus_id' });
Horario.belongsTo(Bus, { foreignKey: 'bus_id',as: 'bus' });

Bus.hasMany(Asientos, { foreignKey: 'bus_id', as: 'asientos' });
Asientos.belongsTo(Bus, { foreignKey: 'bus_id' });

Usuario.hasOne(Horario, { foreignKey: 'usuario_id' })
Horario.belongsTo(Usuario, { foreignKey: 'usuario_id' })

Asientos.hasOne(Reserva, { foreignKey: 'asientos_id' })
Reserva.belongsTo(Asientos, { foreignKey: 'asientos_id' , as:'asiento'})

Usuarios_invitados.hasOne(Reserva, { foreignKey: 'usuarios_invitados_id' });
Reserva.belongsTo(Usuarios_invitados, { foreignKey: 'usuarios_invitados_id' });


module.exports = { Usuario, Bus, Ruta, Horario, Reserva, Pago, Asientos,Usuarios_invitados };
