import mysql from 'mysql2/promise';
import {Personal,PersonalNuevo} from '../typesPersonal';
import { personalSchema } from '../schemas/personal.schema';

const connection = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "pw2024",
    port: 3306,
    multipleStatements: false
});

export const getPersonal = async () => {
    try{
        const [results] = await connection.query('SELECT * FROM personal');
        console.log('hola');
        return results;
    }catch(err){
        return {error: "No se pudo obtener el personal"};
    }
};

export const encuentraPersonal = async (id:number) => {
    try{
        const identificador = {id:id};
        const validacion = personalSchema.safeParse(identificador);
        if(!validacion.success){
            return {error: validacion.error};
        }
        const [results] = await connection.query('SELECT * FROM personal WHERE id = ? LIMIT 1', id);
        return results;
    }catch(err){
        return {error: "No se encuentra ese personal;"}
    }
};

export const encuentraPersonalTelefono = async (telefono:string) => {
    try{
        // const consulta = `SELECT * FROM personal WHERE telefono=${telefono} AND estatus=1`;
        // const [results] = await connection.query(consulta);
        const tel = {telefono: telefono};
        const validacion = personalSchema.safeParse(tel);
        if(!validacion.success){
            return {error: validacion.error};
        }
        const [results] = await connection.query('SELECT * FROM personal WHERE telefono = ? AND estatus=1', telefono);
        return results;
    }catch(err){
        return {error: "No se puede encontar al personal con ese numero de telefono"};
    }
    
}

export const agregarPersonal = async (nuevo:PersonalNuevo) => {
    try{
        const validacion = personalSchema.safeParse(nuevo);
        if(!validacion.success){
            return {error: validacion.error};
        }
        const [results] = await connection.query('INSERT INTO personal(nombre,direccion,telefono,estatus) values(?,?,?,?)',[nuevo.nombre,nuevo.direccion,nuevo.telefono,nuevo.estatus]);
        return results;
    }catch(err){
        return {error: "No se puede agregar al personal"};
    }
};

export const modificarPersonal = async (modificado:Personal) => {
    try{
        const [result] = await connection.query('UPDATE personal SET nombre=?, direccion=?, telefono=?, estatus=? WHERE id=?',[modificado.nombre, modificado.direccion, modificado.telefono, modificado.estatus, modificado.id]);
        return result;
    }catch(err){
        return {error: "No se puede modificar"};
    }
};

export const borrarPersonal = async (id:Number) => {
    try{
        const [results] = await connection.query('DELETE FROM personal WHERE id=?',[id]);
        return results;
    }catch(err){
        return {error: "No se puede borrar el personal"};
    }
}