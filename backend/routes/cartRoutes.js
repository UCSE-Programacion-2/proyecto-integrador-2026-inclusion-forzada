const express = require('express');

const {
  obtenerCarrito,
  agregarAlCarrito,
  eliminarDelCarrito,
} = require('../controllers/cartController');

const router = express.Router();

router.get('/', obtenerCarrito);
router.post('/', agregarAlCarrito);
router.delete('/:productoId', eliminarDelCarrito);

module.exports = router;