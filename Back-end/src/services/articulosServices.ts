import mysql from 'mysql2/promise';
import { Articulo, ArticuloNuevo } from '../typesArticulos';
import { articuloSchema } from '../schemas/articulos.schemas';

const connection = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "pw2024",
    port: 3306,
    multipleStatements: false
});

// Obtener todos los artículos
export const getArticulos = async () => {
    try {
        const [results] = await connection.query('SELECT * FROM articulos');
        return results;
    } catch (err) {
        return { error: "No se pudo obtener la lista de artículos" };
    }
};

// Buscar un artículo por ID
export const encuentraArticulo = async (id: number) => {
    try {
        const validacion = articuloSchema.safeParse({ id });
        if (!validacion.success) {
            return { error: validacion.error };
        }
        const [results] = await connection.query('SELECT * FROM articulos WHERE id = ? LIMIT 1', [id]);
        return results;
    } catch (err) {
        return { error: "No se pudo encontrar el artículo" };
    }
};

// Buscar un artículo por nombre
export const encuentraArticuloNombre = async (descripcion: string) => {
    try {
        const validacion = articuloSchema.safeParse({ descripcion });
        if (!validacion.success) {
            return { error: validacion.error };
        }
        const [results] = await connection.query(
            'SELECT * FROM articulos WHERE descripcion LIKE ?',
            [`%${descripcion}%`]
        );
        return results;
    } catch (err) {
        return { error: "No se pudo encontrar el artículo por nombre" };
    }
};

// Agregar un nuevo artículo
export const agregarArticulo = async (nuevo: ArticuloNuevo) => {
    try {
        const validacion = articuloSchema.safeParse(nuevo);
        if (!validacion.success) {
            console.error('Validación fallida:', validacion.error);
            return { error: validacion.error };
        }

        const [results] = await connection.query(
            'INSERT INTO articulos (descripcion, precio, cantidad, caducidad) VALUES (?, ?, ?, ?)',
            [nuevo.descripcion, nuevo.precio, nuevo.cantidad, nuevo.caducidad]
        );
        console.log('Artículo insertado correctamente:', results);
        return results;
    } catch (err) {
        console.error('Error al insertar el artículo:', err);
        return { error: "No se pudo agregar el artículo" };
    }
};


// Modificar un artículo
export const modificarArticulo = async (modificado: Articulo) => {
    try {
        const validacion = articuloSchema.safeParse(modificado);
        if (!validacion.success) {
            return { error: validacion.error };
        }
        const [result] = await connection.query(
            'UPDATE articulos SET descripcion = ?, precio = ?, cantidad = ?, fecha_caducidad = ? WHERE id = ?',
            [modificado.descripcion, modificado.precio, modificado.cantidad, modificado.caducidad, modificado.id]
        );
        return result;
    } catch (err) {
        return { error: "No se pudo modificar el artículo" };
    }
};

// Eliminar un artículo
export const borrarArticulo = async (id: number) => {
    try {
        const [results] = await connection.query('DELETE FROM articulos WHERE id = ?', [id]);
        return results;
    } catch (err) {
        return { error: "No se pudo borrar el artículo" };
    }
};
