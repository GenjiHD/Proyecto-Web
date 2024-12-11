import { z } from 'zod';

// Expresiones regulares para validación
const telefonoRegEx = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/ // Valida diferentes formatos de números telefónicos
);

const nombreRegEx = new RegExp(
  /^[A-Za-z\s]+$/ // Solo permite letras y espacios para nombres
);

const direccionRegEx = new RegExp(
  /^[A-Za-z0-9\s/#,.-]+$/ // Permite alfanuméricos y algunos caracteres especiales para direcciones
);

const emailRegEx = new RegExp(
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Valida emails electrónicos
);

const ciudadRegEx = new RegExp(
  /^[A-Za-z\s]+$/ // Solo permite letras y espacios para ciudades
);

// Esquema de validación para Clientes
export const clienteSchema = z.object({
  id_cliente: z.number().int().positive().min(1).max(9999, "El ID debe ser un número entre 1 y 9999"),
  nombre: z.string().regex(nombreRegEx, "El nombre solo debe contener letras y espacios"),
  direccion: z.string().regex(direccionRegEx, "La dirección contiene caracteres no válidos"),
  telefono: z.string().regex(telefonoRegEx, "El teléfono debe tener un formato válido").min(10).max(15),
  correo: z.string().regex(emailRegEx, "El email electrónico debe ser válido"),
  ciudad: z.string().regex(ciudadRegEx, "La ciudad solo debe contener letras y espacios")
});