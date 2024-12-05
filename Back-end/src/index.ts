import express from 'express';
// Creamos la aplicacion a traves del paquete express
// y llamamos a su constructor
import cors from 'cors';
const app = express();

// Configurar rutas para el acceso personal

import personalRutas from './routes/personalRutas';


// Todo lo que regresa al usuario es de tipo JSON

app.use(express.json());
app.use(cors());

// Puerto para escuchar las peticiones del front-end
const port = 3001;

// Activar la ruta base
app.use('/api/personal/',personalRutas);

// Ruta
// app.get('/hola',(_req,res) => {
//     let date = new Date().toLocaleDateString();
//     res.send('mundo con la fecha '+date+" con TypeScript");
// });

// Activar el servidor y lo ponemos en escucha
app.listen(port, () => {
    console.log(`Server is listening in the port ${port}`);
});