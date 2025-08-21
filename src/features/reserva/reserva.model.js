const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/database');

const Reserva = sequelize.define("Reserva", {
  estado: { type: DataTypes.ENUM("CONFIRMADA", "PENDIENTE", "CANCELADA"), defaultValue: "CONFIRMADA" }
}, {
  tableName: "reserva",
  timestamps: true,
});

module.exports = Reserva;
