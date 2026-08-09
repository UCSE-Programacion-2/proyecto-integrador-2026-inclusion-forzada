const Product = require('../models/Product');

const obtenerProductos = async (req, res) => {
  try {
    const { categoria } = req.query;

    const filtro = {};

    if (categoria) {
      filtro.categoria = categoria;
    }

    const productos = await Product.find(filtro);

    return res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener los productos',
      error: error.message,
    });
  }
};

const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({
        message: 'Producto no encontrado',
      });
    }

    return res.status(200).json(producto);
  } catch (error) {
    return res.status(400).json({
      message: 'ID de producto inválido',
    });
  }
};

const crearProducto = async (req, res) => {
  try {
    const producto = await Product.create(req.body);

    return res.status(201).json(producto);
  } catch (error) {
    return res.status(400).json({
      message: 'Error al crear el producto',
      error: error.message,
    });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const producto = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!producto) {
      return res.status(404).json({
        message: 'Producto no encontrado',
      });
    }

    return res.status(200).json(producto);
  } catch (error) {
    return res.status(400).json({
      message: 'Error al actualizar el producto',
      error: error.message,
    });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const producto = await Product.findByIdAndDelete(req.params.id);

    if (!producto) {
      return res.status(404).json({
        message: 'Producto no encontrado',
      });
    }

    return res.status(200).json({
      message: 'Producto eliminado correctamente',
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error al eliminar el producto',
      error: error.message,
    });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};