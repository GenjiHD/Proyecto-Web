// Define una interfaz llamada `Registro`, que describe la estructura de un objeto con los datos necesarios para un registro de movimiento.
export interface Registro { 
    id: number, // Representa el identificador único del registro.
    id_personal: number, // Identificador único del personal asociado al registro.
    fecha: string | Date | null, // Fecha del registro, puede ser una cadena de texto, un objeto de tipo `Date`, o estar ausente (`null`).
    hora: string | Date | null, // Hora del registro, con las mismas opciones que `fecha`.
    movimiento: 'Entrada' | 'Salida' // Indica si el movimiento registrado es una 'Entrada' o una 'Salida'.
}

// Define una interfaz llamada `RegistroAgregar`, que describe los datos necesarios para agregar un nuevo registro.
// Es similar a `Registro` pero con un conjunto más reducido de propiedades, al omitir `id`, `fecha` y `hora`.
export interface RegistroAgregar { 
    id_personal: number, // Identificador único del personal que realiza el movimiento.
    movimiento: 'Entrada' | 'Salida' // Tipo de movimiento: 'Entrada' o 'Salida'.
}
