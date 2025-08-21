const express = require('express');
const router = express.Router();
const { index, create, eliminar, show, update, reservar } = require('./reserva.controller');

router.get('/index', index);
router.post('/create', create);
router.post('/reservar', reservar)
router.get('/view', show);
router.put('update', update);
router.delete('delete', eliminar);

module.exports = router;
