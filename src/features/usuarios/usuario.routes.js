const express = require('express');
const router = express.Router();
const tieneRole = require('../../middlewares/tieneRole');
const auth = require('../../middlewares/auth');
const { index, create, eliminar, show, update } = require('./usuario.controller');

router.get('/index', [
    auth,
    tieneRole('admin')
], index);
router.post('/create', [
    auth,
    tieneRole('admin')
], create);
router.get('/view', [
    auth,
    tieneRole('admin')
], show);
router.put('update', [
    auth,
    tieneRole('admin')
], update);
router.delete('delete', [
    auth,
    tieneRole('admin')
], eliminar);

module.exports = router;
