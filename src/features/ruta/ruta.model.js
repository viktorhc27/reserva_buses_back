const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/database');

const Ruta = sequelize.define("Ruta", {
  origen: { type: DataTypes.STRING(150), allowNull: false },
  destino: { type: DataTypes.STRING(150), allowNull: false },
  duracionEstimada: { type: DataTypes.INTEGER }
}, {
  tableName: "ruta",
  timestamps: true,
});

module.exports = Ruta;
