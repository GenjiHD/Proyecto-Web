// Define una interfaz llamada 'Personal' que especifica la estructura de un objeto de tipo personal.
export interface Personal {
    id: number,// 'id' es un número que representa un identificador único para cada persona.
    nombre: string,// 'nombre' es una cadena de texto que almacena el nombre de la persona.
    direccion: string,// 'direccion' es una cadena de texto que almacena la dirección de la persona.
    telefono: string,// 'telefono' es una cadena de texto que almacena el número de teléfono de la persona.
    estatus: number// 'estatus' es un número que representa el estado o estatus de la persona, probablemente utilizado como un código (activo, inactivo, etc.).
};
// Define un nuevo tipo llamado 'PersonalAgregar' que es una versión modificada de la interfaz 'Personal'.
// Elimina la propiedad 'id' de la interfaz 'Personal' utilizando 'Omit' para crear una nueva estructura.
// Esto es útil para situaciones donde no queremos incluir el 'id' al agregar un nuevo personal, ya que 'id' probablemente se genera automáticamente en el servidor.
export type PersonalAgregar = Omit<Personal, 'id'>
