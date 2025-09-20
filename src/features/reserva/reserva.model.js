const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/database');

const Reserva = sequelize.define("Reserva", {
  horario_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  asientos_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  estado: { type: DataTypes.ENUM("CONFIRMADA", "PENDIENTE", "CANCELADA"), defaultValue: "CONFIRMADA" }
}, {
  tableName: "reserva",
  timestamps: true,
});

module.exports = Reserva;
