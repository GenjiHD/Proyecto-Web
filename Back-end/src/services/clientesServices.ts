import mysql from 'mysql2/promise';
import { Cliente, ClienteNuevo } from '../typesClientes';
import { clienteSchema } from '../schemas/clientes.schemas';

const connection = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "pw2024",
    port: 3306,
    multipleStatements: false
});

export const getClientes = async () => {
    try {
        const [results] = await connection.query('SELECT * FROM clientes');
        return results;
    } catch (err) {
        return { error: "No se pudo obtener la lista de clientes" };
    }
};

export const encuentraCliente = async (id: number) => {
    try {
        const identificador = { id_cliente: id };
        const validacion = clienteSchema.safeParse(identificador);
        if (!validacion.success) {
            return { error: validacion.error };
        }
        const [results] = await connection.query('SELECT * FROM clientes WHERE id = ? LIMIT 1', id);
        return results;
    } catch (err) {
        return { error: "No se encuentra ese cliente" };
    }
};

export const encuentraClienteemail = async (email: string) => {
    try {
        const validacion = clienteSchema.safeParse({ email });
        if (!validacion.success) {
            return { error: validacion.error };
        }
        const [results] = await connection.query('SELECT * FROM clientes WHERE email = ? LIMIT 1', email);
        return results;
    } catch (err) {
        return { error: "No se puede encontrar al cliente con ese email" };
    }
};

export const agregarCliente = async (nuevo: ClienteNuevo) => {
    try {
        const validacion = clienteSchema.safeParse(nuevo);
        if (!validacion.success) {
            return { error: validacion.error };
        }
        const [results] = await connection.query(
            'INSERT INTO clientes(nombre, direccion, telefono, email, ciudad) VALUES (?, ?, ?, ?, ?)',
            [nuevo.nombre, nuevo.direccion, nuevo.telefono, nuevo.email, nuevo.ciudad]
        );
        return results;
    } catch (err) {
        return { error: "No se pudo agregar al cliente" };
    }
};

export const modificarCliente = async (modificado: Cliente) => {
    try {
        const [result] = await connection.query(
            'UPDATE clientes SET nombre = ?, direccion = ?, telefono = ?, email = ?, ciudad = ? WHERE id = ?',
            [modificado.nombre, modificado.direccion, modificado.telefono, modificado.email, modificado.ciudad, modificado.id]
        );
        return result;
    } catch (err) {
        return { error: "No se pudo modificar al cliente" };
    }
};

export const borrarCliente = async (id: number) => {
    try {
        const [results] = await connection.query('DELETE FROM clientes WHERE id = ?', [id]);
        return results;
    } catch (err) {
        return { error: "No se pudo borrar al cliente" };
    }
};

export const encuentraClienteTelefono = async (telefono: string) => {
    try {
        const validacion = clienteSchema.safeParse({ telefono });
        if (!validacion.success) {
            return { error: validacion.error };
        }
        const [results] = await connection.query('SELECT * FROM clientes WHERE telefono = ? LIMIT 1', telefono);
        return results;
    } catch (err) {
        return { error: "No se puede encontrar al cliente con ese número de teléfono" };
    }
};