import mysql from 'mysql2/promise';
import { Compras, CompraNueva } from '../types/typeCompra';
import { comprasSchema, compraNuevaSchema } from '../schemas/compras.Schema';

const connection = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "pw2024",
    port: 3306,
    multipleStatements: false
});

export const getCompras = async () => {
    try{
        const [results] = await connection.query('SELECT * FROM compras');
        return results;
    }catch(err){
        return {err: "No se pudieron obtener los registros de compras"};
    }
};

export const getComprasID = async (id:number) => {
    try{
        const identifier = {id:id};
        const validation = comprasSchema.safeParse(identifier);
        if(!validation.success){
            return {error: validation.error};
        }
        const [results] = await connection.query('SELECT * FROM compras WHERE id = ? LIMIT 1', id);
        return results;
    }catch(err){
        return {err: "No se encuentra ese registro de compra"};
    }
};

export const addCompra = async (nuevo:CompraNueva) => {
    try{
        nuevo.fecha_compra = new Date(nuevo.fecha_compra);
        const validation = compraNuevaSchema.safeParse(nuevo);
        if(!validation.success){
            return {error: validation.error};
        }
        const [results] = await connection.query('INSERT INTO compras (id_articulos, cantidad, precio, iva, subtotal, total, fecha_compra) VALUES (?,?,?,?,?,?,?)',[nuevo.id_articulo,nuevo.cantidad,nuevo.precio,nuevo.iva,nuevo.subtotal,nuevo.total,nuevo.fecha_compra]);
        return results;
    }catch(err){
        return {error: "No se puede agregar esta compra al registro"};
    }
};

export const editCompra = async (edit:Compras) => {
    try{
        const [results] = await connection.query('UPDATE compras SET id_articulo = ?, cantidad = ?, precio = ?, iva = ?, subtotal = ?, total = ?, fecha_compra = ?', [edit.id_articulo, edit.cantidad, edit.precio, edit.iva, edit.subtotal, edit.total, edit.fecha_compra]);
        return results;
    }catch(err){
        return {error: "No se puede editar"};
    }
};

export const deleteCompra= async (id:number) => {
    try{
        const [results] = await connection.query('DELETE FROM compras WHERE id = ?', [id]);
        return results;
    }catch(err){
        return {error: "No se pudo borrar ese registro de compra"};
    }
};