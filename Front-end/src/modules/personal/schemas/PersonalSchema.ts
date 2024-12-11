// Importa la función 'toTypedSchema' de 'vee-validate/zod' para convertir el esquema de Zod a uno compatible con Vee-Validate.
import { toTypedSchema } from "@vee-validate/zod";
// Importa Zod, que es una librería para definir y validar esquemas de datos.
import zod from 'zod';


// Se define un esquema de validación para los datos de un "Personal" utilizando Zod, y se convierte para usarlo con Vee-Validate.
export const PersonalSchema = toTypedSchema(
    // Definimos un objeto con las reglas de validación utilizando Zod
    zod.object({
        // Valida que el campo 'id' sea un número entero positivo.
        // Si no es así, muestra el mensaje 'Requerido' o 'Un entero positivo' en caso de error.
        id: zod.number({message: 'Requerido'}).int().positive({message: 'Un entero positivo'}),

        // Valida que el campo 'nombre' sea una cadena de texto con un mínimo de 1 carácter y un máximo de 200.
        // Si no cumple estas condiciones, muestra los mensajes 'Nombre requerido' y 'Maximo 200 caracteres'.
        nombre: zod.string().min(1,{message: 'Nombre requerido'}).max(200,{message: 'Maximo 200 caracteres'}),

        // Valida que el campo 'direccion' sea una cadena de texto con un mínimo de 1 carácter y un máximo de 300.
        // Si no cumple estas condiciones, muestra los mensajes 'Direccion requerida' y 'Maximo 300 caracteres'.
        direccion: zod.string().min(1,{message: 'Direccion requerida'}).max(300,{message: 'Maximo 300 caracteres'}),

        // Valida que el campo 'telefono' sea una cadena de texto con entre 10 y 15 caracteres (números).
        // Si no cumple estas condiciones, muestra los mensajes 'Minimo 10 numeros' y 'Maximo 15 numeros'.
        telefono: zod.string().min(10,{message: 'Minimo 10 numeros'}).max(150,{message: 'Maximo 15 numeros'}),

        // Valida que el campo 'estatus' sea una cadena de texto no vacía.
        // Si no está presente, muestra el mensaje 'Estatus requerido'.
        estatus: zod.string({message: 'Estatus requerido'})
    })
    // Utilizamos 'or()' para permitir que se valide al menos una de las estructuras posibles del objeto
    .or(
        // Otra posible estructura del objeto sin el campo 'id'.
        zod.object({
            nombre: zod.string().min(1,{message: 'Nombre requerido'}).max(200,{message: 'Maximo 200 caracteres'}),
            direccion: zod.string().min(1,{message: 'Direccion requerida'}).max(300,{message: 'Maximo 300 caracteres'}),
            telefono: zod.string().min(10,{message: 'Minimo 10 numeros'}).max(150,{message: 'Maximo 15 numeros'}),
            estatus: zod.string({message: 'Estatus requerido'})
        })
    )
);
