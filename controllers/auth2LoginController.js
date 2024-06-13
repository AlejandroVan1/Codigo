require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');

const CLIENT_ID = process.env.CLIENT_ID;

exports.loginWithAuth2 = async (req, res) => {
  const { idToken } = req.body;

  const client = new OAuth2Client(CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email } = payload;

    // Verifica si el usuario existe en la base de datos
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Envía una respuesta de éxito
    res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};