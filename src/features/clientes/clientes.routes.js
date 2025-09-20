const express = require('express');
const router = express.Router();
const { index, create, eliminar, show, update } = require('./Clientes.controller');

router.get('/index', [
], index);
router.post('/create', [
], create);

module.exports = router;
