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
// Exportamos un esquema de validación utilizando Zod y la utilidad toTypedSchema
export const CompraAgregarSchema = toTypedSchema(
    z.object({
        // Campo id_articulo: debe ser un número entero positivo
        id_articulo: z.number().int().positive(validaciones.id),

        // Campo cantidad: validamos que sea un número entero positivo con mensajes personalizados
        cantidad: z.number({message:"La cantidad debe ser un numero"})
                    .int("La cantidad debe ser un numero entero")
                    .positive(validaciones.cantidad),

        // Campo precio: se preprocesa para convertir el valor a un número flotante antes de validarlo
        precio: z.preprocess((val) => parseFloat(val as string), 
            z.number({message:"El precio debe ser un numero"}).positive(validaciones.precio)
        ),

        // Campo iva: se preprocesa para convertir el valor a un número flotante antes de validarlo
        iva: z.preprocess((val) => parseFloat(val as string), 
            z.number().positive(validaciones.iva)
        ),

        // Campo subtotal: igual que el IVA, se convierte a flotante antes de validar que sea positivo
        subtotal: z.preprocess((val) => parseFloat(val as string), 
            z.number().positive(validaciones.subtotal)
        ),

        // Campo total: se preprocesa y valida que sea un número positivo
        total: z.preprocess((val) => parseFloat(val as string), 
            z.number().positive("El total debe ser un número positivo")
        ),

        // Campo fecha_compra: validamos que sea una cadena que cumple con el formato AAAA-MM-DD
        fecha_compra: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, validaciones.fecha),
    })
);
