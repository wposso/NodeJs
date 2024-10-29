const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

const app = express();
const port = 3000;

app.use(cors());
// app.use(cors({
//     origin: 'https://golden-llama-425a3c.netlify.app' 
// }));

app.use(bodyParser.json());

const dbConfig = {
    user: 'administrador',
    password: 'medellin2024.',
    server: 'melissamora.database.windows.net',
    database: 'HTML database',
    options: {
        encrypt: true,
        trustServerCertificate: true 
    }
};

app.post('/api/contact', async (req, res) => {
    try {
        await sql.connect(dbConfig);
        const { name, phone, email, city, info } = req.body;

        await sql.query`INSERT INTO dbo.contactanos (nombre, celular, correo, ciudad, informacion) VALUES (${name}, ${phone}, ${email}, ${city}, ${info})`;

        res.status(200).send('Registro insertado con éxito');
    } catch (error) {
        console.error('Error al insertar en la base de datos:', error);
        console.error('Detalles del error:', error.message);
        res.status(500).send('Error al insertar en la base de datos');
    } finally {
        await sql.close();
    }
});


app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${port}`);
});
