const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const tieneRole = require('../../middlewares/tieneRole');
const { index, create, eliminar, show, update } = require('./ruta.controller');

router.get('/index', [
  /*   auth,
    tieneRole('admin', 'cliente') */
], index);
router.post('/create', [
   /*  auth,
    tieneRole('admin') */
], create);
router.get('/view/:id', [
    auth,
    tieneRole('admin','cliente')
], show);
router.put('/update/:id', [
  /*   auth,
    tieneRole('admin') */
], update);
router.delete('/delete/:id', [
 /*    auth,
    tieneRole('admin') */
], eliminar);

module.exports = router;
