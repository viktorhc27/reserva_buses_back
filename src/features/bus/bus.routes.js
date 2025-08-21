const express = require('express');
const router = express.Router();
const tieneRole = require('../../middlewares/tieneRole');
const auth = require('../../middlewares/auth');
const { index, create, eliminar, show, update } = require('./bus.controller');

router.get('/index', [
  /*   auth,
    tieneRole('admin', 'cliente') */
], index);
router.post('/create', [
   /*  auth,
    tieneRole('admin') */
], create);
router.get('/view', [
    auth,
    tieneRole('admin','cliente')
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
