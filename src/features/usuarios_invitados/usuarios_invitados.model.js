const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/database');

const Usuarios_invitados = sequelize.define("usuarios_invitados", {
    nombre: { type: DataTypes.STRING },
    rut: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    telefono: { type: DataTypes.STRING }
    
}, {
    tableName: "usuarios_invitados",
    timestamps: true,
});

module.exports = Usuarios_invitados;
