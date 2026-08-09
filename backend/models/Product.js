const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
    categoria: {
      type: String,
      required: true,
      trim: true,
    },
    imagen: {
      type: String,
      trim: true,
    },
    disponible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);