const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      return res.status(401).json({
        message: 'No hay token, autorización denegada',
      });
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : authHeader;

    if (!token) {
      return res.status(401).json({
        message: 'Token no válido',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = decoded;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token no válido',
    });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.usuario || req.usuario.rol !== 'admin') {
    return res.status(403).json({
      message: 'Acceso denegado: se requiere rol admin',
    });
  }

  return next();
};

module.exports = {
  authMiddleware,
  adminMiddleware,
};