const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/database');

const Pago = sequelize.define("Pago", {
  monto: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  metodoPago: { type: DataTypes.ENUM("EFECTIVO", "TARJETA", "TRANSFERENCIA"), allowNull: false },
  estado: { type: DataTypes.ENUM("PAGADO", "PENDIENTE", "FALLIDO"), defaultValue: "PENDIENTE" }
}, {
  tableName: "pago",
  timestamps: true,
});

module.exports = Pago;
