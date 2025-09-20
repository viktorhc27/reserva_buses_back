const express = require('express');
const router = express.Router();

router.use('/auth', require('../features/authController/auth.routes'))
router.use('/asientos', require('../features/asientos/asientos.routes'))
router.use('/usuarios', require('../features/usuarios/usuario.routes'));
router.use('/buses', require('../features/bus/bus.routes'));
router.use('/rutas', require('../features/ruta/ruta.routes'));
router.use('/horarios', require('../features/horario/horario.routes'));
router.use('/reservas', require('../features/reserva/reserva.routes'));
router.use('/pagos', require('../features/pago/pago.routes'));
router.use('/clientes', require('../features/clientes/clientes.routes'))

router.get('/', (req, res) => {
  res.json({ message: 'API funcionando' });
});

module.exports = router;
