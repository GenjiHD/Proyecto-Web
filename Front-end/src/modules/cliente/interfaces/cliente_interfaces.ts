// Define la interfaz Cliente, que representa un cliente completo con todos los campos requeridos.
export interface Cliente { 
    id: number, // 'id' es un número que representa el identificador único del cliente.
    nombre: string, // 'nombre' es una cadena de texto que representa el nombre del cliente.
    direccion: string, // 'direccion' es una cadena de texto que representa la dirección del cliente.
    telefono: string, // 'telefono' es una cadena de texto que representa el número de teléfono del cliente.
    correo_electronico: string, // 'correo_electronico' es una cadena de texto que representa el correo electrónico del cliente.
    ciudad: string // 'ciudad' es una cadena de texto que representa la ciudad en la que vive el cliente.
}

// Define la interfaz ClienteAgregar, que representa los datos necesarios para agregar un nuevo cliente.
// A diferencia de la interfaz Cliente, no incluye el campo 'id', ya que el 'id' generalmente se asigna automáticamente en el backend.
export interface ClienteAgregar { 
    nombre: string, // 'nombre' es una cadena de texto que representa el nombre del cliente a agregar.
    direccion: string, // 'direccion' es una cadena de texto que representa la dirección del cliente a agregar.
    telefono: string, // 'telefono' es una cadena de texto que representa el número de teléfono del cliente a agregar.
    correo_electronico: string, // 'correo_electronico' es una cadena de texto que representa el correo electrónico del cliente a agregar.
    ciudad: string // 'ciudad' es una cadena de texto que representa la ciudad en la que se encuentra el cliente a agregar.
}
