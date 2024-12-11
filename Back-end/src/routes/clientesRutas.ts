import express, { Request, Response } from 'express';
import * as clienteServices from '../services/clientesServices';

// Activamos las rutas
const router = express.Router();

// Obtener todos los clientes
// http://localhost:3001/api/clientes/
router.get('/', async (_req: Request, res: Response) => {
    try {
        const clientes = await clienteServices.getClientes();
        res.send(clientes);
    } catch (err) {
        res.status(500).send('Error al obtener los clientes');
    }
});

// Obtener cliente por ID
// http://localhost:3001/api/clientes/1 <--- Número de id del cliente
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const cliente = await clienteServices.encuentraCliente(Number(req.params.id));
        res.send(cliente);
    } catch (err) {
        res.status(500).send('Error al obtener el cliente');
    }
});

// Obtener cliente por email
// http://localhost:3001/api/clientes/email/ejemplo@email.com
router.get('/email/:email', async (req: Request, res: Response) => {
    try {
        const cliente = await clienteServices.encuentraClienteemail(req.params.email);
        res.send(cliente);
    } catch (err) {
        res.status(500).send('Error al obtener el cliente por email');
    }
});

// Agregar un cliente
// http://localhost:3001/api/clientes/

router.post('/', async (req: Request, res: Response) => {
    try {
        const { nombre, direccion, telefono, email, ciudad } = req.body;

        const nuevoCliente = await clienteServices.agregarCliente({
            nombre,
            direccion,
            telefono,
            email,
            ciudad,
        });
        res.send(nuevoCliente);
    } catch (err) {
        // Mostrar errores inesperados en la consola
        console.error('Error al agregar cliente (Ruta):', err);
        res.status(500).send('Error interno del servidor al agregar cliente');
    }
});

// Modificar un cliente
// http://localhost:3001/api/clientes/
router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, nombre, direccion, telefono, email, ciudad } = req.body;
        const clienteModificado = await clienteServices.modificarCliente({
            id,
            nombre,
            direccion,
            telefono,
            email,
            ciudad,
        });
        res.send(clienteModificado);
    } catch (err) {
        res.status(400).send('Error al modificar el cliente');
    }
});

// Eliminar un cliente
// http://localhost:3001/api/clientes/
router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const clienteEliminado = await clienteServices.borrarCliente(Number(id));
        res.send(clienteEliminado);
    } catch (err) {
        res.status(400).send('Error al eliminar el cliente');
    }
});

// http://localhost:3001/api/clientes/telefono/1234567890
router.get('/telefono/:telefono', async (req: Request, res: Response) => {
    try {
        const cliente = await clienteServices.encuentraClienteTelefono(req.params.telefono);
        res.send(cliente);
    } catch (err) {
        res.status(500).send('Error al buscar el cliente por teléfono');
    }
});

export default router;