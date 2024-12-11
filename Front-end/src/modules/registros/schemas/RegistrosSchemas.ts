// Importa la función `toTypedSchema` desde la librería `@vee-validate/zod`, que se utiliza para generar un esquema de validación tipado compatible con `vee-validate`.
import { toTypedSchema } from "@vee-validate/zod"; 

// Importa la función `tokenToString` desde la librería `typescript`. Aunque no se usa en este código, probablemente está importada por error o para futuras implementaciones.
import { tokenToString } from "typescript";

// Importa la librería `zod`, que permite definir y validar esquemas de datos de manera declarativa y segura.
import zod from "zod"; 

// Define un esquema de validación llamado `RegistrosSchema` usando `toTypedSchema` para hacerlo compatible con `vee-validate`.
// El esquema espera que los objetos validados tengan dos propiedades: `id_personal` y `movimiento`.
export const RegistrosSchema = toTypedSchema(
    zod.object({ // Crea un objeto de esquema con las reglas de validación definidas.
        id_personal: zod.number({ message: 'Requerido' }), // Define que `id_personal` debe ser un número y muestra el mensaje 'Requerido' si no se cumple.
        movimiento: zod.string({ message: 'Requerido' }) // Define que `movimiento` debe ser una cadena de texto y muestra el mensaje 'Requerido' si no se cumple.
    })
);
