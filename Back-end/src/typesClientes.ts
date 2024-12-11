export interface Cliente {
    id: number,
    nombre: string,
    direccion: string,
    telefono: string,
    email: string,
    ciudad: string
}

// Omitimos el campo `id_cliente` para nuevos registros
export type ClienteNuevo = Omit<Cliente, 'id'>;
