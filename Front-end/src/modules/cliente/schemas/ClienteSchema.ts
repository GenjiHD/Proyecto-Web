// Importa la función toTypedSchema de la librería @vee-validate/zod para convertir un esquema de Zod en un esquema tipado para validación.
import { toTypedSchema } from "@vee-validate/zod";
// Importa la librería zod, que permite crear esquemas de validación de datos.
import zod from "zod";

// Define el esquema de validación para un cliente utilizando Zod y lo convierte a un esquema tipado.
export const clienteSchema = toTypedSchema(
    // Crea un objeto con Zod, que define las reglas de validación para cada campo del cliente.
    zod.object({
        // El campo 'id' debe ser un número entero positivo.
        id: zod.number({ message: 'Requerido' }) // El campo es obligatorio.
            .int({ message: 'Debe ser un número entero' }) // El valor debe ser un número entero.
            .positive({ message: 'Debe ser un número positivo' }), // El número debe ser positivo.

        // El campo 'nombre' debe ser una cadena de texto.
        nombre: zod.string({ message: 'Requerido' }) // El campo es obligatorio.
            .min(3, { message: 'Debe tener al menos 3 caracteres' }) // El nombre debe tener al menos 3 caracteres.
            .max(200, { message: 'Debe tener menos de 200 caracteres' }), // El nombre debe tener un máximo de 200 caracteres.

        // El campo 'direccion' debe ser una cadena de texto.
        direccion: zod.string({ message: 'Requerido' }) // El campo es obligatorio.
            .min(1, { message: 'Dirección requerida' }) // La dirección debe tener al menos 1 carácter.
            .max(200, { message: 'Debe tener menos de 200 caracteres' }), // La dirección debe tener un máximo de 200 caracteres.

        // El campo 'telefono' debe ser una cadena de texto.
        telefono: zod.string({ message: 'Requerido' }) // El campo es obligatorio.
            .min(10, { message: 'Debe tener al menos 10 caracteres' }) // El teléfono debe tener al menos 10 caracteres.
            .max(15, { message: 'Debe tener menos de 15 caracteres' }), // El teléfono debe tener un máximo de 15 caracteres.

        // El campo 'correo_electronico' debe ser una cadena de texto que sea un correo electrónico válido.
        correo_electronico: zod.string({ message: 'Requerido' }) // El campo es obligatorio.
            .min(1, { message: 'Correo requerido' }) // El correo es obligatorio.
            .max(200, { message: 'Debe tener menos de 200 caracteres' }) // El correo debe tener un máximo de 200 caracteres.
            .email({ message: 'Debe ser un correo electrónico válido' }), // El valor debe ser un correo electrónico válido.

        // El campo 'ciudad' debe ser una cadena de texto.
        ciudad: zod.string({ message: 'Requerido' }) // El campo es obligatorio.
    }).or(
        // Define una alternativa de validación utilizando 'or' para que al menos uno de los objetos de validación sea válido.
        zod.object({
            // El campo 'nombre' debe ser una cadena de texto con las mismas reglas de validación que antes.
            nombre: zod.string({ message: 'Requerido' })
                .min(3, { message: 'Debe tener al menos 3 caracteres' })
                .max(200, { message: 'Debe tener menos de 200 caracteres' }),

            // El campo 'direccion' debe ser una cadena de texto con las mismas reglas de validación que antes.
            direccion: zod.string({ message: 'Requerido' })
                .min(1, { message: 'Dirección requerida' })
                .max(200, { message: 'Debe tener menos de 200 caracteres' }),

            // El campo 'telefono' debe ser una cadena de texto con las mismas reglas de validación que antes.
            telefono: zod.string({ message: 'Requerido' })
                .min(10, { message: 'Debe tener al menos 10 caracteres' })
                .max(15, { message: 'Debe tener menos de 15 caracteres' }),

            // El campo 'correo_electronico' debe ser una cadena de texto con las mismas reglas de validación que antes.
            correo_electronico: zod.string({ message: 'Requerido' })
                .min(1, { message: 'Correo requerido' })
                .email({ message: 'Debe ser un correo electrónico válido' }),

            // El campo 'ciudad' debe ser una cadena de texto con reglas adicionales para validar que la ciudad también sea requerida.
            ciudad: zod.string({ message: 'Requerido' })
                .min(1, { message: 'Ciudad requerida' }) // La ciudad es un campo obligatorio.
        })
    ) // Fin del 'or' que define dos objetos alternativos para la validación del cliente.
);
