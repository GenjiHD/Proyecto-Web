import express, { Request, Response } from 'express';
import * as articuloServices from '../services/articulosServices';

// Activamos las rutas
const router = express.Router();

// Obtener todos los artículos
// http://localhost:3001/api/articulos/
router.get('/', async (_req: Request, res: Response) => {
    try {
        const articulos = await articuloServices.getArticulos();
        res.send(articulos);
    } catch (err) {
        res.status(500).send('Error al obtener los artículos');
    }
});

// Obtener un artículo por ID
// http://localhost:3001/api/articulos/1 <--- Número de ID del artículo
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const articulo = await articuloServices.encuentraArticulo(Number(req.params.id));
        res.send(articulo);
    } catch (err) {
        res.status(500).send('Error al obtener el artículo');
    }
});

// Obtener un artículo por nombre
// http://localhost:3001/api/articulos/nombre/ejemplo
router.get('/nombre/:descripcion', async (req: Request, res: Response) => {
    try {
        const articulos = await articuloServices.encuentraArticuloNombre(req.params.descripcion);
        res.send(articulos);
    } catch (err) {
        res.status(500).send('Error al buscar el artículo por nombre');
    }
});

// Agregar un nuevo artículo
// http://localhost:3001/api/articulos/
router.post('/', async (req: Request, res: Response) => {
    try {
        const { descripcion, precio, cantidad, caducidad } = req.body;
        const nuevoArticulo = await articuloServices.agregarArticulo({
            descripcion,
            precio,
            cantidad,
            caducidad,
        });
        res.send(nuevoArticulo);
    } catch (err) {
        res.status(400).send('Error al agregar el artículo');
    }
});

// Modificar un artículo existente
// http://localhost:3001/api/articulos/
router.put('/', async (req: Request, res: Response) => {
    try {
        const { id, descripcion, precio, cantidad, caducidad } = req.body;
        const articuloModificado = await articuloServices.modificarArticulo({
            id,
            descripcion,
            precio,
            cantidad,
            caducidad,
        });
        res.send(articuloModificado);
    } catch (err) {
        res.status(400).send('Error al modificar el artículo');
    }
});

// Eliminar un artículo
// http://localhost:3001/api/articulos/
router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const articuloEliminado = await articuloServices.borrarArticulo(Number(id));
        res.send(articuloEliminado);
    } catch (err) {
        res.status(400).send('Error al eliminar el artículo');
    }
});

export default router;
