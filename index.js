require('dotenv').config();
const express =require('express');
const conectDb =require('./config/conexionMongo');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login')

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
// Conectar a la base de datos MongoDB
conectDb();
// Ruta para registrar usuario
app.post('/api/register', registerRoutes );
// Ruta para ingresar usuario
app.post('/api/login', loginRoutes);
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
