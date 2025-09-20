const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/database');

const Clientes = sequelize.define("Clientes", {
    nombre: { type: DataTypes.STRING },
    apellidos: { type: DataTypes.STRING },
    rut: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    telefono: { type: DataTypes.STRING },
    tipo_cliente: DataTypes.ENUM('registrado', 'invitado')

}, {
    tableName: "clientes",
    timestamps: true,
});

module.exports = Clientes;
