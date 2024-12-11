export interface Articulos {  // Define una interfaz llamada "Articulos"
    id: number,  // El ID es un número entero
    descripcion: string,  // Descripción del artículo, que debe ser un string
    precio: number,  // Precio del artículo, que debe ser un número
    cantidad_almacen: number,  // Cantidad del artículo en el almacén, que debe ser un número
    fecha_caducidad: Date | string | null  // Fecha de caducidad, que puede ser un Date, un string o null
}

export type ArticulosAgregar = Omit<Articulos, 'id'>;  // Define un tipo llamado "ArticulosAgregar", que es igual a "Articulos" pero omitiendo el campo 'id'
