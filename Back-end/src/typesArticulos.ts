export interface Articulo {
    id: number;
    descripcion: string;
    precio: number;
    cantidad: number;
    caducidad: string; // Se puede usar `Date` si deseas trabajar con objetos de fecha
}

// Tipo para crear un nuevo artículo, omitiendo el campo `id_articulo`
export type ArticuloNuevo = Omit<Articulo, 'id'>;