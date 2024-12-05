import {z} from 'zod';

const telefonoRegEx = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const nombreRegEx = new RegExp(
    /^(A-Z|a-z)+$/
);

const domicilioRegEx = new RegExp(
    /^[A-Za-z0-9/#]+$/
);

// Validaciones con Zod - construir esquema
export const personalSchema = z.object({
    nombre: z.string().regex(nombreRegEx),
    direccion: z.string().regex(domicilioRegEx),
    // telefono: z.string().min(10).max(15),
    telefono: z.string().regex(telefonoRegEx),
    estatus: z.number().int().positive()
    // estatus: z.number().int().positive().min(1).max(2, "Los valores correctos son 1 y 2")
}).refine(data => data.estatus <= 2,{
    message: "Los valores correctossno 1(vigente) y 2(baja)",
    path: ["estatus"]
}).refine(data => data.direccion == 'Tec de culiacan', {
    message: "La direccion debe ser del Tec de culiacan",
    path: ["direccion"]
}).or(
    z.object({
        telefono: z.string().min(10).max(15)
    })
).or(
    z.object({
        id: z.number().int().positive().min(1).max(9999)
    })
);