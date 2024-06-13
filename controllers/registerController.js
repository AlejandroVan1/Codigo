const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Crear un nuevo usuario
        user = new User({ username, password });

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Guardar el usuario en la base de datos
        await user.save();

        res.status(201).json({ msg: 'Usuario registrado con éxito' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};