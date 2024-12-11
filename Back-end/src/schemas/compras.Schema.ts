import {z} from 'zod';

const validation = {
    id: "Debe ser un numero entero",
    id_articulo: "Debe ser un numero entero",
    cantidad: "Debe ser un entero positivo",
    precio: "Debe ser un entero positivo",
    iva: "Debe ser un entero positivo",
    subtotal: "Debe ser un numero positivo",
    total: "Debe ser un entero positivo",
    fecha_compra: "Debe ser una fecha valida"
}

export const comprasSchema = z.object({
    id: z.number().int(validation.id),
    id_articulo: z.number().int(validation.id_articulo),
    cantidad: z.number().int(validation.cantidad),
    precio: z.number().int(validation.precio),
    iva: z.number().int(validation.iva),
    subtotal: z.number().int(validation.subtotal),
    total: z.number().int(validation.total),
    fecha_compra: z.date()
});

export const compraNuevaSchema = z.object({
    id_articulo: z.number().int(validation.id_articulo),
    cantidad: z.number().int().positive(validation.cantidad),
    precio: z.number().positive(validation.precio),
    iva: z.number().positive(validation.iva),
    subtotal: z.number().positive(validation.subtotal),
    total: z.number().positive(validation.total),
    fecha_compra: z.date()
});