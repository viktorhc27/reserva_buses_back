const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/database');

const Horario = sequelize.define("Horario", {
  fechaSalida: { type: DataTypes.DATEONLY, allowNull: false },
  horaSalida: { type: DataTypes.TIME, allowNull: false },
  estado: { type: DataTypes.ENUM("ACTIVO", "CANCELADO"), defaultValue: "ACTIVO" },
  bus_id: DataTypes.INTEGER
}, {
  tableName: "horario",
  timestamps: true,
});

module.exports = Horario;
