const path = require("path");

const { User } = require('../../database/models');

const loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || user.PasswordUser !== password) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    res.status(200).json({ message: 'Usuario logueado correctamente' });
  } catch (error) {
    console.error('Error al procesar el login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = loginUsers;
