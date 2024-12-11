import { z } from 'zod';  // Importa Zod, una librería para validación de esquemas
import { toTypedSchema } from '@vee-validate/zod';  // Convierte esquemas de Zod a un tipo compatible con vee-validate

// Definición de los mensajes de error personalizados para las validaciones
const validaciones = {
    descripcionMin: "La descripción debe contener al menos 2 caracteres",  // Mensaje de error si la descripción es demasiado corta
    descripcionMax: "La descripción no puede exceder los 300 caracteres",  // Mensaje de error si la descripción es demasiado larga
    cantidad_en_almacen: "La cantidad en almacén debe ser un número entero mayor a cero",  // Mensaje de error si la cantidad no es válida
    fecha_caducidad: "La fecha de caducidad debe seguir el formato yyyy-mm-dd",  // Mensaje de error si la fecha no tiene el formato correcto
    precio: "El precio debe ser un valor numérico positivo",  // Mensaje de error si el precio no es un número positivo
    requerido: "Este campo es obligatorio"  // Mensaje de error para campos obligatorios
};

// Esquema para la validación de artículos al editar
export const ArticuloEditarSchema = toTypedSchema(
    z.object({
        id: z.number().int().positive("El ID debe ser un número entero y mayor a cero"),  // Validación para el ID: debe ser un número entero positivo
        
        descripcion: z.string()
            .min(2, validaciones.descripcionMin)  // Longitud mínima de la descripción: 2 caracteres
            .max(300, validaciones.descripcionMax),  // Longitud máxima de la descripción: 300 caracteres
        
        precio: z.preprocess((val) => parseFloat(val as string),  // Preprocesa el valor para convertirlo a número flotante
            z.number().positive(validaciones.precio)  // Asegura que el precio sea un número positivo
        ),
        
        cantidad_en_almacen: z.number().int('La cantidad debe ser un número entero')  // Validación para cantidad: debe ser un número entero
            .positive(validaciones.cantidad_en_almacen),  // Además debe ser positivo
        
        fecha_caducidad: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, validaciones.fecha_caducidad)  // Validación para el formato de la fecha
            .or(z.null()),  // Permite valores nulos
    })
);

// Esquema para la validación de artículos al agregar
export const ArticuloAgregarSchema = toTypedSchema(
    z.object({
        descripcion: z.string()
            .min(2, validaciones.descripcionMin)  // Descripción debe tener al menos 2 caracteres
            .max(300, validaciones.descripcionMax),  // Descripción no puede exceder 300 caracteres
        
        precio: z.preprocess((val) => parseFloat(val as string),  // Preprocesa el valor para convertirlo a número flotante
            z.number().positive(validaciones.precio)  // Asegura que el precio sea un valor positivo
        ),
        
        cantidad_en_almacen: z.number().int('La cantidad debe ser un número entero')  // Cantidad debe ser un número entero
            .positive(validaciones.cantidad_en_almacen),  // También debe ser positivo
        
        fecha_caducidad: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, validaciones.fecha_caducidad)  // Valida el formato de fecha
            .or(z.null()),  // Permite que sea nulo
    })
);
