const dns = require('dns');

dns.setServers(['1.1.1.1', '8.8.8.8']);

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

const productos = [
  {
    nombre: 'Café Latte',
    descripcion: 'Café espresso con leche espumada',
    precio: 3500,
    categoria: 'cafes',
    imagen: 'latte.jpg',
    disponible: true,
  },
  {
    nombre: 'Cappuccino',
    descripcion: 'Café espresso con leche y espuma',
    precio: 3800,
    categoria: 'cafes',
    imagen: 'cappuccino.jpg',
    disponible: true,
  },
  {
    nombre: 'Café Americano',
    descripcion: 'Café espresso combinado con agua caliente',
    precio: 3000,
    categoria: 'cafes',
    imagen: 'americano.jpg',
    disponible: true,
  },
  {
    nombre: 'Medialuna',
    descripcion: 'Medialuna de manteca recién horneada',
    precio: 1200,
    categoria: 'pasteleria',
    imagen: 'medialuna.jpg',
    disponible: true,
  },
  {
    nombre: 'Cheesecake',
    descripcion: 'Porción de cheesecake con frutos rojos',
    precio: 4500,
    categoria: 'pasteleria',
    imagen: 'cheesecake.jpg',
    disponible: true,
  },
  {
    nombre: 'Brownie',
    descripcion: 'Brownie de chocolate',
    precio: 3200,
    categoria: 'pasteleria',
    imagen: 'brownie.jpg',
    disponible: true,
  },
  {
    nombre: 'Tostado de Jamón y Queso',
    descripcion: 'Tostado caliente de jamón y queso',
    precio: 4200,
    categoria: 'comidas',
    imagen: 'tostado.jpg',
    disponible: true,
  },
  {
    nombre: 'Sándwich de Pollo',
    descripcion: 'Sándwich de pollo con vegetales frescos',
    precio: 5200,
    categoria: 'comidas',
    imagen: 'sandwich-pollo.jpg',
    disponible: true,
  },
  {
    nombre: 'Limonada',
    descripcion: 'Limonada natural con hielo',
    precio: 2800,
    categoria: 'bebidas',
    imagen: 'limonada.jpg',
    disponible: true,
  },
  {
    nombre: 'Jugo de Naranja',
    descripcion: 'Jugo de naranja exprimido',
    precio: 3000,
    categoria: 'bebidas',
    imagen: 'jugo-naranja.jpg',
    disponible: true,
  },
];

const cargarProductos = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB conectado correctamente');

    await Product.deleteMany();

    await Product.insertMany(productos);

    console.log('10 productos cargados correctamente');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error al cargar los productos:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

cargarProductos();