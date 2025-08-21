const express = require('express');
const router = express.Router();
const { index, create, eliminar, show, update } = require('./horario.controller');

router.get('/index', index);
router.post('/create', create);
router.get('/view', show);
router.put('update', update);
router.delete('delete', eliminar);

module.exports = router;
