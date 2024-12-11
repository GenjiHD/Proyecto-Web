import express, {Request, Response} from 'express';
import * as comprasServices from '../services/comprasServices';

// Activamos las rutas
const router = express.Router();

router.get('/', async (_req:Request, res:Response) => {
    let compras = await comprasServices.getCompras();
    res.send(compras);
});

router.get('/:id', async (req:Request, res:Response) => {
    let compras = await comprasServices.getComprasID(Number(req.params.id));
    res.send(compras);
});

router.post('/', async(req:Request, res:Response) => {
    try{
        const {id_articulo, cantidad, precio, iva, subtotal, total, fecha_compra} = req.body;
        const nuevo = await comprasServices.addCompra({
            id_articulo,
            cantidad,
            precio,
            iva,
            subtotal,
            total,
            fecha_compra
        });
        res.send(nuevo);
    }catch(err){
        res.send("No se puede agregar esta orden de compra");
    }
});

router.put('/', async(req:Request, res:Response) => {
    try{
        const {id, id_articulo, cantidad, precio, iva, subtotal, total, fecha_compra} = req.body;
        const nuevo = await comprasServices.editCompra({
            id,
            id_articulo,
            cantidad,
            precio,
            iva,
            subtotal,
            total,
            fecha_compra
        });
        res.send(nuevo);
    }catch(err){
        res.send("No se puede agregar esta orden de compra");
    }
});

router.delete('/', async (req: Request, res:Response) => {
    try{
        const {id} = req.body;
        const eliminado = await comprasServices.deleteCompra(Number(id));
        res.send(eliminado);
    }catch(err){
        res.status(400).send("Erros en los datos");
    }
});

export default router;