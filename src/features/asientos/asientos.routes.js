const express = require('express');
const router = express.Router();
const tieneRole = require('../../middlewares/tieneRole');
const auth = require('../../middlewares/auth');
const { asientosDisponibles, index, asientoBus } = require('./asientos.controller');

router.get('/asientos_disponibles/:id', [

], asientosDisponibles);

router.get('/index', [
    auth,
    tieneRole('admin', 'cliente')
], index);
router.get('/misAsientos/:id', [
    auth,
    tieneRole('admin', 'cliente')
], asientoBus);
module.exports = router;
