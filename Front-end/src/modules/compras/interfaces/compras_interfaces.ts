// Interfaz que define la estructura de una compra completa
export interface Compra {
    id: number, // Identificador único de la compra
    id_articulo: number, // Identificador del artículo relacionado con la compra
    cantidad: number, // Cantidad del artículo adquirido
    precio: number, // Precio unitario del artículo
    iva: number, // Impuesto sobre el valor añadido (IVA) calculado para esta compra
    subtotal: number, // Subtotal calculado como precio por cantidad
    total: number, // Total de la compra (subtotal + IVA)
    fecha_compra: string | Date | null // Fecha en que se realizó la compra; puede ser cadena, objeto Date o null
}

// Interfaz que define la estructura para agregar una nueva compra
export interface CompraAgregar {
    id_articulo: number, // Identificador del artículo relacionado con la compra
    cantidad: number, // Cantidad del artículo a adquirir
    precio: number, // Precio unitario del artículo
    iva: number, // Impuesto sobre el valor añadido (IVA) calculado
    subtotal: number, // Subtotal calculado como precio por cantidad
    total: number, // Total de la compra (subtotal + IVA)
    fecha_compra: string | Date | null // Fecha en que se realizará la compra; puede ser cadena, objeto Date o null
}