const express = require('express');
const router = express.Router();
const tieneRole = require('../../middlewares/tieneRole');
const auth = require('../../middlewares/auth');
const { asientosDisponibles } = require('./asientos.controller');

router.get('/asientos_disponibles/:id', [

], asientosDisponibles);


module.exports = router;
