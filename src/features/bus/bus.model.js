const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/database');

const Bus = sequelize.define("Bus", {
  patente: { type: DataTypes.STRING(20), allowNull: false },
  modelo: { type: DataTypes.STRING(100) },
  capacidad: { type: DataTypes.INTEGER, allowNull: false },
  estado: {
    type: DataTypes.ENUM("ACTIVO", "INACTIVO"),
    defaultValue: "ACTIVO"
  }
}, {
  tableName: "bus",
  timestamps: true,
});

module.exports = Bus;
