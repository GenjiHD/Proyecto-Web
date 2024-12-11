import { z } from 'zod';

// Expresiones regulares para validación (si es necesario)
const descripcionRegEx = new RegExp(/^[A-Za-z0-9\s.,-]+$/); // Permite letras, números, espacios, comas y guiones

// Validaciones con Zod - Construir esquema
export const articuloSchema = z.object({
    descripcion: z.string().regex(descripcionRegEx, "La descripción contiene caracteres no válidos"),
    precio: z.number().positive("El precio debe ser un número positivo"),
    cantidad: z.number().int().nonnegative("La cantidad debe ser un número entero no negativo"),
    caducidad: z.string().refine((val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
    }, "La fecha de caducidad debe ser válida (YYYY-MM-DD)")
}).or(
    z.object({
        id_articulo: z.number().int().positive().min(1).max(9999, "El ID debe estar entre 1 y 9999")
    })
);
