const Product = require('../models/Product');

// Carrito temporal en memoria
const carrito = [];

// Obtener carrito
const obtenerCarrito = async (req, res) => {
  try {
    return res.status(200).json(carrito);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener el carrito',
      error: error.message,
    });
  }
};

// Agregar producto al carrito
const agregarAlCarrito = async (req, res) => {
  try {
    const { productoId, cantidad = 1 } = req.body;

    if (!productoId) {
      return res.status(400).json({
        message: 'El productoId es obligatorio',
      });
    }

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      return res.status(400).json({
        message: 'La cantidad debe ser un número entero mayor a 0',
      });
    }

    const producto = await Product.findById(productoId);

    if (!producto) {
      return res.status(404).json({
        message: 'Producto no encontrado',
      });
    }

    const itemExistente = carrito.find(
      (item) => item.producto._id.toString() === productoId
    );

    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      carrito.push({
        producto,
        cantidad,
      });
    }

    return res.status(201).json({
      message: 'Producto agregado al carrito',
      carrito,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error al agregar el producto al carrito',
      error: error.message,
    });
  }
};

// Eliminar producto del carrito
const eliminarDelCarrito = async (req, res) => {
  try {
    const { productoId } = req.params;

    const indice = carrito.findIndex(
      (item) => item.producto._id.toString() === productoId
    );

    if (indice === -1) {
      return res.status(404).json({
        message: 'Producto no encontrado en el carrito',
      });
    }

    carrito.splice(indice, 1);

    return res.status(200).json({
      message: 'Producto eliminado del carrito',
      carrito,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al eliminar el producto del carrito',
      error: error.message,
    });
  }
};

module.exports = {
  obtenerCarrito,
  agregarAlCarrito,
  eliminarDelCarrito,
};