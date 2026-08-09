const express = require('express');

const {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require('../controllers/productController');

const {
  authMiddleware,
  adminMiddleware,
} = require('../middlewares/authMiddleware');

const router = express.Router();

// Rutas públicas
router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);

// Rutas protegidas: requieren token y rol admin
router.post('/', authMiddleware, adminMiddleware, crearProducto);
router.put('/:id', authMiddleware, adminMiddleware, actualizarProducto);
router.delete('/:id', authMiddleware, adminMiddleware, eliminarProducto);

module.exports = router;