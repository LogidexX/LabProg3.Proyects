const express = require('express'); // Importar Express
const mongoose = require('mongoose'); // Importar Mongoose
const bodyParser = require('body-parser'); // Para procesar datos del formulario
const cors = require('cors'); // Habilitar CORS

const app = express(); // Inicializar la app de Express
const PORT = 3000; // Puerto en el que correrá el servidor

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/formDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Conexión exitosa a la base de datos'))
    .catch(err => console.error('Error al conectar con la base de datos:', err));

// Crear el esquema de datos para el formulario
const FormSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
});

// Crear el modelo de datos
const FormModel = mongoose.model('Form', FormSchema);

// Middlewares
app.use(cors()); // Permitir solicitudes desde otros orígenes
app.use(bodyParser.json()); // Procesar datos JSON en el cuerpo de las solicitudes

// Ruta para recibir datos del formulario
app.post('/submit', async(req, res) => {
    try {
        // Recibir datos del cliente
        const { name, email } = req.body;

        // Validar que los datos existen
        if (!name || !email) {
            return res.status(400).json({ message: 'Faltan datos' });
        }

        // Crear un nuevo documento en la base de datos
        const newEntry = new FormModel({ name, email });

        // Guardar en la base de datos
        await newEntry.save();

        // Enviar respuesta al cliente
        res.status(200).json({ message: 'Datos guardados correctamente' });
    } catch (err) {
        console.error('Error al guardar los datos:', err);
        res.status(500).json({ message: 'Error interno del servidor', error: err });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});