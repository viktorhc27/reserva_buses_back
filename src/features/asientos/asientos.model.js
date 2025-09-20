const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/database');

const Asientos = sequelize.define("Asientos", {
  numero: { type: DataTypes.INTEGER, allowNull: false },
  estado: {
    type: DataTypes.ENUM('disponible', 'ocupado', 'reservado', 'fuera_servicio'),
    defaultValue: 'disponible'
  },
  fila: { type: DataTypes.STRING, allowNull: true },
  columna: { type: DataTypes.STRING, allowNull: true },
  bus_id: DataTypes.INTEGER
}, {
  tableName: "asientos",
  timestamps: true,
});

module.exports = Asientos;
