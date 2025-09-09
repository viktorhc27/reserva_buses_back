const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/database');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  rut: { type: DataTypes.STRING(), allowNull: false},
  apellido: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING(150), allowNull: false, validate: { isEmail: true } },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  rol: { type: DataTypes.ENUM('admin', 'chofer', 'cliente'), defaultValue: 'cliente' },
  telefono: { type: DataTypes.STRING, allowNull: true },
}, {
  tableName: 'usuario',
  timestamps: true,
  scopes: {
    defaultScope: { attributes: { exclude: ['passwordHash'] } },
    withPassword: {}
  }
});

// Definir constantes de rol
Usuario.ROL = {
  ADMIN: 'admin',
  CHOFER: 'chofer',
  CLIENTE: 'cliente'
};


// Hooks
Usuario.addHook('beforeCreate', async (usuario) => {
  if (usuario.passwordHash) {
    usuario.passwordHash = await bcrypt.hash(usuario.passwordHash, 10);
  }
});

Usuario.addHook('beforeUpdate', async (usuario) => {
  if (usuario.changed('passwordHash')) {
    usuario.passwordHash = await bcrypt.hash(usuario.passwordHash, 10);
  }
});

Usuario.prototype.comparePassword = function (plain) {
  const hash = this.getDataValue('passwordHash');
  if (!hash) throw new Error('Password hash no definido');
  return bcrypt.compare(plain, hash);
};

module.exports = Usuario;
