const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/database');

const Payment = sequelize.define("Payment", {
    monto: DataTypes.INTEGER,
    estado: DataTypes.ENUM('pagado', 'pendiente', 'cancelado'),
    vendedor: DataTypes.INTEGER,
    cliente_id: DataTypes.INTEGER,

}, {
    tableName: "payment",
    timestamps: true,
});

module.exports = Payment;
