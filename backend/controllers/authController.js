const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        message: 'Nombre, email y password son obligatorios',
      });
    }

    const usuarioExistente = await User.findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({
        message: 'El email ya está registrado',
      });
    }

    const passwordHasheado = await bcrypt.hash(password, 10);

    const usuario = await User.create({
      nombre,
      email,
      password: passwordHasheado,
      rol,
    });

    return res.status(201).json({
      message: 'Usuario registrado correctamente',
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al registrar el usuario',
      error: error.message,
    });
  }
};

const iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email y password son obligatorios',
      });
    }

    const usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(401).json({
        message: 'Email o contraseña incorrectos',
      });
    }

    const passwordCorrecto = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!passwordCorrecto) {
      return res.status(401).json({
        message: 'Email o contraseña incorrectos',
      });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    return res.status(200).json({
      message: 'Login exitoso',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al iniciar sesión',
      error: error.message,
    });
  }
};

module.exports = {
  registrarUsuario,
  iniciarSesion,
};