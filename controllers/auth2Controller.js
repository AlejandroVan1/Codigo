require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');

const CLIENT_ID = process.env.CLIENT_ID;

exports.registerWithAuth2 = async (req, res) => {
  const { idToken } = req.body;

  const client = new OAuth2Client(CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Verifica si el usuario ya existe en la base de datos
    let user = await User.findOne({ email });

    if (!user) {
      // Si no existe, crea un nuevo usuario
      user = new User({ email, name });
      await user.save();
    }

    // Envía una respuesta de éxito
    res.status(200).json({ message: 'Registro exitoso', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};