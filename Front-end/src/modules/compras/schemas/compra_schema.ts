import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

// Objeto para almacenar mensajes de error personalizados
const validaciones = {
    // ... mensajes de error
};

// Zod para validar objetos de tipo Compra
export const CompraSchema = toTypedSchema(
    z.object({
        // id 
        id: z.number().int().positive(validaciones.id),
        // id_articulo 
        id_articulo: z.number().int().positive(validaciones.id),
        // cantidad 
        cantidad: z.number()
            .int("La cantidad debe ser un número entero")
            .positive(validaciones.cantidad),
        // precio (convierte a número si es una cadena)
        precio: z.preprocess((val) => parseFloat(val as string),
            z.number().positive(validaciones.precio)
        ),
        // iva (convierte a número si es una cadena)
        iva: z.preprocess((val) => parseFloat(val as string),
            z.number().positive(validaciones.iva)
        ),
        // subtotal (convierte a número si es una cadena)
        subtotal: z.preprocess((val) => parseFloat(val as string),
            z.number().positive(validaciones.subtotal)
        ),
        // total (convierte a número si es una cadena)
        total: z.preprocess((val) => parseFloat(val as string),
            z.number().positive("El total debe ser un número positivo")
        ),
        // fecha_compra formato yyyy-mm-dd
        fecha_compra: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, validaciones.fecha),
    })
);

// Zod para validar objetos de tipo CompraAgregar
export const CompraAgregarSchema = toTypedSchema(
    z.object({
        id_articulo: z.number().int().positive(validaciones.id),
        cantidad: z.number({message:"La cantidad debe ser un numero"}).int("La cantidad debe ser un numero entero").positive(validaciones.cantidad),
        precio: z.preprocess((val) => parseFloat(val as string), 
            z.number({message:"El precio debe ser un numero"}).positive(validaciones.precio)
        ),
        iva: z.preprocess((val) => parseFloat(val as string), 
            z.number().positive(validaciones.iva)
        ),
        subtotal: z.preprocess((val) => parseFloat(val as string), 
            z.number().positive(validaciones.subtotal)
        ),
        total: z.preprocess((val) => parseFloat(val as string), 
            z.number().positive("El total debe ser un número positivo")
        ),
        fecha_compra: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, validaciones.fecha),
    })
);